var Drawer = function(width, height, lines) {
  this.element = $('.gates').toArray()[0];
  this.paper = Raphael(this.element, width, height);
  this.lines = lines;
}

var drawer_functions = {

  calculate_vertical_position: function(line) {
    return (this.paper.height-100)/this.lines.length * (jQuery.inArray(line, this.lines)+1);
  },

  not: function(line){
    var vertical_position = this.calculate_vertical_position(line);
    this.paper.circle(250,vertical_position,15);
    this.paper.line(235, vertical_position, 265, vertical_position);
    this.paper.line(250, (vertical_position-15), 250, (vertical_position+15));
  },

  positive_control: function(line){
    var vertical_position = this.calculate_vertical_position(line);
    this.paper.circle(250,vertical_position,5).attr({fill: "black"});
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
      this.paper.line(250,this.calculate_vertical_position(circuit[i]),
                 250, this.calculate_vertical_position(circuit[(i+1)]));
    }
  },

  swap: function(first_line, second_line){
    this.paper.line(235, (this.calculate_vertical_position(first_line)-15),
                    265, (this.calculate_vertical_position(first_line)+15));
    this.paper.line(265, (this.calculate_vertical_position(first_line)-15),
                    235, (this.calculate_vertical_position(first_line)+15));
    this.paper.line(235, (this.calculate_vertical_position(second_line)-15),
                    265, this.calculate_vertical_position(second_line)+15);
    this.paper.line(265, (this.calculate_vertical_position(second_line)-15),
                    235, this.calculate_vertical_position(second_line)+15);

  },

  fradkin: function(circuit){
    for(var i= 0; i< (circuit.length -2); i = i + 1){
      this.positive_control(circuit[i]);
    }
    this.swap(circuit[circuit.length -2],circuit[circuit.length -1]);
    this.connect_circuit_partials(circuit);
  },

  v_gate: function(circuit){
    for(var i= 0; i< (circuit.length -1); i = i + 1){
      this.positive_control(circuit[i]);
    }
    this.connect_circuit_partials(circuit);
    this.v_minus(circuit[(circuit.length-1)]);

  },

  v_plus_gate: function(circuit){
    for(var i= 0; i< (circuit.length -1); i = i + 1){
      this.positive_control(circuit[i]);
    }
    this.connect_circuit_partials(circuit);
    this.v_plus(circuit[(circuit.length-1)]);

  },

  v_plus: function(line){
    this.paper.rect(235, this.calculate_vertical_position(line)-15,
                    30,30).attr({fill: "white"});
    this.paper.text(250, this.calculate_vertical_position(line), "V+").attr({ "font-size": 16});
  },

  v_minus: function(line){
    this.paper.rect(235, this.calculate_vertical_position(line)-15,
                    30,30).attr({fill: "white"});
    this.paper.text(250, this.calculate_vertical_position(line), "V").attr({ "font-size": 16});
  }
};

for (var key in drawer_functions) {
  if (drawer_functions.hasOwnProperty(key))
    Drawer.prototype[key] = drawer_functions[key];
}


$(document).ready(function(){
  var lines = ["x1", "x2", "x3", "x4", "x5"];
  window.Drawer = Drawer;
  window.drawer = new Drawer(500, 500, lines);
  //window.Drawer.toffoli(["x1", "x2", "x4", "x5", "x3"]);
  window.drawer.v_plus_gate(["x1", "x2", "x3", "x4", "x5"]);
});
