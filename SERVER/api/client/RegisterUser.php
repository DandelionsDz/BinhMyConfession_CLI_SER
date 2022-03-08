<?php 
header('Access-Control-Allow-Origin: *');
require_once "../../config/DataBase.php";
require_once "../../config/QueryControler.php";

$db = new DataBase();
$db->PrepareConnection();
$connection = $db->GetConnection();

$querycontroler = new QueryControler();

$nickname = $_GET['nickname'];
$uid = $_GET['uid'];

$result = $querycontroler->CreateUser($connection, "INSERT INTO `users`(`nickname`, `uid`) VALUES (:nickname,:uid)", $nickname, $uid);

echo "ok";
?>