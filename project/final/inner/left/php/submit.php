<?php
if($_SERVER['REQUEST_METHOD'] == 'GET')
{
    if(isset($_GET['sex'])){
        
        // $name = $_GET['n'];
        $sex = $_GET['sex'];
        $seeking = $_GET['seeking'];
        $min = $_GET['min_age'];
        $max = $_GET['max_age'];
        $looking = $_GET['looking'];
        $theFile = fopen("mandate.txt", "a") or die("unable to open file");

        //add the new truism to the text file 
        // fwrite($userTruisms, "NAME:".$name."\n");
        fwrite($theFile, "I am/we are:".$sex."\n");
        fwrite($theFile, "seeking:".$seeking."\n");
        fwrite($theFile, "ages:".$min."-".$max."\n");
        fwrite($theFile, "looking for:".$looking."\n");

        fclose($theFile); 
        
        // $myPackagedData = new stdClass();
        // $myPackagedData->new = $newTruism;
        // echo json_encode($myPackagedData);
       //echo("Submitted!");
       exit;
    }
}
?>