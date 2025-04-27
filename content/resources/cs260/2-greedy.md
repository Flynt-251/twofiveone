+++
title = "2 - Greedy Algorithms"
+++

A **greedy** approach to a problem, tends to be one that seems the most intuitive and straightforward. The basis of any greedy problem is, given some options, pick the ones that look the best.

## Interval Scheduling

``` c
Given Array Jobs[(startTime, finishTime)]...
// Assume `Conflicts(Jobs[], NewJob)` determines
// whether a new job overlaps with any job in the array.
Sort Jobs by ascending end time
Define Output[] to store final job list
For Job in Jobs...
    If not Conflicts(Output, Job) then...
        Output.add(Job)
Return Output
```

### Proof of correctness

Let's suppose this algorithm doesn't produce an optimal schedule, meaning a different schedule should be generate by another, optimal algorithm. It's entirely possible that both algorithms begin by producing the exact same sequence of jobs, however at some point, we reach two overlapping job at which the two solutions diverge. Greedy has picked a job that finishes earlier than the optimal solution. Okay, so we can swap this job then. But, this hasn't actually changed anything. Either the number of jobs remaining in both sequences is equal, or this optimal solution leaves out jobs that the greedy algorithm used, because they overlap, meaning it isn't optimal anymore!

> **Example Problem:** After applying for a few dozen internships this year, you realise you've fallen short and don't have anywhere to work. Over the summer break, you decide to go a bit old-school and offer to mow the grass on your neighbours' gardens for a flat fee over a few days.
>
> Naturally, different gardens are shaped differently, so some will take longer than others. However, you're charging a flat fee, so all jobs will pay the same. You only realise this after getting a bunch of offers. Additionally, people will be in at different times, so you will need to wait until some people are ready. **So, to get the most money, how do you organise your time?**


