function clickNewProject(){
  var urlData = getUrlData();
  var projectUrl = "project?userName=" + urlData["urlUserName"];
  window.location.href = projectUrl;
}
