/*These are the functions to run the card game */
let wallet=0;
let wager=0;
let winnings=0;
let losses=0;
let dCard = {
    cardId:"",
    cardName:"",
    cardSuit:"",
    cardValue:0,
    cardColor:"",
    cardImg:""
}
let pCard = {
    cardId:"",
    cardName:"",
    cardSuit:"",
    cardValue:0,
    cardColor:"",
    cardImg:""
}
let gameResult ="Let's Play! Start by Making a Wager!"

// wait for window to load before running scripts
window.onload = (event)=>{
    // Add money to the wallet
    document.getElementById('myWallet').innerHTML=wallet
    // disable deal buttons on load
     disableBtn();
     betListener();
    }
// Function to disable button
function disableBtn(){
    let dButton = document.getElementsByClassName('btn')
    for(i=0; i<dButton.length;i++){
        dButton[i].disabled=true;
    }
}

// Event listener for Wager input field 
function  betListener(){
    let radioBtn=document.getElementsByName('bet')
        for(i=0;i<radioBtn.length;i++){
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
    
}

//enable the Game Card selection buttons
    function activateBtn() {
        let eButton = document.getElementsByClassName('btn')
        for(i=0; i<eButton.length;i++){
            eButton[i].disabled=false;
        }   
    }
//Hi - Lo Game Selected Function

    //Event Listeners for Hi - Lo

//Red or Black game function
    
    //Event Listeners for Red or Black

//Deal the Player Card randomized function

    //Event Listener for Deal the next card

//Deternmine win or loss and update the wallet function

// Reset the game function after 5 seconds and deal the next card.
function  resetGame(){
    let radioReset=document.getElementsByName('bet')
        for (i=0;i<radioReset.length;i++)
        {
        radioReset[i].checked = false
        }
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







