
var board =[['1', '2','3'],
            ['4', '5','6'],
            ['7', '8','9']];
var movesArr=[];
var userChoice;
var compChoice;
var correctInput = false;
var victory = false;
var gameResult='';

document.getElementById("game").addEventListener('click',function (){
  // victory = false;
  updateMoves();
  createBoard();
  startGame();
});

/**
*function startGame starts the game and runs till there is no victory or draw
*/
function startGame(){
  while (victory==false){
    gameTicTacToe();
  }
};

/**
* function gameTicTacToe runs the game in a sequence
*/
function gameTicTacToe(){
  userTurn();
  updateMoves();
  createBoard();
  checkVictory()

  computerTurn()
  updateMoves();
  createBoard();
  checkVictory()
 };

/**
* function userTurn() will get the input from the user and check if the user input
* is not a character, while looping thru the array it will replace the
* the number with 'x' if the number is a match
*/
function userTurn(){
  correctInput = false;
  while(correctInput == false){
    userChoice = prompt("Pick Number: " + movesArr);
    for(var i =0; i < board.length; i ++){
      for(var j =0; j < board[i].length;j++){
        if (userChoice == board[i][j]){
          board[i][j] = "x";
          correctInput = true;
        } else if (isNaN(userChoice)){
            correctInput = false
          }
            else if (userChoice > 9) {
              correctInput = false
            }
      }
    }
  }
};

/**
* function createBoard will create a tictacto board for the user display
* it will be displayed on the page.
*/

function createBoard(){
  var out ="";
  gameResult = document.getElementById('gameOut');
  for(var i =0; i < board.length; i++){
    out+=board[i].join(' ')+ '</br>';
  }
  gameResult.textContent = out;
  return out;
};

/**
* function computerTurn generates a random number from the available
* moves in movesArray and search the array and the number is replaced
* by y.
*/
function computerTurn(){
  compChoice = movesArr[Math.floor(Math.random() * movesArr.length)];
  for(var i =0; i < board.length; i ++){
    for(var j =0; j < board[i].length;j++){
      if(compChoice == board[i][j]){
        board[i][j] = "y";
      }
    }
  }
};

/**
* function check victory will check for all the combination both for the
* computerTurn and userTurn and will declare victory the game if there is
* a match or draw if there is no match and no moves left.
*/
function checkVictory() {
  if(board[0][0] == "x" && board[1][1] == "x" && board[2][2] == "x"||
    board[0][0] == "x" && board[0][1] == "x" && board[0][2] == "x"||
    board[1][0] == "x" && board[1][1] == "x" && board[1][2] == "x"||
    board[2][0] == "x" && board[2][1] == "x" && board[2][2] == "x"||
    board[0][0] == "x" && board[1][0] == "x" && board[2][0] == "x"||
    board[0][1] == "x" && board[1][1] == "x" && board[2][1] == "x"||
    board[0][2] == "x" && board[1][2] == "x" && board[2][2] == "x"){
    gameResult = document.getElementById('gameOut');
    gameResult.textContent = "User x Wins";
    victory = true;
  } else if(board[0][0] == "y" && board[1][1] == "y" && board[2][2] == "y"||
      board[0][0] == "y" && board[0][1] == "y" && board[0][2] == "y"||
      board[1][0] == "y" && board[1][1] == "y" && board[1][2] == "y"||
      board[2][0] == "y" && board[2][1] == "y" && board[2][2] == "y"||
      board[0][0] == "y" && board[1][0] == "y" && board[2][0] == "y"||
      board[0][1] == "y" && board[1][1] == "y" && board[2][1] == "y"||
      board[0][2] == "y" && board[1][2] == "y" && board[2][2] == "y"){
      gameResult = document.getElementById('gameOut');
      gameResult.textContent = "Computer y Wins";
      victory = true;
    } else if (movesArr.length == 0){
        gameResult = document.getElementById('gameOut');
        gameResult.textContent = "its a draw";
        victory = true;
      }
  return victory;
};

/**
* function updateMoves keeps track of the available moves and will update
* after userTurn and compTurn
*/
function updateMoves(){
  movesArr.length =0;
  for (var k =0; k < board.length; k ++){
    for (var l =0; l <board[k].length; l++){
      if(board[k][l] != "x" && board[k][l]!="y"){
        movesArr.push(board[k][l]);
      }
    }
  }
};
