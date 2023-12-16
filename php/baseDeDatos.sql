-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS F1Database;
USE F1Database;

-- Crear tabla Pilotos
CREATE TABLE Pilotos (
    PilotoID INT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellidos VARCHAR(50) NOT NULL,
    Numero VARCHAR(50) NOT NULL,
    Nacionalidad VARCHAR(50) NOT NULL,
    Edad VARCHAR(50) NOT NULL,
    EquipoID INT,
    FOREIGN KEY (EquipoID) REFERENCES Equipos(EquipoID)
);

-- Crear tabla GrandesPremio
CREATE TABLE GranPremio (
    GranPremioID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    NumeroDeRonda INT NOT NULL,
    Ubicacion VARCHAR(100) NOT NULL
);

-- Crear tabla Clasificacion
CREATE TABLE Clasificacion (
    ClasificacionID INT PRIMARY KEY,
    Posicion INT NOT NULL,
    PilotoID INT,
    Tiempo TIME,
    FOREIGN KEY (PilotoID) REFERENCES Pilotos(PilotoID)
);

-- Crear tabla Carrera
CREATE TABLE Carrera (
    CarreraID INT PRIMARY KEY,
    Posicion INT NOT NULL,
    PilotoID INT,
    Tiempo TIME,
    Puntos INT,
    FOREIGN KEY (PilotoID) REFERENCES Pilotos(PilotoID)
);

-- Crear tabla Equipos
CREATE TABLE Equipos (
    EquipoID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Nacionalidad VARCHAR(50) NOT NULL
);

-- Insertar datos en la tabla Equipos
INSERT INTO Equipos (EquipoID, Nombre, Nacionalidad) VALUES
(1, 'Red Bull ', 'Austria'),
(2, 'Ferrari', 'Italia'),
(3, 'Mercedes', 'Alemania'),
(4, 'Alpine', 'Francia'),
(5, 'McLaren', 'Reino Unido'),
(6, 'Alfa Romeo Sauber', 'Suiza'),
(7 'Aston Martin', 'Reino Unido'),
(8, 'Haas', 'Estados Unidos'),
(9, 'AlphaTauri', 'Italia'),
(10, 'Williams', 'Reino Unido');

-- Insertar datos en la tabla Pilotos
INSERT INTO Pilotos (PilotoID, Nombre, Apellidos, Numero, Nacionalidad, Edad, EquipoID) VALUES
(1, "Max", "Verstappen", "1", "Paises Bajos", "26", 1),
(2, "Sergio", "Pérez", "11", "Mexico", "33", 1),
(3, "Charles", "Leclerc", "16", "Monaco", "26", 2),
(4, "Carlos", "Sainz", "55", "España", "29", 2),
(5, "George", "Russell", "63", "Reino Unido", "25", 3),
(6, "Lewis", "Hamilton", "44", "Reino Unido", "38", 3),
(7, "Esteban", "Ocon", "31", "Francia", "27", 4),
(8, "Pierre", "Gasly", "10", "Francia", "27", 4),
(9, "Lando", "Norris", "4", "Reino Unido", "24", 5),
(10, "Oscar", "Piastri", "81", "Australia", "22", 5),
(11, "Valtteri", "Bottas", "77", "Finlandia", "34", 6),
(12, "Guanyu", "Zhou", "24", "China", "24", 6),
(13, "Fernando", "Alonso", "14", "España", "42", 7),
(14, "Lance", "Stroll", "18", "Canada", "25", 7),
(15, "Kevin", "Magnussen", "20", "Dinamarca", "31", 8),
(16, "Nico", "Hulkenberg", "27", "Alemania", "36", 8),
(17, "Yuki", "Tsunoda", "22", "Japon", "23", 9),
(18, "Daniel", "Ricciardo", "3", "Australia", "34", 9),
(19, "Alexander", "Albon", "23", "Tailandia", "27", 10),
(20, "Logan", "Sargeant", "2", "Estados Unidos", "22", 10);

-- Insertar datos en la tabla GrandesPremios
INSERT INTO GranPremio (GranPremioID, Nombre, NumeroDeRonda, Ubicacion) VALUES
(1, 'Gran Premio de Australia', 1, 'Melbourne');

-- Insertar datos en la tabla Clasificacion
INSERT INTO Clasificacion (ClasificacionID, Posicion, PilotoID, Tiempo) VALUES
(1, 1, 1, '01:35:12'),
(2, 2, 2, '01:36:05'),
(3, 3, 3, '01:36:20');

-- Insertar datos en la tabla Carrera
INSERT INTO Carrera (CarreraID, Posicion, PilotoID, Tiempo, Puntos) VALUES
(1, 1, 1, '01:35:12', 25),
(2, 2, 2, '01:36:05', 18),
(3, 3, 3, '01:36:20', 15);