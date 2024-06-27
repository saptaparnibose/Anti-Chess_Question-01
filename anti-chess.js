const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


console.log("                                       ");
console.log("    //\\\\             ||   _        __ ||                ___   ___");
console.log("   //  \\\\    \\\\==== ==== (_)    //    ||         __   //    //");
console.log("  //____\\\\   ||   || ||   ||    ||    ||===,   //  \\\\ \\\\___ \\\\___");
console.log(" //      \\\\  ||   || ||   || == ||    ||   || ||___//     \\\\    \\\\");
console.log("//        \\\\ ||   || \\\\__ ||    \\\\___ ||   ||  \\\\___   ___// ___//");
console.log("                                       ");
console.log("-------------------------------------------------------------------");
console.log("---------------------- Welcome to Anti-Chess ----------------------");
console.log("-------------------------------------------------------------------");
console.log("                                       ");


const EMPTY = ' ';


let board = [
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'], // Changed to uppercase for white pieces
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // Changed to uppercase for white pieces
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], // Changed to lowercase for black pieces
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']  // Changed to lowercase for black pieces
];

let playerInTurn = 'White';

function viewBoard() {
  console.log('__|_A_B_C_D_E_F_G_H'); // Aligning with the chess board 
  board.forEach((row, i) => {
    console.log((8 - i) + ' | ' + row.join(' ')); // Aligning with the chess board
  });
}


// Check for the similarity of the target piece with the player's piece who has the turn
function isOpponentPiece(piece, playerInTurn) {
  return (playerInTurn === 'White' && piece === piece.toLowerCase()) || (playerInTurn === 'Black' && piece === piece.toUpperCase());
}

function isValidMove(move) {
  const [from, to] = move.split(' ');
  const fromCol = from.charCodeAt(0) - 'A'.charCodeAt(0);
  const fromRow = 8 - parseInt(from[1]);
  const toCol = to.charCodeAt(0) - 'A'.charCodeAt(0);
  const toRow = 8 - parseInt(to[1]);
  
  const piece = board[fromRow][fromCol];

  // Check for place if it's empty and if the place is holding the piece according to the player
  if (piece === EMPTY && (playerInTurn === 'White' && piece === piece.toLowerCase()) && (playerInTurn === 'Black' && piece === piece.toUpperCase())) {
      return false;
  }
   // Check for the target position whether it's empty and if it contains a piece of the same player who's turn in active
   switch (piece.toUpperCase()) {
    case 'P': return isValidPawnMove(fromRow, fromCol, toRow, toCol, playerInTurn);
    case 'R': return isValidRookMove(fromRow, fromCol, toRow, toCol, playerInTurn);
    case 'N': return isValidKnightMove(fromRow, fromCol, toRow, toCol, playerInTurn);
    case 'B': return isValidBishopMove(fromRow, fromCol, toRow, toCol, playerInTurn);
    case 'Q': return isValidQueenMove(fromRow, fromCol, toRow, toCol, playerInTurn);
    case 'K': return isValidKingMove(fromRow, fromCol, toRow, toCol, playerInTurn);
    default: return false;
  }
}

function isValidPawnMove(fromRow, fromCol, toRow, toCol, player) {
  const direction = player === 'White' ? -1 : 1;  // Determine the direction of movement based on the player's color
  const startRow = player === 'White' ? 6 : 1;  // Define the starting row for the pawn based on player color


  // Forward move (non-capturing)
  if (fromCol === toCol) {
      if (board[toRow][toCol] === EMPTY) {  // Check if the target square is empty
          // Initial double move for pawns
          console.log(fromRow);
          console.log(startRow);
          if (fromRow === startRow && fromRow + 2 * direction === toRow) {
              return true;                 // Valid if moving two squares forward from the starting position
          }
          // Regular single move forward
          if (fromRow + direction === toRow) {
              return true;                 // Valid if moving one square forward
          }
      }else{
          return false;                    // Invalid if the target square is not empty
      }
  }
  // Capture move (diagonal)
  if (Math.abs(fromCol - toCol) === 1 && fromRow + direction === toRow && !isOpponentPiece(board[toRow][toCol], player)) {
      return true;                         // Valid if capturing an opponent's piece diagonally         
  }

  return false;                            // If none of the conditions are met, the move is invalid
}

function isValidRookMove(fromRow, fromCol, toRow, toCol, playerInTurn) {
  // Rooks can move either horizontally or vertically, but not both simultaneously
  if (fromRow !== toRow && fromCol !== toCol) {
    return false;                          // If the move is neither purely horizontal nor purely vertical, it's invalid
  }
  // Horizontal move check
  if (fromRow === toRow) {
    const step = fromCol < toCol ? 1 : -1;   // Determine the direction of movement along the columns
    for (let col = fromCol + step; col !== toCol; col += step) {
      if (board[fromRow][col] !== EMPTY) {
        return false;                        // If any square between start and destination is occupied, the move is invalid
      }
    }
  } else {  // Vertical move check
    const step = fromRow < toRow ? 1 : -1;   // Determine the direction of movement along the rows
    for (let row = fromRow + step; row !== toRow; row += step) {
      if (board[row][fromCol] !== EMPTY) {
        return false;                        // If any square between start and destination is occupied, the move is invalid
      }
    }
  }
  // Final check: ensure that the destination square either is empty or contains an opponent's piece
  return !isOpponentPiece(board[toRow][toCol], playerInTurn);
}

function isValidKnightMove(fromRow, fromCol, toRow, toCol, playerInTurn) {
  // Calculate the absolute differences in rows and columns
  const dRow = Math.abs(fromRow - toRow);
  const dCol = Math.abs(fromCol - toCol);

  // Knights move in an 'L' shape: two squares in one direction and one square perpendicular
  if((dRow === 2 && dCol === 1) || (dRow === 1 && dCol === 2)){
    // Check if the destination square is empty or contains an opponent's piece
    return board[toRow][toCol] === EMPTY || !isOpponentPiece(board[toRow][toCol], playerInTurn);;
  }

  // If the move does not match the 'L' shape pattern, it's invalid for a knight
  return false;
}

function isValidBishopMove(fromRow, fromCol, toRow, toCol, playerInTurn) {
  // Check if the move is diagonal (both row and column distances are equal)
  if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) {
    return false;                       // If not diagonal, it's an invalid bishop move
  }
  
  // Determine the direction of movement along rows and columns
  const rowStep = fromRow < toRow ? 1 : -1;  // +1 if moving upwards, -1 if moving downwards
  const colStep = fromCol < toCol ? 1 : -1;  // +1 if moving rightwards, -1 if moving leftwards

  // Check all squares between start and destination for obstacles (pieces)
  for (let row = fromRow + rowStep, col = fromCol + colStep; row !== toRow; row += rowStep, col += colStep) {
    if (board[row][col] !== EMPTY) {
        return false;                   // If any square between start and destination is occupied, the move is invalid
      }
    }
  
  // Final check: ensure that the destination square either is empty or contains an opponent's piece
  return board[toRow][toCol] === EMPTY || !isOpponentPiece(board[toRow][toCol], playerInTurn);
}

function isValidQueenMove(fromRow, fromCol, toRow, toCol, playerInTurn) {
  // Queen moves are valid if they follow either rook or bishop movement rules
  return isValidRookMove(fromRow, fromCol, toRow, toCol, playerInTurn) || isValidBishopMove(fromRow, fromCol, toRow, toCol, playerInTurn);
}

function isValidKingMove(fromRow, fromCol, toRow, toCol, playerInTurn) {
  // Kings can move one square in any direction
  return Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1 && board[toRow][toCol] === EMPTY || !isOpponentPiece(board[toRow][toCol], playerInTurn);
}


function makeMove(move) {
  const [from, to] = move.split(' ');
  const fromCol = from.charCodeAt(0) - 'A'.charCodeAt(0);
  const fromRow = 8 - parseInt(from[1]);
  const toCol = to.charCodeAt(0) - 'A'.charCodeAt(0);
  const toRow = 8 - parseInt(to[1]);
  
  if (isValidMove(move)) {// Check if the move is valid (you would need to define isValidMove)
    const piece = board[fromRow][fromCol];
    board[fromRow][fromCol] = EMPTY;
    board[toRow][toCol] = piece;
    playerInTurn = playerInTurn === 'White' ? 'Black' : 'White';
  } else {
    console.log('Illegal move. Try again.');  // Inform the user if the move is illegal
  }
}

function findColor(piece) {
  return  playerInTurn === 'White' ? piece === piece.toUpperCase() : piece === piece.toLowerCase();
}

function findWinner(){

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] !== EMPTY && findColor(board[i][j])){
        return false;   // If there's at least one piece of the player in turn's color, return false (game continues)
      }
    }
  }

  return true; // If no pieces of the player in turn's color are found, return true (player in turn loses)
}



function fetchMove() {
  console.log("                                       ");
  rl.question(`${playerInTurn}'s move (e.g., A2 A3), 'quit' to end or 'display' to see moves: `, (input) => {
    // Check if the player wants to quit the game
    if (input === 'quit') {
      console.log(`${playerInTurn === 'White' ? 'Black' : 'White'} wins!`);
      rl.close();
      return;
    }

    // Check if the player in turn has no valid moves left, indicating the opponent wins
    if(findWinner()){
      console.log(`${playerInTurn} wins!`);
      rl.close();
      return;
    }
    
    // Display the current state of the board
    if (input.toLowerCase() === 'display') {
      viewBoard();
    } else {
      makeMove(input);
    }
    
    fetchMove();
  });
  console.log("                                       ");
}

// Function to start the game
function startGame() {
  viewBoard();
  fetchMove();
}

// Start the game when this script is executed
startGame();