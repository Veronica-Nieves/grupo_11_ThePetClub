-- MariaDB dump 10.19  Distrib 10.4.27-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: the_pets_club
-- ------------------------------------------------------
-- Server version	10.4.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Alimento'),(2,'Juguetes'),(3,'Habitat'),(4,'Ropa'),(5,'Accesorios'),(6,'Otro');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sku` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `offer_discount` int(11) NOT NULL,
  `price_offer` float DEFAULT NULL,
  `specie_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `offer` varchar(255) NOT NULL,
  `featured` varchar(255) NOT NULL,
  `pieces` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_59f39462-df73-4497-9f28-b4d3b4664440` (`specie_id`),
  KEY `FK_1e4c77b1-060c-4660-a677-2169e041a93b` (`category_id`),
  CONSTRAINT `FK_1e4c77b1-060c-4660-a677-2169e041a93b` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `FK_59f39462-df73-4497-9f28-b4d3b4664440` FOREIGN KEY (`specie_id`) REFERENCES `species` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'SKU0001','Alimento Eukanuba cachorro razas pequeñas 2.3 Kg.','Son unas croquetas especiales para razas pequeñas por el tamaño del grano, y lo recomendamos para cachorros de hasta 10kg que tengan entre 2 y 12 meses de edad','SKU0001.jpg',4167.94,5,3959.54,1,1,'si','si',0),(2,'SKU0002','Correa Flexi New Clasic 5 mts','Esta correa les da una mayor libertad a tus mascotas, garantizan no solo un paseo más seguro, sino que también uno más divertido, con más metros para explorar.','SKU0002.png',1690.08,10,1521.07,1,5,'oferta en home','no',27),(9,'SKU0009','Juguete Kong - Corestregth bone chico-mediano','Este hueso Corestrenght  tiene multicapas lo que lo hace mas reforzado. Está diseñado con distintas texturas para garantizar sesiones de masticación divertidas y entretenidas. Además mantiene dientes y encías limpios mientras el perro se divierte.','SKU0009.jpg',1823.43,15,1549.91,1,2,'no','destacado de home',28),(14,'SKU0014','Peluche Kong - Oso Wild Knots extra chico','Divertido y práctico diseño que garantiza horas de diversión. Producto no toxico. Resistente para horas y horas de diversiòn.','SKU0014.jpg',2379.83,20,1903.86,1,2,'no','destacado de home',41),(16,'SKU0016','Bebedero Fancy Pets 500 ml','Es un bebedero pensado para que los colibries puedan tomar el nectar. La forma y textura apoyan la salud dental a través de la actividad natural de masticación.','SKU0016.png',4259.49,25,3194.62,3,6,'oferta en home','si',14),(17,'SKU0017','Alimento Canario Kaytee Supreme 907gr.','Mejora la apariencia, la condición y el plumaje, así también la calidad de vida y el estado de humor del ave, reflejado en el canto. Las formas y texturas apoyan la salud dental a través de la actividad natural de masticación.','SKU0017.jpg',2477.8,15,2106.13,3,1,'no','si',43),(24,'SKU0024','Juguete Petsartz - Columpio Ave mediano','Este columpio se adapta a cualquier jaula. Incentiva el jugar de las aves y es de fácil limpieza','SKU0024.jpg',2239.41,20,1791.53,3,2,'si','si',20),(25,'SKU0025','Percha Petsartz de cardenche','Esta percha es segura para las patitas de tu ave, le proponen hacer ejercicio, lo que es ideal para mantener el pico y las uñas.','SKU0025.jpg',4859.02,25,3644.27,3,3,'no','no',26),(26,'SKU0026','Jeringa Petsartz alimentacion manual para polluelos','Cuenta con una pipeta colocada hacia un lado del barril lo que facilita muchísimo la alimentación de los pollitos. Las formas y texturas apoyan la salud dental a través de la actividad natural de masticación.','SKU0026.jpg',2345.59,5,2228.31,3,6,'oferta en home','si',6),(36,'SKU0036','Alimento Grandpet Gato Adulto 1,5 kg','Alta palatabilidad. Las formas y texturas apoyan la salud dental a través de la actividad natural de masticación.','SKU0036.jpg',2811,10,2529.9,2,1,'si','si',44),(37,'SKU0037','Arena Intersand odourlock 6 kg','Arena de arcilla natural de poco polvo. Bloquea el amoniaco y los malos olores','SKU0037.jpg',4430.39,15,3765.83,2,3,'si','destacado de home',49),(41,'SKU0041','Juguete Kong - Laser','Este juguete es para jugar con tu gato, super divertido, pueden pasar largas horas corriendo al laser.','SKU0041.jpg',3999.77,10,3599.79,2,2,'no','no',43),(44,'SKU0044','Arenero Maryloo grande - azul','Rápida y sencilla limpieza. Fabricado con materiales resistentes para uso duradero. Las formas y texturas apoyan la salud dental a través de la actividad natural de masticación.','SKU0044.png',1696.66,10,1527,2,5,'no','no',3),(60,'SKU0060','Filtro Cascada Dolphin H-500 Acuario Lomas','Novedoso filtro de cascada de altas prestaciones con SKIMMER de superficie.','SKU0060.jpg',3805.38,20,3044.3,4,3,'no','si',22),(61,'SKU0061','Bomba De Aire Para Acuario Elite 801 Acuario Lomas','Aireador RS16000 ultra silencioso, robusto, hasta 90 salidas.','SKU0061.png',4316.53,25,3237.39,4,3,'si','si',25),(62,'SKU0062','Plantas Para Acuario De Plastico 20cm Acuario Lomas','Las plantas réplica ofrecen detalles y colores similares a los de la vida que están tan cerca de la perfección como la propia naturaleza.','SKU0062.png',3321.37,15,2823.17,4,5,'no','si',14),(63,'SKU0063','Filtro para acurio Interno 1106 450l/h Acuario Lomas','Filtro que ayuda a mantener limpio el acuario. Ideal para grandes acuarios.','SKU0063.jpg',4674.56,20,3739.65,4,3,'oferta en home','no',38),(67,'SKU0067','Pasto American Pet timothy gold 680 gr.','Puro, dulce, nutritivo y natural. Fibra esencial para un sistema digestivo saludable y óptimo. Apoya el desgaste dental necesario. Bellamente verde y muy apetecible.','SKU0067.jpg',1929.39,25,1447.04,5,1,'si','no',20),(68,'SKU0068','Cama Fancy Pets para pequeños mamiferos','Suave y resistente. Proporciona a la mascota descanso y comodidad. Previene la formación de callos. Totalmente lavable.','SKU0068.png',2425.22,10,2182.7,5,4,'no','no',13),(72,'SKU0072','Alimento Kaytee Conejo timothy select 1,58 kg','Fabricado con heno timothy para apoyar un proceso digestivo natural para conejos. Kaytee es una marca recomendada por veterinarios.','SKU0072.jpg',1752.57,20,1402.05,5,1,'no','si',40),(77,'SKU0077','Alimento Mazuri para tortuga 600 gr.','Alimentos que dan el aporte de proteínas necesario para que tengan una vida más saludable.','SKU0077.jpg',4095.42,25,3071.57,6,1,'si','destacado de home',19),(78,'SKU0078','Alimento Mazuri para tortuga acuatica 450 gr.','Alimentos que dan el aporte de proteínas necesario para que tengan una vida más saludable.','SKU0078.jpg',3389.75,5,3220.27,6,1,'si','si',50),(80,'SKU0080','Alimento Mazuri para iguana 450 gr.','Alimentos que dan el aporte de proteínas necesario para que tengan una vida más saludable.','SKU0080.jpg',2757.06,10,2481.35,6,1,'si','si',2),(82,'SKU0082','Juguete Kaytee - Dazzle Run About','Fomenta el ejercicio saludable de una manera segura y segura · Es una gran zona de sujeción temporal para mantener a tu amigo peludo entretenido y ejercitado.','SKU0082.jpg',4557.73,15,3874.07,5,2,'no','si',42),(83,'SKU0053','Plato Gusto 350 ml ','Elaborada con plástico libre de BPA, no tóxico y + 98% reciclado.. Diseño ideal para evitar volcaduras.','image-1681424805702.jpg',3500,0,3150,2,1,'si','si',35);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Usuario'),(2,'Administrador');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_carts`
--

DROP TABLE IF EXISTS `shopping_carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shopping_carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8c9aaa8c-fbe3-4569-85ea-750b72b0f4ed` (`user_id`),
  KEY `FK_1c4d036e-8226-4958-a40b-f0428f519bf8` (`product_id`),
  CONSTRAINT `FK_1c4d036e-8226-4958-a40b-f0428f519bf8` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FK_8c9aaa8c-fbe3-4569-85ea-750b72b0f4ed` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_carts`
--

LOCK TABLES `shopping_carts` WRITE;
/*!40000 ALTER TABLE `shopping_carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `shopping_carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `species`
--

DROP TABLE IF EXISTS `species`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `species` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `species`
--

LOCK TABLES `species` WRITE;
/*!40000 ALTER TABLE `species` DISABLE KEYS */;
INSERT INTO `species` VALUES (1,'Perros'),(2,'Gatos'),(3,'Aves'),(4,'Peces'),(5,'Mamiferos'),(6,'Reptiles');
/*!40000 ALTER TABLE `species` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `password_confirmed` varchar(255) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9bbd3276-2cab-4b8a-8df3-0ffbebc65dd9` (`rol_id`),
  CONSTRAINT `FK_9bbd3276-2cab-4b8a-8df3-0ffbebc65dd9` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-13 21:32:02
