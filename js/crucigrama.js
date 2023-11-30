"use strict"; //comprobacion estricta de tipos
class Crucigrama{
    constructor(dificultad) {
        this.board = null;
        this.numColumnas = 9;
        this.numFilas = 11;
        this.initTime = null;
        this.endTime = null;
        this.tablero = null;
        this.escogerDificultad(dificultad);
        this.iniciarTablero();
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
        for (let i = 0; i < this.board.length; i++) {
            const caracter = this.board[i];
            if (caracter === ".") {
                this.tablero[fila][columna] = 0;
            }else if(caracter === "#"){
                this.tablero[fila][columna] = -1;
            }else{
                this.tablero[fila][columna] = Number.parseInt(caracter);
            }

            columna++;
            if(columna === this.numColumnas){
                columna = 0;
                fila++;
            }
          }
    }
}