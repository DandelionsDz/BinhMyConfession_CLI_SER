<?php 
header('Access-Control-Allow-Origin: *');
require_once "../../config/DataBase.php";
require_once "../../config/QueryControler.php";
require_once "../../config/Send.php";

$db = new DataBase();
$db->PrepareConnection();
$connection = $db->GetConnection();

$querycontroler = new QueryControler();
$id = $_GET['id'];
$data = $querycontroler->Select($connection, "SELECT comments FROM `posting` WHERE id = $id");

echo count(json_decode($data[0]['comments'], true));
?>