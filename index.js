(function () {
  'use strict';

  function getRepos() {
      fetch('https://api.github.com/users/' + $("#js-username").val() + '/repos?sort=created')
      .then(response => response.json())
      .then(responseJson => 
        displayResults(responseJson))
      .catch(error => alert('Something went wrong. Try again later.'+error));
  }

  function displayResults(responseJson) {
    console.log(responseJson);
    if (responseJson.message === 'Not Found') {
      $('#js-error-message').html(
        `<p>${responseJson.message}</p>
        <p>TRY ANOTHER USERNAME</p>`
      );
      $('#results').addClass('hidden');
    }
    else {
      $('#results-list').html(generateResultsList(responseJson));
      $('#results').removeClass('hidden');
    }
  }

  function generateResultsList(responseJson) {
      let resultsHtml = ''
      for(let i=0; i<responseJson.length; i++) {
          console.log(responseJson[i]);
        resultsHtml += `<li><h3><p>${responseJson[i].full_name}</p></h3>
        <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
        </li>`;
      }
      return resultsHtml;
    }

  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      getRepos();
    });
  }

  $(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
  });
}());