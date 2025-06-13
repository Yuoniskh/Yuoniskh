<?php
$files = json_decode(file_get_contents("files.json"), true);

echo "<h2>الملفات المتاحة للتحميل</h2>";
echo "<ul>";
foreach ($files as $file) {
    echo "<li><a href='uploads/" . $file['filename'] . "' download>" . $file['filename'] . "</a></li>";
}
echo "</ul>";
?>