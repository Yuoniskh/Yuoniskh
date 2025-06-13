<?php
if ($_FILES["file"]["name"]) {
    $filename = $_FILES["file"]["name"];
    move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/" . $filename);

    // تحديث ملف JSON
    $files = json_decode(file_get_contents("files.json"), true);
    $files[] = ["filename" => $filename];
    file_put_contents("files.json", json_encode($files, JSON_PRETTY_PRINT));

    echo "تم رفع الملف بنجاح!";
}
?>