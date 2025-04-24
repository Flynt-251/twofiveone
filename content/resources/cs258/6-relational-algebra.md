+++
title = "6 - Relational Algebra"
+++

Relational Algebra is one of two methods of formally portraying operations carried out on relations, i.e. queries on tables.

## Symbols

$\pi_A$ - **Projection**, similar to `SELECT A`

$\sigma_c$ - **Selection**, similar to `WHERE c`

$A \times B$ - **Product**, similar to `A CROSS JOIN B`

$A * B$ - **Natural Join**, sometimes $\bowtie$

$A \bowtie_{a=b} B$ - **Join** on condition a=b.

$A \cup B, A \cap B, A - B$ - **Set operations**, union, intersection and except.

$\rho_{A1(a,b,c)} A2$ - **Rename**, similar to `AS`

$A ⟕ B, A ⟖ B, A ⟗ B$ - **Left, Right and Full Outer Join**

## Examples

### Basic SELECT query

$\pi_{title, publisher}(\sigma_{genre=``platformer"}(DISCS))$

```sql
SELECT title, publisher
FROM DISCS
WHERE genre = "platformer";
```

### Subquery

SegaGames $\leftarrow \pi_{gameID}(\sigma_{publisher=``SEGA"}(GAMES))$

SegaReviews $\leftarrow \pi_{rating, title, author}(REVIEWS \bowtie SegaGames)$

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

### Maximum of a set of values

$A \leftarrow \rho_{A}(\pi_{msrp}(GAMES))$

$B \leftarrow \rho_{B}(\pi_{msrp}(GAMES))$

$\pi_{msrp}(GAMES) \setminus \pi_A(A \bowtie_{A.msrp < B.msrp} B)$

*Credit: Solution provided by Harm*

```sql
SELECT MAX(msrp) FROM GAMES;
```

### Non-existent attribute(s) in another table

$\sigma_{REVIEWS.title = \omega}(GAMES ⟕ REVIEWS)$

*Note that $\omega$ (little omega) is used to denote NULL.*

```sql
SELECT * FROM GAMES d WHERE NOT EXISTS(
    SELECT * FROM REVIEWS r WHERE d.title = r.title
);
```