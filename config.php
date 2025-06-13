<?php
$host = "اسم_السيرفر"; // غالبًا يكون "localhost" في الاستضافة المشتركة
$user = "اسم_المستخدم"; // اسم المستخدم الخاص بقاعدة البيانات
$pass = "كلمة_المرور"; // كلمة المرور الخاصة بقاعدة البيانات
$dbname = "file_manager"; // اسم قاعدة البيانات التي أنشأتها

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("فشل الاتصال: " . $conn->connect_error);
}
?>