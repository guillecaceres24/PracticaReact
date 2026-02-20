-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 20-02-2026 a las 09:21:35
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cinema_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `rating` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id`, `content`, `rating`, `createdAt`, `updatedAt`, `userId`, `movieId`) VALUES
(3, 'igyulhikj', 5, '2026-02-19 11:51:41', '2026-02-19 11:51:41', 16, 7),
(4, 'bhhuiiuhuhi', 5, '2026-02-19 11:58:01', '2026-02-19 11:58:01', 16, 7),
(5, 'dcfghvbjnk', 5, '2026-02-19 12:21:26', '2026-02-19 12:21:26', 2, 8),
(6, 'vbivgytvggvgv', 5, '2026-02-19 12:21:29', '2026-02-19 12:21:29', 2, 8),
(7, 'ygtfjgfggfgfgfgf', 5, '2026-02-19 12:24:29', '2026-02-19 12:24:29', 3, 8),
(8, 'ftjufggfgfgf', 5, '2026-02-19 12:24:32', '2026-02-19 12:24:32', 3, 8),
(9, 'kkk', 5, '2026-02-19 12:24:53', '2026-02-19 12:24:53', 3, 9),
(10, 'no me gusta', 5, '2026-02-20 08:15:12', '2026-02-20 08:15:12', 2, 10),
(11, 'esta bien', 5, '2026-02-20 08:16:52', '2026-02-20 08:16:52', 2, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `director` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `description` text NOT NULL,
  `poster` varchar(255) DEFAULT 'no-photo.jpg',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `movies`
--

INSERT INTO `movies` (`id`, `title`, `director`, `year`, `description`, `poster`, `createdAt`, `updatedAt`, `userId`) VALUES
(7, 'Reyes del futuro!', 'guillermo caceres', 2026, 'pelicula', 'https://edit.org/img/blog/nld-cartel-pelicula-poster-cine-editable-online-gratis-personalizable.webp', '2026-02-19 11:51:25', '2026-02-19 11:56:20', 16),
(10, 'Madre ', 'Rodrigo Sorogoyen', 2021, 'Elena (Marta Nieto) perdió a su hijo Iván, de seis años, en una playa de Francia. Ahora Elena vive en esa playa y está empezando a salir de ese oscuro túnel donde ha permanecido anclada todo este tiempo... Secuela en formato largometraje del cortometraje homónimo del propio Sorogoyen.', 'https://www.premiosgoya.com/wp-content/uploads/2017/11/system/uploads/short_film/poster/597/Madre._Cartel-320x457.jpg', '2026-02-20 07:44:03', '2026-02-20 08:18:05', 2),
(11, 'Amadeus', 'Milos Forman', 1981, 'Antonio Salieri es el músico más destacado de la corte del Emperador José II de Austria. Entregado completamente a la música, le promete a Dios humildad y castidad si, a cambio, conserva sus extraordinarias dotes musicales. Pero, después de la llegada a la corte de un joven llamado Wolfang Amadeus Mozart, Salieri queda relegado a un segundo plano. Enfurecido por la pérdida de protagonismo, hará todo lo posible para arruinar la carrera del músico de Salzburgo. Mientras tanto, Mozart, ajeno a las maquinaciones de Salieri, sorprende a todos con su genialidad como músico, pero también con sus excentricidades. ', 'https://pics.filmaffinity.com/La_realizaciaon_de_Amadeus-189208763-mmed.jpg', '2026-02-20 07:46:22', '2026-02-20 07:46:22', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'testuser_1771503565280', 'test_1771503565280@example.com', '$2b$10$Ca/7txywHccL4acgjREqXOV.n9TwSKq60Tuh5tn4.6drzazUonwza', '2026-02-19 12:19:25', '2026-02-19 12:19:25'),
(2, 'pepo', 'pepo@gmail.com', '$2b$10$4RF7Fz2fN029DFJiG8M2o.BbDgsO1lrnylMs1PcRoG2N8mV38mKv.', '2026-02-19 12:20:12', '2026-02-19 12:20:12'),
(3, 'elena', 'elena@gmail.com', '$2b$10$Hxt8USLntAcAWVCFQIn1a.K6YX8kevYBt6Vdhk0DWPqrlKqh3WK0C', '2026-02-19 12:21:59', '2026-02-19 12:21:59'),
(4, 'testuser1771574849374', 'test1771574849374@example.com', '$2b$10$bRe6iQtRgTphyVTbwo3TYu7qhgzWnf4WyKZIMJf37GZ4t8vbRUAOS', '2026-02-20 08:07:29', '2026-02-20 08:07:29'),
(5, 'julio@gmail.com', 'julio@gmail.com', '$2b$10$Ty9nxnqZTW8b0fXvKU2ZHOU9374eIapnuN2GOPg0.Ky2cyyQZ8Sja', '2026-02-20 08:09:56', '2026-02-20 08:09:56'),
(6, 'juan', 'juan@gmail.com', '$2b$10$6cHNDLYBNIv/vSsyDN36COZ2Z6dHt4Hw9vxPmnkLopowcqI4t1hR.', '2026-02-20 08:16:11', '2026-02-20 08:16:11');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `movieId` (`movieId`);

--
-- Indices de la tabla `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
