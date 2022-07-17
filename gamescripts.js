import myJson from './db.json' assert{type:'json'};


/*These are the functions to run the card game */
let wallet=500;
let wager=0;
let winnings=0;
let losses=0;
let dValue=0;
let dColor="";
let dName="";
let pValue=0;
let pColor="";
let pName="";

let gameResult ="Let's Play! Start by Making a Wager!"

// wait for window to load before running scripts
window.onload = (event)=>{
    // Add money to the wallet
    document.getElementById('myWallet').innerHTML=wallet
    // disable deal buttons on load
     disableBtn();
     betListener();
     dealerCard();
    }
// Function to disable button
function disableBtn(){
    let dButton = document.getElementsByClassName('btn')
    let x= 0
    for (x;x<dButton.length;x++){
        dButton[x].disabled=true;
    }
}

// Event listener for Wager input field 
function  betListener(){
    let radioBtn=document.getElementsByName('bet')
        let i=0;
        for(i;i<radioBtn.length;i++){
        radioBtn[i].addEventListener('change',function(e){
             wager=e.target.value
        //validate the wager amount
             if (wager<=wallet){
                activateBtn();
                play();
            } else if(wallet>0)
            {
                notEnough();
                disableBtn();
            }
            else
            {
                noMoney();
                disableBtn();
            }
        })
        }
}    
//Deal the Dealer Card Function
function dealerCard(){
    setTimeout(()=> {
        let randomDCard = (Math.floor(Math.random()*51))+1
            dValue= myJson.cards[randomDCard].cardValue
            document.getElementById('dealerCard').src = myJson.cards[randomDCard].cardImageUrl
    },3000)
}
//Deal the Player Card randomized function
function playerCard(){
    
        let randomDCard = (Math.floor(Math.random()*51))+1
            pValue=myJson.cards[randomDCard].cardValue;
            document.getElementById('playerCard').src = myJson.cards[randomDCard].cardImageUrl
    }

//enable the Game Card selection buttons
    function activateBtn() {
        let eButton = document.getElementsByClassName('btn')
        let i=0
        for(i; i<eButton.length;i++){
            eButton[i].disabled=false;
        }   
    }
 
//Hi - Lo Game Selected Function
function higherCard(){
    playerCard();
    console.log(wager)
    console.log(dValue)
    console.log(pValue)

}
function lowerCard(){
    playerCard();

} 
//Red or Black game function
function blackCard(){
    playerCard();
}
function redCard(){
    playerCard();
} 

 //Event Listeners for buttons
 document.getElementById('higher').addEventListener('click',function(){higherCard();})
 document.getElementById('lower').addEventListener('click',function(){lowerCard();})
 document.getElementById('red').addEventListener('click',function(){redCard();})
 document.getElementById('black').addEventListener('click',function(){blackCard();})


 

//Deternmine win or loss and update the wallet function

// Reset the game function after 5 seconds and deal the next card.
function  resetGame(){
    let radioReset=document.getElementsByName('bet')
        let i=0
        for (i;i<radioReset.length;i++)
        {
        radioReset[i].checked = false
        };
        document.getElementById('dealerCard').src='./images/playing-card-back.jpg';
        dealerCard();
    }

//functions to change the message
    function notEnough(){
        document.getElementById('message').innerHTML = "Oh no! You don't have enough money. Try Again"
    }
    function play(){
        document.getElementById('message').innerHTML = "Choose Higher Lower Red or Black"
    }
    function noMoney(){
        document.getElementById('message').innerHTML = "You're out of cash. Please gamble responsibly";
        setTimeout(() => {
            document.getElementById('message').innerHTML = "I've reset your wallet. Play again";
            wallet=500;   
            document.getElementById('myWallet').innerHTML=wallet
            resetGame();
        }, 3000);
      
        
    }







