class Stopwatch {
  constructor(display, results) {
    this.running = false;
    this.display = display;
    this.results = results;
    this.laps = [];
    this.reset();
    this.print(this.times);
  }

  reset() {
    this.times = [0, 0, 0];
  }

  start() {
    if (!this.time) this.time = performance.now();
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
  }

  lap() {
    let times = this.times;
    let li = document.createElement('li');
    li.innerText = this.format(times);
    this.results.appendChild(li);
  }

  stop() {
    this.running = false;
    this.time = null;
  }

  restart() {
    if (!this.time) this.time = performance.now();
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }

    this.stop();
    this.reset();
    document.querySelector('.stopwatch').innerHTML = '00:00:00';
  }

  clear() {
    clearChildren(this.results);
  }

  step(timestamp) {
    if (!this.running) return;
    this.calculate(timestamp);
    this.time = timestamp;
    this.print();
    requestAnimationFrame(this.step.bind(this));
  }

  calculate(timestamp) {
    var diff = timestamp - this.time;
    // Hundredths of a second are 100 ms
    this.times[2] += diff / 10;
    // Seconds are 100 hundredths of a second
    if (this.times[2] >= 100) {
      this.times[1] += 1;
      this.times[2] -= 100;
    }
    // Minutes are 60 seconds
    if (this.times[1] >= 60) {
      this.times[0] += 1;
      this.times[1] -= 60;
    }
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
  }
}

function pad0(value, count) {
  var result = value.toString();
  for (; result.length < count; --count)
    result = '0' + result;
  return result;
}

function clearChildren(node) {
  while (node.lastChild)
    node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
  document.querySelector('.stopwatch'),
  document.querySelector('.results'));



//grid

let items = [];

function shuffle(array) {
  var i = array.length,
    j = 0,
    temp;

  while (i--) {

    j = Math.floor(Math.random() * (i + 1));

    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;

  }

  return array;
}


//GAME
window.addEventListener("load", start);

function start() {
  var start = document.getElementById('start');
  start.innerHTML = 'Click here to Start';

  start.addEventListener('click', function() {


    start.innerHTML = "<h1 class='start'>3</h1>";
    setTimeout(() => {
      start.innerHTML = "<h1 class='start'>2</h1>";
    }, 1000);
    setTimeout(() => {
      start.innerHTML = "<h1 class='start'>1</h1>";
    }, 2000);
    setTimeout(() => {

      start.remove();
      startGame();
      stopwatch.start();
    }, 3200);

  })


}



let shuffedArray = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])


function startGame() {

  for (var i = 0; i < 20; i++) {
    var field = document.getElementById("field");
    var square = document.createElement("button");
    square.className = 'square';
    field.appendChild(square);
    square.innerHTML = shuffedArray[i];
    square.setAttribute("type", 'button')
    square.setAttribute("id", 'square' + shuffedArray[i])
    square.setAttribute("value", shuffedArray[i]);

  }
  gamelogic();
};





function gamelogic() {

  let min = Math.min(...shuffedArray)

  for (var i = 0; i < 20; i++) {
    let clickedSquare = document.getElementById("square" + shuffedArray[i])

    clickedSquare.addEventListener('click', function() {
      let value = parseInt(this.textContent) + Number(20)
      if (value <= Number(40) && value === min + Number(20)) {
        this.innerHTML = parseFloat(this.innerHTML) + Number(20);
        min++;
        console.log(min);

      } else if (value <= Number(60) && value === min + Number(20)) {
        console.log(min);
        this.innerHTML = "";
        min++;
        console.log(min);
        if (min === Number(41)) {
          console.log(min);
          gameEnd();
          stopwatch.stop();
          stopwatch.restart();

        }
      }
    });
  }

}



function gameEnd() {

  console.log("ending game");

  for (let i = 0; i < 20; i++) {
    document.getElementById("square" + shuffedArray[i]).remove();
  }

  stopwatch.lap();

  var userTime = document.getElementById('stopWatch');

  let result = document.getElementById("field");
  let showResult = document.createElement('p')
  showResult.setAttribute('class', 'result');
  result.appendChild(showResult);
  let highScore = document.querySelector(".result");
  highScore.innerHTML = "Game Completed!";
  console.log(highScore.textContent);
}
