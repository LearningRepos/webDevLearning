var randomNumber1 = Math.floor(Math.random() * 6 + 1);
var randomNumber2 = Math.floor(Math.random() * 6 + 1);

document.querySelector(".img1").setAttribute("src","dice" + randomNumber1 + ".png");
document.querySelector(".img2").setAttribute("src","dice" + randomNumber2 + ".png");

if(randomNumber1 > randomNumber2){
  document.querySelector("h1").textContent = "Player 1 Won!";
}
else if(randomNumber1 < randomNumber2){
  document.querySelector("h1").textContent = "Player 2 Won!";
}
else{
  document.querySelector("h1").textContent = "Draw!";
}
