var acc = document.getElementsByClassName("accordion");
var i;

// for (i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var panel = this.nextElementSibling;
//     if (panel.style.maxHeight){
//       panel.style.maxHeight = null;
//     } else {
//       panel.style.maxHeight = panel.scrollHeight + "px";
//     } 
//   });
// }

$(document).ready(function() {
//     var amount = parseFloat(document.getElementById('amount').value);
// document.getElementById('outputLeadingZeros').innerHTML =
//         amount.toLocaleString('en-US',
//         {
//             minimumIntegerDigits: 3,
//             useGrouping: false
//         });
   
    $('.top.tabular .item').tab();
    $('.ui.dropdown').dropdown();

    // $('#example2').calendar({
    //     type: 'date'
    //   });
    //   $('#example3').calendar({
    //     type: 'time'
    //   });
});

