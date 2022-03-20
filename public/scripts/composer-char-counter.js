$(document).ready(function() {
  console.log("JQuery loaded");
  $('#tweet-text').on('input', function(event) {
    console.log(this);

    const counterElement = $(this).parent().find('.counter');
    const maxLength = counterElement.attr("maxLength");
    const currentLength = $(this).val().length;
    const charsRemaining = maxLength - currentLength;

  
    //$(this).parent() to get to form, and use find('.counter) to go find the element.. 

    counterElement.html(`${charsRemaining}`);

    if (charsRemaining < 0) {
      counterElement.css({color: 'red'});
    } else {
      counterElement.css({color: '#545149'});
    }
  });
});