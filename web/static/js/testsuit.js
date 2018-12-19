function loadAllInTestSuit(){
  var urlData = getUrlData();
  var userData = getUserData(urlData["urlUserName"]);
  loadNav(urlData, userData);
  loadTestsuit(urlData, userData);
}


function loadTestsuit(urlData, userData){
  var tableID = "tbody-suit";
  var tableColName = ["suitName", "suitDiscribe", "suitCreatTime", "operation"]
  loadTestsuitTable(tableID, tableColName, urlData, userData);
}


function loadTestsuitTable(tableID, tableColName, urlData, userData){
  if (urlData["urlProjectName"] == null){
    return;
  }
  var urlProjectName = urlData["urlProjectName"];
  for(var i = 0; i < userData["project"].length; ++i){
    var userProjectName = userData["project"][i]["projectName"];
    if (urlProjectName == userProjectName){
      var project = userData["project"][i];
      addTrToTestsuit(tableID, tableColName, urlData, project);
    }
  }
}

function addTrToTestsuit(tableID, tableColName, urlData, project){
  var tbody = document.getElementById(tableID);
  for (var i = 0; i < project["suit"].length; ++i){
    var tr = createHtmlLabel("tr");
    for(var j = 0; j < tableColName.length; ++j){
      if (tableColName[j] == "operation"){
        var operation = ["添加测试用例", "执行测试用例集", "修改测试用例集", "删除测试用例集"];
        var itName = urlData["urlUserName"] + "_" + project["projectName"] + "_" + project["suit"][i]["suitName"];
        var clickOperation = ["clickAddTestcase(this);", "#", "clickChangeTestsuit(this)", "clickRemoveTestsuit(this)"];
        addOperation(tr, operation, clickOperation, itName);
      } else {
        var tdText = project["suit"][i][tableColName[j]];
        var td = createHtmlLabel("td", null, tdText);
        addChildLabel(tr, td);
      }
    }
    addChildLabel(tbody, tr);
  }
}
