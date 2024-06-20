"use strict";
/**
 * TypeScript is a statically typed language, which means that you can catch errors and bugs before your code runs.
 * javascript is a dynamically typed language, which means that you can run code even if there are errors.
 * difference between static and dynamic typing is when the type is checked.
 * In static typing, the type is checked before the code runs.
 * In dynamic typing, the type is checked while the code runs.
 *
 */
let username = "Dave";
// data type
// This is a function that adds two numbers
const sum = (a, b) => {
    return a + b;
};
// boolean  true or false
let isCool = true;
// number
let age = 56;
// string
let eyeColor = "brown";
let favoriteQuote = `I'm not old, I'm only ${age}`;
// array
let stringArray = ["one", "two", "three"];
stringArray[0] = "1";
stringArray.push("four"); // adds to the end of the array
let guitars = ["Fender", "Gibson", 5250];
guitars[0] = 1990; //
guitars.unshift("Ibanez"); // adds to the beginning of the array
console.log(guitars);
let bands = [];
bands.push("Metallica");
let maxiedData = [1, "two", 3, "four", 5, true];
// tuple: is an array with a fixed number of elements whose types are known
let tuple;
tuple = ["hello", 10];
// tuple = [10, "hello"]; // error
console.log(tuple[0].substr(1)); // ello
// object
let user = {
    name: "John",
    age: 30,
};
console.log(user.name);
console.log(typeof user); // object
let person = {
    name: "Jane",
    age: 25,
    isAdult: true,
};
// literal type: is used to specify a value that must be exactly the value
let someString;
someString = "hello";
let person2 = {
    name: "Jane",
    age: 25,
    isAdult: true,
};
console.log(person2);
const greet = (person) => {
    var _a;
    return `Hello ${(_a = person.name) === null || _a === void 0 ? void 0 : _a.toUpperCase()}`;
};
console.log(greet(person));
// union
let pageName = "1";
pageName = 1;
// null and undefined
let errorMessage = null;
// any
let apiData = [123, "Dave", false];
// void
const warnUser = (message) => {
    console.log("This is my warning message: ", message);
};
console.log(warnUser("This is a warning"));
// enum
var Grade;
(function (Grade) {
    Grade[Grade["F"] = 0] = "F";
    Grade[Grade["D"] = 1] = "D";
    Grade[Grade["C"] = 2] = "C";
    Grade[Grade["B"] = 3] = "B";
    Grade[Grade["A"] = 4] = "A";
})(Grade || (Grade = {}));
console.log(Grade.C); // 2
console.log(Grade[2]); // C
/**
 * function: 格式是 (parameter: type, parameter: type) => return type
 * 2. function type: (a: number, b: number) => number
 * 3. type alias: type Add = (a: number, b: number) => number
 * 4. interface: interface Add = (a: number, b: number) => number
 * 5. optional parameter: (a: number, b?: number) => number
 * 6. default parameter: (a: number, b: number = 10) => number
 * 7. rest parameter: (...numbers: number[]) => number
 * 8. overloads:
 * 9. arrow function: const add = (a: number, b: number): number => { return a + b; }
 * 10. function expression: let addFunction: Add; addFunction = add;
 **/
const add = (a, b) => {
    return a + b;
};
console.log(add(10, 20));
// function type: is a type that describes a function signature
let combineValues;
combineValues = add;
console.log(combineValues(8, 8));
let addFunction;
addFunction = add;
console.log(addFunction(8, 8));
// function error throwing
const throwError = (age) => {
    if (age > 130) {
        console.log("Not a valid age!");
        throw new Error("Not a valid age!");
    }
    console.log(`Valid age: ${age}`);
    return true;
};
console.log(throwError(20));
let a = "hello";
let b = a; // b is of type Two: force the type
let c = b; // c is of type Three
let e = "World"; // e is of type string | number
const addOrContact = (a, b, c) => {
    if (c === "add") {
        return a + b;
    }
    return "" + a + b;
};
console.log(addOrContact(10, 20, "add"));
console.log(addOrContact(10, 20, "concat"));
// =========== classes =============================================================
class Coder {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        return `Hello, my name is ${this.name} and I'm ${this.age} years old`;
    }
    static getProp() {
        return Coder.prop;
    }
}
Coder.prop = "human";
let coder = new Coder("Dave", 30);
console.log(coder.greet());
console.log(Coder.getProp());
// inheritance
class WebDeveloper extends Coder {
    constructor(name, age, computer) {
        super(name, age);
        this.computer = computer;
        this.computer = computer;
    }
    code() {
        return `${this.name} is coding on a ${this.computer}`;
    }
}
let webDeveloper = new WebDeveloper("Dave", 30, "Macbook Pro");
console.log(webDeveloper.code());
class BackendDeveloper {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        return `Hello, my name is ${this.name} and I'm ${this.age} years old`;
    }
}
let backendDeveloper = new BackendDeveloper("Dave", 30);
console.log(backendDeveloper.greet());
const transaction = {
    Pizza: 20,
    Books: 50,
    Job: 100,
};
console.log(transaction.Pizza); // 20
console.log(transaction["Pizza"]); // 20
const transaction2 = {
    Pizza: 20,
    Books: 50,
    Job: 100,
};
console.log(transaction2.Job); // 100
console.log(transaction2["Job"]); // 100
for (let key in transaction2) {
    console.log(key); // Pizza, Books, Job
}
function getTransactionValue(key) {
    return transaction2[key];
}
console.log(getTransactionValue("Pizza")); // 20
const transaction3 = {
    Pizza: 20,
    Books: 50,
    Job: 100,
};
// =========== Generics =============================================================
const last = (arr) => {
    return arr[arr.length - 1];
};
console.log(last(["16", 2, 3])); // 3
const isTrue = (arg) => {
    if (Array.isArray(arg) && !arg.length) {
        return { arg, is: false };
    }
    if (isObj(arg && !Object.keys(arg).length)) {
        return { arg, is: false };
    }
    return { arg, is: !!arg };
};
const isObj = (obj) => {
    return typeof obj === "object" && obj !== null;
};
console.log(isTrue([])); // { arg: [], is: false }
console.log(isTrue(55)); // { arg: 55, is: true }
const updateTodo = (todo, fieldsToUpdate) => {
    return Object.assign(Object.assign({}, todo), fieldsToUpdate);
};
const todo1 = {
    title: "organize desk",
    description: "clear clutter",
};
const todo2 = updateTodo(todo1, {
    description: "throw out trash",
});
console.log(todo2);
const obj = { a: 5 }; // OK
// const obj2: Required<Props> = { a: 5 }; // Error: property 'b' is missing
const obj2 = { a: 5, b: "hello" }; // OK
const todo = {
    title: "Delete inactive users",
};
// todo.title = "Hello"; // Error: cannot reassign a readonly property
console.log(todo.title);
const nav = {
    home: { title: "Home" },
    about: { title: "About" },
    contact: { title: "Contact" },
};
console.log(nav);
const todoPick = {
    title: "Clean room",
    completed: false,
};
console.log(todoPick);
const todoOmit = {
    title: "Clean room",
    completed: false,
};
console.log(todoOmit);
