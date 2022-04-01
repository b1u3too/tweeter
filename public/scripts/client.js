/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//HELPER FUNCTIONS

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

function createTweetElement(tweetData) {
  return `
  <article>
  <header>
    <div class="user-markers">
      <img src=${tweetData.user.avatars}>
      <p>${tweetData.user.name}</p>
    </div>
    <p>${tweetData.user.handle}</p>
  </header>
  <p class="tweet-content">${escape(tweetData.content.text)}</p> 
  <footer>
    <p>${timeago.format(tweetData.created_at)}</p>
    <div class="icon-buttons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
  </article>
  `
};

const renderTweets = function(tweets) {
  const tweetRevChronOrder = tweets.reverse();
  for (const tweet of tweetRevChronOrder) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
};

const showError = function(err) {
  $('#error-message').find('.error-text').html(err.message);
  $('#error-message').slideDown('fast');
}

const hideError = function() {
  $('#error-message').find('.error-text').html('');
  $('#error-message').slideUp('fast');
}

//DOCUMENT.READY

$(document).ready(function() {
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET'})
      .then((tweetsData) => {
        renderTweets(tweetsData);
      });
  };
  $('#error-message').hide();
  loadTweets();

  //handle submitting a new tweet to server
  $('form').submit(function(event) {
    event.preventDefault();
    const newTweet = $('textarea').val();

    //alert error if empty tweet submitted
    if (newTweet.trim().length === 0) {
      let err = new Error("Your tweet needs to have at least one character please try again");
      showError(err);
      return;
    }
    //alert error if too long of a tweet is submitted
    if (newTweet.length > 140) {
      let err = new Error("Your tweet needs to be 140 characters or fewer, please try again");
      showError(err);
      return;
    }

    const data = $(this).serialize();

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: data,
      success: () => {
        hideError();
        loadTweets();
      }
    });

    //clear text area, reset counter, empty tweetfeed (reloads async if submission success)
    $('textarea').val('');
    $('#char-counter').html('140');
    $('#tweets-container').html('');
  });
});