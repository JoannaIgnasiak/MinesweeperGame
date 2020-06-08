let newGameButton = document.getElementById('newGameButton');
var board = document.getElementById("board");
var give_up_button=document.getElementById("give_up");
var easy_button=document.getElementById("easy");
var medium_button=document.getElementById("medium");
var hard_button=document.getElementById("hard");
var notStandard_button=document.getElementById("notStandard");
var game_space=document.getElementById("game_space");
var numCol_input=document.getElementById("numCol");
var numRows_input=document.getElementById("numRows");
var numBomb_input=document.getElementById("numBomb");
var numCol_label=document.getElementById("numCol_label");
var numRows_label=document.getElementById("numRows_label");
var numBomb_label=document.getElementById("numBomb_label");
var numBombView=document.getElementById("numBombView");
var clockView=document.getElementById('clock');
var gameHeadline=document.getElementById('gameHeadline');



var table = [];  
var numRows;
var numCol;
var numBomb=0;
var rowIndex;
var colIndex;
var id=0;
var gameOver=true;
var gameWon=false;
var numBombLeft;
var numBombTotal;
var counter_click=0;
var table_click=[];
var numFlag=0; 
var flagChecked;
var countUpTime=0;
var firtsClick=false;
var timeStart=false;


//SET UP 
setInterval(showTime, 1000);
give_up_button.style.display='none';
easy_button.style.display='inline';
medium_button.style.display='inline';
hard_button.style.display='inline';
notStandard_button.style.display='inline';
newGameButton.style.display='none';
numCol_input.style.display='none';
numCol_label.style.display='none';
numRows_input.style.display='none';
numRows_label.style.display='none';
numBomb_input.style.display='none';
numBomb_label.style.display='none';
gameHeadline.style.display='none';
game_space.style.display='none';



document.addEventListener("keyup", function(event) {
     if ((event.keyCode === 187 || event.keyCode === 13) && (newGameButton.style.display=="block")) {
        numRows= numRows_input.value;
        numCol= numCol_input.value;
        numBomb=numBomb_input.value;
    
        checkParameters();
    }
});


give_up_button.addEventListener('click', function() {
    gameOver=true;
    give_up_button.style.display='none';
    changeGameStatus();
    
});

easy_button.addEventListener('click', function() {
    easy_button.style.display='none';
    medium_button.style.display='none';
    hard_button.style.display='none';
    notStandard_button.style.display='none';
    numCol=8;
    numRows=8;
    numBomb=10;
    gameOver=false;
    start();
});


medium_button.addEventListener('click', function() {
    easy_button.style.display='none';
    medium_button.style.display='none';
    hard_button.style.display='none';
    notStandard_button.style.display='none';
    numCol=16;
    numRows=16;
    numBomb=40;
    gameOver=false;
    start();
});

hard_button.addEventListener('click', function() {
    easy_button.style.display='none';
    medium_button.style.display='none';
    hard_button.style.display='none';
    notStandard_button.style.display='none';
    numCol=30;
    numRows=16;
    numBomb=99;
    gameOver=false;
    start();
});

notStandard_button.addEventListener('click', function() {

    easy_button.style.display='none';
    medium_button.style.display='none';
    hard_button.style.display='none';
    notStandard_button.style.display='none';
    numCol_input.style.display='inline';
    numCol_label.style.display='inline ';
    numRows_input.style.display='inline';
    numRows_label.style.display='inline';
    numBomb_input.style.display='inline';
    numBomb_label.style.display='inline';
    newGameButton.style.display='block';
    game_space.style.display='none';
    numRows_input.value="";
    numCol_input.value="";
    numBomb_input.value="";
    
    
    });

newGameButton.addEventListener('click', function() {
    
    numRows= numRows_input.value;
    numCol= numCol_input.value;
    numBomb=numBomb_input.value;

    checkParameters();
});



function neighbor(y, x){ 
    //for each bomb function informs neighbours about bomb by setting ++ value

if ((x>0) && (table[y][x-1]!=-1)) {   
        table[y][x-1]++;}

if ((x<numCol) && (table[y][x+1]!=-1)) {   
        table[y][x+1]++;}

if ((y>0) && (table[y-1][x]!=-1)) {   
        table[y-1][x]++;}

if ((y<numRows) && (table[y+1][x]!=-1)) {   
        table[y+1][x]++;}


if ((x>0) && (y>0) && (table[y-1][x-1]!=-1)) {   
        table[y-1][x-1]++;}

if ((x<numCol) && (y>0) && (table[y-1][x+1]!=-1)) {   
            table[y-1][x+1]++;}

if ((x>0) && (y<numRows) && (table[y+1][x-1]!=-1)) {   
            table[y+1][x-1]++;}

if ((x<numCol) && (y<numRows) && (table[y+1][x+1]!=-1)) {   
            table[y+1][x+1]++;}
}

function prepare_table(){
//putting bombs inside table and setting neighbour values
numBombTotal=numBomb;
numBombLeft=numBomb;

        while(numBomb>0) {
            var y = Math.round(Math.random() * (numRows-1));
            var x = Math.round(Math.random() * (numCol-1));
            if (table[y][x]!=-1){
                table[y][x]=-1;
                numBomb--;
                neighbor(y,x);
            }
        }
}

function changeGameStatus(){

    timeStart=false;
    gameOver=true;

    console.log("koniec gry: " + gameOver);
    for (var x=0; x<=(numCol*numRows)-1 ; x++){
       if (gameWon==false){
        if (document.getElementById("eleme" + x).classList =="bomb" || document.getElementById("eleme" + x).classList =="bomb flaga"){
            document.getElementById("eleme" + x).classList.add("odsloniety");
        }
        }
        if (gameWon==true){
            if (document.getElementById("eleme" + x).classList =="bomb" || document.getElementById("eleme" + x).classList =="bomb flaga"){
                document.getElementById("eleme" + x).classList.remove("flaga");
                document.getElementById("eleme" + x).classList.add("won");
            }
        }
    }
    easy_button.style.display='inline';
    medium_button.style.display='inline';
    hard_button.style.display='inline';
    notStandard_button.style.display='inline';
    give_up_button.style.display='none';
}

function show_margin(){

   for ( y=1 ; y<=counter_click ; y++){
       x=table_click[y];
       if(document.getElementById("eleme" + x).classList =="empty odsloniety"){

            
                if((x%numCol)!=(numCol-1)){ 
                    licznik1=x+1;
                    if( document.getElementById("eleme" + licznik1).classList !="odsloniety")
                    { 
                    document.getElementById("eleme" + licznik1).classList.add("odsloniety"); 
                    }
                }

                if(((x)%(numCol))!=0){ 
                licznik2=x-1;
                    if(document.getElementById("eleme" + licznik2).classList !="odsloniety"){
                    document.getElementById("eleme" + licznik2).classList.add("odsloniety");
                }
                }

                if((x-numCol)>0){
                licznik3=x-parseInt(numCol); 
                    if(document.getElementById("eleme" + licznik3).classList !="odsloniety"){
                    document.getElementById("eleme" + licznik3).classList.add("odsloniety");
                    }
                }

                if(x<((numRows-1)*numCol)){ 
                licznik4=x+parseInt(numCol); 
                    if(document.getElementById("eleme" + licznik4).classList !="odsloniety"){
                    document.getElementById("eleme" + licznik4).classList.add("odsloniety");
                    }
                }

                if ((((x)%(numCol))!=0) && ((x-numCol)>0) ){
                    licznik5=x-parseInt(numCol)-1 ;
                    if(document.getElementById("eleme" + licznik5).classList !="odsloniety"){
                    document.getElementById("eleme" + licznik5).classList.add("odsloniety");
                    }
                }

                if(((x%numCol)!=(numCol-1)) && ((x-numCol)>0) ){
                    licznik6=x-parseInt(numCol)+1; 
                    if(document.getElementById("eleme" + licznik6).classList !="odsloniety"){
                    document.getElementById("eleme" + licznik6).classList.add("odsloniety");
                    }
                }

                if((x<((numRows-1)*numCol)) && (((x)%(numCol))!=0)){
                    licznik7=x+parseInt(numCol)-1; 
                    if(document.getElementById("eleme" + licznik7).classList !="odsloniety"){
                        document.getElementById("eleme" + licznik7).classList.add("odsloniety");}
                    }
                
                if((x<((numRows-1)*numCol)) && ((x%numCol)!=(numCol-1)) ){
                licznik8=x+parseInt(numCol)+1; 
                    if(document.getElementById("eleme" + licznik8) !="odsloniety"){
                    document.getElementById("eleme" + licznik8).classList.add("odsloniety");}
                }
       }
     }
}

function show_space(i){
//when click on button function uncovers empty neighbours by itself

   if(gameOver==false){

   document.getElementById("eleme" + i).classList.add("odsloniety");

   if(document.getElementById("eleme" + i).classList=="bomb odsloniety" ){
    changeGameStatus();
    
    }

    if((i%numCol)!=(numCol-1)){
            var counter_right=i+1;
            if(document.getElementById("eleme" + counter_right).classList=="empty" ){
                show_space(counter_right);    
             }
    }
    
   
     if (((i)%(numCol))!=0){
            var counter_left=i-1;
            if(document.getElementById("eleme" + counter_left).classList=="empty"){
            show_space(counter_left);
            } 
    }
    
     if ((i-numCol)>0){
            var counter_up=i-parseInt(numCol);
            if(document.getElementById("eleme" + counter_up).classList=="empty"){
                show_space(counter_up);
            }
    }


     if (i<((numRows-1)*numCol)){
            
            var counter_down=i+parseInt(numCol);

            if(document.getElementById("eleme" + counter_down).classList=="empty"){
            show_space(counter_down);  
            }  
    }
    counter_click++;
    table_click[counter_click]=i;
   }
     

}

function checkIfWin() {
        var flagChecked=0;
        var counterPoles=0;
        var poles=numCol*numRows;
        for (var x=0; x<=(poles)-1 ; x++){
            //CASE 1 - flags in wrong place = game lost
            if ((document.getElementById("eleme" + x).classList =="one flaga")||
                (document.getElementById("eleme" + x).classList =="two flaga")||
                (document.getElementById("eleme" + x).classList =="three flaga")||
                (document.getElementById("eleme" + x).classList =="four flaga")||
                (document.getElementById("eleme" + x).classList =="five flaga")||
                (document.getElementById("eleme" + x).classList =="six flaga")||
                (document.getElementById("eleme" + x).classList =="seven flaga")||
                (document.getElementById("eleme" + x).classList =="eight flaga")||
                (document.getElementById("eleme" + x).classList =="empty flaga")){
                gameWon=false;
                changeGameStatus();
            }
            //CASE 2 - left poles are only uncovered poles bobmbs = game won 
            if ((document.getElementById("eleme" + x).classList =="one odsloniety")||
                (document.getElementById("eleme" + x).classList =="two odsloniety")||
                (document.getElementById("eleme" + x).classList =="three odsloniety")||
                (document.getElementById("eleme" + x).classList =="four odsloniety")||
                (document.getElementById("eleme" + x).classList =="five odsloniety")||
                (document.getElementById("eleme" + x).classList =="six odsloniety")||
                (document.getElementById("eleme" + x).classList =="seven odsloniety")||
                (document.getElementById("eleme" + x).classList =="eight odsloniety")||
                (document.getElementById("eleme" + x).classList =="empty odsloniety")){
                counterPoles++;

                if (poles-counterPoles==numBombTotal){
                    gameWon=true;
                    changeGameStatus();
                }
            
            }
            //CASE 3 - number of flags equals number of bombs and they are in right places 
            if (document.getElementById("eleme" + x).classList =="bomb flaga"){
                flagChecked++;
                console.log("flagi oznaczone: " + flagChecked + "liczba bomb: "+ numBombTotal);
                if (flagChecked==numBombTotal){
                    gameWon=true;
                    changeGameStatus();
                }
            }
        }
}



function showTime() {

    if (gameOver==false && firtsClick==true){
        clockView.value = countUpTime;
    }

    if (timeStart==true){
        clockView.value = countUpTime;
        countUpTime++;
    }
    if (gameOver==true){
        countUpTime=countUpTime;
        clockView.value = countUpTime;
    }
}

function leweKlikniecie(i){
    return function(){
        
    if (firtsClick==true){
          timeStart=true;
          firtsClick=false;
    }
     if (document.getElementById("eleme" + i).classList.contains("flaga")==false){
            counter_click=0;
            table_click=[];
            show_space(i);
            show_margin();
            checkIfWin();
        }
      }
 }

function checkIfEnd (){
    if ((numBombTotal-numFlag)==0){
        console.log(numBombTotal-numFlag);
           checkIfWin();
        } 
}

 function putFlag(i){

    var element = document.getElementById("eleme" + i);

     if (element.classList.contains("odsloniety")){
        return;
    }

    if (element.classList.contains("flaga")==false){
        element.classList.add("flaga");
        numFlag++;
        console.log("ilość flag" + numFlag);
    }
    else if (element.classList.contains("flaga")==true){
        element.classList.remove("flaga");
        numFlag--;
    }
  

   numBombLeft=numBombTotal-numFlag; 
    numBombView.value= numBombLeft; 
    // console.log(numBombView.value);

    
    checkIfEnd();
    
    console.log("prawy klik");
}
 
function praweKlikniecie(i){
    return function(){
        var element = document.getElementById("eleme" + i);
        putFlag(i);
      }
 
}

function doubleclick(i){
    return function(){
        if (document.getElementById("eleme" + i).classList.contains("odsloniety")==true){
        var count1=i+1;
        var count2, count, count4, count5, count6, count7, cout8;
        if (document.getElementById("eleme" + count1).classList.contains("odsloniety")==false){}
        }
    }
}

function dodajListenersy(){
    
    funkcje = {};
    for (var i = 0; i <= id; i++) {
      var element = document.getElementById("eleme" + i);

      funkcje[i] = [leweKlikniecie(i), praweKlikniecie(i), doubleclick(i)];
      element.addEventListener('click', funkcje[i][0], false);
      element.addEventListener('contextmenu', funkcje[i][1], false);
      element.addEventListener('dblclick', funkcje[i][2], false);
      

    }
  }

function show() {

    var text = "<table>";
    for (rowIndex=0; rowIndex<numRows; rowIndex++) {
        text+="<tr>";
        for (colIndex=0; colIndex<numCol; colIndex++) {


        if (table[rowIndex][colIndex]==-1){
            
            text += "<td><div class='bomb' id=eleme"+ id + "></div></td>";
            id++;
        }
        else if (table[rowIndex][colIndex]==1){
            text += "<td><div class='one' id=eleme"+ id + "></div></td>";
            id++;
        }
        else if (table[rowIndex][colIndex]==2){
            text += "<td><div class='two' id=eleme"+ id + "></div></td>";
            id++;
        }
        else if (table[rowIndex][colIndex]==3){
            text += "<td><div class='three' id=eleme"+ id + "></div></td>";
            id++;
        }
        else if (table[rowIndex][colIndex]==4){
            text += "<td><div class='four' id=eleme"+ id + "></div></td>";
            id++;
        }
        else if (table[rowIndex][colIndex]==5){
            text += "<td><div class='five' id=eleme"+ id + "></div></td>";
            id++;
        }
        else if (table[rowIndex][colIndex]==6){
            text += "<td><div class='six' id=eleme"+ id + "></div></td>";
            id++;
        }
        else if (table[rowIndex][colIndex]==7){
            text += "<td><div class='seven' id=eleme"+ id + "></div></td>";
            id++;
        }
        else if (table[rowIndex][colIndex]==8){
            text += "<td><div class='eight' id=eleme"+ id + "></div></td>";
            id++;
        }
        else {
            text += "<td><div class='empty' id=eleme"+ id + "></div></td>";
            id++;
        }
      }
      text += "</tr>"; 
    }
    text+="</table>"
    
    
    id--;
    board.innerHTML=text;
    dodajListenersy();
 
}

function checkParameters(){
    var bomb_index=(numCol*numRows)/3;

    
    numCol = parseInt(numCol, 10);
    numRows = parseInt(numRows, 10);
    numBomb = parseInt(numBomb, 10);

    if((Number.isInteger(numCol) === false) || (Number.isInteger(numRows) === false) || (Number.isInteger(numBomb) === false) ){
        alert("Nieprawidłowe dane - możesz wpisać tylko liczby całkowite");
    }
        else if (numRows<8){
            alert("Zbyt mała liczba wierszy");
        }
        else if (numCol<8){
            alert("Zbyt mała liczba kolumn");}
        else if (numCol>30){
            alert("Zbyt duża liczba kolumn");} 
        else if (numRows>30){
            alert("Zbyt duża liczba wierszy");}
        else if(numBomb>bomb_index){
            alert("Zbyt duża ilość bomb. Dla podango rozmiaru planszy max ilość wynosi:"+ Math.round(bomb_index));
        }
        else if (numBomb<10 ){
            alert("zbyt mała ilość bomb")
        }
    
    else{
        newGameButton.style.display='none';
        newGameButton.style.display='none';
        numCol_input.style.display='none';
        numCol_label.style.display='none';
        numRows_input.style.display='none';
        numRows_label.style.display='none';
        numBomb_input.style.display='none';
        numBomb_label.style.display='none';
        start();
    }

}

function start() {
    var widthBoardVariable=numCol*30;

    document.documentElement.style.setProperty('widthBoard', 'widthBoardVariable');
    firtsClick=true;
    numFlag=0;
    flagChecked=0;
    numBombLeft=0;
    gameOver=false;
    gameWon=false;
    countUpTime=0;
    give_up_button.style.display='inline';
    game_space.style.display='flex';
    gameHeadline.style.display='flex';
    numBombView.value=numBomb;
    id=0;
    table=[];  
        for (var rowIndex=0;rowIndex<=numRows;rowIndex++) {  
            table[rowIndex]=[];
                for (var colIndex=0;colIndex<=numCol;colIndex++) {  
                table[rowIndex][colIndex]=0;     
                }
            }


        prepare_table();   
        show();
        
}






