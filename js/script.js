$(document).ready(function() {

  //on page load
  $("#name").focus();
  $("input#other-title").hide();
  $("select#color").hide();
  $("fieldset div p").hide();
  $("p#select-activity").hide();

//contains input selector,error messages and regrex
  const regrexObj = {
       email: {
        invalid: /^[a-zA-Z0-9!#$%^&*()?_-]+@[a-zA-Z]+[\.][a-zA-Z]{3}$/,
        selector: "span#email_error",
        emptyStringText: "Please enter email",
        invalidRegrex: "Invalid email format"

       },
       name: {
         invalid: /^[a-zA-Z]+[a-zA-Z\s]*$/,
         selector: "span#name_error",
         emptyStringText: "Please enter your name",
         invalidRegrex: "You're not the droid were looking for; numbers are invalid"

       },
       zipCode: {
         errorMessage: "*5 digits",
         selector: "span#zip_error",
         regrex: /^\d{5}$/
       },
       cvv: {
         errorMessage:"*3 digits",
         selector:"span#cvv_error",
         regrex: /^\d{3}$/
       },
       credit: {
         errorMessage: "Cannot leave blank",
         selector: "span#cc_error",
         minError: "*min 13 digits",
         maxError: "*max 16 digits",
         minLength: 13,
         maxLength: 15
       },

       digitsOnly: /^\d*$/,
       invalidCharacterMessage: "Digits only",
       emptyString: /^$/
  }

  // takes 1 arg an object with 3 key/value pairs. Called on line 126
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

// takes 2 arg; disables other activty that times overlap. Also darkens color. Called on line 141-151
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
    this.value == "other" ? otherInputElement.slideDown(): otherInputElement.slideUp();
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
      $("fieldset div p").fadeOut(600);
      $("div#credit-card").show(700);
     break;
    case 2:
      $("div#credit-card, fieldset div p:last").slideUp();
      $("fieldset div p").eq(0).show();
      break;
    case 3:
      $("div#credit-card, fieldset div p").slideUp();
      $("fieldset div p").eq(1).show(300);
      break;
}

});

// takes no args; displays error message if no checkboxes are checked
function checkRegisterForActivities() {

  const checkBoxes = $("input[type='checkbox']");

  let isABoxChecked = false;

  $.each(checkBoxes, function (index, checkbox) {
       if(checkbox.checked) {

         isABoxChecked = true;

       } else {

         $("p#select-activity").show().text("Must check one box before submitting");
       }
    });

    if(isABoxChecked) {
     $("p#select-activity").hide();
    } else {
      return false;
    }


}


// takes 2 arg; string and input value. Displays error message if regrex is true
function checkBasicInput(objectBracketString, inputValue) {

  const inputObj = regrexObj[objectBracketString];

  if(regrexObj.emptyString.test(inputValue)) {

    $(inputObj.selector).text(inputObj.emptyStringText);

  } else if(!inputObj.invalid.test(inputValue)) {

    $(inputObj.selector).text(inputObj.invalidRegrex);

  } else {

    $(inputObj.selector).empty();

    return true;
  }
    return false;
}


//takes 2 arg; obj and input value. Displays error message if regrex is true
function checkCreditCard(string, inputValue) {

   const creditObj = regrexObj[string];

   if(!regrexObj.digitsOnly.test(inputValue)) {

      $(creditObj.selector).text(regrexObj.invalidCharacterMessage);

   } else if(inputValue.length < creditObj.minLength) {

      $(creditObj.selector).text(creditObj.minError);

   } else if (inputValue.length > creditObj.maxLength) {

      $(creditObj.selector).text(creditObj.maxError);

   } else {

     $(creditObj.selector).empty();

     return true;
   }

    return false;
}


//takes 2 arg; obj and input value. Displays error message if regrex is true
function checkZipAndCVV(string, inputValue) {

  const obj = regrexObj[string];

  if(!regrexObj.digitsOnly.test(inputValue)) {

    $(obj.selector).text(regrexObj.invalidCharacterMessage);

  }  else if(!obj.regrex.test(inputValue)) {

    $(obj.selector).text(obj.errorMessage);

  }else {

    $(obj.selector).empty();

    return true;
 }

    return false;

}

//form submit
$("button[type='submit']").on("click", function (event) {

  const isNameValid = checkBasicInput("name", $("input#name").val());
  const isEmailValid = checkBasicInput("email", $("input#mail").val());
  const isABoxChecked = checkRegisterForActivities();

  if(!isNameValid || !isEmailValid || isABoxChecked) {
             event.preventDefault();
  }

 if($("select#payment option:selected")[0].index === 1) {

   const isCreditValid = checkCreditCard("credit", $("input#cc-num").val());
   const isZipValid = checkZipAndCVV("zipCode", $("input#zip").val());
   const isCvvValid = checkZipAndCVV("cvv", $("input#cvv").val());

      if(!isCreditValid || !isZipValid || !isCvvValid) {
            event.preventDefault();
      }
 }

});

$("input#name").keyup(()=> checkBasicInput("name",$("input#name").val()));
$("input#mail").keyup(()=> checkBasicInput("email",$("input#mail").val()));
$("input#cc-num").keyup(()=> checkCreditCard("credit",$("input#cc-num").val()));
$("input#zip").keyup(()=> checkZipAndCVV("zipCode",$("input#zip").val()));
$("input#cvv").keyup(()=> checkZipAndCVV("cvv",$("input#cvv").val()));

  //end of jquery closure
});
