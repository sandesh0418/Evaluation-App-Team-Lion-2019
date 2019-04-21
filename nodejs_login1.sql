-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 17, 2019 at 07:18 PM
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
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `Assignment_ID` varchar(36) NOT NULL,
  `Measure_ID` varchar(36) NOT NULL,
  `User_Email` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`Assignment_ID`, `Measure_ID`, `User_Email`) VALUES
('46971960-60b7-11e9-a6fd-cb919ff3d6c7', '7b0153f0-56fd-11e9-9400-37c5a1830f52', 'blomqurw@warhawks.ulm.edu'),
('71d77ca0-60b7-11e9-9a69-9d3e10496931', '7b0153f0-56fd-11e9-9400-37c5a1830f52', 'blomqurw@warhawks.ulm.edu'),
('99dcc730-60b9-11e9-82bc-4bd019eff250', '9f4a44b0-56fd-11e9-9400-37c5a1830f52', 'blomqurw@warhawks.ulm.edu'),
('c7dcd190-60b7-11e9-86eb-4b16359ecefd', '7b0153f0-56fd-11e9-9400-37c5a1830f52', 'blomqurw@warhawks.ulm.edu');

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
('5u0x48kujuk2n580', ' Subject Knowledge', 0.00, 1),
('5u0x48kujuk2n580', 'Delivery', 0.00, 2),
('5u0x48kujuk2n580', 'Organization ', 0.00, 3),
('5u0x48kujuk2n580', 'Other', 0.00, 4),
('5u0x49c7juk38b0z', ' Crit -1', 40.00, 1),
('5u0x49c7juk38b0z', ' Crit -2', 60.00, 2);

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
('5u0x4o3mjukovxq7', 'Cycle 2', 'Fall 2020', ' ', '962vkjugbg5be', 'In Progress'),
('96oojuj5njdc', 'Fall Assestment', 'Fall 2019', '04/16/2019', '962vkjugbg5be', 'In Progress');

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
('5u0x48kujuk2n580', 1, 'Subject Knowledge -1', 1),
('5u0x48kujuk2n580', 1, 'Subject Knowledge -2', 2),
('5u0x48kujuk2n580', 1, 'Subject Knowledge -3', 3),
('5u0x48kujuk2n580', 1, 'Subject Knowledge -4', 4),
('5u0x48kujuk2n580', 1, 'Subject Knowledge -5', 5),
('5u0x48kujuk2n580', 2, 'Delivery -1', 1),
('5u0x48kujuk2n580', 2, 'Delivery -2', 2),
('5u0x48kujuk2n580', 2, 'Delivery -3', 3),
('5u0x48kujuk2n580', 2, 'Delivery -4', 4),
('5u0x48kujuk2n580', 2, 'Delivery -5', 5),
('5u0x48kujuk2n580', 3, 'Organization -1', 1),
('5u0x48kujuk2n580', 3, 'Organization -2', 2),
('5u0x48kujuk2n580', 3, 'Organization -3', 3),
('5u0x48kujuk2n580', 3, 'Organization -4', 4),
('5u0x48kujuk2n580', 3, 'Organization -5', 5),
('5u0x48kujuk2n580', 4, 'Other -1', 1),
('5u0x48kujuk2n580', 4, 'Organization -2', 2),
('5u0x48kujuk2n580', 4, 'Organization -3', 3),
('5u0x48kujuk2n580', 4, 'Organization -4', 4),
('5u0x48kujuk2n580', 4, 'Organization -5', 5),
('5u0x49c7juk38b0z', 1, 'Crit 11', 1),
('5u0x49c7juk38b0z', 1, 'Crit 12', 2),
('5u0x49c7juk38b0z', 2, 'Crit 21', 1),
('5u0x49c7juk38b0z', 2, 'Crit 22', 2);

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
('5u0x48c3juk25lvv', 'Computer Science'),
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
('18efa400-6071-11e9-908b-cd14b898a676', '8bfaf110-5401-11e9-9e6b-dbacca37e476', 'null', 0.5, 60, 'CSCI 3030 Final'),
('7b0153f0-56fd-11e9-9400-37c5a1830f52', '1', '', 0.75, 3, 'BUSN_3005'),
('9f4a44b0-56fd-11e9-9400-37c5a1830f52', '1', '', 0.75, 0.6, 'CSCI 3005 Final');

-- --------------------------------------------------------

--
-- Table structure for table `outcome`
--

CREATE TABLE `outcome` (
  `Outcome_ID` varchar(36) NOT NULL,
  `Description` text NOT NULL,
  `Outcome_Name` varchar(40) NOT NULL,
  `Cycle_Id` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `outcome`
--

INSERT INTO `outcome` (`Outcome_ID`, `Description`, `Outcome_Name`, `Cycle_Id`) VALUES
('1', 'Communicate effectively in a variety of professional contexts.', 'Outcome 1', '96oojuj5njdc'),
('29c5aab0-6132-11e9-b432-338a63607597', 'This should have cycle_id .', 'Outcome 6', '96oojuj5njdc'),
('4429b080-6133-11e9-bbf5-2f1021b5cf01', 'Second outcome of this cycle.', 'Outcome 2', '5u0x4o3mjukovxq7'),
('44760af0-60b3-11e9-97bf-6be97e02fb58', 'Add Outcome Test.', 'Outcome 2', '96oojuj5njdc'),
('8bfaf110-5401-11e9-9e6b-dbacca37e476', 'Analyze a complex computing problem and apply principles of computing and other relevant disciplines to identify solutions.', 'Outcome 3', '96oojuj5njdc'),
('a0091100-5401-11e9-9e6b-dbacca37e476', 'Design, implement, and evaluate a computing based solution to meet a given set of computing requirements in the context of the discipline.', 'Outcome 4', '96oojuj5njdc'),
('ae61db60-5401-11e9-9e6b-dbacca37e476', 'Recognize professional responsibilities and make informed judgments in computing practice based on legal and ethical principles.', 'Outcome 5', '96oojuj5njdc'),
('d1f58b60-6132-11e9-81b7-814fafe330d5', 'This is the first outcome of this cycle.', 'Outcome 1', '5u0x4o3mjukovxq7');

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

--
-- Dumping data for table `rubric`
--

INSERT INTO `rubric` (`Rubric_Id`, `Rubric_Title`, `Rows`, `scores`, `weight`, `Cycle_Id`) VALUES
('5u0x48kujuk2n580', 'BUSN_3005', 4, 5, 0, NULL),
('5u0x49c7juk38b0z', 'TestW', 2, 2, 1, NULL);

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
('5u0x48kujuk2n580', ' Limited', 1),
('5u0x48kujuk2n580', ' Developing', 2),
('5u0x48kujuk2n580', ' Capable', 3),
('5u0x48kujuk2n580', 'Good', 4),
('5u0x48kujuk2n580', ' Excellent', 5),
('5u0x49c7juk38b0z', ' Good', 1),
('5u0x49c7juk38b0z', ' Excellent', 2);

-- --------------------------------------------------------

--
-- Table structure for table `subject_list`
--

CREATE TABLE `subject_list` (
  `Assignment_ID` varchar(36) NOT NULL,
  `Subject_ID` varchar(36) NOT NULL,
  `Subject_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subject_list`
--

INSERT INTO `subject_list` (`Assignment_ID`, `Subject_ID`, `Subject_Name`) VALUES
('99dcc730-60b9-11e9-82bc-4bd019eff250', '30057229', 'Ryan Blomquist'),
('99dcc730-60b9-11e9-82bc-4bd019eff250', '30057230', 'Bryan Smith'),
('99dcc730-60b9-11e9-82bc-4bd019eff250', '30057231', 'Joseph Blake'),
('99dcc730-60b9-11e9-82bc-4bd019eff250', '30057232null', 'Bebe Choppe'),
('c7dcd190-60b7-11e9-86eb-4b16359ecefd', '30057229', 'Ryan Blomquist'),
('c7dcd190-60b7-11e9-86eb-4b16359ecefd', '30057230', 'Bryan Smith'),
('c7dcd190-60b7-11e9-86eb-4b16359ecefd', '30057231', 'Joseph Blake'),
('c7dcd190-60b7-11e9-86eb-4b16359ecefd', '30057232null', 'Bebe Choppe');

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
(0, 'Joe', 'Blo', 'joeblo@yaa.com', NULL, NULL, NULL),
(30000000, 'Lon', 'Smith', 'lonsmith@gmail.com', '$2a$10$wHFInz86hIlzVEJ4xejzwuA0Td4j6VEnizoP1cLIWC9LUCLOKaDeS', 'Admin', '962vkjugbg5be'),
(30057229, 'Ryan', 'Blomquist', 'blomqurw@warhawks.ulm.edu', '$2a$10$tcEzRyfw53s0oJg43rMqQOOO4F/2xH1y5JpgWYyiKHma5XZO2aoCK', 'Administrator', '962vkjugbg5be'),
(30071170, 'Sandesh', 'Bhandari', 'sbhandari0418@gmail.com', '', 'Administrator', '962vkjugbg5be'),
(30071430, 'Dipiksha', 'Shrestha', 'dipiksha.shrestha11@gmail.com', '$2a$10$dGtEEYCXdyjLhpwPsxT3MuoUhYX1yQB1zhp43.vJH1wp/780HCrjy', 'Evaluator', '962vkjugbg5be');

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
-- ALTER TABLE `users`
--   ADD PRIMARY KEY (`CWID`),
--   ADD UNIQUE KEY `email` (`email`);

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
