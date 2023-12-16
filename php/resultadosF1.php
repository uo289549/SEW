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

                $connexion = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
                $consulta = "INSERT INTO Pilotos (PilotoID, Nombre, Apellidos, Numero, Nacionalidad, Edad, EquipoID) VALUES (?, ?, ?, ?)";

                $preparedStatement = $connexion->prepare($consulta);
                $preparedStatement->bind_param("isssssi", 1, "Max", "Verstappen", "1", "Paises Bajos", "26", 1);
                $preparedStatement->execute();
                
                $preparedStatement->bind_param("isssssi", 2, "Sergio", "Pérez", "11", "Mexico", "33", 1);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 3, "Charles", "Leclerc", "16", "Monaco", "26", 2);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 4, "Carlos", "Sainz", "55", "España", "29", 2);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 5, "George", "Russell", "63", "Reino Unido", "25", 3);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 6, "Lewis", "Hamilton", "44", "Reino Unido", "38", 3);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 7, "Esteban", "Ocon", "31", "Francia", "27", 4);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 8, "Pierre", "Gasly", "10", "Francia", "27", 4);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 9, "Lando", "Norris", "4", "Reino Unido", "24", 5);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 10, "Oscar", "Piastri", "81", "Australia", "22", 5);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 11, "Valtteri", "Bottas", "77", "Finlandia", "34", 6);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 12, "Guanyu", "Zhou", "24", "China", "24", 6);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 13, "Fernando", "Alonso", "14", "España", "42", 7);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 14, "Lance", "Stroll", "18", "Canada", "25", 7);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 15, "Kevin", "Magnussen", "20", "Dinamarca", "31", 8);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 16, "Nico", "Hulkenberg", "27", "Alemania", "36", 8);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 17, "Yuki", "Tsunoda", "22", "Japon", "23", 9);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 18, "Daniel", "Ricciardo", "3", "Australia", "34", 9);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 19, "Alexander", "Albon", "23", "Tailandia", "27", 10);
                $preparedStatement->execute();

                $preparedStatement->bind_param("isssssi", 20, "Logan", "Sargeant", "2", "Estados Unidos", "22", 10);
                $preparedStatement->execute();

                $preparedStatement->close();
                $connexion->close();


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