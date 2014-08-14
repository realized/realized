// width and height are optional
var draw = function(circuit_data, width, height){
  window.drawer = new Drawer(circuit_data, width, height);
  window.drawer.draw_circuit();
  window.drawer.convert_to_svg();
};

$(document).ready(function(){
  var file = "sym9_147.real";
  // Drawing the circuit automatically overwrites
  // this message.
  $("#current_circuit_drawing").
    append($("<p/>").
      html("Currently parsing the circuit..."));
  $.get("parsed/"+file, function(response){
    draw(response.circuit);
  }, "json");
});

