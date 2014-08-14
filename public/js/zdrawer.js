var default_height = 500;
var default_width = function(lines) {
  return (lines + 2) * 50;
};
var default_horizontal_position = 50;

/*
 * Constructor for a 'Drawer' of circuits.
 * Needs circuit_data as first parameter.
 * Width and Height will default to the above
 * values unless provided.
 */
var Drawer = function(circuit_data, width, height) {
  this.circuit_data = circuit_data;
  this.height = height || default_height;
  this.width = width || default_width(this.columns_count());
  this.element = $('.gates').toArray()[0];
  this.paper = Raphael(this.element, this.width, this.height);
  // this.current_horizontal_position = default_horizontal_position;
}

var drawer_functions = {

  columns_count: function() {
    return this.columns().length;
  },

  columns: function() {
    return this.circuit_data.circuit;
  },

  lines_count: function() {
    return this.lines().length;
  },

  lines: function() {
    return this.circuit_data.variables;
  },

  circuit: function() {
    return this.circuit_data.circuit;
  },

  line_index: function(line) {
    return jQuery.inArray(line, this.lines());
  },

  calculate_vertical_position: function(line) {
    return (this.paper.height-100)/this.lines_count() * (this.line_index(line)+1);
  },

  calculate_horizontal_position: function(gate_number){
    this.current_horizontal_position = gate_number * 50;
  },

  not: function(line){
    var vertical_position = this.calculate_vertical_position(line);
    var horizontal_position = this.current_horizontal_position;
    this.paper.circle(horizontal_position, vertical_position, 15);
    this.paper.line(horizontal_position - 15, vertical_position,
                    horizontal_position + 15, vertical_position);
    this.paper.line(horizontal_position, vertical_position - 15,
                    horizontal_position, vertical_position + 15);
  },

  positive_control: function(line){
    var vertical_position = this.calculate_vertical_position(line);
    var horizontal_position = this.current_horizontal_position;
    this.paper.circle(horizontal_position, vertical_position, 5).
      attr({fill: "black"});
  },

  toffoli: function(circuit){
    for(var i = 0; i < circuit.length - 1; ++i){
      this.positive_control(circuit[i]);
    }
    this.not(circuit[circuit.length - 1]);
    this.connect_circuit_partials(circuit);
  },

  connect_circuit_partials: function(circuit){
    var horizontal_position = this.current_horizontal_position;
    for(var i = 0; i < circuit.length - 1; ++i){
      this.paper.
        line(horizontal_position, this.calculate_vertical_position(circuit[i]),
             horizontal_position, this.calculate_vertical_position(circuit[i + 1]));
    }
  },

  swap: function(first_line, second_line){
    var horizontal_position = this.current_horizontal_position;
    this.paper.line(horizontal_position - 15, this.calculate_vertical_position(first_line) - 15,
                    horizontal_position + 15, this.calculate_vertical_position(first_line) + 15);
    this.paper.line(horizontal_position + 15, this.calculate_vertical_position(first_line) - 15,
                    horizontal_position - 15, this.calculate_vertical_position(first_line) + 15);

    this.paper.line(horizontal_position - 15, this.calculate_vertical_position(second_line) - 15,
                    horizontal_position + 15, this.calculate_vertical_position(second_line) + 15);
    this.paper.line(horizontal_position + 15, this.calculate_vertical_position(second_line) - 15,
                    horizontal_position - 15, this.calculate_vertical_position(second_line) + 15);

  },

  fradkin: function(circuit){
    for(var i = 0; i < circuit.length - 2; ++i){
      this.positive_control(circuit[i]);
    }
    this.swap(circuit[circuit.length - 2], circuit[circuit.length - 1]);
    this.connect_circuit_partials(circuit);
  },

  v_gate: function(circuit){
    for(var i = 0; i < circuit.length - 1; ++i){
      this.positive_control(circuit[i]);
    }
    this.connect_circuit_partials(circuit);
    this.v_minus(circuit[circuit.length - 1]);

  },

  peres: function(circuit){
    var horizontal_position = this.current_horizontal_position;
    var rect = this.paper.
      rect(horizontal_position - 15, this.calculate_vertical_position(circuit[0]) - 15,
           30, this.calculate_vertical_position(circuit[circuit.length - 1]) - this.calculate_vertical_position(circuit[0]) + 15).
        attr({fill: "white"});


    this.paper.text(horizontal_position, rect.getBBox().y+rect.getBBox().height/2, "Peres").
      attr({"font-size": 16, "text-anchor": "middle"}).
      transform("r-90");
  },

  v_plus_gate: function(circuit){
    for(var i = 0; i < circuit.length - 1; ++i){
      this.positive_control(circuit[i]);
    }
    this.connect_circuit_partials(circuit);
    this.v_plus(circuit[circuit.length - 1]);

  },

  v_plus: function(line){
    var horizontal_position = this.current_horizontal_position;
    this.paper.rect(horizontal_position - 15, this.calculate_vertical_position(line) - 15, 30, 30).
      attr({fill: "white"});
    this.paper.text(horizontal_position, this.calculate_vertical_position(line), "V+").
      attr({ "font-size": 16});
  },

  v_minus: function(line){
    var horizontal_position = this.current_horizontal_position;
    this.paper.rect(horizontal_position - 15, this.calculate_vertical_position(line) - 15, 30, 30).
      attr({fill: "white"});
    this.paper.text(horizontal_position, this.calculate_vertical_position(line), "V").
      attr({ "font-size": 16});
  },

  convert_to_svg: function(){
    var svg = this.paper.toSVG();
    this.element.innerHTML = svg;
  },

  draw_circuit: function(){
    this.draw_lines(this.columns_count());
    var drawer = this;
    jQuery.each(this.circuit(), function(index, value){
      drawer.calculate_horizontal_position(index + 1);
      drawer.draw_gate(value);
    });
  },

  draw_lines: function(gate_count){
    var drawer = this
   jQuery.each(this.lines(), function(index, value){
     drawer.paper.line(10, drawer.calculate_vertical_position(value),
                       50 * (gate_count + 1), drawer.calculate_vertical_position(value));
   });
  },

  draw_gate: function(gate_hash){
    var gate_name = gate_hash["gate_name"];
    if(gate_name.search(/t\d/) >= 0){
      this.toffoli(gate_hash["params"]);
    }else if(gate_name.search(/p\d*/) >= 0){
      this.peres(gate_hash["params"]);
    }else if(gate_name.search(/f\d/) >= 0){
      this.fradkin(gate_hash["params"]);
    }else if(gate_name.search(/v\+\d/) >= 0){
      this.v_plus_gate(gate_hash["params"]);
    }else if(gate_name.search(/v\d/) >= 0){
      this.v_gate(gate_hash["params"]);
    }
  }
};

for (var key in drawer_functions) {
  if (drawer_functions.hasOwnProperty(key))
    Drawer.prototype[key] = drawer_functions[key];
}

window.Drawer = Drawer;
