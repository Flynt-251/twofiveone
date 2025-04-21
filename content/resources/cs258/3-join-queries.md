+++
title = "3 - JOIN Queries"
+++

Join Queries allow us to combine tables together. This is beneficial if we have certain parameters that link tables together, i.e. *foreign keys*.

We have already seen a **Cross Join** when looking at [multi-table queries](/cs258/2-multi-table.md#multiple-tables-in-select--from).

```sql
SELECT * FROM A CROSS JOIN B;
-- which is equivalent to...
SELECT * FROM A, B;
```

Where we have tables A and B...

|A.a|A.b|
|---|---|
| 0 | 1 |
| 2 | 3 |

|B.b|B.c|
|---|---|
| 4 | 5 |
| 3 | 6 |

Then the output of the above statement is:

|A.a|A.b|B.b|B.c|
|---|---|---|---|
| 0 | 1 | 4 | 5 |
| 0 | 1 | 3 | 6 |
| 2 | 3 | 4 | 5 |
| 2 | 3 | 3 | 6 |

Which is the *cartesian product* of both tables.

On its own, a cross join isn't particularly useful and can greatly increase computation time. Fortunately, we have other types of join to amend this.

## One hundred percent natural

**Natural Joins** take the result of a cross join and identifies a common attribute between the two tables, i.e. of the same name or type. It then only retains the records in which the two halves share the same value for that attribute. So let's say we did a natural join on A and B...

```sql
SELECT * FROM A NATURAL JOIN B;
```

We then get the following output:

|a|b|c|
|-|-|-|
|2|3|6|

Going back to the output of the cross join, we can see that only in the last row, A.b and B.b are the same value. Hence, this row is kept in the table, and the columns are combined into one.

## Feet-uh join

Sometimes, there are multiple attributes on which we could perform a natural join, so a **Theta Join** allows us to explicitly specify a common attribute to do a natural join on. In our example, we'd write the following SQL:

```sql
SELECT * FROM A JOIN B ON b;
```

And this would give us the same output as the natural join. The following also provides a similar output, and uses no explicit join (Not the same, as A.b and B.b are presented as different columns):

```sql
SELECT *
FROM A, B
WHERE A.b = B.b;
```

## You're IN her schema, I'm IN her tables, we are not the same

The above mentioned *natural join* and *theta join* are both similar to an **Inner Join**, which includes an `ON` clause which contains a boolean statement. You can think of this as like a `WHERE` clause that uses two tables, and the satisfaction of which causes the records to combine.

```sql
SELECT * FROM A INNER JOIN B ON A.b = B.b;
```

|A.a|A.b|B.b|B.c|
|---|---|---|---|
| 2 | 3 | 3 | 6 |

The following provides the same output, and uses no explicit join, however consider how these two queries may be processed differently:

```sql
SELECT *
FROM A, B
WHERE A.b = B.b;
```

What makes inner joins more powerful than theta or natural joins though, is the fact that we could use any boolean expression using the two tables, to get a join, the attributes used don't have to have the same name, allowing us to do things like this:

```sql
SELECT *
FROM A INNER JOIN B ON B.c = (A.a + 5);
```

Which would get us the following table:

|A.a|A.b|B.b|B.c|
|---|---|---|---|
| 0 | 1 | 4 | 5 |

## GET OUT ‼️

Isn't that a line from young sheldon where the dad is watching porn?

Anyway, the existence of an *inner join* implies the existence of an **Outer Join** right? Well, it rightfully does. Outer joins ensure that data is retained in the output, even if a record is not successfully matched with another. The other half of the data is simply shown as `NULL`. Hence, we have a **Left Outer Join** and a **Right Outer Join**, based on which table we want to prioritise.

```sql
SELECT *
FROM A LEFT OUTER JOIN B ON (A.b < B.b);
```

|A.a|A.b|B.b|B.c|
|---|---|---|---|
| 0 | 1 | 4 | 5 |
| 0 | 1 | 3 | 6 |
| 2 | 3 |NULL|NULL|

```sql
SELECT *
FROM A RIGHT OUTER JOIN B ON (A.b < B.b);
```

|A.a|A.b|B.b|B.c|
|---|---|---|---|
| 0 | 1 | 4 | 5 |
| 2 | 3 | 4 | 5 |
| 0 | 1 | 3 | 6 |

Note that we don't have any null values for the right outer join, again, because the right-hand table is prioritised. By not specifying left or right, we can create a **Full Outer Join**, which is the union of both a left and right outer join.

```sql
SELECT *
FROM A OUTER JOIN B ON (A.b < B.b);
```

|A.a|A.b|B.b|B.c|
|---|---|---|---|
| 0 | 1 | 4 | 5 |
| 0 | 1 | 3 | 6 |
| 2 | 3 | 4 | 5 |
| 2 | 3 |NULL|NULL|

## You're just USING me

Sometimes you may see `USING` used instead of `ON`. This lets you specify a common attribute on which to join on, where both tables have the same value for that attribute, like a natural join.

```sql
SELECT * FROM A INNER JOIN B USING (b);
```
