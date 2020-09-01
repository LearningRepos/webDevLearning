// Can reference a parameter in a function for a callback
function animal(animalName) {
  console.log("I have a " + animalName);
}

function callbackAnimal(functionName) {
  let animal = "Mouse";
  functionName(animal);
}

let testArray = [1, 2, 3, 4, 5];
let wordArray = ["colt", "matt", "tim", "udemy"];
let nameArray = [
  { name: "Elie" },
  { name: "Tim" },
  { name: "Matt" },
  { name: "Colt" },
];
let fullArray = [
  { first: "Elie", last: "Schoppik" },
  { first: "Tim", last: "Garcia" },
  { first: "Matt", last: "Lane" },
  { first: "Colt", last: "Steele" },
];

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

function doubleValues(arr) {
  let newArr = [];
  arr.forEach(function (val) {
    newArr.push(val * 2);
  });
  return newArr;
}

function onlyEvenValues(arr) {
  let newArr = [];
  arr.forEach(function (val) {
    if (val % 2 === 0) {
      newArr.push(val);
    }
  });
  return newArr;
}

function showFirstAndLast(arr) {
  let newArr = [];
  arr.forEach(function (val) {
    newArr.push(val[0] + val[val.length - 1]);
  });
  return newArr;
}

function addKeyAndValue(arr, keyName, value) {
  let newArr = [];
  arr.forEach(function (val, index) {
    newArr.push(val);
    newArr[index][keyName] = value;
  });
  return newArr;
}

function vowelCount(str) {
  let newVowels = {};
  for (i of str) {
    if (["a", "e", "i", "o", "u"].includes(i.toLowerCase())) {
      let LL = i.toLowerCase();
      newVowels[LL] ? newVowels[LL]++ : (newVowels[LL] = 1);
    }
  }
  return newVowels;
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

//map creates a new array and loops over the entire array
function doubleValuesMap(arr) {
  return arr.map((value) => (value *= 2));
}

function valTimesIndex(arr) {
  return arr.map((value, index) => (value *= index));
}

function extractKey(arr, key) {
  return arr.map((value) => value.name);
}

function extractFullName(arr) {
  return arr.map((value) => value.first + " " + value.last);
}

//filer returns a new array with elements that pass a specific test
function find(arr, searchValue) {
  let filteredArray = arr.filter((value) => value === searchValue);
  if (filteredArray.length) {
    return filteredArray[0];
  } else {
    return "undefined";
  }
}

//some returns true if 1 test is passed and every returns true if all tests are oassed
function hasOddNumber(arr) {
  return arr.some(function (value) {
    return value % 2 != 0;
  });
}

function hasAllOddNumber(arr) {
  return arr.every(function (value) {
    return value % 2 != 0;
  });
}

//reduce has an accumulator which can add all the elements of an array up
function sumUp(arr) {
  return arr.reduce(function (accumulator, value) {
    console.log(accumulator, value);
    return accumulator + value;
  });
}

// doubleValues(testArray);
// onlyEvenValues(testArray)
// showFirstAndLast(wordArray)
// addKeyAndValue(nameArray,"title","instructor")
// vowelCount("Elie")
// doubleValuesMap(testArray)
// valTimesIndex(testArray)
// extractKey(nameArray,"name")
// extractFullName(fullArray);
// find(testArray,6);
// hasOddNumber(testArray)
// hasAZero(12120121);
// sumUp(testArray)
