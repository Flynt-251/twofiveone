+++
title = "2 - Multi-Table queries"
+++

In various scenarios, we may want to include multiple tables in one query, such as identifying the names of students and the course they are taking, given we have two tables, one storing student data, and the other for storing course data.

## Multiple Tables in SELECT ... FROM

```sql
SELECT * FROM A, B;
```

Let's suppose we have the two tables A and B as such...

|A.a|A.b|
|---|---|
| 0 | 1 |
| 2 | 3 |

|B.a|B.b|
|---|---|
| 4 | 5 |
| 6 | 7 |

Then the output of the above statement is:

|A.a|A.b|B.a|B.b|
|---|---|---|---|
| 0 | 1 | 4 | 5 |
| 0 | 1 | 6 | 7 |
| 2 | 3 | 4 | 5 |
| 2 | 3 | 6 | 7 |

Which is the cartesian product of the two tables. This produces the same behaviour as doing a **Cross Join**, which would be written the following way:

```sql
SELECT * FROM A CROSS JOIN B;
```

## Subqueries

The output of a `SELECT` statement produces a new table, so we can use this as an input parameter for another query if we desire. Imagine we have a list of video games in table `GAMES`, and reviews in table `REVIEWS`. Let's say we want to find all of the reviews for games published by SEGA. We can use a subquery to identify which games are published by SEGA, then use the output to determine which reviews to select in the main query.

```sql
SELECT rating, title, author
FROM REVIEWS,
    (SELECT gameID
     FROM GAMES
     WHERE publisher = 'SEGA') S
WHERE REVIEWS.gameID = s.gameID;
```

If you want to use a subquery, you typically need to include it in the `FROM` section of your query. However, using `IN`, it is possible to rewrite this so that we have the subquery in the `WHERE` section:

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

Doing it this way also makes it easier to match by multiple values using a tuple.

```sql
...
WHERE (
    (attr1, attr2, ..., attrN) in (
        SELECT attr1, attr2, ..., attrN
        FROM TABLENAME
        WHERE <COND>;
    )
)
```

### FROM or IN?

Recall that when we use multiple tables in `FROM`, a cartesian product of the tables is formed, and the `WHERE` statement is evaluated on this. This can become very computationally expensive, especially if more than one subquery is involved. However, using `IN` means that one attribute is compared against a table, which is much more efficient. Hence, it makes more sense to use `IN`, however it is good to know how to write both ways (mainly for the exam).

## EXISTential Crisis

The `EXISTS` keyword is used to verify emptiness for a query, as such it's useful for checking uniqueness of an attribute. Going back to our example of `GAMES` and `REVIEWS`, let's say we want to list games that have at least one review which scores at least 8.

```sql
SELECT title, platform, genre, msrp
FROM GAMES G
WHERE (EXISTS(
    SELECT title
    FROM REVIEWS R
    WHERE G.title = R.title AND R.rating >= 8
));
```

Similarly, we can use `NOT EXISTS` to show all games that have no ratings of at most 3.


```sql
SELECT title, platform, genre, msrp
FROM GAMES G
WHERE (NOT EXISTS(
    SELECT title
    FROM REVIEWS R
    WHERE G.title = R.title AND R.rating <= 3
));
```

## ANY and ALL

Across multiple modules you'll see the existential and universal quantifier. These are used in SQL as the `ANY` and `ALL` keywords respectively. These can be used in conjunction with any comparison operator against an attribute. What each of these will do, is check each attribute in the outer query against all attributes in the subquery, and in the case of `ANY`, will include the attribute if at least one comparison succeeds, or for `ALL`, will include it if all attributes in the subquery succeed the comparison.

To demonstrate `ANY`, let's produce a query that returns all games that have at least one review that scores 10 for that game.

```sql
SELECT title, platform, genre, msrp
FROM GAMES
WHERE (title = ANY(
    SELECT title
    FROM REVIEWS
    WHERE rating = 10
));
```

And to demonstrate `ALL`, let's get the list of all of the games which retail for the lowest price in the list.

```sql
SELECT title, platform, genre
FROM GAMES
WHERE msrp <= ALL(
    SELECT msrp
    FROM GAMES
);
```

## Talking about SETs

It is possible to use the set operations `UNION`, `INTERSECT` and `EXCEPT` between two tables. Along with `DISTINCT`, they will automatically remove duplicate records, however it is possible to modify this behaviour to use bag semantics by appending `ALL` to each.

Let's say we want all titles of games that have at least one review, and were released for the Wii. We can use `INTERSECT` for this.

```sql
SELECT title FROM REVIEWS
INTERSECT
SELECT title FROM GAMES WHERE platform = 'Wii';
```

We could use `UNION` to identify all games that are playable on a PS2, so we'd need to include PS1 and PS2 games.

```sql
SELECT title, genre FROM GAMES WHERE platform = 'PlayStation 2'
UNION
SELECT title, genre FROM GAMES WHERE platform = 'PlayStation';
```

And, we can use `EXCEPT` to get all reviews for Wii games, excluding any who only publish for IGN.

```sql
SELECT title, rating, author, publisher FROM REVIEWS
WHERE title IN (SELECT title FROM GAMES WHERE platform = 'Wii')
EXCEPT
SELECT title, rating, author, publisher FROM REVIEWS
WHERE publisher = 'IGN';
```