+++
title = "1 - Algorithm Analysis"
+++

Being able to solve a problem is all well and good, but a question we have to ask ourselves is *"Are we solving it efficiently?"*, unless of course you're using Python or Javascript. This first section gives a basic overview of how algorithms are assessed on performance and why this matters.

## The Big O

Big Oh notation is used to describe the *worst case* scenario for an algorithm's running time or memory usage (usually the former). We model the worst case, as we can't always be entirely sure what kind of input our algorithm will have to handle. For example, we may design an algorithm which works really well on lists of size between 1 and 50, but takes an age to run on lists of size 100.

$3n^2 + 2n - 7 = O(n^2)$

When determining Big O of an algorithm, analyse where there are loops or recursive calls: a double nested loop that runs $n$ times has $n^2$ running time, for example. Recursive calls will be covered later on, in Divide and Conquer algorithms.

### Example Running time analysis

```java
// Takes two integer arrays, and outputs a multiplication table of the two.
public int[][] multiplies(int[] x, int[] y) {
    int[][] output = new int[x.length][y.length];
    for (int i=0; i < x.length; i++) {
        for (int j=0; j < y.length; j++) {
            output[i][j] = x[i] * y[j];
        }
    }
    return output;
}
```

This algorithm has a running time of $O(nm)$, since if array `x` has a length of $n$ and `y` has length $m$, we can deduce that for each element in `x`, that element will be accessed $m$ times to fill out a row of our output array. This is all repeated $n$ times, giving us a total running time of $(n \times m) + 2$, assuming that initialisation of, and returning the output array each take 1 time unit, hence giving us our final answer of $O(nm)$.

> **Formal Definition** - $f(n) = O(g(n))$ *iff* there exists $c > 0$ and $ n_0 \geq 0$ such that for all $n \geq n_0$, we have $f(n) \leq c \times g(n)$.
>
> **In plain English** - If you were to take the two equations $f(n)$ and $g(n)$ and some constant value $c$, you may write that $f(n) = O(g(n))$, if there is a point where all values of $c \times g(n)$ are larger than $f(n)$. Plotting this on a graph would show that $c \times g(n)$ is strictly bigger than $f(n)$, or a point where $c \times g(n)$ crosses with $f(n)$, from which point the former grows faster than the latter, meaning the two lines never meet again.

> **Exercise** - Prove that $3n^2 + 2n - 7 = O(n^2)$. Try to identify a constant $c$, and a point $n_0$ where $cn^2$ is always bigger.

## Average Running time

Using the notation $\Theta(g(n))$ (Big Theta), average running time is only useful where the running time can always be properly determined, i.e. there are not conditionals where an algorithm may finish earlier than the worst case scenario. This is particularly clear with search algorithms, as a search could take 1 unit of time, or up to $n$ time, so it doesn't make sense to assume some average case of running time.

## Transitivity and Additivity

Big O notation satisfies the transitivity and additivity rules (as does Big Theta and Big Omega, which you won't ever use).

> **Transitivity**
> If $f = O(g)$ and $g = O(h)$, then $f = O(h)$.

> **Additivity**
> If $f = O(h)$ and $g = O(h)$, then $f + g = O(h)$.

**Knowing how to analyses algorithms is essential in this module, so learn this concept well!**
