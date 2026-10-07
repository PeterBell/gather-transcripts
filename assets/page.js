(function () {
  document.documentElement.classList.add("js");

  var facade = document.querySelector(".player-facade");
  var copyButton = document.querySelector(".copy-control");
  var copyStatus = document.querySelector(".copy-status");
  var searchWrap = document.querySelector(".search-wrap");
  var searchInput = document.getElementById("transcript-search");
  var searchStatus = document.getElementById("search-status");
  var paragraphs = Array.prototype.slice.call(document.querySelectorAll("[data-paragraph]"));
  var chapterRows = Array.prototype.slice.call(document.querySelectorAll(".chapter-row"));
  var timedLinks = Array.prototype.slice.call(document.querySelectorAll("a[data-start]"));
  var canonicalUrl = document.body.dataset.canonicalUrl || window.location.href.split("#")[0].split("?")[0];
  var player;
  var playerReady = false;
  var apiPromise;
  var currentParagraph;
  var currentChapter;
  var timer;
  var pendingStart = 0;
  var wideQuery = window.matchMedia("(min-width: 70rem)");
  var copyHoldUntil = 0;

  if (copyButton) copyButton.hidden = false;
  if (searchWrap) searchWrap.hidden = false;

  function loadApi() {
    if (apiPromise) return apiPromise;
    apiPromise = new Promise(function (resolve) {
      if (window.YT && window.YT.Player) {
        resolve();
        return;
      }
      var previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (typeof previous === "function") previous();
        resolve();
      };
      var script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    });
    return apiPromise;
  }

  function buildPlayer(start, autoplay) {
    if (!facade) return Promise.resolve();
    pendingStart = Math.max(0, Math.floor(start || 0));
    return loadApi().then(function () {
      if (player) {
        seekTo(pendingStart, autoplay !== false);
        return;
      }
      var frame = document.createElement("div");
      frame.className = "player-frame";
      facade.replaceWith(frame);
      player = new YT.Player(frame, {
        host: "https://www.youtube-nocookie.com",
        videoId: facade.dataset.videoId,
        playerVars: {
          autoplay: autoplay === false ? 0 : 1,
          playsinline: 1,
          start: pendingStart,
          enablejsapi: 1
        },
        events: {
          onReady: function () {
            playerReady = true;
            if (autoplay !== false) seekTo(pendingStart, true);
          },
          onStateChange: handleStateChange,
          onError: handlePlayerError
        }
      });
    });
  }

  function handlePlayerError(event) {
    if (event.data !== 101 && event.data !== 150) return;
    var start = currentParagraph ? Math.floor(Number(currentParagraph.dataset.start) || 0) : pendingStart;
    var url = new URL("https://www.youtube.com/watch");
    url.searchParams.set("v", facade.dataset.videoId);
    if (start) url.searchParams.set("t", String(start));
    var link = document.createElement("a");
    link.className = "player-facade error-link";
    link.href = url.toString();
    link.textContent = "Watch on YouTube at " + formatTime(start);
    document.querySelector(".player-frame").replaceWith(link);
  }

  function seekTo(start, play) {
    if (!player || !playerReady) return;
    player.seekTo(Math.max(0, Number(start) || 0), true);
    if (play) player.playVideo();
    updateFromTime(Number(start) || 0);
    startTimer();
  }

  function handleStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) startTimer();
    if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) stopTimer();
  }

  function startTimer() {
    if (timer) return;
    timer = window.setInterval(function () {
      if (player && player.getCurrentTime) updateFromTime(player.getCurrentTime());
    }, 250);
  }

  function stopTimer() {
    window.clearInterval(timer);
    timer = null;
  }

  function paragraphForTime(time) {
    var low = 0;
    var high = paragraphs.length - 1;
    var found = paragraphs[0];
    while (low <= high) {
      var mid = Math.floor((low + high) / 2);
      var p = paragraphs[mid];
      var start = Number(p.dataset.start);
      if (start <= time) {
        found = p;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return found;
  }

  function updateFromTime(time) {
    var p = paragraphForTime(time);
    markParagraph(p);
    updateCopyLabel(time);
  }

  function markParagraph(p) {
    if (!p || currentParagraph === p) return;
    if (currentParagraph) currentParagraph.classList.remove("is-current");
    currentParagraph = p;
    p.classList.add("is-current");
    updateCopyLabel(Number(p.dataset.start) || 0);
    var chapter = containingChapter(p);
    if (chapter !== currentChapter) {
      if (currentChapter) currentChapter.removeAttribute("aria-current");
      currentChapter = chapter;
      if (currentChapter) currentChapter.setAttribute("aria-current", "true");
    }
  }

  function containingChapter(p) {
    var start = Number(p.dataset.start);
    var active = chapterRows[0];
    chapterRows.forEach(function (row) {
      if (Number(row.dataset.start) <= start) active = row;
    });
    return active;
  }

  function updateCopyLabel(time) {
    if (!copyButton) return;
    if (Date.now() < copyHoldUntil) return;
    copyButton.textContent = time ? "Copy link at " + formatTime(time) : "Copy link";
  }

  function formatTime(seconds) {
    seconds = Math.max(0, Math.floor(seconds || 0));
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = seconds % 60;
    if (h) return h + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    return m + ":" + String(s).padStart(2, "0");
  }

  function timeFromLink(link) {
    return Number(link.dataset.start) || 0;
  }

  timedLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var start = timeFromLink(link);
      var anchor = link.getAttribute("href").slice(1);
      var target = document.getElementById(anchor);
      if (target && (link.classList.contains("chapter-row") || !wideQuery.matches)) {
        target.scrollIntoView({ block: "start" });
      }
      if (!player && !wideQuery.matches && facade) {
        var rect = facade.getBoundingClientRect();
        var visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        if (visible < rect.height / 2) facade.scrollIntoView({ block: "center" });
      }
      window.history.replaceState(null, "", "#t-" + Math.floor(start));
      buildPlayer(start, true);
      if (target) markParagraph(target);
    });
  });

  if (facade) {
    facade.addEventListener("click", function (event) {
      event.preventDefault();
      buildPlayer(pendingStart, true);
    });
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) {
          loadApi();
          observer.disconnect();
        }
      }, { rootMargin: "200px" });
      observer.observe(facade);
    }
  }

  if (copyButton) {
    copyButton.addEventListener("click", function () {
      var link = currentParagraph ? canonicalUrl + "#" + currentParagraph.id : canonicalUrl;
      navigator.clipboard.writeText(link).then(function () {
        copyHoldUntil = Date.now() + 2000;
        copyButton.textContent = "Link copied";
        copyStatus.textContent = "Link copied";
        window.setTimeout(function () {
          copyHoldUntil = 0;
          updateCopyLabel(currentParagraph ? Number(currentParagraph.dataset.start) || 0 : 0);
          copyStatus.textContent = "";
        }, 2000);
      });
    });
  }

  function debounce(fn, delay) {
    var id;
    return function () {
      window.clearTimeout(id);
      id = window.setTimeout(fn, delay);
    };
  }

  function clearHighlights() {
    if (window.CSS && CSS.highlights) CSS.highlights.delete("transcript-search");
  }

  function runSearch() {
    var query = searchInput.value.trim().toLowerCase();
    var visible = 0;
    var ranges = [];
    var previousTop = currentParagraph ? currentParagraph.getBoundingClientRect().top : null;
    clearHighlights();
    paragraphs.forEach(function (p) {
      var textNode = p.querySelector("span").firstChild;
      var text = textNode.nodeValue;
      var match = query.length >= 2 && text.toLowerCase().indexOf(query) !== -1;
      p.classList.toggle("is-hidden", query.length >= 2 && !match);
      if (query.length < 2 || match) visible += 1;
      if (match && window.CSS && CSS.highlights && window.Highlight) {
        var lower = text.toLowerCase();
        var index = lower.indexOf(query);
        while (index !== -1) {
          var range = new Range();
          range.setStart(textNode, index);
          range.setEnd(textNode, index + query.length);
          ranges.push(range);
          index = lower.indexOf(query, index + query.length);
        }
      }
    });
    document.querySelectorAll("[data-section]").forEach(function (section) {
      var hasHit = Array.prototype.some.call(section.querySelectorAll("[data-paragraph]"), function (p) {
        return !p.classList.contains("is-hidden");
      });
      section.classList.toggle("is-hidden", query.length >= 2 && !hasHit);
    });
    if (window.CSS && CSS.highlights && window.Highlight && ranges.length) {
      CSS.highlights.set("transcript-search", new Highlight(...ranges));
    }
    searchStatus.textContent = query.length >= 2 ? visible + " of " + paragraphs.length + " paragraphs" : "";
    if (query.length < 2 && currentParagraph && previousTop !== null) {
      var delta = currentParagraph.getBoundingClientRect().top - previousTop;
      window.scrollBy(0, delta);
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", debounce(runSearch, 150));
    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        searchInput.value = "";
        runSearch();
      }
    });
    searchStatus.textContent = "";
  }

  function applyDeepLink() {
    var hash = window.location.hash;
    var params = new URLSearchParams(window.location.search);
    var seconds = params.has("t") ? Number(params.get("t")) : null;
    if (hash.indexOf("#t-") === 0) seconds = Number(hash.slice(3).split("?")[0]);
    if (hash.indexOf("#ch-") === 0) {
      var section = document.getElementById(hash.slice(1).split("?")[0]);
      if (section) {
        var first = section.querySelector("[data-paragraph]");
        if (first) seconds = Number(first.dataset.start);
      }
    }
    if (seconds === null || Number.isNaN(seconds)) return;
    pendingStart = seconds;
    var el = document.getElementById(hash.slice(1).split("?")[0]);
    var p = el && el.hasAttribute("data-paragraph") ? el : paragraphForTime(seconds);
    if (p) {
      markParagraph(p);
      p.scrollIntoView({ block: "start" });
    }
    var label = document.querySelector(".play-label");
    if (label) {
      label.textContent = "Play from " + formatTime(seconds);
      label.hidden = false;
    }
    updateCopyLabel(seconds);
  }

  function syncChaptersOpen() {
    document.querySelectorAll(".chapters-panel").forEach(function (details) {
      details.open = wideQuery.matches;
    });
  }

  syncChaptersOpen();
  wideQuery.addEventListener("change", syncChaptersOpen);
  applyDeepLink();
})();
