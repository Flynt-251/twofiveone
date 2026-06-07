+++
title="4 - Budgeting and Forecasting"
+++

*Or sorry, Bludgeoning and Fearcasting, since this was a Halloween Lecture. I'm still mad that the lecturer said Vampires are better than Werewolves*

Money. People need it, want it even. And unfortunately, yes, we often need it for projects. Sometimes lots and lots of it. We also need to make sure we spend it wisely, so we need a level of planning. Notable, we need to start with a **Cost Management Plan**, **Activity Estimates**, and an overall budget or **Cost Baseline**.

First, we want to consider costs per unit. This can refer to anything, human resources (i.e., working hours), equipment, materials, venue hire and so on. We measure this in one of three metrics:

- **Time Units** - £X.XX per hour, day, week or whatever timescale. Again, this usually refers to working pay or contractor hours.
- **Use** - Static payments for goods or services, such as a one-time payment for venue hire.
- **Material Consumption** - Cost of goods, from bricks for a house to zero-alcohol beer at a half-assed Christmas party.

Then, when discussing activity costs, we usually apply similar metrics to time estimation.

- **Analogous** - How much did it cost last time?
- **Parametric** - Put historical costs into a statistical model.
- **Team-based** - Assess cost by the number of people working on it (again, think back to those inverse proportion GCSE questions)
- **Three Point** - Using the mean, minimum and maximum.
	- $\text{triangular} = (\bar{x} + x_{\min} + x_{\max}) \div 3$
	- $\text{beta} = (4\bar{x} + x_{\min} + x_{\max}) \div 6$

## Check your accounts

*Seriously, keep on top of your money*

We don't usually start off with a bunch of money when we begin our project. We may accrue our budget over time, as the project moves forward, and so we may want to *schedule* our **Cash Flow** throughout the timeline of the project. So, we may do this by plotting our planned expenditure over this time period, but more importantly, we may make use of **Earned Value Analysis (EVA)**.

We first begin EVA analysis by plotting our cash flow cumulatively. This first line graph is referred to as our **Planned Value** ($PV$), and describes how much money we plan to have been assigned at that point. As the project moves forward, we keep track of our actual spending on another line, the **Actual Cost** ($AC$): plotting this against the planned value, we can determine whether we are on, over or under budget. Though we might be under budget because we're running behind schedule. With that in mind, **Earned Value** ($EV$) tells us how much work we have done, and how much of our budget it has "earned" us (imagine this as though each Work Package has its own "reward" upon completion). If this line sits above the planned value, we're ahead of schedule. If it's below, we're behind schedule!

Through EVA, at any point in the project, we can measure a few different variables. Note that $BAC$ refers to *the total budget*.

- *Planned Value*: $PV = BAC \times \text{\\% of scheduled work}$
	- Remember, this is our cash flow, so how much money we expect to have at a certain point of progress.
- *Actual Cost*: We measure this over time.
- *Earned Value*: $EV = BAC \times \text{\\% work done}$
	- Think of this as the "reward money" we've accrued up to this point.
- **Schedule Variance**: $SV = EV - PV$
	- This assesses how ahead or behind schedule we are.
- **Cost Variance**: $CV = EV - AC$
	- This assesses how under or below budget we are.
- **Schedule Performance Index**: $SPI = EV \div PV$
	- The rate at which we're working, relative to our schedule. Above 1 means we're moving quicker than expected, below 1 means we're behind schedule.
- **Cost Performance Index**: $CPI = EV \div AC$
	- The rate of cost-effectiveness based on our prediction. Above 1 means we're being cost-effective, below 1 means we may be overspending.
- **Cost Schedule Index**: $CSI = SPI \times CPI$
	- The combination of assessments for project progress and cost-effectiveness, an overall measure of the project's performance.

### Example

Let's go back to our example of building a PC, instead thinking about how much money we may spend across the process, and assuming that we accrue the money for it over a period of time. This time, we'll assume we obtain components one-at-a-time, with the expected value denoting the budget for our system, actual cost is... actual cost, and the earned value is determined by each component we've picked up. So with all of that in mind, here's our shopping list:

- PC Case: £100
- Power Supply: £150
- Storage: £250
- CPU: £600
- GPU: £650
- Memory: £200
- Motherboard: £150
- Cooler: £100
- Fans: £50

These prices make up our *Expected Value*, and we'll assume that per day we obtain each of these. Now, let's say that the following happened when we executed the collection of the components:

1. We got the PC Case and Power Supply together in a deal for £220 on day one.
2. We get our storage on day two at £235.
3. The budget underpredicted the price of the CPU, at £620, but it still arrives on day three.
4. Some luck was had with an auction for the GPU, netting it for just £550, however shipping got delayed two days, arriving on day six.
5. Memory has risen in price significantly, so although it arrived day five, it cost £260.
6. The GPU arrives, as well as the motherboard, which we paid £120 for.
7. We buy the fans and cooler from the same retailer, for a combined cost of £105, but have to wait a couple of days.
8. We take today as a rest day.
9. Everything has arrived and is ready for assembly!

Plotted, here's what that looks like:

![EVA Analysis Graph](/images/resources/cs352/eva-analysis.png)

We can observe we immediately went ahead of schedule, seeing as we immediately go above our expected value, but remain "under budget". On Day 4, that changes though, as we purchase the GPU for £550, but have to wait for it to be shipped, causing a low growth in expected value as we continue buying our other components. After it arrives though, we remain about on-budget, all the way up to Day 9. Here are some calculations which better articulate this information:

- The Schedule Variance on Day 1 is £250, meaning we're ahead of schedule. The SPI is 2.5, which means we're going very fast!
- The Cost Variance on Day 1 is £30, meaning we're slightly under budget. The CPI is 1.136.
- The overall Cost Schedule Index on Day 1 is 2.841, which says we're being very time and cost-efficient.
- On Day 4, the Schedule Variance and SPI are 0 and 1 respectively. This means we're exactly on time.
- The Cost Variance and CPI tell a different story however, at -525 and 0.677 respectively. We're definitely over budget here!
- This means the Cost Schedule Index is 0.677. Not great.
- At Day 9, the SPI is 1, and the CPI is 1.071, with a final CSI of 1.071.

As an additional exercise, you may find it useful to calculate the CSI for each day.

## Cloudy with a chance of bankruptcy

With the above information, we have the means by which we can **forecast our budget** at the moment, where we try to best identify not only the remaining cost, but also when we anticipate the project will end, given the time and money we've already spent. At the high level, there are three ways to do this using **Estimate at Completion (EAC)**.

- **Assume everything else goes according to plan** - Regardless of how long existing work has taken relative to its predictions, assume everything after will stay as originally envisioned.
- **Use cost-efficiency to make predictions** - if we've overspent, assume we will overspend for the rest of the project.
- **Use cost- and time-efficiency to make predictions** - Similar to the above, but if we're also dragging things out, add this as a factor to the time and cost of the future stages or work packages (e.g., if our last few stages took 20% more time, assume all the rest will also take 20% more time.)

Additionally, there are other metrics we may decide in forecasting.

- **Estimate to Complete (ETC)** - How much longer is this going to take?
	- Either just identify the size of the gap between our actual spending, and the final amount we intended to spend...
	- Or assume our original plan was flawed, and use this to determine more accurately how much more we will spend.
- **Variance at Completion (VAC)** - How much are we going to overspend or save?
	- The difference between our actual cost and our original budget.
- **To-Complete Performance Index (TCPI)** - What sort of cost-efficiency will we need in order to achieve either the original budget, or our new estimated budget?
