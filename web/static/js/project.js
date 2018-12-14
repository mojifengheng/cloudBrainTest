function loadAllInProject(){
  var urlData = getUrlData();
  var userData = getUserData(urlData["urlUserName"]);
  loadNav(urlData, userData);
  loadProject(userData);
}

function loadProject(userData){
  var tableID = "tbody-project";
  var tableColName = ["projectName", "projectDiscribe", "projectStartTime", "operation"];
  loadProjectInTable(tableID, tableColName, userData);
}

function loadProjectInTable(tableID, tableColName, userData){
  for(var i = 0; i < userData["project"].length; ++i){
    var project =  userData["project"][i];
    addTrToProjectTable(tableID, tableColName, project);
  }
}

function addTrToProjectTable(tableID, tableColName, project){
  var tbody = document.getElementById(tableID);
  var tr = createHtmlLabel("tr", null, null);
  for(var i = 0; i < tableColName.length; ++i){
    if (tableColName[i] == "operation"){
      var operation = ["创建测试用例集","修改项目计划", "删除项目"];
      var clickOperation = ["#","#","#"];
      addOperation(tr, operation, clickOperation);
    } else {
      var tdText = project[tableColName[i]];
      var td = createHtmlLabel("td", null, tdText);
      addChildLabel(tr, td);
    }
  }
  addChildLabel(tbody, tr)
}
