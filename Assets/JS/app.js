document.addEventListener('DOMContentLoaded', () =>{
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');
  let doodlerLeftSpace = 50;
  let doodlerBottomSpace = 150;
  let isGameOver = false;
  let platformCount = 5;

  function createDoodler(){
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
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
      let newPlatform = new Platform;
    }
  }
  
  function start(){
    if (!isGameOver){
      createDoodler();
      createPlataforms();
    }
  }
  start();
})