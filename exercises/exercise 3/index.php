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

<body>

<div class = "wrapper">
    <h2>Select a truism</h2>
    <form id="form"> 
        <p><label>truism</label><input type="text" name="truism" required/></p>
        <p><input type="submit" name="submit" value="send" id=buttonS /> </p>
    </form>
    <div id="resultDiv" style="background:rgba(149, 0, 153,0.75);color:white"> </div>
</div>
<script>
    $(document).ready (function() {
    $("#form").submit(function(event){
        event.preventDefault();
        console.log("button clicked");
        //turn the data into an array
        let data =$('#form').serializeArray();
        for(let pair of data.entries()) {
            console.log(pair);
        }
        //request
        
        $.ajax({
            url: "inputToGet.php",
            data: data,
            dataType: "text",
            cache: false,
            timeout: 600000,
            success: function(response){
                console.log("success!");
                console.log(response);
                let parsedJSON = JSON.parse(response);
                console.log(parsedJSON);
                displayMessage(parsedJSON);
                //reset the form
                $('#form')[0].reset();
            }, //success
            error: function(){
                console.log("error occured");
            }//error
        }) //ajax
    })//submit

    function displayMessage(messageObj){
        $('#resultDiv').text(messageObj.message);
    }

    })


</script>
</body>
</html>