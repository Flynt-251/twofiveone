+++
title = "4 - Human-Computer Interaction and Testing"
+++

Unfortunately, while having a great backend makes for a good app, so does having a good frontend, and if your frontend is garbage, users will think that your whole app is garbage. Why does that sound like your average fireship quote? Also, we need to be certain that the application that we've made up to this point, is actually in line with what's being expected by the client, ensure that if something *does* go wrong (which it will, it's software for fuck's sake), that it's handled appropriately, and how to maintain the software once it goes out into the real world and starts doing big boy things.

## CSS, minus the suffering

*So, CS? That's not any better. C? Hm. Still better than where we started.*

As we said above, backends are great, but to the customer, your app can only be as good as your frontend, your user interface (UI). The way people interact with computers is a complex matter, and it continues to be studied to this day as **Human Computer Interaction (HCI)**. It's a mix of computer science and psychology which observes how we can leverage the facts of the mind to make computers more understandable and simple to use. Probably the least creepy application of CS and Psychology I've ever seen, *neuralink cough cough*.

There are four principles to HCI you should keep in mind, we'll talk more about them shortly. These are **Attention**, **Memory** (as in, the brain, not RAM), **Cognition** and **Affordances**.

### Coding? I was coding once.

*They put me in Vim. NeoVim. A NeoVim with no quit. The Vim made me crazy.*

Ever seen those videos of people using retro computers and thought, *"Hey, that looks like the command prompt"*? Well, yeah, that's basically what it is. Up until about 1983, all computers used a text-based interface, where you type commands into a prompt, and the computer uses this to perform an action. Notable examples include MS-DOS and sh. You can still use these interfaces today, although they're more so considered for power users, or people who hate modern technology.

It was only in 1983, when Steve Jobs thought we should *Think Different*, with the release of the Apple Lisa. Never heard of it? Well, that's because it flopped. But it introduced the idea of a **Graphical User Interface (GUI, often pronounced *gooey*)**, and some of the notions that we take for granted today, namely how we represent certain things on a computer: files as paper, directories as folders, deletion as a bin and so on. Apple continued pushing this idea with the Macintosh line of computers, which saw far more success.

Microsoft then leveraged this, developing a little thing called Microsoft Windows in 1985. In a later release in 1987, Apple tried to sue Microsoft, claiming they stole their idea. Apple lost, and the rest is history. Windows became its own thing, and later we got versions 2, 3, 3.1, NT 3, 4 and 5, 95, 98, 2000, ME, XP, Vista, 7, 8, 8.1, 10 and 11. Insert unoriginal joke about Microsoft not being able to count.

### LOOK AT ME.

That got your *attention*, right? Good, you'll need it for this section. And it proves my point at how important it is to consider how you use attention effectively. **Attention** describes how we choose to select certain things to concentrate on, while ignoring others. You can quite easily make grabs for attention in different ways, often through colours, sound, or having a mental breakdown on Twitter. Attention is split into four types:

- **Selective** - Tuning out other things to focus on one stimuli.
- **Sustained** - Your attention span, describing one's ability to keep focus on the same thing. A bit redundant in the age of the short-form content monopoly.
- **Divided** - Focussing on multiple things at once, like listening to music as you walk to campus, or talking to your family as you cook food. Our ability to divide our attention decreases as tasks become more complex.
- **Executive** - Like sustained attention, but you are actively keeping track of your progress on your task and goal.

UI designers and advertisers are really good at capturing your attention, exploiting the way the mind works. **You will likely read this sentence before the others, because it's in bold font.** I myself use this to capture your attention, allowing you to skim-read the text and identify concepts you want to look back over. After all, these notes are intended to help re-jog your memory of all this stuff. Other examples include use of gaussian blur that is now ubiquitous today, focussing on important aspects, and pop-ups. Our focus is a great factor in determining how we interact with something.

*Wow, that was very meta. Let's keep moving.*

### I Remember

*A classic dance track, would highly recommend listening to it*

Human memory is comparable to the memory hierarchy in memory.

- **Sensory Stores** - Visual and Auditory stores of information, held just before it enters the short-term memory. Think of this like registers on a CPU.
- **Working Memory** - Short-term memory that sends information to be processed in some way, such as storing a maths expression in your head to evaluate it. Think of this as like RAM.
- **Long-term memory** - As it says on the tin, information that's stored over a period longer than a few minutes, such as dreams, life skills, and the one time you cracked the wrong joke in front of the wrong friend group. This is like the hard disk in your computer, aging until it shreds itself to pieces.

No one is really sure how short-term memory works, and how we forget things. Some psychologists believe this memory simply decays, **decay theory**, others think new information overwrites the old, **displacement theory**, or because when we try to re-access that memory, we can't because it's in the wrong place, **proactive interface**. Long-term memory is split into two subcategories: **Episodic**, or what we colloquially call "memories", recalling moments in time and how we reconstruct them in our own heads, and **Semantic**, which is our record of facts, skills and concepts, often derived from episodic.

So how do we, as UI designers, want to leverage memory? Well, firstly we design with short-term memory in mind, since, as our computer memory analogy dictates, interactions using the short-term memory are faster. Long-term memory is larger, but it is slower and can be unreliable sometimes. What this means then, is we want to keep designs **sparse**, so we have fewer things to remember, use **colour to distinguish** things, and keep a **consistent design**. The last one is very impactful. Think about what it might infer, if you see a red X on your screen. What about a yellow triangle?

### In Cognito

*You know it's not 100% private right? At the very least it doesn't save your history, sometimes that's more useful than I realise...*

**Cognition** is how we gain knowledge, it describes our ability to understand, recall, reason, create ideas and acquire skills. It is the *application of memory*. We will discuss cognition by looking at Norman's Human Action Cycle, and the Gestalt laws of Perceptual Organisation.

**Norman's Human Action Cycle** suggests that when people use a computer, they go through seven stages. The first is denial. Let's use the example of searching for pictures by tags.

- **Form a goal** - *"I want to look at images with the tags, X, Y, and Z on this website."*
- **Intention to Act** - *"I can use the search feature, potentially excluding tags I don't want to see, or I could look at recent images and sift through those. I might see something I didn't know I wanted to see."*
- **Planning to Act** - *"I'll search for the image with these tags."*
- **Execution** - The act of typing in each tag, then selecting "Search".
- **Feedback** - The computer displays the search results.
- **Interpret Feedback** - *"This is/isn't what I wanted to see."*
- **Evaluate outcome** - *"I'm satisfied, I will move on with something else"* or, *"I should use different tags."*

This cycle can determine how effective an interface is, focussing on the **gulf of execution**, or how we set out to, and use inputs to achieve our goal, and the **gulf of evaluation**, or how we get inputs and interpret them. The gulf of execution should be *small*, so that it's as simple as possible to execute a goal. Even then, it can be made even smaller by enabling shortcuts or macros. Likewise, the gulf of evaluation should be minimal so as not to overwhelm the user or make the UI difficult to understand.

The **Gestalt Principles** are a set of principles about human visual perception, or, how we see things and process them. There are seven such principles.

- **Figure-Ground** - We usually split our vision into a "figure", which is in front and "ground", which is essentially the background. Think about when you take a picture, you have an element you are focussing on, and its background.
- **Similarity** - We take form to infer function. So, if we are given a set of green buttons, we'll generally assume these perform a similar function to each other.
- **Proximity** - Things that are close together must be related, like this bullet point list. This usually is more important than similarity.
- **Common Region** - Things in the same box must be related. Think about how we may use borders to denote this.
- **Continuity** - Objects put in a straight or curved line are perceived to be related, again, like this list.
- **Closure** - When given a complex arrangement of shapes or elements, we try to arrange them into a pattern, like how we might recognise figures when we look at clouds.
- **Focal Point** -  🟥 We are first drawn to elements that are unique. The red square should have proven this.

### We cannot afford to doomscroll

**Affordances** describe what an object allows us to do with it. Think about how you might have developed such a perception when you were younger, you can push a button, turn a dial, or put it in the square hole. In UI design, we should make our affordances clear, telling the user quite simply what they can and can't do. This doesn't always have to be a "tooltip", which is the little textbox that describes something when you hover over it, some of these may be invisible or perceptible, such as how if we see a button with a question mark in it, that if we click this box, it will give us some information about something, or how if there is a cross in the corner of something, we can hide or close an element.

### How to not be useless

If anything, you should keep in mind **Neilsons Usability Principles** when being asked to design an interface. Given that so many of you likely use a computer for more than four hours a day (yes that includes your phone), many design concepts should be common sense for you.

- **Visibility of system status** - Give feedback about what the system's status is.
- **Match between system and real-world** - Be approachable, don't use computer-specific terminology if it's not required, be general when needed.
- **User Control and Freedom** - Give the user options, e.g. an undo to go back.
- **Consistency and Standards** - Inconsistent wording and designs can be confusing and need more cognition, better to keep things similar.
- **Error recognition and recovery** - Describe errors simply, and allow options to recover from them.
- **Error prevention** - Keep the user from making mistakes and bad decisions, e.g. input validation for text boxes.
- **Recognition over recall** - Make it easy and concise to access things, instead of using a convoluted system that requires recollection.
- **Flexibility and efficiency** - Provide faster options to the user, once they become accustomed to the interface, i.e. shortcuts and macros.
- **Aesthetic and Minimal design** - Keep it simple, stupid.
- **Help and Documentation** - Offer help documents to improve understanding. Write this as if it were for a 13 year old (minus any brainrot, of course).

## 50 Insecure Dependencies Found

We depend on software a lot. We rely on it for our finances, our social life, academia, and so fourth. We all know how frustrating it is when you can't submit an assignment because the portal for it is down, or your banking app is so poorly designed that it takes way too long to pay your month's rent. We may **reject** such systems for better ones. More terrifyingly, however, badly designed software can cost lives, as seen in the Therac-25 and the six people it killed. There are many such cases where bad software **affects people directly** and **incurs massive costs**. Furthermore, all it takes is a poorly designed database to **lose data**, which may be even more important than the software itself.

We also need to keep perspective in mind, as although we, the developers, have a good understanding of how reliable a system is, *this perspective is fundamentally different to that of the user*, who has their own **perceived reliability**. Your system may be very reliable but have an unresponsive user interface, making it look unreliable.

## *Lean on me, when you're not strong*

*Actually maybe don't, I don't consider myself very strong either ;-;*

We can measure how reliable our software is, using the following questions:

- If someone requests a service, how likely is it for the system to fail the request?
  - Example: If someone want to join a meeting on a conference platform, how often will it fail to connect when the room exists?
- How often do failures occur?
- How long can the system run without encountering a failure?
- How often is the system online, i.e. how often is it *available*?

Likewise, talking about dependability could refer to a few different things. namely:

- **Availability** - Often called "Uptime".
- **Reliability** - Does the system provide the service it advertises, and does it do it well?
- **Safety** - How likely is this to cause real-world damage or kill someone?
  - *Don't confuse this with security!*
- **Confidentiality** - Can this system hold sensitive data without fear of it falling into the wrong hands?
- **Integrity** - Can we be certain that only people with the right security clearance can modify important data?
- **Maintainability** - Is the system quick and easy to fix?
  - Think about servers and the ability to hot-swap components, for example.
- **Error Tolerance** - How easily can the system recover from user errors?

But keep in mind that this isn't a complete list, and each of these points may interlink or be broken down! 

## Epic Fail!!

We may start with a **fault**, which spurs an **error**, which cannot be handled by the system, resulting in a **failure**, all of which we may represent using a **Fault-Error-Failure cycle**. Such a failure may be caused by **hardware** failing (e.g. a CPU dying), an issue in the **software** we've written, or the failure may be **operational**, where the user has done something wrong, which may be referred to as an IBM error (Idiot Behind Machine), or in Brazilian Portuguese, a BIOS Error (Bicho Ignorante Operando o Sistema.). We IT people can't help but show so much contempt towards normies. And we wonder why they hate us.

### How to stop failing

Well, reading these notes is a good start.

But in the context of system development, we have three main options:

- **Fault Avoidance** - Develop the system with consideration so that we avoid situations where a fault could occur.
  - Example: Using IDE tools to produce reliable and correct code
- **Fault detection and correction** - Basically debugging.
- **Fault tolerance** - Develop the system with some safety harnesses which manage faults and errors, allowing the system to continue working
  - Think of try-catch statements and redundant systems.

As you can imagine, it's not possible to remove every single flaw from a system before you launch it. It ends up becoming too expensive, and issues will get more and more esoteric as you go. As such then, *it's often cheaper to release the software with some very minor issues and pay for the consequences*. I think game studios have gone a *liiitle* bit overboard with this idea though.

### Keep calm and carry on

Let's look a little more into how to recover from errors. In the worst case, an error will cause some aspect of the system to go down. We should, then, account for this and allow for these components to go down *gracefully*, i.e. allow **graceful degradation**, so the system can continue working as a whole. One way of doing this is creating **redundancy**, which allows a copy of the same component to carry on where the old on left off, and we may want these to be **diverse** so that they won't fail in the same way as the original one.

Remember that this needs to apply to the whole system: not just software or hardware! A software component failing could be just as bad as a server blowing up (literally or metaphorically, depending on where your data centre is located). You should also consider the significance of consequences: does failure mean someone won't be able to enjoy a particular show, or that they'll be blasted with ten times the lethal dose of radiation (oops!)? This is why the above is useful, it allows us to **contain software failures**. Of course, the issue is it's on *you*, the developer, to fix such failures.

### Trust the Process

You need your development process to be **dependable**, so that your client can be sure they can rely on your solution, and that it has properly been reviewed so that end-users can enjoy yet another rom-com or not suffer intense trauma during a cancer treatment (seriously, some of the Therac-25 stories sound like they came straight out of a film). But what defines a dependable process?

- **Documentable** - It is clear what the steps are in the process, and how to write documentation for each step.
- **Standardised** - Is it possible to apply this process to a wide range of situations? Is it possible to stick closely to the steps involved?
- **Auditable** - Can someone *not* working on the development understand what is going on?
- **Diverse** - Use multiple, different verification and review techniques to catch problems.
- **Robust** - Can we easily recover from problems in the process?

*Fortunately*, the techniques we covered prior should be able to prevent any problems with dependability, if done correctly. Also remember that hardware is just as important, so we ensure this is dependable too, through hot-swappable server, redundant hardware and so on.

## Ol' Reliable

There are three main categories that **dependable systems** can be in.

### Protection Systems

This applies to a system which monitors operation, using sensors and a control system to manage the main system/environment as it operates. With protection systems, **we use an additional set of protection sensors and a protection system, which can leave the system in a safe state before shutting it down**, should a problem occur. This isn't unique to software engineering: protection systems are also very important in electrical engineering for example: think about how we deal with power surges.

### Self-monitoring

Here, we focus on the *consistency of data*. A self-monitoring system (*surprise surprise*) monitors its own operation, **computing a set of inputs over multiple channels to ensure the same result is being achieved**. If these give differing outputs, then we assume a problem has occurred and hence take action. For optimality, these channels should use diverse software and hardware.

### N-Version Programming

If you ask N people the same open-ended question, assuming each person acts independently, what are the odds they will give the exact same answer? *Basically zero*. The same principle applies to software engineering. So, N-Version programming leverages this by **having multiple teams design the same software unit, executing in parallel on separate machines, comparing outputs using a voting system**. Of course, this requires lots of development costs, so this should be considered, only when the first two options are not viable.

### Diversity counts!

You may notice a pattern throughout this portion of the notes. **Diversity prevents problems!** Just as there are many ways to write a piece of software, there's many ways to cook a steak: searing, grilling, toaster, etc... One method may be more consistent, another more flavourful, one more... likely to give you food poisoning. But either way, diverse programming allows us to spot bugs more easily, preventing harm from being caused.

## Welcome to Test Chamber 4. You're doing quite well.

*Go play Portal 1 and 2 after you're done revising. They're good games.*
*(And Wheatley is voiced by a Warwick Grad!)*

Nobody wants to hear it, but **Testing** is very, very important. It prevents rockets from blowing up in the sky, radiotherapy worsening cancer (again?), and shareholders from losing millions of dollars (could be worse tbf). For a more "fun" example, a bug in the Zelda game Skyward Sword, essentially soft-locked the game and prevented some players from progressing to the end of the game. This is a clear issue from a lack of testing by quality assurance, but since then, Nintendo has gotten much better about testing (generally. hm.).

### Dang static electricity!

**Static testing** doesn't involve any execution of code at all. Instead, it entails looking directly at code and documentation, to ensure if in theory it is achieving the correct result. You could essentially describe this as program *verification* against the specification. We do both code and documentation as this challenges our *understanding* of what is being asked, ensuring we avoid problems quickly, saving ourselves headache down the line.

Static testing is useful, as we don't need a complete code base to do it, plus it's a good chance to refactor code, especially getting rid of abhorrent one-liners. About 90% of errors can be found through inspection, so it's worth your time! We may also use *linters* to help us spot issues, especially if you use visual studio code a lot.

### `39 out of 70 tests failed.`

Oops, sorry for scaring you there!

**Dynamic Testing** is where we actually run code against a set of test cases, to make sure it's doing the correct thing. This is especially important where concurrency or hardware are involved, as there are some factors which we may have previously failed to consider, such as race conditions or bad performance. Of course, we need explicit test cases and plans for this, so we use a set of test data, and ensure we know the correct outputs, *before we even think about writing any code*.

There are two types of dynamic testing, **White-box/Structural Testing** and **Black-box/Functional Testing**.

#### White Box Testing

With white-box testing, the focus is on the *structure* of the code. We may analyse a piece of code or an algorithm, and look at what variables are defined, and how they are used, abstracting this information into a flow diagram, allowing us to identify branches and loops. **We want to develop test cases that explore all branches and possibilities.** This ensures we cover the whole of the code.

#### Black Box Testing

For black box testing, we ensure a component's *functionality*, only caring about what we expect will happen when we put certain values in. **We create a set of test inputs, and determine their correct outputs, and test the code on these expected outcomes, all without looking at the code.** This type of testing includes unit tests, integration tests and system tests. Speaking of...

#### Units, Ints and Sys

- **Unit Testing** - Tests one specific component, i.e. a single file, class or thread of execution. We often automate these types of tests.
- **Integration Testing** - Starts putting the whole system together, ensuring components are interacting properly, highlighting interface misuse or misunderstanding, or timing errors.
- **System Testing** - Testing the system as a whole, including any off-the-shelf components we may want to use. There's often emergent behaviour here, that's not visible in integration testing.

### Let's take this for a test drive

**Test-driven Development** is a now widely-accepted paradigm, where we write tests before our code, and write new tests at every increment of code we make: start by identifying what could be added, write the test for it (which will of course fail), implement the functionality, test it, and keep modifying the increment until all tests pass. Rinse and repeat until you have the final code you're looking for.

Doing this allows us to better keep in mind what our code is actually meant to do, and allows us to keep in mind any common pitfalls, such as avoiding divisions by zero, or handling a null input.

## "How on earth did you do THAT??"

*Especially* nobody wants to hear it, but at some point, your client then needs to test your system to make sure it fits their needs and that it achieves what it was set out to achieve. Here's a fictional anecdote you may have heard before:

> A group of engineers design a robot bartender. They account for various different scenarios in which the robot may be asked to make drinks. They account for a customer asking the robot to make one drink, two drinks, three... infinite drinks, zero drinks, minus one drink, half a drink... you get the idea. After all of that testing, the team finally trials the robot in an actual bar.
>
> The first customer walks into the bar and asks the simple question: "Where's the bathroom?"
>
> The robot explodes.

Of course, the point of this is, as a software developer, you have to expect *everything*. The way someone may operate a program or computer may seem asinine or counter-intuitive, but you still need to keep it in mind. People's brains work in mysterious ways, *yours included*.

### Alpha Testing

The next time someone tells you they're an alpha, know that they're still in the works and you should do what you can to point out their flaws, as this is the point of **alpha testing**. This happens during development, and is important as it prevents bugs that could massively alter the course of development.

### Beta Testing

If, on the other hand, someone tells you they're a beta, they're mostly complete, but may have some minor flaws which you can help them to correct. **Beta testing** introduces the system to a wider, more open user base who can give their feedback, showing how the system works in a more complete form. Beta testing itself is often a form of marketing, think about the number of games you may have played while they were still in beta form!

### Acceptance Testing

*The final frontier...*

At the earliest stage of development, you and the client should have agreed on some **acceptance criteria**, which you will have gone away and converted into a **test plan**, from which you'll make a set of **acceptance tests**, mainly consisting of a *user journey*, describing what a user might intend to do, and what the expected outcome is. We then **run these tests** and then **negotiate the results** with the client. At long last, the client then gives their final judgement over whether or not they **accept or reject the system**. If they reject... get back to work. If they accept, *congratulations*! You've just built a piece of software that will (hopefully) be used in the real world and not kill anyone! Unless you're working for a military company, but I won't get into that hot mess.

## Welcome to the real world

So, you now have some software that's ready to be deployed into the real world. Again, give yourself a pat on the back, that's a hellride in and of itself. But the ride never ends, unfortunately. What? You thought all of this was just a one-off? Ha! There's still a bit more we need to consider, namely version control, data management, system building and dealing with change.

### You complete git

You've been using git, right? You should be. Even these notes you're reading right now use git! So stop what you're doing, and take a moment to thank Linus Torvalds. Git is just one example of **version control**, it lets us manage our code much more easily as we begin to near the end of development and start to squish out those last few bugs. Using version control allows us to roll-back to earlier working versions of the software and create (cloud-based) backups, mitigating human or technical error where the code base could get lost, or important patches disappear.

Once you're ready to send your software out into the real world, you may have multiple environments (or branches) you release on:

- **Development** - Where you continue making bug fixes and refactoring.
- **Feature** - Where new or additional features may be implemented but not fully tested.
- **Master** (huff...) - The main branch, the code used by the vast majority of the user base.
- **Test** - May include beta versions with bundles of new features.

### Build it, and they will come

Remember that what you've created is just code. It then needs to be compiled, copied to a server, and then made live. Here's a list of things we can do, which form a pre-flight checklist.

- **Build Script generation** - Think of your makefile or dockerfile, which compiles all of your components to make them executable. We may automate the creation of this.
- **Version Control System Integration** - Ensure we use the correct code, e.g. master and not development!
- **Minimal recompilation** - If we need to rebuild, only rebuild the components that need it: no need to recompile something that has no changes.
- **Executable System creation** - Link everything to a single executable file to ensure easy setup or install. Think of those "Install Wizards" you see all the time on Windows.
- **Test Automation** - Before the final build, run tests to make absolutely sure that everything is working correctly.
- **Reporting** - Did the system build correctly? Are there any problems?
- **Documentation Generation** - Include generation of documentation or help pages for the end user.

We should also consider three different systems, the **Development** system, which may feature different versions from different developers, the **Build** server, which holds the primary version of the development system, and the **Target Environment**, which integrates databases and other additional components. Builds may take a very long time to complete, but we can compile small components in testing/development, as seen in agile. Even still, we may be unable to build an entire system frequently, so it may make sense to reduce the number of builds made overall.

### Sorry boss, we lost the medical records

**Data management** can be extremely important, in the times where data is incredibly valuable, but also very risky if not managed properly. So, during development, we use **dummy or test data**, then transition to using real data in production. Dummy data can be quite safely manipulated without disrupting anything or causing major issues, it's why we use it in development, but when we move to real data, there are other things we have to consider:

- **Availability** - How is the data accessed?
- **Constraints on acquisition** - Do we have limited access rates, security requirements, etc.?
- **Overhead** - Live databases are usually much bigger than test ones, is there any issues regarding such overhead?
- **Backups** - What if things go wrong? Is there an active archive or backup of data we can fall back on?
- **Constraints on sharing and access** - Is GDPR being followed?

Improperly handling live data has very serious consequences, and data breaches can affect thousands of people, so it's vital that these factors are considered during release management. Not to mention you have people like me who are very paranoid about privacy.

### Talking biz

Okay, *now* we talk about releasing software. It's an expensive process, so we want to make sure we do it at the right time, and in the right way. If we release new software versions too often, the changes will be incremental and customers will not feel a need to upgrade, but too little and customers will move on to other competitors as the current version ages.

Marketing and appearances are very important, but we won't go into too much detail about those. We do need a way for users to access the software and start using it, and to make the process as easy as possible, so we may include installation instructions on a website, and possibly create some sort of installer, again think of the installer wizards that are so common on Windows. We may also want to include web pages or wiki articles for further documentation, possibly even a forum to facilitate the discussion of issues.

Going back to upgrades, we can't assume that users are on a particular version of the software before they upgrade. If you need to be on a certain version to upgrade to the latest, offer an upgrade to that older version as well. Even then, this can get rather sticky as some people will skip upgrades if they don't see the point (think Windows XP to Vista to 7, many people skipped Vista), and upgrades can cause loss of features or data. Unfortunately, this is a problem that Software as a Service (SaaS) fixes, as updates are simply rolled out automatically.

Here's the rundown of what you should consider as you make releases of software:

- **Record your dependencies clearly**, if you don't, you may forget important components.
- **Hide your physical distribution**: allow users to download binaries on mirrors, and not to let them access the code repository directly.
- **Releases should require minimal effort** for the developer and client alike.
- **Scope of releases should be controllable**, i.e. we should be able to easily control who can download which version
- **Sufficient descriptive information should be made available**, a changelog
- If some systems are interdependent, we should be able to retrieve them as a group.
- Likewise, if we don't depend on something, don't retrieve it.
- Keep a history of releases, often called a release log.

### A look into the future

We can almost never fully guarantee something is bug or issue free, plus the other software components we depend on can change, e.g. the database software needs to be upgraded for security reasons. Unlike what the UWCS tech team will tell you, *directly committing changes to the production branch is generally a very, very bad idea*. We need to consider the impact of making changes.

- **What if we don't make the change?** - Will we lose support for something? Will it make our system less stable? Consider if there is a significant push factor.
- **How beneficial is the change?** - Do we get added security? Will this fix a major issue that user have? Consider what pull the change has.
- **How many users will be affected?** - A change might break a feature (ex bug) that users rely on. Will any users need to re-learn parts of the system?
- **How costly is it?** - Big changes may make more bugs than they fix. Consider if there is sufficient ability to fix such bugs and manage the cost.
- **When was the last release?** - Again, don't make it too soon as to overwhelm users. If it's not urgent, hold off.

Change is something we embrace with Agile methodologies, particularly from the client, although we can make our own changes, if we think it's beneficial. It's up to you, the developer, to decide what changes are and aren't important and make priorities.

## The end.

So that's it, now you know how to make software that might just be used in the real world. Try not to kill anyone! (Yes I understand that might be difficult if that is in fact the aim of what you're developing...)