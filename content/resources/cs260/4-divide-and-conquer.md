+++
title = "4 - Divide and Conquer"
+++

The term *divide-and-conquer* essentially describes any approach to a problem that uses recursion and/or solving a problem by splitting it into sub-problems and combining the results *without storing any information* (we'll get to that one next).

## Merge Sort

Another classic algorithm, which works as follows:

- Given an array $A$...
  - If $A$ only has one element, return it.
  - Otherwise, split this array in half, into $A_1$ and $A_2$.
  - Run this algorithm on both arrays separately.
- Create a new array $B$, of the same size as $A$.
- Create a pointer for each of $A_1$ and $A_2$, starting at the first element for both.
- Compare the values at each pointer of $A_1$ and $A_2$, and append the smallest of the two values to $B$. Increment the pointer until one of these pointers reaches its end.
- Add the elements remaining from the other array.

To work out the running time of the algorithm, let's look at the number of comparisons that takes place. Let $T(n)$ be the number of comparisons that happens over merging an array of $n$ values.

If $n=1$, we just return the array, meaning no comparison is made, i.e. $T(1) = 0$. Otherwise, we split the array into two portions, then merge the two halves, making $n$ comparisons in order to put the elements in the correct order. Splitting the array means we have to also consider $T(\lfloor \frac{n}{2} \rfloor)$ and $T(\lceil \frac{n}{2} \rceil)$ (using floor and ceiling as we may have to split an array containing an odd number of elements). Hence, we get:

$T(n) = T(\lfloor \frac{n}{2} \rfloor) + T(\lceil \frac{n}{2} \rceil) + n$

Which is equivalent to $O(n \log_2 n)$. We can prove this by using a recursion tree, telescoping, or by induction. We'll assume, for simplicity's sake, that the array we're sorting is of length $2^n$ for some $n$.

## Recursion Tree

Building a recursion tree means we're illustrating how the algorithm creates recursive calls, allowing us to easily sum up the number of operations.

```
           T(n)             | n
          /   \             |
       __       __          |
      /           \         |
   T(n/2)        T(n/2)     | 2 * (n/2) = n
   /   \         /   \      |
  /     \       /     \    log_2 n levels
T(2)   T(2)   T(2)   T(2)   | n/2 * (2) = n
```

So at each level, we end up doing $n$ work (meaning an arbitrary amount of operations), and we generate $\log_2 n$ levels, hence our time complexity of $O(n \log_2 n)$.

## Telescoping

We want to, again, verify that $T(n) = n \log_2 n$. Let $T(1) = 0$, and $T(n) = 2T(\frac{n}{2}) + n$. 

```
Assume n > 1...
T(n) / n = (2T(n/2) + n) / n
         = (2T(n/2) / n) + 1
         = (T(n/2) / (n/2)) + 1 (*2 = /(1/2))
         = (2T(n/4) + (n/2) / (n/2)) + 1
         = (2T(n/4) + / (n/2)) + 1 + 1
         = (T(n/4) + / (n/4)) + 1 + 1
         ... This goes on for some time ...
         = (T(n/n) / (n/n)) + 1 + 1 + ... log_2 n 1s
         = log_2 n
```

## Induction

Let $T(1) = 0$, and $T(n) = 2T(\frac{n}{2}) + n$.

Base Case: $T(1) = 0$

Inductive Hypothesis: We assume $T(n) = n \log_2 n$, we want to prove $T(2n) = 2n \log_2 2n$.

$T(2n) = 2T(n) + 2n = 2n \log_2 n + 2n = 2n(\log_2(2n) - 1) + 2n$
$= 2n(\log_2(2n) - 1 + 1) = 2n \log_2 2n \Box$

## Master Method

As you make more and more divide-and-conquer algorithms, you'll notice a pattern. We split a problem into a set of recursive calls on data sized fractionally to our input, and then combine it in some amount of time. This information is what the Master Method captures, and uses to determine the time complexity of such an algorithm.

Given a divide and conquer algorithm, define $T(n)$ as the function that returns the number of operations that the algorithm performs over data of size $n$. We know that this algorithm will make $a$ recursive calls, each using an input the size of $\frac{n}{b}$, and then combine the outputs of these in $n^c$ time. Hence,

$T(n) = aT(\frac{n}{b}) + n^c$

As we saw using a recursion tree, the time of all sub-problems is about $\log_ba$. The time complexity of the algorithm is hence determined by comparing this value with $c$.

- If $c > \log_ba$, then $T(n) = O(n^c)$
- If $c < \log_ba$, then $T(n) = O(n^{\log_ba})$
- If $c = \log_ba$, then $T(n) = O(n^c \log n)$