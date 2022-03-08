<?php
header('Access-Control-Allow-Origin: *');
require_once "../../config/DataBase.php";
require_once "../../config/QueryControler.php";

$db = new DataBase();
$db->PrepareConnection();
$connection = $db->GetConnection();

$querycontroler = new QueryControler();

$id = $_GET['id'];

$currentLikesFromDbs = $querycontroler->Select($connection, "SELECT likes FROM `posting` WHERE id=$id");

echo $currentLikesFromDbs[0]['likes'];
?>