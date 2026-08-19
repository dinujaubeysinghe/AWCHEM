-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Aug 10, 2026 at 12:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `awchem`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class_quizzes`
--

CREATE TABLE `class_quizzes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `class_id` bigint(20) UNSIGNED NOT NULL,
  `quiz_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('physical','online') NOT NULL DEFAULT 'physical',
  `date` date NOT NULL,
  `duration` int(11) NOT NULL COMMENT 'in minutes',
  `location` varchar(255) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `quiz_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `class_quizzes`
--

INSERT INTO `class_quizzes` (`id`, `class_id`, `quiz_id`, `type`, `date`, `duration`, `location`, `start_time`, `end_time`, `quiz_link`, `created_at`, `updated_at`) VALUES
(7, 3, 2, 'physical', '2026-07-08', 45, 'On your class', NULL, NULL, NULL, '2026-07-04 01:08:48', '2026-07-04 13:10:38'),
(10, 5, 1, 'physical', '2026-07-09', 180, 'On your class', NULL, NULL, NULL, '2026-07-04 23:03:11', '2026-07-04 23:03:11'),
(11, 5, 2, 'physical', '2026-07-09', 30, 'On your class', NULL, NULL, NULL, '2026-07-05 00:19:01', '2026-07-05 00:19:01'),
(12, 3, 6, 'physical', '2026-07-06', 30, 'On your class', NULL, NULL, NULL, '2026-07-05 02:30:30', '2026-07-05 02:30:30'),
(13, 5, 6, 'physical', '2026-07-09', 60, 'On your class', NULL, NULL, NULL, '2026-07-06 13:52:45', '2026-07-06 13:52:45'),
(20, 9, 2, 'physical', '2026-07-21', 30, 'On your class', NULL, NULL, NULL, '2026-07-17 02:12:50', '2026-07-17 02:12:50'),
(21, 9, 6, 'physical', '2026-07-28', 60, 'Test', NULL, NULL, NULL, '2026-07-17 02:48:39', '2026-07-17 02:48:57');

-- --------------------------------------------------------

--
-- Table structure for table `class_weeks`
--

CREATE TABLE `class_weeks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_class_id` bigint(20) UNSIGNED NOT NULL,
  `week_number` int(10) UNSIGNED NOT NULL,
  `lecture_name` varchar(255) DEFAULT NULL,
  `start_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `class_weeks`
--

INSERT INTO `class_weeks` (`id`, `student_class_id`, `week_number`, `lecture_name`, `start_date`, `created_at`, `updated_at`) VALUES
(2, 9, 1, 'විද්‍යුත් රසායනය', '2026-07-14', '2026-07-14 02:47:20', '2026-07-14 02:47:56'),
(3, 9, 2, 'විද්‍යුත් රසායනය : අම්ල සහ භෂ්ම', '2026-07-21', '2026-07-14 03:00:52', '2026-07-14 03:03:14'),
(4, 9, 3, 'විද්‍යුත් රසායනය || ඇනෝඩය සහ කැතොඩය', '2026-07-28', '2026-07-14 03:42:07', '2026-07-14 06:13:18'),
(6, 9, 4, 'Test', '2026-08-04', '2026-07-17 02:52:25', '2026-07-17 02:52:35'),
(7, 9, 5, 'test2', '2026-08-11', '2026-07-17 03:29:12', '2026-07-17 03:29:23');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` varchar(255) NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` smallint(5) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_06_28_044510_create_personal_access_tokens_table', 1),
(5, '2026_06_28_053037_add_is_admin_to_users_table', 1),
(6, '2026_07_01_043526_create_student_classes_table', 1),
(7, '2026_07_01_110517_create_student_enrollments_table', 2),
(8, '2026_07_02_043741_create_quizzes_table', 3),
(9, '2026_07_02_070119_create_quizzes_table', 4),
(10, '2026_07_02_101427_create_class_quizzes_table', 5),
(11, '2026_07_02_101427_create_class_quizzes_table', 5),
(12, '2026_07_04_000000_create_class_quizzes_table', 5),
(13, '2026_07_04_052221_create_class_quizzes_table', 5),
(14, '2026_07_05_050056_create_results_table', 6),
(15, '2026_07_06_045622_add_email_verified_at_to_users_table', 7),
(16, '2026_07_06_102429_create_notices_table', 8),
(17, '2026_07_14_035202_add_start_date_to_student_classes_table', 9),
(18, '2026_07_14_073820_create_class_weeks_table', 10),
(19, '2026_07_14_073852_create_week_resources_table', 10);

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE `notices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notices`
--

INSERT INTO `notices` (`id`, `title`, `content`, `created_at`, `updated_at`) VALUES
(1, 'Notice for All Students', 'මේ සතියේ lessons සහ quizzes ටික අනිවාර්යයෙන් complete කරන්න. ඒ වගේම past papers සහ revision notes බලලා practice කරන්නත් අමතක කරන්න එපා.\n\nකිසිම lesson එකක් skip නොකර එක දිගට වැඩ කළොත් exam එකට හොඳ confidence එකක් හදාගන්න පුළුවන්. ප්‍රශ්නයක් හරි doubt එකක් හරි තිබුණොත් අනිවාර්යයෙන්ම අහන්න.\n\nදිගටම වැඩ කරමු. Good Luck! 🧪', '2026-07-06 05:56:58', '2026-07-06 12:33:30'),
(12, 'Notice for 2026 A/L Batch', 'දැන් ඉඳන් තියෙන හැම lesson එකක්ම සහ quiz එකක්ම වෙලාවට complete කරන්න. Miss කරපු lessons තියෙනවා නම් ඉක්මනින් cover කරගන්න. Weekly revision එක දිගටම කරගෙන යන්න, past paper questions practice කරන්න, එතකොට exam එකට හොඳ confidence එකක් ලැබෙයි. කිසිම දේක් තනියම හිතලා ඉන්න එපා. Doubt එකක් හරි ප්‍රශ්නයක් හරි තියෙනවා නම් අනිවාර්යයෙන්ම අහන්න. 2026 A/L එකට හොඳ result එකක් වෙනුවෙන් අද ඉඳන්ම consistent වෙලා වැඩ කරමු! 💙🧪', '2026-07-06 06:41:55', '2026-07-06 06:47:54'),
(14, 'Notice for 2025 Batch - Dharmaraja Collage, Aluthgama', 'මේ සතියේ පැවැත්වීමට නියමිත Chemistry class එක, නොවැළැක්විය හැකි හේතුවක් නිසා අවලංගු කර ඇති බව කණගාටුවෙන් දැනුම් දෙමු.\nමේ නිසා ඇතිවන අපහසුතාවය පිළිබඳව අපගේ කණගාටුව පළ කරන අතර, අදාළ class එක සඳහා නව දිනය සහ වේලාව ඉතා ඉක්මනින් දැනුම් දෙනු ලැබේ.\nඔයාලාගේ ඉවසීම සහ සහයෝගයට ස්තූතියි.', '2026-07-06 07:18:41', '2026-07-06 07:18:41'),
(19, 'test', 'xcgvhbjnkml;\'', '2026-07-26 01:21:29', '2026-07-26 01:21:29');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('contact.dinuja@gmail.com', '$2y$12$stcgVyLyHrUwuFMZBWcpRuFX4k7rAU7btkfQmh0EgcI6Hui4UtMMi', '2026-07-06 10:27:59');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'main', 'e331580a423ca5ce4b1c349d907e8cc308abefaf573d472f4f45504a4a6d163e', '[\"*\"]', '2026-07-01 01:46:33', NULL, '2026-07-01 01:11:54', '2026-07-01 01:46:33'),
(3, 'App\\Models\\User', 2, 'main', '51811d3fb7785a137f31ba36cc1becc248480dcb01c6bfb312483977adb2b683', '[\"*\"]', NULL, NULL, '2026-07-01 05:10:33', '2026-07-01 05:10:33'),
(9, 'App\\Models\\User', 1, 'main', '3dd7b7442157f885c87eff9eca32612ae0295a32bb1b8f62d5fb6e8f0ff0aedf', '[\"*\"]', '2026-07-01 13:27:43', NULL, '2026-07-01 13:27:42', '2026-07-01 13:27:43'),
(12, 'App\\Models\\User', 3, 'main', '313a7151ae8bbde0395aaa6e62dd3598e7a41a4d900d60c9ffa76c1a998198dd', '[\"*\"]', NULL, NULL, '2026-07-01 19:22:01', '2026-07-01 19:22:01'),
(14, 'App\\Models\\User', 4, 'main', '93f04ae48ffc36b2023a8bbbccbee6d87374956e67a506632d378032d35d8dd5', '[\"*\"]', NULL, NULL, '2026-07-01 19:29:59', '2026-07-01 19:29:59'),
(18, 'App\\Models\\User', 1, 'main', '108454f1fbb9427044d0cf6d980c40888cc0b2a48de1b1bd904b48a58624a27d', '[\"*\"]', '2026-07-02 05:24:44', NULL, '2026-07-01 19:54:14', '2026-07-02 05:24:44'),
(24, 'App\\Models\\User', 3, 'main', '31b33560c013d77d3f95d156c7499377ff27d877fba548532ae88d543973f914', '[\"*\"]', '2026-07-03 06:52:36', NULL, '2026-07-03 06:52:35', '2026-07-03 06:52:36'),
(27, 'App\\Models\\User', 3, 'main', '5ae87acd966af61fb4c49fae4078372b722d375e095519dea18c9f6f792edb2b', '[\"*\"]', '2026-07-04 13:19:31', NULL, '2026-07-04 13:19:29', '2026-07-04 13:19:31'),
(30, 'App\\Models\\User', 4, 'main', '093e3d1f8dd218d674ff62a6077e162a6942cdeb196b45bd8eb49baf4d484400', '[\"*\"]', '2026-07-04 22:46:42', NULL, '2026-07-04 22:30:39', '2026-07-04 22:46:42'),
(38, 'App\\Models\\User', 3, 'main', 'f0fe8e949eee66392274d4a4da6d7079ed734b9d9d6251159b256be28cf52548', '[\"*\"]', '2026-07-05 01:49:40', NULL, '2026-07-05 01:49:39', '2026-07-05 01:49:40'),
(46, 'App\\Models\\User', 1, 'main', '838acfde0a10f6e2a4d9e85b1a78e7de898853ef614be192443494574bd98eea', '[\"*\"]', '2026-07-05 12:33:00', NULL, '2026-07-05 04:30:18', '2026-07-05 12:33:00'),
(53, 'App\\Models\\User', 7, 'main', 'f2081c075eea63757294a181923f9d7966e8cba761db07f642e0467de12d7b8b', '[\"*\"]', NULL, NULL, '2026-07-05 22:23:47', '2026-07-05 22:23:47'),
(60, 'App\\Models\\User', 1, 'main', '65fd9fc0a2c98541d5309406e3804911afdb847c23329e01f6248013bbbbbe52', '[\"*\"]', '2026-07-06 01:15:54', NULL, '2026-07-06 01:05:30', '2026-07-06 01:15:54'),
(78, 'App\\Models\\User', 1, 'main', '06a9fde2e4b0c5940cc8ed82a84a007805b588cbf6e22d2050704003c3e7c7b0', '[\"*\"]', '2026-07-08 12:27:03', NULL, '2026-07-08 12:26:58', '2026-07-08 12:27:03'),
(79, 'App\\Models\\User', 1, 'main', '1deb1ac779edbf1a12c93dc5a5e50e9ec72e6cce68120e3f7a12a9b523e6dccf', '[\"*\"]', NULL, NULL, '2026-07-08 12:26:58', '2026-07-08 12:26:58'),
(80, 'App\\Models\\User', 1, 'main', '7a8cda86482ca575d442e6aeca32a87c534fa94ba784d376897507b456ff5044', '[\"*\"]', NULL, NULL, '2026-07-08 12:26:59', '2026-07-08 12:26:59'),
(81, 'App\\Models\\User', 1, 'main', '5b094a1bed9b9801f22ba570a78635b6a49d958715df3fb0857f05881257774c', '[\"*\"]', NULL, NULL, '2026-07-08 12:26:59', '2026-07-08 12:26:59'),
(85, 'App\\Models\\User', 1, 'main', '52f46512c27e3ac44f2c77e3209d77c94110c611c0a69c60f900a71d30943ac8', '[\"*\"]', '2026-07-09 22:07:09', NULL, '2026-07-08 12:52:19', '2026-07-09 22:07:09'),
(86, 'App\\Models\\User', 1, 'main', '2bf4a3cc98b7e32f76772c5cbb5b32d1a7120b54a3019d52028a3b54fe063cba', '[\"*\"]', '2026-07-10 08:51:51', NULL, '2026-07-10 08:51:48', '2026-07-10 08:51:51'),
(92, 'App\\Models\\User', 8, 'main', '10d22165343309dee38c35f34633c93dcb37892a1632dec5e1d7ff11e0cee481', '[\"*\"]', '2026-07-10 09:24:07', NULL, '2026-07-10 09:01:16', '2026-07-10 09:24:07'),
(93, 'App\\Models\\User', 1, 'main', '41f52d4f48fb0938a157950c43478f1918d687f04e394af032b6b44c73d6ae5e', '[\"*\"]', '2026-07-12 23:58:16', NULL, '2026-07-12 23:58:06', '2026-07-12 23:58:16'),
(94, 'App\\Models\\User', 1, 'main', '0754a2e944eece3d866c3ae8d24da3757b366851949416d21f098669ae5ac451', '[\"*\"]', NULL, NULL, '2026-07-12 23:58:08', '2026-07-12 23:58:08'),
(95, 'App\\Models\\User', 1, 'main', '7efc853cb3390bfa0a4cd081a18af5fb770fd04f216ddd6a49e5653e0530d241', '[\"*\"]', NULL, NULL, '2026-07-12 23:58:09', '2026-07-12 23:58:09'),
(105, 'App\\Models\\User', 1, 'main', '16ca922e4cbbbe7ee0541f0e2548288561dd745704eb7b9e232d8bf7a2cd8f81', '[\"*\"]', '2026-07-16 06:09:21', NULL, '2026-07-16 06:09:18', '2026-07-16 06:09:21'),
(106, 'App\\Models\\User', 1, 'main', 'e9970e5c94ba13f2a8152d5c99fb352c485397c0686219e28dc68f12d0559849', '[\"*\"]', '2026-07-17 01:28:43', NULL, '2026-07-17 01:28:34', '2026-07-17 01:28:43'),
(107, 'App\\Models\\User', 1, 'main', 'a9a2a250d10c01a755e06eeae61bfd7c85f2f8208230a32d0e07f3a270d7f3a3', '[\"*\"]', NULL, NULL, '2026-07-17 01:28:35', '2026-07-17 01:28:35'),
(108, 'App\\Models\\User', 1, 'main', 'd1a8edb240184bfc1cbe721f750438b6f06a7ed998b8267d08eff8ae352460de', '[\"*\"]', NULL, NULL, '2026-07-17 01:28:36', '2026-07-17 01:28:36'),
(109, 'App\\Models\\User', 1, 'main', 'ff5eecfc34dd8022199f3d4225839ef406c2c713ecd46b7a9e4ef11c380d3d4b', '[\"*\"]', NULL, NULL, '2026-07-17 01:28:37', '2026-07-17 01:28:37'),
(122, 'App\\Models\\User', 8, 'main', 'd8780151c19d03b62e6204ef4895a10db16bdcb116e790525b82bbbc61b40cd7', '[\"*\"]', '2026-07-17 02:53:12', NULL, '2026-07-17 02:53:02', '2026-07-17 02:53:12'),
(123, 'App\\Models\\User', 1, 'main', 'c8fe9a67bf25b169b943feb5563d49dca965cdae037bee43b3167b6970b6b264', '[\"*\"]', '2026-07-17 03:28:36', NULL, '2026-07-17 03:28:30', '2026-07-17 03:28:36'),
(124, 'App\\Models\\User', 1, 'main', '2dfc32c510c06cc7edbec7df0c8bf695713d5e032bc150db76eced7ffa16ad81', '[\"*\"]', '2026-07-17 22:56:06', NULL, '2026-07-17 03:28:34', '2026-07-17 22:56:06'),
(126, 'App\\Models\\User', 1, 'main', '0c3351b0312eaefb4a89394223f352529c3662f3ae7b599b0c67ad72e61cd846', '[\"*\"]', '2026-07-21 01:43:31', NULL, '2026-07-21 01:43:27', '2026-07-21 01:43:31'),
(127, 'App\\Models\\User', 1, 'main', '02865534b511c918cddf6620c1f7c118408ded22dbf98358b295e4f9b9bc5439', '[\"*\"]', '2026-07-21 01:48:22', NULL, '2026-07-21 01:43:28', '2026-07-21 01:48:22'),
(128, 'App\\Models\\User', 1, 'main', '67c2f2585ab6c7e43e0990fcd97f8a3f540da6dfdcd511242b03051646048580', '[\"*\"]', '2026-07-25 22:48:16', NULL, '2026-07-25 22:48:11', '2026-07-25 22:48:16'),
(129, 'App\\Models\\User', 1, 'main', '17878cc8b37c73b0e8be9ce26d4ca38134d93be16842786493aae1488c215134', '[\"*\"]', NULL, NULL, '2026-07-25 22:48:13', '2026-07-25 22:48:13'),
(132, 'App\\Models\\User', 1, 'main', '8218b8b256df809885a25b6cd8c238d11458862932eb59c5c6a1795b36031b11', '[\"*\"]', '2026-07-26 01:25:21', NULL, '2026-07-26 01:21:03', '2026-07-26 01:25:21'),
(133, 'App\\Models\\User', 1, 'main', '3a5c9f3867168e3ec5ab2dab9800a19b98ccb848eaf25327513ecb12ba61de0b', '[\"*\"]', '2026-08-08 23:14:04', NULL, '2026-08-08 23:13:47', '2026-08-08 23:14:04');

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Challenging Quiz', 'Challenging Quiz කියන්නේ ටිකක් hard level questions තියෙන quiz mode එකක්. මේකෙන් ඔයාලගේ knowledge, thinking skills සහ problem solving ability test කරගන්න පුළුවන්. Easy questions වලට වඩා challenge එකක් තියෙන නිසා, quiz එක complete කරන එක more exciting experience එකක් වෙනවා.', '2026-07-02 01:59:02', '2026-07-02 03:57:50'),
(2, 'Rapid Quiz', 'Rapid Quiz කියන්නේ time limit එකක් ඇතුළත ඉක්මනින් answer කරන්න තියෙන fast-paced quiz mode එකක්. මේකෙන් ඔයාලගේ quick thinking, speed සහ knowledge test කරගන්න පුළුවන්. Time pressure එකත් එක්ක quiz එක complete කරන එක fun වගේම exciting experience එකක් වෙනවා.', '2026-07-02 02:02:13', '2026-07-02 03:57:29'),
(6, 'Reminder Quiz', 'Reminder Quiz කියන්නේ කලින් ඉගෙනගත්ත දේවල් නැවත මතක් කරගන්න සහ knowledge refresh කරගන්න design කරපු quiz mode එකක්. Regular practice එකට හොඳ option එකක් වන මේකෙන් තමන්ගේ progress එක check කරගෙන weak areas improve කරගන්නත් පුළුවන්.', '2026-07-03 06:54:05', '2026-07-08 00:40:59');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `class_quiz_id` bigint(20) UNSIGNED NOT NULL,
  `marks` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `user_id`, `class_quiz_id`, `marks`, `created_at`, `updated_at`) VALUES
(2, 2, 10, 85.00, '2026-07-05 00:16:30', '2026-07-05 00:16:30'),
(3, 4, 11, 95.00, '2026-07-05 00:19:55', '2026-07-05 00:19:55'),
(4, 3, 11, 90.00, '2026-07-05 00:19:56', '2026-07-05 00:19:56'),
(5, 3, 10, 35.00, '2026-07-05 05:50:25', '2026-07-05 05:50:25'),
(6, 2, 11, 65.00, '2026-07-05 05:50:51', '2026-07-05 05:51:29'),
(9, 8, 20, 65.00, '2026-07-17 02:13:45', '2026-07-17 02:13:45'),
(10, 8, 21, 84.00, '2026-07-17 02:50:16', '2026-07-17 02:50:27');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_classes`
--

CREATE TABLE `student_classes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `batch` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `day` varchar(255) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `ong_unit` varchar(255) NOT NULL,
  `start_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_classes`
--

INSERT INTO `student_classes` (`id`, `name`, `batch`, `location`, `day`, `start_time`, `end_time`, `ong_unit`, `start_date`, `created_at`, `updated_at`) VALUES
(1, '2028 Theory', '2028 Batch', 'Dharmaraja Collage, Aluthgama', 'Monday', '13:00:00', '17:00:00', 'Organinc', NULL, '2026-07-01 01:18:11', '2026-07-01 02:02:01'),
(2, 'Revision Class', 'All Batches', 'Dharmaraja Collage, Aluthgama', 'Monday', '16:00:00', '18:00:00', 'Inorganics', NULL, '2026-07-01 02:01:32', '2026-07-01 02:01:32'),
(3, '2027 Paper Class', '2027 Batch', 'Guru Gedara, Ambalangoda', 'Wednesday', '15:30:00', '18:00:00', 'Redox', NULL, '2026-07-01 02:29:29', '2026-07-01 02:30:42'),
(5, '2028 Theory Class', '2028 Batch', 'Sipsewana, Kalutara', 'Sunday', '14:00:00', '17:30:00', 'Physical Chemistry', NULL, '2026-07-01 08:35:50', '2026-07-01 08:35:50'),
(8, 'Revision Class (Special Class)', 'All Batches', 'Dharmaraja Collage, Aluthgama', 'Monday', '07:47:00', '18:47:00', 'Organinc', NULL, '2026-07-03 06:47:47', '2026-07-03 06:47:47'),
(9, 'Revision Class', '2026 Batch', 'Arachchimulla, Bentota', 'Tuesday', '08:00:00', '16:00:00', 'Inorganics', '2026-07-14', '2026-07-07 01:48:27', '2026-07-17 02:47:59');

-- --------------------------------------------------------

--
-- Table structure for table `student_enrollments`
--

CREATE TABLE `student_enrollments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `student_class_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_enrollments`
--

INSERT INTO `student_enrollments` (`id`, `user_id`, `student_class_id`, `created_at`, `updated_at`) VALUES
(7, 2, 3, '2026-07-01 07:34:55', '2026-07-01 07:34:55'),
(8, 3, 1, '2026-07-01 19:22:52', '2026-07-01 19:22:52'),
(10, 4, 5, '2026-07-01 19:30:34', '2026-07-01 19:30:34'),
(11, 4, 3, '2026-07-01 19:30:54', '2026-07-01 19:30:54'),
(12, 2, 5, '2026-07-02 05:45:49', '2026-07-02 05:45:49'),
(13, 3, 5, '2026-07-02 06:38:28', '2026-07-02 06:38:28'),
(15, 3, 3, '2026-07-04 13:20:03', '2026-07-04 13:20:03'),
(17, 8, 9, '2026-07-10 08:56:19', '2026-07-10 08:56:19'),
(19, 12, 1, '2026-07-17 02:30:28', '2026-07-17 02:30:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `address` varchar(255) NOT NULL,
  `whatsapp` varchar(255) NOT NULL,
  `nic` varchar(255) NOT NULL,
  `guardian_name` varchar(255) NOT NULL,
  `guardian_phone` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `email_verified_at`, `password`, `is_admin`, `address`, `whatsapp`, `nic`, `guardian_name`, `guardian_phone`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Asanka', 'Wedisinghe', 'asanka.swe@gmail.com', '2026-07-06 00:41:48', '$2y$12$Nsgc/0LtMKqCn06E5dyfB.RCtS55F/mTv9fFBmwBXU2zWKfCIJnV6', 1, 'Admin Address', '0000000000', '000000000V', 'Me', '0000000000', NULL, '2026-07-06 00:35:25', '2026-07-06 13:26:19'),
(2, 'Dulakshi', 'Kavindi', 'dulakshi@gmail.com', '2026-07-06 18:02:35', '$2y$12$nwsvoN7qnlM7hhfvykf2o.lFddMieXaZFKyPiuB717.Tyxhx24tiy', 0, 'Bentota', '0789963123', '200278994561', 'Sandya Kanthi', '0741852963', NULL, '2026-07-01 05:10:33', '2026-07-01 05:10:33'),
(3, 'Chamil', 'Iduranga', 'chamil@gmail.com', '2026-07-06 18:02:29', '$2y$12$t9szgkRJ9hGaZlifLHondOMFJchSD9l1KWoMgCRDABXRbL/bktnm2', 0, 'Bentota', '0789631234', '200378945612', 'Praveen', '0748524566', NULL, '2026-07-01 19:22:01', '2026-07-01 19:22:01'),
(4, 'Sandali', 'Jayalath', 'sandali@gmail.com', '2026-07-06 18:02:22', '$2y$12$S4toeg2bpDJmfN32Y8H3wOdWKkqJRIWyMS70IUNsKBa0MhOs6q5uq', 0, 'Kalutara', '0741123789', '200385274196', 'Dinuja', '0766154657', NULL, '2026-07-01 19:29:59', '2026-07-01 19:29:59'),
(7, 'Ranjith', 'Ubeysinghe', 'dinujaubeysinghe2@gmail.com', '2026-07-06 12:33:41', '$2y$12$eOnazdS71cuX.CuqfR4aS.M0EVhqkvx/ebs/GX9UaMo89WbgB7PGy', 0, 'Bentota', '0710901635', '196085212345', 'Anusha', '0710902035', NULL, '2026-07-05 22:23:47', '2026-07-05 22:23:47'),
(8, 'Dinuja', 'Ubeysinghe', 'dinujaubeysinghe0@gmail.com', '2026-07-05 23:31:04', '$2y$12$gFL8F8Ni75nqi7.SI1lk0uWNm/aKmU9bV.Tn3iOn/H16dX21ypsZW', 0, 'Bentota', '0766154657', '200325500660', 'Anusha', '0710902035', '3VbXnrDXrvDDjr7vV33BNPTZkLvCcbtr9YbVFSx3wCbHUqi93QEJHcFOQBdR', '2026-07-05 23:22:25', '2026-07-06 12:24:56'),
(10, 'Anusha', 'Pathirana', 'pathiranaanu5@gmail.com', '2026-07-06 12:33:04', '$2y$12$ATv2cav2K9jSBdRcnqJoZuWsqXi3cMidkYHqKn8HZGNmKcFoo5r/e', 0, 'Bentota', '0710902035', '196885278965', 'Ranjith', '0710901635', NULL, '2026-07-06 00:46:43', '2026-07-06 00:46:43'),
(12, 'Maduka', 'Jayalath', 'contact.dinuja@gmail.com', '2026-07-06 01:03:20', '$2y$12$9Vbe1ExLGN8TckcCkPRg0.QbvE0gDUHWBDrvPBmN5pvNJ0OX4/B8e', 0, 'Payagala North', '0702992162', '200345695411', 'Dinuja', '0766154657', NULL, '2026-07-06 01:02:34', '2026-07-06 01:03:20');

-- --------------------------------------------------------

--
-- Table structure for table `week_resources`
--

CREATE TABLE `week_resources` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `class_week_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('pdf','link') NOT NULL,
  `label` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `week_resources`
--

INSERT INTO `week_resources` (`id`, `class_week_id`, `type`, `label`, `url`, `created_at`, `updated_at`) VALUES
(2, 2, 'link', '2026 A/L - Guessing Programme || Youtube Link', 'https://www.youtube.com/live/MZYPbIABrdo?si=fnPrOSLXE1lEPm_5', '2026-07-14 02:48:42', '2026-07-14 02:49:42'),
(3, 2, 'pdf', '2025 Past Paper', 'https://drive.google.com/file/d/1iGRwS1iWaXwoCIac4yyoo7hJvzqe4ZEA/view?usp=drive_link', '2026-07-14 02:51:28', '2026-07-14 02:51:28'),
(4, 4, 'link', 'Youtube Link || Anod and Cothod', 'https://youtu.be/vP_dhMZFfxk?si=zoKDr69hnbChxtZj', '2026-07-14 03:44:09', '2026-07-14 03:44:09'),
(5, 6, 'link', 'Youtube', 'https://www.youtube.com/live/MZYPbIABrdo?si=fnPrOSLXE1lEPm_5', '2026-07-17 02:52:49', '2026-07-17 02:52:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `class_quizzes`
--
ALTER TABLE `class_quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_quizzes_class_id_foreign` (`class_id`),
  ADD KEY `class_quizzes_quiz_id_foreign` (`quiz_id`);

--
-- Indexes for table `class_weeks`
--
ALTER TABLE `class_weeks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `class_weeks_student_class_id_week_number_unique` (`student_class_id`,`week_number`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  ADD KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `results_user_id_class_quiz_id_unique` (`user_id`,`class_quiz_id`),
  ADD KEY `results_class_quiz_id_foreign` (`class_quiz_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `student_classes`
--
ALTER TABLE `student_classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_enrollments`
--
ALTER TABLE `student_enrollments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_enrollments_user_id_foreign` (`user_id`),
  ADD KEY `student_enrollments_student_class_id_foreign` (`student_class_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_nic_unique` (`nic`);

--
-- Indexes for table `week_resources`
--
ALTER TABLE `week_resources`
  ADD PRIMARY KEY (`id`),
  ADD KEY `week_resources_class_week_id_foreign` (`class_week_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class_quizzes`
--
ALTER TABLE `class_quizzes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `class_weeks`
--
ALTER TABLE `class_weeks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `student_classes`
--
ALTER TABLE `student_classes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `student_enrollments`
--
ALTER TABLE `student_enrollments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `week_resources`
--
ALTER TABLE `week_resources`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `class_quizzes`
--
ALTER TABLE `class_quizzes`
  ADD CONSTRAINT `class_quizzes_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `student_classes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `class_quizzes_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `class_weeks`
--
ALTER TABLE `class_weeks`
  ADD CONSTRAINT `class_weeks_student_class_id_foreign` FOREIGN KEY (`student_class_id`) REFERENCES `student_classes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_class_quiz_id_foreign` FOREIGN KEY (`class_quiz_id`) REFERENCES `class_quizzes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `results_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `student_enrollments`
--
ALTER TABLE `student_enrollments`
  ADD CONSTRAINT `student_enrollments_student_class_id_foreign` FOREIGN KEY (`student_class_id`) REFERENCES `student_classes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_enrollments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `week_resources`
--
ALTER TABLE `week_resources`
  ADD CONSTRAINT `week_resources_class_week_id_foreign` FOREIGN KEY (`class_week_id`) REFERENCES `class_weeks` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
