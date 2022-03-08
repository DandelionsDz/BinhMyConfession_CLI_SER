<?php
header('Access-Control-Allow-Origin: *');
require_once "../../config/DataBase.php";
require_once "../../config/QueryControler.php";

$db = new DataBase();
$db->PrepareConnection();
$connection = $db->GetConnection();

$querycontroler = new QueryControler();

$id = $_GET['id'];

if($id) {
    $data = $querycontroler->Select($connection, "SELECT comments FROM `posting` WHERE id=$id ORDER BY createdday ASC");

echo json_encode($data);
} else {
    echo "ID CAN BE NULL";
}
