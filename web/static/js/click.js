

function clickNewProject(){
  var urlData = getUrlData();
  var projectUrl = "project?userName=" + urlData["urlUserName"];
  window.location.href = projectUrl;
}

function clickAddTestcase(e){
  var name = getClickLabelData(e);
  var urlHref = "testcase?userName=" + name["userName"] + "&project=" + name["projectName"] + "&testsuit=" + name["testsuitName"];
  window.location.href = urlHref;
}

function clickAddTestsuit(e){
  var name = getClickLabelData(e);
  var urlHref = "testsuit?userName=" + name["userName"] + "&project=" + name["projectName"];
  window.location.href = urlHref;
}

function clickChangeProject(e){
  var clickData = getClickLabelData(e);
  var userData = getUserData(clickData["userName"]);
  var project = findDataFromFile("project", userData, clickData);
  var ids = ["projectName","projectDiscribe","projectType","projectStartTime","projectEndTime","projectManager","projectDeveloper","projectTester"];
  setValueToForm(ids, project);
}


function clickChangeTestsuit(e){
  var clickData = getClickLabelData(e);
  var userData = getUserData(clickData["userName"]);
  var suit = findDataFromFile("testsuit", userData, clickData);
  var ids = ["suitName","suitDiscribe","suitLibrary","suitSetup","suitTeardown","suitCreatTime"];
  setValueToForm(ids, suit);  
}


function clickChangeTestcase(e){
  var clickData = getClickLabelData(e);
  var userData = getUserData(clickData["userName"]);
  var testcase = findDataFromFile("testcase", userData, clickData);
  var ids = ["caseName","caseDiscribe","casePriority","casePrifix","caseStep","caseExpectResult","caseCreateTime"];
  setValueToForm(ids, testcase);
}


function getClickLabelData(e){
  var labelNameDict = {
    "userName" : null,
    "projectName" : null,
    "testsuitName" : null,
    "testcaseName" : null
  }
  var name = $(e).attr("name").split("_");
  try{
    labelNameDict["userName"] = name[0];
    labelNameDict["projectName"] = name[1];
    labelNameDict["testsuitName"] = name[2];
    labelNameDict["testcaseName"] = name[3];
  } catch(err){

  }
  return labelNameDict;
}

function clickSubmitTestsuit(){
  var urlData = getUrlData();
  var valueJson = {
    "userName" : urlData["urlUserName"],
    "projectName":urlData["urlProjectName"],
    "suitName":null,
    "suitDiscribe":null,
    "suitLibrary":null,
    "suitSetup":null,
    "suitTeardown":null,
    "suitCreatTime":null,
    "case":[]
  };
  var ids = ["suitName","suitDiscribe","suitLibrary","suitSetup","suitTeardown","suitCreatTime"];
  for(var i = 0; i < ids.length; ++i){
    var formValue = document.getElementById(ids[i]).value;
    valueJson[ids[i]] = formValue;
  }
  var subUrl = "setFormValueTestsuit";
  var isSuccess = ajax_fun(subUrl, valueJson);
  if (isSuccess == "true"){
    alert("测试用例添加成功")
    location.reload();
  }
}

function clickSubmitProject(){
  var urlData = getUrlData();
  var valueJson = {
    "userName" : urlData["urlUserName"],
    "projectManager": null,
    "projectDiscribe": null,
    "suit": [],
    "projectTester": null,
    "projectName": null,
    "projectStartTime": null,
    "projectDeveloper": null,
    "projectType": null,
    "projectEndTime": null
  };
  var ids = ["projectName","projectDiscribe","projectType","projectStartTime","projectEndTime","projectManager","projectDeveloper","projectTester"];
  for(var i = 0; i < ids.length; ++i){
    var formValue = document.getElementById(ids[i]).value;
    valueJson[ids[i]] = formValue
  }
  var subUrl = "writeProjectToUser";
  var isSuccess = ajax_fun(subUrl, valueJson);
  if (isSuccess == "true"){
    alert("添加项目成功");
    location.reload();
  }
}

function clickSubmitTestcase(){
  var urlData = getUrlData();
  var valueJson = {
    "userName" : urlData["urlUserName"],
    "projectName": urlData["urlProjectName"],
    "testsuitName" : urlData["urlTestsuitName"],
    "caseName": null,
    "caseStep": null,
    "casePriority": null,
    "caseDiscribe": null,
    "casePrifix": null,
    "caseCreateTime": null,
    "caseExpectResult": null,
    "bug": "false"
  };
  var ids = ["caseName","caseDiscribe","casePriority","casePrifix","caseStep","caseExpectResult","caseCreateTime"];
  for(var i = 0; i < ids.length; ++i){
    var formValue = document.getElementById(ids[i]).value;
    valueJson[ids[i]] = formValue
  }
  var subUrl = "writeTestCase";
  var isSuccess = ajax_fun(subUrl, valueJson);
  if (isSuccess == "true"){
    alert("添加测试用例成功")
    location.reload();
  }
}

function clickCancelTestsuit(){
  var ids = ["suitName","suitDiscribe","suitLibrary","suitSetup","suitTeardown","suitCreatTime"];
  removeAllFormValue(ids);
}

function clickCancelProject(){
  var ids = ["projectName","projectDiscribe","projectType","projectStartTime","projectEndTime","projectManager","projectDeveloper","projectTester"];
  removeAllFormValue(ids);  
}

function clickCancelTestcase(){
  var ids = ["caseName","caseDiscribe","casePriority","casePrifix","caseStep","caseExpectResult","caseCreateTime"];
  removeAllFormValue(ids);
}


function removeAllFormValue(ids){
  for(var i = 0; i < ids.length; ++i){
    var form = document.getElementById(ids[i]);
    form.value = "";
  }
}


function clickRemoveTestsuit(e){
  var urlData = getClickLabelData(e);
  var subUrl = "removeTestsuit";
  var isSuccess = ajax_fun(subUrl, urlData);
  if (isSuccess == "true"){
    alert("测试用例删除成功！")
    location.reload()
  }
}

function clickRemoveProject(e){
  var urlData = getClickLabelData(e);
  var subUrl = "removeProject";
  var isSuccess = ajax_fun(subUrl, urlData);
  if (isSuccess == "true"){
    alert("项目删除成功")
    location.reload()
  }
}

function clickRemoveTestcase(e){
  var urlData = getClickLabelData(e);
  var subUrl = "removeTestcase";
  var isSuccess = ajax_fun(subUrl, urlData);
  if (isSuccess == "true"){
    alert("测试用例删除成功")
    location.reload()
  }
}

//TODO: when we set tr's attribute, we need send the bug status to server to change user's json file
function clickBugRecord(e){
  var clickName = getClickLabelData(e);
  var tr = document.getElementById(clickName["testcaseName"]);
  tr.setAttribute("class", "text-danger");
}

//TODO: when we set tr's attribute, we need send the bug status to server to change user's json file
function clickBugCancel(e){
  var clickName = getClickLabelData(e);
  var tr = document.getElementById(clickName["testcaseName"]);
  tr.setAttribute("class", "");
}
