<?php
if($_SERVER['REQUEST_METHOD'] == 'GET')
{
    if(isset($_GET['truism'])){
        
        // $name = $_GET['n'];
        $truth = $_GET['truism'];
        $userTruisms = fopen("userTruisms.txt", "a") or die("unable to open file");

        //add the new truism to the text file 
        // fwrite($userTruisms, "NAME:".$name."\n");
        fwrite($userTruisms, $truth."\n");

        fclose($userTruisms); 
        
        // $myPackagedData = new stdClass();
        // $myPackagedData->new = $newTruism;
        // echo json_encode($myPackagedData);
       //echo("Submitted!");
       exit;
    }
}
?>