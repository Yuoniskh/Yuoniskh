<?php
$filename = $_GET["filename"];
unlink("uploads/" . $filename);

$files = json_decode(file_get_contents("files.json"), true);
$files = array_filter($files, fn($file) => $file["filename"] !== $filename);
file_put_contents("files.json", json_encode(array_values($files), JSON_PRETTY_PRINT));

echo "تم حذف الملف!";
?>