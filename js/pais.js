"use strict"; //comprobacion estricta de tipos
class Pais{
    constructor(nombrePais, nombreCapital, numPoblacion){
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.numPoblacion = numPoblacion;
        this.tipoGobierno = "";
        this.coordenadasCapital = "";
        this.religion = "";
    }

    completarPais(tipoGobierno,coordenadasCapital,religion){
        this.tipoGobierno = tipoGobierno;
        this.coordenadasCapital = coordenadasCapital;
        this.religion = religion;
    }

    getNombrePais(){
        return this.nombrePais;
    }

    getNombreCapital(){
        return "Nombre de la capital: " + this.nombreCapital;
    }

    getPoblacion(){
        return "Numero de habitantes: " + this.numPoblacion + " Millones";
    }

    getInfoSecundaria(){
        return "<ul>\n<li>Gobierno: "+this.tipoGobierno+"</li>\n<li>Religion: "+this.religion+"</li>\n</ul>"
    }

    escribirCoordenadas(){
        document.write("<p>Coordenadas: "+this.coordenadasCapital+"</p>");
    }

    getPrevisionMeteorologica(){
        this.url = 'http://api.openweathermap.org/data/2.5/forecast?q='+this.nombreCapital+'&units=metric&appid=c877503c50e8a291a3d7555d854653f8';

        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                
                    //Presentación de los datos contenidos en JSON
                    const container = document.querySelector('body');

                    const section = document.createElement('section');
                    container.appendChild(section);

                    const h2Node = document.createElement('h2');
                    h2Node.textContent = 'Prevision meteorologica';
                    section.appendChild(h2Node);
                    
                    let listaDias = datos.list;

                    for (let i = 0; i < listaDias.length; i++) {

                        let datosDia = listaDias[i];
                        
                        const  fecha = datosDia.dt_txt.split(" ");

                        if(fecha[1] === "12:00:00"){
                            const article = document.createElement('article');


                            let parrafo = document.createElement('p');
                            parrafo.textContent = "Fecha: "+datosDia.dt_txt;
                            article.appendChild(parrafo);

                            parrafo = document.createElement('p');
                            parrafo.textContent = "Temperatura maxima: " + datosDia.main.temp_max + " grados Celsius";
                            article.appendChild(parrafo);

                            parrafo = document.createElement('p');
                            parrafo.textContent = "Temperatura minima: " + datosDia.main.temp_min + " grados Celsius";
                            article.appendChild(parrafo);

                            parrafo = document.createElement('p');
                            parrafo.textContent = "Humedad: " + datosDia.main.humidity + " %";
                            article.appendChild(parrafo);

                            const imagen = document.createElement('img');
                            imagen.setAttribute('src', "http://openweathermap.org/img/w/"+datosDia.weather[0].icon+".png");
                            imagen.setAttribute('alt', "Icono del tiempo");
                            article.appendChild(imagen);
                            // parrafo.textContent = datosDia.rain.3h + "3h";

                            section.appendChild(article);
                        }
                    }
                    
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                }
        });
    }
}