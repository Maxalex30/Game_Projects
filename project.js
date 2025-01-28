/*  1.) Deposit some money |x
    2.) Determin of lines to bet | x
    3.) Colect the bet amount | x
    4.) Spin slot machine | x
    5.) check if they won | X & transpose slot machine
    6.) give winnigns or take loss |
    7.) play again for loss. |
     */

const { all } = require("axios");

    const prompt = require("prompt-sync")(); 
    
    const ROWS = 3;
    const COLS = 3; 

    const SYMBOLS_COUNT = {
        A:2,
        B:4,
        C:6,      // might need ot remove quotation marks becuase of this isnt python. 
        D:8
    };

    const SYMBOLS_VAL ={ // value for symbols payouts
        A:5,
        B:4,
        C:3,
        D:2
    };

    const deposit = () => {
        while (true) { // this it lop until they do give a valid amount.
        const depositAmount =  prompt("Enter your desposit Amount: ");         // make the depositAmount a positive integer. 
        const numberDepositAmount = parseFloat(depositAmount); // Nan = not a number. 
    
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invaild deposit amount, try again.")
    } else{
        return numberDepositAmount;
    }
    }
};

    const getnumberOfLines = () => {
        while (true) { // this it lop until they do give a valid amount.
            const lines =  prompt("Enter your # of lines to bet one (1-3): ");         // make the depositAmount a positive integer. 
            const numberOfLines = parseFloat(lines); // Nan = not a number. 
        
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invaild # of LINES, try again.",'text-decoration: underline;');
        } else{
            return numberOfLines;
        }
        }
    }
    const getBet = (balance, lines) => {
        while (true) { 
            const bet =  prompt("Enter the bet per line: ");         
            const numberBet = parseFloat(bet); // Nan = not a number. 

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
            console.log("Invaild bet, try again.");
        } else {
            return numberBet;
        }
        }
    }


    const spin = () => {
        const symbols = []; 
        for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
            for (let i= 0 ; i < count; i++){
                symbols.push(symbol);
            }

        }
        const reels = [];
        for (let i = 0; i < COLS; i++){
            reels.push([]);
            const reelSymbols = [...symbols];
            for (let j = 0; j < ROWS; j++){
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1);
            }
        }
        return reels; 
    };
    const transpose = (reels) => {
        const rows = [];

        for (let i = 0; i < ROWS; i++){
            rows.push([]);
            for(let j = 0; j < COLS; j++){
                rows[i].push(reels[j][i])
            }
        }
        return rows
    }

    const printRows = (rows) => {
        for(const row of rows){
            let rowString = "";
            for (const [i,symbol] of row.entries()){
                rowString += symbol
                if (i != row.length - 1){
                    rowString += " | "
                }
            }
            console.log(rowString);
        }
    }

    const getWinnings = (rows, bet, lines) => {
        let  winnings = 0; 

        for (let row = 0; row < lines; row++){
            const symbols = rows[row];
            let allSame = true;

            for (const symbol of symbols){
                if (symbol != symbols[0]){
                    allSame = false;
                    break;
                }
            }
            if (allSame){
                winnings += bet * SYMBOLS_VAL[symbols[0]]
            }
        }
        return winnings; 
    };
const game = () => {



    let balance = deposit(); 
    //console.log(depositAmount)
    while (true){
        console.log("You have a balance of $"+ balance);
    const numberOfLines = getnumberOfLines();
    //console.log(numberOfLines);
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines); 
    balance += winnings; 
    console.log("You won, $"+ winnings.toString());

    if (balance <= 0){
        console.log ("You  ran out of money! Womp womp.");
        break;  
    }
    const playAgain = prompt(" Do you wanna play again (y/n)?");
    
    if (playAgain != "y") break; 

   /* if(depositAmount != ''){
        return console.log("Thnx 4 adding {$ depositAmount } to the game!!")
    } */ // I would like for this to work.  
    }
};
game();