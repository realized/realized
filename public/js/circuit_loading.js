var draw = function(circuit, lines){
  window.drawer = new Drawer((circuit.length+2)*50, 500, circuit, lines);
  window.drawer.draw_circuit();
  window.drawer.convert_to_svg();
};

var draw_circuit = function(circuit_data) {
  $('#current_file').html(circuit_data.filename);
  $('#current_circuit_code pre').
    replaceWith($('<pre/>').html(circuit_data.raw));
  var circuit = circuit_data.circuit;
  draw(circuit.circuit, circuit.variables);
};

$(document).ready(function(){
  $.get("available_files", function(data){
      Template.use('file_selection', function(template) {
        $("div#circuit_loading").html(template({files: data}));
        $('form#real_files_selector').submit(function(e) {
          e.preventDefault();
          var file = $(this).find('select option:selected').val();
          $.get("parsed/"+file, draw_circuit, "json");
        });

        $('input#real_file_select').fileupload({
          url: '/parse/',
          type: 'POST',
          dataType: 'json',
          done: function (e, data) {
            var store = new LocalStore('realized:parse')
            console.log('done');
            var response = data.result;
            store.store(response.filename, response);
            draw_circuit(response);
          }
        });
      });
  }, "json");
});
