<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once "../../config/DataBase.php";
require_once "../../config/QueryControler.php";

$db = new DataBase();
$db->PrepareConnection();
$connection = $db->GetConnection();

date_default_timezone_set("Asia/Ho_Chi_Minh");

$querycontroler = new QueryControler();

$id = $_GET['id'];
$isreply = $_GET['isreply'];

$comments = file_get_contents("php://input");

if($isreply	== 'false') {
    $querycontroler->UpdateComment($connection, "UPDATE `posting` SET `comments`=:comments WHERE id=$id", $comments);
} elseif ($isreply	== 'true') {
    $querycontroler->UpdateComment($connection, "UPDATE `posting` SET `comments`=:comments WHERE id=$id", $comments);
}

?>