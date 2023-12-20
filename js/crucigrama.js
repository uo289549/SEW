"use strict"; //comprobacion estricta de tipos
class Crucigrama{
    constructor(dificultad) {
        this.board = null;
        this.numColumnas = 9;
        this.numFilas = 11;
        this.init_Time = null;
        this.end_Time = null;
        this.tablero = null;
        this.dificultadSeleccionada = dificultad;
        this.escogerDificultad(dificultad);
        this.iniciarTablero();

        this.eventoPulsacion = (event) => this.pulsarTecla(event);
    }

    escogerDificultad(dificultad){
        switch(dificultad){
            case "facil":
                this.board = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";
                break;
            case "medio":
                this.board = "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32";
                break;
            case "dificil":
                this.board = "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72";
                break;
        }
    }

    iniciarTablero(){
        this.tablero = new Array(this.numFilas);
        for(let i = 0; i < this.tablero.length; i++) {
            this.tablero[i] = new Array(this.numColumnas);
        }
    }

    start(){
        let fila = 0;
        let columna = 0;

        const caracteres = this.board.split(",");

        for (let i = 0; i < caracteres.length; i++) {
            const caracter = caracteres[i];
            if (caracter === ".") {
                this.tablero[fila][columna] = 0;
            }else if(caracter === "#"){
                this.tablero[fila][columna] = -1;
            }else{
                this.tablero[fila][columna] = caracter;
            }

            columna++;
            if(columna === this.numColumnas){
                columna = 0;
                fila++;
            }
          }
    }

    paintMathword(){
        

        window.addEventListener('keydown',this.eventoPulsacion);

        for (let fila = 0; fila < this.numFilas; fila++) {
            for (let columna = 0; columna < this.numColumnas; columna++) {

                const parrafo = $('<p>');
                
                if(this.tablero[fila][columna] === 0){
                    parrafo.on('click', this.clickarCasilla.bind(parrafo, this));
                    parrafo.attr('data-state',"initial");
                    parrafo.attr('data-fila',fila);
                    parrafo.attr('data-columna',columna);
                }else if(this.tablero[fila][columna] === -1){
                    parrafo.attr('data-state',"empty");
                }else{
                    parrafo.text(this.tablero[fila][columna]);
                    parrafo.attr('data-state',"blocked");
                }

                $('main').append(parrafo);

            }
        }
        this.init_Time = new Date();
    }

    clickarCasilla(crucigrama){
        if(this.attr( "data-state" ) === "blocked" ){
            return;
        }

        const casillas = $('p');
        let casilla = null;

        for(let i = 0; i < casillas.length; i++){
            casilla = casillas[i];
            if(casilla.dataset.state === "clicked"){
                casilla.dataset.state = "initial";
            }
        }

        this.attr( "data-state", "clicked");
    }

    pulsarTecla(event){
        const casillas = $('p');
        let casilla = null;

        for(let i = 0; i < casillas.length; i++){
            const parrafo = casillas[i];
            if(parrafo.dataset.state === "clicked"){
                casilla = parrafo;
            }
        }
        const valoresValidos = "+-/*123456789";

        let key = null;
        if(valoresValidos.includes(event)){
            key = event;
        }else{
            key = event.key;
        }

        if(casilla != null && valoresValidos.includes(key)){
            this.introduceElement(casilla, key);
        }else if(casilla === null){
            alert("Por favor seleccione una casilla");
        }else{
            alert("Seleccione un numero del 1 al 9 o un operador entre los siguientes: +, -, *, /");
        }
    }

    introduceElement(casilla, key){
        let expression_row = true;
        let expression_col = true;

        const fila = parseInt(casilla.dataset.fila);
        const columna = parseInt(casilla.dataset.columna);

        this.tablero[fila][columna] = key;
        let first_number = 0;
        let second_number = 0;
        let expression = 0;
        let result = 0;

        //comprobamos la expresion horizontal
        if(columna < this.numColumnas-1){
            if(this.tablero[fila][columna+1] != -1){
                let i = 1;
                while(this.tablero[fila][columna+i] != "="){
                    i++;
                }
                const igual = columna + i;
                first_number = this.tablero[fila][igual-3];
                second_number = this.tablero[fila][igual-1];
                expression = this.tablero[fila][igual-2];
                result = this.tablero[fila][igual+1];
            }
        }

        if(first_number != 0 && second_number!= 0 && expression!= 0 && result!= 0){

            if(expression != "/" && expression != "*" && expression!= "+" && expression!= "-"){
                alert("La expresion no esta colocada correctamente");
                expression_row = false;
            }else{
                const  mathExpression = [first_number, expression, second_number].join('');
                const evalResult = eval(mathExpression);

                if(result != evalResult){
                    expression_row = false;
                }
            }
        }

        first_number = 0;
        second_number = 0;
        expression = 0;
        result = 0;

        //comprobamos la expresion vertical
        if(fila < this.numFilas-1){
            if(this.tablero[fila+1][columna]!= -1){
                let i = 1;
                while(this.tablero[fila+i][columna]!= "="){
                    i++;
                }
                const igual = fila + i;
                first_number = this.tablero[igual-3][columna];
                second_number = this.tablero[igual-1][columna];
                expression = this.tablero[igual-2][columna];
                result = this.tablero[igual+1][columna];
            }
        }

        if(first_number != 0 && second_number!= 0 && expression!= 0 && result!= 0){

            if(expression != "/" && expression != "*" && expression!= "+" && expression!= "-"){
                alert("La expresion no esta colocada correctamente");
                expression_col = false;
            }else{
                const  mathExpression = [first_number, expression, second_number].join('');
                const evalResult = eval(mathExpression);

                if(result != evalResult){
                    expression_col = false;
                }
            }
        }

        //comprobamos que el valor introducido es correcto en vertical y horizontal
        if(expression_row && expression_col){
            casilla.dataset.state =  "correct";
            casilla.textContent = key;
        }else{
            this.tablero[fila][columna] = 0;
            casilla.dataset.state =  "initial";
            alert("El valor introducido no es correcto para esta casilla");
        }

        if(this.check_win_condition()){
            this.end_Time = new Date();
            const dif = this.calculate_date_difference();
            alert("Has ganado en " + this.convertSecondsToHoursMinutsAndSeconds(dif) + " segundos");
            this.createRecordForm(dif);
        }

    }

    check_win_condition(){
        for(let fila = 0; fila < this.numFilas; fila++){
            for(let columna = 0; columna < this.numColumnas; columna++){
                if(this.tablero[fila][columna] === 0){
                    return false;
                }
            }
        }
        return true;
    }

    calculate_date_difference(){
        const dif = this.end_Time - this.init_Time;

        return dif;
    }

    convertSecondsToHoursMinutsAndSeconds(dif){
        let horas = Math.floor(dif / 1000 / 60 / 60);
        let minutos = Math.floor((dif / 1000 / 60) % 60);
        let segundos = Math.floor((dif / 1000) % 60);
        return horas + ':' + minutos + ':' + segundos;
    }

    createRecordForm(dif){
        window.removeEventListener('keydown', this.eventoPulsacion);

        var nivel = this.dificultadSeleccionada;
        var diferencia = this.convertSecondsToHoursMinutsAndSeconds(dif);
        $(document).ready(function(){
            const formulario = $('<form>');
            formulario.attr('action', '#');
            formulario.attr('method', 'post');
            formulario.attr('name', 'crucigrama');
    
            //Campo nombre
            var label = $('<label>');
            label.text("Nombre:");
            label.attr('for','nombre');
    
            var input = $('<input>');
            input.attr('type','text');
            input.attr('id','nombre');
            input.attr('name','nombre');
            input.attr('value','');
    
            formulario.append(label);
            formulario.append(input);
            
            //Campo apellidos
            label = $('<label>');
            label.text("Apellidos:");
            label.attr('for','apellidos');
    
            input = $('<input>');
            input.attr('type','text');
            input.attr('id','apellidos');
            input.attr('name','apellidos');
            input.attr('value','');
    
            formulario.append(label);
            formulario.append(input);
    
            //Campo nivel
            label = $('<label>');
            label.text("Nivel:");
            label.attr('for','nivel');
    
            input = $('<input>');
            input.attr('type','text');
            input.attr('id','nivel');
            input.attr('name','nivel');
            input.attr('value',nivel);
            input.attr('readonly','');
    
            formulario.append(label);
            formulario.append(input);
    
            //Campo tiempo
            label = $('<label>');
            label.text("Tiempo:");
            label.attr('for','tiempo');
    
            input = $('<input>');
            input.attr('type','text');
            input.attr('id','tiempo');
            input.attr('name','tiempo');
            input.attr('value',diferencia);
            input.attr('readonly','');
    
            formulario.append(label);
            formulario.append(input);
    
            input = $('<input>');
            input.attr('type','submit');
            input.attr('id','Enviar');
            input.attr('value','Enviar');
            formulario.append(input);
    
            $('main').after(formulario);
    
        });
    }

    crearInstrucciones(){
        const article = document.querySelector('article');
        let p = document.createElement('p');
        switch(this.dificultadSeleccionada){
            case "facil":
                p.textContent = "Esto es un crucigrama matematico que consiste en rellenar las casillas vacias con los numeros que resuelvan las operaciones en vertical y horizontal. Ejemplo: tenemos una casilla con un '2', la siguiente con un '+', la siguiente vacia, la siguiente con un '=' y la siguiente con un 5. En este caso en la casilla vacia habria que introducir un '3'.";
                article.appendChild(p);

                p = document.createElement('p');
                p.textContent = "Si te equivocas al introducir un numero solo tienes que volver a seleccionar la casilla deseada e introducir el numero deseado.";
                article.appendChild(p);

                p = document.createElement('p');
                p.textContent = "Para resolver el crucigrama desde un ordenador debe primero clicar en la casilla vacia en la que quiere introducir el numero y seguido de esto pulsar en el teclado el numero que deseas introducir. En caso de ser el correcto se pintara en la casilla seleccionada, en caso de que no lo sea se le indicara que no era el numero correcto.";
                article.appendChild(p);

                p = document.createElement('p');
                p.textContent = "Para resolver el crucigrama desde una pantalla tactil debe primero pulsar la casilla vacia en la que quiere introducir el numero y seguido de esto pulsar en los botones situados debajo del crucigrama el numero que deseas introducir. En caso de ser el correcto se pintara en la casilla seleccionada, en caso de que no lo sea se le indicara que no era el numero correcto.";
                article.appendChild(p);

                break;
            case "medio":
                
                p.textContent = "Esto es un crucigrama matematico que consiste en rellenar las casillas vacias con los numeros que resuelvan las operaciones en vertical y horizontal. Ejemplo: tenemos una casilla con un '2', la siguiente con un '+', la siguiente vacia, la siguiente con un '=' y la siguiente con un 5. En este caso en la casilla vacia habria que introducir un '3'.";
                article.appendChild(p);

                p = document.createElement('p');
                p.textContent = "Si te equivocas al introducir un numero solo tienes que volver a seleccionar la casilla deseada e introducir el numero deseado.";
                article.appendChild(p);

                p = document.createElement('p');
                p.textContent = "Para resolver el crucigrama desde un ordenador debe primero clicar en la casilla vacia en la que quiere introducir el numero y seguido de esto pulsar en el teclado el numero que deseas introducir. En caso de ser el correcto se pintara en la casilla seleccionada, en caso de que no lo sea se le indicara que no era el numero correcto";
                article.appendChild(p);

                p = document.createElement('p');
                p.textContent = "Para resolver el crucigrama desde una pantalla tactil debe primero pulsar la casilla vacia en la que quiere introducir el numero y seguido de esto pulsar en los botones situados debajo del crucigrama el numero que deseas introducir. En caso de ser el correcto se pintara en la casilla seleccionada, en caso de que no lo sea se le indicara que no era el numero correcto.";
                article.appendChild(p);
                
                break;
            case "dificil":

                p.textContent = "Esto es un crucigrama matematico que consiste en rellenar las casillas vacias con los numeros y operandos que resuelvan las operaciones en vertical y horizontal. Ejemplo: tenemos una casilla con un '2', la siguiente con un '+', la siguiente vacia, la siguiente con un '=' y la siguiente con un 5. En este caso en la casilla vacia habria que introducir un '3'. Otro ejemplo: tenemos una casilla con un '2', la siguiente vacia, la siguiente con un '3', la siguiente con un '=' y la siguiente con un 5. En este caso en la casilla vacia habria que introducir un '+'.";
                article.appendChild(p);

                p = document.createElement('p');
                p.textContent = "Si te equivocas al introducir un numero/operando solo tienes que volver a seleccionar la casilla deseada e introducir el numero/operando deseado.";
                article.appendChild(p);

                p = document.createElement('p');
                p.textContent = "Para resolver el crucigrama desde un ordenador debe primero clicar en la casilla vacia en la que quiere introducir el numero u operando y seguido de esto pulsar en el teclado en numero u operando que deseas introducir. En caso de ser el correcto se pintara en la casilla seleccionada, en caso de que no lo sea se le indicara que no era el numero u operando correcto";
                article.appendChild(p);

                p = document.createElement('p');
                p.textContent = "Para resolver el crucigrama desde una pantalla tactil debe primero pulsar la casilla vacia en la que quiere introducir el numero u operando y seguido de esto pulsar en los botones situados debajo del crucigrama el numero u operando que deseas introducir. En caso de ser el correcto se pintara en la casilla seleccionada, en caso de que no lo sea se le indicara que no era el numero u operando correcto.";
                article.appendChild(p);

                break;
        }
    }
}