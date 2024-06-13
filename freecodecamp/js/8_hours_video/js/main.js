import { playGuitar } from "./guitar.js";
import * as Guitars from "./guitar.js";
import User from "./user.js";
import { posts } from "./posts.js";

class Pizza {
  #source = "North"; // 这个#也可以表示为私有的属性

  constructor(pizzaSize) {
    this._size = pizzaSize;
    this._crust = "original";
  }

  getCrust() {
    return this._crust;
  }

  setCrust(pizzaCrust) {
    this._crust = pizzaCrust;
  }
}

class SpecialtyPizza extends Pizza {
  constructor(pizzaType) {
    super(pizzaSize);
    this._type = pizzaType;
  }
}

function pizzaFactory(pizzaSize) {
  const crust = "original";
  const size = pizzaSize;
  return {
    bake: () => console.log(`Baking a ${size} ${crust} crust pizza`),
  };
}

const myPizza = pizzaFactory("small");
myPizza.bake();

// error

("use strict");
const makeError = () => {
  try {
  } catch (error) {}
};

//============================================================================= DOM - Document Object Model ============
const view1 = document.getElementById("view1"); // get element
view1.style.display = "none"; // change style

const view2 = document.querySelector("#view2");
view2.style.display = "flex";

const views = document.getElementsByClassName("view"); //

const sameView = document.querySelectorAll(".view"); //
const divs = view1.querySelectorAll("div"); //
const sameDivs = view1.getElementsByTagName("div");

// ============================================================================ Event listener ===========================
const view = document.querySelector("#view2");
console.log(view);
const div = view.querySelector("div");
console.log(div);
const h2 = div.querySelector("h2");
console.log(h2);
const doSomething = () => {
  alert("doing something");
};

h2.addEventListener("click", doSomething, false);

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    console.log("readyState: complete");
    initApp();
  }
});

const initApp = () => {
  console.log("do something");
};

// ================================================================== web storage API ===========
// global variable: window
sessionStorage.setItem("name", "lee"); // 当前浏览器窗口

localStorage.setItem("age", "10"); // 数据也会一直存在

// ================================================================== Module ===========
console.log(playGuitar());
console.log(Guitars.shredding());
console.log(Guitars.plucking());

const me = new User("lee");
me.sayHi();

// ================================================================== Higher order functions ===========
posts.forEach((post) => {
  console.log(post.title);
});

console.clear();

posts
  .filter((post) => post.userId === 2)
  .forEach((post) => {
    console.log(post);
  });

// ================================================================== Promise / fetch / async / await ===========

// callback
function firstFunction(parameters, callback) {
  callback();
}

const fetchData = (callback) => {
  setTimeout(() => {
    callback("done");
  }, 2000);
};

const callback = (data) => {
  console.log(data);
};

fetchData(callback);

// Promise: 3 states - pending, fulfilled, rejected
const myPromise = () => {
  return new Promise((resolve, reject) => {
    const error = false;
    if (!error) {
      resolve("yes. resolved the promise");
    } else {
      reject("error, rejected the promise");
    }
  });
};

myPromise()
  .then((data) => {
    console.log(data);
    return data + 1;
  })
  .then((data) => {
    console.log(data);
    return data + 100;
  });

// fetch
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json()) // response.json() returns a promise
  .then((data) => {
    // data is the resolved value of the promise
    console.log(data);
  });

// async / await
const myUsers = {
  userList: [],
};

const myCoolFunction = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  console.log(data);
  myUsers.userList = data;
  return data;
};

myCoolFunction();

console.log(myUsers.userList); // empty array because the function is still running, it's asynchronous

