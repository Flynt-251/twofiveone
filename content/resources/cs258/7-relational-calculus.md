+++
title = "7 - Relational Calculus"
[extra]
katex = true
+++

**Relational Calculus** is a declarative representation of databases in terms of first-order logic. As such, it is based on the use of sets, quantifiers and predicates. There are two types of relational calculus: **Tuple Relational Calculus**, and **Domain Relational Calculus**.

## Tuple Relational Calculus

A typical expression in TRC takes the following form:

$\\{t_1.A1,t_2.A_2,...,t_n.A_n : condition(t_1,...,t_n)\\}$

Where $condition(t_1,...,t_n)$ is a formula, and each $t_i$ represents a free variable.

An **atomic formula** may be any $R(t_i)$, or tuple variable in a relation, or a comparison between either two variables or a variable and a constant, e.g. $t_i.A = t_j.B$, or $t_i.A = c$.

A **compound formula** consists of one or two atomic formulas, as either the boolean operators NOT, AND and OR, or the universal and existential quantifiers over some variable, i.e. $(\forall t)F$ or $(\exists t)F$.

### Examples

#### Basic Select Query

$\\{t.title, t.publisher : DISC(t) \wedge genre = ``platformer"\\}$

Where $DISC(t)$ verifies that $t$ is in the relation $DISC$.

```sql
SELECT title, publisher
FROM DISCS
WHERE genre = "platformer";
```

#### Subquery using the existential quantifier

$\\{t.rating, t.title, t.author : REVIEW(t) \wedge (\exists g)(GAME(g) \wedge g.publisher = ``SEGA" \wedge g.gameId = t.gameId)\\}$

```sql
SELECT rating, title, author
FROM REVIEWS
WHERE (
    gameID IN (
        SELECT gameID
        FROM GAMES
        WHERE publisher = 'SEGA'
    )
);
```

#### Use of the universal quantifier

$\\{t.title, t.platform, t.genre : GAME(t) \wedge (\forall g)(GAME(g) \wedge t.msrp \geq g.msrp)\\}$

```sql
SELECT title, platform, genre
FROM GAMES
WHERE msrp <= ALL(
    SELECT msrp
    FROM GAMES
);
```

## Domain Relational Calculus

DRC defines variables over attribute domains, rather than tuples. A DRC expression looks similar to TRC, except they tend to have lots more quantifiers...

$\\{x_1,x_2,...,x_n : condition(x_1,...,x_n)\\}$

On the left are our desired variables, and the condition is essentially a boolean formula, as we saw before. DRC shares the same atomic and compound formulas as TRC.

### Examples

#### Basic Select Query

$\\{s, v : (\exists r) (\exists s) (\exists u) (\exists v) (\exists w) (\exists x) (\exists y) (\exists z) (DISC(r,s,``platformer",u,v,w,x,y,z)) \\}$

Note that we don't have variable $t$, this would replace "platformer".

```sql
SELECT title, publisher
FROM DISCS
WHERE genre = "platformer";
```
