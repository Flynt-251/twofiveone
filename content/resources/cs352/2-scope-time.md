+++
title="2 - Scope and Time Management"
+++

So, now we have a plan for our project. We're not quite ready to begin execution yet, we need to embellish our plan by ensuring we're not getting too ahead of ourselves, and making sure we know if we're on track. These two points are encompassed in scope and time management - the first ensures we know what exactly it is we aim to deliver, and the latter allows us to track where work is allocated, and when we can realistically expect to deliver results.

## Not to be confused with Warwick Business School

**Work Breakdown Structure (WBS)** is a form of scope management, which uses a hierarchal structure. We split our project into a set of *components*, which each result in *work packages* that describe a set of tasks. It might look something like this:

- User Interface
	- Customer Page
		- Show recommendations
		- Implement Basket
	- Administrator Panel
		- Display Statistics
		- User Actions Panel
	- Seller Page
		- Notifications
		- New Listing Page
		- Payment Settings Page
- Backend
	- Payment
		- Card Payment Interface
		- Link PayPal
		- Gift Card System
	- Recommender System
- Marketing
	- Video Advertisements
	- Social Media Posts
	- Posters

At the top level is each component, then at the second level are the work packages, and at the lowest level are the subtasks. According to PMBOK, a good WBS should be a *deliverable-oriented hierarchical decomposition of the work to be executed by the project team*. It defines how the work is to be carried out, while relating back to the objectives set out in the specification, while also presenting a set of deliverables.

These **Deliverables** are explicit outputs of the project that align with the objectives, usually making them a good indicator of progress. Further to this, **Work Packages (WPs)** are the smallest units of the WBS, consisting of a set of tasks, interactions with other WPs, inputs and outputs, and estimates of cost, duration and needed resources. These don't have to be a set size, there are pros and cons to either having bigger packages or smaller ones, maybe you want more parallelism and better ability to estimate costs, or perhaps you need to better manage and efficiently use your team, and let them organise the work themselves.

## Time is Money

*Which is especially true in the advent of short-form content and its monetisation*

Now we need to know how long our project is going to take. This, of course, is something easier said than done, because, again, life can get in the way. All we can do really, is *estimate*. We can do this a few different ways:

- **Analogous** - Estimate in relation to previous projects
- **Parametric** - Estimate using knowledge from previous projects, and a statistical model.
- **Team-based** - Think of those questions back in GCSE maths which go "It takes X time for Y people to do Z"
- **Three-point** - Given an average for each task, and minimum and maximum, find $t$...
	- $t_{\text{triangular}} = (x_{\text{min}} + \bar{x} + x_{\text{max}}) \div 3$
	- $t_{\beta} = (x_{\text{min}} + 4\bar{x} + x_{\text{max}}) \div 6$

After identifying the duration of each task, we may want to plot these on a **Gantt Chart**. This is a table where, each task is placed on a row, and each column represents one time unit (e.g. a day or week). We place arrows tail-to-head for each task to represent dependencies.

### Clocked in, but Performance is Mediocre

Another way we might show dependencies is via a **Project Network Diagram (PND)**. Given a set of tasks and their dependencies, we map from the start to tasks we can then complete, using directed edges (i.e. those that don't have dependencies). Each task then has a directed edge going to any task it is dependent on. Activities are shown as squares, and events are shown using circles. The purpose of a PND is to show the **Critical Path** of the project, which explains in what order the list of tasks should flow.

Then, given all of the above, we can then use the **Critical Path Method (CPM)** to better visualise not only how long the project will take, but how much room there is for delays, without extending the project's end date. For each activity, we first need the following information:

- Duration (D) - How long will this activity take?
- Earliest Start (ES) - From when can we start this activity? Usually this is 0, or inherited from a predecessor activity's "Earliest Finish" (EF).
- Earliest Finish (EF) - The sum of the activity's ES and D.
- Latest Finish (LF) - The activity's final deadline, or the latest it can be completed until needing to delay the whole project.
- Latest Start (LS) - The activity's latest finish, minus the duration.
- Total Float (TF) - The amount of time we can freely delay the activity without delaying the whole project, calculated using either LF - EF, or LS - ES.
- Free Float (FF) - The amount of time we can delay the activity without affecting the earliest start of the next activity, calculated using ES(next) - EF.

To use CPM, we first create the PND of the project, then perform a forward pass where we calculate the earliest starts and finished for each activity. This is followed by a backward pass where we calculate the latest finishes and starts, then the total float of each task. The **Critical Path** is the set of activities we need to perform, which absolutely CANNOT be delayed without delaying the project as a whole, with each activity in it being called a **Critical Task**. The **Drag Time** of one of these tasks is how much time it would take to introduce float (i.e., how much that task *drags out* the duration of the project).

#### Example

Suppose we're looking to build a new computer system. To do this, we'll need to spend time figuring out our requirements, procure the parts, then assemble. We'll start by keeping the following information in mind:

- We have a friend we plan to meet up with, who is offering to sell us some components at a heavily discounted price. They can offer memory, storage and a case.
- This means we need to consider a motherboard that will fit, a power supply, a CPU and cooler and a GPU. We will consider the GPU separately from the others, as it's not essential, and we want to consider our options.
- We want to buy the power supply, cooler, and motherboard new, and we'll do all three at once. The CPU and GPU, we wish to buy second hand, so we'll spend more time shopping around for these.
- The assembly will all take place at once.

So, we have the following steps:

1. Define Requirements. This will take two days.
2. Research CPU, Motherboard, PSU and Cooler. This should take two days. (depends on 1)
3. Research GPU. This will take three days. (depends on 1)
4. Meet with friend and buy memory, storage and case. They're a fair distance away, so this'll take four days. (depends on 1)
5. Buy Motherboard, PSU and Cooler. This will all take one day. (depends on 2)
6. Buy CPU. This will take two days. (depends on 2 and 5)
7. Buy GPU. This will take two days. (depends on 3, 4 and 5)
8. Assemble. This is a one-day job. (depends on 5, 6 and 7)

Immediately, we can draw out the Project Network Diagram.

![CPM Diagram Part 1](/images/resources/cs352/cpm-part1.png)

You may have notices there are a bunch of empty fields here. These are where the fields go for CPM. We then fill out the top rows of each of these elements by doing a forward pass, hence determining each task's earliest start and finish.

![CPM Diagram Part 1](/images/resources/cs352/cpm-part2.png)

Now for the backwards pass. Here, we get each task's latest finish by using the lowest of the latest starts from that task's successors. The latest start is equal to that task's latest finish minus its duration.

![CPM Diagram Part 1](/images/resources/cs352/cpm-part3.png)

We're almost done here! Now the last thing we need to do to identify the critical path is find each task's total float, which is the difference between their earliest and latest starts (or finishes, they result in the same difference).

![CPM Diagram Part 1](/images/resources/cs352/cpm-part4.png)

Some of our tasks do have float to them, which means we can put them off for a day without causing the project as a whole to fall behind its 10-day deadline. However, those that don't have formed a single path. **The path of tasks which have no float is called the critical path**. We still haven't covered free float, that covers the difference between a task's earliest finish and the next task's earliest start. For example, task 6 has a free float of 1 day. As for drag time, we determine this on a per-task basis by identifying the minimum between its duration and the total float of its parallel tasks.

- Trivially, Tasks 1 and 8's drag times are the same as their durations, both of which are 2 days.
- For Task 4, its parallel tasks are 2 and 3, which both have total float 1, so its drag time is 1 day.
- Similarly for Task 7, its parallel task, Task 6, also has total float of 1 day, making its drag time 1 day too.

The calculation of drag time allows us to **crash** a task, where we speed it up by its drag time. This alters the critical path of the whole project, and speeds it up. Let's say the outing to meet our friend gets cut short as they realise last-minute that they need to tend to some important errands, so this takes a day shorter. This greatly shakes things up!

![CPM Diagram Part 1](/images/resources/cs352/cpm-part5.png)

Now the whole project is the critical path!

### I assure you this is PERTinent

**Program Evaluation and Review Technique (PERT)** is a variation on CPM which uses *three-point estimation*, both of which we discussed earlier. For each task, we *also* note the minimum, typical (not mathematical average!), and maximum times for each task, as well as their averages and standard deviations.

$$
\bar{x}\_{\beta} = \frac{x\_{\min} + 4x\_{\text{typical}} + x\_{\max}}{6}, \sigma^2\_{\beta} = (\frac{x\_{\max} - x\_{\min}}{6})^2
$$

$$
\bar{x}\_{\text{triangular}} = \frac{x\_{\min} + x\_{\text{typical}} + x\_{\max}}{3}, \sigma^2\_{\text{triangular}} = \frac{x\_{\max}^2 - x\_{\min}^2 + x\_{\text{typical}}^2 - x\_{\max}x\_{\min} - x\_{\max}x\_{\text{typical}} - x\_{\min}x\_{\text{typical}}}{18}
$$

Good God, that last one looks awful. Anyway, we then identify the critical path of the created CPM model, and sum the averages to get the average duration of the whole project, then calculate the standard deviation of the whole project using $\sqrt{\Sigma^n_{i=1}x_i^2}$. This lets us construct a *normal distribution* for the whole project, letting us figure out how likely the project as a whole is to be late!