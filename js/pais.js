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

}