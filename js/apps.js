'use strict';

let rounds = 0;
let maxRounds = 25; //25 round
let roundEl = document.getElementById('Rounds');
let products = [];
let productsImageNames = [];
let productClick = [];
let productSeen = [];

function ProductImage(productName) {
    this.productName = productName.split('.')[0];
    this.pathImages = 'img/' + productName,
        this.click = 0,
        this.seen = 0,
        products.push(this);
    productsImageNames.push(this.productName);
}

let productsImage = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',
    'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg',
    'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];


for (let i = 0; i < productsImage.length; i++) {
    new ProductImage(productsImage[i]);
}

console.log(products)

// random from 0-18
function randomNumber() {
    return Math.floor(Math.random() * products.length);

}

let leftImgEl = document.getElementById('leftImg');
let middleImgEl = document.getElementById('middleImg');
let rightImgEl = document.getElementById('rightImg');

let leftImgIndex;
let middleImgIndex;
let rightImgIndex;

let finalImages =[];

function renderImg() {

    leftImgIndex = randomNumber();
    middleImgIndex = randomNumber();
    rightImgIndex = randomNumber();

    while (leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex || middleImgIndex === leftImgIndex ||
        finalImages.includes(leftImgIndex)|| finalImages.includes(rightImgIndex)|| finalImages.includes(middleImgIndex)) {
        leftImgIndex = randomNumber();
        middleImgIndex = randomNumber();
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

    finalImages[0]=leftImgIndex;
    finalImages[1]=middleImgIndex;
    finalImages[2]=rightImgIndex;



}
renderImg();

leftImgEl.addEventListener('click', handelClicks);
middleImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);

function handelClicks(event) {
    rounds++;
    if (rounds <= maxRounds) {
        if (event.target.id === 'leftImg') {
            products[leftImgIndex].click++;
        }
        else if (event.target.id === 'middleImg') {
            products[middleImgIndex].click++;
        }
        else if (event.target.id === 'rightImg') {
            products[rightImgIndex].click++;
        }
        renderImg();
    } else {

        leftImgEl.removeEventListener('click', handelClicks);
        middleImgEl.removeEventListener('click', handelClicks);
        rightImgEl.removeEventListener('click', handelClicks);

        settingItems();

        let viewEl = document.getElementById('viewResults');
        let buttonEl = document.createElement('button');
        viewEl.appendChild(buttonEl);
        buttonEl.textContent = 'View Results';
        buttonEl.addEventListener('click', viewR);

        function viewR() {

            let ulEl = document.getElementById('results');
            let liEl;
            for (let i = 0; i < products.length; i++) {
                liEl = document.createElement('li');
                ulEl.appendChild(liEl);
                liEl.textContent = `${products[i].productName} had ${products[i].click} votes, and was seen ${products[i].seen} times. `
                productClick.push(products[i].click);
                productSeen.push(products[i].seen);
                
            }
            buttonEl.removeEventListener('click', viewR);
            chartRender();

        }
       


    }
}

// create a chart on js
function chartRender(){
var ctx = document.getElementById('myChart').getContext('2d');

Chart.defaults.font.size = 16;
Chart.defaults.borderColor = 'white';
Chart.defaults.backgroundColor = 'white';
Chart.defaults.color = 'black';

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productsImageNames,
        datasets: [{
            label: '# of click',
            data: productClick,
            backgroundColor: [
                'rgba(133, 228, 133, 0.801)',
                
            ],
            borderColor: [
                'rgba(133, 228, 133, 0.801)',
               
            ],
            borderWidth: 1,

            
        },{
            label: '# of seen',
            data: productSeen,
            backgroundColor: [
                'rgba(109, 202, 209, 0.938)',
                
            ],
            borderColor: [
                'rgba(109, 202, 209, 0.938)',
               
            ],
            borderWidth: 1,

            
        }],
        
           

      },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}


  //local storge
    
  function settingItems(){
    let data = JSON.stringify(products);
    console.log(data);
    localStorage.setItem('products',data);

    }

    function gettingItems() {
        let stringObj = localStorage.getItem('productsN ');
        let normalObj = JSON.parse(stringObj);
        if (normalObj !== null) {
            products  = normalObj;
        }
    }
    gettingItems();

