<?php

if($_SERVER['REQUEST_METHOD'] == 'GET')
{
    if(isset($_GET['truism'])){
        $theMessage = "";

        $truism = $_GET['truism'];

        $theMessage = $_GET['truism'];
        
        $myPackagedData = new stdClass();
        $myPackagedData->message = $theMessage;
        echo json_encode($myPackagedData);
        exit;
    }
}

?>