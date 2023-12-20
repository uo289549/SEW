<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta name="author" content="Yago"/>
    <meta name="description" content="plantilla del proyecto"/>
    <meta name="keywords" content="aquí cada documento debe tener la lista de las palabras clave del mismo separadas por comas" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <meta charset="UTF-8" />
    <title>EscritorioVirtual</title>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/crucigrama.css" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo_botonera.css" />
    <link rel="icon" href="multimedia/archivosGraficos/favicon.ico" sizes="32x32" type="image/ico"/>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="js/crucigrama.js"></script>
</head>

<body>
    <!-- localhost/SEW/juegos.html -->
    <?php
        class Record{

            private $server;
            private $user;
            private $pass;
            private $dbname;

            private $nivel;

            public function __construct(){
                $this->server = "localhost";
                $this->user = "DBUSER2023";
                $this->pass = "DBPSWD2023";
                $this->dbname = "records";
            }

            public function añadirRecord($nombre, $apellidos, $nivel, $tiempo){

                $this->nivel = $nivel;

                $connexion = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
                $consulta = "INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)";

                $preparedStatement = $connexion->prepare($consulta);
                $preparedStatement->bind_param("ssss", $nombre, $apellidos, $nivel, $tiempo);
                $preparedStatement->execute();

                $preparedStatement->close();
                $connexion->close();
            }

            public function obtenerRecords(){


                $connexion = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
                $consulta = "SELECT nombre, apellidos, tiempo FROM registro WHERE nivel=? ORDER BY tiempo ASC LIMIT 10";

                $preparedStatement = $connexion->prepare($consulta);
                $preparedStatement->bind_param("s",$this->nivel);
                $preparedStatement->execute();

                $resultado = $preparedStatement->get_result();

                $preparedStatement->close();
                $connexion->close();

                echo "<section>";
                echo "<h2>Mejores 10 tiempos en la dificultad: {$this->nivel}</h2>";
                echo "<ol>";
                while ($fila = $resultado->fetch_assoc()) {
                    // Accede a los valores de cada fila
                    echo "<li>Nombre: ".$fila['nombre'].", Apellidos: ".$fila['apellidos'].", Tiempo: ".$fila['tiempo']."</li>";
                }
                echo "</ol>";
                echo "</section>";
            }
        }
    ?>
    <header>
        <h1>Escritorio Virtual</h1>
            <nav>
                <a title="EscritorioVirtual" accesskey="I" tabindex="1" href= "index.html">Inicio</a>
                <a title="Sobremi" accesskey="S" tabindex="2" href= "sobremi.html">Sobre mi</a>
                <a title="Noticias" accesskey="N" tabindex="3" href= "noticias.html">Noticias</a>
                <a title="Agenda" accesskey="A" tabindex="4" href= "agenda.html">Agenda</a>
                <a title="Meteorologia" accesskey="M" tabindex="5" href= "meteorologia.html">Meteorologia</a>
                <a title="Viajes" accesskey="V" tabindex="6" href= "viajes.php">Viajes</a>
                <a title="Juegos" accesskey="J" tabindex="7" href= "juegos.html">Juegos</a>
            </nav>
    </header>

    <h2>Menú Juegos</h2>
    <nav>
        <a title="Memoria" accesskey="E" tabindex="8" href= "memoria.html">Memoria</a>
        <a title="Sudoku" accesskey="U" tabindex="9" href= "sudoku.html">Sudoku</a>
        <a title="Crucigrama" accesskey="C" tabindex="10" href= "crucigrama.php">Crucigrama</a>
        <a title="Reproductor" accesskey="R" tabindex="11" href= "reproductorMusica.html">Reproductor musica</a>
        <a title="Resultados" accesskey="F" tabindex="12" href= "php/resultadosF1.php">Resultados F1</a>
    </nav>

    <article>
        <h2>Instrucciones de Uso</h2>
    </article>

    <h2>Crucigrama</h2>
    <main>
    </main>

    <section data-type="botonera">
        <h2>Botonera</h2>
        <button onclick="crucigrama.pulsarTecla(1)">1</button>
        <button onclick="crucigrama.pulsarTecla(2)">2</button>
        <button onclick="crucigrama.pulsarTecla(3)">3</button>
        <button onclick="crucigrama.pulsarTecla(4)">4</button>
        <button onclick="crucigrama.pulsarTecla(5)">5</button>
        <button onclick="crucigrama.pulsarTecla(6)">6</button>
        <button onclick="crucigrama.pulsarTecla(7)">7</button>
        <button onclick="crucigrama.pulsarTecla(8)">8</button>
        <button onclick="crucigrama.pulsarTecla(9)">9</button>
        <button onclick="crucigrama.pulsarTecla('*')">*</button>
        <button onclick="crucigrama.pulsarTecla('+')">+</button>
        <button onclick="crucigrama.pulsarTecla('-')">-</button>
        <button onclick="crucigrama.pulsarTecla('/')">/</button>
    </section>

    <?php
        if(count($_POST)>0){
            $record = new Record();
            $record->añadirRecord($_POST["nombre"], $_POST["apellidos"], $_POST["nivel"], $_POST["tiempo"]);
            $record->obtenerRecords();
        }
    ?>
    
    <script>
        var crucigrama = new Crucigrama("facil");
        crucigrama.start();
        crucigrama.paintMathword();
    </script>
</body>
</html>