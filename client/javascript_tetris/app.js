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
  const width = 10;

  console.log(squares);

});
