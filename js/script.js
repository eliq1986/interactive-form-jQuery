$( document ).ready(function() {


//name field
$("#name").focus();

//appends input field dynamically to the DOM.
$("select#title").on("change", function (event) {

  const inputFieldElement = $("<input type='text' id='other-title' placeholder='Your Job role'> ");

  const basicInfoFieldSet = $(event.target).parent();

  const selectOption = this;

  if (selectOption.value === "other") {

    basicInfoFieldSet.append(inputFieldElement);
  }
});

});
