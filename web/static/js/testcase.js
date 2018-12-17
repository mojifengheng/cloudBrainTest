function loadAllInTestcase(){
  var urlData = getUrlData();
  var userData = getUserData(urlData["urlUserName"]);
  loadNav(urlData, userData);
  loadTestcase(urlData, userData);
}

function loadTestcase(urlData, userData){
  var tableID = "tbody-case";
  var tableColName = ["caseName","caseDiscribe","caseCreateTime","operation"];
  loadTestcaseInTable(tableID, tableColName, urlData, userData);
}

function loadTestcaseInTable(tableID, tableColName, urlData, userData){
  if (urlData["urlProjectName"] == null || urlData["urlTestsuitName"] == null){
    return;
  }
  for(var i = 0; i < userData["project"].length; ++i){
    var project = userData["project"][i];
    if (project["projectName"] == urlData["urlProjectName"]){
      for(var j = 0; j < project["suit"].length; ++j){
        var suit = project["suit"][j];
        if (suit["suitName"] == urlData["urlTestsuitName"]){
          for(var k = 0; k < suit["case"].length; ++k){
            var testcase = suit["case"][k];
            addTrToTestcase(tableID, tableColName, urlData, testcase);
          }
        }
      }
    }
  }
}

function addTrToTestcase(tableID, tableColName, urlData, testcase){
  var tbody = document.getElementById(tableID);
  var tr = createHtmlLabel("tr", null, null);
  for(var i = 0; i < tableColName.length; ++i){
    if (tableColName[i] == "operation"){
      var operation = ["执行测试用例","删除测试用例","Bug记录"];
      var clickOperation = ["#","#","#"];
      addOperation(tr, operation, clickOperation);
    } else {
      var tdText = testcase[tableColName[i]];
      var td = createHtmlLabel("td", null, tdText);
      addChildLabel(tr, td);
    }
  }
  addChildLabel(tbody, tr);
}
