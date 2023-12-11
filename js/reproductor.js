"use strict"; //comprobacion estricta de tipos
class Reproductor {
    constructor() {

        this.listaCanciones = [];
        this.cancionReproduciendo = null;

        this.audioElement = null;


        this.iniciarReproductor();
    }

    cargarMusica(){

        const archivos = document.querySelector('input').files;


        var posicionUltimaCancion = this.listaCanciones.length;

        const tipoTexto = /audio.*/;
        for(var i=0; i<archivos.length; i++){
            const archivo = archivos[i];

            if(archivo.type.match(tipoTexto)){
                this.listaCanciones.push(archivo);
            }
        }

        this.mostrarEnLista(posicionUltimaCancion);
    }

    iniciarReproductor(){
        const sections = document.querySelectorAll('section');

        let dropArea = sections[1];
        dropArea.setAttribute('data-vacia', 'true');

        dropArea.addEventListener('dragover', function(event) {
            event.preventDefault(); // Evitar el comportamiento predeterminado
        });

        dropArea.addEventListener('drop', function(event) {
            event.preventDefault(); // Evitar el comportamiento predeterminado
            var articulo = "article[data-posicionEnLista='"+event.dataTransfer.getData('text/plain')+"']";
            const article = document.querySelector(articulo);
            article.dataset.reproduciendo = "enLista";

            dropArea.querySelector('main').appendChild(article);

            dropArea.dataset.vacia = "false";
        });

        const boton = document.querySelectorAll('button');
        boton[0].addEventListener('click', this.reproducirCancion.bind(this));
        boton[1].addEventListener('click', this.quitarCancion.bind(this));
    }

    mostrarEnLista(posicionUltimaCancion){

        const sections = document.querySelectorAll('section');
        const section = sections[0];

        for(let i=posicionUltimaCancion; i<this.listaCanciones.length; i++){

            const article = document.createElement('article');
            article.setAttribute('data-posicionEnLista', i);
            article.setAttribute('data-reproduciendo', 'noLista');
            article.setAttribute('draggable', "true");

            article.addEventListener('dragstart', function(event) {
                event.dataTransfer.setData('text/plain', event.target.getAttribute('data-posicionEnLista'));
            });

            article.textContent = this.listaCanciones[i].name;

            section.appendChild(article);
        }
    }

    reproducirCancion(){

        if(this.cancionReproduciendo === null){

            const article = document.querySelector('article[data-reproduciendo="enLista"]');

            article.dataset.reproduciendo = "reproduciendo";
    
            this.cancionReproduciendo = article;

            // Crear un nuevo contexto de audio
            var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
            const posicionArticle = article.dataset.posicionenlista;
            const file = this.listaCanciones[posicionArticle];
            const url = URL.createObjectURL(file)

            // Cargar el archivo de audio
            var audioElement = new Audio(url);
            this.audioElement = audioElement;

    
            // Decodificar el archivo de audio
            audioElement.addEventListener('canplay', function() {
                var source = audioContext.createMediaElementSource(audioElement);
                
                // Conectar el elemento de audio al contexto de audio
                source.connect(audioContext.destination);
            });

            var reproductor = this;
            audioElement.addEventListener('ended', function() {
                reproductor.quitarCancion();
              });


            const volumeControl = document.querySelector('input[data-action="volume"]');
            audioElement.volume = volumeControl.value;


            
            volumeControl.addEventListener('input', function() {
                audioElement.volume = this.value;
            });
    
        }
        
        if(this.audioElement.paused){
            this.audioElement.play();
        }else{
            this.audioElement.pause();
        }
    }

    quitarCancion(){

        const cancionReproduciendo = this.cancionReproduciendo;

        document.querySelector('section main').removeChild(cancionReproduciendo);
        cancionReproduciendo.dataset.reproduciendo = "noLista";

        var section = document.querySelectorAll('section')[0];
        section.appendChild(cancionReproduciendo);

        if(document.querySelectorAll('article[data-reproduciendo="enLista"]').length > 0){
            this.cancionReproduciendo = null;
            this.audioElement.pause();
            this.reproducirCancion();
        }else{
            this.cancionReproduciendo = null;
            section = document.querySelectorAll('section')[1];
            section.dataset.vacia = "true";
            this.audioElement.pause();
        }
    }
}