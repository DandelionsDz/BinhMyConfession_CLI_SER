<?php
class DataBase {
    private $host = 'localhost';
    private $port = '3306';
    private $dbname = 'test';
    private $username = 'root';
    private $password = '';
    private $connection = null;

    function PrepareConnection() {
        $this->connection = new PDO("mysql:host=$this->host;port=$this->port;dbname=$this->dbname", $this->username, $this->password);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    function GetConnection() {
        return $this->connection;
    }
}
?>