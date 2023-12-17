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
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/juegos.css" />
    <link rel="icon" href="multimedia/archivosGraficos/favicon.ico" sizes="32x32" type="image/ico"/>
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <?php
        class Resultados{

            private $server;
            private $user;
            private $pass;
            private $dbname;

            public function __construct(){
                $this->server = "localhost";
                $this->user = "DBUSER2023";
                $this->pass = "DBPSWD2023";
                $this->dbname = "F1Database";

                $connexion = new mysqli($this->server, $this->user, $this->pass);

                // Verificar conexión
                if ($connexion->connect_error) {
                    die("Conexión fallida: " . $connexion->connect_error);
                }

                // Crear base de datos
                $sql = file_get_contents('baseDeDatos.sql');
                if ($connexion->multi_query($sql) === TRUE) {
                    echo "Base de datos creada correctamente";
                } else {
                    echo "Error al crear la base de datos: " . $connexion->error;
                }

                // Cerrar conexión
                $connexion->close();
            }

            public function crearDatos() {
            }

            // public function importarCsv($archivo){
            //     if (($handle = fopen($archivo, "r")) !== FALSE) {
            //         while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                        
            //             // Alternativamente, puedes insertar los datos en una base de datos
            //             // Ejemplo de inserción en una tabla 'miTabla'
            //             // Reemplaza 'localhost', 'tu_usuario', 'tu_contraseña' y 'MiBaseDeDatos' con tus propios valores
            //             $connexion = new mysqli($this->server, $this->user, $this->pass, );
            //             $conn = new mysqli('localhost', 'tu_usuario', 'tu_contraseña', 'MiBaseDeDatos');
            //             // $sql = "INSERT INTO miTabla (columna1, columna2, columna3) VALUES ('$data[0]', '$data[1]', '$data[2]')";
            //             // $conn->query($sql);
            //         }
            //         fclose($handle);
            //     }
            // }
        }
    ?>
    <header>
        <h1>Escritorio Virtual</h1>
            <nav>
                <a title="EscritorioVirtual" accesskey="I" tabindex="1" href= "../index.html">Inicio</a>
                <a title="Sobremi" accesskey="S" tabindex="2" href= "../sobremi.html">Sobre mi</a>
                <a title="Noticias" accesskey="N" tabindex="3" href= "../noticias.html">Noticias</a>
                <a title="Agenda" accesskey="A" tabindex="4" href= "../agenda.html">Agenda</a>
                <a title="Meteorologia" accesskey="M" tabindex="5" href= "../meteorologia.html">Meteorologia</a>
                <a title="Viajes" accesskey="V" tabindex="6" href= "../viajes.php">Viajes</a>
                <a title="Juegos" accesskey="J" tabindex="7" href= "../juegos.html">Juegos</a>
            </nav>
    </header>
    
    <section>
        <h2>Menú Juegos</h2>
        <nav>
            <a title="Memoria" accesskey="E" tabindex="8" href= "../memoria.html">Memoria</a>
            <a title="Sudoku" accesskey="U" tabindex="9" href= "../sudoku.html">Sudoku</a>
            <a title="Crucigrama" accesskey="C" tabindex="10" href= "../crucigrama.php">Crucigrama</a>
            <a title="Reproductor" accesskey="R" tabindex="11" href= "../reproductorMusica.html">Reproductor musica</a>
            <a title="Resultados" accesskey="F" tabindex="12" href= "../php/resultadosF1.php">Resultados F1</a>
        </nav>
    </section>

    <!-- <form action="#" method="post" enctype="multipart/form-data">
        <input type="file" name="archivo_csv[]" accept=".csv" multiple>
        <input type="submit" value="Subir archivos">
    </form> -->

    <?php

        $resultados = new Resultados();
        // if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["archivos_csv"])) {
        //     $archivos = $_FILES["archivos_csv"];
        
        //     foreach ($archivos['name'] as $key => $nombre) {
        //         // Verificar si es un archivo CSV
        //         $tipo = pathinfo($archivos["name"][$key], PATHINFO_EXTENSION);
        //         if ($tipo !== 'csv') {
        //             echo "Por favor, selecciona un archivo CSV válido.";
        //             exit();
        //         }
        
        //         $resultados->importarCsv($archivos["name"][$key]);
        //     }
        // }
    ?>

</body>
</html>