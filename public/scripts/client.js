/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Hardcode proof of concept data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
    <p>${tweetData.created_at}</p>
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
      })
  };

  loadTweets();

  //handle submitting a new tweet to server
  $('form').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: data
    });
  });
});