// Drag tasks around
$(".drag").draggable({
  revert: "invalid",
  start: function (e, ui) {
    // Date from where task was dragged from
    $(this).data("oldDate", $(this).parent().data("date"));
  }
});

// Select drop area for Tasks (only droppable on TD which have "data-date" attribute)
$("td[data-date]").droppable({
  drop: function (e, ui) {
    var drag = ui.draggable,
      drop = $(this),
      oldDate = drag.data("oldDate"), // Task date on drag
      newDate = drop.data("date"), // Task date on drop
      dragID = drag.data("userid"), // Task userid on drag
      dropID = drop.data("userid"); // Task userid on drop
    if (oldDate != newDate || dragID != dropID) {
      $(drag).detach().css({ top: 0, left: 0 }).appendTo(drop);
      $(drag).data("userid", dropID); // Update task userid
    } else {
      return $(drag).css({ top: 0, left: 0 }); // Return task to old position
    }
  }
});

// show EDIT and TRASH tools
$(".drag").hover(
  function () {
    var isAdmin = 1; // Ability to hide or show edit and delete options
    if (isAdmin == 1) {
      $(this)
        .css("z-index", "999")
        .prepend(
          '<div class="opt-tools"><div class="opt-edit"><i class="fas fa-pen"></i></div><div class="opt-trash"><i class="fas fa-trash"></i></div></div>'
        );
    }
  },
  function () {
    //When mouse hovers out DIV remove tools
    $(this).css("z-index", "0").find(".opt-tools").remove();
  }
);

// Show modal to edit task
$(document).on("click", ".opt-edit", function () {
  // Get task ID and DATE from DATA attribute
  var taskid = $(this).parent().parent().data("taskid"),
    userid = $(this).parent().parent().data("userid");
  // Get DATE
  var date = $(this).closest("td").data("date");
  // insert data to Modal
  $("#ktxt")[0].jscolor.fromString("FFFFFF");
  $("#kbg")[0].jscolor.fromString("8E8E8E");
  $("#demotaak2").css("color", "#FFFFFF");
  $("#demotaak1").css("border-left-color", "#8E8E8E");
  $("#demotaak2").css("background-color", "#8E8E8E");
  $("#edittask").modal("show");
});

// Modal remove task ?
$(document).on("click", ".opt-trash", function () {
  var taskid = $(this).parent().parent().data("taskid");

  $("#taskdelid").val(taskid);
  $("#modal-delete").html(
    "Tem a certeza que pretende eliminar o ID <b>" + taskid + "</b>?"
  );
  $("#deletetask").modal("show");
});

// Remove task after conformation
$(document).on("click", "#confdelete", function () {
  var taskid = $("#taskdelid").val();
  $("div")
    .find("[data-taskid=" + taskid + "]")
    .remove();
  $("#deletetask").modal("hide");
});

function changeColor(id, c) {
  if (id == "ctxt") {
    $("#demotaak2").css("color", "#" + c);
  } else if (id == "cbg") {
    $("#demotaak1").css("border-left-color", "#" + c);
    $("#demotaak2").css("background-color", "#" + c);
  }
  return false;
}









// Seleciona os elementos da Tab "Locais"
const tabLocais = document.querySelector('.tab-locais');  // A tab "Locais"
const dropZone = document.querySelector('.drop-zone');  // O alvo onde a tab será movida

// Evento de dragstart para armazenar os dados da tab "Locais" sem removê-los
tabLocais.addEventListener('dragstart', (event) => {
    // Guarda o conteúdo HTML da tab "Locais" no dataTransfer
    event.dataTransfer.setData('text', tabLocais.innerHTML);
    // Altera a opacidade da tab para mostrar que está sendo arrastada
    event.target.style.opacity = '0.5';
});

// Evento de dragend para restaurar a opacidade após o drag
tabLocais.addEventListener('dragend', (event) => {
    // Restaura a opacidade da tab "Locais" após o arraste
    event.target.style.opacity = '1';
});

// Permitir o drop ao adicionar um evento de dragover no alvo de drop
dropZone.addEventListener('dragover', (event) => {
    // Previne o comportamento padrão para permitir o drop
    event.preventDefault();
});

// Evento de drop para copiar o conteúdo da tab "Locais"
dropZone.addEventListener('drop', (event) => {
    // Previne o comportamento padrão do drop
    event.preventDefault();
    // Obtém os dados (HTML da tab "Locais") que foram armazenados no dragstart
    const data = event.dataTransfer.getData('text');
    // Adiciona os dados copiados no local de drop (alvo)
    dropZone.innerHTML += data;
});
