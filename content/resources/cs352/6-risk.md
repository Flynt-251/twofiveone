+++
title="6 - Risk Management"
+++

Recall that a big part of the reason we do a project is that we want to step outside the normal boundaries of what we do, and hence take at least some level of **Risk**, or uncertainty on objectives. It's worth remembering that risk isn't necessarily something to be afraid of, more so something to have awareness of, and we can deal with it in a number of different ways, from simply accepting it, to changing factors to reduce the impact, to completely avoiding the risk altogether. Heck, risks can be positive, those are called opportunities.

In **PRINCE2**, we establish a *Risk Planning Cycle*, where we identify risks, assess their probability and consequences, plan strategies and responses to these risks, monitor and implement the responses, then finally communicate the results. This recognises the fact that, similar to planning itself, risk assessment is a continuous, repeated process.

## Risky Biz

*Failed to commit changes*

Here's an overview of the risks in software development:

### Users

- Resistance to Change
- Conflict between users
- Negative attitudes towards the project
- Lack of commitment
- Lack of cooperation

### Team

- Inexperience
- Lack of training
- Lack of specialised skills

### Organisational Environment

- Change in management
- Negative corporate politics
- Unstable environment
- Organisation restructuring

### Planning and Control

- Lack of effective Project Management technology
- Lack of close monitoring
- Bad estimation of required resources
- Poor Planning
- Poorly defined milestones
- Inexperienced Project Manager
- Ineffective Communication

### System Requirements

- Continually Changing
- Not properly identified
- Unclear or incorrect

### Complexity

- New technology
- High technical complexity
- Immature technology
- Technology new to the organisation

### On adopting new technology

When a new technology or innovation comes out, usually the expectations start very low, until they start to grow way out of proportion into a massive hype around it. Soon enough, though, this drops and can then overshoot into a trough of disillusionment. Eventually, reality catches back up, and we hit a plateau of productivity where expectations are relatively normal and match the technology's capabilities. We need to make sure to maintain this expectation though, as things can very much turn south and collapse.

## That's a bit RACI, don't you think?

A **Responsibility Assignment (RACI) Matrix** is a table which is associated to a WBS, where each task is lined up against each person in the team. In a cell, one person may be assigned an R, A, C or I. This identifies each person's assigned role in the project, and as such, who is involved if things go awry.

- **R**esponsible - These people are mainly in control of the task, and are the ones working on it. At LEAST one person should be responsible.
- **A**ccountable - The primary person who is answerable for the task. Every task must have EXACTLY ONE person accountable for it.
- **C**onsulted - This person should be in the know about this task, and as such be a source of information about how it should proceed. They might not be working on it, but their views should contribute to it.
- **I**nformed - This person should know about this task's progress.

## Getting to the Route of things

Once we've established who's responsible and accountable for what, we can then look into identifying what our risks are. We can do this in four different ways, using **SWOT** Analysis, **Risk Breakdown Structure (RBS)**, or using **Decision Tree** Analysis.
### Don't SWOT streamers

*I mean, it's your tax dollars at the end of the day.*

By far the simplest and most abstract method of identifying risks. We simply draw a 2-by-2 grid, where our two columns differentiate between helpful and harmful risks, and the two rows, internal and external risks. Hence, for each field, we have the following:

- **Strengths** (Helpful and Internal) - What we're good at.
- **Weaknesses** (Harmful and Internal) - What we do which could use improvement.
- **Opportunities** (Helpful and External) - What could we achieve?
- **Threats** (Harmful and External) - What possible challenges could we face?

### Evil WBS isn't real, it can't hurt you

**Risk Breakdown Structure** (RBS), much like a Work Breakdown Structure, breaks a project down into its components, then into subcomponents, then for each of these, identifies aspects of each which have some level of risk to them. This way, we get a rather fine-grained look into the risks of the project.

### Decision Tree? I think you're the one who needs to pick the plants.

A **Decision Tree** is the most thorough means of risk identification, as it requires us to additionally assess financial loss, and probabilities. We begin by identifying an overarching problem, and then identify the associated decisions we could make to resolve this problem, what things *could* happen which we cannot control directly, and the outcomes. We model these as decision, chance and outcome nodes.

1. Start with the overall problem. In this case, let's say we're working on a server, and we notice one of the hard drives is going bad and will need to be replaced. The server overall is getting pretty old anyway, so it won't be long until the rest of the drives and the whole system goes down.
2. Direct the problem into a **Square Decision Node**. From here, we can branch into different solutions.
	1. Do nothing, and let the system run as it is. It'll still run fine since the hard drives are set up with redundancy. In maintenance costs, assume this will cost £500.
	2. Replace the dead hard drive. Because of the current shitstorm with hard drives, and the need for enterprise level storage, assume this will cost £800.
	3. Rebuild the entire server from scratch. This will cost £8,000.
3. For each decision we made, direct each one to a **Circle Decision Node**. Branch into the different possible outcomes for each one, along with its monetary gain.
	1. Doing nothing will mean the system eventually fails.
		1. This will either not be an issue, and we continue gaining money as normal, at about £5,000.
		2. If within a short period of time, the server fails, we gain nothing.
	2. Replacing the hard drive means the system will keep running for a bit longer.
		1. This could result in more return of about £6,000.
		2. But, if we get a defective hard drive, we'll only end up with £3,500 of return.
	3. Rebuilding the whole system will make it more performant and draw in even more users.
		1. This could possibly net us a juicy £15,000 of return.
		2. But, if the new server blows up (literally or figuratively), we get nothing.
4. Calculate the **Estimated Monetary Value (EMV)** of each outcome, directing each outcome described above to a **Triangle Outcome Node**, with its EMV to the right.
	1. For doing nothing...
		1. The continued operation of the server results in a net gain of £4,500.
		2. And if it fails, we gain -£500 (i.e. a deficit).
	2. And if we replace the hard drive...
		1. If all goes well, we get £5,200.
		2. But if the hard drive is defective, this goes down to £2,700.
	3. And if we rebuild the whole server...
		1. We could get a very handsome £7,000.
		2. But this is very risky, as we could end up with -£8,000 (ouch!)
5. Determine the probability of each outcome for each decision we make.
	1. If we do nothing, the system has about a 70% chance to make it through until we can work on it later. This means there's a 30% chance it fails before that time.
	2. The failure rate of hard drives is 10%, so there's a 90% chance for greater benefit.
	3. The system engineers are fairly competent, with an 80% rate of successful deployment. That 20% fail rate shouldn't be ignored, though...
6. Determine the EMV of each decision by taking the weighted sum of the outcomes.
	1. $0.7 \cdot £4,500 + 0.3 \cdot -£500 = £3,000$
	2. $0.9 \cdot £5,200 + 0.1 \cdot £2,700 = £4,950$
	3. $0.8 \cdot £7,000 + 0.2 \cdot -£8,000 = £4,000$
7. Finally, choose the decision which has the best EMV. In this case, we simply replace the hard drive, and hope for the best. Let's save building a new server for when we have a bigger budget.

And here's what that all looks like when we draw out the diagram in full:

![Example Decision Tree Analysis Diagram](/images/resources/cs352/decision-tree-analysis-example.png)

## How did we get here?

Now that we're aware of the risks present, we may then want to work backwards in identifying the root causes of each of the risks. Or hey, you could do this the other way round, I suppose.

The first method is to use an **Ishikawa Diagram**.

1. Start by drawing a horizontal line with a particular outcome at the end (e.g. project failure).
2. At an angle, draw arrow going into this main line, each with the labels "Policies", "People", "Procedures" and "Plant". These represent the parts of the project where risks can occur.
3. On each arrow, to add a risk, draw a horizontal line on it, with the risk along it.
4. Then for each risk, add a label to it, defining a cause.

If we want to test an independent variable against another variable, we can use **Sensitivity Analysis**, using either estimation, simulations or empirical data. We then plot variables against each other using a spider diagram, or a tornado diagram.

## Now to act on this mess

The last step here is to plan and perform the responses to each of the risks we've identified. This does include not reacting, as in the case of a low impact, unlikely risk, nothing really needs to be done.

The easier, and more common method for this is using a **Risk Matrix** - you might have even used one before! In this case, we simply define a table with two scales: impact and likelihood, usually on a score of 1 to 5, then to assess the severity of the risk, we simply identity the associated field to those scores. What exactly low, medium, high or critical severity is, depends on a matrix to matrix basis.

The more complicated way to approach this is to use **Failure Mode Effects Analysis (FMEA)**, where for each step of a process, we detail *Potential failure modes* and their effects, followed by a *severity score* from 1 to 10. We then identify possible causes of each risk, followed by an *occurrence probability*. Then, we determine how we can prevent or detect this risk, and hence determine a *detectability score* (where 1 means easy to detect, 10 means nearly impossible). We then multiply together the severity, occurrence and detectability scores to get a final **Risk Priority Number (RPN)** score. We finish each row by recommending actions to mitigate the risk, where needed. In some cases we may also calculate the criticality score by multiplying the severity and occurrence rate.