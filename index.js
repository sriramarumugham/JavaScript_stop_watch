let clock = {};

//in the timer is new and no data in local storage
if (localStorage.getItem("clock") == null) {
  clock = {
    interval: "",
    started: false,
    counter: 0,
    min: 0,
    sec: 0,
    pause: false,
  };
}

//ids varibles

const display = document.getElementById("display");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

// turing the min and sec into a string to add 0 before the number in case of a single digit number
function whatisTime() {
  let { min, sec } = clock;
  let text = "";
  if (min < 10) {
    text += "0" + min.toString() + ":";
  } else {
    text += min.toString() + ":";
  }
  if (sec < 10) {
    text += "0" + sec.toString();
  } else {
    text += sec.toString();
  }
  return text;
}

//calculates the minutes and seconds based on the coubt
function calculateTimer() {
  if (clock.counter >= 60) {
    if (clock.min >= 60) {
      clock.min = 0;
    } else {
      clock.min++;
    }
    clock.sec = 0;
    clock.counter = 0;
  } else {
    clock.sec = clock.counter;
  }
}

//startinig a timer 
function startTimer() {

  clock.interval = setInterval(function () {

    clock.counter++;

    //calcuates the time based on count
    calculateTimer();
   
    //cretae a text similar to timer text
    let text = whatisTime();

    //updating the inner text and the title of the document
    display.innerHTML = text;
    document.title = text;

    //updating the local storage to make data persistant
    localStorage.setItem("clock", JSON.stringify(clock));
  }, 1000);
}

function diaplayTime() {
  if (clock.started) {
    clock.pause = false;
    return;
  }
  clock.started = true;
  clock.pause = false;

  //call the timer
  startTimer();
}

function stopTime() {
  clearInterval(clock.interval);

  //toggling  variables
  clock.started = false;
  clock.pause = true;
  
  //updating the local storage
  localStorage.setItem("clock", JSON.stringify(clock));
}

function resetTime() {
  clearInterval(clock.interval);
  display.innerHTML = "00.00";
  document.title = "Stop Watch";

  //resetting the data on the global object
  clock.started = false;
  clock.pause = false;
  clock.min = 0;
  clock.sec = 0;
  clock.interval = "";
  clock.counter = 0;

  //cleting the local storage
  localStorage.clear();
}

start.addEventListener("click", diaplayTime);
stop.addEventListener("click", stopTime);
reset.addEventListener("click", resetTime);

//to prevent timer reste on page reloading
window.addEventListener("load", function (e) {
  console.log("page reloading");

  const data = JSON.parse(localStorage.getItem("clock"));

  if (data) {

  //if timer is runing and during a page refrest
    if (data.started == true) {

      //restting intervals
      data.interval = "";
      data.started = false;
      data.pause = false;
      clock = data;
      //starting the timer on a reload if the time is not stoped 
      diaplayTime();
    } 
    
    else {
      //if timer is stopped and on a reload , getting the previous data
      clock = data;
    }
  }
});
