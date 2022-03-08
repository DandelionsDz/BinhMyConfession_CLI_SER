<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once "../../config/DataBase.php";
require_once "../../config/QueryControler.php";

$db = new DataBase();
$db->PrepareConnection();
$connection = $db->GetConnection();

$querycontroler = new QueryControler();
$postContent = json_decode(file_get_contents("php://input"), true);

echo $postContent;

$result = $querycontroler->Insert($connection, "INSERT INTO `stack`(`content`) VALUES (:postContent)", $postContent);

if (gettype($result) == 'array') {
  $querycontroler->checkStackFull($connection);
}
