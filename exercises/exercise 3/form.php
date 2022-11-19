<?php
if($_SERVER['REQUEST_METHOD'] == 'GET')
{
    if(isset($_GET['truism'])){
        $theMessage = "";

        $input = $_GET['truism'];
        $userTruisms = fopen("userTruisms.txt", "a") or die("unable to open file");

        fwrite($userTruisms, $input."\n");

        $theMessage =  $input; //$_GET['truism'];

        fclose($userTruisms);
        
        $myPackagedData = new stdClass();
        $myPackagedData->message = $theMessage;
        echo json_encode($myPackagedData);
        exit;
    }
}
?>

<html>
<head>
<title> Please Change Beliefs </title>
<!-- get JQUERY -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>

<style>
    p{
        padding:2px;
        width:100%;
    }
    p label{
        display:inline-block;
        width:10%;
        color:rgba(149, 0, 153,0.85);
    }
    .wrapper{
        width:75%;
        margin-left:12%;
    }
    h2{
        color:rgba(149, 0, 153,0.85);
    }
    input{
        width:50%
    }
    input[type=submit]{
        width:8%;
    }
    form{
        padding:10px;
        background:rgba(149, 0, 153,0.25);
    }
</style>
<?php
$myTruisms = 'myTruisms.txt';
$eachlines = file($myTruisms, FILE_IGNORE_NEW_LINES);
?>

<body>
<div class = "wrapper">
    <h2>Select a truism</h2>
    <form id="form"> 

    <!-- drop down menu populated with myTruisms -->
    <!-- https://stackoverflow.com/questions/46031256/populating-a-dropdown-list-with-values-from-a-text-file -->
    <select id="selectTruisms" size="5">
        <!-- <option selected value="base">Please Select</option> -->
           <?php foreach($eachlines as $lines){ //use php to put my truisms into the options
                echo "<option value='".$lines."'>$lines</option>";
            }?>
    </select>

        <p><input type="text" id="textBox" name="truism" required/></p>
        <p><input type="submit" name="submit" value="send" id=buttonS /> </p>
        <!-- <p><input type="submit" name="submit" value="View" id=buttonR /> </p> -->
    </form>
    <div id="resultDiv" style="background:rgba(149, 0, 153,0.75);color:white"> </div>
</div>

<?php
// $myTruisms = fopen("myTruisms.txt", "r") or die("unable to open file");
// $userTruisms = fopen("myTruisms.txt", "r") or die("unable to open file");

// //echo truisms line-by-line
// while(!feof($myTruisms)){
//     echo (fgets($myTruisms) . "<br/>");
// }

// //close at the end
// fclose($myTruisms);
// fclose($userTruisms);

?>

<script>
    $(document).ready (function() {

    //insert the truism from the dropdown menu into the textbox
    //https://codepedia.info/jquery-change-textbox-value-based-on-dropdown-selection
    $("#selectTruisms").on("change",function(){
    var GetValue=$("#selectTruisms").val();
    $("#textBox").val(GetValue);
    });


    $("#form").submit(function(event){
        event.preventDefault();
        //console.log("button clicked");
        //turn the data into an array
        let data =$('#form').serializeArray();
        for(let pair of data.entries()) {
            //console.log(pair);
        }
        //request
        
        $.ajax({
            url: "form.php",
            data: data,
            dataType: "text",
            cache: false,
            timeout: 600000,
            success: function(response){
                //console.log("success!");
                //console.log(response);
                let parsedJSON = JSON.parse(response);
                //console.log(parsedJSON);
                displayMessage(parsedJSON);
                //reset the form
                $('#form')[0].reset();
            }, //success
            error: function(){
                console.log("error occured");
            }//error
        }) //ajax
        window.open("submissions.php");
    })//submit

    function displayMessage(messageObj){
         $('#resultDiv').text(messageObj.message);
    }

    })


</script>
</body>
</html>