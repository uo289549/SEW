"use strict"; //comprobacion estricta de tipos
class Viajes{
    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
        this.longitud = null;
        this.latitud = null;
        this.precision = null;
        this.altitud = null;
        this.precisionAltitud = null;

        this.mapaEstaticoCreado = false;
        this.mapaDinamicoCreado = false;
        this.contenidoXml = null;
        this.mapaParaKML = null;
        this.numRuta = 0;

        this.añadirEventoBotones();
    }

    getPosicion(posicion){
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
    }

    verErrores(error){
        switch(error.code){
            case error.PERMISSION_DENIED:
                alert("El usuario no ha dado permiso para acceder a la ubicación");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Informacion de la ubicación no disponible");
                break;
            case error.TIMEOUT:
                alert("Tiempo de espera excedido");
                break;
            case error.UNKNOWN_ERROR:
                alert("Error desconocido");
                break;
        }
    }

    añadirEventoBotones(){
        const boton = document.querySelectorAll('button');
        boton[0].addEventListener('click', this.mostrarMapaEstatico.bind(this));
        boton[1].addEventListener('click', this.mostrarMapaDinamico.bind(this));
    }

    mostrarMapaEstatico(){
        if(!this.mapaEstaticoCreado){
            this.mapaEstaticoCreado = true;

            const section = document.querySelector("section");


            var apiKey = "pk.eyJ1IjoidW8yODk1NDkiLCJhIjoiY2xwbzNmeHQ0MDVtaDJpbDNoNDljM3R0ZSJ9.rx6By1f83P_Kg1HKG4aEjA";
    
            const username = "mapbox";
            const style_id = "streets-v12";
            const overlay = "pin-s+000("+Number.parseFloat(this.longitud)+","+Number.parseFloat(this.latitud)+")";
            const zoom ="12";
            const width = "600";
            const height = "600";
    
            const url = "https://api.mapbox.com/styles/v1/"+username+"/"+style_id+"/static/"+overlay+"/"+this.longitud+","+this.latitud+","+zoom+"/"+width+"x"+height+"?access_token="+apiKey;
    
            const img = document.createElement("img");
            img.setAttribute("src", url);
            img.setAttribute("alt", "mapa estático de mapbox");
            section.appendChild(img);
    
        }else{
            alert("Ya se ha creado el mapa estático");
        }
    }

    mostrarMapaDinamico(){
        if(!this.mapaDinamicoCreado){
            this.mapaDinamicoCreado = true;

            const section = document.querySelector("section");


            const article = document.createElement("article");
            article.setAttribute("id", "mapa");
            section.appendChild(article);
    
    
            mapboxgl.accessToken = 'pk.eyJ1IjoidW8yODk1NDkiLCJhIjoiY2xwbzNmeHQ0MDVtaDJpbDNoNDljM3R0ZSJ9.rx6By1f83P_Kg1HKG4aEjA';
            const map = new mapboxgl.Map({
                container: 'mapa', // container ID
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                center: [this.longitud, this.latitud], // starting position [lng, lat]
                zoom: 9 // starting zoom
            });
    
            const long = this.longitud;
            const lat = this.latitud;
    
            new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);    
        }
    }

    readInputFile(archivos){
        const archivo = archivos[0];
        const viajes = this;

        const tipoTexto = /text.*/;
        if(archivo.type.match(tipoTexto)){
            const lector = new FileReader();
            lector.onload = function(){
                viajes.crearXml(lector.result);
            };
            lector.readAsText(archivo);
        }else{
            alert("Error : ¡¡¡ Archivo no válido !!!");
        }
    }

    crearXml(xmlString){

        const xml = $.parseXML(xmlString);
        const viajes = this;

        $(xml).find('ruta').each(function() {
            const sections = document.querySelectorAll("section");
            const section = sections[1];
            const article = document.createElement("article");
            section.appendChild(article);


            var nombre = $(this).find('nombre').text();
            let p = document.createElement('p');
            p.textContent = "Nombre de ruta: "+nombre;
            article.appendChild(p);

            var tipo = $(this).find('tipo').text();
            p = document.createElement('p');
            p.textContent = "Tipo: "+tipo;
            article.appendChild(p);

            var medioTransporte = $(this).find('medioTransporte').text();
            p = document.createElement('p');
            p.textContent = "Medio de transporte: "+medioTransporte;
            article.appendChild(p);

            $(this).find('fechaInicio').each(function() {
    
                var fechaInicio = $(this).text();
                p = document.createElement('p');
                p.textContent = "Fecha de incio: "+fechaInicio;
                article.appendChild(p);
            });

            $(this).find('horaInicio').each(function() {

                var horaInicio = $(this).text();
                p = document.createElement('p');
                p.textContent = "Hora de inico: "+horaInicio;
                article.appendChild(p);
            });

            var duracion = $(this).find('duracion').text();
            p = document.createElement('p');
            p.textContent = viajes.convertirDurationXMLATexto(duracion);
            article.appendChild(p);

            var agencia = $(this).find('agencia').text();
            p = document.createElement('p');
            p.textContent = "Agencia: "+agencia;
            article.appendChild(p);

            var descripcion = $(this).find('descripcion').text();
            p = document.createElement('p');
            p.textContent = "Descripcion: "+descripcion;
            article.appendChild(p);

            var personasAdecuadas = $(this).find('personasAdecuadas').text();
            p = document.createElement('p');
            p.textContent = "Personas adecuadas: "+personasAdecuadas;
            article.appendChild(p);

            var lugarInicio = $(this).find('lugarInicio').text();
            p = document.createElement('p');
            p.textContent = "Lugar de inicio: "+lugarInicio;
            article.appendChild(p);

            var direccionInicio = $(this).find('direccionInicio').text();
            p = document.createElement('p');
            p.textContent = "Direccion de inicio: "+direccionInicio;
            article.appendChild(p);

            $(this).find('coordenadas').each(function() {

                var longitud = $(this).find('longitud').text();

                var latitud = $(this).find('latitud').text();

                var altitud = $(this).find('altitud').text();

                p = document.createElement('p');
                p.textContent = "Coordenadas: "+longitud+","+latitud+","+altitud;
                article.appendChild(p);
            });

            $(this).find('referencias').each(function() {
         
                var referencia = $(this).text();

                var a = document.createElement('a');

                a.setAttribute('href', referencia);

                var str = referencia.split('/');
                a.setAttribute('title', str[2]);
                a.textContent = str[2];

                var p = document.createElement('p');
                p.textContent = "Referencia: ";
                p.appendChild(a);
                article.appendChild(p);
            });


            var recomendacion = $(this).find('recomendacion').text();
            p = document.createElement('p');
            p.textContent = "Recomendacion: "+recomendacion;
            article.appendChild(p);

            $(this).find('hitos').each(function() {

                p = document.createElement('p');
                p.textContent = "Hitos: ";
                article.appendChild(p);

                var articleHito = document.createElement("article");
                article.appendChild(articleHito);

                $(this).find('hito').each(function() {
                
                    var nombreHito = $(this).find('nombreHito').text();
                    p = document.createElement('p');
                    p.textContent = "Nombre del hito: "+nombreHito;
                    articleHito.appendChild(p);
    
                    var descripcionHito = $(this).find('descripcionHito').text();
                    p = document.createElement('p');
                    p.textContent = "Descripcion: "+descripcionHito;
                    articleHito.appendChild(p);
    
                    $(this).find('coordenadasHito').each(function() {
            
                        var longitud = $(this).find('longitud').text();
        
                        var latitud = $(this).find('latitud').text();   
        
                        var altitud = $(this).find('altitud').text();
    
                        p = document.createElement('p');
                        p.textContent = "Coordenadas del hito: "+longitud+","+latitud+","+altitud;
                        articleHito.appendChild(p);
                    });
    
                    var distanciaDesdeAnterior = $(this).find('distanciaDesdeAnterior').text();
                    p = document.createElement('p');
                    p.textContent = "Distancia desde el anterior: "+distanciaDesdeAnterior +" "+ $(this).find('distanciaDesdeAnterior').attr('unidades');
                    articleHito.appendChild(p);

                    p = document.createElement('p');
                    p.textContent = "Galeria de fotografías: ";
                    articleHito.appendChild(p);
    
                    $(this).find('galeriaFotografica').each(function() {
                     
                        var galeriaFotografica = $(this).text();
                        var img = document.createElement('img');
                        img.setAttribute("src","xml/"+galeriaFotografica);
                        img.setAttribute("alt", galeriaFotografica.split(".")[0]);
                        articleHito.appendChild(img);
                    });

                    var tituloCreado = false;
                    $(this).find('galeriaVideos').each(function() {
                        if(tituloCreado === false){
                            p = document.createElement('p');
                            p.textContent = "Galeria de videos: ";
                            articleHito.appendChild(p);
                            tituloCreado = true;
                        }
                       
                        var galeriaVideos = $(this).text();
                        var video = document.createElement('video');
                        video.setAttribute("controls","auto");

                        var source = document.createElement('source');
                        source.setAttribute("src","xml/"+galeriaVideos);
                        source.setAttribute("type", "video/mp4");
                        video.appendChild(source);
                        articleHito.appendChild(video);
                    });;
                });
            });
        });
    }

    convertirDurationXMLATexto(duracionXML){
        var duracion = duracionXML.substring(1); // Eliminar el carácter 'P'

        var textoDuracion = 'Duración: ';
        var partes = duracion.match(/[0-9]+[YMWDTHS]/g);

        partes.forEach(function (parte) {
            var valor = parseInt(parte.match(/[0-9]+/)[0]);
            var unidad = parte.match(/[YMWDTHS]/)[0];
    
            switch (unidad) {
                case 'D':
                    textoDuracion += valor + ' días ';
                    break;
                case 'H':
                    textoDuracion += valor + ' horas ';
                    break;
                case 'M':
                    textoDuracion += valor + ' minutos ';
                    break;
                case 'S':
                    textoDuracion += valor + ' segundos ';
                    break;
                default:
                    break;
            }
        });
    
        return textoDuracion.trim();

    }

    readInputKML(){

        const archivos = document.querySelector('input[name="kml"]').files;

        for(var i=0; i<archivos.length; i++){
            const archivo = archivos[i];
            const viajes = this;

            const tipoTexto = "";
            if(archivo.type.match(tipoTexto)){
                const lector = new FileReader();
                lector.onload = function(){
                    viajes.añadirRutaKML(lector.result);
                };
                lector.readAsText(archivo);
            }else{
                alert("Error : ¡¡¡ Archivo no válido !!!");
            }
        }
    }

    crearMapaParaKML(long, lat){
        const sections = document.querySelectorAll("section");
        const section = sections[2];

        const article = document.createElement("article");
        article.setAttribute("id", "mapaKML");
        section.appendChild(article);

        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yODk1NDkiLCJhIjoiY2xwbzNmeHQ0MDVtaDJpbDNoNDljM3R0ZSJ9.rx6By1f83P_Kg1HKG4aEjA';
        const map = new mapboxgl.Map({
            container: 'mapaKML', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [long, lat], // starting position [lng, lat]
            zoom: 7 // starting zoom
        });

        return map;
    }

    añadirRutaKML(kmlString,numRuta){
        const kml = $.parseXML(kmlString);

        if(this.mapaParaKML === null){
            var coordenadas = $(kml).find('coordinates').text();

            var coordenadasArray = coordenadas.split('\n');
            var coordenadasPto1 = coordenadasArray[1].split(',');

            const long = parseFloat(coordenadasPto1[0]);
            const lat = parseFloat(coordenadasPto1[1]);

            this.mapaParaKML = this.crearMapaParaKML(long, lat);
        }

        const mapa = this.mapaParaKML;

        var data = toGeoJSON.kml(kml);

        const sourceName = 'rutaKML'+(this.numRuta+1);
        const idName = 'kmlLayer' + (this.numRuta+1);
        this.numRuta++;


        mapa.on('load', function() {
            mapa.addSource(sourceName, {
                type: 'geojson',
                data: data
            });
        
            mapa.addLayer({
                id: idName,
                type: 'line', // Tipo de capa (puede variar según el tipo de datos)
                source: sourceName,
                paint: {
                    'line-color': '#FF0000', // Color de linea
                    'line-width': 1 // Ancho de linea
                }
            });
        });

    }

    readInputSVG(){

        const archivos = document.querySelector('input[name="svg"]').files;

        for(var i=0; i<archivos.length; i++){
            const archivo = archivos[i];
            const viajes = this;

            const tipoTexto = "";
            if(archivo.type.match(tipoTexto)){
                const lector = new FileReader();
                lector.onload = function(){
                    viajes.añadirSVG(lector.result);
                };
                lector.readAsText(archivo);
            }else{
                alert("Error : ¡¡¡ Archivo no válido !!!");
            }
        }
    }

    añadirSVG(svgString){
        const sections = document.querySelectorAll('section');
        const section = sections[3];

        const svgParseado = $.parseXML(svgString);

        const xmlns = $(svgParseado).find('svg').attr('xmlns');
        const version = $(svgParseado).find('svg').attr('version');

        var svgElement = document.createElementNS(xmlns, "svg");
        svgElement.setAttribute("xmlns", xmlns);
        svgElement.setAttribute("version", version);
        svgElement.innerHTML = svgString;

        section.appendChild(svgElement);
    }
}