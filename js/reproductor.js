"use strict"; //comprobacion estricta de tipos
class Reproductor {
    constructor() {

        this.listaCanciones = [];
        this.cancionReproduciendo = null;
    }

    cargarMusica(){
        const archivos = document.querySelector('input').files;

        for(var i=0; i<archivos.length; i++){
            this.listaCanciones.push(archivos[i]);
        }

        this.mostrarEnLista();
    }

    mostrarEnLista(){
        const sections = document.querySelectorAll('section');

        for(let i=1; i<sections.length; i++){

            let dropArea = sections[i];

            dropArea.addEventListener('dragover', function(event) {
                event.preventDefault(); // Evitar el comportamiento predeterminado
            });

            dropArea.addEventListener('drop', function(event) {
                event.preventDefault(); // Evitar el comportamiento predeterminado
                var articulo = "article[data-posicionEnLista='"+event.dataTransfer.getData('text/plain')+"']";
                const article = document.querySelector(articulo);
                dropArea.appendChild(article);
            });
        }



        const section = sections[1];
        for(let i=0; i<this.listaCanciones.length; i++){

            const article = document.createElement('article');
            article.setAttribute('data-posicionEnLista', i);
            article.setAttribute('draggable', "true");

            article.addEventListener('dragstart', function(event) {
                event.dataTransfer.setData('text/plain', event.target.getAttribute('data-posicionEnLista'));
            });

            article.textContent = this.listaCanciones[i].name;

            section.appendChild(article);
        }
    }
}