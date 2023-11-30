"use strict"; //comprobacion estricta de tipos

class Sudoku {
    constructor(dificultad) {

        this.cadena = null;
        this.numFilas = 9;
        this.numColumnas = 9;

        this.tablero = new Array(this.numFilas);
        this.escogerDificultad(dificultad);
        this.start();
    }


    escogerDificultad(dificultad){
        switch(dificultad){
            case "facil":
                this.cadena = "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6";
                break;
            case "medio":
                this.cadena = "23.94.67.8..3259149..76.32.1.....7925.321.4864..68.5317..1....96598721433...9...7";
                break;
            case "dificil":
                this.cadena = "8.4.71.9.976.3....5.196....3.7495...692183...4.5726..92483591..169847...753612984";
                break;
        }
    }

    start() {
        for(let i = 0; i < this.tablero.length; i++) {
            this.tablero[i] = new Array(this.numColumnas);
        }

        let fila = 0;
        let columna = 0;
        for (let i = 0; i < this.cadena.length; i++) {
            const caracter = this.cadena[i];
            if (caracter != ".") {
                this.tablero[fila][columna] = Number.parseInt(caracter);
            }else{
                this.tablero[fila][columna] = 0;
            }

            columna++;
            if(columna === this.numColumnas){
                columna = 0;
                fila++;
            }
          }
    }

    createStructure() {
        const container = document.querySelector('main');
        
        window.addEventListener('keydown', (event) => this.pulsarTecla(event));

        for (let fila = 0; fila < this.numFilas; fila++) {
            for (let columna = 0; columna < this.numColumnas; columna++) {

                const parrafo = document.createElement('p');
                
                if(this.tablero[fila][columna] === 0){
                    parrafo.addEventListener('click', this.clickarCasilla.bind(parrafo, this));
                    parrafo.setAttribute('data-state',"initial");
                    parrafo.setAttribute('data-fila',fila);
                    parrafo.setAttribute('data-columna',columna);
                }else{
                    parrafo.textContent = this.tablero[fila][columna];
                    parrafo.setAttribute('data-state',"blocked");
                }

                container.appendChild(parrafo);

            }
        }

    }

    paintSudoku(){
        this.createStructure();
    }

    clickarCasilla(sudoku){
        if(this.dataset.state === "blocked" ){
            return;
        }

        const casillas = document.querySelectorAll('p');
        casillas.forEach(casilla => {
            if(casilla.dataset.state === "clicked"){
                casilla.dataset.state = "initial";
            }
        });

        this.dataset.state = "clicked";
    }

    pulsarTecla(event){
        const casillas = document.querySelectorAll('p');
        let casilla = null;

        casillas.forEach(parrafo => {
            if(parrafo.dataset.state === "clicked"){
                casilla = parrafo;
            }
        });

        const key = Number.parseInt(event.key);

        if(casilla != null && key >= 1 &&  key <= 9){
            this.introduceNumber(casilla, key);
        }else if(casilla === null){
            alert("Por favor seleccione una casilla");
        }
    }

    introduceNumber(casilla, numero){
        for(let fila = 0; fila < this.numFilas; fila++){
            if(this.tablero[fila][casilla.dataset.columna] === numero){
                alert("Numero ya introducido en la columna"); 
                return;
            }
        }

        for(let columna = 0; columna < this.numColumnas; columna++){
            if(this.tablero[casilla.dataset.fila][columna] === numero){
                alert("Numero ya introducido en la fila"); 
                return;
            }
        }

        const filaSubCuadricula = Math.floor(casilla.dataset.fila / 3) * 3;
        const columnaSubCuadricula = Math.floor(casilla.dataset.columna / 3) * 3;

        for(let fila = filaSubCuadricula; fila < filaSubCuadricula + 3; fila++){
            for(let columna = columnaSubCuadricula; columna < columnaSubCuadricula + 3; columna++){
                if(this.tablero[fila][columna] === numero){
                    alert("Numero ya introducido en la sub-cuadricula");
                    return;
                }
            }
        }

        casilla.removeEventListener('click', this.clickarCasilla.bind(casilla, this));
        casilla.dataset.state = "correct";
        casilla.textContent = numero;

        let sudokuCompletado = true;
        const casillas = document.querySelectorAll('p');
        casillas.forEach(casilla => {
            if(casilla.dataset.state != "correct" && casilla.dataset.state != "blocked"){
                sudokuCompletado = false;
            }
        });

        if(sudokuCompletado){
            alert("Sudoku completado");
        }
        
    }
}
