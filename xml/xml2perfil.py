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
    primeraRuta = True
    alturasCargadas = False
    primerPto = True
    primeraAltura = ""
    primeraDistancia = "100"
    distanciaAnterior = 0


    for hijo in raiz.findall('.//'):
        print(hijo.tag.removeprefix("{http://tempuri.org/rutas}"))
        elemento = hijo.tag.removeprefix("{http://tempuri.org/rutas}")

        if elemento == "ruta":
            if primeraRuta == True:
                primeraRuta = False
            else:
                penultimoPto = str(distanciaAnterior + 100) + "," + str( 1000 - float(primeraAltura)) + '\n'
                ultimoPto = primeraDistancia + "," + str( 1000 - float(primeraAltura))

                listaAlturas.append(penultimoPto)
                listaAlturas.append(ultimoPto)

                listaRutas.append(ajustarAlturas(listaAlturas))
                listaAlturas = []
                primerPto = True

        if elemento == "referencias" or elemento == "galeriaFotografica":
            if alturasCargadas == False:
                altura = distancia + "," + str( 1000 - float(altitud)) + '\n'
                distanciaAnterior = float(distancia)
                listaAlturas.append(altura)
                alturasCargadas = True

        if elemento == "altitud":
            altitud = hijo.text.strip('\n')
            alturasCargadas = False
            if primerPto == True:
                primeraAltura = altitud
                distancia = primeraDistancia
                primerPto = False
            else:
                distancia = str( distanciaAnterior + 100)

    penultimoPto = str(distanciaAnterior + 100) + "," + str( 1000 - float(primeraAltura)) + '\n'
    ultimoPto = primeraDistancia + "," + str( 1000 - float(primeraAltura))

    listaAlturas.append(penultimoPto)
    listaAlturas.append(ultimoPto)

    listaRutas.append(ajustarAlturas(listaAlturas))


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