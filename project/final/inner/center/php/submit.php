<?php
if($_SERVER['REQUEST_METHOD'] == 'GET')
{
    // apology
    if(isset($_GET['apologize'])){
        $apology = $_GET['apologize'];
        $aFile = fopen("apologies.txt", "a") or die("unable to open file");
        //add the new submission to the text file ;
        fwrite($aFile, "Submission:".$apology."\n");
        fclose($aFile); 
       exit;
    }

    // apology
    else if(isset($_GET['save'])){
        $save = $_GET['save'];
        $sFile = fopen("save.txt", "a") or die("unable to open file");
        //add the new submission to the text file ;
        fwrite($sFile, "Submission:".$save."\n");
        fclose($sFile); 
       exit;
    }

    // forgive
    else if(isset($_GET['forgive'])){
        $forgive = $_GET['forgive'];
        $frgvFile = fopen("forgive.txt", "a") or die("unable to open file");
        //add the new submission to the text file ;
        fwrite($frgvFile, "Submission:".$forgive."\n");
        fclose($frgvFile); 
       exit;
    }

    // forget
    else if(isset($_GET['forget'])){
        $forget = $_GET['forget'];
        $frgtFile = fopen("forget.txt", "a") or die("unable to open file");
        //add the new submission to the text file ;
        fwrite($frgtFile, "Submission:".$forget."\n");
        fclose($frgtFile); 
       exit;
    }
}
?>