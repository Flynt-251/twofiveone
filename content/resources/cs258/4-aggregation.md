+++
title = "4 - Aggregation Queries"
+++

We may want to get an average, sum, maximum or minimum value from a set of numerical records in our database. For this, we have the **Aggregation Queries** AVG, COUNT, SUM, MIN and MAX functions, which all do what they say on the tin.

```sql
-- Get the average rating of Super Mario Galaxy
SELECT AVG(rating) FROM REVIEWS WHERE title = 'Super Mario Galaxy';

-- Get the number of reviews for Portal 2
SELECT COUNT(*) FROM REVIEWS WHERE title = 'Portal 2';

-- Get the cost of buying all games published by SEGA
SELECT SUM(msrp) FROM GAMES WHERE publisher = 'SEGA';

-- Get the lowest rating of E.T. the Extra-Terrestrial
SELECT MIN(rating) FROM REVIEWS WHERE title = 'E.T. the Extra-Terrestrial';

-- Get the highest rating of Balatro
SELECT MAX(rating) FROM REVIEWS WHERE title = 'Balatro';
```

We can use the `DISTINCT` keyword to prevent duplicate entries from being counted. This can be especially useful if we are looking for the count of something.

```sql
-- For instance, we may have duplicates of the same game,
-- e.g. because they have different region codes.
SELECT COUNT(DISTINCT title) FROM GAMES WHERE publisher = 'Nintendo';
```

Null values are never counted in aggregation queries. If *all* values are null for a query, then MIN, MAX and SUM will return `NULL`, and COUNT will return 0.

## I hate GROUP projects

Often we want to run aggregate queries on subsets of data. While we could run a separate query for each of these subsets, we could instead use `GROUP BY` at the end of a SELECT-FROM-WHERE statement to split aggregation by one or more attributes. Let's say we want to find out which console is the most expensive to collect games for. We can get the sum of the cost of all games for each platform, in one statement.

```sql
SELECT platform, SUM(msrp) FROM GAMES GROUP BY platform;
```

## An important note on selecting

**All attributes picked under SELECT must be either aggregated on or grouped by.** This means that if an attribute is picked in the SELECT clause of a query, it must be wrapped in AVG, MAX, MIN, COUNT or SUM, *or* be present in a GROUP BY clause.

```sql
-- So, this query is invalid, as `publisher` is not aggregated or grouped.
SELECT publisher, MIN(msrp) FROM GAMES WHERE platform = 'PlayStation 3';
```

## HAVING a breakdown

After a `GROUP BY` clause, we can include a `HAVING` clause to further constrain the output of our query. For example, we can get the average rating of all games that have at least five reviews...


```sql
SELECT title, AVG(rating) FROM REVIEWS GROUP BY title HAVING COUNT(*) >= 5;
```

Or, get the average rating given by each publisher for Mario games.

```sql
-- '%Mario%' matches any game title containing the word "Mario" in it.
SELECT publisher, AVG(rating) FROM REVIEWS GROUP BY PUBLISHER
HAVING title = (SELECT title FROM GAMES WHERE title LIKE '%Mario%');
```