-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2019 at 11:10 PM
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

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`Assignment_ID`, `Measure_ID`, `User_Email`) VALUES
('10c7a220-6592-11e9-ac49-9f433d2876bf', '06e91540-6592-11e9-8cb3-9f6b5dca78ea', 'sbhandari0418@gmail.com'),
('46971960-60b7-11e9-a6fd-cb919ff3d6c7', '7b0153f0-56fd-11e9-9400-37c5a1830f52', 'blomqurw@warhawks.ulm.edu'),
('4e40be80-6591-11e9-84e2-7f553d7cd4ab', '40fc4a50-6591-11e9-918e-1790ff3beb49', 'sbhandari0418@gmail.com'),
('61e9a1d0-6632-11e9-a74b-b9b27e7bd586', '1bcae330-6632-11e9-bf1d-353d31f7d69b', 'sbhandari0418@gmail.com'),
('71d77ca0-60b7-11e9-9a69-9d3e10496931', '7b0153f0-56fd-11e9-9400-37c5a1830f52', 'blomqurw@warhawks.ulm.edu'),
('88308e10-6585-11e9-b5e0-653fe0dd2f3b', 'e1121d60-6584-11e9-a881-21d546de6b63', 'dipiksha.shrestha11@gmail.com'),
('99dcc730-60b9-11e9-82bc-4bd019eff250', '9f4a44b0-56fd-11e9-9400-37c5a1830f52', 'blomqurw@warhawks.ulm.edu'),
('c7dcd190-60b7-11e9-86eb-4b16359ecefd', '7b0153f0-56fd-11e9-9400-37c5a1830f52', 'blomqurw@warhawks.ulm.edu'),
('d7870950-6524-11e9-a71b-fb8a71a34229', '2b10ec50-6217-11e9-b360-a3bb57c03351', 'sbhandari0418@gmail.com'),
('d954cc60-6590-11e9-84e2-7f553d7cd4ab', '2b10ec50-6217-11e9-b360-a3bb57c03351', 'sbhandari0418@gmail.com'),
('f913c930-6585-11e9-b5e0-653fe0dd2f3b', 'e0dfa640-6585-11e9-869d-a1dafcc7aaa7', 'dipiksha.shrestha11@gmail.com');

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
('5u0x49c7juk38b0z', ' Crit -2', 60.00, 2),
('967vkjusm4dbj', ' ', 0.00, 1),
('967vkjusm4dbj', ' ', 0.00, 2),
('966l4jutbh7s1', ' Appearance', 0.00, 1),
('966l4jutbh7s1', ' Thinking', 0.00, 2),
('96by0jutf2or0', ' ', 50.00, 1),
('96by0jutf2or0', ' ', 50.00, 2),
('968bgjuujq6a3', ' c', 0.00, 1),
('968bgjuujq6a3', ' d', 0.00, 2),
('968bgjuuk3nfw', ' ', 50.00, 1),
('968bgjuuk3nfw', ' ', 50.00, 2),
('9626cjuvok60g', ' ', 0.00, 1),
('9626cjuvok60g', ' ', 0.00, 2),
('96ssjuvpe5qd', ' Appearance', 0.00, 1),
('96ssjuvpe5qd', ' Thinking', 0.00, 2);

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
('9626cjuvok60f', 'Fall 2019', '2019', '', '962vkjugbg5be', 'In Progress'),
('966l4jutbh7s0', 'sandesh', '2016', '04/24/2019', '962vkjugbg5be', 'done'),
('968bgjuujq6a2', 'sandesh', '2019', '', '962vkjugbg5be', 'In Progress'),
('96bd4jut3rtv9', 'a', 'a', '04/22/2019', '962vkjugbg5be', 'done'),
('96oojuj5njdc', 'Fall Assestment', 'Fall 2019', '04/16/2019', '962vkjugbg5be', 'done'),
('96ssjuvpe5qc', 'Spring 2020', '2020', '', '962vkjugbg5be', 'In Progress');

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
('5u0x49c7juk38b0z', 2, 'Crit 22', 2),
('9626cjuvok60g', 1, '', 1),
('9626cjuvok60g', 1, '', 2),
('9626cjuvok60g', 2, '', 1),
('9626cjuvok60g', 2, '', 2),
('966l4jutbh7s1', 1, 'a', 1),
('966l4jutbh7s1', 1, 'b', 2),
('966l4jutbh7s1', 2, 'c', 1),
('966l4jutbh7s1', 2, 'd', 2),
('967vkjusm4dbj', 1, '', 1),
('967vkjusm4dbj', 1, '', 2),
('967vkjusm4dbj', 2, '', 1),
('967vkjusm4dbj', 2, '', 2),
('968bgjuujq6a3', 1, 'e', 1),
('968bgjuujq6a3', 1, 'g', 2),
('968bgjuujq6a3', 2, 'f', 1),
('968bgjuujq6a3', 2, 'h', 2),
('968bgjuuk3nfw', 1, '', 1),
('968bgjuuk3nfw', 1, '', 2),
('968bgjuuk3nfw', 2, '', 1),
('968bgjuuk3nfw', 2, '', 2),
('96by0jutf2or0', 1, '', 1),
('96by0jutf2or0', 1, '', 2),
('96by0jutf2or0', 2, '', 1),
('96by0jutf2or0', 2, '', 2),
('96ssjuvpe5qd', 1, 'a', 1),
('96ssjuvpe5qd', 1, 'b', 2),
('96ssjuvpe5qd', 2, 'c', 1),
('96ssjuvpe5qd', 2, 'd', 2);

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
  `Tool_Name` varchar(40) NOT NULL,
  `Measure_Name` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `measure`
--

INSERT INTO `measure` (`Measure_ID`, `Outcome_ID`, `Description`, `Percent_to_reach_target`, `Target_Score`, `Tool_Name`, `Measure_Name`) VALUES
('06e91540-6592-11e9-8cb3-9f6b5dca78ea', '31733d50-6591-11e9-918e-1790ff3beb49', 'null', 0.75, 0.7, 'Test', 'Measure 2'),
('18efa400-6071-11e9-908b-cd14b898a676', '8bfaf110-5401-11e9-9e6b-dbacca37e476', 'null', 0.5, 60, 'CSCI 3030 Final', NULL),
('1bcae330-6632-11e9-bf1d-353d31f7d69b', '30f05c04-6631-11e9-a74b-b9b27e7bd586', 'null', 0.75, 1, 'a', 'Measure #'),
('2b10ec50-6217-11e9-b360-a3bb57c03351', 'd1f58b60-6132-11e9-81b7-814fafe330d5', 'null', 0.8, 3, 'Cycle_2_Rubric', '1.1'),
('40fc4a50-6591-11e9-918e-1790ff3beb49', '31733d50-6591-11e9-918e-1790ff3beb49', 'null', 0.85, 3, 'BUSN_3005', 'Measure #'),
('4a8d2f10-66d3-11e9-9c67-29e5b9b9dd96', '3f8dc8e0-66d3-11e9-9c67-29e5b9b9dd96', 'null', 0.8, 2, 'a', 'Measure #'),
('7b0153f0-56fd-11e9-9400-37c5a1830f52', '1', '', 0.75, 3, 'BUSN_3005', NULL),
('9abafa10-66cb-11e9-969e-53a585fc7ab7', '8abce420-66cb-11e9-969e-53a585fc7ab7', 'null', 0.75, 1, 'a', 'Measure 2'),
('9f4a44b0-56fd-11e9-9400-37c5a1830f52', '1', '', 0.75, 0.6, 'CSCI 3005 Final', NULL),
('e0dfa640-6585-11e9-869d-a1dafcc7aaa7', '4429b080-6133-11e9-bbf5-2f1021b5cf01', 'null', 0.75, 3, 'BUSN_3005', 'null'),
('e1121d60-6584-11e9-a881-21d546de6b63', 'afae6080-6584-11e9-a881-21d546de6b63', 'null', 0.5, 1, 'a', 'null'),
('fd98baf0-66cb-11e9-b451-4d78ef3783fa', 'f0cd4750-66cb-11e9-b451-4d78ef3783fa', 'null', 0.75, 1, 'a', 'Measure 8');

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
('224c81d0-66d4-11e9-a303-75e6020bbc68', '50% of students should get 2.5 or higher in CSCI 4000', 'Outcome 8', '96ssjuvpe5qc'),
('224ccff0-66d4-11e9-a303-75e6020bbc68', '50% of students should get 2.5 or higher in CSCI 4000', 'Outcome 4', '96ssjuvpe5qc'),
('224ccff1-66d4-11e9-a303-75e6020bbc68', '50% of students should get 2.5 or higher in CSCI 4000', 'Outcome 1', '96ssjuvpe5qc'),
('224ccff2-66d4-11e9-a303-75e6020bbc68', '50% of students should get 2.5 or higher in CSCI 4000', 'Outcome 4', '96ssjuvpe5qc'),
('29c5aab0-6132-11e9-b432-338a63607597', 'This should have cycle_id .', 'Outcome 6', '96oojuj5njdc'),
('30f034f0-6631-11e9-a74b-b9b27e7bd586', 'Communicate effectively in a variety of professional contexts.', 'Outcome 1', '968bgjuujq6a2'),
('30f05c00-6631-11e9-a74b-b9b27e7bd586', 'This should have cycle_id .', 'Outcome 6', '968bgjuujq6a2'),
('30f05c01-6631-11e9-a74b-b9b27e7bd586', 'Add Outcome Test.', 'Outcome 2', '968bgjuujq6a2'),
('30f05c02-6631-11e9-a74b-b9b27e7bd586', 'Analyze a complex computing problem and apply principles of computing and other relevant disciplines to identify solutions.', 'Outcome 3', '968bgjuujq6a2'),
('30f05c03-6631-11e9-a74b-b9b27e7bd586', 'Design, implement, and evaluate a computing based solution to meet a given set of computing requirements in the context of the discipline.', 'Outcome 4', '968bgjuujq6a2'),
('30f05c04-6631-11e9-a74b-b9b27e7bd586', 'Recognize professional responsibilities and make informed judgments in computing practice based on legal and ethical principles.', 'Outcome 5', '968bgjuujq6a2'),
('31733d50-6591-11e9-918e-1790ff3beb49', 'Third', 'Outcome 3', '5u0x4o3mjukovxq7'),
('3f8dc8e0-66d3-11e9-9c67-29e5b9b9dd96', '50% of students should get 2.5 or higher in CSCI 4000', 'Outcome 8', '966l4jutbh7s0'),
('4429b080-6133-11e9-bbf5-2f1021b5cf01', 'Second outcome of this cycle.', 'Outcome 2', '5u0x4o3mjukovxq7'),
('44760af0-60b3-11e9-97bf-6be97e02fb58', 'Add Outcome Test.', 'Outcome 2', '96oojuj5njdc'),
('8abce420-66cb-11e9-969e-53a585fc7ab7', '50% of students should get 2.5 or higher in CSCI 4000', 'Outcome 4', '966l4jutbh7s0'),
('8bfaf110-5401-11e9-9e6b-dbacca37e476', 'Analyze a complex computing problem and apply principles of computing and other relevant disciplines to identify solutions.', 'Outcome 3', '96oojuj5njdc'),
('a0091100-5401-11e9-9e6b-dbacca37e476', 'Design, implement, and evaluate a computing based solution to meet a given set of computing requirements in the context of the discipline.', 'Outcome 4', '96oojuj5njdc'),
('ae61db60-5401-11e9-9e6b-dbacca37e476', 'Recognize professional responsibilities and make informed judgments in computing practice based on legal and ethical principles.', 'Outcome 5', '96oojuj5njdc'),
('afae6080-6584-11e9-a881-21d546de6b63', '50% of students should get 2.5 or higher in CSCI 4000', 'Outcome 1', '966l4jutbh7s0'),
('d1f58b60-6132-11e9-81b7-814fafe330d5', 'This is the first outcome of this cycle.', 'Outcome 1', '5u0x4o3mjukovxq7'),
('e03dd490-66d0-11e9-93fb-79e4a1b253db', 'Communicate effectively in a variety of professional contexts.', 'Outcome 1', '9626cjuvok60f'),
('e03e22b0-66d0-11e9-93fb-79e4a1b253db', 'This should have cycle_id .', 'Outcome 6', '9626cjuvok60f'),
('e03e22b1-66d0-11e9-93fb-79e4a1b253db', 'Add Outcome Test.', 'Outcome 2', '9626cjuvok60f'),
('e03e22b2-66d0-11e9-93fb-79e4a1b253db', 'Analyze a complex computing problem and apply principles of computing and other relevant disciplines to identify solutions.', 'Outcome 3', '9626cjuvok60f'),
('e03e22b3-66d0-11e9-93fb-79e4a1b253db', 'Design, implement, and evaluate a computing based solution to meet a given set of computing requirements in the context of the discipline.', 'Outcome 4', '9626cjuvok60f'),
('e03e22b4-66d0-11e9-93fb-79e4a1b253db', 'Recognize professional responsibilities and make informed judgments in computing practice based on legal and ethical principles.', 'Outcome 5', '9626cjuvok60f'),
('f0cd4750-66cb-11e9-b451-4d78ef3783fa', '50% of students should get 2.5 or higher in CSCI 4000', 'Outcome 4', '966l4jutbh7s0');

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
('5u0x48kujuk2n580', 'BUSN_3005', 4, 5, 0, '5u0x4o3mjukovxq7'),
('5u0x49c7juk38b0z', 'TestW', 2, 2, 1, '5u0x4o3mjukovxq7'),
('9626cjuvok60g', 'a', 2, 2, 0, '9626cjuvok60f'),
('966l4jutbh7s1', 'a', 2, 2, 0, '966l4jutbh7s0'),
('967vkjusm4dbj', 'a', 2, 2, 0, '96oojuj5njdc'),
('968bgjuujq6a3', 'a', 2, 2, 0, '968bgjuujq6a2'),
('968bgjuuk3nfw', 'bhandari', 2, 2, 1, '5u0x4o3mjukovxq7'),
('96by0jutf2or0', 'sandesh', 2, 2, 1, '5u0x4o3mjukovxq7'),
('96ssjuvpe5qd', 'a', 2, 2, 0, '96ssjuvpe5qc');

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
('5u0x49c7juk38b0z', ' Excellent', 2),
('9626cjuvok60g', ' ', 1),
('9626cjuvok60g', ' ', 2),
('966l4jutbh7s1', ' Average', 1),
('966l4jutbh7s1', ' Good', 2),
('967vkjusm4dbj', ' ', 1),
('967vkjusm4dbj', ' ', 2),
('968bgjuujq6a3', ' a', 1),
('968bgjuujq6a3', ' b', 2),
('968bgjuuk3nfw', '', 1),
('968bgjuuk3nfw', '', 2),
('96by0jutf2or0', ' ', 1),
('96by0jutf2or0', ' ', 2),
('96ssjuvpe5qd', ' Average', 1),
('96ssjuvpe5qd', ' Good', 2);

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
('10c7a220-6592-11e9-ac49-9f433d2876bf', '30071178', 'Sandesh Bhandari'),
('4e40be80-6591-11e9-84e2-7f553d7cd4ab', '30071178', 'Sandesh Bhandari'),
('61e9a1d0-6632-11e9-a74b-b9b27e7bd586', '30071178', 'Sandesh Bhandari'),
('88308e10-6585-11e9-b5e0-653fe0dd2f3b', '30071178', 'Sandesh Bhandari'),
('99dcc730-60b9-11e9-82bc-4bd019eff250', '30057229', 'Ryan Blomquist'),
('99dcc730-60b9-11e9-82bc-4bd019eff250', '30057230', 'Bryan Smith'),
('99dcc730-60b9-11e9-82bc-4bd019eff250', '30057231', 'Joseph Blake'),
('99dcc730-60b9-11e9-82bc-4bd019eff250', '30057232null', 'Bebe Choppe'),
('c7dcd190-60b7-11e9-86eb-4b16359ecefd', '30057229', 'Ryan Blomquist'),
('c7dcd190-60b7-11e9-86eb-4b16359ecefd', '30057230', 'Bryan Smith'),
('c7dcd190-60b7-11e9-86eb-4b16359ecefd', '30057231', 'Joseph Blake'),
('c7dcd190-60b7-11e9-86eb-4b16359ecefd', '30057232null', 'Bebe Choppe'),
('d7870950-6524-11e9-a71b-fb8a71a34229', '30071178', 'Sandesh Bhandari'),
('d954cc60-6590-11e9-84e2-7f553d7cd4ab', '30071178', 'Sandesh Bhandari'),
('f913c930-6585-11e9-b5e0-653fe0dd2f3b', '30000000', 'Ram'),
('f913c930-6585-11e9-b5e0-653fe0dd2f3b', '30000001', 'Daa'),
('f913c930-6585-11e9-b5e0-653fe0dd2f3b', '30071178', 'Sandesh Bhandari');

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
('06e91540-6592-11e9-8cb3-9f6b5dca78ea', '30071178', 'sbhandari0418@gmail.com', 'Test', 0.75),
('1bcae330-6632-11e9-bf1d-353d31f7d69b', '30071178', 'sbhandari0418@gmail.com', ' c', 1),
('1bcae330-6632-11e9-bf1d-353d31f7d69b', '30071178', 'sbhandari0418@gmail.com', ' d', 1),
('2b10ec50-6217-11e9-b360-a3bb57c03351', '30071178', 'sbhandari0418@gmail.com', 'Test', 0.85),
('40fc4a50-6591-11e9-918e-1790ff3beb49', '30071178', 'sbhandari0418@gmail.com', ' Subject Knowledge', 2),
('40fc4a50-6591-11e9-918e-1790ff3beb49', '30071178', 'sbhandari0418@gmail.com', 'Delivery', 3),
('40fc4a50-6591-11e9-918e-1790ff3beb49', '30071178', 'sbhandari0418@gmail.com', 'Organization ', 4),
('40fc4a50-6591-11e9-918e-1790ff3beb49', '30071178', 'sbhandari0418@gmail.com', 'Other', 5),
('e0dfa640-6585-11e9-869d-a1dafcc7aaa7', '30000000', 'dipiksha.shrestha11@gmail.com', ' Subject Knowledge', 1),
('e0dfa640-6585-11e9-869d-a1dafcc7aaa7', '30000000', 'dipiksha.shrestha11@gmail.com', 'Delivery', 4),
('e0dfa640-6585-11e9-869d-a1dafcc7aaa7', '30000000', 'dipiksha.shrestha11@gmail.com', 'Organization ', 4),
('e0dfa640-6585-11e9-869d-a1dafcc7aaa7', '30000000', 'dipiksha.shrestha11@gmail.com', 'Other', 5),
('e0dfa640-6585-11e9-869d-a1dafcc7aaa7', '30000001', 'dipiksha.shrestha11@gmail.com', ' Subject Knowledge', 2),
('e0dfa640-6585-11e9-869d-a1dafcc7aaa7', '30000001', 'dipiksha.shrestha11@gmail.com', 'Delivery', 1),
('e0dfa640-6585-11e9-869d-a1dafcc7aaa7', '30000001', 'dipiksha.shrestha11@gmail.com', 'Organization ', 3),
('e0dfa640-6585-11e9-869d-a1dafcc7aaa7', '30000001', 'dipiksha.shrestha11@gmail.com', 'Other', 5),
('e0dfa640-6585-11e9-869d-a1dafcc7aaa7', '30071178', 'dipiksha.shrestha11@gmail.com', ' Subject Knowledge', 1),
('e0dfa640-6585-11e9-869d-a1dafcc7aaa7', '30071178', 'dipiksha.shrestha11@gmail.com', 'Delivery', 1),
('e0dfa640-6585-11e9-869d-a1dafcc7aaa7', '30071178', 'dipiksha.shrestha11@gmail.com', 'Organization ', 1),
('e0dfa640-6585-11e9-869d-a1dafcc7aaa7', '30071178', 'dipiksha.shrestha11@gmail.com', 'Other', 1),
('e1121d60-6584-11e9-a881-21d546de6b63', '30071178', 'dipiksha.shrestha11@gmail.com', ' Appearance', 1),
('e1121d60-6584-11e9-a881-21d546de6b63', '30071178', 'dipiksha.shrestha11@gmail.com', ' Thinking', 2);

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
  `Dept_Id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`CWID`, `firstName`, `lastName`, `email`, `password`, `role`, `Dept_Id`) VALUES
(30057229, 'Ryan', 'Blomquist', 'blomqurw@warhawks.ulm.edu', '$2a$10$tcEzRyfw53s0oJg43rMqQOOO4F/2xH1y5JpgWYyiKHma5XZO2aoCK', 'Administrator', '962vkjugbg5be'),
(30071430, 'Dipiksha', 'Shrestha', 'dipiksha.shrestha11@gmail.com', '$2a$10$dGtEEYCXdyjLhpwPsxT3MuoUhYX1yQB1zhp43.vJH1wp/780HCrjy', 'Evaluator', '962vkjugbg5be'),
(30000000, 'Lon', 'Smith', 'lonsmith@gmail.com', '$2a$10$wHFInz86hIlzVEJ4xejzwuA0Td4j6VEnizoP1cLIWC9LUCLOKaDeS', 'Admin', '962vkjugbg5be'),
(30071170, 'Sandesh', 'Bhandari', 'sbhandari0418@gmail.com', '$2a$10$wHFInz86hIlzVEJ4xejzwuA0Td4j6VEnizoP1cLIWC9LUCLOKaDeS', 'Administrator', '962vkjugbg5be');

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
  ADD KEY `Rubric_Id` (`Rubric_Id`);

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
