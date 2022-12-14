<?php
// this is the file to setup your quereis ... and results are returned to the client.js ////

require('dbScripts/openDB.php');
require ('helperArrays.php');

//check if there has been something posted to the server to be processed
/*********** TO COMPLETE FOR EXERCISE 4 **********************************
** 1: you need to implement the correct sqlite queries (three->six) as per the exercise description.
** 2: please use the following if statements to implement (1). DO NOT CHANGE the if construct -
** only assign the correct query to the appropriate $selectedQuery var.
** 3: you DO NOT NEED to change the manner in which one iterates through the result,
*** packages it and sends back to the javascript success callback...
** 4: you MAY append helper arrays (from helperArrays.php (you can add)) to the end of the
**  outArray if you wish. See the  examples for suggested implementation
**/
if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET["select-query"]))
{

  $outArr = array();
  try {

    $selectedQuery = "";

  if($_GET["select-query"] =="onload"){
    $selectedQuery="SELECT * FROM dataStuff";
  }

  if($_GET["select-query"] =="default"){
    //sAbINe implemented :)
    $selectedQuery="SELECT * FROM dataStuff";
  }

    if($_GET["select-query"]==="one"){
      //sAbINe implemented :)
      $selectedQuery = "SELECT * FROM dataStuff ORDER BY after_mood";

    }

    if($_GET["select-query"]==="two"){
      //sAbINe implemented :)
      $selectedQuery = "SELECT * FROM dataStuff,events WHERE dataStuff.eID = events.eventID ORDER BY weather";

    }
    /* 
    THREE
    Select all entries in the database where the after_mood is positive */
    if($_GET["select-query"]==="three"){
      // $selectedQuery = "SELECT * FROM dataStuff WHERE after_mood = 'happy' OR after_mood = 'neutral' OR after_mood = 'calm' OR after_mood = 'serene' OR after_mood = 'well'";
      $selectedQuery = "SELECT * FROM dataStuff WHERE after_mood IN ('happy','neutral','calm','serene','well')";
    }

    /*
    FOUR 
    Select all entries in the database & order each entry by associated event name. */
    if($_GET["select-query"]==="four"){
      $selectedQuery = "SELECT * FROM dataStuff,events WHERE dataStuff.eID = events.eventID ORDER BY eventName";
      }

    /* 
    FIVE
    Select all entries in the database that occur on a Monday or a Tuesday and order them by the event_affect_strength */
    if($_GET["select-query"]==="five"){
      //$selectedQuery = "SELECT * FROM dataStuff WHERE day IN ('monday', 'tuesday') ORDER BY event_affect_strength";
      $selectedQuery = "SELECT * FROM dataStuff WHERE day = 'Monday' OR day = 'Tuesday' 
      ORDER BY event_affect_strength
      ";
    }

    /* 
    SIX
    Select all entries in the database where both the start_mood and after_mood fall into the negative category and order the entries by weather.  */
    else if($_GET["select-query"]==="six"){
       $selectedQuery = 
       "SELECT * 
        FROM dataStuff 
        WHERE (start_mood IN ('sad','angry','neutral','calm', 'anxious','moody','hurt')) AND (after_mood IN ('sad','angry','neutral','calm', 'anxious','moody','hurt'))
        ORDER BY weather"; //also looks cool without order, looks like a 'temperature blanket'
  }

  if($selectedQuery!==""){
      $result = $file_db->query($selectedQuery);
      if (!$result) die("Cannot execute query.");

      //go through every row (as an associative array and append to the array)
      while($row = $result->fetch(PDO::FETCH_ASSOC))
      {
        $outArr[] = $row;
      }//end while

      //new :: let's add our helper array of days for the default query AT THE END::
      if(($_GET["select-query"] =="onload") ||($_GET["select-query"] =="default")) {
        $outArr[]= $days;
      }
      // if it is the first query we add on moods at end of outArr
      if($_GET["select-query"] =="one"){
        $outArr[]= $moods;
      }
      // if it is the second query add on events at end of outArr
      if($_GET["select-query"] =="two"){
        $outArr[]= $events;
      }
      /***********************************************/
      /*          my additions                       */
      /***********************************************/
      // if it is the THIRD query add on positive_moods at end of outArr
      if($_GET["select-query"] =="three"){
        $outArr[]= $positive_moods;
      }

      // if it is the FOUR query add on events at end of outArr
      if($_GET["select-query"] =="four"){
        $outArr[]= $events;
      }

      // if it is the FIFTH query add on days at end of outArr
      if($_GET["select-query"] =="five"){
        $outArr[]= $days;
      }
      
      // if it is the SIXTH query add on weather at end of outArr
      if($_GET["select-query"] =="six"){
        $outArr[]= $weather;
      }
      echo(json_encode($outArr));
  } //the query is not empty string

  else{
      echo(json_encode("QUERY HAS NOT BEEN IMPLEMENTED..."));
  }

    exit;
  }//try

  catch(PDOException $e) {
    // Print PDOException message
    echo $e->getMessage();

  }
} //get



?>
