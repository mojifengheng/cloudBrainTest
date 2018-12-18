function loadAllInProject(){
  var urlData = getUrlData();
  var userData = getUserData(urlData["urlUserName"]);
  loadNav(urlData, userData);
  loadProject(urlData, userData);
}

function loadProject(urlData, userData){
  var tableID = "tbody-project";
  var tableColName = ["projectName", "projectDiscribe", "projectStartTime", "operation"];
  loadProjectInTable(tableID, tableColName, urlData, userData);
}

function loadProjectInTable(tableID, tableColName, urlData, userData){
  for(var i = 0; i < userData["project"].length; ++i){
    var project =  userData["project"][i];
    addTrToProjectTable(tableID, tableColName, urlData, project);
  }
}

function addTrToProjectTable(tableID, tableColName, urlData, project){
  var tbody = document.getElementById(tableID);
  var tr = createHtmlLabel("tr", null, null);
  for(var i = 0; i < tableColName.length; ++i){
    if (tableColName[i] == "operation"){
      var operation = ["创建测试用例集","修改项目计划", "删除项目"];
      var itName = urlData["urlUserName"] + "_" + project["projectName"];
      var clickOperation = ["clickAddTestsuit(this)","clickChangeProject(this)","#"];
      addOperation(tr, operation, clickOperation, itName);
    } else {
      var tdText = project[tableColName[i]];
      var td = createHtmlLabel("td", null, tdText);
      addChildLabel(tr, td);
    }
  }
  addChildLabel(tbody, tr)
}
