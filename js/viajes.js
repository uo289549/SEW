"use strict"; //comprobacion estricta de tipos
class Viajes{
    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
        this.longitud = null;
        this.latitud = null;
        this.precision = null;
        this.altitud = null;
        this.precisionAltitud = null;
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
}