+++
title = "7 - Flow Networks"
+++

First off, wtf is a flow network? A **Flow Network** is simply a graph, with some additional parameters and constraints. It consists of sets of vertices and edges, and some source vertex $s \in V$, sink vertex $t \in V$ and capacity function $c : E \rightarrow \reals^+$. Furthermore, the source vertex has no incoming edges, and the sink vertex has no outgoing edges. Below is an example (crudely drawn).

![Image of a flow network containing six vertices](/images/resources/cs260/Flow-network-1.jpg)

There is also a generally implied rule that flow networks do not have any reverse edges. Actually, these are seen in its *residual network*.

Then, a **flow** of a flow network is an assignment of values to each edge $e$, such that no value exceeds $c(e)$, and for all vertices, the flow into each is equal to the flow out of it.

Let's imagine a flow network as a series of pipes in which water is *flowing*. So, we can imagine that a flow is the rate at which we pour water into the source, which results in a different amount of water *flowing* through each pipe, until it drops into the sink. If a pipe does exceed its capacity, then it's burst, and something has gone horribly wrong. Likewise, if the amount of water going in doesn't match the water going out, we've just discovered a black hole and need to evacuate immediately.

Now to write this formally (ew).

For all $e \in E$ and $f: E \rightarrow \reals^+$ then $f(e) \leq c(e)$.

And for all $v \in V \setminus \{s,t\}$, $\Sigma_{(u,v) \in E} f((u,v)) = \Sigma_{(v,u) \in E} f((v,u))$

## Destroying the plumbing

Recall that a *cut* on a graph is the concept where we remove a set of edges so that we end up with two disjoint graphs, $A$ and $B$. It is *cutting* the graph into two subgraphs. We can of course do this on a flow network, and typically we care about doing this where $s \in A$ and $t \in B$. We call this an s-t cut.

From this, we define the *capacity* of an s-t cut as the sum of all capacities of edges going from $A$ to $B$, or in icky formal notation...

$c((A,B)) = \Sigma_{(u,v) \in E, u \in A, v \in B} c((u,v))$

So, the **MIN-CUT** problem is the question of, given a flow network, what cut gives us the lowest capacity lost, or the lowest value of $c((A,B))$. For the above sketch, this would result in a capacity of 7. This is a *search problem*.

## (Hopefully not) Busting some pipes

Going back to our analogy, we'd naturally want to ask, *"How much water can we jam through this thing without busting a pipe or breaking the laws of physics"*. This is where we get to the **MAXIMUM-FLOW** problem, where we want to ensure the maximum possible sum of $f$-values for a flow network. The value of a flow network is (more notation incoming...):

$\Sigma_{(s,v) \in E} f((s,v)) - \Sigma_{(v,s) \in E} f((v,s))$

Or, the sum of the net flow out of all vertices.

Here, we turn to the **Ford-Fulkerson algorithm** (or *Edmonds-Karp*), which creates a **residual flow network**, where if $(u,v) \in E$, then $(v,u) \in E$ and $c((v,u)) = 0$. This allows us to track "used capacity" and undo any poor decisions the algorithm makes during processing. We will call this newly made zero-capacity edge a *reverse edge*.

The Ford-Fulkerson Algorithm works as follows, given flow network $G$:

$\forall (u,v) \in E : f((u,v)) \leftarrow 0$

$\forall p \in DFS(G)$ such that $\forall (u,v) \in p, c((u,v)) > 0 :$

- Identify $c(p) = min\{c(u,v) : (u,v) \in p\}$

- $\forall (u,v) \in p :$

    - $f(u,v) \leftarrow f(u,v) + c(p)$

    - $f(v,u) \leftarrow f(v,u) - c(p)$

Then, the maximum flow can be determined by using the above equation.

This algorithm takes $O(|E| \cdot \Sigma c)$ time, as finding a path via DFS takes $O(|E|)$ time, and on each iteration, the algorithm increases a flow in the network by at least 1, hence the $\Sigma c$.

## The landlord's not gonna be happy

This portion doesn't exactly deserve its own section, but it the maximum flow of a flow network is the same as its minimum capacity of any s-t cut.