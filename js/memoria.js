"use strict"; //comprobacion estricta de tipos

class Memoria {
    constructor() {
        this.elements = [
            { element: "HTML5", source: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg" },
            { element: "HTML5", source: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg" },
            { element: "CSS3", source: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
            { element: "CSS3", source: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
            { element: "JS", source: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg" },
            { element: "JS", source: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg" },
            { element: "PHP", source: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
            { element: "PHP", source: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
            { element: "SVG", source: "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg" },
            { element: "SVG", source: "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg" },
            { element: "W3C", source: "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg" },
            { element: "W3C", source: "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg" }
        ];

        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
    }

    shuffleElements() {
        n = this.elements.length;

        for (let i = n - 1; i > 0; i--) {
            j = Math.random() * (i + 1);
            [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
        }
    }

    unflipCards() {
        this.lockBoard = true;
        setTimeout(null,3000);
        //voltearCartas

        this.resetBoard();
    }

    resetBoard() {
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch() {
        this.firstCard === this.secondCard ? this.disableCards() : this.unflipCards();
    }

    disableCards() {
        //modificar atributo a revealed
        this.resetBoard();
    }
}
