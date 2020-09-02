//closure makes use of outside variables to use in an inner function
//inner function only remembers defined outer variables not all of them
function closureExample() {
  let name = "Mihir";
  return function showClosure() {
    return "My name is " + name;
  };
}

//only shows inner function
// closureExample()

// shows normal function
// closureExample()()

function addClosures(a) {
  return function addNumber(b) {
    return a + b;
  };
}

// addClosures(5)(5)

//closures allow for private variables to be used
function killCount() {
  let kill = 0;
  return function incrementKill() {
    kill++;
    return kill;
  };
}

// player 1 and 2 are independent from each other and share different kill variables
// let player1 = killCount();
// let player2 = killCount();
// player1();
// player2();
// player2();

function specialMultiply(a, b) {
  if (a && b) {
    return a * b;
  }
  return function alternateParameter(b) {
    return a * b;
  };
}

// specialMultiply(3,4)
// specialMultiply(3)(5)

function guessingGame(amount) {
  let count = amount;
  let randNum = Math.floor(Math.random() * 10);
  console.log(randNum);
  return function Rand(guess) {
    if (count === 0) {
      return "Already used guesses";
    } else {
      count--;
      if (guess > randNum) {
        return "Too high";
      } else if (guess < randNum) {
        return "Too low";
      } else if (guess === randNum) {
        return "correct";
      }
    }
  };
}

// person object demonstrating the properties of 'this'
var person = {
  firstName: "Colt",
  sayHi: function () {
    return "Hi " + this.firstName;
  },
  determineContext: function () {
    return this === person;
  },
  dog: {
    sayHello: function () {
      return "Hello " + this.firstName;
    },
    determineContext: function () {
      return this;
    },
  },
};

// does not work since the keyword 'this' is referring to the dog object not the person object
// person.dog.sayHello()

// this works because you are binding this to the person object with call
// person.dog.sayHello.call(person);

// apply works like call but it takes elements in array parameter and applies them individually
// bind is like call but you can call the function later
// let hi = person.dog.sayHello.bind(person);
// hi()

// simple constructor function for dog
function dog(name, age) {
  this.name = name;
  this.age = age;
  this.bark = function () {
    console.log(this.name, " just barked with age ", this.age);
  };
}

let corgi = new dog("Corgi", 2);
// corgi.bark()

// car constructor which is called in motorcycle to avoid wheels
function car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.numWheels = 4;
}

function motorcycle(make, model, year) {
  //call method used to transfer properties
  car.call(this, make, model, year);
  this.numWheels = 2;
}

// apply still works since the array values are treated independently
// replace array with arguements
// function motorcycle(make, model, year){
//   car.apply(this,arguments);
//   this.numWheels =2;
// }

let motorcycle1 = new motorcycle();
// console.log(motorcycle1)

function Person(firstName, lastName, favoriteColor, favoriteNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.favoriteColor = favoriteColor;
  this.favoriteNumber = favoriteNumber;
  this.multiplyFavoriteNumber = function (num) {
    return this.favoriteNumber * num;
  };
}

let Tom = new Person("Tom", "Little", "Red", 7);
// Tom.multiplyFavoriteNumber(3)

function Parent(firstName, lastName, favoriteColor, favoriteFood) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.favoriteColor = favoriteColor;
  this.favoriteFood = favoriteFood;
  this.emotion = "Angry";
}

function Child(firstName, lastName, favoriteColor, favoriteFood) {
  Parent.apply(this, arguments);
  this.emotion = "Hyper";
}

let Tim = new Child("Tim", "Big", "Blue", 77);
// can set individual properties to stuff using the prototype keyword
Tim.__proto__.male = true;
// console.log(Tim.__proto__.male)

function Vehicle(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.isRunning = false;
}

Vehicle.prototype.turnOn = function () {
  this.isRunning = true;
};

Vehicle.prototype.turnOff = function () {
  this.isRunning = false;
};

Vehicle.prototype.beep = function () {
  if (this.isRunning) {
    console.log("Beep");
  }
};

let Car = new Vehicle();
// Car.turnOn();
// Car.beep();
// console.log(Car.isRunning);

function Person(firstName, lastName, favoriteColor, favoriteNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.favoriteColor = favoriteColor;
  this.favoriteNumber = favoriteNumber;
  this.family = [];
}

// 1st part of inheritance starts by inheriting all the constructor arguements
function Alien(firstName, lastName, favoriteColor, favoriteNumber) {
  Person.apply(this, arguments);
}

//2nd  then you assign the prototype methods from the parent to the child
Alien.prototype = Object.create(Person.prototype);
// 3rd since the constructor was cleared due to Object.create(),you reassign it
Alien.prototype.constructor = Alien;

Alien.prototype.bork = function () {
  return "bork";
};

Person.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};

Person.prototype.addToFamily = function (person) {
  if (!this.family.includes(person)) {
    this.family.push(person);
  }
};

let mouse = new Person("Tom", "Jerry", "Pink", 0);
let hubert = new Alien("Hubert", "Little", "Purple", 2);
// mouse.fullName()
// hubert.fullName();
// hubert.bork();
