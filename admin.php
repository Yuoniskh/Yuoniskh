<?php
include "config.php";
session_start();

// تحقق من تسجيل الدخول (يمكنك تحسينه بإضافة نظام تسجيل دخول)
if (!isset($_SESSION['admin'])) {
    die("الوصول مرفوض!");
}

$result = $conn->query("SELECT * FROM files");

echo "<h2>إدارة الملفات</h2>";
echo "<ul>";
while ($row = $result->fetch_assoc()) {
    echo "<li>" . $row['filename'] . " 
        <a href='delete.php?id=" . $row['id'] . "'>حذف</a> | 
        <a href='edit.php?id=" . $row['id'] . "'>تعديل</a>
    </li>";
}
echo "</ul>";

echo "<h3>رفع ملف جديد</h3>";
echo "<form action='upload.php' method='post' enctype='multipart/form-data'>
        <input type='file' name='file'>
        <button type='submit'>رفع</button>
      </form>";
?>