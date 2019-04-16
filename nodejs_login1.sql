-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2019 at 04:34 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `cycle`
--

CREATE TABLE `cycle` (
  `Cycle_Id` varchar(25) NOT NULL,
  `Cycle_Name` varchar(50) NOT NULL,
  `Start_Date` varchar(20) NOT NULL,
  `End_Date` varchar(20) DEFAULT NULL,
  `Dept_Id` varchar(30) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cycle`
--

INSERT INTO `cycle` (`Cycle_Id`, `Cycle_Name`, `Start_Date`, `End_Date`, `Dept_Id`, `status`) VALUES
('96oojuj5njdc', 'Fall Assestment', 'Fall 2019', ' ', '962vkjugbg5be', 'In Progress');

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

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_Id` varchar(40) NOT NULL,
  `department_Name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_Id`, `department_Name`) VALUES
('962vkjugbg5be', 'Computer Science');

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
  `Cycle_Id` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `scales`
--

CREATE TABLE `scales` (
  `Rubric_Id` varchar(30) NOT NULL,
  `Value_Name` varchar(80) DEFAULT NULL,
  `Value_Number` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(30000000, 'Lon', 'Smith', 'lonsmith@gmail.com', '$2a$10$wHFInz86hIlzVEJ4xejzwuA0Td4j6VEnizoP1cLIWC9LUCLOKaDeS', 'Admin', 'Computer_Science2019'),
(30071170, 'Sandesh', 'Bhandari', 'sbhandari0418@gmail.com', '$2a$10$QhiF4lCEr83n7/MkzYVERuX2K6RqfrtmP4Woxhj1/IWGYIKTYOOdG', 'Administrator', '962vkjugbg5be'),
(30071430, 'Dipiksha', 'Shrestha', 'dipiksha.shrestha11@gmail.com', '$2a$10$dGtEEYCXdyjLhpwPsxT3MuoUhYX1yQB1zhp43.vJH1wp/780HCrjy', 'Evaluator', 'comp4020');

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
  ADD PRIMARY KEY (`Cycle_Id`),
  ADD KEY `Dept_Id` (`Dept_Id`);

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`Rubric_Id`,`Row_Id`,`index`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_Id`);

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
  ADD PRIMARY KEY (`Rubric_Id`),
  ADD KEY `Cycle_Id` (`Cycle_Id`);

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
-- Constraints for table `cycle`
--
ALTER TABLE `cycle`
  ADD CONSTRAINT `cycle_ibfk_1` FOREIGN KEY (`Dept_Id`) REFERENCES `department` (`department_Id`);

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
-- Constraints for table `rubric`
--
ALTER TABLE `rubric`
  ADD CONSTRAINT `rubric_ibfk_1` FOREIGN KEY (`Cycle_Id`) REFERENCES `cycle` (`Cycle_Id`);

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
