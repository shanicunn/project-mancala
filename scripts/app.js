////////////////////////////////////////////////////////////////
//**************************MANCALA***************************** 
////////////////////////////////////////////////////////////////
// import swal from 'sweetalert';
// require('./bootstrap');

// window.Vue = require('vue');

// import VModal from 'vue-js-modal'
// window.swal = require('sweetalert2') // added here

// Vue.use(VModal)

////////////////////////////
// Player Objects
////////////////////////////
// let player_1 = {
//     "holes": [{
//             "hole_1": "hole_1",
//             "marbles": 0,
//         },
//         {
//             "hole_2": "hole_2",
//             "marbles": 0,
//         },
//         {
//             "hole_3": "hole_3",
//             "marbles": 0,
//         },
//         {
//             "hole_4": "hole_4",
//             "marbles": 0,
//         },
//         {
//             "hole_5": "hole_5",
//             "marbles": 0,
//         },
//         {
//             "hole_6": "hole_6",
//             "marbles": 0,
//         },
//         {
//             "hole_7": "well",
//             "marbles": 0,
//         },
//     ],
//     "well": 0,
// };
// let player_2 = {
//     "holes": [{
//             "hole_1": "hole_1",
//             "marbles": 0,
//         },
//         {
//             "hole_2": "hole_2",
//             "marbles": 0,
//         },
//         {
//             "hole_3": "hole_3",
//             "marbles": 0,
//         },
//         {
//             "hole_4": "hole_4",
//             "marbles": 0,
//         },
//         {
//             "hole_5": "hole_5",
//             "marbles": 0,
//         },
//         {
//             "hole_6": "hole_6",
//             "marbles": 0,
//         },
//         {
//             "hole_7": "well",
//             "marbles": 0,
//         },
//     ],
//     "well": 0,
// };

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
function startTurn(e) {
    // Store the clicked hole
    let clicked = e.currentTarget;
    console.log(clicked);
    // Store amount of marbles in hole
    remMarbles = clicked.children().children().length;
    console.log("Remaining marbles:", remMarbles);
    // Store the location of the click
    turnStart = clicked.index();
    if (clicked.hasClass('player_1')) {
        player1Marbles -= remMarbles;
    } else {
        player2Marbles -= remMarbles;
    }

    disperseMarbles(e);
};
function disperseMarbles(e) {
    let clicked = e.currentTarget;
    clicked.children().remove();
    moveMarbles();
}
function moveMarbles() {
    let count = null;
    if (playerTurn === 1) {
        turnRow = 1;
        if (turnStart <= remMarbles) {
            count = 0;
        } else {
            count = turnStart - remMarbles;
        };
        for (i = turnStart - 1; i >= count; i--) {
            // CHECKMARBLELAYER
            player1Marbles ++;
            remMarbles --;
            // Last hole a marble was added to
            turnEnd = i;
        }
    } else {
        turnRow = 2;
        if (5 - turnStart <= remMarbles) {
            count = 5;
        } else {
            count = turnStart + remMarbles;
        ;}
        for (i = turnStart + 1; i <= count; i++) {
            // CHECKMARBLELAYER
            player2Marbles ++;
            remMarbles--;
            // Last hole a marble was added to
            turnEnd = i;
        }
    }
}



////////////////////////////
// Game Play
////////////////////////////

let wholeGame = (e) => {
    // While neither player has 0 or less marbles
    while (playerTurn < 10)
    // (clonePlayer_1.holes.marbles > 0 || clonePlayer_2.holes.marbles > 0) 
    {
        // If player count is odd it is player 1's turn
        if (playerTurn != 2 % 2) {
            announcement.innerHTML = '<h3>Player 1</h3>';
            swal({
                text: "It's player 1's turn!"
            });
            console.log("It is player 1's turn");
            let marbleHoles = document.getElementsByClassName("dip");
            marbleHoles.addEventListener('click', startTurn(e));
            // Add to player count after every turn
            playerTurn ++;
        } else {
            // If player count is even it is player 2's turn
            announcement.innerHTML = '<h3>Player 1</h3>';
            swal({
                text: "It's player 2's turn!"
            });
            console.log("It is player 2's turn");
            marbleHoles.addEventListener('click', startTurn(e));
           
            playerTurn ++;
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
let startButton = document.querySelector('#play');
startButton.addEventListener('click', wholeGame);