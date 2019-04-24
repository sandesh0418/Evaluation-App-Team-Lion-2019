-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 18, 2019 at 11:01 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_login1`
--

-- --------------------------------------------------------

--
-- Table structure for table `measure`
--

CREATE TABLE `measure` (
  `Measure_ID` varchar(36) NOT NULL,
  `Outcome_ID` varchar(36) NOT NULL,
  `Description` text NOT NULL,
  `Percent_to_reach_target` double NOT NULL,
  `Target_Score` double NOT NULL,
  `Tool_Name` varchar(40) NOT NULL,
  `Measure_Name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `measure`
--

INSERT INTO `measure` (`Measure_ID`, `Outcome_ID`, `Description`, `Percent_to_reach_target`, `Target_Score`, `Tool_Name`, `Measure_Name`) VALUES
('2b10ec50-6217-11e9-b360-a3bb57c03351', 'd1f58b60-6132-11e9-81b7-814fafe330d5', 'null', 0.8, 3, 'Cycle_2_Rubric', '1.1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `measure`
--
ALTER TABLE `measure`
  ADD PRIMARY KEY (`Measure_ID`),
  ADD KEY `Outcome_ID` (`Outcome_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `measure`
--
ALTER TABLE `measure`
  ADD CONSTRAINT `measure_ibfk_1` FOREIGN KEY (`Outcome_ID`) REFERENCES `outcome` (`Outcome_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
