// Variables
let uncoverBox = 0;
let hits = 0;
let box1 = null;
let box2 = null;
let firstTry = null;
let secondTry = null;
let movements = 0;
let timer = false;
let time = 50;
let timerInitial = time;
let countdown = null;
let showMovements = document.getElementById('movements');
let showHits = document.getElementById('hits');
let showTime = document.getElementById('time');

// Sounds
let fail = new Audio('./sounds/fail.wav');
let lose = new Audio('./sounds/lose.wav');
let right = new Audio('./sounds/right.wav');
let select = new Audio('./sounds/select.wav');
let win = new Audio('./sounds/win.wav');

// Ramdom Array
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
numbers = numbers.sort(()=>{return Math.random()-0.5})

// Function Try Again
function tryAgain(){
  location.reload();
}

// Counter
function counter(){
  countdown = setInterval(() => {
    time--;
    showTime.innerHTML = `Time: ${time} sec`;
    if(time ==0){
      clearInterval(countdown);
      lockBox();
      lose.play();
    };
  },1000);
};

// Lock Box
  function lockBox(){
    for(let i=0; i<=15; i++){
      let blockBox = document.getElementById(i);
      blockBox.innerHTML = `<img src="./images/${numbers[i]}.png" alt="image">`;
      blockBox.disabled = true;
    };
  };

// Main Function
function uncover(id){

  // Timer
  if(timer == false){
    counter();
    timer = true;
  }

  uncoverBox++;
  
  if(uncoverBox == 1){

    // First Try
    box1 = document.getElementById(id);
    firstTry = numbers[id];
    box1.innerHTML = `<img src="./images/${firstTry}.png" alt="image">`; 
    box1.disabled = true;
    select.play();

  }else if(uncoverBox == 2){

    // Second Try
    box2 = document.getElementById(id);
    secondTry = numbers[id];
    box2.innerHTML = `<img src="./images/${secondTry}.png" alt="image">`; 
    box2.disabled = true;
    movements++;
    showMovements.innerHTML = `Movements: ${movements}`;

    // Pair Boxes
    if(firstTry == secondTry){
      uncoverBox = 0;
      hits++;
      showHits.innerHTML = `Hits: ${hits}`;
      right.play();

      // All Pairs
      if(hits == 8){
        win.play();
        clearInterval(countdown);
        showHits.innerHTML = `Hits: ${hits} 🙀`;
        showMovements.innerHTML = `Movements: ${movements} 🤘😎`;
        showTime.innerHTML = `Fantastic! 👏 Your time is: ${timerInitial - time} sec`;
      };

    }else{
      fail.play();
      setTimeout(() => {
        box1.innerHTML = ' ';
        box2.innerHTML = ' ';
        box1.disabled = false;
        box2.disabled = false;
        uncoverBox = 0;
      },500);
    };
   
  };
};