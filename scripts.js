
function Game(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.scores = new Array(-1, -2, -3, -4, -5, -6, -7, -8, -9);
    this.counter = 0;
    
}
Game.prototype.gameFlow = function(){
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener("click",() => {
            const id = box.getAttribute("data-id");
            let currentPlayer;
            if (this.counter%2 == 0){
                box.textContent = "X";
                this.scores[id] = 1;

                currentPlayer = this.p1;
            }else {
                box.textContent = "O"
                this.scores[id] = 0;  
                currentPlayer = this.p2;
            }
            this.counter++;
            console.log(this.counter);
            
            this.checkForWin(this.scores);
        });
    });
};
Game.prototype.checkForWin = function(scores, currentPlayer){
    for (let i = 0; i < scores.length; i++) {
        if ((scores[i] === scores[i+1]) && (scores[i] === scores[i+2]) && (i%3===0)){
            console.log("win");
        }else if((scores[i] === scores[i+3]) && (scores[i] === scores[i+6]) && (i<=3)){
            console.log("win");

        }
    }
    if (((scores[0] === scores[4]) && (scores[0] === scores[8])) || ((scores[2] === scores[4]) && (scores[2] === scores[6]))){
        console.log("win");
    }
    this.gameOver(currentPlayer);
};
Game.prototype.gameOver = function(currentPlayer) {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.removeEventListener("click");
    });
}
function Player(name, mark) {
    this.name = name;
    this.mark = mark;

}


const startButton = document.querySelector("#start-button");
startButton.addEventListener("click",()=>{
    const name1 = document.querySelector('#playerOneName').value;
    let mark1;
    if(document.querySelector('#playerOneMarkX').checked == true){
        mark1 = 'X';
    }else mark1='O';
    const name2 = document.querySelector('#playerTwoName').value;
    let mark2;
    if(document.querySelector('#playerTwoMarkX').checked == true){
        mark2 = 'X';
    }else mark2='O';

    const player1 = new Player(name1, mark1);
    const player2 = new Player(name2, mark2);
    const game = new Game(player1, player2);
    game.gameFlow();
});

