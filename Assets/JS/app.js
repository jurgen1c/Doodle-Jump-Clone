document.addEventListener('DOMContentLoaded', () =>{
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');
  let doodlerLeftSpace = 50;
  let doodlerBottomSpace = 150;
  let isGameOver = false;
  let platformCount = 5;
  let platforms = [];
  let upTimerId;
  let downTimerId;
  let isJumping = false;
  let startPoint = 150;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId;
  let rightTimerId;

  function createDoodler(){
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = doodlerLeftSpace + 'px';
    doodler.style.left = doodlerBottomSpace + 'px';
  }

  class Platform{
    constructor(nPB){
      this.bottom = nPB;
      this.left = Math.random() * 315;
      this.visual = document.createElement('div');

      const visual = this.visual;
      visual.classList.add('platform');
      visual.style.left = this.left + 'px';
      visual.style.bottom = this.bottom +'px';
      grid.appendChild(visual);
    }
  }

  function createPlatforms(){
    for (let i = 0; i < platformCount; i++){
      let platformGap = 600 / platformCount;
      let newPlatBottom = 100 + i * platformGap;
      let newPlatform = new Platform(newPlatBottom);
      platforms.push(newPlatform);
    }
  }

  function movePlatforms(){
    if (doodlerBottomSpace > 200){
      platforms.forEach(platform => {
        platform.bottom -= 4;
        let visual = platform.visual;
        visual.style.bottom = platform.bottom +'px'
      })
    }
  }

  function jump(){
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(function (){
      doodlerBottomSpace += 20;
      doodler.style.bottom = doodlerBottomSpace + 'px';
      if ( doodlerBottomSpace > startPoint + 200){
        fall();
      }
    }, 30)
  }

  function fall(){
    clearInterval(upTimerId);
    isJumping = false;
    downTimerId = setInterval(function () {
      doodlerBottomSpace -= 5;
      doodler.style.bottom = doodlerBottomSpace + 'px';
      if (doodlerBottomSpace <= 0){
        gameOver();
      }
      platforms.forEach(platform => {
        if (
          (doodlerBottomSpace >= platform.bottom) &&
          (doodlerBottomSpace <= platform.bottom + 15) &&
          ((doodlerLeftSpace + 60) >= platform.left) &&
          (doodlerLeftSpace <= platform.left + 85) && 
          !isJumping
        ){
          startPoint = doodlerBottomSpace;
          jump();
        }
      })
    })
  }

  function gameOver(){
    console.log('game over');
    isGameOver = true;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
  }

  function control(){
    if (e.key === 'ArrowLeft'){
      moveLeft();
    }else if (e.key === 'ArrowRight'){
      moveRight();
    }
  }

  function moveLeft(){
    if (isGoingRight){
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerId = setInterval(function (){
      if (doodlerLeftSpace >= 0){
        doodlerLeftSpace -= 5;
        doodler.style.left = doodlerLeftSpace + 'px';
      }
    }, 30)
  }

  function moveRight(){
    if (isGoingLeft){
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(function (){
      if (doodlerLeftSpace <= 240){

      }
    },30)
  }

  function start(){
    if (!isGameOver){
      createPlatforms();
      createDoodler();
      setInterval(movePlatforms, 30);
      jump();
    }
  }
  start();
})