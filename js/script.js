$(document).ready(function() {

  //on page load
  $("#name").focus();
  $("input#other-title").hide();
  $("select#color").hide();
  $("fieldset div p").hide();
  $("p#select-activity").hide();
  $("span#name_blank").hide();


  const regrex = {
       email: /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{1,4}[\s]*$/,
       credit: /^\d{13,16}$/,
       zip: /^\d{5}[\s]*$/,
       cvv: /^\d{3}[\s]*$/,
       name: /^[a-zA-Z]+[a-zA-Z\s]*$/,
       emptyString: /^\s*$/,
       numbersLetters: /^[a-zA-Z0-9]+[a-zA-Z0-9\s]*$/
  }

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


function checkName(regrexObj, inputValue) {
  if(regrexObj.name.test(inputValue)) {
    $("span#name_error").empty();
  } else if(regrexObj.emptyString.test(inputValue)) {
    $("span#name_error").text("Please enter name")
  } else if(regrexObj.numbersLetters.test(inputValue)) {
    $("span#name_error").text("Unless you are a droid..I highly doubt you have numbers in your name")
  }

}

function checkEmail(regrexObj, inputValue) {
  if(regrexObj.email.test(inputValue)) {
    $("span#email_error").empty();
  } else if(regrexObj.emptyString.test(inputValue)) {
    $("span#email_error").text("Please enter email");
  } else if(!regrexObj.email.test(inputValue)) {
    $("span#email_error").text("Invalid email format");
  }
}


function checkCreditCard(regrexObj, inputValue) {
    if(regrexObj.credit.test(inputValue)) {
     $("span#cc_error").empty();
  } else if(regrexObj.emptyString.test(inputValue)) {
    $("span#cc_error").text("Enter credit number")
  } else if(inputValue.length < 13) {
    $("span#cc_error").text("*min 13 digits");
  } else if(inputValue.length > 16) {
   $("span#cc_error").text("*max 16 digits");
 }
}

function checkZip(regrexObj, inputValue) {

  if(regrexObj.zip.test(inputValue)) {
    $("span#zip_error").empty();
  } else if(regrexObj.emptyString.test(inputValue)) {
    $("span#zip_error").text("*5 digits")
  } else if(inputValue.length < 5) {
    $("span#zip_error").text("*5 digits");
  } else if(inputValue.length > 5) {
   $("span#zip_error").text("*5 digits");
 }
}

function checkCvv(regrexObj, inputValue) {
  $("span#cvv_error").empty();
  if(regrexObj.cvv.test(inputValue)) {
    $("span#cvv_error").hide();
  } else if(regrexObj.emptyString.test(inputValue)) {
    $("span#cvv_error").text("*3 digits")
  } else if(inputValue.length < 3) {
    $("span#cvv_error").text("*3 digits");
  } else if(inputValue.length > 3) {
   $("span#cvv_error").text("*3 digits");
  }
}


//form submit
$("button[type='submit']").on("click", function (event) {

checkName(regrex, $("input#name").val());
checkEmail(regrex, $("input#email").val());
checkCheckBox();

event.preventDefault();

 if($("select#payment option:selected")[0].index === 1) {
 checkCreditCard(regrex, $("input#cc-num").val());
 checkZip(regrex, $("input#zip").val());
 checkCvv(regrex, $("input#cvv").val());
 }

});

  //end of jquery closure
});
