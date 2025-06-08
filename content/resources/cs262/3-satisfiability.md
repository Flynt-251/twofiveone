+++
title = "3 - Satisfiability"
+++

Now we know we could algorithmically prove a formula is a tautology or contradiction, but what about if it's satisfiable, i.e., not always true but not always false. Well, we could just try every combination of variables possible, and this might be fine on some smaller problems, but what if we have 20 variables? 200? 2,000? 2,000,000? Then this brute force approach becomes very sluggish. At least until someone finds out if P = NP.

We typically approach the satisfiability problem by using expressions in CNF. We then split this problem into smaller problems based on the largest number of literals in one clause of the CNF expression, hence, the **K-SAT** problem. The 1-SAT problem has at most one literal per clause, the 2-SAT problem has at most two literals per clause, and so on.

1-SAT is very easy to do. If a literal and its negative (i.e. $x$ and $¬x$), then the expression is not satisfiable. Otherwise, remove duplicates, and for each literal, set any $x$ to true, and any $¬x$ to false. This can all be done in linear time.

We *could* solve 2-SAT in polynomial time by using a resolution proof solver, but we can do better: linear time, using directed graphs:

- If there is a clause $[]$, fail.
- Create a *digraph*, such that the set of vertices contains all literals and their negations
- For any clause $[u,v]$ in the CNF expression...
  - Create the edges $(¬u, v)$ and $(¬v, u)$. This represents the fact $u \vee v \equiv ¬u \rightarrow v \equiv ¬v \rightarrow u$.
- For any clause $[u]$, create the edge $(¬u, u)$. (Since $u \equiv ¬u \rightarrow u$).
- Check if there is a variable such that there is a path $x \Rightarrow ¬x$ AND a path $¬x \Rightarrow x$. This means $(x \rightarrow ¬x) \wedge (¬x \rightarrow x)$, which is a contradiction, so the expression is not satisfiable.
- If none exists, the expression is satisfiable.

## One, Two, Satisfy

So, we can quite easily solve 1-SAT and 2-SAT. What about 3-SAT? Or even K-SAT? Well, first off, we can reduce the K-SAT problem to 3-SAT, where K > 3, either by replacing two literals in a clause with one, until that clause is of size three, or defining new variables and rearranging clauses to retain the same logic, really, any K-SAT problem is just as hard as 3-SAT. It's also possible to reduce the K-SAT problem to the K-COLOURING problem on graphs, so now we know that K-SAT is in NP.

We were able to solve 2-SAT quite easily, so could we use this information to solve 3-SAT? Let's try that. To start with, we take a *subset* of clauses $G$ from our current 3-CNF, $F$, that is both **independent** and **maximal**, independent meaning all variables in this subset are distinct, no copies of variables, including negations across the whole expression, and maximal meaning we cannot add any more clauses to this set without violating independence. The size of this set is no greater than a third of the number of variables in our original expression.

We then create assignments that satisfy this subset, easy to do, since each variable occurs exactly once, and we create $7 ^ {|G|}$ different assignments (consider why there might be 7 per clause in $G$). Then, based on one assignment, $\alpha$, create $F^{[\alpha]}$, which takes $F$, and for any true assignments of $x$, removes this literal, and for any $¬x$, removes the negative of this literal. This results in $F^{[\alpha]}$ being a 2-CNF, since every clause in $F$ must contain at least one literal in $G$, otherwise we didn't create a maximal independent set. We then attempt to solve this using the above suggested 2-SAT algorithm, and keep trying assignments. This gets us down from $2^n$ steps to about $1.913^n$ steps. Doesn't seem like much to me for all that but okay.

## Honk.

*No, that's not the geese this time.*

**Horn CNFs** are a special type of CNF in which its clauses are of any size, *but contain at most one positive literal*. Each clause is hence called a **Horn Clause**. The interesting thing about Horn CNFs is, if all of the clauses contain at least two variables, then the CNF can be satisfied by setting all variables to false. However, if there's at least one clause with only one variable in it, then this variable needs to be set to satisfy that clause (since that's how CNFs work), so in this case we remove all instances of $¬x$ in the CNF. If there's an empty clause, then the CNF is unsatisfiable. Such an algorithm for this can be constructed in linear time.

## To tell the truth...

We don't really know an efficient way of solving the K-SAT problem, so for now we're settled on using a combination for brute-force and heuristic approaches, some of which will terminate once a solution is found (complete methods), or terminate after a certain time limit (incomplete methods). Let's go from the beginning and try a naive approach.

Given a CNF $F$, give the set $A$ of assignments that satisfies $F$, or $\bot$ if $F$ is unsatisfiable.

Define $\text{BackTrack}(F)$:
- If $F = \langle \rangle$, return $\emptyset$.
- If $[] \in F$, return $\bot$.
- Define a literal $a$, and set $A = \text{BackTrack}(F | a)$
  - Where $F|a$ means, assign literal $a$ in $F$, removing clauses containing $a$ and any instances of $¬a$.
- If $A = \bot$ then set $A = \text{BackTrack}(F | ¬a)$, otherwise return $A \cup \{a\}$.
- If $A = \bot$, return $\bot$, otherwise return $A \cup \{¬a\}$.

You might have spotted a couple of optimisations we could make here: if we have a clause with only one literal (aka a **Unit Clause**), then we have to assign that literal. Also, we can assign any literals for which its negation is not in the expression, also called **pure literals**. Let's go back and change our algorithm, factoring in these details.

Define $\text{DPLL}(F)$:
- If $F = \langle \rangle$, return $\emptyset$.
- If $[] \in F$, return $\bot$.
- Create the set $U = \text{UnitPure}(F)$
  - Where $\text{UnitPures}(F)$ returns all unit clauses and pure literals in F. This is trivially a polynomial algorithm.
- Let $F = F|U$
- Define a literal $a$, and set $A = \text{BackTrack}(F | a)$
  - Where $F|a$ means, assign literal $a$ in $F$, removing clauses containing $a$ and any instances of $¬a$.
- If $A = \bot$ then set $A = \text{BackTrack}(F | ¬a)$, otherwise return $U \cup A \cup \{a\}$.
- If $A = \bot$, return $\bot$, otherwise return $U \cup A \cup \{¬a\}$.

This is the **Davis-Putnam-Logemann-Loveland** algorithm, hence the name. Blimey that's a mouthful.

Another question you may be thinking about is, *"how do we decide what literal to set?"*. Well, we may use simple **static heuristics**, where we create a linear ordering of variables to check, before any assignments are made, or we can use **dynamic heuristics** where, on a recursive call, the algorithm decides what variable to assign next. We may either pick literals that appear the most across the whole clause (DLIS), or the most common literals in clauses of minimum size (MOMS).

## Always watching you...

Our approaches thus far have taken literals and analysed all clauses containing them, but some of this time is wasted on us, since we should be prioritising smaller clauses, namely cases where a clause drops from 2 to 1 literal, turning it into a unit clause, and where a clause drops from 1 to 0 literals, meaning we've hit a conflict. **Watched Literals** leverage this, by observing certain clauses. These literals are treated as "possibly true", meaning they are either true or not yet assigned. Each literal contains its own **watch list**, and we choose two literals in each clause that we want to watch.

Any time in our previous algorithms that we falsify some watched literal $l$, we check each clause in its watch list. If there's any true literals, skip the clause, but if all literals are falsified, then back-track. If *only* one other literal is unassigned, assign it to true. But in all other cases, pick an unassigned literal, add the clause to its watch list, and remove the clause from $l$'s watch list.

This added heuristic reduces the number of times we need to inspect clauses, and assigning a literal as false will cause it to become unwatched, hence making for faster reassignments where needed.

## Making the machines learn

*Actually can we stop doing that? I'm getting gaslighted on instagram enough as is.*

Here's another idea to consider: While we use this backtracking approach, our partial set of assignments isn't completely incorrect, only a subset of the assignments is incorrect, and our current solutions may use this problematic subset multiple times, further wasting precious CPU cycles. So, surely it's possible to detect this subset, and ensure it's not used in further calculations, right? Well, yes there is, we can add another clause, which forces us to use the negatives of this subset instead, and this can be built using an **implication graph**.

To create an implication graph, start by defining nodes from the literals we've set to true, also called **decision literals**. Then, check each clause that contains these literals. If for any clause, all but one of them has its negation in the graph already, say $l$, add the node $l$ and create an incoming edge from each of the negated literals: the fact these don't hold in this clause, means $l$ has to hold. If at any point, we get literals $l$ and $¬l$, in the graph, these are called **conflict literals**, and the graph is now called a **conflict graph**.

With this new conflict graph, we make a cut on the graph, such that one side contains our decision literals, and the other contains our conflict literals. It doesn't matter where our other nodes end up, so long as all of the edges in the cut bridge the two partitions together. For each of these edges, create a new **conflict clause** that includes the negation of the literal on the outgoing side (i.e. the side where our decision literals are). We insert this clause into our CNF, which does not alter its logic.

This is the approach used by the **Conflict-driven clause learning (CDCL)** algorithm. It first assigns a variable to true or false (hence, remove any satisfied clauses and instances of negatives), applying unit propagation as needed and assign further values, then constructs the resulting implication graph. If this turns out to be a conflict graph, make and append the resulting conflict clause, and backtrack to a point before we decided our problematic literals. Keep doing this until all variables are assigned.

> There is also the Monte Carlo method, where you make a random assignment of all variables, and flip over any assignments where there's an unsatisfied clause. Repeat this a fixed number of times until success, or give up. This sounds like me playing wordle.