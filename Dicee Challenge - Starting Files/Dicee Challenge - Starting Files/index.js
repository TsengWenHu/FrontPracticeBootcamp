var randomNumber1 = Math.floor(Math.random()*6)+1;
var randomNumber2 = Math.floor(Math.random()*6)+1;

var ramdomImage1 = "images/dice"+randomNumber1+".png"
var ramdomImage2 = "images/dice"+randomNumber2+".png"

var image1 = document.querySelectorAll("img")[0];
var image2 = document.querySelectorAll("img")[1];

image1.setAttribute("src", ramdomImage1);
image2.setAttribute("src", ramdomImage2);

if (randomNumber1 > randomNumber2){
    document.querySelectorAll('h1')[0].innerHTML = "Player 1 WIN !"
}else if (randomNumber1 < randomNumber2){
    document.querySelectorAll('h1')[0].innerHTML = "Player 2 WIN !"
}else{
    document.querySelectorAll('h1')[0].innerHTML = "DRAW !"
};