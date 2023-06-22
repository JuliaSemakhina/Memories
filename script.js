const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 8;

playerLivesCount.textContent = playerLives;

// Generate the data

const getData = () => [
{ imgSrc: './images/beach.jpg', name: "beach"},
{ imgSrc: './images/heaven.jpg', name: "heaven"},
{ imgSrc: './images/kidrak.jpg', name: "kidrak"},
{ imgSrc: './images/mountain.jpg', name: "mountain"},
{ imgSrc: './images/road.jpg', name: "road"},
{ imgSrc: './images/sea.jpg', name: "sea"},
{ imgSrc: './images/seaside.jpg', name: "seaside"},
{ imgSrc: './images/stones.jpg', name: "stones"},
{ imgSrc: './images/beach.jpg', name: "beach"},
{ imgSrc: './images/heaven.jpg', name: "heaven"},
{ imgSrc: './images/kidrak.jpg', name: "kidrak"},
{ imgSrc: './images/mountain.jpg', name: "mountain"},
{ imgSrc: './images/road.jpg', name: "road"},
{ imgSrc: './images/sea.jpg', name: "sea"},
{ imgSrc: './images/seaside.jpg', name: "seaside"},
{ imgSrc: './images/stones.jpg', name: "stones"}
];

// const data = getData();

// Randomize
const randomize = () => {
  const cardData = getData();
  cardData.sort(()=> Math.random() - 0.5);
  return cardData;
}

// Card Generator Function  

const cardGenerator = () => {
  const cardData = randomize();

  // Generate the html
  cardData.forEach((item)=>{
  const card = document.createElement('div');
  const face = document.createElement('img');
  const back = document.createElement('div');

  card.classList = 'card';
  face.classList = 'face';
  back.classList = 'back';

  //Attach the info to the card
  face.src = item.imgSrc;
  card.setAttribute('name', item.name)

  //Attach the cards to the section
  section.appendChild(card);
  card.appendChild(face);
  card.appendChild(back);

  card.addEventListener('click', (e)=>{
    card.classList.toggle('toggleCard');
    checkCards(e);
  });
  });
}

//Check Cards

const checkCards = (e) =>{
  console.log(e);
  const clickedCard = e.target;
   clickedCard.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');
  const toggleCard = document.querySelectorAll('.toggleCard');
 
  //Logic
if(flippedCards.length === 2){
  if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
    console.log('match');
    flippedCards.forEach(card => {
      card.classList.remove('flipped');
      card.style.pointerEvents = 'none';
    });
  } else {
    console.log('wrong');
    flippedCards.forEach(card => {
      card.classList.remove('flipped');
      setTimeout(()=>card.classList.remove('toggleCard'), 1000)
      ;
    });
    playerLives--;
    playerLivesCount.textContent = playerLives;
    if (playerLives === 0){
      restart('Увы:(( Сыграй ещё раз!');
    }
  }
}
//Run a check to see if we won the game
if(toggleCard.length === 16){
  restart('Ура! Карты сошлись:)))');
}
};

//Restart
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item,index) => {
    cards[index].classList.remove('toggleCard');
    //Randomize
    setTimeout(()=>{
    cards[index].style.pointerEvents = 'all';
    faces[index].src = item.imgSrc;
    cards[index].setAttribute('name', item.name);
    section.style.pointerEvents = "all";
    }, 1000);
  });
  playerLives = 8;
  playerLivesCount.textContent = playerLives;
  setTimeout(()=> window.alert(text), 100);
}

cardGenerator();