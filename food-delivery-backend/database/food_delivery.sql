-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2024 at 09:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_delivery`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` enum('pending','completed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `etiquetas` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `etiquetas`, `imagen`) VALUES
(1, 'hamburguesaProducto', 'hamburguesa_descripcion', 9.99, 'hamburguesaProducto', 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(2, 'pizza', 'pizza_descripcion', 12.99, 'pizza', 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(3, 'fried_chicken_label', 'pollo_descripcion', 8.99, 'fried_chicken_label', 'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(4, 'tacos_label', 'tacos_descripcion', 10.99, 'tacos_label', 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(5, 'mixed_plate_label', 'plato_mixto_descripcion', 16.99, 'mixed_plate_label', 'https://images.pexels.com/photos/5710204/pexels-photo-5710204.jpeg?auto=compress&cs=tinysrgb&w=600'),
(6, 'sushi_label', 'sushi_descripcion', 20.99, 'sushi_label', 'https://images.pexels.com/photos/670705/pexels-photo-670705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(7, 'drinks_label', 'bebidas_descripcion', 5.99, 'drinks_label', 'https://images.pexels.com/photos/1280364/pexels-photo-1280364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(8, 'salad_label', 'ensalada_descripcion', 7.99, 'salad_label', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(9, 'spaghetti_label', 'spaghetti_descripcion', 14.99, 'spaghetti_label', 'https://images.pexels.com/photos/8500/food-dinner-pasta-spaghetti-8500.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(10, 'burrito_label', 'burrito_descripcion', 11.99, 'burrito_label', 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(11, 'wrap_label', 'wrap_descripcion', 9.49, 'wrap_label', 'https://images.pexels.com/photos/5840307/pexels-photo-5840307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(12, 'hotdog_label', 'hotdog_descripcion', 6.99, 'hotdog_label', 'https://images.pexels.com/photos/4518647/pexels-photo-4518647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(13, 'sandwich_label', 'sandwich_descripcion', 8.49, 'sandwich_label', 'https://images.pexels.com/photos/1885578/pexels-photo-1885578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(14, 'ribs_label', 'costillas_descripcion', 19.99, 'ribs_label', 'https://images.pexels.com/photos/16474897/pexels-photo-16474897/free-photo-of-a-plate-of-meat-barbecue-with-onions-and-pomegranate-seeds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(15, 'quesadilla_label', 'quesadilla_descripcion', 8.49, 'quesadilla_label', 'https://images.pexels.com/photos/5836441/pexels-photo-5836441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(16, 'fish_tacos_label', 'tacos_pescado_descripcion', 12.99, 'fish_tacos_label', 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(17, 'steak_label', 'filete_descripcion', 24.99, 'steak_label', 'https://images.pexels.com/photos/8477228/pexels-photo-8477228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(18, 'pancakes_label', 'pancakes_descripcion', 7.99, 'pancakes_label', 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(19, 'smoothie_label', 'smoothie_descripcion', 6.49, 'smoothie_label', 'https://images.pexels.com/photos/3342301/pexels-photo-3342301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(20, 'brownie_label', 'brownie_descripcion', 4.99, 'brownie_label', 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `name`, `description`, `price`, `imagen`, `categoria`) VALUES
(1, 'hamburguesaAngus', 'Hamburguesa jugosa de carne Angus con queso cheddar y salsa especial.', 9.99, 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'hamburguesaProducto'),
(2, 'HamburguesaRes', 'Hamburguesa clásica de carne de res con lechuga, tomate y mayonesa.', 8.49, 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'hamburguesaProducto'),
(3, 'HamburguesaPollo', 'Hamburguesa crujiente de pollo con ensalada de col y salsa picante.', 7.99, 'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'hamburguesaProducto'),
(4, 'Pizza Hawaiana', 'Pizza con piña, jamón y queso.', 12.99, 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'pizza'),
(5, 'Pizza Pollo y Champiñones', 'Pizza con pollo, champiñones y salsa de tomate.', 13.99, 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'pizza'),
(6, 'Pizza 3 Carnes', 'Pizza con pepperoni, jamón y salchicha.', 14.99, 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'pizza'),
(7, 'Pollo Frito Clásico', 'Pollo frito crujiente con especias.', 8.99, 'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'fried_chicken_label'),
(8, 'Pollo Frito Picante', 'Pollo frito crujiente con salsa picante.', 9.99, 'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'fried_chicken_label'),
(9, 'Pollo Frito con Ajo', 'Pollo frito marinado con ajo y hierbas.', 9.99, 'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'fried_chicken_label'),
(10, 'Tacos de Carne Asada', 'Tacos de carne asada con cebolla y cilantro.', 10.99, 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'tacos_label'),
(11, 'Tacos de Pollo', 'Tacos de pollo con guacamole y salsa verde.', 10.99, 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'tacos_label'),
(12, 'Tacos de Pescado', 'Tacos de pescado frito con salsa de aguacate.', 12.99, 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'taco_pescado'),
(13, 'Plato Mixto Carne y Pollo', 'Plato combinado de carne y pollo con papas fritas.', 16.99, 'https://images.pexels.com/photos/5710204/pexels-photo-5710204.jpeg?auto=compress&cs=tinysrgb&w=600', 'mixed_plate_label'),
(14, 'Plato Mixto Vegetariano', 'Plato mixto de vegetales asados y ensalada.', 14.99, 'https://images.pexels.com/photos/5710204/pexels-photo-5710204.jpeg?auto=compress&cs=tinysrgb&w=600', 'mixed_plate_label'),
(15, 'Plato Mixto Mar y Tierra', 'Plato combinado de carne, camarones y vegetales.', 18.99, 'https://images.pexels.com/photos/5710204/pexels-photo-5710204.jpeg?auto=compress&cs=tinysrgb&w=600', 'mixed_plate_label'),
(16, 'Sushi de Salmón', 'Sushi fresco de salmón con arroz y alga nori.', 20.99, 'https://images.pexels.com/photos/670705/pexels-photo-670705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'sushi'),
(17, 'Sushi de Atún', 'Sushi de atún con arroz, wasabi y salsa de soya.', 21.99, 'https://images.pexels.com/photos/670705/pexels-photo-670705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'sushi'),
(18, 'Sushi Mixto', 'Plato de sushi mixto con diferentes pescados.', 22.99, 'https://images.pexels.com/photos/670705/pexels-photo-670705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'sushi'),
(19, 'Refresco de Naranja', 'Refresco burbujeante con sabor a naranja.', 5.99, 'https://images.pexels.com/photos/1280364/pexels-photo-1280364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'drinks_label'),
(20, 'Limonada Natural', 'Limonada fresca con hielo y un toque de menta.', 4.99, 'https://images.pexels.com/photos/1280364/pexels-photo-1280364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'drinks_label'),
(21, 'Batido de Fresas', 'Batido cremoso de fresas con leche.', 6.99, 'https://images.pexels.com/photos/1280364/pexels-photo-1280364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'drinks_label'),
(22, 'Ensalada César', 'Ensalada con lechuga, pollo, crutones y aderezo César.', 7.99, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'salad_label'),
(23, 'Ensalada Griega', 'Ensalada fresca con pepino, tomate, queso feta y aceitunas.', 8.49, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'salad_label'),
(24, 'Ensalada de Quinoa', 'Ensalada de quinoa con aguacate, tomate y aderezo de limón.', 8.99, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'salad_label'),
(25, 'Espagueti Boloñesa', 'Espagueti con salsa boloñesa y queso parmesano.', 14.99, 'https://images.pexels.com/photos/8500/food-dinner-pasta-spaghetti-8500.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'spaghetti_label'),
(26, 'Espagueti Alfredo', 'Espagueti con salsa Alfredo y pollo a la parrilla.', 15.99, 'https://images.pexels.com/photos/8500/food-dinner-pasta-spaghetti-8500.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'spaghetti_label'),
(27, 'Espagueti Carbonara', 'Espagueti con salsa carbonara, tocino y parmesano.', 16.99, 'https://images.pexels.com/photos/8500/food-dinner-pasta-spaghetti-8500.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'spaghetti_label'),
(28, 'Burrito Clásico', 'Burrito de carne con frijoles, arroz y salsa.', 11.99, 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'burrito_label'),
(29, 'Burrito Vegetariano', 'Burrito con frijoles, arroz, guacamole y queso.', 10.99, 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'burrito_label'),
(30, 'Burrito de Pollo', 'Burrito de pollo con queso, frijoles y salsa.', 12.99, 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'burrito_label'),
(31, 'Wrap de Pollo', 'Wrap con pollo asado, lechuga, tomate y aderezo ranch.', 9.49, 'https://images.pexels.com/photos/5840307/pexels-photo-5840307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'wrap_label'),
(32, 'Wrap Vegetariano', 'Wrap con vegetales, aguacate y hummus.', 8.99, 'https://images.pexels.com/photos/5840307/pexels-photo-5840307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'wrap_label'),
(33, 'Wrap de Atún', 'Wrap con atún, lechuga, tomate y mayonesa.', 9.99, 'https://images.pexels.com/photos/5840307/pexels-photo-5840307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'wrap_label'),
(34, 'Hot Dog Clásico', 'Hot dog con salchicha, mostaza y ketchup.', 6.99, 'https://images.pexels.com/photos/4518647/pexels-photo-4518647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'hotdog_label'),
(35, 'Hot Dog con Queso', 'Hot dog con salchicha, queso cheddar y cebolla.', 7.49, 'https://images.pexels.com/photos/4518647/pexels-photo-4518647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'hotdog_label'),
(36, 'Hot Dog con Tocino', 'Hot dog con salchicha, tocino y salsa barbacoa.', 7.99, 'https://images.pexels.com/photos/4518647/pexels-photo-4518647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'hotdog_label');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`) VALUES
(3, 'ricardosa', '$2a$08$bhFM8xRHOQ56NPeppCRAJuVGkMV9wG6bWxYlOEhlw09/EOXKTj1Ea', 'admin', '2024-10-17 18:24:40'),
(7, 'ricardo', '$2a$08$MpmZE4wKEcnrDMNq4E3KSOUO72KZ8qyif2dnOHeKJgWVeG9I71rta', 'admin', '2024-10-19 21:16:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
