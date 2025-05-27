+++
title = "1 - Software Methodologies and Requirements Analysis"
+++

So, you have a client who has asked you to write a piece of software. The first thing you should do is *plan* your solution. Depending on who you are, this is either really exciting or really daunting. Please consult your local personality test website. The methodology you use to make your software will depend on your client's requirements, how often you'll be in contact with them, your time commitment, among other factors (including making sure nobody dies).

Methodologies fall under two categories, **Plan-driven**, which sticks to an initial plan with strict preparation before each step, and **Agile**, which increments on existing plans and work, and is more tolerant to changes in plans.

## Streams rolling down your face

It's alright, we'll get through this degree together, okay?

The **Waterfall Model** is the first of the plan-driven methodologies. Each stage of development is clearly separated into its own area, and we cannot advance to the next stage until we have completed the previous, *and* planned for the next one. This allows for clear separation of concerns. This methodology is broken down as follows:

- **Requirements Analysis** - Is what the customer asking for, feasible? Is there anything that needs to be negotiated?
- **System Design** - Create a plan for the system, making sure we know what resources we need, and that it matches the customer's needs.
- **Implementation and Unit Testing** - The coding, testing and (inevitable) debugging.
- **Integration and System Testing** - Putting everything into a live environment and making sure everything is working as it should.
- **Operation and Maintenance** - Installing the solution and maintaining it as needed.

### Pro and Cons

This model is **great** when...

- The requirements given by the customer are unlikely to change and are well-understood
- There aren't serious constraints on the number of people working on the project, allowing work to easily be distributed
- The system can be split into separate components, that can be tested and assessed individually

But this model is **poor** when...

- The customer demands a result as soon as possible (markets are quick!)
- The customer isn't exactly sure of what they want, meaning requirements are subject to change
- The software itself may deviate from the plan
- The project is very, very big (companies can change a lot in that time)

## One, Two, Web3

I thought we were past the days of expensive monkey pictures. I guess we do have GenAI though...

So, Waterfall is very *rigid*. How could we make it more flexible? The answer is **Incremental** software development. We take a description of what the customer is looking for, then we use this to create specifications, which we build into code, then test, and spit out software versions as we go. During this whole process, we can incorporate customer feedback which can be fed into the next stage of development. Keep in mind that we must still complete the last stage before moving onto the next, as was the case for Waterfall.

### Pros and Cons

This model is **great** when...

- The customer may change their mind about what they want, or suggest new features
- The customer is available to give feedback frequently over the cycle of development, and the user can provide frequent acceptance testing
- The customer wants to see the progression of the software

But, this model is **poor** when...

- There is a strict budget
- A strict design language or format needs to be followed: adding features may lead to inconsistent results
- You cannot afford to have multiple cycles of re-deployment

## Reduce, Reuse, ecyc e

**Re-use oriented software engineering** is an approach favoured by your local "web developer", but lies just a step above so-called "vibe-coders". A lot of solutions can be made by simply sticking together a bunch of pre-existing components. For example, we may use an existing web framework, such as React, and have it interact with an AWS backend, all of which needing minimal code to glue it all together. This approach takes the following steps, without any cycles:

- **Requirements Specification** - What the customer is looking for, and ensuring it's feasible
- **Component Analysis** - Seeing which requirements can be satisfied with an existing component in a library or framework.
- **Requirements Modification** - Based on the frameworks and libraries we're using, what requirements need to change in order to better fit the functionality?
- **Development and Integration** - Gluing it all together with (hopefully decent) code
- **System Validation** - Does it pass the tests, and does it work as the customer expects?

Remember that it's very standard to use a range of libraries in *any* software development, e.g. it's infeasible for a game developer to create their own 3D physics engine! Re-use oriented SE solves problems that have *already been solved*, so we're not creating heaps of our own logic to make something new, we're instead tweaking things that already exist. For example, creating an online shop in this day and age is very easy: design an interface with an existing framework, and take payments with a platform such as Shopify.

## Requirin' a dispenser here!

Wait, I don't play TF2.

**Requirements Engineering** is the process of taking a set of customer requirements and turning them into a specification which can be used to plan out a system design. It takes the following steps:

- **Feasibility Study** - Are there any requirements that are not reasonable to accomplish, e.g. processing billions of data fields at once? This creates a feasibility report.
- **Requirements Elicitation and Analysis** - Take the given information, and discuss with the customer on the current set of requirements, building on them, creating system models
- **Requirements Specification** - Creating formal documentation based on elicitation created prior, specifically a set of User and System requirements.
- **Requirements Validation** - Are these requirements agreed upon by all parties? If so, compile the final requirements document.

## Windows XP

Wait, this isn't about Microsoft.

**Extreme Programming**, often abbreviated to **XP**, is an *agile* methodology with the focus of making incremental changes to a prototype at a quick rate. There may be several builds made in a day, and the customer is very involved with the development process. XP has the following properties:

- The software may be built and tested automatically multiple times in a day
- Code may also be refactored multiple times in a days so ensure its simplicity
- Programmers work in pairs, one will code and the other will watch to make suggestions
- At least 2 people are responsible for one component of code, but anyone can work on any aspect of the system
- A deliverable is given to the customer every 2 weeks, only implementing a small amount of functionality at a time
- Planning is done incrementally, so the current build, the customer's input and existing information are all factors at any given planning stage
- There may be stand-up meetings, i.e. meetings that are so short that there is no time to sit down.
- Development is test-driven, so software is written specifically to meet requirements and achieve certain outputs
- The development cycle runs at a consistent pace, i.e. regular deliverables, one full iteration every couple of months, etc.
- The customer is always available to work with the development team

### Pros and Cons

This model is *great* when...

- The customer is *always* available to provide feedback on the system. They could be available online.
- Changes to requirements can be sudden, needing to incorporate them fast.
- A product needs to be launched as soon as possible

But, this model is **poor** when...

- The customer cannot invest their time into development.
- We are working with inexperienced or larger teams.

## "Ross! Get in the bloody scrum!"

Friends is a half-decent show, but it's definitely overrated.

**Scrum** methodology is a little more relaxed compared to XP, focussing on regularly delivering software rather than sticking to agile practices, consisting of the following stages:

- **Outline planning** - What goals do we want to reach at this stage?
- **Sprint cycle** - Produce an increment of the system.
- **Project closure** - Tie up loose ends, create documentation, and integrate the new system.

Each *sprint cycle* may last anywhere from two to four weeks, with features to focus on selected by both the development team and the customer. There are also daily meetings to establish progress, and a Scrum Master will oversee the whole process. The work at the end of each sprint is then reviewed and either fed into the next sprint or into project closure.

## Prototypes or MVPs?

A **prototype** is meant as a proof-of-concept, and is not meant to release to the public. An **MVP**, or minimum viable product is a deliverable piece of software which can, and usually is, released to the public or early adopters. Which of these two you should focus on when using *agile* methodologies depends on your customer's needs.

## Giving them what they want

Enough babbling, let's get to the drawing board and actually talk about what the customer wants. You'll likely get a specification from your client, so long as it's not your long-distance friend on discord you promised you £2 an hour to build a website for him. We need to turn this into a set of requirements which will lay the foundation of what we want to achieve. *By this stage, you should be casting aside any ideas of implementation.* We're only focussed on what the system should do, not how it should do it. **Requirements Analysis** allows us to bridge the gap between us, the developers, and the client.

### Face-off

Both you and the client will have a different interpretation of the same overarching requirement, so it makes sense then to embrace this, and allow for a client-facing side, and a developer-facing side of the same requirement. **C-requirements and D-requirements**. The former, describes what the system looks like to the end-user, and the latter will start laying the groundwork for the technical requirements of the system, hinting towards the technologies that may be needed.

- C-requirement: Your application should allow users to make changes to their profile on a modern browser.
- D-requirement: The application should use HTTP POST requests to allow their information to be updated on the server. Legacy browser support is not needed.

### The good, the bad and the... huh?

Overall, our set of requirements needs to be...

- **Prioritised** - What are the most important parts of this system? Is there anything that could realistically be omitted if time doesn't permit time to finish the full product?
- **Consistent** - None of the requirements should contradict, or override each other, or with any higher requirements, such as those for software or on the business. Saying that the app should always be available but then aiming for 99.9% uptime doesn't make any sense.
- **Modifiable** - Ideas change, so it should be possible to make changes to these requirements, and to document such changes.
- **Traceable** - You have a requirement, great, does it link back to what the customer asked for? If not, it may be irrelevant and unnecessary.

And each individual requirement should be...

- **Correct** - Again, is this requirement in-line with what the customer is asking for?
- **Feasible** - Is it realistic that this can be achieved in the allowed time and resources?
- **Necessary** - Is this a thing that the customer actually wants? If not, get rid of it, you're snowballing.
- **Unambiguous** - "The app should be responsive" is vague. What is this referring to? A fast backend? Good UI design? System-level optimised code? We want to avoid these types of situation.
- **Verifiable** - Is there a way to check that this requirement has been satisfied?

### Time to get the vodka out

We're headed to MoSCoW. Wait, let me start again. **MoSCoW** is an acronym for a possible prioritisation key that you could use to set out the importance of each requirement, while also filtering out bad ones.

- **Must** - This feature needs to be in the system.
- **Should** - We should have this feature, but not including it in the first release would be okay.
- **Could** - This should only be considered once we're sure we've nailed everything else.
- **Won't** - This is a dumb idea and should've never been considered.

### Functional Programming

Sorry, no Haskell here, sadly.

Some requirements may describe a feature that should make up part of the system, others may simply describe the way the system works generally. We can split these off into **functional** and **non-functional** requirements respectively. You may think about this as such: what are the features of this system, what would an end user expect it to do, assuming the performance was perfect? Anything else is a non-functional requirement.

For instance, clicking a button to do something, is a functional requirement. Issues regarding performance or adherence to legislation, are non-functional, since they don't affect what the system does.

### Learning to agree

This all sounds like a fairly linear process, but in reality, there's going to be back-and fourth, as you make versions upon versions of requirements analysis documents, and find a common ground where the client is getting something they want, and you are able to make something without potentially breaking any laws of physics... or laws in general for that matter. It may be necessary to conduct interviews with *stakeholders* to get a better understanding, for instance, and then we can classify requirements, group and prioritise them, before making a specification.

**Requirements Validation** is the process of having all parties review the requirements specification, and agreeing whether or not it suitably describes what is realistic, and sufficient to the client's needs. The requirements should be *valid*, *consistent*, *realistic* and *verifiable*. Once we're sure of what we want to achieve, we may then start a systematic manual analysis, start prototyping, or build some test cases.

### Other bits to consider

Of course, things can change, and the client may come back asking for more (shut it). If we have more requirements, we need to ensure they are also valid and unambiguous (problem analysis), then check the cost of making changes is viable (change analysis), and finally, update the specification (change implementation). We also need to consider the legality of what we're doing. This can even include simple things like placeholder pictures in a demo, all the way to more scary things like... will this be used to hurt people? Oh well, let's get to planning!