var Circuit = function(circuit_data) {
  this.filename = circuit_data.filename;
  this.raw = circuit_data.raw;
  this.source = circuit_data.source;
  this.data = circuit_data.circuit;
};

var circuit_functions = {

  columns: function() {
    return this.data.circuit;
  },

  columns_count: function() {
    return this.columns().length;
  },

  rows_count: function() {
    return this.rows().length;
  },

  rows: function() {
    return this.data.variables;
  },

  gates_count: function() {
    return this.gates().length;
  },

  gates: function() {
    return this.columns();
  },

  lines_count: function() {
    return this.lines().length;
  },

  lines: function() {
    return this.rows();
  },

  gate_at: function(index) {
    return this.gates()[index];
  },

  gate_index: function(gate) {
    return jQuery.inArray(gate, this.gates());
  },

  line_at: function(index) {
    return this.lines()[index];
  },

  line_index: function(line) {
    return jQuery.inArray(line, this.lines());
  },

  version: function() {
    return this.data.circuit.version;
  },

};

for (var key in circuit_functions) {
  if (circuit_functions.hasOwnProperty(key))
    Circuit.prototype[key] = circuit_functions[key];
}

window.Circuit = Circuit;
