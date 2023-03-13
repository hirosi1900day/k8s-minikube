var btnSubmit_onclick = function (event) {
  var $submit = $(this);
  var $form = $submit.parents("form");

  // Set request method & action.
  $form.attr("method", $submit.data("method"));
  $form.attr("action", $submit.data("action"));

  // Submit data.
  $form.submit();

  // Disable form controles and default process.
  // $submit.off().prop("disabled", true);
  // $form.on("submit", false);
  return false;
};

var document_onready = function (event) {
  $("button[type='submit']").on("click", btnSubmit_onclick);
};

$(document).ready(document_onready);
