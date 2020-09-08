'use strict';

function getRepos() {
    fetch('https://api.github.com/users/' + `${$("#js-username").val()}` + '/repos')
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'+error));
}

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  if (responseJson.message === 'Not Found') {
    $('#js-error-message').html(
      `<p>${responseJson.message}</p>
      <p>TRY ANOTHER USERNAME</p>`
    );
  }
  else {
  $('.results').html(generateResultsList(responseJson))}
  //display the results section
  $('#results').removeClass('hidden');
}

function generateResultsList(responseJson) {
    let resultsHtml = ''
    for(let i=0; i<responseJson.length; i++) {
      resultsHtml += `<li><h3><p>${responseJson.value[i].name}</p></h3>
      <a href="${responseJson.value[i].html_url}">${responseJson.value[i].html_url}</a>
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