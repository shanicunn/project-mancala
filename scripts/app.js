////////////////////////////////////////////////////////////////
//**************************MANCALA***************************** 
////////////////////////////////////////////////////////////////

$(() => {

    //////////////////////////////
    // Global Variables
    ////////////////////////////
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
        console.log("Remaining marbles:", remMarbles);
        // Store the location of the click
        turnStart = $clicked.index();
        if ($clicked.hasClass('player_1')) {
            let current = player1Marbles - remMarbles;
            console.log("Player 1:", current);
        } else {
            let current = player2Marbles - remMarbles;
            console.log("Player 2:", current);
        }
        disperseMarbles(e);
    };

    function disperseMarbles(e) {
        let $clicked = $(e.currentTarget);
        // Remove marbles from hole clicked
        let current = remMarbles - remMarbles;
        $clicked.children('h3').textContent = current;
        console.log("Marbles in clicked hole:", current);
        moveFirstRowOfMarbles();
    };

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
            let $hole = document.querySelectorAll('.player_1.hole');
            for (i = turnStart - 1; i >= count; i--) {
                player1Marbles ++;
                remMarbles--;
                $hole[i].textContent ++;
                // Last hole a marble was added to
                turnEnd = i;
            };
        } else {
            turnRow = 2;
            if (5 - turnStart <= remMarbles) {
                count = 5;
            } else {
                count = turnStart + remMarbles;;
            }
            let $hole = document.querySelectorAll('.player_2.hole');
            for (i = turnStart + 1; i <= count; i++) {
                player2Marbles++;
                remMarbles--;
                $hole[i].textContent ++;
                // Last hole a marble was added to
                turnEnd = i;
            };
        };
        marblesToWells();
    };

    function marblesToWells() {
        // Player 1's Turn
        if (remMarbles > 0 && playerTurn != 2 % 2) {
            turnRow = 1;
            player1Marbles++;
            remMarbles--;
            turnEnd = null;
            document.querySelector(".player_1.well").textContent ++;
            let $wellMarbles = document.querySelector(".player_1.well").textContent;
            console.log("Player 1's well:", $wellMarbles);
            moveSecondRowOfMarbles();
        } // Player 2's turn
        else if (remMarbles > 0 && playerTurn === 2 % 2) {
            turnRow = 2;
            player2Marbles++;
            remMarbles--;
            turnEnd = null;
            document.querySelector(".player_2.well").textContent ++;
            let $wellMarbles = document.querySelector(".player_2.well").textContent;
            console.log("Player 2's well:", $wellMarbles);
            moveSecondRowOfMarbles();
        } else {
            // Do nothing
        };
        playerTurn ++;
    };

    function moveSecondRowOfMarbles() {
        let count = null;
        if (remMarbles > 0 && playerTurn != 2 % 2) {
            turnRow = 2;
            // If there's more marbles left than holes in the row
            if (6 < remMarbles) {
                count = 6;
            } else {
                count = remMarbles;
            }
            let $hole = document.querySelectorAll('.player_2.hole');
            for (i = 0; i < count; i++) {
                player2Marbles++;
                remMarbles--;
                turnEnd = i;
                $hole[i].textContent ++;
                
            };
            moveFirstRowOfMarbles2();
        } else {
            turnRow = 1;
            if (6 < remMarbles) {
                count = 0;
            } else {
                count = 6 - remMarbles;
            }
            let $hole = document.querySelectorAll('.player_1.hole');
            for (i = 5; i >= count; i--) {
                player1Marbles++;
                remMarbles--;
                turnEnd = i;
                $hole[i].textContent ++;
            }
            moveFirstRowOfMarbles2();
        };
    };

    function moveFirstRowOfMarbles2() {
        let count = null;
        if (remMarbles > 0 && playerTurn != 2 % 2) {
            turnRow = 1;
            if (6 < remMarbles) {
                count = 0;
            } else {
                count = 6 - remMarbles;
            }
            let $hole = document.querySelectorAll('.player_1.hole');
            for (i = 5; i >= count; i--) {
                player1Marbles++;
                remMarbles--;
                turnEnd = i;
                $hole[i].textContent ++;
            };
        } else {
            turnRow = 2;
            if (6 < remMarbles) {
                count = 6;
            } else {
                count = remMarbles;
            }
            let $hole = document.querySelectorAll('.player_2.hole');
            for (i = 0; i < count; i++) {
                player2Marbles++;
                remMarbles--;
                turnEnd = i;
                $hole[i].textContent ++;
            };
        };
        marblesToWells()
    };



    ////////////////////////////
    // Game Play
    ////////////////////////////
    let welcome = () => {
        swal({
            title: "Welcome!",
            text: "Let's Play Mancala!",
            buttons: {
                confirm: {
                    text: "Sure",
                    value: true,
                    visible: true,
                    className: "confirm",
                    closeModal: true
                },
                cancel: {
                    text: "Nope",
                    value: false,
                    visible: true,
                    className: "cancel",
                    closeModal: true,
                },
            },
        }) .then((value) => {
            if (value === true) {
                wholeGame();
            } else {
                swal({text: "Maybe Next Time Then ;-)"});
            }

        });
    };
    let wholeGame = () => {
        // While neither player has 0 or less marbles
        if (marbles > 0) {
            // If player count is odd it is player 1's turn
            if (playerTurn != 2 % 2) {
                document.getElementById('announcement').innerHTML = '<h3>Player 1</h3>';
                swal({
                    text: "It's player 1's turn!"
                });
                console.log("Player 1's turn begins");
                $('.player_1.hole').on('click', start);
                $('.player_2.hole').off('click', start);
            } else {
                // If player count is even it is player 2's turn
                document.getElementById('announcement').innerHTML = '<h3>Player 2</h3>';
                swal({
                    text: "It's player 2's turn!"
                });
                console.log("Player 2's turn begins");
                $('.player_2.hole').on('click', start);
                $('.player_1.hole').off('click', start);
            };
        } // If Player 1 has the most marbles they win
        else if (player1Marbles > player2Marbles) {
            // Sweet Alert syntax
            swal("WINNER!", "Player 1, You Win!", "success");
            console.log("Player 1 wins");
        } else if (player2Marbles > player1Marbles) {
            swal("WINNER!", "Player 2, You Win!", "success");
            console.log("Player 2 wins");
        } else {
            swal("Tie!", "It is a tie!", "success");
            console.log("Players drew a tie");
        };
    };
    ////////////////////////////
    // End or play again
    ////////////////////////////
    swal({
            title: "New Game?",
            text: "Would you like to play again?",
            buttons: {
                confirm: {
                    text: "Yes",
                    value: true,
                    visible: true,
                    className: "confirm",
                    closeModal: true
                },
                cancel: {
                    text: "No",
                    value: false,
                    visible: true,
                    className: "cancel",
                    closeModal: true,
                },
            },
        })
        .then((value) => {
            if (value === true) {
                location.reload();
            } else {
                console.log("Game Over!");
                swal("GAME OVER!");
            }

        });

    //////////////////////////////
    // Events
    //////////////////////////////
    welcome();
})