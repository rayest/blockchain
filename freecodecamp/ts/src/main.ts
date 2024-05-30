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
const sum = (a: any, b: any) => {
  return a + b;
};

// boolean  true or false
let isCool: boolean = true;

// number
let age: number = 56;

// string
let eyeColor: string = "brown";
let favoriteQuote: string = `I'm not old, I'm only ${age}`;

// array
let stringArray: string[] = ["one", "two", "three"];
stringArray[0] = "1";
stringArray.push("four"); // adds to the end of the array

let guitars = ["Fender", "Gibson", 5250];
guitars[0] = 1990; //
guitars.unshift("Ibanez"); // adds to the beginning of the array
console.log(guitars);

let bands: string[] = [];
bands.push("Metallica");

let maxiedData = [1, "two", 3, "four", 5, true];

// tuple: is an array with a fixed number of elements whose types are known
let tuple: [string, number];
tuple = ["hello", 10];
// tuple = [10, "hello"]; // error
console.log(tuple[0].substr(1)); // ello

// object
let user: { name: string; age: number } = {
  name: "John",
  age: 30,
};
console.log(user.name);
console.log(typeof user); // object

// type alias
type Person = { name?: string; age: number; isAdult: boolean }; // ? optional: name is optional
let person: Person = {
  name: "Jane",
  age: 25,
  isAdult: true,
};

type stringOrNumber = string | number;
type userType = { name: string; age: number };
type personType = Person;

// literal type: is used to specify a value that must be exactly the value
let someString: "hello";
someString = "hello";

// interface
interface PersonInterface {
  name: string;
  age: number;
  isAdult: boolean;
}
let person2: PersonInterface = {
  name: "Jane",
  age: 25,
  isAdult: true,
};
console.log(person2);

const greet = (person: Person) => {
  return `Hello ${person.name?.toUpperCase()}`;
};
console.log(greet(person));

// union
let pageName: string | number = "1";
pageName = 1;

// null and undefined
let errorMessage: string | null = null;

// any
let apiData: any[] = [123, "Dave", false];

// void
const warnUser = (message: any): void => {
  console.log("This is my warning message: ", message);
};
console.log(warnUser("This is a warning"));

// enum
enum Grade {
  F = 0,
  D = 1,
  C = 2,
  B = 3,
  A = 4,
}
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
const add = (a: number, b: number): number => {
  return a + b;
};
console.log(add(10, 20));

// function type: is a type that describes a function signature
let combineValues: (a: number, b: number) => number;
combineValues = add;
console.log(combineValues(8, 8));

// or:
type Add = (a: number, b: number) => number;
let addFunction: Add;
addFunction = add;
console.log(addFunction(8, 8));

// function error throwing
const throwError = (age: number): boolean => {
  if (age > 130) {
    console.log("Not a valid age!");
    throw new Error("Not a valid age!");
  }
  console.log(`Valid age: ${age}`);
  return true;
};
console.log(throwError(20));

// type assert is used to tell the compiler that you know the type of a value
type One = string;
type Two = number | string;
type Three = "hello";

let a: One = "hello";
let b = a as Two; // b is of type Two: force the type
let c = b as Three; // c is of type Three

let e = <string | number>"World"; // e is of type string | number
const addOrContact = (
  a: number,
  b: number,
  c: "add" | "concat"
): number | string => {
  if (c === "add") {
    return a + b;
  }
  return "" + a + b;
};
console.log(addOrContact(10, 20, "add"));
console.log(addOrContact(10, 20, "concat"));

// =========== classes =============================================================
class Coder {
  static prop: string = "human";
  name: string;
  age: number;
  constructor(name: string, age: number) {
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

let coder = new Coder("Dave", 30);
console.log(coder.greet());
console.log(Coder.getProp());

// inheritance
class WebDeveloper extends Coder {
  constructor(name: string, age: number, public computer: string) {
    super(name, age);
    this.computer = computer;
  }

  code() {
    return `${this.name} is coding on a ${this.computer}`;
  }
}

let webDeveloper = new WebDeveloper("Dave", 30, "Macbook Pro");
console.log(webDeveloper.code());

// interface
interface DevInterface {
  name: string;
  age: number;
  greet(): string;
}

class BackendDeveloper implements DevInterface {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name} and I'm ${this.age} years old`;
  }
}

let backendDeveloper = new BackendDeveloper("Dave", 30);
console.log(backendDeveloper.greet());

/**
 * Index signatures: allow you to define the types that can be used to index objects and their corresponding return types.
 */
// =========== Index signatures =============================================================
interface TransactionObj {
  Pizza: number;
  Books: number;
  Job: number;
}

const transaction: TransactionObj = {
  Pizza: 20,
  Books: 50,
  Job: 100,
};

console.log(transaction.Pizza); // 20
console.log(transaction["Pizza"]); // 20

// index signature
interface Transaction {
  [key: string]: number;
}

const transaction2: Transaction = {
  Pizza: 20,
  Books: 50,
  Job: 100,
};

console.log(transaction2.Job); // 100
console.log(transaction2["Job"]); // 100

for (let key in transaction2) {
  console.log(key); // Pizza, Books, Job
}

// key of: get the keys of an object
type TransactionKey = keyof Transaction;
function getTransactionValue(key: TransactionKey) {
  return transaction2[key];
}
console.log(getTransactionValue("Pizza")); // 20

// record
type TransactionRecord = Record<string, number>;
const transaction3: TransactionRecord = {
  Pizza: 20,
  Books: 50,
  Job: 100,
};

// =========== Generics =============================================================
const last = <T>(arr: T[]): T => {
  return arr[arr.length - 1];
};

console.log(last(["16", 2, 3])); // 3

const isTrue = <T>(arg: T): { arg: T; is: boolean } => {
  if (Array.isArray(arg) && !arg.length) {
    return { arg, is: false };
  }
  if (isObj(arg && !Object.keys(arg as keyof T).length)) {
    return { arg, is: false };
  }
  return { arg, is: !!arg };
};

const isObj = (obj: any) => {
  return typeof obj === "object" && obj !== null;
};

console.log(isTrue([])); // { arg: [], is: false }
console.log(isTrue(55)); // { arg: 55, is: true }

// Utility Types =============================================================
// 1. Partial: used to make all properties of an object optional
interface Todo {
  title: string;
  description: string;
}

const updateTodo = (todo: Todo, fieldsToUpdate: Partial<Todo>) => {
  return { ...todo, ...fieldsToUpdate };
};

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

console.log(todo2);

// 2. Required: used to make all properties of an object required
interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 }; // OK
// const obj2: Required<Props> = { a: 5 }; // Error: property 'b' is missing
const obj2: Required<Props> = { a: 5, b: "hello" }; // OK

// 3. Readonly: used to make all properties of an object readonly
interface Todos {
  title: string;
}

const todo: Readonly<Todos> = {
  title: "Delete inactive users",
};

// todo.title = "Hello"; // Error: cannot reassign a readonly property
console.log(todo.title);

// 4. Record: used to create an object type whose property keys are of a union of string literal types
type PageInfo = {
  title: string;
};

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
  home: { title: "Home" },
  about: { title: "About" },
  contact: { title: "Contact" },
};

console.log(nav);

// 5. Pick: used to select properties from an object
interface TodoPick {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<TodoPick, "title" | "completed">; // { title: string; completed: boolean }

const todoPick: TodoPreview = {
  title: "Clean room",
  completed: false,
};

console.log(todoPick);

// 6. Omit: used to exclude properties from an object
interface TodoOmit {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreviewOmit = Omit<TodoOmit, "description">; // { title: string; completed: boolean }

const todoOmit: TodoPreviewOmit = {
  title: "Clean room",
  completed: false,
};

console.log(todoOmit);

// 7. Exclude: used to exclude types from a union
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
type T3 = Exclude<string | number | (() => void), string | number>; // () => void

// 8. Extract: used to extract types from a union
type T4 = Extract<"a" | "b" | "c", "a" | "c">; // "a" | "c"
type T5 = Extract<string | number | (() => void), Function>; // () => void
type T6 = Extract<string | number | (() => void), string | number>; // string | number

// 9. NonNullable: used to exclude null and undefined from a type
type T7 = NonNullable<string | number | undefined>; // string | number
type T8 = NonNullable<string[] | null | undefined>; // string[]
type T9 = NonNullable<string[] | null | undefined>; // string[]
type T10 = NonNullable<string | null | undefined>; // string

// 10. ReturnType: used to get the return type of a function
declare function f1(): { a: number; b: string };
type T11 = ReturnType<() => string>; // string
type T12 = ReturnType<(a: number) => string>; // string
type T13 = ReturnType<typeof f1>; // { a: number, b: string }

