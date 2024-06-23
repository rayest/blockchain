const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", function () {
    // get random number between 0 - 3
    const randomNumber = getRandomNumber();
    console.log(randomNumber);
    
    // change the background color of the body
    document.body.style.backgroundColor = colors[randomNumber];

    // change the text content of the color
    color.textContent = colors[randomNumber];
});

function getRandomNumber() {
    return Math.floor(Math.random() * colors.length);
}


