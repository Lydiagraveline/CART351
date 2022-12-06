<?php
if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET["getAjaxOnClick"]))
{
    $theFile = fopen("save.txt", "r") or die("unable to open file");
    $outArray = array();
    // $NUM_PROPS = 2;

    while(!feof($theFile)) {
        $packObj = new stdClass();

        //for($j=0;$j<$NUM_PROPS;$j++){
            $str = fgets($theFile);

            $splitArr = explode(":", $str);
            $key = $splitArr[0];
            $val = $splitArray[1];
           // if(isset($splitArray[1])){
             //   $val = $splitArray[1];
            $packObj->$key = trim($val);
            //}
       //}

        $outArray[]=$packObj;
    }
    fclose($theFile);
    $JSONObj = json_encode($outArray);
    echo $JSONObj;
   exit;
}
?>