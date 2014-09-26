var default_height = 500;
var default_width = function(lines) {
  return (lines + 2) * 50;
};
var default_horizontal_position = 50;
var default_horizontal_space = 50;
var minimal_space_between_lines = 20;
// this is the ratio to horizontal space
var element_size_ratio = 10;
// this is the ratio to the size of other elements
var control_size_ratio = 4 / 9;
var reserved_space_on_paper = 50;

/*
 * Constructor for a 'Drawer' of circuits.
 * Needs circuit_data as first parameter.
 * Width and Height will default to the above
 * values unless provided.
 */
var Drawer = function(circuit, width, height) {
  this.circuit = circuit;
  this.height = height || Math.max(default_height, circuit.lines_count() * minimal_space_between_lines);
  this.width = width || default_width(this.circuit.columns_count());
  this.element = $('.gates').toArray()[0];
  this.paper = Raphael(this.element, this.width, this.height);
  this.element_size = this.calculate_element_size();
  this.control_size = this.element_size * control_size_ratio;
  this.element_offset = this.calculate_horizontal_space() / element_size_ratio;
  this.rect_width = this.calculate_rectangle_width();
  // this.current_horizontal_position = default_horizontal_position;
}

var drawer_functions = {
  calculate_rectangle_width: function(){
    return this.calculate_horizontal_space()/2 + this.element_offset;
  },

  calculate_space_between_lines: function(){
     return Math.max((this.paper.height - reserved_space_on_paper)/this.circuit.lines_count(), minimal_space_between_lines);
    },

  calculate_vertical_position: function(line) {
    return this.calculate_space_between_lines() * (this.circuit.line_index(line)+1);
  },

  calculate_horizontal_position: function(gate_number){
    this.current_horizontal_position = gate_number * this.calculate_horizontal_space();
  },

  calculate_horizontal_space: function(){
    return Math.min(this.width/this.circuit.columns_count(), default_horizontal_space)
  },

  calculate_element_size: function(){
    return Math.min((this.calculate_space_between_lines()/2) , (this.calculate_horizontal_space()/2));
  },

  not: function(line){
    var vertical_position = this.calculate_vertical_position(line);
    var horizontal_position = this.current_horizontal_position;
    this.paper.circle(horizontal_position, vertical_position,
      this.element_size);
    this.paper.line(horizontal_position - this.element_size, vertical_position,
                    horizontal_position + this.element_size, vertical_position);
    this.paper.line(horizontal_position, vertical_position - this.element_size,
                    horizontal_position, vertical_position + this.element_size);
  },

  positive_control: function(line){
    var vertical_position = this.calculate_vertical_position(line);
    var horizontal_position = this.current_horizontal_position;
    this.paper.circle(horizontal_position, vertical_position, this.control_size).
      attr({fill: "black"});
  },

  toffoli: function(gate){
    for(var i = 0; i < gate.params.length - 1; ++i){
      this.positive_control(gate.params[i]);
    }
    this.not(gate.params[gate.params.length - 1]);
    this.connect_circuit_partials(gate);
  },

  connect_circuit_partials: function(gate){
    var horizontal_position = this.current_horizontal_position;
    for(var i = 0; i < gate.params.length - 1; ++i){
      this.paper.
        line(horizontal_position, this.calculate_vertical_position(gate.params[i]),
             horizontal_position, this.calculate_vertical_position(gate.params[i + 1]));
    }
  },

  swap: function(first_line, second_line){
    var horizontal_position = this.current_horizontal_position;
    this.paper.line(horizontal_position - this.element_size, this.calculate_vertical_position(first_line) - this.element_size,
                    horizontal_position + this.element_size, this.calculate_vertical_position(first_line) + this.element_size);
    this.paper.line(horizontal_position + this.element_size, this.calculate_vertical_position(first_line) - this.element_size,
                    horizontal_position - this.element_size, this.calculate_vertical_position(first_line) + this.element_size);

    this.paper.line(horizontal_position - this.element_size, this.calculate_vertical_position(second_line) - this.element_size,
                    horizontal_position + this.element_size, this.calculate_vertical_position(second_line) + this.element_size);
    this.paper.line(horizontal_position + this.element_size, this.calculate_vertical_position(second_line) - this.element_size,
                    horizontal_position - this.element_size, this.calculate_vertical_position(second_line) + this.element_size);

  },

  fradkin: function(gate){
    for(var i = 0; i < gate.params.length - 2; ++i){
      this.positive_control(gate.params[i]);
    }
    this.swap(gate.params[gate.params.length - 2], gate.params[gate.params.length - 1]);
    this.connect_circuit_partials(gate);
  },

  v_gate: function(gate){
    for(var i = 0; i < gate.params.length - 1; ++i){
      this.positive_control(gate.params[i]);
    }
    this.connect_circuit_partials(gate);
    this.v_minus(gate.params[gate.params.length - 1]);

  },

  peres: function(gate){
    var horizontal_position = this.current_horizontal_position;
    var rect = this.paper.
      rect(horizontal_position - this.element_size, this.calculate_vertical_position(gate.params[0]) - this.element_size,
           this.rect_width, this.calculate_vertical_position(gate.params[gate.params.length - 1]) - this.calculate_vertical_position(gate.params[0]) + this.element_size).
        attr({fill: "white"});
    this.paper.text(horizontal_position, rect.getBBox().y+rect.getBBox().height/2, "Peres").
      attr({"font-size": 16, "text-anchor": "middle"}).
      transform("r-90");
  },

  v_plus_gate: function(gate){
    for(var i = 0; i < gate.params.length - 1; ++i){
      this.positive_control(gate.params[i]);
    }
    this.connect_circuit_partials(gate);
    this.v_plus(gate.params[gate.params.length - 1]);

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
    this.draw_lines(this.circuit.gates_count());
    var drawer = this;
    jQuery.each(this.circuit.gates(), function(index, gate){
      drawer.calculate_horizontal_position(index + 1);
      drawer.draw_gate(gate);
    });
  },

  draw_lines: function(gate_count){
    var drawer = this;
    jQuery.each(this.circuit.lines(), function(index, value){
     drawer.paper.line(10, drawer.calculate_vertical_position(value),
                       50 * (gate_count + 1), drawer.calculate_vertical_position(value));
   });
  },

  draw_gate: function(gate){
    var gate_name = gate.gate_name;
    if(gate_name.search(/t\d/) >= 0){
      this.toffoli(gate);
    }else if(gate_name.search(/p\d*/) >= 0){
      this.peres(gate);
    }else if(gate_name.search(/f\d/) >= 0){
      this.fradkin(gate);
    }else if(gate_name.search(/v\+\d/) >= 0){
      this.v_plus_gate(gate);
    }else if(gate_name.search(/v\d/) >= 0){
      this.v_gate(gate);
    }
  }
};

for (var key in drawer_functions) {
  if (drawer_functions.hasOwnProperty(key))
    Drawer.prototype[key] = drawer_functions[key];
}

window.Drawer = Drawer;
