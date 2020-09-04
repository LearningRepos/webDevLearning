// consts cannot be changed with primitive types
const mouse = "Jerry";

// you can change consts if it is an object though
const arr = [1, 2, 3];
arr.push(2);

// lets can be changed
let cat = "Jerry";
cat = "JERRY";

function letScope() {
  // hoisting does not work because let has block scope
  return dog;
  let dog = "Boi";
}
// letScope()

// template strings make concatenation easier
const corgi = "Small";
const age = "2";
// regular concatenation:
// console.log("This dog is " + corgi + " and age is " + age)
// template strings
// console.log(`This dog is ${corgi} and age is ${age}`)

// arrow functions make code easier to read but the keyword 'this' refers to the surrounding object
// regular map function
let firstArr = [1, 2, 3, 4].map(function (value) {
  return value * 2;
});
// map arrow function
let secondArr = [1, 2, 3, 4].map((s) => s * 2);

function tripleAndFilter(arr) {
  return arr.map((value) => value * 3).filter((value) => value % 5 === 0);
}

tripleAndFilter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

function doubleOddNumbers(arr) {
  return arr.filter((val) => val % 2 !== 0).map((val) => val * 2);
}

doubleOddNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

function mapFilterAndReduce(arr) {
  return arr
    .map((val) => val.firstName)
    .filter((val) => val.length < 5)
    .reduce((acc, next) => {
      acc[next] = next.length;
      return acc;
    }, {});
}

// can add default parameters with =value
let obj = (fname = "Tom", lname = "Hamilton") => ({
  firstName: fname,
  lastName: lname,
});
// console.log(obj());

var instructor = {
  firstName: "Colt",
  sayHi: function () {
    setTimeout(() => console.log("Hello " + this.firstName), 1000);
  },
};

// instructor.sayHi()

// for of iterates through the values  instead of keys/indices
function forOfDemon() {
  for (let i of [1, 2, 3, 4]) {
    console.log(i);
  }
}
// forOfDemon();

// the rest operator sums up all remaining parameters in an array
function restDemon(a, b, ...c) {
  console.log(a, b);
  console.log(c);
}
// restDemon(1,2,3,4,5)

// the spread operator turns an array into individual values
// console.log(...[1,2,3])

function smallestValue(...c) {
  return Math.min(...c);
}
// smallestValue(4,1,12,0)

function placeInMiddle(arr, vals) {
  return [
    ...arr.slice(0, Math.floor(arr.length / 2)),
    ...vals,
    ...arr.slice(Math.floor(arr.length / 2)),
  ];
}
// placeInMiddle([1,2,6,7],[3,4,5])

function joinArrays(...c) {
  let newArr = [];
  for (i of c) {
    newArr.push(...i);
  }
  return newArr;
}
// joinArrays([1],[2],[3])

function sumEvenArgs(...c) {
  let count = 0;
  for (i of c) {
    if (i % 2 === 0) {
      count += i;
    }
  }
  return count;
}
// sumEvenArgs(1,2,3,4)

// if object key and value have the same name then you can specify 1 parameter in object
let color1 = "red";
let color2 = "blue";
let colorPalette1 = { color1, color2 };
let colorPalette2 = {
  [color1]: "bright",
  [color2]: "dark",
};
// console.log(colorPalette2)

// can destructure/unpack objects like this
let { color1: one, color2: two } = colorPalette1;
// console.log(one,two)

function displayStudentInfo(obj) {
  let { first: fname, last: lname } = obj;
  console.log(`Your full name is ${fname} ${lname}`);
}
// displayStudentInfo({first: 'Elie', last:'Schoppik'})

function createStudent(likes = { likesJavaScript: true, likesES2015: true }) {
  let { likesJavaScript: isJs, likesES2015: likesEs } = likes;
  if (isJs && likesEs) {
    console.log("The student likes JavaScript and ES2015");
  } else if (isJs && !likesEs) {
    console.log("The student likes JavaScript");
  } else if (!isJs && likesEs) {
    console.log("The student likes ES2015");
  } else {
    console.log("The student likes nothinig");
  }
}
// createStudent({likesJavaScript:false, likesES2015:false});

// es2015 class
class Laptop {
  constructor(model, type, age) {
    this.model = model;
    this.type = type;
    this.age = age;
  }
  // an instance method
  toString() {
    console.log(
      `The laptop's model is ${this.model} and it is meant for ${this.type} and it is ${this.age} years old`
    );
  }
  // a static method
  static boom() {
    console.log("Boom");
  }
}

let Legion = new Laptop("Lenovo", "Gaming", 0);
// Legion.toString()
// Laptop.boom()

class Person {
  constructor(firstName, lastName, favoriteColor, favoriteNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteColor = favoriteColor;
    this.favoriteNumber = favoriteNumber;
  }
  multiplyFavoriteNumber(num) {
    console.log(num * this.favoriteNumber);
  }
}
var person = new Person("Elie", "Schoppik", "purple", 34);
// person.multiplyFavoriteNumber(2)

class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  start() {
    return "VROOM";
  }
  toString() {
    return `The make, model, and year are ${this.make}, ${this.model}, and ${this.year}`;
  }
}

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 2;
  }
}

// maps are like objects but can use any data type
// weakMaps need the keys to be objects => more performance but cannot iterate
let newMap = new Map();
newMap.set("1st array", [1, 2, 3, 4, 5]);
newMap.set("2nd array", [6, 7, 8, 9, 10]);
// console.log(newMap.get("2nd array"));

// sets
let newSet = new Set([1, 2, 3, 4, 5]);
newSet.add(5);
newSet.delete(4);
// console.log(newSet);

function uniqueValues(arr) {
  let arrSet = new Set(arr);
  return arrSet.size;
}
// uniqueValues([1,1,2,2,2,3,3,3,3,4,4,4,5,5,6])

function hasDuplicates(arr) {
  let arrLength = arr.length;
  let newSet = new Set(arr);
  let setLength = newSet.size;
  if (arrLength === setLength) {
    return false;
  }
  return true;
}
// hasDuplicates([1,2,3,4,5])

class MessageBoard {
  constructor() {
    this.messages = new Map();
    this.id = 1;
  }
  addMessage(message) {
    this.messages.set(this.id, message);
    this.id++;
    return this;
  }
  findMessageById(id) {
    return this.messages.get(id);
  }
  findMessageByValue(message) {
    let iterator = this.messages.values();
    for (let i = 0; i < this.messages.size; i++) {
      let iteratorMessage = iterator.next();
      if (iteratorMessage.value === message) {
        return iteratorMessage.value;
      }
    }
    return undefined;
  }
  removeMessage(id) {
    this.messages.delete(id);
  }
  numberOfMessages() {
    return this.messages.size;
  }
  messagesToArray() {
    let arr = [];
    for (let i of this.messages) {
      arr.push(i[1]);
    }
    return arr;
  }
}
var m = new MessageBoard();
m.addMessage("awesome!").addMessage("nice!").addMessage("cool!");
m.findMessageById(1);
m.findMessageByValue("cool");
m.removeMessage(1);
m.messagesToArray();

// generators are functions that can pause and resume at will
function* getArrayValues() {
  for (let i of [1, 2, 3, 4]) {
    yield i;
  }
}
let firstGenerator = getArrayValues();
// firstGenerator.next();
// firstGenerator.next();
// firstGenerator.next();
// firstGenerator.next();

// can use for of loop on generator
// for(let i of getArrayValues()){
//   console.log(i)
// }

// if change object property on referenced variable then other variable changes also
let a = { name: "corg" };
let b = a;
b.name = "porg";
// console.log(a)

// can use object.assign to help with this
let c = { bike: "bmx" };
let d = Object.assign({}, c);
d.bike = "2 wheeler";
// console.log(c,d)

// Array.from converts an array like object into an array
let convertedArr = Array.from("12345");
// console.log(convertedArr)

function copyObject(obj) {
  return Object.assign({}, obj);
}

var o = { name: "Elie" };
var o2 = copyObject({}, o);
o2.name = "Tim";
o2.name; // 'Tim'
o.name; // 'Elie

function checkIfFinite(number) {
  return Number.isFinite(number);
}
// checkIfFinite(Infinity) // false

function areAllNumbersFinite(arr) {
  for (let i of arr) {
    if (!Number.isFinite(i)) {
      return false;
    }
  }
  return true;
}
// areAllNumbersFinite([4,-3,2.2,NaN]);

function convertArrayLikeObject(obj) {
  return Array.from(obj);
}

function displayEvenArguments(...c) {
  let evenArr = c.filter((c) => c % 2 === 0);
  return evenArr;
}
// displayEvenArguments(1,2,3,4,5,6)

// can find 2^2 with **
// console.log(2**2)

// pad start and end compensates for extra space by padding in chosen characters
console.log("Happy Birthday".padEnd("30", "!"));
