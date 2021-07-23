-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.25 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para tarea
CREATE DATABASE IF NOT EXISTS `tarea` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tarea`;

-- Volcando estructura para tabla tarea.pedido
CREATE TABLE IF NOT EXISTS `pedido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nombrecliente` varchar(50) DEFAULT NULL,
  `usuarioemailcreador` varchar(50) DEFAULT '@',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla tarea.pedido: ~11 rows (aproximadamente)
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` (`id`, `fecha`, `nombrecliente`, `usuarioemailcreador`) VALUES
	(2, '2021-06-29 21:32:43', 'KIMBERLY RINCON', 'krincon36@hotmail.com'),
	(14, '2021-07-22 07:57:30', 'kr', 'krincon36@hotmail.com'),
	(15, '2021-07-22 08:07:20', 'kr', 'krincon36@hotmail.com'),
	(16, '2021-07-22 08:07:53', 'kr', 'krincon36@hotmail.com'),
	(17, '2021-07-22 08:08:13', 'kr', 'krincon36@hotmail.com'),
	(18, '2021-07-22 08:29:57', 'kr', 'krincon36@hotmail.com'),
	(19, '2021-07-22 08:31:26', 'kr', 'krincon36@hotmail.com');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;

-- Volcando estructura para tabla tarea.pedidoitem
CREATE TABLE IF NOT EXISTS `pedidoitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedidoid` int NOT NULL DEFAULT '0',
  `productoid` int NOT NULL DEFAULT '0',
  `cantidad` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla tarea.pedidoitem: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `pedidoitem` DISABLE KEYS */;
INSERT INTO `pedidoitem` (`id`, `pedidoid`, `productoid`, `cantidad`) VALUES
	(3, 2, 2, 5),
	(7, 14, 1, 3),
	(8, 14, 2, 5);
/*!40000 ALTER TABLE `pedidoitem` ENABLE KEYS */;

-- Volcando estructura para tabla tarea.producto
CREATE TABLE IF NOT EXISTS `producto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(50) DEFAULT NULL,
  `nombre` varchar(50) NOT NULL DEFAULT '0',
  `precio` int NOT NULL DEFAULT '0',
  `estado` int DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla tarea.producto: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` (`id`, `codigo`, `nombre`, `precio`, `estado`) VALUES
	(1, 'AG1001', 'AGUACATE HASH', 15000, 1),
	(3, 'AG1002', 'AGUACATE COMUN', 15000, 1),
	(5, 'MG1001', 'MANGO DE AZUCAR', 2500, 1),
	(6, 'YU1001', 'YUCA', 3000, 1);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;

-- Volcando estructura para tabla tarea.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL DEFAULT '@',
  `password` varchar(50) DEFAULT NULL,
  `rol` varchar(50) DEFAULT 'VENDEDOR',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla tarea.usuario: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `email`, `password`, `rol`) VALUES
	(1, 'dadas@dadas.doc', '123456', 'VENDEDOR'),
	(2, 'kj.rv2@hotmail.com', '123', 'ADMIN'),
	(3, 'kj.rv@gmail.com', '123456', 'VENDEDOR'),
	(4, 'kj.rv@hotmail.com', '123', 'ADMIN'),
	(5, 'kj.rv3@hotmail.com', '123', 'ADMIN'),
	(6, 'kj.rv4@hotmail.com', '123456', 'ADMIN'),
	(7, 'krincon22@hotmail.com', '123456', 'VENDEDOR'),
	(8, 'krincon22B@hotmail.com', '123456', 'VENDEDOR');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
