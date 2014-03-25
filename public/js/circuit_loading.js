var draw = function(circuit, lines){
  window.drawer = new Drawer((circuit.length+2)*50, 500, circuit, lines);
  window.drawer.draw_circuit();
  window.drawer.convert_to_svg();
};

$(document).ready(function(){
  $.get("available_files", function(data){
      Template.use('file_selection', function(template) {
        $("div#circuit_loading").html(template({files: data}));
        $('form#real_files_selector').submit(function(e) {
          e.preventDefault();
          var file = $(this).find('select option:selected').val();
          $.get("parsed/"+file, function(response){
            var data = response.circuit;
            draw(data.circuit, data.variables);
            $('#current_circuit_code pre').
              replaceWith($('<pre/>').html(response.raw));
          }, "json");
        });
      });
  }, "json");
});

