/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable space-unary-ops */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable comma-spacing */
/* eslint-disable arrow-parens */
/* eslint-disable space-in-parens */
/* eslint-disable space-before-blocks */
/* eslint-disable prefer-const */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable padded-blocks */
/* eslint-disable-next-line no-trailing-spaces */
document.addEventListener('DOMContentLoaded', () => {
  // Select grid class in the html
  const grid = document.querySelector('.grid');
  // eslint-disable-next-line prefer-const
  // Put the div into an array
  // eslint-disable-next-line prefer-const
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const ScoreDisplay = document.querySelector('#score');
  const StartButton = document.querySelector('#start-button');
  const GRID_WIDTH = 10;
  let nextRandom = 0;

  // The Tetrominoes
  const lTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
    [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
  ];

  const zTetromino = [
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
  ];

  const tTetromino = [
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
  ];

  const oTetromino = [
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
  ];

  const iTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
  ];
  // Tetrominoes shapes stored in array
  const theTetrominoes = [lTetromino,iTetromino,zTetromino,oTetromino];
  // randomly selects shape of tetromino
  let currentPosition = 4;
  let currentRotation = 0;
  
  let random = Math.floor(Math.random()*theTetrominoes.length);
  let current = theTetrominoes[random][0];
  // Draw tetromino
  function draw(){
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }
  
  function undraw(){
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }


const displaysquares = document.querySelectorAll('.mini-grid div');
const displayWidth = 4;
let displayIndex = 0; 
 

const upNextTetrominoes = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2], // l tetro
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // z tetro
  [1, displayWidth, displayWidth + 1, displayWidth + 2], // t tetro
  [0, 1, displayWidth, displayWidth + 1], // o tetro
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] // i tetro
]

function displayShape(){
  displaysquares.forEach(square => {
    square.classList.remove('tetromino')
  })
  upNextTetrominoes[nextRandom].forEach(index => {
    displaysquares[displayIndex + index].classList.add('tetromino')
  })
}


  // Stop the tetromino at the end of the grid and draw a new one
   function freeze(){
     if (current.some(index => squares[currentPosition + index + GRID_WIDTH].classList.contains('taken'))){
       current.forEach(index => squares[currentPosition + index].classList.add('taken'))
       // start new tetromino
     random = nextRandom 
     nextRandom = Math.floor(Math.random()*theTetrominoes.length);
     current = theTetrominoes[random][currentRotation];
     currentPosition = 4;
     draw()
     displayShape()
     }
   }

   // Move down the tetromino

   function moveDown(){
    undraw()
    currentPosition += GRID_WIDTH
    draw()
    freeze()
    }

  function moveLeft(){
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % GRID_WIDTH === 0)

    if (!isAtLeftEdge) {
      currentPosition -=1 }
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
      currentPosition +=1 }

      draw()
  }

  function moveRight(){
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % GRID_WIDTH === GRID_WIDTH -1 )

    if (!isAtRightEdge) {
      currentPosition +=1 }
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
      currentPosition -=1 }

      draw()
  }

function rotate(){
  undraw()
  currentRotation ++
  if (currentRotation === current.length){
    currentRotation = 0
  }
  else current = theTetrominoes[random][currentRotation]
  
  draw()

}

  function control(e){
    if (e.keyCode === 37){
      moveLeft()
    }
    else if (e.keyCode === 38){
     rotate()
    }
    else if (e.keyCode === 39){
      moveRight()
    }
    else if (e.keycode === 40){
      moveDown()
    }

    }
  
  document.addEventListener('keyup', control)

    // Set falling speed
    timerId = setInterval(moveDown, 1000)


















 });

