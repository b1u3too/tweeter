/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
  <p>${tweetData.content.text}</p> 
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
  for (const tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
};

$(document).ready(function() {
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET'})
      .then((tweetsData) => {
        renderTweets(tweetsData);
      });
  };

  loadTweets();

  //handle submitting a new tweet to server
  $('form').submit(function(event) {
    event.preventDefault();
    const newTweet = $('textarea').val();

    //alert error if empty tweet submitted
    if (newTweet.trim().length === 0) {
      let err = new Error("Your tweet needs to have at least one character please try again");
      alert(err.message);
      return err;
    }
    //alert error if too long of a tweet is submitted
    if (newTweet.length > 140) {
      let err = new Error("Your tweet needs to be shorter than 140 characters, please try again");
      alert(err.message);
      return err;
    }
    
    const data = $(this).serialize();

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: data
    });
    //clear text area, reset counter, refresh page if submission accepted
    $('textarea').val('');
    $(this).parent().find('.counter').html('140');
    $('')
  });
});