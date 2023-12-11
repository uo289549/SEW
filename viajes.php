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
    <link rel="stylesheet" type="text/css" href="estilo/viajes.css" />
    <link rel="stylesheet" type="text/css" href="https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.css">
    <link rel="icon" href="multimedia/archivosGraficos/favicon.ico" sizes="32x32" type="image/ico"/>
    <script src="https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/@mapbox/togeojson"></script>
    <script src="js/viajes.js"></script>
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <?php
    class Carrusel{

        private $nombreCapital;
        private $nombrePais;

        public function __construct($capital, $pais){
            $this->nombreCapital = $capital;
            $this->nombrePais = $pais;
        }  

        public function obtenerImagenes(){
            $api_key = '0565634739c78dcdbf56368cb0991f0b';
            $tag = $this->nombreCapital;
            $perPage = 10;

            // Fotos públicas recientes
            $url = 'http://api.flickr.com/services/feeds/photos_public.gne?';
            $url.= '&tags='.$tag;
            $url.= '&per_page='.$perPage;
            $url.= '&format=json';
            $url.= '&nojsoncallback=1';

            $respuesta = file_get_contents($url);
            $json = json_decode($respuesta);

            if($json==null) {
                echo "<h3>Error en el archivo JSON recibido</h3>";
            }

            //Pintamos las imagenes
            echo "<section>";
            echo "<h2>Carrusel de Imágenes</h2>";

            for($i=0;$i<$perPage;$i++) {
            
                $titulo = $json->items[$i]->title;
                $URLfoto = $json->items[$i]->media->m;

                print "<img src='".$URLfoto."' alt='".$titulo."'/>";
            }

            echo "<button data-action='next'> > </button>";
            echo "<button data-action='prev'> < </button>";
            echo "</section>";
        }
    }

    class Moneda {

        private $monedaLocal;
        private $monedaCambio;

        public function __construct($monedaLocal, $monedaCambio){
            $this->monedaLocal = $monedaLocal;
            $this->monedaCambio = $monedaCambio;
        }

        public function obtenerCambio(){
            $api_key = 'a502274edafe39938c5e809a';

            $url = "https://v6.exchangerate-api.com/v6/".$api_key."/latest/".$this->monedaCambio;

            $response = file_get_contents($url);

            if ($response) {
                $data = json_decode($response, true);
                
                if (isset($data['conversion_rates']['KRW'])) {
                    echo "<h2>Cambio de moneda</h2>";
                    $exchange_rate = $data['conversion_rates']['KRW'];
                    echo "<p>1 ".$this->monedaCambio." equivale a ".$exchange_rate." ".$this->monedaLocal;
                } else {
                    echo "<h2>No se pudo obtener la tasa de cambio.</h2>";
                }
            } else {
                echo "<h2>Error al obtener los datos.</h2>";
            }
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

    <?php
    $moneda = new Moneda("KRW","EUR");
    $moneda->obtenerCambio();
    ?>

    <section>
        <h2>Mapas</h2>
        <button>Crear mapa estatico</button>
        <button>Crear mapa dinamico</button>
    </section>

    <section>
        <h2>Descripcion de rutas</h2>
        <label for="xml">Rutas:</label>
        <input type="file" id="xml" onchange="viajes.readInputFile(this.files);">
    </section>

    <section>
        <h2>Planimetrias</h2>
        <label for="kml">Planimetrias:</label>
        <input type="file" name="kml" id="kml" onchange="viajes.readInputKML();" multiple>
    </section>

    <section>
        <h2>Altimetrias</h2>
        <label for="svg">Altimetrias:</label>
        <input type="file" name="svg" id="svg" onchange="viajes.readInputSVG();" multiple>
    </section>

    <?php
    $carrusel = new Carrusel("Seoul","Corea del Sur");
    $carrusel->obtenerImagenes();
    ?>

    <script>
        var viajes = new Viajes();
    </script>
</body>
</html>