<?php

$recepient = "partner@radiusinvest.by";

$name = trim($_POST["name"]);
$tel = trim($_POST["phone"]);

$message = "Имя: $name <br> \nТелефон: $tel";

$pagetitle = "Новая заявка";

if (mail($recepient, $pagetitle, $message, "Content-type: text/html; charset=utf-8\r\n")) {
  header("Location: thankyou.html");
} else {
  echo "Произошла ошибка";
}

?>
