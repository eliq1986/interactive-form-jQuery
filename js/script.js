$(document).ready(function() {

  //on page load
  $("#name").focus();
  $("input#other-title").hide();
  $("select#color").hide();
  $("fieldset div p").hide();
  $("p#select-activity").hide();
  $("span#name_blank").hide();

  // takes 1 arg an object with 3 key/value pairs
  function showSelectedThemeColors(typeOfShirtsObject) {
    if (typeOfShirtsObject.optionValue === 1) {
      typeOfShirtsObject.jsPunsShirts.show();
      typeOfShirtsObject.jsPunsShirts.eq(0).attr("selected", "selected");
      typeOfShirtsObject.jsOnly.hide();
    } else if (typeOfShirtsObject.optionValue === 2) {
      typeOfShirtsObject.jsOnly.show();
      typeOfShirtsObject.jsOnly.eq(0).attr("selected", "selected");
      typeOfShirtsObject.jsPunsShirts.hide();
    } else {
      $("select#color").hide();
    }

  }

// takes 2 arg; disables other activty that times overlap. Also darkens color.
  function blockOtherActivityTimeSlot(isCheckedIndex, index) {

    $("input[type='checkbox']")
    .eq(isCheckedIndex + index)
    .attr("disabled", true)
    .parent()
    .css("color", "darkgrey");

  }

// takes 2 arg; sets attr disabled to false and color to black.
  function unblockOtherActivityTimeSlot(isCheckedIndex, index) {

    $("input[type='checkbox']")
    .eq(isCheckedIndex + index)
    .attr("disabled", false)
    .parent()
    .css("color", "black");
  }

// takes this arg from checkbox on change listener; pulls text and parse into number type
  function getCheckBoxActivityAmount(that) {

    const activityAmount = $(that)
    .parent()
    .text()
    .split(" ")
    .pop()
    .slice(1);
    return parseInt(activityAmount);
  }

// takes a number parsed arg; and updates DOM with new number
  function calculateAcitivtyTotalAndUpdate(activityAmount) {
    let currentAmount = parseInt($("span#total-activities").text());
    currentAmount += activityAmount;
    $("span#total-activities").empty().text(currentAmount);

  }


  // Basic Info fieldset; Job role selection
  $("select#title").on("change", function(event) {
    const otherInputElement = $("input#other-title");
    this.value == "other"
      ? otherInputElement.slideDown()
      : otherInputElement.slideUp();
  });


  // T-Shirt Info color selection.
  $("select#design").on("change", function() {
    $("select#color").show();
    $("select#color *").removeAttr("selected");

    const typeOfShirts = {
      jsPunsShirts: $("select#color option").slice(0, 3),
      jsOnly: $("select#color option").slice(3),
      optionValue: this.selectedIndex
    }

    showSelectedThemeColors(typeOfShirts);

  });


  //Register For Activities FieldSet
  $("input[type='checkbox']").on("change", function(event) {

    const theIndexOfWhatCheckBoxWasChecked = $("input[type='checkbox']").index(this);

    if ($(event.target).prop("checked")) {

      const total = getCheckBoxActivityAmount(this);
      calculateAcitivtyTotalAndUpdate(total);

      switch (theIndexOfWhatCheckBoxWasChecked) {
        case 1:
          blockOtherActivityTimeSlot(theIndexOfWhatCheckBoxWasChecked, 2);
          break;
        case 2:
          blockOtherActivityTimeSlot(theIndexOfWhatCheckBoxWasChecked, 2);
          break;
        case 3:
          blockOtherActivityTimeSlot(theIndexOfWhatCheckBoxWasChecked, -2);
          break;
        case 4:
          blockOtherActivityTimeSlot(theIndexOfWhatCheckBoxWasChecked, -2);
          break;
      }

    } else {

      const total = getCheckBoxActivityAmount(this);
      calculateAcitivtyTotalAndUpdate(-total);

      switch (theIndexOfWhatCheckBoxWasChecked) {
        case 1:
          unblockOtherActivityTimeSlot(theIndexOfWhatCheckBoxWasChecked, 2);
          break;
        case 2:
          unblockOtherActivityTimeSlot(theIndexOfWhatCheckBoxWasChecked, 2);
          break;
        case 3:
          unblockOtherActivityTimeSlot(theIndexOfWhatCheckBoxWasChecked, -2);
          break;
        case 4:
          unblockOtherActivityTimeSlot(theIndexOfWhatCheckBoxWasChecked, -2);
          break;
      }

    }

  });

//payment select option
$("select#payment").on("change", function(event) {
  switch(this.selectedIndex) {
    case 0:
      $("fieldset div p", "div#credit-card").hide();
      break;
    case 1:
      $("fieldset div p").hide();
      $("div#credit-card").show();
     break;
    case 2:
      $("div#credit-card, fieldset div p:last").hide();
      $("fieldset div p").eq(0).show();
      break;
    case 3:
      $("div#credit-card, fieldset div p").hide();
      $("fieldset div p").eq(1).show();
      break;
}

});


function checkCheckBox() {
  const checkBoxes = $("input[type='checkbox']");
  let isABoxChecked = false;
  $("p#select-activity").show();
  $.each(checkBoxes, function (index, checkbox) {
       if(checkbox.checked) {
         isABoxChecked = true;
       }
    });
      isABoxChecked ? $("p#select-activity").hide():event.preventDefault();
}


function checkInputValues(inputToCheck, regrex, passAFunction) {

   if(!regrex.test(inputToCheck.val())) {
      event.preventDefault();
      inputToCheck.addClass("validation-border");

   } else {
      inputToCheck.removeClass("validation-border");

   }
      passAFunction(regrex, inputToCheck);

}

//checks if name has input and not left blank; function has ability to
function checkNameInput() {
    if(!$("input#name").val().trim().length) {
      $("span#name_error").text("Please enter your name").show();
  } else {
      $("span#name_error").hide();
  }
}


function checkEmail(regrex, inputToCheck) {
  if(!inputToCheck.val().trim().length) {
    $("span#email_error").text("Cannot leave blank, please enter email");

  } else if(!regrex.test(inputToCheck.val())) {
      $("span#email_error").text("Cannot leave blank, please enter email");
  }else {
    $("span#email_error").hide();
  }
}




//form submit
$("button[type='submit']").on("click", function (event) {
const emailRegrex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{1,4}[\s]*$/;
const creditRegrex =  /^\d{13,16}[\s]*$/;
const zipRegrex = /^\d{5}[\s]*$/;
const cvvRegrex = /^\d{3}[\s]*$/;
const nameRegrex = /^[a-zA-Z]+[a-zA-Z\s]*$/;

checkInputValues($("input#name"), nameRegrex, checkNameInput);
checkInputValues($("input#mail"), emailRegrex, checkEmail);
checkCheckBox();

 if($("select#payment option:selected")[0].index === 1) {
   // checkInputValues( $("input#cc-num"), creditRegrex);
   // checkInputValues( $("input#cvv"), cvvRegrex);
   // checkInputValues($("input#zip"), zipRegrex);
 }
  // checkNameInput();

});


  //end of jquery closure
});
