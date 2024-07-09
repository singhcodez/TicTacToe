
//Lets Started 
let player1;
let player2;
let playerX=document.getElementById("playerX")
let player0=document.getElementById("player0")


document.getElementById("letsPlay").addEventListener("click",()=>{
   
   document.getElementById("startScreen").className="animateStart"
   player1=document.getElementById("player1").value || "Player 1";
   player2=document.getElementById("player2").value || "Player 2";    
   document.getElementById("player0").innerHTML="O: " + player1
   document.getElementById("playerX").innerHTML="X: " + player2
   twoPlayer(checkWinner)
})



const box=document.querySelectorAll(".box")
// store previous index of element on which plsyer tap
let prevValue;
// chrcking number of moves
let move=0;

function twoPlayer(checkWinner){


// writing 0 & X
box.forEach((elm,i)=>{
 function add(){
  // 1st move 
  if(!prevValue && prevValue!=0){
       elm.value="0";
    elm.disabled=true;
    playerX.className="player"
    player0.className=""
    move++;
  }
  else if(box[prevValue].value=="X"){
    elm.value="0";
    elm.disabled=true;
    playerX.className="player"
    player0.className=""
    move++;
   }
   else{
       elm.value="X";
       elm.disabled=true;
       player0.className="player"
    playerX.className=""
       move++;
   }
   // assigning index to prevValue
   prevValue=i;
   
   // if win 
   if(move>=3)
        checkWinner();
      
}
  
 elm.addEventListener("click",add)
 
})

}    



//after winning
function disableAll(){
 box.forEach((elm)=>{
  elm.disabled=true;
  //reset the game
   reset();
 })
}

function makeWinGreen(arr){
     arr.map((i)=>(box[i].style="background:green;color:yellow;"))
}

// match 
function draw(){
      document.getElementById("draw").style.display="block";
      disableAll();
      reset();
      
}
// reset 
function reset(){
 document.getElementById("reset").style.display="block";
  document.getElementById("reset").addEventListener("click",()=>{
   location.reload()
  })
}

// check who won the game
let flagDraw=true; 
let flagDrawComp;
const win=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function checkWinner(){
   
  
   win.map((winNum,i)=>{
       let flag_0=0;
       let flag_X=0;
       
       winNum.map((num,j)=>{
           if(box[num].value=="0")
                  flag_0+=1;
           else if(box[num].value=="X" || box[num].value=="x")
                 flag_X+=1;
           
           if(flag_0==3){
               document.getElementById("oWon").innerHTML=` ${player1} Wins `
               document.getElementById("oWon").style.display="block"
               disableAll()
               makeWinGreen(winNum)
               flagDraw=false;
               flagDrawComp=false;
               
          }
          else if(flag_X==3){
             document.getElementById("oWon").innerHTML=` ${player2} Wins `
              document.getElementById("xWon").style.display="block"
              disableAll()
              makeWinGreen(winNum);
              flagDraw=false;
              flagDrawComp=false;
              
          } 
          else if((move==9 && i==7 && j==2 && flagDraw==true) || (move==9 && flagDrawComp==true)){
                 draw();
                 console.log("if - ",j,i,move,flagDraw)
          }
          console.log(j,i,move,flagDraw)
       })

      
   })
}




// play with Computer 
document.getElementById("computer").addEventListener("click",playWithComputer)
function playWithComputer(){
 alert("Try to Win, if you can")
 flagDrawComp=true;
 player1="You"
 player2="Computer"
 playerX.className="player"
 player0.className=""
 document.getElementById("player0").innerHTML=player1;
 document.getElementById("playerX").innerHTML=player2;
 
  console.log("computer clicked")
   document.getElementById("startScreen").className="animateStart"
 
const moves=[0,1,2,3,4,5,6,7,8];
let randomIndex;
function generateRandom(){
 randomIndex=Math.floor(Math.random()*(moves.length-1))
let moveX=moves[randomIndex]
 writeX(moveX);
 console.log(randomIndex,moveX);
 move++;
}
generateRandom();

box.forEach((val,valIndex)=>{
   
   function add0(){

      if(box[prevValue].value=="X"){
            val.value="0";
            moves.splice(moves.indexOf(valIndex),1)
            prevValue=valIndex;
            move++;
            playerX.className="player"
            player0.className=""
            if(move>3)
                  checkWinner();
                 
           if( flagDrawComp && moves.length){     
                generateRandom();
               
           }
      }
      
      
   }
   
   val.addEventListener("click",add0)
})


function writeX(i){
    prevValue=i;
    setTimeout(()=>{
    
     box[i].value="X"
     box[i].disabled=true;
     player0.className="player"
     playerX.className=""
     if(move>3)
        checkWinner();
    }
    ,1000 )
    moves.splice(moves.indexOf(i),1)
    
}

}