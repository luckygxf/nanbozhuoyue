-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 11, 2013 at 03:05 AM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `csc`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=32 ;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `message`) VALUES
(1, 'Should I hate you because you hurt me? Or should I love you because you made me feel special?\r\n'),
(2, 'I''m okay today. I''ll be okay tomorrow. And the next day after that I''ll still be okay. But in a year you will see me, I''ll be amazing.\r\n'),
(3, 'No matter what happens, or how bad it seems today, life does go on, and it will be better tomorrow.\r\n'),
(4, 'Does this rag smell like chloroform to you?\r\n'),
(5, 'I pretend to look around but I`m actually looking for you.\r\n'),
(6, 'Sometimes, you need to run away just to see who will come after you.\r\n'),
(7, 'See yourself accomplishing your goals and fulfilling your destiny.\r\n'),
(8, 'I just wish you knew what I feel about you. That''s it.\r\n'),
(9, '3 words, 8 letters... say it and I''m yours... "I got food."\r\n'),
(10, 'This is the problem with getting attached to someone. When they leave you, you just feel lost.\r\n'),
(11, 'Sometimes I regret being nice, apologizing when I didn''t do anything wrong, and for making unworthy people a priority in my life.\r\n'),
(12, 'I forgive people, but that doesn''t mean I trust them.\r\n'),
(13, 'Dear Brain, sorry for overloading you. Dear Pillow, sorry for the tears. Dear Heart, sorry for the damage.\r\n'),
(14, 'Forget it enough to get over it, but remember it enough so it doesn''t happen again.\r\n'),
(15, 'Just because I don''t talk to you it doesn''t mean I still don''t think about you. I''m just distancing myself because I know I can''t have you.\r\n'),
(16, 'I wish I had the power to ignore you, like you ignore me.\r\n'),
(17, 'Lies will always be bitter in the end, no matter how sweet you made it at the beginning.\r\n'),
(18, 'One minute of patience can result in ten years of peace. -Italian Proverb\r\n'),
(19, 'It''s always fun listening to someone''s lie when you already know the truth...\r\n'),
(20, 'Best friends tend to have conversations that can at times be impossible to understand by other people.\r\n'),
(21, 'Ladies, REMEMBER THIS.........even if your man fails to realize what you''re worth, your value will never decrease.\r\n'),
(22, 'If it really didn''t matter, you wouldn''t be spending so much time thinking about it.\r\n'),
(23, 'Black girls with blonde hair looking like a Duracell battery.\r\n'),
(24, 'Every girl has their best friend, boyfriend, and true love. You''re lucky if they''re all the same person.\r\n'),
(25, 'Never be afraid to fall apart because it is an opportunity to rebuild yourself the way you wish you had been all along." -Rae Smith\r\n'),
(26, 'Just because I always have a smile on my face doesn’t mean I don’t get hurt and that when I’m alone I don’t cry.\r\n'),
(27, 'I feel as ignored as a white crayon, the first piece of bread, internet explorer, the terms of agreement, and 18+ warnings.\r\n'),
(28, 'Me getting dressed before school: Sits there for twenty minutes without a shirt on thinking about all the reasons why I hate school.\r\n'),
(29, 'You can''t hold on to something that doesn''t want to stay.\r\n'),
(30, 'Surround yourself with people who inspire you.\r\n'),
(31, 'Relationships takes TWO people. Not one person being faithful and another acting single.\r\n');
