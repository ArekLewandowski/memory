'use strict';
var view = (function () {
        var level,
            piecesToGuess,
            pieceVisibleTime = 300,
            allowMisses,
            misses,
            accuracy,
            gameBoard,
            element,
            div,
            piece,
            pieces,
            i,
            j,
            k,
            l,
            m,
            renderPieces = function (pieces) {
                for (i = 0; i < pieces.length; i++) {
                    div = document.createElement('div');
                    div.setAttribute("class", "piece");
                    div.setAttribute("id", i.toString());
                    div.setAttribute("onclick", "controller.checkPieces(" + i + ")");
                    piece = document.getElementsByTagName('article')[0];
                    piece.appendChild(div);
                }
                for (j = 0; j < pieces.length; j++) {
                    document.getElementById(j.toString()).classList.add("disable");
                    if (pieces[j].toGuess === true) {
                        element = document.getElementById(j.toString());
                        element.style.backgroundColor = "blue";
                    }
                }
                setTimeout(function () {
                    for (k = 0; k < pieces.length; k++) {
                        if (pieces[k].toGuess === true) {
                            element = document.getElementById(k.toString());
                            element.style.backgroundColor = "lightgray";
                        }
                    }
                    pieces = document.getElementsByClassName("piece");
                    for (m = 0; m < pieces.length; m++) {
                        pieces[m].classList.remove("disable");
                    }
                }, pieceVisibleTime);
                addStats();

            },

            correctShot = function (piece) {
                document.getElementById(piece.toString()).style.backgroundColor = "green";
            },

            clearWindow = function () {
                gameBoard = document.getElementById("gameBoard");
                while (gameBoard.firstChild) {
                    gameBoard.removeChild(gameBoard.firstChild);
                }
            },

            missed = function (piece) {
                document.getElementById(piece.toString()).style.backgroundColor = "red";
                pieces = document.getElementsByClassName("piece");
                for (l = 0; l < pieces.length; l++) {
                    pieces[l].classList.add("disable");
                }
            },

            incrementTime = function () {
                if (pieceVisibleTime < 3000) {
                    pieceVisibleTime += 100;
                    document.getElementById("time").innerText = pieceVisibleTime.toString() + " ms";
                }
            },

            decrementTime = function () {
                if (pieceVisibleTime > 0) {
                    pieceVisibleTime -= 100;
                    document.getElementById("time").innerText = pieceVisibleTime.toString() + " ms";
                }
            },

            updateAvailableMisses = function () {
                allowMisses = controller.getAllowMisses();
                misses = controller.getMisses();
                document.getElementById("missed").innerText = misses.toString() + " on " + allowMisses.toString();
            },

            addStats = function () {
                level = controller.getLevel();
                piecesToGuess = controller.getNumberPiecesToGuess();
                allowMisses = controller.getAllowMisses();
                misses = controller.getMisses();
                accuracy = controller.getAccuracy();
                document.getElementById("level").innerText = level.toString();
                document.getElementById("piecesToGuess").innerText = piecesToGuess.toString();
                document.getElementById("time").innerText = pieceVisibleTime.toString() + " ms";
                document.getElementById("missed").innerText = misses.toString() + " on " + allowMisses.toString();
                document.getElementById("accuracy").innerText = accuracy.toString() + " %";
            }


        return {
            'renderPieces': renderPieces,
            'correctShot': correctShot,
            'clearWindow': clearWindow,
            'missed': missed,
            'addStats': addStats,
            'incrementTime': incrementTime,
            'decrementTime': decrementTime,
            'updateAvailableMisses': updateAvailableMisses
        }
    }
)();
