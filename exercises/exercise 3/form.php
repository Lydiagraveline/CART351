
<html>
<head>
<title> Truisms </title>
<!-- get JQUERY -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>

<style>
    p{
        /* padding:2px; */
        width:100%;
        padding:0px;
        
    }
    .info{
        font-size: 10px;
    }
    .submissions{
        margin:0px;
    }
    p label{
        display:inline-block;
        width:10%;
        color:rgba(149, 0, 153,0.85);
    }
    .wrapper{
        width:75%;
        margin-left:12%;
        text-align: center;
    }
    h2{
        color:rgba(149, 0, 153,0.85);
    }
    #sub{
        display: none;
    }
    input{
        width:70%;
    }
    input[type=submit]{
        width:10%;
    }
    form{
        padding:10px;
        background:rgba(149, 0, 153,0.25);
    }
    .wrapper-flex{
    display:flex;
    background:rgba(0, 137, 255,0.1);
    flex-wrap: wrap;
    padding:3%;
    }
    .single_container{
    background:rgba(0, 137, 255,0.65);
    width:100%;
    color:white;
    overflow-wrap: break-word; /** wrap text */
    padding:1%;
    }
    #result{
    color:white;
    }
</style>
<?php
$myTruisms = 'myTruisms.txt';
$eachlines = file($myTruisms, FILE_IGNORE_NEW_LINES);
?>

<body>
<div class = "wrapper">
    <p class="info">Based on <a href="http://adaweb.walkerart.org/project/holzer/cgi/pcb.cgi" target="_blank">"Please Change Beliefs"</a> by Jenny Holzer </p>
    <h2>Select a truism</h2>
    <form id="form"> 
    <!-- drop down menu populated with myTruisms -->
    <!-- https://stackoverflow.com/questions/46031256/populating-a-dropdown-list-with-values-from-a-text-file -->
    <select id="selectTruisms" size="15">
        <!-- <option selected value="base">Please Select</option> -->
           <?php foreach($eachlines as $lines){ //use php to put my truisms into the options
                echo "<option value='".$lines."'>$lines</option>";
            }?>
    </select>
        
        <!-- <p><label>Name:</label><input type="text" name="n" required/></p> -->
        <p><input type="text" id="textBox" name="truism" required/></p>
        <p><input type="submit" name="submit" value="SUBMIT" id=buttonS /> </p>
        <!-- <p><input type="submit" name="submit" value="View" id=buttonR /> </p> -->
    </form>
    <div id="resultDiv" style="background:rgba(149, 0, 153,0.75);color:white"> </div>

    <div id = "result"><h2 id="sub" >Submissions</h2><div class = "wrapper-flex"></div> </div>
    </div>
</div>

<script>
    $(document).ready (function() {
    //insert the truism from the dropdown menu into the textbox
    //https://codepedia.info/jquery-change-textbox-value-based-on-dropdown-selection
    $("#selectTruisms").on("change",function(){
    let getValue=$("#selectTruisms").val();
    let text = getValue.toString();
    $("#textBox").val(text);
    });

    $("#form").submit(function(event){
        event.preventDefault();
        //turn the data into an array
        let data =$('#form').serializeArray();
        console.log("button clicked");
        for(let valuePairs of data.entries()) {
            // console.log(valuePairs[0]+ ', ' + valuePairs[1]);
        }

        //request
        $.ajax({
            type:"GET",
            url: "submit.php",
            data: data,
            dataType: "text",
            cache: false,
            timeout: 600000,
            success: function(response){
                console.log(response);
                $('#textBox').val('');
            }, //success
            error: function(){
                console.log("error occured");
            }//error
        }) //ajax
        //window.open("submissions.php");
    })//submit

    //display the submissions
    $("#form").submit(getData);

    function getData(){
        $.get('userTruisms.txt',
        function(data) {
      let splitArray = data.split('\n');
      console.log(splitArray);

      //remove any rogues
      let filtered = splitArray.filter(
      function(item){
        return item!==""
      }

    );
    console.log(filtered);
    displaySubmissions(filtered);

    },

    'text');
       // console.log("click");
        //request
        //  $.ajax({
        //     url: "read.php",
        //     type: "GET",
        //     data: {getAjaxOnClick: "fread"},
        //     success: function(response){
        //         // console.log("responded "+response);
        //         //let parsedJSON = JSON.parse(response);
        //         let splitArray = data.split('\n');
        //         console.log(splitArray);
        //         let filtered = parsedJSON.filter(
        //         function(item){
        //          return item["NAME"]!==undefined
        //         });
        //         //console.log(parsedJSON);
        //         displaySubmissions(filtered);
        //     },
        //     error: function(){
        //         console.log("error occured");
           // } //error

       //}) //ajax
    } //get data

    function displaySubmissions(parsedJSONArray){
        $("#sub").show();
        $(".wrapper-flex").empty();
  for(let i =0; i<parsedJSONArray.length;i+=1){
     //**** need to split every string here on : ***/

    let container = $("<div>");
    $(container).addClass("single_container");

    let truth = $("<p class='submissions'>");
    truth.html(parsedJSONArray[i+1]);
    $(container).append(truth);

    $('.wrapper-flex').append(container);
  }
}

    })


</script>
</body>
</html>