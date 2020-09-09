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
    let userName = '${responseJson.value[i].name}'
    let repoLink = '{responseJson.value[i].html_url}'
    for(let i=0; i<responseJson.length; i++) {
      resultsHtml += `<li><h3><p>${userName}</p></h3>
      <a href="${repoLink}">${repoLink}</a>
      </li>`;
    }
    return resultsHtml;
    return userName;
    return repoLink;
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