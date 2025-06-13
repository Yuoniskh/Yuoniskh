<?php
include "config.php";

$id = $_GET["id"];
$result = $conn->query("SELECT * FROM files WHERE id=$id");
$row = $result->fetch_assoc();

if ($_POST) {
    $newName = $_POST["filename"];
    rename("uploads/" . $row["filename"], "uploads/" . $newName);
    $conn->query("UPDATE files SET filename='$newName' WHERE id=$id");
    echo "تم تعديل الملف!";
}

echo "<form method='post'>
        <input type='text' name='filename' value='" . $row["filename"] . "'>
        <button type='submit'>تعديل</button>
      </form>";
?>