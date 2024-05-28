"use strict";
const year = document.getElementById("year");
// or : const year = document.getElementById("year") as HTMLElement;
let thisYear;
thisYear = new Date().getFullYear().toString();
// or: const thisYear: string = new Date().getFullYear().toString();
if (year) {
    year.setAttribute("datetime", thisYear);
    year.textContent = thisYear;
    console.log(thisYear);
}
