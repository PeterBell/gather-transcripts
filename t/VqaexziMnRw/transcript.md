# Scaling AI in Engineering with Peter Bell | Ep. 7 | Confluent Developer Podcast

> Veteran engineer Peter Bell discusses scaling AI in engineering, his CTO community gather.dev, and how DSLs could make code ephemeral.

- Channel: [Confluent Developer](https://www.youtube.com/channel/UCmTK4CrCaDXpuZ-Evl5-b5Q)
- Video: <https://www.youtube.com/watch?v=VqaexziMnRw>
- Published: November 3, 2025
- Captured: October 7, 2026
- Transcript: Transcript from the video's captions
- Page: <https://peterbell.github.io/gather-transcripts/t/VqaexziMnRw/>

## Summary

Adi Polak interviews Peter Bell, a veteran engineer, founder, and educator with over thirty years in software. Bell talks about his two current projects: gather.dev, an invite-only peer community for CTOs and engineering leaders, and a new O'Reilly book called "Scaling AI in Engineering," which focuses on the non-technical, change-management side of AI adoption, like managing teams who fear their jobs will be eliminated or transformed.

Bell traces his career back to a teenage job as an electronics lab technician and then to running a web agency in the 1990s, where he got tired of manually coding similar websites and built a system of domain-specific languages (DSLs) to describe common patterns like authentication, content management, and e-commerce product variants. This let him rapidly configure 95% of an application and hand-write only the remaining custom 5%, effectively doing round-trip code generation decades before modern AI tools.

He connects this history directly to today's "vibe coding" debate, arguing that AI failures are usually not the LLM's fault but a result of imprecise requirements. He envisions a future where rich, structured DSLs and intelligent defaults let teams specify applications unambiguously enough that the underlying code becomes ephemeral and regenerable in any language or framework, while still allowing deep configuration wherever it truly matters.

The conversation closes with Bell's reflections on business lessons, mainly that he focused too much on technology and not enough on sales, and his advice to always look for prior art, since many of today's AI-era problems rhyme with ideas from decades past.

### Key takeaways

- Bell is writing an O'Reilly book, 'Scaling AI in Engineering,' focused on the change-management and alignment challenges of AI adoption rather than technical implementation.
- He founded gather.dev, a free, invite-only community for CTOs and engineering leaders to connect with close peers.
- In the late 1990s, Bell built DSL-driven systems to configure websites (authentication, e-commerce, content management) instead of hand-coding each one.
- He argues that most AI/LLM failures stem from insufficiently precise requirements, not from the models themselves hallucinating.
- His vision is that code could become largely ephemeral within three to eight years if rich DSLs and intelligent defaults can unambiguously specify application behavior.
- Authentication providers like Auth0 are examples of concrete implementations of a broader space of configuration options that could eventually be described more abstractly via DSLs.
- His original ColdFusion-based system used XML DSLs and 'method missing' patterns to auto-generate 95% of an application, with custom code only for the remaining 5%.
- A key business lesson from his agency days was that he underinvested in sales relative to technology, limiting his financial success despite strong technical execution.
- He advises looking for prior art, since many problems being solved with modern AI echo ideas from decades-old code generation and software product line research.

### Chapters

- **0:00** Cold open and teasers: Quick teaser clips introduce themes of the episode, including job disruption and precise AI requirements.
- **0:45** Introducing Peter Bell: Host Adi Polak introduces Confluent Developer and guest Peter Bell, a veteran engineer and educator.
- **2:39** gather.dev and the new O'Reilly book: Bell describes founding gather.dev for CTOs and writing an O'Reilly book on scaling AI in engineering leadership.
- **6:31** First job: electronics lab technician: Bell recalls working as a teenage lab technician to save for a motorcycle and being inspired by an unconventional electronics teacher.
- **9:35** Building DSL-driven websites in the 1990s: Running an ad agency, Bell got tired of repetitive HTML coding and built domain-specific languages to configure websites instead.
- **13:07** Precision over hallucination: Bell argues AI failures are usually due to imprecise requirements rather than LLM hallucination, drawing a parallel to vibe coding.
- **15:34** Toward ephemeral code and intelligent defaults: Bell outlines a future where rich DSLs and configurable defaults let teams specify apps precisely enough that code itself becomes regenerable and disposable.
- **19:55** The ColdFusion implementation: Bell details his old system using ColdFusion, XML DSLs, and method-missing patterns to auto-generate most of an application's code.
- **22:36** Business lesson: sales over technology: Bell admits he focused too much on building technology and not enough on sales, limiting the venture's financial success.
- **24:42** Advice: look for prior art: Bell encourages engineers to study decades-old work, since many current AI-era problems echo earlier code generation research.
- **26:02** Closing thoughts: Polak thanks Bell and points listeners to gather.dev for updates on his book and community.

### Quotes

> wait a minute, you've got 400 people. Working for you. And they know that their job's either going to be eliminated or transformed.
> (Peter Bell, 3:31)

> It's just that we're simply insufficiently precise in our requirements.
> (Peter Bell, 13:07)

> You know, so that was the problem. I did a great job of building out the technology. If only I'd got more customers, I would probably be coming to you live from my yacht.
> (Peter Bell, 22:36)

> Everyone looked at me like Where did you come from? It's like, didn't you see the like three updates in the last 36 hours?
> (Peter Bell, 24:30)

> I look at so many problems around fundamentally, one of the problems we're trying to solve is the ability to Unambiguously and precisely specify our requirements in a way that doesn't require code.
> (Peter Bell, 24:42)

_Summary by Claude._

## Transcript

**[0:00]** Today, we're diving into the art and science of building software that lasts. This is Confluent Developer. Wait a minute, you got 400 people working for you, and they know that their job's either going to be eliminated or transformed.

**[0:14]** What do you say? I'm going to argue that it's not the LLM's fault. It's not that they hallucinate, it's just that we're simply insufficiently. Precise in our requirements. You know, so that was the problem. I did a great job of building out the technology.

**[0:29]** If only I'd got more customers, I would probably be coming to you live from my yacht. Hello there, everyone. I'm Adi Polak, and welcome to Confluent Developer, where we explore the fascinating journeys of software developers tackling complex problems.

**[0:45]** In this episode, I'm interviewing Peter Bell, a veteran engineer, founder, educator and community builder with over three decades of experience shaping the future of software. From his early days soldering circuits boards and school labs to building CTO communities and writing a new book on scaling AI and engineering for O'Reilly.

**[1:09]** Peter shares a story of vision evolution and the relentless pursuit of clarity in how we build systems. His journey spans everything from pioneering early DSL driven web platforms in the nineties to exploring the future of where code itself becomes a FERMO. Replaced by precise specifications and intelligent defaults.

**[1:34]** Let's get into it. Hello, everybody. Welcome back to Confluent Developer. I'm super excited to have this special guest today with me. His name is Peter Bell, a veteran engineer, leader, founder, educator, community builder. with over thirty years of experience planning software engineering, developer advocacy, entrepreneurship, executive leadership, and a deep, deep understanding in systems and how to build them for success.

**[2:06]** Peter, welcome. Wow. Well, thanks for making it really easy for me to live up to the billing. Now he's got to be an expert at everything. This better be a good episode. I mean, you are one of top leaders in our industry and super fortunate to have you on the show.

**[2:26]** Maybe you want to say a couple of words about yourself and some of the new cool stuff that you work on right now. Sure. So right now I'm super excited about two things. The first is I've just founded, I've been threatening to do this for 15 years.

**[2:39]** I've been building CTO communities, monthly meetups, conferences. Finally founded gather.dev. And the goal is to create an invite-only brain trust for CTOs and other engineering leaders to connect with their very closest peers, whether that's CTOs at scale running large orgs.

**[2:56]** venture back startups, CTOs or heads of AI. And the goal is to have in person monthly meetups in New York City, online communities and to scale from there. really so that you get people to understand exactly what you're dealing with and you can very quickly vet ideas or challenges that you're facing, and it's free and invite only.

**[3:14]** And then the one other fun thing is, I am so excited. The O'Reilly team, I get to host their CTO hour once a quarter, and they've asked me to write a book called Scaling AI in Engineering. A leader's guide to driving alignment, adoption, and impact.

**[3:31]** So it's all the non-technical stuff. It's not routers or how you manage your inference workloads or how you deal with any of that. It's like, wait a minute, you've got 400 people. Working for you. And they know that their job's either going to be eliminated or transformed.

**[3:48]** What do you say? Then you've got a CEO who's like, so why aren't we doing 10 times the output with a 10th of the staff? Because I saw the case study. And so, you've got to manage their expectations.

**[3:58]** And how do you manage this what is fundamentally a change management problem? And I've been interviewing a whole bunch of CTOs, and so that is it is going to be a fascinating book, and I'm also going to have a companion website, which there'll be a link on the gather.

**[4:14]** dev website if anyone wants to find it. It's amazing. It's definitely necessary. It's something that I always hear from different engineering leaders in this space. And also the fact that as an engineers, as leaders, we all need to kind of skill up, right?

**[4:30]** This is the time to learn new things, embrace change and see how we can develop as human beings in this new space. of AI that we can continue having a a good successful, hopefully successful career. So super curious.

**[4:47]** Yeah, super curious about your book. I'm definitely going to be purchasing a copy. Do you have a date? I know this is a little bit stressful for book authors Oh no, it's the stressful was the fact that the first two chapters were due this morning, but I'm like really close and they're being very flexible.

**[5:05]** So by tomorrow, we'll have two chapters in. This will launch early next year, but I think what's going to be just as interesting. Is there is going to be a website. You've got to give me a couple of days, but if you go to gather.

**[5:18]** dev, you'll see a link called books that will get you there. And we're going to be dropping, starting end of October, we're going to drop weekly interviews with thought leaders and with CTOs from large companies. So there will be ongoing insights, advice, and information long before the book's available, and then it'll also be accessible on early release a little bit before it's published.

**[5:41]** But the actual publication date should be early Q2 of next year. Fantastic. Okay, everybody, stay tuned for the website and the opportunity to learn from some of the greatest minds in the industry. It's cool, it's great. What I love about my job is basically I just interview people way smarter than me.

**[5:59]** And then people are like, wow, that was a really smart conversation. And Peter was there. I guess he must be smart. It's the awesome life hack. If you're not really that smart, just interview people smarter than yourself. It works perfectly.

**[6:11]** That's the best advice. And you mentioned a job, so I want to take you back in time, maybe more probably more than thirty years back to your first job. What can you share with us? Wow. So I guess my very first job, I went to what they call in the UK a grammar school.

**[6:31]** It would be like a magnet school in the States. You had to kind of pass a test to get there. But I. I really desperately wanted a motorcycle when I was 16. And my mom was like, Well, I'm never getting you one of those.

**[6:42]** I'm like, Okay, so I got two jobs. I would work while I was going through high school, I'd work about 16 hours a week at Tesco's. It would be like the local supermarket, just checking out and taking care of, you know, stocking the shelves and things like that.

**[6:57]** And then I got this amazing job for eight hours a week as a lab technician. In the electronics lab at the school. So we were downloading to Terry Houd, like we were downloading like satellite feeds and information and you know, cleaning up the resistors and the transistors and the circuit boards and cleaning the soldering ions.

**[7:15]** But it was an incredibly traditional school. It was a boys-only school, very kind of formal and traditional. Like it has some history going back close to 800 years. Cochester Royal Grammar School, and very formal. And then you've got this wild shock of hair.

**[7:34]** Electronics teacher called Mr. Warren, and he did maypole dancing, smoked pot after school. And was into herbal teas, which even that seemed weird back then. So he was just like this wonderful person to be around and see how he engaged with life in a non-traditional but still impactful way.

**[7:54]** So it was great to hang out with him. I got to get really good at electronics, which was fun. Yeah, Mr. Warren World, that's a very interesting story. And also the fact that you remember him, speaks you know, it uh speaks loud to uh to the impact it had on you probably.

**[8:11]** So, absolutely. It was great. Fantastic. Listen, it's super exciting. I'm guessing you're not the only 16 year old guy that wanted a motorcycle. And had to work to get it. So I'm sure a lot of people would can connect to that story.

**[8:31]** I'm curious. So jumping forward, right, you have a long successful career. You've been doing a lot of things. Maybe you can take me back to some of the hardest challenges you had to solve and how did you go about that?

**[8:43]** Now a quick word from our sponsor. Confluent Developer The Podcast is brought to you by Confluent Developer the website, which has everything you need as a developer of data streaming systems. And it's completely free. We've got curriculum, hands-on exercises, executable tutorials, the online data streaming engineer certification, also free.

**[9:04]** A way to find a meetup near you, those are free. Everything is there. Want you to be successful in your journey as a data streaming engineer, and this is the site that has what you need. Check it out at developer.confluent.io That's developer.

**[9:19]** confluent. io. Now back to the show. So, I think one of the most interesting ones, and it's funny because it's a challenge that I started working on 25 years ago, and I feel like it's becoming just as relevant today.

**[9:35]** I I was I actually run an ad agency in Houston, Texas, and then the client started asking for Oh, we want to have a CD-ROM or we want one of these website things that people are talking about. I mean, this was back in 1994, I started this business. So by 1996, all these people were starting to ask for websites, and I was getting really sick and tired because I was basically just Manually coding the same HTML for a whole bunch of websites.

**[10:05]** And I'm like, that sucks. And so then I get to about 97, and I've really fed up with this, and I start. Looking for patterns, like, how can I charge as much money but do less work? And what I noticed was, unsurprisingly, there was commonality.

**[10:21]** Basically, I, who knew? I, I, um, Identified the Squarespace or I guess Shopify. I basically took that model and said, how can you create what then I modeled as a set of domain-specific languages So, DSLs for describing commonalities.

**[10:38]** There are some things you don't care about. If you don't care about user authentication and login, great, it'll be a default flow. If you do care, Then we need to go a little further down, and there will be kind of like a decision, a set of questions we would ask you that would determine: oh, you want this kind of login or that kind, and these parameters around the password length, or no.

**[10:57]** So you could get. As granular as you wanted. And then again, it had content management, e-commerce, because, like, you think about a product catalogue, right? You've got a category tree, you've got products, but then you have product variants that can.

**[11:11]** Either be described, I could geek out just on this. It turns out that products are actually quite complicated. Some of them, you just have variants. So it's like I want to pick a color from a drop-down list and a size from a drop-down list.

**[11:24]** Others, so that those are basically parametrizing your product. So you just have a single product, and then you'd have two parameters, each of which was an arm, right? You could select one of n values for Whatever the combination amount was.

**[11:37]** But then sometimes it's like, no, no, no, we actually don't do a medium in blue, we only do the medium in green and yellow. And we have skews and we have inventory quantities. And so then instead of parameterizing it, I had what I called back then subproducts, which was basically the individual SKUs.

**[11:52]** But you can still parameterize them because you might want to, I don't know, allow somebody to have a custom logo on the shirt, or they want to be able to put a message. So, personalization. Basically, I was just describing this set of tools and parameters for describing most of the websites I had to build so I could charge as much money without doing as much work.

**[12:14]** It's not, well, you describe it as kind of like a hard problem, but today is kind of like a vibe coding experience, no? Well, that's well. So, I'm going to come right back to that in a little bit.

**[12:26]** But I think that the thing that was interesting to me was: actually, let's go there now. I think that it's actually more relevant than ever because. Have you ever gone to a developer and asked them to code something?

**[12:37]** Like maybe you've got somebody you're working with and you're like, oh, could you just code me this? And then you look at what they build and you're like I should have been a little more specific because it is go build me an e-commerce site.

**[12:49]** And you look at it, it's like, no, not that kind of e-commerce site. Yes. I can definitely relate to it. There's a people mind where learning to fine-tune exactly what you want to get done is an art. And so, what I'd argue then is, I'm going to argue that it's not the LLM's fault.

**[13:07]** It's not that they hallucinate. It's just that we're simply insufficiently precise in our requirements. Now, that's not universally true. Sometimes we're incredibly precise and it just loses context because we put too much context in. There are a lot of things that can go wrong, but a big part of it, especially as the foundation models get more capable, is saying, firstly, How can we take big problems and decompose them into small problems?

**[13:33]** If I'm going to go to an application and say, I want a web application, like now. How about I say, here is my business context, here's my ICP for my audience, here's the competitive landscape, here is my voice and tone for the application, like the style, the vibe, here is the design.

**[13:52]** Specs for it from a UI perspective. And then I would like you to work with me to describe user journeys, And then you iterate with the model on the user journeys. And once you agree with those, you're like, great, now what I want you to do is slice this into thinly sliced user stories.

**[14:08]** Great. Once you iterate on that, then you put them into another tool to create formalized PRDs. And I would argue, going back to what I was doing 25 years ago, people have already started to talk about this possible world where maybe code becomes ephemeral.

**[14:24]** Maybe we have another level of abstraction. It's possible, but not if you have a three-paragraph prompt. If you just say, go give me a Shopify Like website that allows me to sell baseball goods, that's not Sufficiently precise, detailed, and ambiguous to replace the code that it happens to generate.

**[14:46]** But if we had a rich set of DSLs that described user authentication that described screens and workflows that described business objects with the Properties with the validation constraints, then permissioning, so which users can do what things to which properties on what objects.

**[15:05]** Eventually, you could actually get to something that was not as complex or implementation specific as code, but that would allow you to unambiguously Regenerate that application in any arbitrary language or frameworks that met that functionality. And so my personal belief is that we're actually moving into a world where eventually we could find that the vast majority of code becomes ephemeral over three to eight years.

**[15:34]** but only if you have sufficiently rigorous DSLs for becoming the true source of implementation and source of specification for both the acceptance tests and the implementation in a given language and framework. So essentially, you need to know very in detail what you want to get done even today with the different tools that are available out there for pipe coding and creating all the diagrams and so on.

**[16:01]** And the one other thing is yes and no, because then what you do is you can then start to think about intelligent defaults. When we look at the fact that we Outsource material subsets of our applications now to SaaS vendors, right?

**[16:14]** I'm not going to build authentication. I'll use Auth0 or FusionAuth or one of the other tools for doing that. Great. What they do is effectively you can look at them as a concrete implementation of a set of configuration options and or DSLs for describing The universe of possible authentication systems you can build.

**[16:37]** Do you want to allow 2FA or require it? Are you going to Support text messaging for 2FA, or is this like so high value that that's insufficiently secure? Do you want to support magic links via email? Do you want to allow social logins?

**[16:52]** Do you want to allow Email and password login, or do you want to require a social login and which socials do you want to support? Well, for those subsets, there's stuff I care about for any given app, and there's stuff I don't.

**[17:04]** So, maybe if I'm building a highly secure app, I'm going to spend, I'm going to configure every one of those possible options to say this is exactly how I want it secured. If I'm building, I don't know, a wedding registry website.

**[17:18]** I don't care. I just give people a bunch of social logins. I don't need 2FA. And they just use good practices that you already know about user authentication. So given that, I see a future where we start to decouple these configurations and DSLs from their concrete implementations and say, actually And I don't want his ear.

**[17:40]** They're great, but maybe you don't need auth zero. All you need is a way of specifying authentication. And then there can be multi either you can Vibe code an implementation that meets those requirements, and/or you can pick from one of multiple vendors.

**[17:56]** that can plug and play, match to, and meet the requirements and the specifications you have for your particular user authentication. And then the nice thing is, now the amount of specification required for an application is as deep as you care about for any subset of the application.

**[18:16]** So, if you deeply care about user authentication, yeah, you can have like 600 lines describing it in a very structured manner. If you don't care about Authentication at all, you're just going to have three default configuration settings. And the best part is if your spec is like, if my spec for user author for a simple site was just like, I don't know, I just want it to be fairly secure.

**[18:38]** The implementation of fairly secure over the year would become more and more rich and would continue to keep up to date with past keys and new things automatically. Because you could simply say, well, I don't know, what is reasonably secure now, have a detailed standard prompt for that, and then either generate or integrate with a third party tool for doing that.

**[18:59]** Okay, so if I understand correctly, it's essentially a system that enables different type of users, right, from wedding planners to people that need a more secure environment like in e-commerce and so on. to build their website in a way where they can use a DSL or describe or fill up a form that describe what exactly they need and kind of your system all the way and I'm sending people back all the way in 1996, 1997 is kind of automatically Builds that for the customer, right?

**[19:36]** Yeah. So I mean, I want to be realistic, going back and then forward. Back in 1999. I had a system. So my concrete implementation was as follows. This was back when You were using, you could use Perl still was a cool choice.

**[19:55]** You could use ASP Classic, because I don't believe. NET had dropped till about 2000. Or you could use languages. I think PHP was about, and I was using one of my clients said, We're using this thing called Cold Fusion.

**[20:08]** I'm like Sure, let's give it a go. And the fascinating thing is that by the time I stopped doing this, CodeFusion actually became the first dynamically typed language on the JVM. I'm a huge fan of Guillermoforge and Groovy.

**[20:24]** I've been involved with that community for a while, but actually, ColdFusion was there first. And so within the CodeFusion world, one of the things I liked about it is it was a dynamically typed language. And a little bit like Ruby, it was designed to make metaprogramming easy, even for people like me who's Are not very good with parentheses, so could never quite get their head around closure or common lisp or any of those.

**[20:50]** And what it allowed you to do was, I literally had these. Base classes, I had like a base class, and then I had classes for user and for product and for content and all the rest. And what it would do is it would basically load at runtime an XML file that described, oh, these are the properties of a product and these are the properties of this and that.

**[21:11]** I'd already run a script to automatically provision the database schema based upon What your properties were, and then it basically inferred, it basically used method missing. It said, well, if there's not a List method or list products or list products within a category method, then what it will do is it will use this base class method that does all that stuff.

**[21:34]** What it allowed me to do was configure 95% of the application using basically DSLs. I used XML just because it was an easy way of implementing it back then. And then for the other 5%, if I'm like, oh, no, no, no, I want my product category list to be really different for this customer, I wrote a 20-line product category list file within the class file, and it just overrode it, didn't drop down to the method missing.

**[21:58]** So I did have. Have 5% of custom code for the use cases that I'd like, yeah, nobody else is ever going to want this. But I was able to Quotes, regenerate the application. I was effectively able to do round-trip code generation because I was just interpreting these DSL files, these XML files at runtime, rather than actually generating thousands of lines of ColdFusion code.

**[22:21]** That's brilliant. It's brilliant. It's a great way to automate a lot of the work and get things done and support many customers, I assume, at the same time. Well, you know, so that was the problem. I did a great job of building out the technology.

**[22:36]** If only I'd got more customers, I would probably be coming to you live from my yacht. As it is, I'm coming to you life from my garage. What you gonna do? Hey, it's you know, sometimes you need the right time.

**[22:47]** I think the web took off only in the 2000s, right? So well, I mean, I still whether it was like Gopher and a bunch of other stuff. I'm going to get my timeline wrong. So I know everyone's going to like comment, like, dude, what do you think about it?

**[23:00]** But I think like, I remember ninety four. I feel like there were ways of interacting with stuff in maybe 93. But when was the first I think first browser was like 94, 95, it really started to become a thing.

**[23:12]** 96, 97 was when I got a bunch of companies coming in saying, Here's twenty thousand bucks. Go go build me a website. Interesting. Today it's like here, twenty million. I go do some AI agent. So, I guess, what are some of the learnings that you took from that experience?

**[23:34]** So that's a great question. Well, just very briefly, to take it from a business perspective, focus more on sales than technology. Otherwise, I would have probably done much better financially. But I just loved getting. Geeking out about the DSLs.

**[23:50]** I think the biggest takeaway for me now, especially when I see, I still remember I was at a There was like a hacker house in Beat Up is a bunch of folks from one of these kind of research science hacker houses in the Bay Area came to New York a year or two ago.

**[24:05]** And I still remember being like mortified because I I thought I was pretty cool. Like I knew I couldn't keep up with a bunch of, you know, ML researchers. I taught data science at Columbia Business School. Like, but I'm not, I'm not all that.

**[24:19]** And I still I was so excited though, because I'd read a paper like a week. Before I'm like, I got it. I'm just gonna like drop that one paper. So I, you know, I referenced whatever the paper was I'd read.

**[24:30]** Everyone looked at me like Where did you come from? It's like, didn't you see the like three updates in the last 36 hours? Like, you're like a week behind the times. Like, what are you even talking about here?

**[24:42]** So, um Given that there are these amazingly smart people who are building our future, the one thing I'd say is that it's worth looking for prior art. I look at so many problems around fundamentally, one of the problems we're trying to solve is the ability to Unambiguously and precisely specify our requirements in a way that doesn't require code.

**[25:12]** The code's great, but that should eventually become ephemeral so that, hey, you get a better model or you want to You need suddenly you get new non-functional requirements. Oh, this needs to perform better, so we're going to regenerate it in Rust versus in Python or TypeScript or whatever it was running in initially.

**[25:28]** And if we want to do that, I think the I would I used to present there was a code generation conference in Cambridge. I got to present at like Oopsler, which was a conference about like what do they call them, software product lines and code generation.

**[25:42]** So The biggest takeaway is look for the prior art. Turns out the history rhymes, and sometimes you can get inspiration and insights from something, even if it's decades old. Thank you. Thank you so much. Yeah, it's a great summary for that this learning.

**[26:02]** I always feel like with the new generation of NLP and models and everything that we do. At the end of the day, we need to know what we want to do and what we want to get done and have the language to explain that in plain English if we can.

**[26:16]** and then translate it to all the the other systems. Peter, thank you, thank you, thank you. It was fascinating. Thank you so much for taking the time. I have always been a fan. I've always been like, one day I will get to speak with you.

**[26:32]** And I'm glad I finally did. So thank you for taking the time. This was a delight. Oh, the pleasure is all mine. There's going to be the website in the comments. So please, please, please follow up with the comments so you can tap into Peter's brain through his magnificent book that he's writing. and all the cool new updates about his new company and new CTO communities.

**[26:53]** And again, thank you so much and see you soon.
