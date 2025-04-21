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