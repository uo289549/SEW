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

        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    shuffleElements() {
        const n = this.elements.length;

        for (let i = n - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))+1;
            [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
        }
    }

    unflipCards() {
        this.lockBoard = true;
        
        setTimeout(() => {
            this.firstCard.dataset.state = "initial";
            this.secondCard.dataset.state = "initial";
            this.resetBoard();
        },1000);
    }

    resetBoard() {
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch() {
        this.firstCard.dataset.element === this.secondCard.dataset.element ? this.disableCards() : this.unflipCards();
    }

    disableCards() {
        this.firstCard.dataset.state = "revealed";
        this.secondCard.dataset.state = "revealed";
        this.resetBoard();
    }

    createElements(){
        const container = document.querySelector('section');

        for(const tarjeta in this.elements){
            const cardData = this.elements[tarjeta];

            const articleNode = document.createElement('article');
            articleNode.setAttribute('data-element',cardData.element);
            articleNode.setAttribute('data-state',"initial");

            const h3Node = document.createElement('h3');
            h3Node.textContent = 'Tarjeta de memoria';

            const imgNode = document.createElement('img');
            imgNode.setAttribute('src', cardData.source);
            imgNode.setAttribute('alt', cardData.element);

            articleNode.appendChild(h3Node);
            articleNode.appendChild(imgNode);

            container.appendChild(articleNode);
        }
    }

    addEventListeners(){
        const cards = document.querySelectorAll('section article');
        cards.forEach(card => card.addEventListener('click', this.flipCard.bind(card, this)));
    }

    flipCard(memoria){
        if(this.dataset.state === "revealed" || memoria.lockBoard === true || this === memoria.firstCard){
            return;
        }

        this.dataset.state = "flip";
        if(memoria.hasFlippedCard === false){
            memoria.hasFlippedCard = true;
            memoria.firstCard = this;
        }else{
            memoria.secondCard = this;
            memoria.checkForMatch();
        }
    }
}
