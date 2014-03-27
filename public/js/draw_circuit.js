var draw = function(circuit, lines){
  window.drawer = new Drawer((circuit.length+2)*50, 500, circuit, lines);
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
    var data = response.circuit;
    draw(data.circuit, data.variables);
  }, "json");
});

