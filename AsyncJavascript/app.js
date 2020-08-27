// Can reference a parameter in a function for a callback
function animal(animalName) {
  console.log("I have a " + animalName);
}

function callbackAnimal(functionName) {
  let animal = "Mouse";
  functionName(animal);
}

// foreach method
let array = [1, 2, 3, 4, 5];

// 1 quick implementation
function oneMethod() {
  array.forEach((a, index, array) => console.log(a));
}

// 2 raw implementation
function twoMethod(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

// find index method
function findIndex() {
  console.log(array.findIndex((a) => a === 3));
}

function findIndexImplementation(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return i;
    }
  }
}

// setTimeout executes a function after a certain amt of time

function delay() {
  setTimeout(function () {
    console.log("1s delay");
  }, 1000);
}

// setInterval calls a function continually with a set time period

function contDelay() {
  setInterval(function () {
    console.log("1 appears every second");
  }, 1000);
}

function timer(seconds) {
  let secondsLeft = setInterval(function () {
    if (seconds == 0) {
      console.log("Ring Ring Ring");
      clearInterval(secondsLeft);
    } else {
      console.log("Timer: " + seconds);
    }
    seconds--;
  });
}

// the stack is a process of steps in javascript code that goes to the first thing executed and puts it on top so that the last thing is the first one out
// the heap is an area in memory where the data is stored
// the event loop runs through the non set timeouts first then setTimeout runs one the queue is empty

// promises are the link between a code executing a failure or success( like  a number ticket in a waiting room)
let firstPromise = new Promise(function (resolve, reject) {
  let num = Math.random();
  if (num > 0.5) {
    resolve(num);
  } else {
    reject(num);
  }
});

firstPromise
  .then(function (result) {
    console.log("Number greater than 0.5");
  })
  .catch(function (result) {
    console.log("Number less than 0.5");
  });
