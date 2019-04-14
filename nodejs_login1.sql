-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2019 at 04:17 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

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
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `Assignment_ID` varchar(36) NOT NULL,
  `Measure_ID` varchar(36) NOT NULL,
  `User_Email` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `criteria`
--

CREATE TABLE `criteria` (
  `Rubric_Id` varchar(30) NOT NULL,
  `Criteria_Title` varchar(40) NOT NULL,
  `weight` float(4,2) DEFAULT NULL,
  `Row_Id` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `criteria`
--

INSERT INTO `criteria` (`Rubric_Id`, `Criteria_Title`, `weight`, `Row_Id`) VALUES
('966tgjufv269r', 'Appearance', 20.00, 1),
('966tgjufv269r', ' ', 0.00, 2),
('969gcjug13b6f', ' Sandesh', 22.50, 1),
('969gcjug13b6f', ' dddd', 44.50, 2),
('96casjug258yz', ' ', 0.00, 1),
('96casjug258yz', ' ', 0.00, 2),
('96casjug258yz', ' ', 0.00, 3);

-- --------------------------------------------------------

--
-- Table structure for table `cycle`
--

CREATE TABLE `cycle` (
  `Dept_ID` varchar(25) NOT NULL,
  `Cycle_Id` varchar(25) NOT NULL,
  `Cycle_Name` varchar(50) NOT NULL,
  `Start_Date` varchar(20) NOT NULL,
  `End_Date` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `Rubric_Id` varchar(30) NOT NULL,
  `Row_Id` int(2) NOT NULL,
  `Data` text,
  `index` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`Rubric_Id`, `Row_Id`, `Data`, `index`) VALUES
('966tgjufv269r', 1, 'samn', 1),
('966tgjufv269r', 1, 'ssds', 2),
('966tgjufv269r', 2, 'wqw', 1),
('966tgjufv269r', 2, '3w', 2),
('969gcjug13b6f', 1, '', 1),
('969gcjug13b6f', 1, '', 2),
('969gcjug13b6f', 2, '', 1),
('969gcjug13b6f', 2, '', 2),
('96casjug258yz', 1, '', 1),
('96casjug258yz', 1, '', 2),
('96casjug258yz', 1, '', 3),
('96casjug258yz', 2, '', 1),
('96casjug258yz', 2, '', 2),
('96casjug258yz', 2, '', 3),
('96casjug258yz', 3, '', 1),
('96casjug258yz', 3, '', 2),
('96casjug258yz', 3, '', 3);

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
  `Tool_Name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `measure`
--

INSERT INTO `measure` (`Measure_ID`, `Outcome_ID`, `Description`, `Percent_to_reach_target`, `Target_Score`, `Tool_Name`) VALUES
('7b0153f0-56fd-11e9-9400-37c5a1830f52', '1', '', 0.75, 3, 'BUSN 3005'),
('9f4a44b0-56fd-11e9-9400-37c5a1830f52', '1', '', 0.75, 0.6, 'CSCI 3005 Final');

-- --------------------------------------------------------

--
-- Table structure for table `outcome`
--

CREATE TABLE `outcome` (
  `Outcome_ID` varchar(36) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `outcome`
--

INSERT INTO `outcome` (`Outcome_ID`, `Description`) VALUES
('1', 'Communicate effectively in a variety of professional contexts.'),
('8bfaf110-5401-11e9-9e6b-dbacca37e476', 'Analyze a complex computing problem and apply principles of computing and other relevant disciplines to identify solutions.'),
('a0091100-5401-11e9-9e6b-dbacca37e476', 'Design, implement, and evaluate a computing based solution to meet a given set of computing requirements in the context of the discipline.'),
('ae61db60-5401-11e9-9e6b-dbacca37e476', 'Recognize professional responsibilities and make informed judgments in computing practice based on legal and ethical principles.');

-- --------------------------------------------------------

--
-- Table structure for table `rubric`
--

CREATE TABLE `rubric` (
  `Rubric_Id` varchar(30) NOT NULL,
  `Rubric_Title` varchar(40) NOT NULL,
  `Rows` int(20) NOT NULL,
  `scores` int(20) NOT NULL,
  `weight` int(1) NOT NULL,
  `dept_Id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rubric`
--

INSERT INTO `rubric` (`Rubric_Id`, `Rubric_Title`, `Rows`, `scores`, `weight`, `dept_Id`) VALUES
('966tgjufv269r', 'sandesh', 2, 2, 0, '966tgjufv269s'),
('969gcjug13b6f', 's', 2, 2, 1, '969gcjug13b6g'),
('96casjug258yz', 'b', 3, 3, 0, '96casjug258z0');

-- --------------------------------------------------------

--
-- Table structure for table `scales`
--

CREATE TABLE `scales` (
  `Rubric_Id` varchar(30) NOT NULL,
  `Value_Name` varchar(80) DEFAULT NULL,
  `Value_Number` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scales`
--

INSERT INTO `scales` (`Rubric_Id`, `Value_Name`, `Value_Number`) VALUES
('966tgjufv269r', 'Average', 1),
('966tgjufv269r', 'Good', 2),
('969gcjug13b6f', ' Apperance', 1),
('969gcjug13b6f', ' Good', 2),
('96casjug258yz', ' ', 1),
('96casjug258yz', ' ', 2),
('96casjug258yz', ' ', 3);

-- --------------------------------------------------------

--
-- Table structure for table `subject_list`
--

CREATE TABLE `subject_list` (
  `Assignment_ID` varchar(36) NOT NULL,
  `Subject_ID` varchar(36) NOT NULL,
  `Subject_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subject_score`
--

CREATE TABLE `subject_score` (
  `Measure_ID` varchar(36) NOT NULL,
  `Subject_ID` varchar(36) NOT NULL,
  `User_Email` varchar(60) NOT NULL,
  `Criteria_Title` varchar(40) NOT NULL,
  `Score` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `CWID` int(11) NOT NULL,
  `firstName` text,
  `lastName` text,
  `email` varchar(60) DEFAULT NULL,
  `password` text,
  `role` text,
  `Dept_Id` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`CWID`, `firstName`, `lastName`, `email`, `password`, `role`, `Dept_Id`) VALUES
(30071170, 'Sandesh', 'Bhandari', 'sbhandari0418@gmail.com', '$2a$10$QhiF4lCEr83n7/MkzYVERuX2K6RqfrtmP4Woxhj1/IWGYIKTYOOdG', 'Administrator', NULL),
(30071430, 'Dipiksha', 'Shrestha', 'dipiksha.shrestha11@gmail.com', '$2a$10$dGtEEYCXdyjLhpwPsxT3MuoUhYX1yQB1zhp43.vJH1wp/780HCrjy', 'Evaluator', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`Assignment_ID`),
  ADD KEY `User_Email` (`User_Email`),
  ADD KEY `Measure_ID` (`Measure_ID`);

--
-- Indexes for table `criteria`
--
ALTER TABLE `criteria`
  ADD PRIMARY KEY (`Rubric_Id`,`Row_Id`);

--
-- Indexes for table `cycle`
--
ALTER TABLE `cycle`
  ADD PRIMARY KEY (`Cycle_Id`);

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`Rubric_Id`,`Row_Id`,`index`);

--
-- Indexes for table `measure`
--
ALTER TABLE `measure`
  ADD PRIMARY KEY (`Measure_ID`),
  ADD KEY `Outcome_ID` (`Outcome_ID`);

--
-- Indexes for table `outcome`
--
ALTER TABLE `outcome`
  ADD PRIMARY KEY (`Outcome_ID`);

--
-- Indexes for table `rubric`
--
ALTER TABLE `rubric`
  ADD PRIMARY KEY (`Rubric_Id`);

--
-- Indexes for table `scales`
--
ALTER TABLE `scales`
  ADD PRIMARY KEY (`Rubric_Id`,`Value_Number`);

--
-- Indexes for table `subject_list`
--
ALTER TABLE `subject_list`
  ADD PRIMARY KEY (`Assignment_ID`,`Subject_ID`);

--
-- Indexes for table `subject_score`
--
ALTER TABLE `subject_score`
  ADD PRIMARY KEY (`Measure_ID`,`Subject_ID`,`User_Email`,`Criteria_Title`),
  ADD KEY `User_Email` (`User_Email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`CWID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_2` FOREIGN KEY (`User_Email`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `assignments_ibfk_3` FOREIGN KEY (`Measure_ID`) REFERENCES `measure` (`Measure_ID`);

--
-- Constraints for table `criteria`
--
ALTER TABLE `criteria`
  ADD CONSTRAINT `criteria_ibfk_1` FOREIGN KEY (`Rubric_Id`) REFERENCES `rubric` (`Rubric_Id`);

--
-- Constraints for table `data`
--
ALTER TABLE `data`
  ADD CONSTRAINT `data_ibfk_1` FOREIGN KEY (`Rubric_Id`) REFERENCES `rubric` (`Rubric_Id`);

--
-- Constraints for table `measure`
--
ALTER TABLE `measure`
  ADD CONSTRAINT `measure_ibfk_1` FOREIGN KEY (`Outcome_ID`) REFERENCES `outcome` (`Outcome_ID`);

--
-- Constraints for table `scales`
--
ALTER TABLE `scales`
  ADD CONSTRAINT `scales_ibfk_1` FOREIGN KEY (`Rubric_Id`) REFERENCES `rubric` (`Rubric_Id`);

--
-- Constraints for table `subject_list`
--
ALTER TABLE `subject_list`
  ADD CONSTRAINT `subject_list_ibfk_1` FOREIGN KEY (`Assignment_ID`) REFERENCES `assignments` (`Assignment_ID`);

--
-- Constraints for table `subject_score`
--
ALTER TABLE `subject_score`
  ADD CONSTRAINT `subject_score_ibfk_1` FOREIGN KEY (`Measure_ID`) REFERENCES `measure` (`Measure_ID`),
  ADD CONSTRAINT `subject_score_ibfk_2` FOREIGN KEY (`User_Email`) REFERENCES `users` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
