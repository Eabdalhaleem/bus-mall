'use strict';

let rounds = 0;
let maxRounds = 25; //25 round
let roundEl = document.getElementById('Rounds');
let products = [];

function ProductImage(productName) {
     this.productName = productName.split('.')[0];
     this.pathImages = 'img/' + productName,
     this.click = 0,
     this.seen = 0,
     products.push(this);
}

let productsImage =['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg',
'chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg',
'shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];


for(let i=0 ; i < productsImage.length ; i++){
    new ProductImage (productsImage[i]);
}

 console.log(products)

// random from 0-18
function randomNumber(){
    return Math.floor(Math.random() * products.length);

}

let leftImgEl =document.getElementById('leftImg');
let middleImgEl = document.getElementById('middleImg');
let rightImgEl = document.getElementById('rightImg');

let leftImgIndex;
let middleImgIndex;
let rightImgIndex;

function renderImg(){

    leftImgIndex = randomNumber();
    middleImgIndex = randomNumber();
    rightImgIndex = randomNumber();

    while (leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex || middleImgIndex === leftImgIndex){
        leftImgIndex = randomNumber();
        rightImgIndex = randomNumber();
    
    }

    

    leftImgEl.setAttribute('src', products[leftImgIndex].pathImages);
    leftImgEl.setAttribute('title', products[leftImgIndex].pathImages);
    products[leftImgIndex].seen++;

    middleImgEl.setAttribute('src', products[middleImgIndex].pathImages);
    middleImgEl.setAttribute('title', products[middleImgIndex].pathImages);
    products[middleImgIndex].seen++;

    rightImgEl.setAttribute('src', products[rightImgIndex].pathImages);
    rightImgEl.setAttribute('title', products[rightImgIndex].pathImages);
    products[rightImgIndex].seen++;
    roundEl.textContent = rounds;
}
renderImg();

leftImgEl.addEventListener('click', handelClicks);
middleImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);

function handelClicks(event) {
    rounds++;
    if (rounds <= maxRounds) {
        if (event.target.id === 'leftImg')
         {
            products[leftImgIndex].click++;
        }
        else if(event.target.id === 'middleImg')
        {
            products[middleImgIndex].click++;
        } 
        else if (event.target.id === 'rightImg')
         {
            products[rightImgIndex].click++;
        }
        renderImg();
    } else {

        leftImgEl.removeEventListener('click', handelClicks);
        middleImgEl.removeEventListener('click', handelClicks);
        rightImgEl.removeEventListener('click', handelClicks);

        let viewEl = document.getElementById('viewResults');
        let buttonEl = document.createElement('button');
        viewEl.appendChild(buttonEl);
        buttonEl.textContent='View Results';
        buttonEl.addEventListener('click', viewR);

        function viewR(){

            let ulEl = document.getElementById('results');
            let liEl;
        for (let i = 0; i < products.length; i++) {
            liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${products[i].productName} had ${products[i].click} votes, and was seen ${products[i].seen} times.`
        }
            buttonEl.removeEventListener('click', viewR);
        }
        
        
    }
}