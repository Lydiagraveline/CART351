// $("#search").keydown(function () {
//   $.getJSON("history.json", function (key, val) {
//     let search = $("#search").val();
//     let regex = new RegExp(search, "i");
//     let output;
//   });
// });

$.ajax({
  url: "history.json",
  dataType: "json",
  type: "get",
  success: function (data) {
    $("#result").click(function () {
      let day = $("#day").val();
      let device = $("#device").val();
      let time = $("#time").val();
      let output;
      let row;
      let display;
      console.log(day);
      $(data.history).each(function (key, val) {
        if (
          val.display === "false" &&
          val.Day === day &&
          val.Device === device &&
          val.Time === time
        ) {
          console.log("item found");
          val.display = "true";
          update(val.Day, val.Hour, val.Searched);
        }
      });
    }); //button click function
    $("#clear").click(function () {
      $(data.history).each(function (key, val) {
        val.display = "false";
          // $("#myTable tbody td").remove();
          $("#myTable tr").remove();
           row = $("<tr><th>DAY</th><th>SEARCHED</th></tr>");
           $("#myTable").append(row);
      });
    });
  }, //success: function
  error: function (jqXHR, textStatus, errorThrown) {
    alert("Error: " + textStatus + " - " + errorThrown);
  },
});

function update(day, time, searched) {
  row = $(
    "<tr> <td>" +
      day+ " " + time +
      "</td><td>" +
      searched +
      "</td></tr>"
  );
  $("#myTable").append(row);
}
