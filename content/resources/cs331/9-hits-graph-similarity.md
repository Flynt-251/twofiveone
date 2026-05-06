+++
title="9 - HITS and Graph-based similarity searching"
+++


We're not going to be working with neural networks here, but there are graphs, that's close enough, right?? In all fairness, HITS is useful alongside neural networks for ranking webpages, much like PageRank, and similarity searching is used all the time for recommender systems, retrieving documented connected on a co-citation graph, and so on!

## My dad HITS mommy

*Work at a pizza place hits different in your 20s*

**Hyperlink-induced Topic Search** is like PageRank's less popular sibling. It's used to assign scores to webpages for SEOs, giving each page two scores: authority, describing how many good webpages link to it, and hub, describing how many good webpages it links to. In order words, it quantifies how good a webpage is in terms of its *authority* on its information, and its nature as a *hub* to other good sources of information.

HITS is *bi-recursive*, meaning one side relies on the other, to essentially achieve a feedback loop that converges to a final set of values. So, given a set of web pages defined as a directed graph...

Base Case:
$$
\forall x, a_0(x) = \frac1{\sqrt{|V|}}, h_0(x) = \frac1{\sqrt{|V|}}
$$

Then, given $I(x)$ gives the in-neighbours of a vertex, and $O(x)$ gives the out-neighbours, we recursively calculate $a_k(x)$ and $h_k(x)$.

$$
\tilde{a}\_k(x) = \sum\_{y \in I(x)} h\_{k-1}(y), \text{ } \tilde{h}\_k(x) = \sum\_{y \in O(x)} a\_{k-1}(y)
$$
Then, we *normalise* the values to keep them between 1 and 0.

$$
a\_k(x) = \frac{\tilde{a}\_k(x)}{\sqrt{\Sigma_{y\in V}(\tilde{a}\_k(y))^2}}, \text{ } h\_k(x) = \frac{\tilde{h}\_k(x)}{\sqrt{\Sigma\_{y\in V}(\tilde{h}_k(y))^2}}
$$
There are some more efficient and nicer ways of doing this. The first of them, which you may have already thought of, is to use vectors and matrices. We'll store all the authority scores in $\mathbf{a}$ and the hub scores in $\mathbf{h}$. Our graph is stored in the adjacency matrix $\mathbf{A}$.

$$
\tilde{\mathbf{a}} = \mathbf{A}^T \cdot \mathbf{h}, \tilde{\mathbf{h}} = \mathbf{A} \cdot \mathbf{a}
$$
And then, we add normalisation.

$$
\mathbf{a} = \frac{(\mathbf{A}^T\mathbf{A})\mathbf{a}}{||(\mathbf{A}^T\mathbf{A})\mathbf{a}||_2}, \mathbf{h} = \frac{(\mathbf{A}\mathbf{A}^T)\mathbf{h}}{||(\mathbf{A}\mathbf{A}^T)\mathbf{h}||_2}
$$
Actually, the funny thing here is, $\mathbf{a}$ and $\mathbf{h}$ are the dominant eigenvectors of their respective factors that use the adjacency matrices! So, you can also just calculate the eigenvectors (and values) from $\mathbf{A}^T\mathbf{A}$ and $\mathbf{A}\mathbf{A}^T$ to get the same results.

### I'm clean

*Wait, V, not T.*

**Singular Value Decomposition (SVD)** of a matrix $\mathbf{X}$ is the process of splitting it into three different matrices: $\mathbf{U}$, $\mathbf{\Sigma}$, $\mathbf{V}$. Together, $\mathbf{X} = \mathbf{U} \cdot \mathbf{\Sigma} \cdot \mathbf{V}^T$. If $\mathbf{X}$ is an $n \cdot m$ matrix...

- $\mathbf{U}$ is an $n \cdot r$ matrix, and multiplying it with its transposition gives the identity matrix.
- $\mathbf{\Sigma}$ is an $r \cdot r$ matrix, which is diagonal, and contains only positive values in descending order.
- $\mathbf{V}$ is an $r \cdot n$ matrix, and multiplying it with its transposition gives the identity matrix.

Then, to get each of these, we calculate based on these two equations:

$$
\mathbf{X} \cdot \mathbf{X}^T = \mathbf{U} \cdot \mathbf{\Sigma}^2 \cdot \mathbf{U}^T, \text{ } \mathbf{X}^T \cdot \mathbf{X} = \mathbf{V} \cdot \mathbf{\Sigma}^2 \cdot \mathbf{V}^T
$$
Then, $\mathbf{a}$ is obtained from $\mathbf{V}\_{\*,1}$, and $\mathbf{h}$ from $\mathbf{U}\_{\*,1}$.

## Jacc Strap

Where it comes to similarity searching, **Jaccard Similarity** is one of the simplest solutions, working off the idea that two nodes are similar, if the same nodes point to them, so scoring is based on common in-neighbours.

$$
\text{sim}_J(a,b) = \frac{|I(a) \cap I(b)|}{|I(a) \cup I(b)|}
$$

Jaccard Similarity is reflexive, symmetric and bounded to $[0,1]$. Of course, being simple, this has some notable limitations, namely the fact that if two nodes share the same in-neighbours, they are considered completely the same! This could be in spite of them having completely different out-neighbours! Likewise, if two nodes don't have any common in-neighbours, they are considered completely dissimilar.

## SIM card tier list

*Nanos are overrated, way to small. Think I once swallowed one.*

**SimRank Similarity** follows the intuition that two nodes are similar, if they are pointed to by *similar* nodes, not the same nodes. Additionally, every node is considered similar to itself.

$$
s(a,b) = \begin{cases}
0 & \text{ if } I(a) = \emptyset \text{ or } I(b) = \emptyset \\\\
\frac{c}{|I(a)|\cdot|I(b)|} \sum_{x \in I(a)} \sum_{y \in I(b)} s(x,y) & \text{ if } a \neq b \\\\
1 & \text{ if } a = b
\end{cases}
$$

You might notice that this is a recursive algorithm, which may or may not cause you to panic. Either way, give yourself a moment to breathe. SimRank, like Jaccard, is reflexive, symmetric and bounded to $[0,1]$. It also has a concept of "distance induced by SimRank", where we define the function $d(x,y) = 1 - s(x,y)$. We call this the *distance metric*.

If $d(x,y) = 0$, then this is logically equivalent to saying that $x=y$, which follows from the fact SimRank is reflexive. It's also symmetric... obviously. But, the more interesting property is the *triangle inequality*, where $d(x,y) + d(y,z) \geq d(x,z)$. From this, you can say SimRank is also somewhat transitive.

Given that SimRank is recursive (yes, yes, settle down), we may run into repeated computations when we perform single-pair SimRank. To deal with this, we introdude the idea of a partial sum:

$$
\text{Partial}^{s_k}_{I(a)}(j) = \sum s_k(i,j)
$$

This will, for one node on iteration $k$, calculate all of its SimRank values for any in-neighbours it has. Then, when we're ready to perform SimRank...

$$
s_{k+1}(a,b) = \frac{c}{|I(a)|\cdot|I(b)|} \sum_{j \in I(b)} \text{Partial}^{s_k}_{I(a)}(j)
$$

We stick it into the latter half of the function! This allows us to leverage some dynamic programming sorcery. At least I'm sure it does.

If we want to compute SimRank for all pairs of nodes, then our equations become a lot nicer. We start with our adjacency matrix $\mathbf{A}$, then normalise each column to get $\mathbf{Q}$. This means taking each column, and dividing each value by the sum of that column. We then follow this algorithm.

1. $\mathbf{Q} = \text{col\\_norm}(\mathbf{A})$ (I know I said that already but whatever)
2. $S_0 = I$
3. Repeat:
	- $S_{k+1} = \max\{c \cdot \mathbf{Q}^TS_k \mathbf{Q}, I\}$
4. Until $S_k$ converges to $S$.
5. Return $S$.

Because we rely on converging to an exact value, we can't expect computers to spend forever doing these problems, so we generally do a fixed number of $k$ iterations. For a desired error rate of $\epsilon$, the value of $k$ should satisfy the inequality $k \geq \lceil \log_c\epsilon \rceil$. There's a proof for that, but I'd be surprised if you need to dig it out.

We're in the home stretch now!