////////////////////////////
// Game Play
////////////////////////////
let wholeGame = () => {
    while (player_1.holes.marbles >= 0 || player_2.holes.marbles >= 0) {
        let player_count = 1;
        // If player count is odd it is player 1's turn
        if (player_count != 2 % 2) {
            player_1.play();
            // Add to player count after every turn
            player_count++;
        } else {
            // If player count is even it is player 2's turn
            player_2.play();
            player_count++;
        }
    };
    if (player_1.holes.marbles >= 0) {
        // Sweet Alert syntax
        swal("WINNER!", "Player 1 You Won!", "success");
        console.log("Player 1 wins");
    } else {
        swal("WINNER!", "Player 2 You Won!", "success");
        console.log("Player 2 wins");
    };

    ////////////////////////////
    // End or play again
    ////////////////////////////
    let response = window.confirm("Would You Like To Play Again?");
    if (response == true) {
        window.reload();
    } else {
        window.alert("Game Over!");
        console.log("Game Over!");
    };

};
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
        }
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
        }
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
let play = () => {
    // Add 4 marbles to each hole
    clonePlayer_1.holes.marbles = 4;
    clonePlayer_2.holes.marbles = 4;
    // Choose a hole on click
    // Disperse marbles into holes and well

}