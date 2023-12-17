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
    <link rel="stylesheet" type="text/css" href="../estilo/resultadosF1.css" />
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
            }

            public function crearBase(){
                $connexion = new mysqli($this->server, $this->user, $this->pass);

                // Verificar conexión
                if ($connexion->connect_error) {
                    die("Conexión fallida: " . $connexion->connect_error);
                }

                // Crear base de datos
                $sql = file_get_contents('baseDeDatos.sql');
                if ($connexion->multi_query($sql) === TRUE) {
                    echo "<p>Base de datos creada correctamente</p>";
                } else {
                    echo "<p>Error al crear la base de datos: " . $connexion->error."</p>";
                }

                // Cerrar conexión
                $connexion->close();
            }

            public function cargarDatos() {

                $connexion = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

                $sql = "SELECT COUNT(*) as total FROM GranPremio";
                $result = $connexion->query($sql);

                if ($result) {
                    $row = $result->fetch_assoc();
                    $total_registros = $row['total'];
                
                    if ($total_registros == 0) {
                        //cargamos la tabla de GranPremio
                        $archivo = fopen('GranPremio.csv', 'r');
        
                        $consulta = "INSERT INTO GranPremio (GranPremioID, Nombre, NumeroDeRonda, Ubicacion) VALUES (?, ?, ?, ?)";
                        $preparedStatement = $connexion->prepare($consulta);
        
                        while (($data = fgetcsv($archivo, 1000, ",")) !== FALSE) {
        
                            $preparedStatement->bind_param("isis",$data[0],$data[1],$data[2],$data[3]);
                            if(!$preparedStatement->execute()){
                                echo "<p>Error al insertar los datos del gran premio: ". $connexion->error."</p>";
                            }
                        }
                        $preparedStatement->close();
                        fclose($archivo);
        
                        //cargamos la tabla de Equipos
                        $archivo = fopen('Equipos.csv', 'r');
        
                        $consulta = "INSERT INTO Equipos (EquipoID, Nombre, Nacionalidad) VALUES (?, ?, ?)";
                        $preparedStatement = $connexion->prepare($consulta);
        
                        while (($data = fgetcsv($archivo, 1000, ",")) !== FALSE) {
        
                            $preparedStatement->bind_param("iss",$data[0],$data[1],$data[2]);
                            if(!$preparedStatement->execute()){
                                echo "<p>Error al insertar los datos de los equipos: ". $connexion->error."</p>";
                            }
                        }
                        $preparedStatement->close();
        
                        fclose($archivo);
        
                        //cargamos la tabla de Pilotos
                        $archivo = fopen('Pilotos.csv', 'r');
                        
                        $consulta = "INSERT INTO Pilotos (PilotoID, Nombre, Apellidos, Numero, Nacionalidad, Edad, EquipoID) VALUES (?, ?, ?, ?, ?, ?, ?)";
                        $preparedStatement = $connexion->prepare($consulta);
        
                        while (($data = fgetcsv($archivo, 1000, ",")) !== FALSE) {
        
                            $preparedStatement->bind_param("isssssi",$data[0],$data[1],$data[2],$data[3],$data[4],$data[5],$data[6]);
                            if(!$preparedStatement->execute()){
                                echo "<p>Error al insertar los datos de los pilotos: ". $connexion->error."</p>";
                            }
                        }
                        $preparedStatement->close();
        
        
                        fclose($archivo);
        
                        //cargamos la tabla de Clasificacion
                        $archivo = fopen('Clasificacion.csv', 'r');
        
                        $consulta = "INSERT INTO Clasificacion (ClasificacionID, PilotoID, Tiempo) VALUES (?, ?, ?)";
                        $preparedStatement = $connexion->prepare($consulta);
        
                        while (($data = fgetcsv($archivo, 1000, ",")) !== FALSE) {
        
                            $preparedStatement->bind_param("iis",$data[0],$data[1],$data[2]);
                            if(!$preparedStatement->execute()){
                                echo "<p>Error al insertar los datos de la clasificacion: ". $connexion->error."</p>";
                            }
                        }
                        $preparedStatement->close();
        
                        fclose($archivo);
        
                        //cargamos la tabla de Carrera
                        $archivo = fopen('Carrera.csv', 'r');
        
                        $consulta = "INSERT INTO Carrera (CarreraID, PilotoID, Tiempo, Puntos) VALUES (?, ?, ?, ?)";
                        $preparedStatement = $connexion->prepare($consulta);
        
                        while (($data = fgetcsv($archivo, 1000, ",")) !== FALSE) {
        
                            $preparedStatement->bind_param("iisi",$data[0],$data[1],$data[2],$data[3]);
                            if(!$preparedStatement->execute()){
                                echo "<p>Error al insertar los datos de la carrera: ". $connexion->error."</p>";
                            }
                        }
                        $preparedStatement->close();
        
                        fclose($archivo);
                    } else {
                        echo "<p>Datos ya cargados en la base de datos</p>";
                    }
                } else {
                    echo "<p>Error al ejecutar la consulta: " . $conn->error."</p>";
                }
                $connexion->close();
            }

            public function crearTablaPilotos(){

                $connexion = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
                $sql = "SELECT Nombre, NumeroDeRonda, Ubicacion FROM GranPremio";

                $resultado = $connexion->query($sql);
                $fila = $resultado->fetch_assoc();

                //creacion cabecera de la tabla
                echo "<main>";
                echo "<table>";
                echo "<caption>".$fila['Nombre']." ronda nº:".$fila['NumeroDeRonda']." ubicado en ".$fila['Ubicacion']."</caption>";
                echo "<tr>";
                echo "<th scope= 'col' id='indice'>Indice</th>";
                echo "<th scope= 'col' id='nombre'>Nombre</th>";
                echo "<th scope= 'col' id='apellidos'>Apellidos</th>";
                echo "<th scope= 'col' id='numero'>Numero</th>";
                echo "<th scope= 'col' id='nacionalidad'>Nacionalidad</th>";
                echo "<th scope= 'col' id='edad'>Edad</th>";
                echo "<th scope= 'col' id='equipo'>Equipo</th>";
                echo "</tr>";

                //cargamos los datos de los pilotos
                $sql = "SELECT PilotoID, Nombre, Apellidos, Numero, Nacionalidad, Edad, EquipoID FROM Pilotos";

                $resultado = $connexion->query($sql);
                while ($fila = $resultado->fetch_assoc()) {
                    // Accede a los valores de cada fila

                    $idPiloto = $fila['PilotoID'];

                    echo "<tr>";
                    echo "<th scope='row' id='".$idPiloto."' headers='indice'>".$idPiloto."</th>";
                    echo "<td headers='".$idPiloto." nombre'>".$fila['Nombre']."</td>";
                    echo "<td headers='".$idPiloto." apellidos'>".$fila['Apellidos']."</td>";
                    echo "<td headers='".$idPiloto." numero'>".$fila['Numero']."</td>";
                    echo "<td headers='".$idPiloto." nacionalidad'>".$fila['Nacionalidad']."</td>";
                    echo "<td headers='".$idPiloto." edad'>".$fila['Edad']."</td>";

                    $consulta = "SELECT Nombre FROM Equipos WHERE EquipoID=?";

                    $preparedStatement = $connexion->prepare($consulta);
                    $preparedStatement->bind_param("i",$fila['EquipoID']);
                    $preparedStatement->execute();

                    $resultado = $preparedStatement->get_result();
                    $fila = $resultado->fetch_assoc();

                    echo "<td headers='".$idPiloto." edad'>".$fila['Nombre']."</td>";
                    echo "</tr>";
                }
                echo "</table>";
                echo "</main>";
                $connexion->close();
            }
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

    <p>Los datos de referencia a importar son los csv de "Carrera", "Clasificacion", "Equipos", "GranPremio" y "Pilotos"; ubicados en la carpeta php del proyecto. Si quiere importar los datos del gran premio que prefiera, modifique los csv siguiendo el esquema que tienen.</p>

    <form action="#" method="post">
        <button type="submit" name="accion" value="crearBase">Crear base de datos</button>
        <button type="submit" name="accion" value="cargarDatos">Cargar datos en la base</button>
    </form>

    <?php
        $resultados = new Resultados();

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (isset($_POST["accion"])) {
                $accion = $_POST["accion"];
    
                if ($accion === "crearBase") {
                    $resultados->crearBase();
                } elseif ($accion === "cargarDatos") {
                    $resultados->cargarDatos();
                    $resultados->crearTablaPilotos();
                }
            }
        }
    ?>

</body>
</html>