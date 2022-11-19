<html>
<head>
<title> Submissions </title>
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
    <h2>Submissions</h2>
    <div id="resultDiv" style="background:rgba(149, 0, 153,0.75);color:white"> </div>
</div>

<?php
$userTruisms = fopen("userTruisms.txt", "r") or die("unable to open file");

//echo truisms line-by-line
while(!feof($userTruisms)){
    echo (fgets($userTruisms) . "<br/>"); 
}

//close at the end
fclose($userTruisms);
?>

<script>  
</script>
</body>
</html>