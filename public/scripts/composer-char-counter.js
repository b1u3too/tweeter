$(document).ready(function() {
  $('#tweet-text').on('input', function(event) {
    //find counter element by traversing DOM tree
    const counterElement = $(this).parent().find('.counter');
    
    const maxLength = counterElement.attr("maxLength");
    const currentLength = $(this).val().length;
    const charsRemaining = maxLength - currentLength;

    counterElement.html(`${charsRemaining}`);

    if (charsRemaining < 0) {
      counterElement.css({color: 'red'});
    } else {
      counterElement.css({color: '#545149'});
    }
  });
});