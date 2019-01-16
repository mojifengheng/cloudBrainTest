

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

function clickExcuteTestcase(e){
  var name = getClickLabelData(e)
  var postUrl = "excute"
  var postData = {
    "userName" : name["userName"],
    "projectName": name["projectName"],
    "testsuitName" : name["testsuitName"],
    "testcaseName" : name["testcaseName"]
  }
  var excuteSuccess = ajax_fun(postUrl, postData)
  if (excuteSuccess == "True"){
    var urlHref = "result?userName=" + name["userName"] + "&project=" + name["projectName"] + "&testsuit=" + name["testsuitName"] + "&testcase=" + name["testcaseName"]
    window.location.href = urlHref;
  } else {
    alert("自动化测试执行失败，请重试！")
  }
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
  var writeSuccess = clickSubmit("Testsuit", valueJson, ids);
  if (writeSuccess == "true"){
    alert("添加测试用例集成功");
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
  var writeSuccess = clickSubmit("Project", valueJson, ids);
  if (writeSuccess == "true"){
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
  var writeSuccess = clickSubmit("Testcase", valueJson, ids);
  if (writeSuccess == "true"){
    alert("添加测试用例成功");
    location.reload();
  }
  clickSubmitFile(valueJson, ids);
}

function clickSubmitFile(valueJson, ids){
  var formValue = getFormValues(valueJson, ids);
  var path = formValue["userName"] + "/" + formValue["projectName"] + "/" +formValue["testsuitName"] + "/" + formValue["caseName"]
  // alert("File submit")
  var formData = new FormData();
  formData.append("testcaseFile", $('#testcaseFile')[0].files[0]);
  $.ajax({
    url : $SCRIPT_ROOT + "upload/" + path,//这里写你的url
    type : 'POST',
    data : formData,
    contentType: false,// 当有文件要上传时，此项是必须的，否则后台无法识别文件流的起始位置
    processData: false,// 是否序列化data属性，默认true(注意：false时type必须是post)
    dataType: 'text',//这里是返回类型，一般是json,text等
    clearForm: true,//提交后是否清空表单数据
    async:false,
    success: function() {   //提交成功后自动执行的处理函数，参数data就是服务器返回的数据。
    },
    complete: function(XMLHttpRequest, textStatus){
      returnText = XMLHttpRequest.responseText;
      alert(returnText)
    },
    error: function(data, status, e) {  //提交失败自动执行的处理函数。
    }
  });
}

function clickSubmit(type, valueJson, ids){
  var formValue = getFormValues(valueJson, ids);
  var writeSuccess = writeValues(type, formValue);
  return writeSuccess;
}

function getFormValues(valueJson, ids){
  for(var i = 0; i < ids.length; ++i){
    var formValue = document.getElementById(ids[i]).value;
    valueJson[ids[i]] = formValue
  }
  return valueJson
}

function writeValues(type, formValue){
  var writeUrl = "write" + type;
  var writeSuccess = ajax_fun(writeUrl, formValue);
  return writeSuccess;
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


function clickFileUpload(){
  var file = document.getElementById("testcaseFile");
  file.click();
}

function clickFileChange(){
  var text = document.getElementById("testcaseText");
  var file = document.getElementById("testcaseFile");
  text.value = file.value;
}