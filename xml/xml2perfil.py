import xml.etree.ElementTree as ET



def obtenerAlturas(archivoXML):
    try:
        arbol = ET.parse(archivoXML)
    except IOError:
        print('No se encuentra el archivo ',archivoXML)
        exit()
    except ET.ParseError:
        print('Error procesando en el archivo XML = ',archivoXML)
        exit()

    raiz = arbol.getroot()

    listaRutas = []
    listaAlturas = []
    altitud = ""
    distancia = "   "
    primeraAltura = ""
    primeraDistancia = "100"
    distanciaAnterior = 0


    for ruta in raiz.findall('.//{http://www.uniovi.es}ruta'):
        print(ruta.tag.removeprefix("{http://www.uniovi.es}"))

        coordenadas = ruta.find('.//{http://www.uniovi.es}coordenadas')
        altitud = coordenadas.find('.//{http://www.uniovi.es}altitud').text.removeprefix("{http://www.uniovi.es}")

        primeraAltura = altitud
        distancia = primeraDistancia

        altura = distancia + "," + str( 1000 - float(altitud)) + '\n'
        distanciaAnterior = float(distancia)
        listaAlturas.append(altura)

        for hito in ruta.findall('.//{http://www.uniovi.es}hito'):

            coordenadasHito = hito.find('.//{http://www.uniovi.es}coordenadasHito')

            altitud = coordenadasHito.find('.//{http://www.uniovi.es}altitud').text.removeprefix("{http://www.uniovi.es}")
            distancia = str( distanciaAnterior + 100)

            altura = distancia + "," + str( 1000 - float(altitud)) + '\n'
            distanciaAnterior = float(distancia)
            listaAlturas.append(altura)

        penultimoPto = str(distanciaAnterior + 100) + "," + str( 1000 - float(primeraAltura)) + '\n'
        ultimoPto = primeraDistancia + "," + str( 1000 - float(primeraAltura))

        listaAlturas.append(penultimoPto)
        listaAlturas.append(ultimoPto)

        listaRutas.append(ajustarAlturas(listaAlturas))
        listaAlturas = []

    return listaRutas



def ajustarAlturas(listaAlturas):

     altitudMaxima = 1000
     for pto in listaAlturas:

        altitudPto = float(pto.strip("\n").split(",")[1])
        if altitudPto < altitudMaxima:
            altitudMaxima = float(altitudPto)

     altitudMaxima = altitudMaxima - 50

     nuevaLista = []
     for pto in listaAlturas:
        punto = pto.strip("\n").split(",")
        distanciaPto = punto[0]
        altitudPto = punto[1]

        altura = distanciaPto + "," + str(float(altitudPto) - altitudMaxima) + '\n'
        nuevaLista.append(altura)

     return nuevaLista






def prologoSVG(archivo, nombre):

    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<svg xmlns="http://www.w3.org/2000/svg" version="1.1">\n')
    archivo.write('<polyline points=\n"')

def epilogoSVG(archivo):

    archivo.write('"\nstyle="fill:white;stroke:red;stroke-width:4" />')
    archivo.write("</svg>\n")

def main():
    #cargar archivo xml
    nombreArchivoXML = input('Introduce un archivo XML = ')

    listaAlturasRutas = obtenerAlturas(nombreArchivoXML)

    indice = 1
    for listaRuta in listaAlturasRutas:
        nombreSalida = "perfil"+str(indice)
        indice = indice + 1
        try:
            salida = open(nombreSalida + ".svg",'w')
        except IOError:
            print('No se puede crear el archivo ', nombreSalida + ".kml")
            exit()

        #Procesamiento y generacion del archivo xml
        #Escribe la cabecera del archivo de salida
        prologoSVG(salida, nombreArchivoXML)

        for alturas in listaRuta:
            salida.write(alturas)
        epilogoSVG(salida)
        salida.close()


main()