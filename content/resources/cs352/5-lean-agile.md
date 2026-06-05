+++
title="5 - Lean and Agile"
+++

Now to talk about how we actually do the work we set out for ourselves. No doubt some of what will be covered here will be reminiscent of CS261, but this will provide a more general idea of how to organise a workload, not just a bunch of code. This section will focus additionally on how we decide when to work and what to produce. Fun fact, it's not all about doing as much work as you can, so slack a bit, take a break from those job applications (seriously, it's good for your health and prevents you burning out).

## I can't put down the cup

*I'm sipping on that Promethazine (actually don't)*

We begin by looking at Toyota. Definitely not the most famous car brand out there, but certainly not the worst. They've served me and my family well for the past ten years or so. Toyota's manufacturing process follows seven principles, known as the **Lean principles**.

- Eliminate Waste
- Amplify Learning
- Defer Commitment
- Deliver Fast
- Empower the Team
- Build Integrity in
- See the whole

### Bad day for raccoons

Let's begin by looking at that first point, *eliminating waste*. There are three Japanese concepts which describe the different types of waste in manufacturing.

- **無理 (Muri) - Overburden** - This refers to overloading your workers (man and machine) with too much work, you cannot expect to work for long at an unsustainable pace.
- **無駄 (Muda) - Wastefulness** - Performing work or tasks that create no value for the customer. Frivolous or superfluous, if you will.
- **斑 (Mura) - Unevenness** - Inconsistency in the flow and pacing of work. This could include things like putting off work and then crunching for deadlines, or allocating work to workers unevenly.

Really, most of the Lean principles have something to do with reducing waste along with the first: deferring commitment reduces how long things sit around, as does delivering fast. Empowering the team makes sure all skills get properly utilised, and then building integrity ensures minimal defects.

### Hamburbger.

Next, we introduce the concept of **Kanban (かんばん)**, another Japanese concept. But, to look at this one, we'll use the example of... fast food? Yes, indeed, fast food companies use Kanban to manage the workflow.

To talk about Kanban, we need to get familiar with the idea of *push and pull*. What this means is, in times of *push*, we may produce in times of anticipation, *"Make this many in case we need them"*. As you can imagine, this can promote the three wastes we introduced earlier. Instead, *pull* describes the case where we produce what we need, when we need it.

If you think about it, this is indeed how fast food restaurants operate - you make an order, the kitchen quickly prepares it, and then it sits on a buffer before being packaged together and handed over to you. They don't make a whole tonne of burgers and fries when the day starts, they only make what is asked for, when it's needed - this keeps the staff from being overwhelmed with many hypothetical orders, ensures no food has to be thrown out at the end of the day, and ensures a consistent working pace.

#### What do burgers and git commits have in common?

We can apply this idea to software development, namely agile (which we'll get to in a bit), where we converse with the customer about features they'd like, then the "kitchen" (developers) take a feature at a time, "cook" (develop) it, send it out to a buffer for testers to finalise it, before then packaging it and handing it over to the customer. Much like how fast food places have those screens which track orders, we may use a *kanban board* to track requested features, see who's working on what, and what's been done.

With regard to the whole project, we may make a **WIP-limited pull system**, where the full software project is a work-in-progress, limiting work to just a small set of tasks and keep things from spiralling out of control. This is aided by the pull approach. *It's leaner to do all of one thing than half of two things, and only focus on what's required.*

Now, people are people and software is software, and so sometimes you'll run into **Blockers**, like "I don't know what to do with this bug I can't solve", or **Idleness**, like "I keep finishing all of my tickets, so I have no work to do". Try not to see these as inconveniences to you, rather see these as gaps in your implementation of Kanban. People keep finishing their work faster than anticipated? See what more they could do. People keep running into bugs they can't solve? Maybe get more people working on particular features to solve problems. It is especially worth listening to workers constantly, and building good trust and relationships, so that everyone's voices are heard.

### Most Vital Project

It's easy to dream up a variety of features for a software project, make it all look sleek and akin to something you'd see in an Avdan YouTube video, but really, we have to remember that the customer likely doesn't care about that. Instead, you should aim to make a **Minimum Viable Product (MVP)**, where you only focus on what the customer asked for, and hand that to them. No waste. Lower costs. Faster delivery.

This is desirable, as if your project takes longer than expected, you at least have something usable to show for it. If you started that glorious dream project you had, you'll likely end up with something half-baked and completely unusable. That's bound to gete you in hot water. Instead, if you trim the fat and get something that might not look great, but gets the job done, well, you've done exactly that. You can then build on it later if you need to.

### The Drug House

The Lean Principles are often expanded to give the "Lean House", a set of principles held up by two "pillars", both of which lay on a strong foundation.

![Lean Pillars Image](/images/resources/cs352/lean-pillars.png)
By Laurensvanlieshout, CC BY-SA 3.0, [https://commons.wikimedia.org/w/index.php?curid=1851969](https://commons.wikimedia.org/w/index.php?curid=1851969)

**Just-in-time** refers back to the concept of pull we saw in Kanban, don't bother making everything in advance, make things as they are needed, and keep things flowing.

**Jidoka**, on the other hand, refers to the use of automation. Ideally, we want to automate as much of the process as possible, being sure to stop where there is a fault, with appropriate intervention. This starts with machine monitoring, then a supervised automated system, then a self-monitoring system that can handle most faults, with a human worker available to intervene if needed.

**Heijunka** is about levelling out production, which is why it's the foundation to JIT. We focus on making smaller batches to avoid uneven production.

Lastly, **Kaizen** refers to continuous improvement. Defects happen, errors get made, accidents happen, so it's important we learn from all of these to keep the flow of production up, and continually reduce as much waste as possible.

We compile all of this into a set of **Pillars**.

- **Identify Value** - We create the value, the customer defines what it is.
- **Map the Value Stream** - Lay out what it looks like to go from our materials, to our final product. This lets us identify and cut out wastes.
- **Create Flow** - As long as you have good flow, you have good value.
- **Establish Pull** - Make just-in-time, don't stockpile.
- **Seek Perfection** - Don't be perfectionist per se, rather, seek continuous improvement.

## The waterfall is a lie

Before we start our talk on Agile software development, let's first discuss the **Waterfall Software Development Cycle**. This follows a set of stages, each only linked by documentation of the starts and ends of each one. There's no going back or skipping ahead.

- System Requirements
- Software Requirements
- Analysis
- Program Design
- Coding
- Testing
- Operations

Easy, repeatable, and clear in its responsibilities and expectations. However, the main pitfall of this is, if there's a fault, and we have to go back and do something, we have to start the whole process from scratch. It's also unrealistic that we can be THAT good at planning and so inflexible to change. Really, everyone knows that this model is pretty crap (even its creator!), this is simply an old relic back in a time when computers had five kilobytes (yes, five thousand bytes!) of memory.

So now we compare this to **Agile Methodologies**. Where waterfall is driven by a set plan with a rigid scope and stages, all of which could collapse under risk, agile is driven by value (i.e. requirements), with rigid time and cost and flexible scope and stages, where risk declines as we move forward. The [Agile Manifesto](https://agilemanifesto.org/) puts it as such:

- **Individuals and interactions** over processes and tools
- **Working Software** over comprehensive documentation
- **Customer Collaboration** over contract negotiation
- **Responding to change** over following a plan

They also define some nice principles:

- Early and continuous delivery of valuable software
- Welcome changing requirements, even late in development
- Deliver working software frequently, usually every two weeks
- Business people and developers must work together daily
- Build around motivations individuals with support and trust
- Face-to-face conversations
- Working Software is the primary measure of progress
- Sustainability (of workflow)
- Excellence
- Self-organising teams
- Reflect on how to become more effective

### Agility is not on everyone's side

Remember that Agile Methodologies are a tool for software development, not a silver bullet. In some cases, trying to use agile for a project works out just as well as using a power drill to put together an electronic device held together with screws. Here are some ways agile may NOT be suitable:

- **You already know what you're doing, and customers aren't always available to talk** - If your requirements are already set out, and the customer wants you to simply get on with things, then you won't benefit from constant communication.
- **The market's stable** - Agile is meant to rapidly respond to changes in the market, so if a change means a new feature can be added, then agility is needed. Again, if things are straightforward, there's no benefit.
- **Mistakes are not acceptable** - Agile leads to imperfect software and lessons we can learn from. If we cannot afford mistakes in the final product, this could lead to catastrophe.
- **You're solving a simple problem** - Need we say it again? If the goals are straightforward, then requirements won't really change, hence agile loses its benefit. Agile works best in uncertainty where we're looking to innovate.
- **In order to deliver, the whole thing needs to be done** - At every iteration of agile, we produce an incremental deliverable. Sometimes this simply isn't possible: the customer needs to see everything developed before giving feedback.

### Why is there rugby in my software?

**Scrum** is one of the most common agile methodologies. We generate a series of *user stories*, where each one describes an action a particular type of user might want to perform, and why it's important. We then assign a priority, size estimation and end goal to each of these. An *epic* is a grouping of related user stories, and a theme is the overall objective of the project. It's quite a practical way to capture the scope and requirements of the product.

Once the **Product Owner** has established our features this way form the stakeholders, we organise a team which decides how much work to take off the backlog and perform in the next 1-4 week **sprint**. In the process of the sprint, a **Scrum Master** is appointed, who heads **daily scrum meetings and artifact updates**. At the end of a number of sprints, the team performs a review of their potential minimum viable product which they can present to the product owner. Note that we've defined three *distinct* roles here...

- The **Product Owner** represents the customer's views, managing user stories to help direct the team, and is responsible for managing funding.
- The **Development Team** consists of developers, testers, designers and so on. This group consists of three to nine members, with larger teams required to split into multiple groups.
- The **Scrum Master** is NOT a manager, rather a servant leader, which means they work across teams to improve communication and host the meetings needed, including sprint plans, daily stand-up meetings and reviews.

Speaking of stand-ups, the **Daily Stand-Up** is the daily meeting in scrum sprints, where the meeting is so short (like, five minutes), that you will not have the time to sit down! Here, you and the team discuss what you've got done yesterday, what you plan to do today, and any issues or *blockers* you're running into.

### Agile Burger-flipping

*SpongeBob would be proud*

Should you use Scrum or Kanban? There's a list of reasons one may work over the other, but generally speaking, Scrum allows for greater planning of larger chunks of work, like sets of features or major components of a software solution, whereas Kanban is more ideal for single features which smaller groups can work on, and with less planning. That being said, [you can use both to some extent](https://www.scrum.org/scrum-kanban).

- If work is requested bit by bit, by the customer, rather than as a set of vague ideas, *use Kanban*.
- If you're working up to a particular goal or final product that you can realise, rather than just continually developing, *use Scrum*.
- If you still need some planning with discrete timeboxes, *use Scrum*.
- If work arrives continuously creating flow, *use Kanban*.

### Beyond the Scrum

*Now for where all the other injuries occur*

Remember that while Scrum is one of the most popular methodologies, it's not the ONLY one.

- **eXtreme Programming (XP)** - consists of agile planning, collaboration, pair programming, quality code, and continuous feedback, XP is a test-oriented approach with usually a two-week turnaround at each iteration.
- **Crystal Method** - A group of methods designed to be lightweight and adaptable across multiple sizes of teams. The smaller the team, the faster releases are, and the less testing is needed. As team sizes grow, more rigid release schedules and testing is prescribed.
- **Rapid Application Development (RAD)** - Create prototypes that are iterated upon, using a user design phase.
- **Test-Driven Development (TDD)** - Make requirements, make test cases for those requirements based on use-cases, then write the code. Once tests are passed, refactor.
- **Feature-Driven Development (FDD)** - Focus on client-value functionality.

Up to this point, we've discussed agile development in the *construction*, or execution phase of the project, but it is applicable to an entire project's lifecycle. At the start or, *inception* of the project, we may use a few shorter sprints to set out some initial requirements in the product backlog with the customer, being sure to gain stakeholder consensus before proceeding.

After construction, we may then perform a couple more sprints in the *transition* into the *production*, where we deliver our final solution. However, we may at some point find it necessary to go back to the backlog and start from the beginning. This is all part of the **Scaled Agile Framework**. We can also incorporate Agile methodologies into PRINCE2, namely in the execution of each stage, where at the end of a set of sprints, we release our work and proceed on to the next stage.