# Anti-Chess CLI Game

Welcome to Anti-Chess! This project sets up a command-line interface (CLI) for two players to play a game of chess. Players will input their moves and interact with the game entirely through the CLI.

## Features

- Players can input their moves in the form of `A2 B4`.
- The system alternates between players for their turns.
- Each turn, a player can:
  - Display the board.
  - Quit the game (the other player wins).
  - Make a move.
- The system checks for illegal moves and prompts the player to enter a valid move.
- The system detects when a player has won and displays the winner.
  
### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saptaparnibose/Anti-Chess_Question-01.git

### Example 
                                      

    //\\\\             ||   _        __ ||                ___   ___
   //  \\\\    \\\\==== ==== (_)    //    ||         __   //    //
  //____\\\\   ||   || ||   ||    ||    ||===,   //  \\\\ \\\\___ \\\\___
 //      \\\\  ||   || ||   || == ||    ||   || ||___//     \\\\    \\\\
//        \\\\ ||   || \\\\__ ||    \\\\___ ||   ||  \\\\___   ___// ___//
                                       
-------------------------------------------------------------------
---------------------- Welcome to Anti-Chess ----------------------
-------------------------------------------------------------------
                                       
__|_A_B_C_D_E_F_G_H
8 | r n b q k b n r
7 | p p p p p p p p
6 |                
5 |                
4 |                
3 |                
2 | P P P P P P P P
1 | R N B Q K B N R
                                       
White's move (e.g., A2 A3), 'quit' to end or 'display' to see moves: 
