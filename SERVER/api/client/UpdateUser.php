<?php 
header('Access-Control-Allow-Origin: *');
require_once "../../config/DataBase.php";
require_once "../../config/QueryControler.php";

$db = new DataBase();
$db->PrepareConnection();
$connection = $db->GetConnection();

$querycontroler = new QueryControler();


$userObj = json_decode($_GET['userObj'], true);

$nickname = $userObj['nickname'];
$facebookLink = $userObj['facebookLink'];
$uid = $userObj['uid'];

$result = $querycontroler->UpdateUser($connection, "UPDATE `users` SET `nickname`=:nickname, `facebookLink`=:facebookLink WHERE uid=$uid", $nickname, $facebookLink);

echo "ok";
?>