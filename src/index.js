import * as blockstack from 'blockstack'

const appConfig = new blockstack.AppConfig()
const userSession = new blockstack.UserSession({ appConfig: appConfig })

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('signin-button').addEventListener('click', function (event) {
      event.preventDefault()
      userSession.redirectToSignIn()
    })
    document.getElementById('signout-button').addEventListener('click', function (event) {
      event.preventDefault()
      userSession.signUserOut(window.location.href)
    })

    function showProfile(profile) {
      
      var person = new blockstack.Person(profile)
      document.getElementById('heading-name').textContent = person.name() ? person.name() : "Nameless Person"
      /*if (person.avatarUrl()) {
        document.getElementById('avatar-image').setAttribute('src', person.avatarUrl())
      }
      else {
        document.getElementById('avatar-image').setAttribute('src', './avatar-placeholder.png')
      }*/
      document.getElementById('section-1').style.display = 'none'
      document.getElementById('section-2').style.display = 'block'
    }

    if (userSession.isUserSignedIn()) {
      var profile = userSession.loadUserData().profile
      //document.write("sgdf")
     // window.location.replace("./dist/index2.html")
      showProfile(profile)
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(function (userData) {
        window.location = window.location.origin
      })
    }
  
  
  })
  window.onload=function(){
  document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueId = chance.guid();
  var issueStatus = 'Open';

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  if (localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();

  fetchIssues();

  e.preventDefault();
}

  function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesListe = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    issuesList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
  }
}
  }