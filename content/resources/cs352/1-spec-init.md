+++
title="1 - Specification and Initiation"
+++

*Here we go. It's the bigger, badder version of Professional Skills.*

Let's get the first obvious question out of the way. We need Project Management, because we need to be sure we know what we're doing, why, how we plan to do things, and to show that we've thought everything through properly. It is an ongoing process, that starts before a project begins, and ends well after said project ends. It's to ensure that the project *succeeds*, and what success looks like may not always be clear.

For instance, a project may go under budget, and finish earlier than expected, but then hiccups in the result's maintenance mean it ultimately causes headaches down the line. Conversely, you may have a billion-dollar project (quite literally) blow up in your face, but the lessons you learn from that, may ultimately help you to build more successful projects, and ultimately be more thoughtful about your work.

Also, it's worth remembering that **planning isn't a one-time endeavour, it's an ongoing process that runs parallel to the execution**. Things deviate from original plans, life happens, reality sets in - you need to be able to account for this, and doing all of your planning in one go doesn't let you do that. For example, let's say you make a great big specification for a software development project, promising to deliver similar functionality to existing competitors. Did you factor in the research for that? What about getting to grips with the relevant protocols and software libraries? Do you know how it's all gonna glue together? Projects aren't *just* about the end goal, they're also about learning how to manage a big idea, and they're a learning opportunity. Why am I telling you all this? Because it took me my own dissertation to properly recognise it. I'm not happy with how it turned out, but in retrospect, I learned a lot about software development and just how important it is to back up a design with thorough research.

![The Bernie Sanders Meme with the text: "I am once again going to reference the Therac-25"](/images/resources/cs352/bernie-sanders-therac-25.png)

Forgive me, this is gonna be a bit morbid. The Therac-25 ultimately caused six serious incidents where patients received huge overdoses of radiation treatment, leading to either life-changing conditions or death soon after. It was found after review, that such incidents were mainly due to poor software design, given it was essentially ported from older machines, supposedly by just one person, most likely without any proper review. While in the short-term, this is a huge failure in breaching trust in patients and doctors, some level of success came out of it by highlighting just how important it is to undertake code review, not pin huge undertakings to single people, and properly consider all stakeholders.

It does make me sick to my stomach to have to justify the harm these people came to at all, but given it's an example that's stuck with me for so long, I think it makes sense to include it. The point here is to recognise that we should consider *all* aspects of a project and its outcomes.

## Anyone remember those SMART whiteboards?

*The pens never worked correctly*

While planning your project, you should write out what exactly you want to achieve first, via a set of objectives, *before you plan anything else*. Doing otherwise could lead to solution bias, a problem I'm very much familiar with. These objectives should follow the SMART set of characteristics, to ensure optimal benefits and improvements.

- **Specific** - Does this pertain to one particular thing, or is it too vague? If so, break it down.
- **Measurable** - Are we able to know for sure once we achieve this goal? How would we come to such conclusion?
- **Achievable** - Are you being realistic with this, in the given context? Know your limitations.
- **Relevant** - Is this giving the stakeholder(s) something they actually want, or is this something superfluous that only you care about?
- **Time-bound** - Will there be a certain time you aim to achieve this goal? Why this time specifically?

## Does a metal pipe sound any different when it's triangular?

The Quality of your project is constrained by three main variables: Cost, Time and Scope, and typically we can only realistically achieve two of these: so something cheap and fast, but narrow, broad and fast but expensive, or broad and cheap but slow. This is what's often called the **Iron Triangle**. Where your project lies within this triangle largely depends on where your customer's priorities are at. So if your customer needs a piece of software of minimal cost, which can be brought to market as soon as possible, then it will need to start off with having a very specific purpose, with little wiggle-room for additional features.

But in some cases, this may be expanded out into the *Titanium Tetrahedron*, which also adds Quality as its own point. Or what about the *Hard Hexagram*, which then adds Risk and Resources too? Or even, the *Difficult Decagon*, which then further extends these with Procurement, Stakeholders, Communication and Integration..? Well, I think at that rate that's too much to think about, but this ties in nicely with...

## Ten Times Five is Fourty Nine

*Is this some more synergy, two plus two is five bullshit?*

All in all, PMBOK defines that Project Managers should be aware of the following ten *Knowledge Areas*:

- **Scope** - Defining requirements, and ensuring they're feasiable.
- **Time** - Making a schedule, and ensuring it's being stuck to.
- **Cost** - Estimating costs, making budgets, that fun stuff.
- **Quality** - How are we meeting the specification? Does this match the customer's expectations?
- **Resources** - What do we need, and how do we manage it? This includes human resources, for better or for worse.
- **Procurement** - Getting ahold of what we need, getting goods and services for the best possible value.
- **Stakeholders** - Who are our stakeholders? How to we engage with them, and involve them in the project's lifecycle?
- **Communications** - Are all groups and teams talking to each other effectively? Is everyone kept up-to-date on the status of the project?
- **Integration** - Tying everything together, with a project charter, plan, stage transitions, and so on, so that we learn as much as we can from the project itself.

And, there are five *process groups*, which outlines the lifecycle of the project.

- **Initiation** - Why are we doing this project?
- **Planning** - Setting out a budget, timescale, risk management, objectives and so on.
- **Execution** - Doing the what-we-say-we-will-do.
- **Monitoring and Controlling** - Done in both planning and execution, to ensure we are making good progress.
- **Closing** - Deliver the thing, and make reflections.

And together, these form PMBOK's 49 individual processes. Don't ask me why there's 49 of them. The Project Management Book of Knowledge (hence, PMBOK, because that's a mouthful), is referenced a lot in this module, so it's worth having a copy of it at the ready. And of course, a PDF file of the whole thing isn't hard to find ;)

## Charter? More like Sharter

*Project diarrhoea all over the floor*

Okay, let's finally stop planning to plan your project, and let's actually plan it. It all starts with your **Project Mandate**, which explains what your project is, its scope, your constraints, assumptions, and any possible risks. This is the first part of your Project Charter.

Your **Project Charter** marks the official start of your project. It's not necessarily a single document as well - it's composed of your *mandate* (see above), your *business case* to explain how your project is worth investing in, *agreements/contracts*, *quality standards* and any *organisational processes*, plus lessons taken from previous projects.

You'll use all of the above to then produce a set of outputs, namely your project *justification*, a set of *objectives*, high level *risks, constraints, boundaries and objectives*, a *schedule*, a *budget*, and a list of important people, namely *stakeholders*, *authority of sponsor* and *project manager* (who might just so happen to be you!).

## Call me a vampire slayer the way I'm holding this stake

*Sorry, werewolves are better. Yes it was me who asked that question in the Halloween lecture.*

**Stakeholders** are anyone who has any involvement in the project. This could be very directly so, such as your customer who you're making software for, or indirectly, such as the general public, who will see out the effects of the deployment of said software. This could also include sponsors, sellers of components for your project, groups in your workplace, or your managers. You yourself are also a stakeholder!

As hard as it is, we want to try and keep everybody happy here, so we need to know how much a particular stakeholder is interested in the project, and how much power they hold over it. We visualise this on a **Power-Interest Grid**, as shown below. Each group is placed on a plot in this grid.

![Power Interest Grid](/images/resources/cs352/power-interest.png)

(Source: [Latha Thamma reddi on projectmanagement.com](https://www.projectmanagement.com/wikis/368897/Stakeholder-Analysis--using-the-Power-Interest-Grid))

