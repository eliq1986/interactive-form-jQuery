$( document ).ready(function() {


//on page load
$("#name").focus();
$("input#other-title").hide();
$("select#color").hide();


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


// Basic Info fieldset; Job role selection
$("select#title").on("change", function (event) {
  const otherInputElement = $("input#other-title");
  this.value == "other" ? otherInputElement.slideDown() : otherInputElement.slideUp();
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
let amount =  0;
$("input[type='checkbox']").on("change",function (event) {
const isCheckedIndex =  $("input[type='checkbox']").index(this);
console.log(isCheckedIndex);
switch(isCheckedIndex) {
       case 1:
         console.log("Hello");
         break;
       case 2:
         console.log("hello from 2");
         break;

  }

  // amount code
  // const activityAmount = $(this)
  // .parent()
  // .text()
  // .split(" ")
  // .pop()
  // .slice(1);
  // amount += parseInt(activityAmount);

});



});
