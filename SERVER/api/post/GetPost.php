<?php 
header('Access-Control-Allow-Origin: *');
require_once "../../config/DataBase.php";
require_once "../../config/QueryControler.php";
require_once "../../config/Send.php";

$db = new DataBase();
$db->PrepareConnection();
$connection = $db->GetConnection();

$querycontroler = new QueryControler();

$offset = intval($_GET['offset']);

$data = $querycontroler->Select($connection, "SELECT * FROM posting WHERE 1 ORDER BY createdday DESC LIMIT 2 OFFSET $offset");

SERVER::SendJsonToCLI($data);

?>