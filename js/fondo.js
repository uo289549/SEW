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
            indiceFoto = Math.floor(Math.random() * 20)+1;
            var foto = data.items[indiceFoto];
            $('body').css('background-image',foto).css('background-size', 'cover');
        }
        );
    }

}