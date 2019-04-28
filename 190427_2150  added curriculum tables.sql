-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 28, 2019 at 04:49 AM
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
('067b5480-6630-11e9-90ea-8773f28d052b', '1d32ad60-662e-11e9-b82a-7367c1ebd906', 'blomqurw@warhawks.ulm.edu'),
('218f3440-662f-11e9-90ea-8773f28d052b', '00ae9140-662e-11e9-b82a-7367c1ebd906', 'blomqurw@warhawks.ulm.edu'),
('4369dcd0-67df-11e9-af32-dda0e35c069e', '00ae9140-662e-11e9-b82a-7367c1ebd906', 'blomqurw@warhawks.ulm.edu'),
('87ff1c90-662f-11e9-90ea-8773f28d052b', 'ad87d5c0-662e-11e9-b82a-7367c1ebd906', 'blomqurw@warhawks.ulm.edu'),
('894eb480-66d3-11e9-9f9b-f54e9a8c8eda', '00ae9140-662e-11e9-b82a-7367c1ebd906', 'dipiksha.shrestha11@gmail.com'),
('aa111690-66d3-11e9-9f9b-f54e9a8c8eda', 'ad87d5c0-662e-11e9-b82a-7367c1ebd906', 'dipiksha.shrestha11@gmail.com'),
('cc3963d0-67dc-11e9-b44c-cd2f8fce3ad3', '00ae9140-662e-11e9-b82a-7367c1ebd906', 'blomqurw@warhawks.ulm.edu'),
('e407f490-66d3-11e9-afc0-1f3e475bbcdc', '1d32ad60-662e-11e9-b82a-7367c1ebd906', 'dipiksha.shrestha11@gmail.com');

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
('1rqtt813gjuzpd7x1', ' aa', 0.00, 1),
('1rqtt813gjuzpd7x1', ' bb', 0.00, 2),
('5u0x4139ijulsgjdo', ' ', 0.00, 1),
('5u0x4139ijulsgjdo', ' ', 0.00, 2),
('5u0x4139ijulsgjdo', ' ', 0.00, 3),
('5u0x4139ijulsoauy', '', 40.00, 1),
('5u0x4139ijulsoauy', '', 30.00, 2),
('5u0x4139ijulsoauy', '', 30.00, 3),
('5u0x41bwnjum4o897', ' Crit1', 33.34, 1),
('5u0x41bwnjum4o897', ' Crit2', 33.33, 2),
('5u0x41bwnjum4o897', ' Crit3', 33.33, 3),
('5u0x41bwnjum4rhwg', 'Crit1 multi word.', 0.00, 1),
('5u0x41bwnjum4rhwg', 'Crit2 multi word.', 0.00, 2),
('5u0x41bwnjum4rhwg', 'Crit3 multi word. ', 0.00, 3),
('5u0x41bwnjum4rhwg', 'Crit4 multi word.', 0.00, 4),
('5u0x41bwnjum4rhwg', 'Crit5 multi word.', 0.00, 5),
('5u0x41tqgjunahf0o', ' ', 50.00, 1),
('5u0x41tqgjunahf0o', ' ', 0.00, 2),
('5u0x48kujuk2n580', ' Subject Knowledge', 0.00, 1),
('5u0x48kujuk2n580', 'Delivery', 0.00, 2),
('5u0x48kujuk2n580', 'Organization ', 0.00, 3),
('5u0x48kujuk2n580', 'Other', 0.00, 4),
('5u0x49c7juk38b0z', ' Crit -1', 40.00, 1),
('5u0x49c7juk38b0z', ' Crit -2', 60.00, 2),
('8gvua58q1juu1ld3o', ' Crit 1', 70.00, 1),
('8gvua58q1juu1ld3o', ' Crit 2', 20.00, 2),
('8gvua58q1juu1ld3o', 'Crit 3', 10.00, 3),
('ldu4c65juvonwey', ' ', 0.00, 1),
('ldu4c65juvonwey', ' ', 0.00, 2);

-- --------------------------------------------------------

--
-- Table structure for table `curriculum`
--

CREATE TABLE `curriculum` (
  `Department_Code` varchar(4) NOT NULL,
  `Course_Code` int(4) NOT NULL,
  `Cycle_Id` varchar(25) NOT NULL,
  `Credit_Hours` tinyint(4) NOT NULL,
  `Course_ID` varchar(36) NOT NULL,
  `Name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `curriculum`
--

INSERT INTO `curriculum` (`Department_Code`, `Course_Code`, `Cycle_Id`, `Credit_Hours`, `Course_ID`, `Name`) VALUES
('BUSN', 3005, '5u0x4o3mjukovxq7', 3, '1', 'Business Communications Testing chagne'),
('CINS', 3040, '96oojuj5njdc', 3, '2', 'Intro. to Networking'),
('CSCI', 2098, '5u0x4o3mjukovxq7', 2, '4', 'Software Ethics testing change'),
('COMM', 3000, '5u0x4o3mjukovxq7', 3, '670950a0-68af-11e9-b2d4-ebbcc651aa58', 'Professional Writing'),
('CSCI', 2000, '5u0x4o3mjukovxq7', 3, 'a90cd720-68ae-11e9-81fc-4f56091cd30a', 'Introduction to Programming'),
('CSCI', 3005, '5u0x4o3mjukovxq7', 3, 'def2f220-694e-11e9-846c-c76aed90e0f7', 'Algorithms');

-- --------------------------------------------------------

--
-- Table structure for table `curriculum_outcome_mapping`
--

CREATE TABLE `curriculum_outcome_mapping` (
  `Course_ID` varchar(36) NOT NULL,
  `Outcome_ID` varchar(36) NOT NULL,
  `Relevant_Hours` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `curriculum_outcome_mapping`
--

INSERT INTO `curriculum_outcome_mapping` (`Course_ID`, `Outcome_ID`, `Relevant_Hours`) VALUES
('1', '4429b080-6133-11e9-bbf5-2f1021b5cf01', 21),
('1', 'd1f58b60-6132-11e9-81b7-814fafe330d5', 20),
('2', 'd1f58b60-6132-11e9-81b7-814fafe330d5', 30),
('670950a0-68af-11e9-b2d4-ebbcc651aa58', 'd1f58b60-6132-11e9-81b7-814fafe330d5', 10),
('a90cd720-68ae-11e9-81fc-4f56091cd30a', 'fd02a5b0-630b-11e9-9828-b3bfa6292489', 30);

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
('96oojuj5njdc', 'Fall Assestment', 'Fall 2019', '04/16/2019', '962vkjugbg5be', 'In Progress'),
('ldu4c65juvolsjs', 'Test Cycle', 'April 2019', ' ', '962vkjugbg5be', 'In Progress');

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
('1rqtt813gjuzpd7x1', 1, 'a1', 1),
('1rqtt813gjuzpd7x1', 1, 'a2', 2),
('1rqtt813gjuzpd7x1', 2, 'b1', 1),
('1rqtt813gjuzpd7x1', 2, 'b2', 2),
('5u0x4139ijulsgjdo', 1, '', 1),
('5u0x4139ijulsgjdo', 1, '', 2),
('5u0x4139ijulsgjdo', 1, '', 3),
('5u0x4139ijulsgjdo', 2, '', 1),
('5u0x4139ijulsgjdo', 2, '', 2),
('5u0x4139ijulsgjdo', 2, '', 3),
('5u0x4139ijulsgjdo', 3, '', 1),
('5u0x4139ijulsgjdo', 3, '', 2),
('5u0x4139ijulsgjdo', 3, '', 3),
('5u0x4139ijulsoauy', 1, '', 1),
('5u0x4139ijulsoauy', 1, '', 2),
('5u0x4139ijulsoauy', 1, '', 3),
('5u0x4139ijulsoauy', 2, '', 1),
('5u0x4139ijulsoauy', 2, '', 2),
('5u0x4139ijulsoauy', 2, '', 3),
('5u0x4139ijulsoauy', 3, '', 1),
('5u0x4139ijulsoauy', 3, '', 2),
('5u0x4139ijulsoauy', 3, '', 3),
('5u0x41bwnjum4o897', 1, 'Crit11 description.', 1),
('5u0x41bwnjum4o897', 1, 'Crit12 description.', 2),
('5u0x41bwnjum4o897', 1, 'Crit13 description.', 3),
('5u0x41bwnjum4o897', 2, 'Crit21 description.', 1),
('5u0x41bwnjum4o897', 2, 'Crit22 descripiton.', 2),
('5u0x41bwnjum4o897', 2, 'Crit23 description.', 3),
('5u0x41bwnjum4o897', 3, 'Crit31 description.', 1),
('5u0x41bwnjum4o897', 3, 'Crit32 description.', 2),
('5u0x41bwnjum4o897', 3, 'Crit33 description.', 3),
('5u0x41bwnjum4rhwg', 1, 'Crit11', 1),
('5u0x41bwnjum4rhwg', 1, 'Crit12', 2),
('5u0x41bwnjum4rhwg', 1, 'Crit13', 3),
('5u0x41bwnjum4rhwg', 1, 'Crit14', 4),
('5u0x41bwnjum4rhwg', 1, 'Crit15', 5),
('5u0x41bwnjum4rhwg', 1, 'Crit16', 6),
('5u0x41bwnjum4rhwg', 2, 'Crit21', 1),
('5u0x41bwnjum4rhwg', 2, 'Crit22', 2),
('5u0x41bwnjum4rhwg', 2, 'Crit23', 3),
('5u0x41bwnjum4rhwg', 2, 'Crit24', 4),
('5u0x41bwnjum4rhwg', 2, 'Crit25', 5),
('5u0x41bwnjum4rhwg', 2, 'Crit26', 6),
('5u0x41bwnjum4rhwg', 3, 'Crit31', 1),
('5u0x41bwnjum4rhwg', 3, 'Crit32', 2),
('5u0x41bwnjum4rhwg', 3, 'Crit33', 3),
('5u0x41bwnjum4rhwg', 3, 'Crit34', 4),
('5u0x41bwnjum4rhwg', 3, 'Crit35', 5),
('5u0x41bwnjum4rhwg', 3, 'Crit36', 6),
('5u0x41bwnjum4rhwg', 4, 'Crit41', 1),
('5u0x41bwnjum4rhwg', 4, 'Crit42', 2),
('5u0x41bwnjum4rhwg', 4, 'Crit43', 3),
('5u0x41bwnjum4rhwg', 4, 'Crit44', 4),
('5u0x41bwnjum4rhwg', 4, 'Crit45', 5),
('5u0x41bwnjum4rhwg', 4, 'Crit46', 6),
('5u0x41bwnjum4rhwg', 5, 'Crit51', 1),
('5u0x41bwnjum4rhwg', 5, 'Crit52', 2),
('5u0x41bwnjum4rhwg', 5, 'Crit53', 3),
('5u0x41bwnjum4rhwg', 5, 'Crit54', 4),
('5u0x41bwnjum4rhwg', 5, 'Crit55', 5),
('5u0x41bwnjum4rhwg', 5, 'Crit56', 6),
('5u0x41tqgjunahf0o', 1, '', 1),
('5u0x41tqgjunahf0o', 1, '', 2),
('5u0x41tqgjunahf0o', 2, '', 1),
('5u0x41tqgjunahf0o', 2, '', 2),
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
('5u0x49c7juk38b0z', 2, 'Crit 22', 2),
('8gvua58q1juu1ld3o', 1, 'Description 11', 1),
('8gvua58q1juu1ld3o', 1, 'Description 12', 2),
('8gvua58q1juu1ld3o', 1, 'Description 13', 3),
('8gvua58q1juu1ld3o', 2, 'Description 21', 1),
('8gvua58q1juu1ld3o', 2, 'Description 22', 2),
('8gvua58q1juu1ld3o', 2, 'Description 23', 3),
('8gvua58q1juu1ld3o', 3, 'Description 31', 1),
('8gvua58q1juu1ld3o', 3, 'Description 32', 2),
('8gvua58q1juu1ld3o', 3, 'Description 33', 3),
('ldu4c65juvonwey', 1, '', 1),
('ldu4c65juvonwey', 1, '', 2),
('ldu4c65juvonwey', 2, '', 1),
('ldu4c65juvonwey', 2, '', 2);

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
('5u0x41tqgjun9qezl', ''),
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
  `Tool_Name` varchar(40) NOT NULL,
  `Measure_Name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `measure`
--

INSERT INTO `measure` (`Measure_ID`, `Outcome_ID`, `Description`, `Percent_to_reach_target`, `Target_Score`, `Tool_Name`, `Measure_Name`) VALUES
('00ae9140-662e-11e9-b82a-7367c1ebd906', 'd1f58b60-6132-11e9-81b7-814fafe330d5', 'null', 0.75, 0.6, 'CSCI 2098 Final', 'Test 75% > 60% 2098'),
('1d32ad60-662e-11e9-b82a-7367c1ebd906', 'fd02a5b0-630b-11e9-9828-b3bfa6292489', 'null', 0.75, 2, 'Test_Weighted_Rubric', 'Weighted. 75% > Average.'),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '4429b080-6133-11e9-bbf5-2f1021b5cf01', 'null', 0.75, 4, 'Cycle_2_Rubric', 'Unweighted. 75% > Good.');

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
('19c21aa0-66d1-11e9-a2f2-134acc517977', 'This is the outcome description.  Look at how long this boy is.', 'Testing Outcome in Test Cycle.', 'ldu4c65juvolsjs'),
('4429b080-6133-11e9-bbf5-2f1021b5cf01', 'Second outcome of this cycle.', ' Cycle 2 Outcome 2', '5u0x4o3mjukovxq7'),
('6f6ce8f0-61ee-11e9-8a15-b3b8f343f793', 'The first outcome of the fall assestment.', 'Fall Assestment Outcome 1', '96oojuj5njdc'),
('8bf1c860-61ee-11e9-8a15-b3b8f343f793', 'The second outcome of the fall assestment.', 'Fall Assestment Outcome 2', '96oojuj5njdc'),
('d1f58b60-6132-11e9-81b7-814fafe330d5', 'This is the first outcome of this cycle.', 'Cycle 2 Outcome 1', '5u0x4o3mjukovxq7'),
('fd02a5b0-630b-11e9-9828-b3bfa6292489', 'Third outcome of cycle 2.', 'Cyle 2 Outcome 3', '5u0x4o3mjukovxq7');

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
('1rqtt813gjuzpd7x1', '1234', 2, 2, 0, '5u0x4o3mjukovxq7'),
('5u0x4139ijulsgjdo', 'Blank_Rubric', 3, 3, 0, '96oojuj5njdc'),
('5u0x4139ijulsoauy', 'Test2', 3, 3, 1, '96oojuj5njdc'),
('5u0x41bwnjum4o897', 'Cycle_2_Rubric_w', 3, 3, 1, '5u0x4o3mjukovxq7'),
('5u0x41bwnjum4rhwg', 'Cycle_2_Rubric', 5, 6, 0, '5u0x4o3mjukovxq7'),
('5u0x41tqgjunahf0o', 'Test Create Rubric 3', 2, 2, 1, '5u0x4o3mjukovxq7'),
('5u0x48kujuk2n580', 'BUSN_3005', 4, 5, 0, '96oojuj5njdc'),
('5u0x49c7juk38b0z', 'TestW', 2, 2, 1, '96oojuj5njdc'),
('8gvua58q1juu1ld3o', 'Test_Weighted_Rubric', 3, 3, 1, '5u0x4o3mjukovxq7'),
('ldu4c65juvonwey', 'Test Cycle Rubric.', 2, 2, 0, 'ldu4c65juvolsjs');

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
('1rqtt813gjuzpd7x1', ' aa', 1),
('1rqtt813gjuzpd7x1', ' bb', 2),
('5u0x4139ijulsgjdo', ' ', 1),
('5u0x4139ijulsgjdo', ' ', 2),
('5u0x4139ijulsgjdo', ' ', 3),
('5u0x4139ijulsoauy', '', 1),
('5u0x4139ijulsoauy', '', 2),
('5u0x4139ijulsoauy', '', 3),
('5u0x41bwnjum4o897', ' Poor', 1),
('5u0x41bwnjum4o897', ' Average', 2),
('5u0x41bwnjum4o897', ' Good', 3),
('5u0x41bwnjum4rhwg', 'Bad', 1),
('5u0x41bwnjum4rhwg', ' Below Average', 2),
('5u0x41bwnjum4rhwg', ' Approaching Average', 3),
('5u0x41bwnjum4rhwg', 'Good', 4),
('5u0x41bwnjum4rhwg', ' Excellent', 5),
('5u0x41bwnjum4rhwg', 'Terrific ', 6),
('5u0x41tqgjunahf0o', ' ', 1),
('5u0x41tqgjunahf0o', ' ', 2),
('5u0x48kujuk2n580', ' Limited', 1),
('5u0x48kujuk2n580', ' Developing', 2),
('5u0x48kujuk2n580', ' Capable', 3),
('5u0x48kujuk2n580', 'Good', 4),
('5u0x48kujuk2n580', ' Excellent', 5),
('5u0x49c7juk38b0z', ' Good', 1),
('5u0x49c7juk38b0z', ' Excellent', 2),
('8gvua58q1juu1ld3o', ' Poor', 1),
('8gvua58q1juu1ld3o', ' Average', 2),
('8gvua58q1juu1ld3o', ' Good', 3),
('ldu4c65juvonwey', ' ', 1),
('ldu4c65juvonwey', ' ', 2);

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
('067b5480-6630-11e9-90ea-8773f28d052b', '10', 'MMM'),
('067b5480-6630-11e9-90ea-8773f28d052b', '11', 'NNN'),
('067b5480-6630-11e9-90ea-8773f28d052b', '12', 'OOO'),
('067b5480-6630-11e9-90ea-8773f28d052b', '9', 'LLL'),
('218f3440-662f-11e9-90ea-8773f28d052b', '1', 'Abe'),
('218f3440-662f-11e9-90ea-8773f28d052b', '2', 'Joe'),
('218f3440-662f-11e9-90ea-8773f28d052b', '3', 'Matt'),
('218f3440-662f-11e9-90ea-8773f28d052b', '4', 'Jim'),
('87ff1c90-662f-11e9-90ea-8773f28d052b', '5', 'Beth'),
('87ff1c90-662f-11e9-90ea-8773f28d052b', '6', 'Mary'),
('87ff1c90-662f-11e9-90ea-8773f28d052b', '7', 'Sue'),
('87ff1c90-662f-11e9-90ea-8773f28d052b', '8', 'Ava'),
('aa111690-66d3-11e9-9f9b-f54e9a8c8eda', '5', 'Beth'),
('aa111690-66d3-11e9-9f9b-f54e9a8c8eda', '6', 'Mary'),
('aa111690-66d3-11e9-9f9b-f54e9a8c8eda', '7', 'Sue'),
('aa111690-66d3-11e9-9f9b-f54e9a8c8eda', '8', 'Ava');

-- --------------------------------------------------------

--
-- Stand-in structure for view `subject_list_and_score`
-- (See below for the actual view)
--
CREATE TABLE `subject_list_and_score` (
`Subject_Name` varchar(50)
,`Subject_ID` varchar(36)
,`User_Email` varchar(60)
,`Score` double
,`Measure_Name` text
);

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

--
-- Dumping data for table `subject_score`
--

INSERT INTO `subject_score` (`Measure_ID`, `Subject_ID`, `User_Email`, `Criteria_Title`, `Score`) VALUES
('00ae9140-662e-11e9-b82a-7367c1ebd906', '1', 'blomqurw@warhawks.ulm.edu', 'Test', 0.61),
('00ae9140-662e-11e9-b82a-7367c1ebd906', '2', 'blomqurw@warhawks.ulm.edu', 'Test', 0.9),
('00ae9140-662e-11e9-b82a-7367c1ebd906', '3', 'blomqurw@warhawks.ulm.edu', 'Test', 0.6),
('00ae9140-662e-11e9-b82a-7367c1ebd906', '4', 'blomqurw@warhawks.ulm.edu', 'Test', 0.5),
('1d32ad60-662e-11e9-b82a-7367c1ebd906', '10', 'blomqurw@warhawks.ulm.edu', ' Crit 1', 3),
('1d32ad60-662e-11e9-b82a-7367c1ebd906', '10', 'blomqurw@warhawks.ulm.edu', ' Crit 2', 1),
('1d32ad60-662e-11e9-b82a-7367c1ebd906', '10', 'blomqurw@warhawks.ulm.edu', 'Crit 3', 1),
('1d32ad60-662e-11e9-b82a-7367c1ebd906', '11', 'blomqurw@warhawks.ulm.edu', ' Crit 1', 2),
('1d32ad60-662e-11e9-b82a-7367c1ebd906', '11', 'blomqurw@warhawks.ulm.edu', ' Crit 2', 3),
('1d32ad60-662e-11e9-b82a-7367c1ebd906', '11', 'blomqurw@warhawks.ulm.edu', 'Crit 3', 3),
('1d32ad60-662e-11e9-b82a-7367c1ebd906', '12', 'blomqurw@warhawks.ulm.edu', ' Crit 1', 3),
('1d32ad60-662e-11e9-b82a-7367c1ebd906', '12', 'blomqurw@warhawks.ulm.edu', ' Crit 2', 3),
('1d32ad60-662e-11e9-b82a-7367c1ebd906', '12', 'blomqurw@warhawks.ulm.edu', 'Crit 3', 3),
('1d32ad60-662e-11e9-b82a-7367c1ebd906', '9', 'blomqurw@warhawks.ulm.edu', ' Crit 1', 2),
('1d32ad60-662e-11e9-b82a-7367c1ebd906', '9', 'blomqurw@warhawks.ulm.edu', ' Crit 2', 2),
('1d32ad60-662e-11e9-b82a-7367c1ebd906', '9', 'blomqurw@warhawks.ulm.edu', 'Crit 3', 2),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '5', 'blomqurw@warhawks.ulm.edu', 'Crit1 multi word.', 6),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '5', 'blomqurw@warhawks.ulm.edu', 'Crit2 multi word.', 5),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '5', 'blomqurw@warhawks.ulm.edu', 'Crit3 multi word. ', 6),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '5', 'blomqurw@warhawks.ulm.edu', 'Crit4 multi word.', 6),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '5', 'blomqurw@warhawks.ulm.edu', 'Crit5 multi word.', 6),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '5', 'dipiksha.shrestha11@gmail.com', 'Crit1 multi word.', 5),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '5', 'dipiksha.shrestha11@gmail.com', 'Crit2 multi word.', 6),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '5', 'dipiksha.shrestha11@gmail.com', 'Crit3 multi word. ', 4),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '5', 'dipiksha.shrestha11@gmail.com', 'Crit4 multi word.', 5),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '5', 'dipiksha.shrestha11@gmail.com', 'Crit5 multi word.', 6),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '6', 'blomqurw@warhawks.ulm.edu', 'Crit1 multi word.', 4),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '6', 'blomqurw@warhawks.ulm.edu', 'Crit2 multi word.', 4),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '6', 'blomqurw@warhawks.ulm.edu', 'Crit3 multi word. ', 4),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '6', 'blomqurw@warhawks.ulm.edu', 'Crit4 multi word.', 4),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '6', 'blomqurw@warhawks.ulm.edu', 'Crit5 multi word.', 4),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '6', 'dipiksha.shrestha11@gmail.com', 'Crit1 multi word.', 3),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '6', 'dipiksha.shrestha11@gmail.com', 'Crit2 multi word.', 4),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '6', 'dipiksha.shrestha11@gmail.com', 'Crit3 multi word. ', 2),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '6', 'dipiksha.shrestha11@gmail.com', 'Crit4 multi word.', 3),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '6', 'dipiksha.shrestha11@gmail.com', 'Crit5 multi word.', 3),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '7', 'blomqurw@warhawks.ulm.edu', 'Crit1 multi word.', 1),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '7', 'blomqurw@warhawks.ulm.edu', 'Crit2 multi word.', 1),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '7', 'blomqurw@warhawks.ulm.edu', 'Crit3 multi word. ', 1),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '7', 'blomqurw@warhawks.ulm.edu', 'Crit4 multi word.', 1),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '7', 'blomqurw@warhawks.ulm.edu', 'Crit5 multi word.', 1),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '7', 'dipiksha.shrestha11@gmail.com', 'Crit1 multi word.', 2),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '7', 'dipiksha.shrestha11@gmail.com', 'Crit2 multi word.', 1),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '7', 'dipiksha.shrestha11@gmail.com', 'Crit3 multi word. ', 1),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '7', 'dipiksha.shrestha11@gmail.com', 'Crit4 multi word.', 1),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '7', 'dipiksha.shrestha11@gmail.com', 'Crit5 multi word.', 1),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '8', 'blomqurw@warhawks.ulm.edu', 'Crit1 multi word.', 3),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '8', 'blomqurw@warhawks.ulm.edu', 'Crit2 multi word.', 1),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '8', 'blomqurw@warhawks.ulm.edu', 'Crit3 multi word. ', 4),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '8', 'blomqurw@warhawks.ulm.edu', 'Crit4 multi word.', 5),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '8', 'blomqurw@warhawks.ulm.edu', 'Crit5 multi word.', 6),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '8', 'dipiksha.shrestha11@gmail.com', 'Crit1 multi word.', 6),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '8', 'dipiksha.shrestha11@gmail.com', 'Crit2 multi word.', 5),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '8', 'dipiksha.shrestha11@gmail.com', 'Crit3 multi word. ', 4),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '8', 'dipiksha.shrestha11@gmail.com', 'Crit4 multi word.', 3),
('ad87d5c0-662e-11e9-b82a-7367c1ebd906', '8', 'dipiksha.shrestha11@gmail.com', 'Crit5 multi word.', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `CWID` int(11) NOT NULL,
  `firstName` text,
  `lastName` text,
  `email` varchar(60) NOT NULL,
  `password` text,
  `role` text,
  `Dept_Id` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`CWID`, `firstName`, `lastName`, `email`, `password`, `role`, `Dept_Id`) VALUES
(0, NULL, NULL, '', NULL, 'Administrator', '5u0x41tqgjun9qezl'),
(30057229, 'Ryan', 'Blomquist', 'blomqurw@warhawks.ulm.edu', '$2a$10$tcEzRyfw53s0oJg43rMqQOOO4F/2xH1y5JpgWYyiKHma5XZO2aoCK', 'Administrator', '962vkjugbg5be'),
(30071430, 'Dipiksha', 'Shrestha', 'dipiksha.shrestha11@gmail.com', '$2a$10$dGtEEYCXdyjLhpwPsxT3MuoUhYX1yQB1zhp43.vJH1wp/780HCrjy', 'Evaluator', '962vkjugbg5be'),
(0, 'Mary', 'Sue', 'eusyarm@mailinator.com', NULL, 'Evaluator', '962vkjugbg5be'),
(0, 'Joe', 'Blo', 'joeblo@yaa.com', NULL, NULL, NULL),
(30000000, 'Lon', 'Smith', 'lonsmith@gmail.com', '$2a$10$wHFInz86hIlzVEJ4xejzwuA0Td4j6VEnizoP1cLIWC9LUCLOKaDeS', 'Admin', '962vkjugbg5be'),
(30071170, 'Sandesh', 'Bhandari', 'sbhandari0418@gmail.com', 'deleted', 'Administrator', '962vkjugbg5be');

-- --------------------------------------------------------

--
-- Structure for view `subject_list_and_score`
--
DROP TABLE IF EXISTS `subject_list_and_score`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `subject_list_and_score`  AS  select `sl`.`Subject_Name` AS `Subject_Name`,`sl`.`Subject_ID` AS `Subject_ID`,`a`.`User_Email` AS `User_Email`,`ss`.`Score` AS `Score`,`m`.`Measure_Name` AS `Measure_Name` from (((`subject_list` `sl` join `assignments` `a` on((`sl`.`Assignment_ID` = `a`.`Assignment_ID`))) join `measure` `m` on((`a`.`Measure_ID` = `m`.`Measure_ID`))) join `subject_score` `ss` on((`m`.`Measure_ID` = `ss`.`Measure_ID`))) where ((`sl`.`Subject_ID` = `ss`.`Subject_ID`) and (`a`.`User_Email` = `ss`.`User_Email`)) ;

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
-- Indexes for table `curriculum`
--
ALTER TABLE `curriculum`
  ADD PRIMARY KEY (`Course_ID`),
  ADD UNIQUE KEY `Department_Code` (`Department_Code`,`Course_Code`),
  ADD KEY `Cycle_Id` (`Cycle_Id`);

--
-- Indexes for table `curriculum_outcome_mapping`
--
ALTER TABLE `curriculum_outcome_mapping`
  ADD PRIMARY KEY (`Course_ID`,`Outcome_ID`),
  ADD UNIQUE KEY `Course_ID` (`Course_ID`,`Outcome_ID`),
  ADD KEY `Outcome_ID` (`Outcome_ID`);

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
  ADD PRIMARY KEY (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_3` FOREIGN KEY (`Measure_ID`) REFERENCES `measure` (`Measure_ID`),
  ADD CONSTRAINT `assignments_ibfk_4` FOREIGN KEY (`User_Email`) REFERENCES `users` (`email`);

--
-- Constraints for table `criteria`
--
ALTER TABLE `criteria`
  ADD CONSTRAINT `criteria_ibfk_1` FOREIGN KEY (`Rubric_Id`) REFERENCES `rubric` (`Rubric_Id`);

--
-- Constraints for table `curriculum`
--
ALTER TABLE `curriculum`
  ADD CONSTRAINT `curriculum_ibfk_1` FOREIGN KEY (`Cycle_Id`) REFERENCES `cycle` (`Cycle_Id`);

--
-- Constraints for table `curriculum_outcome_mapping`
--
ALTER TABLE `curriculum_outcome_mapping`
  ADD CONSTRAINT `curriculum_outcome_mapping_ibfk_1` FOREIGN KEY (`Course_ID`) REFERENCES `curriculum` (`Course_ID`),
  ADD CONSTRAINT `curriculum_outcome_mapping_ibfk_2` FOREIGN KEY (`Outcome_ID`) REFERENCES `outcome` (`Outcome_ID`);

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
