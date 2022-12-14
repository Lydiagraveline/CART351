/* PLEASE DO NOT CHANGE THIS FRAMEWORK ....
the get requests are all implemented and working ... so there is no need to alter ANY of the existing code: rather you just ADD your own ... */

$(document).ready (function(){
//create once :)
let description = document.getElementById("Ex4_title");
//array to hold the dataPoints
let dataPoints = [];

/**** GeT THE DATA initially :: default view *******/
/*** no need to change this one  **/
    $.get("./runQueries.php",{"select-query":"onload"}, function(response)
    {
      console.log(response);
      let parsedJSON = JSON.parse(response);
       //console.log(parsedJSON);
      displayAsDefault(parsedJSON);
    });

/***** Get the data from drop down selection ****/
let querySelectDropDown = document.getElementById('queryChoice');

querySelectDropDown.onchange = function() {
  console.log(this.value);
  let copyVal = this.value;
  //will make a get request for the data ...

  /**************************MODIFY********************/
  $.get("./runQueries.php",{"select-query":copyVal}, function(response)
  {
    let parsedJSON = JSON.parse(response);
    $("#childOne").empty();
    description.textContent = "";
    document.getElementById("parent-wrapper").style.background = "rgba(51,102,255,.2)"
    switch (copyVal){

      case "default":{
        displayAsDefault(parsedJSON);
        break;
      }
      case "one":{
        //sabine done
        displayInCirclularPattern(parsedJSON);
        break;
      }
      case "two":{
        //sabine done
        displayByGroups(parsedJSON,"weather","eventName");
        break;
      }
      /***** TO DO FOR EXERCISE 4 *************************
      ** 1: once you have implemented the sqlite query in runQueries.php,
      ** you will receive it from the get request (here and will enter into the correct selct case
      **  - based on the value that the user chose from the drop down list...)
      ** call a custom display function FOR EACH query that you construct ... i.e.
      ** 4 queries - I want 4 UNIQUE display functions - you can use the ones I created
      ** as inspiration ONLY - DO NOT just copy and change colors ... experiment, explore, change ...
      ** you can create your own custom objects - but NO images, video or sound... (will get 0).
      ** bonus: if your visualizations(s) are interactive or animate.
      ****/
      case "three":{
        // displayAsDefault(parsedJSON);
        displayThree(parsedJSON);
        break;
      }
      case "four":{
        displayFour(parsedJSON);
        break;
      }

      case "five":{
        displayFive(parsedJSON);
        break;
      }
      case "six":{
        displaySix(parsedJSON);
        break;
      }
      default:{
        console.log("default case");
            break;
      }

    } //switch

    //FOR DEBUGGING
    //console.log(parsedJSON);
    //console.log(parsedJSON.length)


  });
  /***********************************************/

};

  // assign a given color palette to the given data and return it
  function assignColorPalette(data, palette){
    let coloredData ={}
    let possibleData = data[data.length-1];
    //let palette = ['#F2D479','#A9C3C4','#A7D9D4','#C4A9BA','#D6D98B'];
    for(let i = 0; i< possibleData.length; i++){
      coloredData[possibleData[i]] = palette[i];
      }
    console.log(coloredData);
    return coloredData; 
  } 

    /******************* THREE ****************************/
  function displayThree(resultSet){
    //reset
    dataPoints =[];
    let xPos = 0;
    let yPos =0;
    let NUM_COLS =30;
    let CELL_SIZE = 20;
    // arbitrary values, changes later
    let POINT_SIZE = 20;

    let palette = ['#F2D479','#A9C3C4','#A7D9D4','#C4A9BA','#D6D98B'];
    let t = assignColorPalette(resultSet, palette);
    
    // COLOR
    // let coloredMoods = {}
     let possibleMoods = resultSet[resultSet.length-1];
    // // console.log("possibleMoods = "+possibleMoods); // = happy, neutral, calm, serene, well
    // let palette = ['#F2D479','#A9C3C4','#A7D9D4','#C4A9BA','#D6D98B'];
    // for(let i = 0; i< possibleMoods.length; i++){
    //   coloredMoods[possibleMoods[i]] = palette[i];
    //   }

      let emotes = {}
      let possibleEmotes = [':D',':|','ᵕ.ᵕ','^_^',':)']; // happy, neutral, calm, serene, well
      for(let i = 0; i< possibleMoods.length; i++){
        emotes[possibleMoods[i]] = possibleEmotes[i];
        }

    document.getElementById("parent-wrapper").style.background = "rgba(237,247,242)";
    description.textContent = "POSITIVE MOODS"; 
    description.style.color = '#4CB6C2'; //blue

    //last  element is the helper array...
    for(let i = 0; i<resultSet.length-1; i++){
      dataPoints.push(new myDataPoint(resultSet[i].dataId,
        resultSet[i].day,
        resultSet[i].weather,
        resultSet[i].start_mood,
        resultSet[i].after_mood,
        resultSet[i].after_mood_strength,
        resultSet[i].event_affect_strength,
        resultSet[i].eID,
        //coloredMoods[resultSet[i].after_mood],
        t[resultSet[i].after_mood],
        document.getElementById("childOne"),
        "point_three"
      ));
      
      if(i%NUM_COLS ===0){
     //reset x and inc y (go to next row)
      xPos =0;
      yPos+=CELL_SIZE;
    }else{xPos+=CELL_SIZE; }

          //update size
          POINT_SIZE = 10 + dataPoints[i].am_strength;
           CELL_SIZE = POINT_SIZE;

    dataPoints[i].update(xPos,yPos, POINT_SIZE);
    
    
    dataPoints[i].container.addEventListener("mouseover", function(){
      // display an emote 
      //this.innerHTML = "<p>"+emotes[resultSet[i].after_mood]+"</p>";
      description.textContent = resultSet[i].after_mood +" "+ emotes[resultSet[i].after_mood]; 
    }); 
    dataPoints[i].container.addEventListener("mouseout", function(){ 
      //this.innerHTML = "";
    });
      
    
    dataPoints[i].container.onclick = function(){console.log("am_stength: "+dataPoints[i].am_strength+" after_mood: "+dataPoints[i].after_mood)}
    }//for

    document.getElementById("childOne").classList.add("flex"); //add "flex" class to it's container
    document.getElementById("childOne").style.height = `${yPos+CELL_SIZE}px`;
      } //display three

  /*******************DISPLAY AS GROUP****************************/

    function displayByGroups(resultSet,propOne,propTwo){
      dataPoints =[];
      let finalHeight =0;
      //order by WEATHER and Have the event names as the color  ....

      //set background of parent ... for fun ..
        document.getElementById("parent-wrapper").style.background = "rgba(51, 153, 102,1)";
        description.textContent = "BY WEATHER AND ALSO HAVE EVENT NAMES {COLOR}";
        description.style.color = "rgb(179, 230, 204)";

        let coloredEvents = {}

        //reget
        let possibleEvents = resultSet[resultSet.length-1];
        console.log("possibleEvents = "+possibleEvents);
        let possibleColors = ['rgb(198, 236, 217)','rgb(179, 230, 204)','rgb(159, 223, 190)','rgb(140, 217, 177)','rgb(121, 210, 164)','rgb(102, 204, 151)','rgb(83, 198, 138)','rgb(64, 191, 125)','rgb(255, 204, 179)','rgb(255, 170, 128)','rgb(255, 153, 102)','rgb(255, 136, 77)','rgb(255, 119, 51)','rgb(255, 102, 26)','rgb(255, 85, 0)','rgb(230, 77, 0)','rgb(204, 68, 0)'];

        for(let i = 0; i< possibleColors.length; i++){
          coloredEvents[possibleEvents[i]] = possibleColors[i];
        }


      let offsetX =-200;
      let offsetY =150;
      // find the weather of the first one ...
      let currentGroup = resultSet[0][propOne];
      let xPos =offsetX;
      let yPos =offsetY;

        for(let i = 0; i<resultSet.length-1; i++){
          dataPoints.push(new myDataPoint(resultSet[i].dataId,
            resultSet[i].day,
            resultSet[i].weather,
            resultSet[i].start_mood,
            resultSet[i].after_mood,
            resultSet[i].after_mood_strength,
            resultSet[i].event_affect_strength,
            resultSet[i].eID,
            //map to the EVENT ...
            coloredEvents[resultSet[i].eventName],
            //last parameter is where should this go...
            document.getElementById("childOne"),
            //which css style///
            "point_two"
          ));
          /** check if we have changed group ***/
        if(resultSet[i][propOne] !== currentGroup){
          //update
          currentGroup=resultSet[i][propOne];
          offsetX+=150;
          offsetY=150;
          xPos =offsetX;
          yPos =offsetY;

        }
        //if not just keep on....
        else
        {
          if(i%10 ===0){
            xPos =offsetX;
            yPos = yPos+15;
          }

          else{ xPos=xPos+15;}
        } //end outer else

          dataPoints[i].update(xPos,yPos);
          finalHeight = yPos;
        }//for

  document.getElementById("childOne").style.height = `${finalHeight+20}px`;

  } //function

/*****************DISPLAY IN CIRCUlAR PATTERN:: <ONE>******************************/
  function displayInCirclularPattern(resultSet){
    //reset
    dataPoints =[];
    let xPos = 0;
    let yPos= 0;
    //for circle drawing
    let angle = 0;
    let centerX = 400;
    let centerY = 350;

    let scalar= 250;
    let yHeight = Math.cos(angle)*scalar+centerY;


    let coloredMoods = {}

    let possibleMoods = resultSet[resultSet.length-1];
    console.log("possibleMoods = "+possibleMoods);
    let possibleColors = ['rgba(0, 64, 255,.5)','rgba(26, 83, 255,.5)','rgba(51, 102, 255,.7)','rgba(51, 102, 255,.4)', 'rgba(77, 121,255,.6)','rgba(102, 140, 255,.6)','rgba(128, 159, 255,.4)','rgba(153, 179, 255,.3)','rgba(179, 198, 255,.6)','rgba(204, 217, 255,.4)'];

    for(let i = 0; i< possibleMoods.length; i++){
      coloredMoods[possibleMoods[i]] = possibleColors[i];
      
      }

      //set background of parent ... for fun ..
        document.getElementById("parent-wrapper").style.background = "rgba(0, 26, 102,1)";
        description.textContent = "BY AFTER MOOD";
        description.style.color = 'rgba(0, 64, 255,.5)';

        for(let i = 0; i<resultSet.length-1; i++){
          dataPoints.push(new myDataPoint(resultSet[i].dataId,
            resultSet[i].day,
            resultSet[i].weather,
            resultSet[i].start_mood,
            resultSet[i].after_mood,
            resultSet[i].after_mood_strength,
            resultSet[i].event_affect_strength,
            resultSet[i].eID,
            //map to the day ...
            coloredMoods[resultSet[i].after_mood],
            //last parameter is where should this go...
            document.getElementById("childOne"),
            //which css style///
            "point_two"
          ));
/*** circle drawing ***/
xPos = Math.sin(angle)*scalar+centerX;
yPos = Math.cos(angle)*scalar+centerY;
angle +=0.13;

if (angle > 2*Math.PI){
  angle =0;
  scalar-=20;
}
   dataPoints[i].update(xPos,yPos);
  }//for

    document.getElementById("childOne").style.height = `${yHeight}px`;
}//function

/*****************DISPLAY AS DEFAULT GRID :: AT ONLOAD ******************************/
function displayAsDefault(resultSet){
  //reset
  dataPoints =[];
  let xPos = 0;
  let yPos =0;
  const NUM_COLS =50;
  const CELL_SIZE = 20;
  let coloredDays = {}
  /*
  1: get the array of days (last element in the result set  -- see runQueries.php)
  2: for each possible day (7)  - create a key value pair -> day: color and put in the
  coloredDays object
  */
  let possibleDays = resultSet[resultSet.length-1];
  //console.log("possibleDays = "+possibleDays);
  let possibleColors = ['rgb(255, 102, 153)', 'rgb(255, 77, 136)','rgb(255, 51, 119)','rgb(255, 26, 102)','rgb(255, 0, 85)','rgb(255, 0, 85)','rgb(255, 0, 85)'];

  for(let i = 0; i< possibleDays.length; i++){
    coloredDays[possibleDays[i]] = possibleColors[i];
  }
/* for through each result  / not last as last is the days array and:
1: create a new MyDataPoint object and pass the properties from the db result entry to the object constructor
2: set the color using the coloredDays object associated with the resultSet[i].day
3:  put into the dataPoints array.
**/
//set background of parent ... for fun ..
 document.getElementById("parent-wrapper").style.background = "rgba(255,0,0,.4)";
  description.textContent = "DEfAULT CASE";
  description.style.color = 'rgb(255, 0, 85)';

//last  element is the helper array...
  for(let i = 0; i<resultSet.length-1; i++){
    dataPoints.push(new myDataPoint(resultSet[i].dataId,
      resultSet[i].day,
      resultSet[i].weather,
      resultSet[i].start_mood,
      resultSet[i].after_mood,
      resultSet[i].after_mood_strength,
      resultSet[i].event_affect_strength,
      resultSet[i].eID,
      //map to the day ...
      coloredDays[resultSet[i].day],
      //last parameter is where should this go...
      document.getElementById("childOne"),
      //which css style///
      "point"
    ));
/** this code is rather brittle - but does the job for now .. draw a grid of data points ..
//*** drawing a grid ****/
  if(i%NUM_COLS ===0){
    //reset x and inc y (go to next row)
    xPos =0;
    yPos+=CELL_SIZE;
  }
  else{
    //just move along in the column
    xPos+=CELL_SIZE;
  }
  //update the position of the data point...
  dataPoints[i].update(xPos,yPos); 

  // test 
  // log the "day" of the data point that was clicked
  dataPoints[i].container.onclick = function(){console.log(dataPoints[i].day)}

}//for
  document.getElementById("childOne").style.height = `${yPos+CELL_SIZE}px`;

}//function
/***********************************************/

/***********************************************/
/*          my additions  :)                   */
/***********************************************/

/******************* FOUR **********************/
function displayFour(resultSet){
  dataPoints =[];
  let xPos = 0;
  let yPos =0;
  const NUM_COLS =41;
  const CELL_SIZE = 10;  
            
  let palette = 
  ['ForestGreen',  //walking in a forest       
  'LightSeaGreen', //swimming in the ocean
  'HotPink',      //dining with a sibling
  'MediumOrchid',    //taking a nap with a cat
  'SkyBlue',      //watching rain fall through the window
  '', 
  'SaddleBrown',  //baking a chocolate cake
  'yellow',         //roller skating
  'blue',     //reading a comic
  'red',      //planting roses
  'coral',     //chomping on carrots
  'WhiteSmoke',      //whistling in the wind
  'DarkSlateGray',   //walking through a dark tunnel 
  'gold',    //sunbathing in a desert
  'Linen', //visiting a parent for an afternoon
  'Fuchsia', //learning a new programming language
  'Cyan',]; //running up the stairs
  let eventColor = assignColorPalette(resultSet, palette);
 
   //console.log( resultSet[resultSet.length-1]);
  // console.log(resultSet.length-1);

  let container =  document.getElementById("childOne")

  possibleEvents = {}
  possibleEvents = resultSet[resultSet.length-1];
  console.log(possibleEvents)

  // Make a circular div for each event
  for(let j = 0; j <  possibleEvents.length; j++){
    let circleDiv = document.createElement("div");
    let event = possibleEvents[j]   
    circleDiv.classList.add("circle"); // add circle class
    circleDiv.setAttribute("id", event) //add id 
    container.appendChild(circleDiv);
      
    circleDiv.innerHTML = "<i></i><p>"+event+"</p>";
      // console.log(possibleEvents[j]);
  }

  //last  element is the helper array...
     for(let i = 0; i<resultSet.length-1; i++){
      // for(let j = 0; j < resultSet[resultSet.length-1]; j++){
      //   console.log("!");
      // }
     
      dataPoints.push(new myDataPoint(resultSet[i].dataId,
        resultSet[i].day,
        resultSet[i].weather,
        resultSet[i].start_mood,
        resultSet[i].after_mood,
        resultSet[i].after_mood_strength,
        resultSet[i].event_affect_strength,
        resultSet[i].eID,
        eventColor[resultSet[i].eventName],
        document.getElementById(resultSet[i].eventName), //dataPoints get added to the 'circle div' with the corresponding ID
        "point_four"
      ));
      
      //for(let j = 0; j<resultSet.length-1; i++)
    //   if(i%NUM_COLS ===0){
    //  //reset x and inc y (go to next row)
    //   xPos =0;
    //   yPos+=CELL_SIZE;
    //    }else{xPos+=CELL_SIZE; }    
    let size = Number(resultSet[i].event_affect_strength) + Number( 2);
    //  console.log(size);
    dataPoints[i].updateCircles(size);
    
    // add text 
    let text = resultSet[i].eventName;
    dataPoints[i].container.innerHTML = "<p>" + text +"</p>";
  
    }//for
    
    // let container =  document.getElementById("childOne")
    document.getElementById("childOne").classList.add("flex"); //add "flex" class to it's container
    document.getElementById("childOne").style.height = `800px`;
    document.getElementById("parent-wrapper").style.background = "black";

    description.textContent = "All entries ordered by event name.";
    // document.getElementById("parent-wrapper").

 } //display four
/***********************************************/

/******************* FIVE **********************/
function displayFive(resultSet){
  dataPoints =[];
  let xPos = 0;
  let yPos =0;
  const NUM_COLS = 500;
  const CELL_SIZE = 2;  

 // console.log(resultSet.length);
  
  let palette = ['darkOrange', 'green'];
  let dayColor = assignColorPalette(resultSet, palette);

  //last  element is the helper array...
     for(let i = 0; i<resultSet.length-1; i++){
      dataPoints.push(new myDataPoint(resultSet[i].dataId,
        resultSet[i].day,
        resultSet[i].weather,
        resultSet[i].start_mood,
        resultSet[i].after_mood,
        resultSet[i].after_mood_strength,
        resultSet[i].event_affect_strength,
        resultSet[i].eID,
        //coloredMoods[resultSet[i].after_mood],
        dayColor[resultSet[i].day],
        document.getElementById("childOne"),
        "point_five"
      ));
      
      if(i%NUM_COLS ===0){
     //reset x and inc y (go to next row)
      xPos =0;
      yPos+=CELL_SIZE;
       }else{xPos+=CELL_SIZE; }    
    dataPoints[i].update(xPos,yPos);
    dataPoints[i].container.style.height = resultSet[i].event_affect_strength * 10 + "%";
    
    // add text 
    //let text = resultSet[i].weather + " " + resultSet[i].start_mood + " then " + resultSet[i].after_mood
    let text = resultSet[i].event_affect_strength
    dataPoints[i].container.innerHTML = "<p> event affect strength: " + text +"</p>";
  
    }//for
    
    document.getElementById("childOne").classList.add("flex"); //add "flex" class to it's container
    document.getElementById("childOne").style.height = `${yPos+200}px`;
    document.getElementById("parent-wrapper").style.background = "Khaki";
    description.style.color = 'black';
    description.innerHTML = "Occured on a <span style='color:darkOrange'>Monday</span> or <span style='color:green'>Tuesday,</span> and ordered by event_affect_strength";
    // document.getElementById("parent-wrapper").
 } //display five
/***********************************************/

/******************* SIX ***********************/
  function displaySix(resultSet){
    dataPoints =[];
    let xPos = 0;
    let yPos =0;
    const NUM_COLS =25;
    const CELL_SIZE = 25;  

                //  stormy,         rainy,              sunny,   cloudy,       clear,    snowing,  grey,   fog
    let palette = ['DarkSlateGray', 'LightSlateGray', '#FFDF87', 'Gainsboro', 'SkyBlue', 'snow', 'grey', 'WhiteSmoke'];
    let weatherColor = assignColorPalette(resultSet, palette);

    //last  element is the helper array...
       for(let i = 0; i<resultSet.length-1; i++){
        dataPoints.push(new myDataPoint(resultSet[i].dataId,
          resultSet[i].day,
          resultSet[i].weather,
          resultSet[i].start_mood,
          resultSet[i].after_mood,
          resultSet[i].after_mood_strength,
          resultSet[i].event_affect_strength,
          resultSet[i].eID,
          //coloredMoods[resultSet[i].after_mood],
          weatherColor[resultSet[i].weather],
          document.getElementById("childOne"),
          "point_six"
        ));
        
        if(i%NUM_COLS ===0){
       //reset x and inc y (go to next row)
        xPos =0;
        yPos+=CELL_SIZE;
         }else{xPos+=CELL_SIZE; }    
      dataPoints[i].update(xPos,yPos);
      
      // add text 
      let text = resultSet[i].weather + " " + resultSet[i].start_mood + " then " + resultSet[i].after_mood
      dataPoints[i].container.innerHTML = "<p>" + text +"</p>";
    
      }//for
      
      document.getElementById("childOne").classList.remove("flex"); //remove "flex" class 
      document.getElementById("childOne").style.height = `${yPos+CELL_SIZE}px`;
      description.textContent = "Negative mood before and after, organized by weather";
      // document.getElementById("parent-wrapper").

  } //display six
/***********************************************/
}); //document ready
