"use strict"; //comprobacion estricta de tipos
class Agenda {
    constructor() {
        this.url = "http://ergast.com/api/f1/current";
        this.last_api_call = null;
        this.last_api_result = null;

        const boton = document.querySelector('button');
        boton.addEventListener('click', this.clickarBoton.bind(this));
        const container = document.querySelector('body');

        const section = document.createElement('section');
        container.appendChild(section);
    }

    clickarBoton() {
        this.getRaceSchedule();
    }

    getRaceSchedule() {

        const diferencia = (new Date() - this.last_api_call) / (1000 * 60);

        if(diferencia < 10){
            mostrarDatos(this.last_api_result);
        }else{
            $.ajax({
                dataType: "xml",
                url: this.url,
                method: 'GET',
                success: function(datos){
                        //Presentación del archivo XML en modo texto
                        const section = document.querySelector('section');
                        $('section').empty();

                        const h2Node = document.createElement('h2');
                        h2Node.textContent = 'Carreras temporada actual';
                        section.appendChild(h2Node);
    
                        this.last_api_result = datos;
                        this.last_api_call = new Date();
                    
                        const totalCarreras = $('Race',datos).length;
    
                        for (let i = 0; i < totalCarreras; i++) {
                            const article = document.createElement('article');

                            const nombreCarrera = $('RaceName',datos).eq(i).text();
                            const nombreCircuito = $('CircuitName',datos).eq(i).text();
                            const latitudCircuito = $('Location ',datos).eq(i).attr('lat');
                            const longitudCircuito = $('Location ',datos).eq(i).attr('long');
                            const fechaCarrera = $('Date',datos).eq(i).text();
                            const horaCarrera = $('Time',datos).eq(i).text();

                            let parrafo = document.createElement('p');
                            parrafo.textContent = nombreCarrera;
                            article.appendChild(parrafo);

                            parrafo = document.createElement('p');
                            parrafo.textContent = "En: "+nombreCircuito;
                            article.appendChild(parrafo);

                            parrafo = document.createElement('p');
                            parrafo.textContent = "Ubicado en las coordenadas: "+latitudCircuito+", "+longitudCircuito;
                            article.appendChild(parrafo);
                            
                            parrafo = document.createElement('p');
                            parrafo.textContent = "Fecha: "+fechaCarrera+", a las: "+horaCarrera;
                            article.appendChild(parrafo);

                            section.appendChild(article);
                        }
                    },
                error:function(){
                    $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://ergast.com/mrd/'>Ergast</a>"); 
                    }
            });
        }
    }

    mostrarDatos(datos){

        const section = document.querySelector('section');
        $('section').empty();

        const h2Node = document.createElement('h2');
        h2Node.textContent = 'Carreras temporada actual';
        section.appendChild(h2Node);

        const totalCarreras = $('Race',datos).length;
    
        for (let i = 0; i < totalCarreras; i++) {
            const article = document.createElement('article');

            const nombreCarrera = $('RaceName',datos).eq(i);
            const nombreCircuito = $('CircuitName',datos).eq(i);
            const latitudCircuito = $('Location ',datos).eq(i).attr('lat');
            const longitudCircuito = $('Location ',datos).eq(i).attr('long');
            const fechaCarrera = $('Date',datos).eq(i);
            const horaCarrera = $('Time',datos).eq(i);

            let parrafo = document.createElement('p');
            parrafo.textContent = nombreCarrera;
            article.appendChild(parrafo);

            parrafo = document.createElement('p');
            parrafo.textContent = "En: "+nombreCircuito;
            article.appendChild(parrafo);

            parrafo = document.createElement('p');
            parrafo.textContent = "Ubicado en las coordenadas: "+latitudCircuito+", "+longitudCircuito;
            article.appendChild(parrafo);
            
            parrafo = document.createElement('p');
            parrafo.textContent = "Fecha: "+fechaCarrera+", a las: "+horaCarrera;
            article.appendChild(parrafo);

            section.appendChild(article);
        }

    }
}