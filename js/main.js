const makeBoard = () => {
  let el = document.getElementById("board");
  let num;
  for (let i = 1; i <= 10; i++) {
    let row = document.createElement("div");
    row.setAttribute("id", "row" + i);
    for (j = 1; j <= 10; j++) {
      num = 10 * (i - 1) + j;
      let col = document.createElement("span");
      col.setAttribute("id", "item" + j);
      let textN = document.createTextNode(num);
      col.appendChild(textN);
      row.appendChild(col);
    }
    el.appendChild(row);
  }
};

const showDiceVal=(diceValEl,randVal)=>{
    diceValEl.innerHTML=''
    let val=document.createTextNode(randVal)
    diceValEl.appendChild(val)
}
const rollDice=(playerNum)=>{
    /*let rollEl=document.getElementById('roll-'+playerNum)
    rollEl.setAttribute("disabled",true);
    let anim=document.getElementById('dice-anime');
    anim.style.display='block'*/

    let randVal=Math.round(Math.random()*6);
    while(randVal === 0){
        randVal=Math.round(Math.random()*6);
    }

    let diceValEl=document.getElementById("dice-output");
    diceValEl.innerHTML=''
    setTimeout(
       ()=>{
        let val=document.createTextNode(randVal)
        diceValEl.appendChild(val)
        //anim.style.display="none"
        //rollEl.removeAttribute("disabled")
       }
    ,1000);
    console.log(randVal)
}
const createPlayers = () =>{
    let playersEl=document.getElementById("players");
    let players=localStorage.getItem('players');
    try{
        while(playersEl.firstChild){
            playersEl.removeChild(firstChild)
        }
    }catch(err){
        console.log(err)
    }
    let p_row_header_el=document.createElement('tr');
    
    headers=['Name','Roll your Dice','iteration #'];
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
        p_col_el1.setAttribute("id","player-col-name");
        let p_col_el2=document.createElement('td');
        p_col_el2.setAttribute("id","player-col-name");

        pname=document.createTextNode('Player '+i);
        p_col_el1.appendChild(pname)

        let roll_btn=document.createElement('button');
        roll_btn.innerHTML='Roll Dice'
        roll_btn.setAttribute("id",'roll-'+i)
        p_col_el2.appendChild(roll_btn);
        
        //add columns
        p_row_el.appendChild(p_col_el1);
        p_row_el.appendChild(p_col_el2);
        playersEl.appendChild(p_row_el);
    }
    
}
const selectNoOfPlayers=()=>{
    totalPlayers=window.prompt('select the number of players (3 max)');
    while(totalPlayers > 3){
            totalPlayers=window.prompt('# of players at max is 3, please select accordingly');
    }
    
    if(localStorage){
        localStorage.clear;
        localStorage.setItem('players',totalPlayers)
    }
    createPlayers();
}
const startGame=()=>{
    let ele=document.querySelectorAll("[id^='roll-']");
    console.log('Starting the Game')
    for (let i = 0; i < ele.length; i++) {
        ele[i].addEventListener("click", function() {
            rollDice(i);
        });
    }
    console.log('addd listners')
}
makeBoard();
