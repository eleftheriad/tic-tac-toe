
function Game(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.scores = new Array(-1, -2, -3, -4, -5, -6, -7, -8, -9);
    this.counter = 0;
    
    
}
Game.prototype.gameFlow = function(){
    const boxes = document.querySelectorAll('.box');
    const ClickedBoxes = [];
    var isClicked = false;
    if (this.counter===0) {
        boxes.forEach(box => {
            box.textContent = '';
        });
    }
    boxes.forEach(box => {
        box.addEventListener("click",() => {
            const id = box.getAttribute("data-id");
            if (this.scores[id] == 1 || this.scores[id] == 0) {
                console.log(this.scores[id]);

            }else{
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
                console.log('count', this.counter);
                
                this.checkForWin(this.scores);
            }
            
        });
    });
};
Game.prototype.checkForWin = function(scores, currentPlayer){
    for (let i = 0; i < scores.length; i++) {
        if ((scores[i] === scores[i+1]) && (scores[i] === scores[i+2]) && (i%3===0)){

            this.gameOver(currentPlayer);
        }else if((scores[i] === scores[i+3]) && (scores[i] === scores[i+6]) && (i<=3)){
            this.gameOver(currentPlayer);

        }
    }
    if (((scores[0] === scores[4]) && (scores[0] === scores[8])) || ((scores[2] === scores[4]) && (scores[2] === scores[6]))){
        
        this.gameOver(currentPlayer);
    }
    
};
Game.prototype.gameOver = function(currentPlayer) {
    console.log("win");
    const boxes = document.querySelectorAll('.box');
    const game = document.querySelector('.game');
    boxes.forEach(box => {
        var boxClone = box.cloneNode(true);
        box.parentNode.replaceChild(boxClone, box);
    })
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

