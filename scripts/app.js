////////////////////////////////////////////////////////////////
//                          MANCALA 
////////////////////////////////////////////////////////////////

////////////////////////////
// Player Objects
////////////////////////////
let player_1 = {
    "holes": [{
            "hole_1": "hole_1",
            "marbles": 0,
        },
        {
            "hole_2": "hole_2",
            "marbles": 0,
        },
        {
            "hole_3": "hole_3",
            "marbles": 0,
        },
        {
            "hole_4": "hole_4",
            "marbles": 0,
        },
        {
            "hole_5": "hole_5",
            "marbles": 0,
        },
        {
            "hole_6": "hole_6",
            "marbles": 0,
        },
        {
            "hole_7": "well",
            "marbles": 0,
        },
    ],
    "well": 0,
};
let player_2 = {
    "holes": [{
            "hole_1": "hole_1",
            "marbles": 0,
        },
        {
            "hole_2": "hole_2",
            "marbles": 0,
        },
        {
            "hole_3": "hole_3",
            "marbles": 0,
        },
        {
            "hole_4": "hole_4",
            "marbles": 0,
        },
        {
            "hole_5": "hole_5",
            "marbles": 0,
        },
        {
            "hole_6": "hole_6",
            "marbles": 0,
        },
        {
            "hole_7": "well",
            "marbles": 0,
        },
    ],
    "well": 0,
};

//////////////////////////////
// Cloned Objects to use/manipulate values
////////////////////////////
let clonePlayer_1 = Object.assign({}, player_1);
let clonePlayer_2 = Object.assign({}, player_2);

////////////////////////////
// Game Play Functions
////////////////////////////
let play = (callback) => {
    // Add 4 marbles to each hole
    clonePlayer_1.holes.marbles = 4;
    clonePlayer_2.holes.marbles = 4;
    // Choose a hole on click

    // Disperse marbles into holes and well
    callback();
}

// First Loop of Play
function loopTurn1(e) {
    // Remove marbles from the first hole clicked
    hole_clicked_first.holes.marbles = 0;
    for (hole in holes) {
        // Add a marble to each hole clicked after the first one
        hole_clicked.holes.marbles++;
        return console.log();
    }
    return console.log('Event: ' + e.type);
};
// Second Loop of Play
function loopTurn2(callback) {
    // Repeat loopTurn1 til marble in hole is 1
    while (holes.marbles != 1) {
        return callback();
    }
};

////////////////////////////
// Game Play
////////////////////////////
let marbleHoles = document.querySelector('.dip');
let wholeGame = () => {
    // While neither player has 0 or less marbles
    while (clonePlayer_1.holes.marbles > 0 || clonePlayer_2.holes.marbles > 0) {
        let player_count = 1;
        // If player count is odd it is player 1's turn
        if (player_count != 2 % 2) {
            announcement.innerHTML = '<h3>Player 1</h3>';
            swal({
                text: "It's player 1's turn!"
            });
            console.log("It is player 1's turn");
            marbleHoles.addEventListener('click', player_1.play(loopTurn2));

            // Add to player count after every turn
            player_count++;
        } else {
            // If player count is even it is player 2's turn
            announcement.innerHTML = '<h3>Player 1</h3>';
            swal({
                text: "It's player 1's turn!"
            });
            console.log("It is player 2's turn");
            marbleHoles.addEventListener('click', player_2.play(loopTurn2));
            // player_2.play(loopTurn2);
            player_count++;
        };
    };
};
    // If Player 1 has no marbles they win
    if (clonePlayer_1.holes.marbles >= 0) {
        // Sweet Alert syntax
        swal("WINNER!", "Player 1, You Win!", "success");
        console.log("Player 1 wins");
    } else {
        swal("WINNER!", "Player 2,You Win!", "success");
        console.log("Player 2 wins");
    };

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
    //             className: "",
    //             closeModal: true
    //         },
    //         cancel: {
    //             text: "No",
    //             value: false,
    //             visible: true,
    //             className: "",
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