const gameContainer = document.getElementById('game');
const COLORS = [];

function generateNumCards() {
	let numCard = Math.floor(Math.random() * 20);
	if (numCard < 8) {
		if (numCard % 2 !== 0) {
			numCard++;
		} else {
			numCard += 8;
		}
  }
  
  for(let x of COLORS){
    COLORS.pop();
  }
  
	for (var i = 0; i < numCard; i += 2) {
		let r = Math.floor(Math.random() * 256);
		let g = Math.floor(Math.random() * 256);
		let b = Math.floor(Math.random() * 256);
		COLORS.push(`rgb(${r},${g},${b})`);
		COLORS.push(`rgb(${r},${g},${b})`);
  }
  
}

generateNumCards();

// const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];
let shuffledColors = shuffle(COLORS);
let startGame = document.querySelector('#startGame');
let restartGame = document.querySelector('#restartGame');
let numCards = 0;
let score = 0;
let numMatched = 0;
restartGame.className = 'visible';

startGame.onclick = function(e) {
	e.preventDefault();
	shuffledColors = shuffle(COLORS);
	createDivsForColors(shuffledColors);
	startGame.className = 'visible';
  restartGame.classList.toggle('visible');
  generateNumCards();
};

restartGame.onclick = function(event) {
	event.preventDefault();
  gameContainer.innerText = '';
  generateNumCards();
	numCards = 0;
	score = 0;
	numMatched = 0;
	shuffledColors = shuffle(COLORS);
	createDivsForColors(shuffledColors);
};

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on

		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
function handleCardClick(event) {
	// you can use event.target to see which element was clicked

	if (numCards === 0 && event.target.id !== 'matched') {
		event.target.style.backgroundColor = `${event.target.className}`;
		event.target.id = 'firstCard';
		numCards++;
		score++;
	} else if (numCards === 1 && event.target.id !== 'matched') {
		event.target.style.backgroundColor = `${event.target.className}`;
		event.target.id = 'secondCard';
		numCards++;
		clearCards();
		score++;
	}

	scoreKeeper();
}

// when the DOM loads
// createDivsForColors(shuffledColors);

//function for turning cards back over
function clearCards() {
	let card1 = document.querySelector('#firstCard');
	let card2 = document.querySelector('#secondCard');

	if (card1.style.backgroundColor === card2.style.backgroundColor) {
		card1.id = 'matched';
		card2.id = 'matched';
		alert('correct');
		numCards = 0;
		numMatched += 2;
	} else {
		setTimeout(function() {
			card1.style.backgroundColor = '';
			card2.style.backgroundColor = '';
			card1.id = '';
			card2.id = '';
			numCards = 0;
		}, 1000);
	}
}

//function for keeping score
function scoreKeeper() {
	if (numMatched !== shuffledColors.length) {
		console.log(score);
		return numCards;
	} else {
		gameComplete();
	}
}

//function for end game commentary
function gameComplete() {
	if (!localStorage.getItem(`Best Score ${colors.length}`)) {
		localStorage.setItem(`Best Score ${colors.length}`, score);
		alert(`You win! You are the first person to complete the game! ${score} turns will be the score to beat!`);
	} else {
		let bestScore = parseInt(localStorage.getItem(`Best Score ${colors.length}`));

		if (score < bestScore) {
			alert(
				`You set a new record! The old record for fewest moves was ${localStorage.getItem}. You finished in ${score} moves`
			);
			localStorage.setItem(`Best Score ${colors.length}`, score);
		} else if (score === bestScore) {
			alert(`You win! You tied the record for fewest moves. You finished in ${score} moves.`);
		} else {
			alert(`You win! You finished in ${score} moves, but the record for fewest moves is ${bestScore}`);
		}
	}
}
