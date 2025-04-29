+++
title = "3 - Graph Algorithms"
+++

We'll assume you're already familiar with the basic terminology of graphs. If the first thing you think of when you hear "graph" is a bar chart or lines on paper, this may be a bit confusing for you.

## Depth and Breadth

**Traversals** of a graph are important, as we often need to use them to solve certain problems. There are two main methods of traversal, by depth and by breadth.

**Depth-first Search** - Start at a vertex, and travel to any undiscovered vertices until you hit a dead end. Backtrack to find the rest of the vertices as needed.

**Breadth-first Search** - Start at a vertex, and identify its neighbours. Pick one of these neighbours, and repeat until all vertices have been found. This creates a layered view of the graph, and can be used to create a **spanning tree**.

If a graph has more than one connected component, we may need to run multiple traversals.

## Bipartite Graphs

A **Bipartite Graph** is a graph such that its set of vertices can be split into two separate groups, such that no vertex in either group is neighbours with another vertex in the same one. Bipartite graphs are also called 2-colourable graphs.

To check if a graph is bipartite, we can use a Breadth-first search, which shows us the layered view of the graph. If two vertices on the same layer have an edge between them, the graph is not bipartite.

## Strong Connectivity

A directed graph is **strongly connected**, if all vertices are mutually reachable. Two vertices are **mutually reachable** if it is possible to go from one to the other, both ways. This is to say, you can reach any vertex from any starting point.

Naively, we may attempt to do this by checking which vertices can be reached from each vertex in the graph, but this is quite inefficient.

Instead, if we have a graph $G$ on which we want to test strong connectivity, define $G^{rev}$ such that all of the edges in this graph go in the opposite direction of $G$. Run a BFS on both graphs, and if each gives the full set of vertices, then the graph is strongly connected.

This works, as if two vertices are mutually reachable, then these two vertices are part of a cycle. So reversing the direction of the edges doesn't affect the connectivity of these two vertices, as we're just going in the opposite direction.

## Minimum Spanning Tree

A **minimum spanning tree** is a tree based on a graph of the same vertices, and a subset of its edges, such that the weight of the remaining edges is minimal.

We could try doing this by finding every possible spanning tree, then giving the one with the smallest possible value, but *Cayley's formula* tells us that there are $n^{n-2}$ possible spanning trees in any graph, so this is very inefficient. 

Instead, here are some greedy strategies that do the job:

- **Kruskal** - Create a set of edges, adding edges starting from the smallest in weight, unless adding that edge creates a cycle.
- **Reverse-Delete** - Take the set of edges, removing one at a time, starting with the largest in weight, unless removing it disconnects the graph.
- **Prim** - Start from one vertex, and create a tree originating from this vertex, choosing the smallest of edges encountered.
- **Boruvka** - Remove all of the edges in the graph. Add the smallest edges back, such that each vertex is connected to one other. Repeat in clusters until the graph is connected again.

## Dijkstra's Algorithm

A classic algorithm, which works as follows:

- Define the set of discovered vertices, $S$, the distance function $d(v)$, and current calculated distance function $c(v)$.
- Start at vertex $s$, and set $S = \{s\}$ and $d(s)=0$.
- From $s$, explore vertex $v$ and set...
  - $c(v) = min_{e=(u,v)} d(u)+w(e)$
- Then $S = S \cup \{v\}$ and $d(v) = c(v)$.