+++
title = "5 - Dynamic Programming"
+++

Let me first get the obvious bit out of the way. Dynamic Programming is a pain in the ass to get your head around.

To put it simply, it takes a problem, breaks it into overlapping sub-problems, and combines/builds on them to produce a final result. We store the results of these sub-problems to improve performance, a technique called **Memoization**.

## General formula

A lot of the time, DP problems are based on recursion or iteration (over a 1D or 2D array, hence 1/2D DP). The core idea is to develop some $OPT(i)$ or similar function, which, given the previous values of this function, produces the output for the problem (with some base case defined). Very often, there will be some comparison of values using functions such as $min$ or $max$.

## Climbing Stairs Problem

> **Spoiler Alert!** This problem is on [NeetCode](https://neetcode.io/problems/climbing-stairs), give it a try before looking at this example!

### Naive Solution

```java
public int climbStairs(int n) {
    if (n <= 2) return n;
    return climbStairs(n-1) + climbStairs(n-2);
}
```

This solution *looks* fine, however it doesn't perform very well. Specifically, you're looking at a running time of $O(2^n)$. Yikes. Now let's try using Dynamic Programming.

### Bottom-Up DP Solution

```java
public int climbStairs(int n) {
    if (n <= 2) return n;
    int[] dp = new int[n+1];
    dp[1] = 1; dp[2] = 2;
    for (int i=3; i<=n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
```

Notice how we use an array `dp[]` to store the results of our previous calculations. This is what allows us to create an algorithm that runs in linear ($O(n)$) time, instead of exponential. **Memoization is a key component of dynamic programming.**

### Explanation

Start with the cases where we have only one or two steps. Then, try writing out the combinations of 2-steps and 1-steps for three, four and five steps. You may notice a pattern.

To generalise this, whenever we have $n$ steps, such that $n > 2$, before we move to the $n$th step, we're on either of two steps, $n-1$, or $n-2$. In either case, we have performed a series of movements described by these two values, so to get to the $n$th step, we move 1 step, or 2 steps respectively. Therefore, the number of combinations of moving up $n$ stairs, is equal to the sum of combinations for $n-1$ and $n-2$ steps. That sounds familiar...

Our naive solution is using divide and conquer, which creates two sub-problems of size $n-1$ and $n-2$, which is roughly equivalent to $\frac{n}{1}$. We assume addition to combine the two sub-problems takes constant time. Hence, we have...

$T(n) = T(n-1) + T(n-2) + c$

Which, when drawn as a recursion tree, looks very ugly.

### OPT function

$OPT(1) = 1, OPT(2) = 2$

Given $i > 2$, $OPT(i) = OPT(i-1) + OPT(i-2)$