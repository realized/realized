$(document).ready(function(){
var paper = Raphael($('.gates').toArray()[0], 500, 500);
var lines = ["x1", "x2", "x3", "x4", "x5"];
function calculate_vertical_position(line){
  (paper.height-100)/lines.length * (jQuery.inArray(line, lines)+1);
};
var Drawer = {
  not: function(line){
    var vertical_position = (paper.height-100)/lines.length * (jQuery.inArray(line, lines)+1);
    paper.circle(250,vertical_position,15);
    paper.path("M235,"+vertical_position+"L265,"+vertical_position);
    paper.path("M250,"+(vertical_position-15)+"L250,"+(vertical_position+15));
  },

  positive_control: function(line){
    var vertical_position = (paper.height-100)/lines.length * (jQuery.inArray(line, lines)+1);
    paper.circle(250,vertical_position,5).attr({fill: "black"});
  },

  toffoli: function(circuit){
    for(var i= 0; i< (circuit.length -1); i = i + 1){
      this.positive_control(circuit[i]);
    }
    this.not(circuit[(circuit.length-1)]);
    this.connect_circuit_partials(circuit);
  },

  connect_circuit_partials: function(circuit){
    for(var i= 0; i< (circuit.length -1); i = i + 1){
      paper.path("M250," + (paper.height-100)/lines.length * (jQuery.inArray(circuit[i], lines)+1)
                 + "L250,"+ (paper.height-100)/lines.length * (jQuery.inArray(circuit[(i+1)], lines)+1));
    }
  }
};
window.Drawer = Drawer;
window.Drawer.toffoli(["x1", "x2", "x3"]);
});
