import xml.etree.ElementTree as ET



def obtenerCoordenadas(archivoXML):
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
    listaCoordenadas = []
    latitud = ""
    longitud = ""
    altitud = ""


    for ruta in raiz.findall('.//{http://www.uniovi.es}ruta'):
        print(ruta.tag.removeprefix("{http://www.uniovi.es}"))

        coordenadas = ruta.find('.//{http://www.uniovi.es}coordenadas')

        latitud = coordenadas.find('.//{http://www.uniovi.es}latitud').text.removeprefix("{http://www.uniovi.es}")
        longitud = coordenadas.find('.//{http://www.uniovi.es}longitud').text.removeprefix("{http://www.uniovi.es}")
        altitud = coordenadas.find('.//{http://www.uniovi.es}altitud').text.removeprefix("{http://www.uniovi.es}")

        coordenadas =  longitud+ "," + latitud + "," + altitud + '\n'
        listaCoordenadas.append(coordenadas)

        for hito in ruta.findall('.//{http://www.uniovi.es}hito'):

            coordenadasHito = hito.find('.//{http://www.uniovi.es}coordenadasHito')

            latitud = coordenadasHito.find('.//{http://www.uniovi.es}latitud').text.removeprefix("{http://www.uniovi.es}")
            longitud = coordenadasHito.find('.//{http://www.uniovi.es}longitud').text.removeprefix("{http://www.uniovi.es}")
            altitud = coordenadasHito.find('.//{http://www.uniovi.es}altitud').text.removeprefix("{http://www.uniovi.es}")

            coordenadas =  longitud+ "," + latitud + "," + altitud + '\n'
            listaCoordenadas.append(coordenadas)

        listaRutas.append(listaCoordenadas)
        listaCoordenadas = []

    return listaRutas



def prologoKML(archivo, nombre):

    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    archivo.write("<Document>\n")
    archivo.write("<Placemark>\n")
    archivo.write("<name>"+nombre+"</name>\n")
    archivo.write("<LineString>\n")
    archivo.write("<extrude>1</extrude>\n")
    archivo.write("<tessellate>1</tessellate>\n")
    archivo.write("<coordinates>\n")

def epilogoKML(archivo):

    archivo.write("</coordinates>\n")
    #archivo.write("<altitudeMode>relativeToGround</altitudeMode>\n")
    archivo.write("</LineString>\n")
    archivo.write("<Style id='lineaRoja'>\n")
    archivo.write("<LineStyle>\n")
    archivo.write("<color>#ff0000ff</color>\n")
    archivo.write("<width>5</width>\n")
    archivo.write("</LineStyle>\n")
    archivo.write("</Style>\n")
    archivo.write("</Placemark>\n")
    archivo.write("</Document>\n")
    archivo.write("</kml>\n")

def main():
    #cargar archivo xml
    nombreArchivoXML = input('Introduce un archivo XML = ')

    listaCoordenadasRutas = obtenerCoordenadas(nombreArchivoXML)

    indice = 1
    for listaRuta in listaCoordenadasRutas:
        nombreSalida = "ruta"+str(indice)
        indice = indice + 1
        try:
            salida = open(nombreSalida + ".kml",'w')
        except IOError:
            print('No se puede crear el archivo ', nombreSalida + ".kml")
            exit()

        #Procesamiento y generacion del archivo xml
        #Escribe la cabecera del archivo de salida
        prologoKML(salida, nombreArchivoXML)

        for coordenadas in listaRuta:
            salida.write(coordenadas)
        epilogoKML(salida)
        salida.close()


main()