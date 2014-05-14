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

var recreate_file_list = function(files) {
  var file_list = $('ul#real_file_selected_files');
  file_list.html('');
  files.forEach(function(file) {
    file_list.append($('<li/>').html(file.name));
  });
}

$(document).ready(function(){
  $.get("available_files", function(data){
      Template.use('file_selection', function(template) {
        $("div#circuit_loading").html(template({files: data}));
        $('form#real_files_selector').submit(function(e) {
          e.preventDefault();
          var file = $(this).find('select option:selected').val();
          $.get("parsed/"+file, draw_circuit, "json");
        });

        var button = $('form#real_file_uploader input[type="submit"]');
        var button_value = button.val();
        $('input#real_file_select').fileupload({
          url: '/parse/',
          type: 'POST',
          dataType: 'json',
          done: function (e, data) {
            var store = new LocalStore('realized:parse')
            var response = data.result;
            store.store(response.filename, response);
            $(button).attr('value', button_value);
            draw_circuit(response);
            $('ul#real_file_selected_files li').remove();
          },
          add: function (e, data) {
            recreate_file_list(data.files);
            data.context = button.on('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              button_value = $(this).val();
              $(this).attr('value', 'Uploading...');
              data.submit();
            });
          }
        });
      });
  }, "json");
});
