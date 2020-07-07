////////////////////////////////////////////////////////////////
//**************************MANCALA***************************** 
////////////////////////////////////////////////////////////////
// import swal from 'sweetalert';
// require('./bootstrap');

// window.Vue = require('vue');

// import VModal from 'vue-js-modal'
// window.swal = require('sweetalert2') // added here

// Vue.use(VModal)
$(() => {

//////////////////////////////
// Global Variables
////////////////////////////
//let clonePlayer_1 = Object.assign({}, player_1);
//let clonePlayer_2 = Object.assign({}, player_2);
let marbles = 24;
let player1Marbles = marbles;
let player2Marbles = marbles;
let playerTurn = null;
let remMarbles = null;
// Hole turn starts from
let turnStart = null;
// Hole turn ends on
let turnEnd = null;
// Row turn ends on
let turnRow = null;

////////////////////////////
// Game Play Functions
////////////////////////////

// First Loop of Play
function start(e) {
    // Store the clicked hole
    let $clicked = $(e.currentTarget);
    console.log($clicked);
    // Store amount of marbles in hole
    // https://stackoverflow.com/questions/26319183/how-to-get-number-inside-a-div-with-jquery
    remMarbles = parseInt($clicked.children('h3').text());
    $clicked.children('h3').innerHTML = remMarbles;
    console.log("Remaining marbles:", remMarbles);
    // Store the location of the click
    turnStart = $clicked.index();
    console.log(turnStart);
    if ($clicked.hasClass('player_1')) {
        let current = player1Marbles -= remMarbles;
        console.log("Player 1", current);
    } else {
        let current = player2Marbles -= remMarbles;
        console.log("Player 2", current);
    }
    disperseMarbles(e);
};

function disperseMarbles(e) {
    let $clicked = $(e.currentTarget);
    // Remove children elements from clicked element - marbles
    $clicked.children(".marbles").remove();
    console.log("Disperse marble function");
    moveFirstRowOfMarbles();
}

function moveFirstRowOfMarbles() {
    let count = null;
    console.log("Move first row of marbles");
    if (playerTurn != 2 % 2) {
        turnRow = 1;
        if (turnStart <= remMarbles) {
            count = 0;
        } else {
            count = turnStart - remMarbles;
        };
        for (i = turnStart - 1; i >= count; i--) {
            player1Marbles++;
            remMarbles--;
            // Last hole a marble was added to
            turnEnd = i;
        }
    } else {
        turnRow = 2;
        if (5 - turnStart <= remMarbles) {
            count = 5;
        } else {
            count = turnStart + remMarbles;;
        }
        for (i = turnStart + 1; i <= count; i++) {
            player2Marbles++;
            remMarbles--;
            // Last hole a marble was added to
            turnEnd = i;
        };
    };
    marblesToWells();
};

function marblesToWells() {
    if (remMarbles > 0 && playerTurn != 2 % 2) {
        turnRow = 1;
        player1Marbles++;
        remMarbles--;
        turnEnd = null;
        moveSecondRowOfMarbles();
    } else {
        turnRow = 1;
        player2Marbles++;
        remMarbles--;
        turnEnd = null;
        moveSecondRowOfMarbles();
    }
};

function moveSecondRowOfMarbles() {
    let count = null;
    if (remMarbles > 0 && playerTurn != 2 % 2) {
        turnRow = 2;
        if (6 < remMarbles) {
            count = 6;
        } else {
            count = remMarbles;
        }
        for (i = 0; i < count; i++) {
            player2Marbles++;
            remMarbles--;
            turnEnd = i;
        }
        moveFirstRowOfMarbles2();
    } else {
        turnRow = 1;
        if (6 < remMarbles) {
            count = 0;
        } else {
            count = 6 - remMarbles;
        }
        for (i = 5; i >= count; i--) {
            player1Marbles++;
            remMarbles--;
            turnEnd = i;
        }
        moveFirstRowOfMarbles2();
    };
};
function moveFirstRowOfMarbles2 () {

}



////////////////////////////
// Game Play
////////////////////////////

let wholeGame = () => {
    // While neither player has 0 or less marbles
    while (playerTurn < 10)
    {
        // If player count is odd it is player 1's turn
        if (playerTurn != 2 % 2) {
            announcement.innerHTML = '<h3>Player 1</h3>';
            swal({
                text: "It's player 1's turn!"
            });
            console.log("It is player 1's turn");
            $('.player_1.hole').on('click', start);
            $('.player_2.hole').off('click', start);
            // Add to player count after every turn
            playerTurn++;
        } else {
            // If player count is even it is player 2's turn
            announcement.innerHTML = '<h3>Player 1</h3>';
            swal({
                text: "It's player 2's turn!"
            });
            console.log("It is player 2's turn");
            $('.player_2.hole').on('click', start);
            $('.player_1.hole').off('click', start);

            playerTurn++;
        };
    };
};
// If Player 1 has no marbles they win
// if (marbles >= 0) {
//     // Sweet Alert syntax
//     swal("WINNER!", "Player 1, You Win!", "success");
//     console.log("Player 1 wins");
//   } else {
//     swal("WINNER!", "Player 2, You Win!", "success");
//     console.log("Player 2 wins");
// };

////////////////////////////
// End or play again
////////////////////////////
// swal({
//     title: "New Game?",
//     text: "Would you like to play again?",
//     buttons: {
//         confirm: {
//             text: "Yes",
//             value: true,
//             visible: true,
//             className: "confirm",
//             closeModal: true
//         },
//         cancel: {
//             text: "No",
//             value: false,
//             visible: true,
//             className: "cancel",
//             closeModal: true,
//         },
//     },
// })
// .then((value) => {
//     if (value === true) {
//         location.reload();
//     } else {
//         console.log("Game Over!");
//         swal("GAME OVER!");
// }

// });

//////////////////////////////
// Events
//////////////////////////////
wholeGame();
})