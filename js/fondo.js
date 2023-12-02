"use strict"; //comprobacion estricta de tipos
class Fondo{
    constructor(nombrePais, nombreCapital, coordenadasCapital){
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.coordenadasCapital = coordenadasCapital;
    }

    getImagenWeb(){
        var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI,{
            tags: this.nombreCapital,
            tagmode: "any",
            format: "json"
        }).done(function(data){
            let indiceFoto = Math.floor(Math.random() * 19)+1;
            let foto = data.items[indiceFoto];
            let fotoURL = foto.media.m;
            $('body').css('background-image','url('+fotoURL.replace('_m','_b')+')').css('background-size', 'cover');
        }
        );
    }

}