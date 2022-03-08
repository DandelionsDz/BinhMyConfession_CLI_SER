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

$id = $_GET['id'];
$LikesObject = file_get_contents("php://input");

$querycontroler->Update($connection, "UPDATE `posting` SET `likes`='$LikesObject' WHERE id = $id");
?>