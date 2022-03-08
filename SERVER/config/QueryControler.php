<?php
class QueryControler {

    function Query($pdo, $query) {
        $stament = $pdo->prepare($query); $stament->execute(); $data = $stament->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    function Select($pdo,$query) {
        $stament = $pdo->prepare($query); $stament->execute(); $data = $stament->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    function Update($pdo,$query) {
        $stament = $pdo->prepare($query); $stament->execute(); $data = $stament->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    function UpdateUser($pdo,$query, $nickname, $facebookLink) {
        $stament = $pdo->prepare($query);
        $stament->bindValue(':nickname', $nickname);
        $stament->bindValue(':facebookLink', $facebookLink);
        $stament->execute();
        $data = $stament->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    function UpdateComment($pdo,$query, $comments) {
        $stament = $pdo->prepare($query); 
        $stament->bindValue(':comments', $comments);
        $stament->execute(); 
        $data = $stament->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    function Insert($pdo,$query, $postContent) {
        $stament = $pdo->prepare($query); 
        $stament->bindValue(':postContent', $postContent);
        $stament->execute(); 
        $data = $stament->fetchAll(PDO::FETCH_ASSOC);

        echo "Insert Posting Ok";
        return $data;
    }

    function CreateUser($pdo,$query, $nickname, $uid) {
        $stament = $pdo->prepare($query);
        $stament->bindValue(':nickname', $nickname);
        $stament->bindValue(':uid', $uid);
        $stament->execute(); 
        $data = $stament->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    function InsertJson($pdo,$query, $postContentJson) {
        $stament = $pdo->prepare($query); 
        $stament->bindValue(':postContent', $postContentJson);
        $stament->execute(); 
        $data = $stament->fetchAll(PDO::FETCH_ASSOC);
        echo "Insert Posting (7 POSTS) Ok";
        $this->resetStack($pdo);
    }

    function onStackFull($pdo, $data) {
        echo "Stack FUll";
        $arrayContent = [];

        foreach ($data as $value) {
            array_push($arrayContent, $value['content']);
        }

        echo json_encode(($arrayContent));

        $this->InsertJson($pdo, "INSERT INTO `posting`(`content`) VALUES (:postContent)", json_encode($arrayContent));
    }

    function checkStackFull($pdo) {
        $stament = $pdo->prepare("SELECT * FROM stack WHERE 1 ORDER BY id DESC"); 
        $stament->execute(); 
        $data = $stament->fetchAll(PDO::FETCH_ASSOC);
        
        if(count($data) >= 7) {
            $this->onStackFull($pdo, $data);
        }
    }

    function resetStack($pdo) {
        $this->Query($pdo, "truncate stack");
        $this->Query($pdo, "ALTER TABLE stack AUTO_INCREMENT = 0");

        echo "ResetStack Ok";
    }
}
?>