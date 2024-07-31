+++
title = "Hexapawn.py"
description = "A simple Python-based implementation of Hexapawn"
+++

This project is available on [GitHub](https://github.com/flynt-251/hexapawn.py), go check it out!

This is a relatively small, just-for-fun project I made at the start of my A-Levels. It was inspired by a video about the hexapawn game, and was done by Vsauce2, although the version in his video features Shrek, Donkey, Lord Faarquad and some other Shrek characters to create "Shreksapawn". If you'd like to learn more about Shreksapawn, and prefer a visual/audio explanation of how hexapawn works, [go check out Vsauce2's video](https://youtu.be/sw7UAZNgGg8).

![User Interface Screenshot](/images/hexapawn/user-interface.png)

## What *is* Hexapawn?

Hexapawn was created by a mathematician named Martin Gardner, for the sake of creating a simple game that could implement heuristic artificial intelligence. I'm going to further answer this question from two standpoints: chess and artificial intelligence.

In terms of chess, Hexapawn is a game that uses a 3 by 3 chess board, with three pawns of opposing colours on either side. The pawns move exactly as they would in standard chess, except for the ability to move forward two spaces on the first move. You win by either getting one of your pawns to the other side of the board, or creating a layout that prevents your opponent from moving (including capturing all of their pawns). A single game, as a result, is very quick, and has a small number of permutations. This was perfect for what Gardner wanted to achieve with his heuristic AI, which we'll explore now.

From an AI standpoint, it is expected that the black player (who always plays second) is an AI. Gardner implemented this AI using a mechanical computer, similar to the much more famous MENACE computer: a machine that could play noughts and crosses, while learning which moves lead to success and failure, picking advantageous moves. So, you could play this game with a bunch of matchboxes, beads and a chess board, just like how Kevin does in his video.

The AI works as follows: each matchbox maps to one possible board layout after the white (human) player has moved, and has a different coloured bead to correspond to each possible move they can take. When it's the AI's turn, a random bead is selected to decide on a move. If the AI ends up losing, the beads for the sequence of moves are removed from the matchboxes. If the AI wins, the beads are returned, and additional beads are added to make the sequence of moves more likely.

The addition and removal of beads is the key as to how the AI "learns" how to play the game. All moves have equal probability of being selected on an untrained AI, and the AI learns which moves cause it to win, through a method of reward/punishment.

## What can be done with the program?

Once you load up the program, all contained in `hexapawn.py`, you'll see the UI above. From here, you're free to start playing hexapawn. The AI will learn as you play, so long as the "Learn" setting is on. You can turn learning off to further explore how the AI plays at its current ability, too. There are also features to save and load AI to external `hexai` files, and automate learning if you so wish.

## Final thoughts

This project was a good bit of fun to fill in the time I had while I was studying, although I must admit my methods of choosing moves do have a lot of performance overhead. For example, strings are often used to store information like board layouts, where it would be much more readable and efficient to use an object-oriented approach. I also used Python at the time, as this was the only language I was fully familiar with. A similar program could certainly be written in any other language, or for any other platform, and could be a project I create in the future.

It is also worth using knowledge in discrete mathematics to further analyse how the algorithms for decision making could be improved, e.g. using common tree algorithms, as the game's set of moves can indeed be laid out in a tree data structure, by design.