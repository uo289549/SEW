"use strict"; //comprobacion estricta de tipos
class Noticias{
    constructor(){
        if (!(window.File && window.FileReader && window.FileList && window.Blob)){
            alert("El navegador no soporta el API File y el programa no puede funcionar correctamente");
        }
        const boton = document.querySelector('button');
        boton.addEventListener('click', this.añadirNoticia.bind(this));
    }

    readInputFile(archivos){
        const archivo = archivos[0];
        let textoArchivo = null;

        const tipoTexto = /text.*/;
        if(archivo.type.match(tipoTexto)){
            const lector = new FileReader();
            lector.onload = function(){
                textoArchivo = lector.result;
                const noticias = textoArchivo.split("\n");

                for(let i = 0; i < noticias.length; i++){
                    const noticia = noticias[i].split("_");
        
                    const main = document.querySelector('main');
                    const article = document.createElement('article');
                    main.appendChild(article);
        
                    const titulo = document.createElement('h3');
                    titulo.textContent = noticia[0];
                    article.appendChild(titulo);
        
                    const subtitulo = document.createElement('h4');
                    subtitulo.textContent = noticia[1];
                    article.appendChild(subtitulo);
        
                    const textoNoticia = document.createElement('p');
                    textoNoticia.textContent = noticia[2];
                    article.appendChild(textoNoticia);
        
                    const autor = document.createElement('p');
                    autor.textContent = "Autor: "+noticia[3];
                    article.appendChild(autor);
                }

            };
            lector.readAsText(archivo);
        }else{
            noticia.textContent = "Error : ¡¡¡ Archivo no válido !!!";
        }

        
    }

    añadirNoticia(){
        const inputs = document.querySelectorAll('input');

        const main = document.querySelector('main');
        const article = document.createElement('article');
        main.appendChild(article);
                
        const titulo = document.createElement('h3');
        titulo.textContent = inputs[1].value;
        article.appendChild(titulo);
                
        const subtitulo = document.createElement('h4');
        subtitulo.textContent = inputs[2].value;
        article.appendChild(subtitulo);
                
        const textoNoticia = document.createElement('p');
        textoNoticia.textContent = inputs[3].value;
        article.appendChild(textoNoticia);
                
        const autor = document.createElement('p');
        autor.textContent = "Autor: "+inputs[4].value;
        article.appendChild(autor);
    }
}