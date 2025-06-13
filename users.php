<?php
$data = file_get_contents("php://input");
file_put_contents("users.json", $data);
echo "تم حفظ الحسابات بنجاح!";
?>