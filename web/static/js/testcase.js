function loadAllInTestcase(){
  var urlData = getUrlData();
  var userData = getUserData(urlData["urlUserName"]);
  loadNav(urlData, userData);
}
