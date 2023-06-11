var gameOver=false;
const makeBoard = () => {
  let el = document.getElementById("board");
  let num;
  for (let i = 10; i >= 1; i--) {
    let row = document.createElement("div");
    row.setAttribute("id", "row" + i);
    for (j = 1; j <= 10; j++) {
      num = 10 * (i - 1) + j;
      let col = document.createElement("span");
      col.setAttribute("id", "item"+num);
      let textN = document.createTextNode(num);
      col.appendChild(textN);
      row.appendChild(col);
    }
    el.appendChild(row);

  }
};
const updateTheBoard = (playerNum) => {
    //let el = document.getElementById("board");
    let num;
    //let playerScore=Object.keys(sessionStorage).filter((item)=>item.includes('playerScore'));
    let playerScore=sessionStorage.getItem('playerScore'+playerNum);
    //for(j=0;j<playerScore.length;j++){
        //console.log("item"+playerScore[j+1])
    //remvoe the element if it's there
    let oldEl=document.getElementById('player-position'+playerNum);
    if(oldEl){
        oldEl.remove();
    }
    let el=document.getElementById("item"+playerScore);

    if(el){
        //el.classList.add('activeGrid');
        let playerPosEl=document.createElement("span");
        playerPosEl.setAttribute('id','player-position'+playerNum);
        playerPosEl.style.color='red'
        playerPosEl.textContent=playerNum;
        el.appendChild(playerPosEl)
    }
    //}
    //console.log(Players);
    /*for (let i = 10; i >= 1; i--) {
      let row = document.createElement("div");
      row.setAttribute("id", "row" + i);
      for (j = 10; j >= 1; j--) {
        num = 10 * (i - 1) + j;
        let col = document.createElement("span");
        col.setAttribute("id", "item" + j);
        let textN = document.createTextNode(num);
        col.appendChild(textN);
        row.appendChild(col);
      }
      el.appendChild(row);
  
    }*/
  };

const showDiceVal=(diceValEl,randVal)=>{
    diceValEl.innerHTML=''
    let val=document.createTextNode(randVal)
    diceValEl.appendChild(val)
}
const rollDice=(playerNum)=>{
    /*let rollEl=document.getElementById('roll-'+playerNum)
    rollEl.setAttribute("disabled",true);*/
    let anim=document.getElementById('dice-anime');
    anim.style.display='block'

    let randVal=Math.round(Math.random()*6);
    while(randVal === 0){
        randVal=Math.round(Math.random()*6);
    }

    turn=sessionStorage.getItem('player-'+playerNum+'turns') || 0;
    turn=parseInt(turn)+1;
    if(turn )
    sessionStorage.setItem('player-'+playerNum+'turns',turn)

    pos=sessionStorage.getItem('playerScore'+playerNum) || 0;
    pos=parseInt(pos)+randVal;
    sessionStorage.setItem('playerScore'+playerNum,pos)
       

    let diceValEl=document.getElementById("dice-output");
    diceValEl.innerHTML=''
    setTimeout(
       ()=>{
        let val=document.createTextNode(randVal)
        diceValEl.appendChild(val)
        anim.style.display="none"
        //rollEl.removeAttribute("disabled")
       }
    ,200);
    let turnEl=document.getElementsByClassName('player-col-turn');
    turnEl[playerNum-1].innerHTML=sessionStorage.getItem('player-'+playerNum+'turns')

    let resEl=document.getElementsByClassName('player-col-res');
    resEl[playerNum-1].innerHTML=sessionStorage.getItem('playerScore'+playerNum)
    //move the players position
    document.getElementsByClassName('player-col-res');
    
    //check if the game is over
    for(let j=1;j<=sessionStorage.getItem('players');j++){
        if(sessionStorage.getItem('playerScore'+j) > 100){
            alert('Game Over!! winner is player '+j);
            document.getElementById('player-row-'+j).style.background='green'
            
        }
    }
    updateTheBoard(playerNum);
}
const createPlayers = () =>{
    let playersEl=document.getElementById("players");
    while(playersEl.firstChild){
        playersEl.removeChild(playersEl.firstChild)
    }
    let players=sessionStorage.getItem('players');
    try{
        while(playersEl.firstChild){
            playersEl.removeChild(firstChild)
        }
    }catch(err){
        console.log(err)
    }
    let p_row_header_el=document.createElement('tr');
    
    headers=['Name','Roll your Dice','Location','turn'];
    headers.forEach(element => {
        let p_header_el=document.createElement('th');
        p_header_el.innerText=element;
        p_row_header_el.appendChild(p_header_el)
    });
    playersEl.appendChild(p_row_header_el)
    
    for(let i=1;i<=players;i++){
        console.log('inside for')
        let p_row_el=document.createElement('tr');
        p_row_el.setAttribute("id","player-row-"+i);

        let p_col_el1=document.createElement('td');
        p_col_el1.setAttribute("class","player-col-name");
        let p_col_el2=document.createElement('td');
        p_col_el2.setAttribute("class","player-col-roll");
        let p_col_el3=document.createElement('td');
        p_col_el3.setAttribute("class","player-col-res");

        let p_col_el4=document.createElement('td');
        p_col_el4.setAttribute("class","player-col-turn");

        pname=document.createTextNode('Player '+i);
        p_col_el1.appendChild(pname)

        let roll_btn=document.createElement('button');
        roll_btn.innerHTML='Roll Dice'
        roll_btn.setAttribute("id",'roll-'+i)
        p_col_el2.appendChild(roll_btn);
        
        //add columns
        p_row_el.appendChild(p_col_el1);
        p_row_el.appendChild(p_col_el2);
        p_row_el.appendChild(p_col_el3);
        p_row_el.appendChild(p_col_el4);
        playersEl.appendChild(p_row_el);
    }
    
}
const selectNoOfPlayers=()=>{
    totalPlayers=window.prompt('select the number of players (3 max)');
    while(totalPlayers > 3){
            totalPlayers=window.prompt('# of players at max is 3, please select accordingly');
    }
    allKeys=Object.keys(sessionStorage)
    allKeys.forEach(
        (key) => sessionStorage.removeItem(key)
    )
    if(sessionStorage){
        sessionStorage.clear;
        sessionStorage.setItem('players',totalPlayers)
    }
    createPlayers();
}
const play=()=>{
    while(!gameOver){
        let turn=1;
        console.log('turn',turn)
        for(let j=0;j<=sessionStorage.getItem('players');j++){
            //disable roll buttons
            let ele=document.querySelectorAll("[id^='roll-']");
            for (let i = 1; i <= ele.length; i++) {
                if(turn !== i)
                    ele[i].setAttribute('disabled',true);
            }
        }
        
    }
}
const startGame=()=>{
    selectNoOfPlayers();
    //clear the data

    document.getElementById('players').style.display='block'
    let ele=document.querySelectorAll("[id^='roll-']");
    console.log('Starting the Game')
    //scroll to board
    document.getElementById('board').scrollIntoView();

    for (let i = 0; i <= ele.length; i++) {
        ele[i].addEventListener("click", function() {
            rollDice(i+1);
        });
    }
    console.log('addd listners')
}
makeBoard();
