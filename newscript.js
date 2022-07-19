import myJson from './db.json' assert{type:'json'};


/*These are the functions to run the card game */
let wallet=500;
let wager=0;
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
    updateWallet(wallet)
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
            dColor= myJson.cards[randomDCard].cardColor
            document.getElementById('dealerCard').src = myJson.cards[randomDCard].cardImageUrl
    },2500)
}
//Deal the Player Card randomized function
function playerCard(){
    
        let randomPCard = (Math.floor(Math.random()*51))+1
            pValue=myJson.cards[randomPCard].cardValue
            pColor=myJson.cards[randomPCard].cardColor
            document.getElementById('playerCard').src = myJson.cards[randomPCard].cardImageUrl
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
    if (pValue>dValue){
        newMessage( 'You Won $'+ wager+'. Break the Bank! Play Again!!')
        wallet=parseInt(wallet)+parseInt(wager)
        updateWallet(wallet)
     }else if(dValue>pValue){
       newMessage('The Dealer won that one. Get it back. Play again')
        wallet=parseInt(wallet)-parseInt(wager)
        updateWallet(wallet)
    } else{
        newMessage ('Noooo, It was a Tie! Play again')
    }
    setTimeout(()=>{
        resetGame();
        disableBtn();
    },2500)      
}

function lowerCard(){
    playerCard();
    if (pValue<dValue){
        newMessage('Lower it is. Added $'+ wager+'. to your wallet! Play Again!!')
        wallet=parseInt(wallet)+parseInt(wager)
        updateWallet(wallet)
     }else if(dValue<pValue){
        newMessage('Dang it! The Dealer won that one. Play again')
        wallet=parseInt(wallet)-parseInt(wager)
        updateWallet(wallet)
    } else{
        newMessage('Tied! What are the odds. Play again')
    }
    setTimeout(()=>{
        resetGame();
        disableBtn();
    },2500)      
} 
//Red or Black game function
function blackCard(){
    playerCard();
    if (pColor=="Black"){
        newMessage ('Black it Is!! $'+ wager+' in the bank!')
        wallet=parseInt(wallet)+parseInt(wager)
        updateWallet(wallet)
     }else if(pColor=="Red"){
        newMessage('Nope! Card was Red. Better luck next time')
        wallet=parseInt(wallet)-parseInt(wager)
        updateWallet(wallet)
    } else{
        newMessage('Something is broken. Please contact support')
    }
    setTimeout(()=>{
        resetGame();
        disableBtn();
    },2500)      
}
function redCard(){
    playerCard();
    if (pColor=="Red"){
        newMessage('Red it and weep!! $'+ wager+' Cash money!')
        wallet=parseInt(wallet)+parseInt(wager)
        updateWallet(wallet)
     }else if(pColor=="Black"){
        newMessage('Oh that is not good. Card is Black. Try again')
        wallet=parseInt(wallet)-parseInt(wager)
        updateWallet(wallet)
    } else{
        newMessage('Something is broken. Please contact support')
    }
    setTimeout(()=>{
        resetGame();
        disableBtn();
    },2500)      
} 
 //Event Listeners for buttons

 document.getElementById('higher').addEventListener('click',function(){higherCard();})
 document.getElementById('lower').addEventListener('click',function(){lowerCard();})
 document.getElementById('red').addEventListener('click',function(){redCard();})
 document.getElementById('black').addEventListener('click',function(){blackCard();})

// Reset the game function after 5 seconds and deal the next card.
function  resetGame(){
    let radioReset=document.getElementsByName('bet')
        let i=0
        for (i;i<radioReset.length;i++)
        {
        radioReset[i].checked = false
        };
        document.getElementById('dealerCard').src='./images/playing-card-back.jpg';
        document.getElementById('playerCard').src='./images/playing-card-back.jpg';
        newMessage('Make another Wager to Play again')
        dealerCard();
    }

//functions to change the message
    function notEnough(){
         newMessage("Oh no! You don't have enough money. Try Again")
    }
    function play(){
        newMessage("Choose Higher Lower Red or Black")
    }
    function noMoney(){
        newMessage( "You're out of cash. Please gamble responsibly")
        setTimeout(() => {
            newMessage("I've reset your wallet. Play again")
            wallet=500;   
            updateWallet(wallet)
            resetGame();
        }, 3000);

    }
//Message function
function newMessage (msg) {
    document.getElementById('message').innerHTML = msg
}
//Update the Wallet balance
function updateWallet (x){
    document.getElementById('myWallet').innerHTML=x
}
