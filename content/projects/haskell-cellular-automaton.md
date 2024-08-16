+++
title = "Brian's Functional Brain"
description = "Implementing a cellular automaton in Haskell"
+++

**Note:** This project was completed as part of my degree course, so source code has been withheld for academic integrity.

Brian's brain is a cellular automaton which follows a small set of rules, over a 2D grid of squares. A single square (cell) is dead, alive or dying. If a cell is alive, all surrounding dead cells become alive, and it becomes a dying cell. All dying cells then go on to die. Each of these rules apply over a single generation, creating a unique pattern that either dies within a few generations, or grows infinitely, depending on which cells are brought to life before starting.

![Brian's Brain after running for many generations](/images/projects/brians-brain.png)

My implementation uses a pre-provided implementation of Hatch, which handles the animation of the automaton. Hence, the bulk of work in this project comes in finding a function that takes in the current set of alive and dying cells, and returns the next set of cells for the next generation.

Determining the next generation of dying cells is trivial, simply assign all currently alive cells as dying cells. However, for the next generation of alive cells, you need to determine where the cells adjacent to the currently alive cells are, and check that they are dead, not dying or alive. Once both sets are determined, they are passed into Hatch functions to display the cells as squares.

My implementation was created without using a `State` type class, and so each generation is calculated by starting at the beginning state, and working up to the last one. This means larger generations take significantly more time to compute, causing massive slowdown. It is likely that by using the `State` type class, the efficiency can be greatly improved.