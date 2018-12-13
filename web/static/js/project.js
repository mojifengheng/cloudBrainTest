function loadAllInProject(){
  var urlData = getUrlData();
  var userData = getUserData(urlData["urlUserName"]);
  loadNav(urlData, userData);
  //loadProjectInTable();
}

function loadProjectInTable(){
  for(var i = 0; i < userData["project"].length; ++i){
    var project = userData["project"][i];
    // var projectName = specificProject["projectName"];
    // var projectDiscribe = specificProject["projectDiscribe"];
    // var projectStartTime = specificProject["projectStartTime"];
    addProjectTr(project);
  }
  // var operation = ["添加测试用例集","查看测试用例集","修改项目计划","删除项目计划"];
  // addProjectOperation(operation)；
}

function addProjectTr(project){
  var tr = document.createElement("tr");
  var projectName = project["projectName"];
  var projectDiscribe = project["projectDiscribe"];
  var projectStartTime = project["projectStartTime"];
  var tdData = [projectName, projectDiscribe, projectStartTime];
  for(var i = 0; i < 3; ++i){
    addProjectTd(tr, tdData[i]);
  }
  var operation = ["添加测试用例集","查看测试用例集","修改项目计划","删除项目计划"];
  addOperation(tr, operation);
  var tbody = document.getElementById("tbody-project");
  addChildNode(tbody, tr);
}

function addProjectTd(label, data){
  var td = document.createElement("td");
  td.innerHTML = data;
  addChildNode(label, td);
}

function addOperation(label, operation){
  var td = document.createElement("td");
  var div_1 = addDiv(td, "ticket-actions col-md-2");
  var div_2 = addDiv(div_1, "btn-group dropdown");
  addProjectButton(div_2);
  var div_3 = addDiv(div_2, "dropdown-menu");
  for(var i = 0; i < operation.length; ++i){
    var a = addProjectA(div_3, operation[i]);
    addProjectI(a,"fa fa-reply fa-fw");
  }
  addChildNode(label, td);
}

function addDiv(label, itClass){
  var div = document.createElement("div");
  div.setAttribute("class", itClass);
  addChildNode(label, div);
  return div;
}

function addProjectButton(label){
  var button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "btn btn-success dropdown-toggle btn-sm");
  button.setAttribute("data-toggle","dropdown");
  button.setAttribute("aria-haspopup","true");
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = "操作";
  addChildNode(label, button);
}

function addProjectA(label, data){
  var a = document.createElement("a");
  a.setAttribute("class", "dropdown-item");
  a.setAttribute("href", "#")
  a.innerHTML = data;
  addChildNode(label, a);
  return a;
}

function addProjectI(label, itClass){
  var i = document.createElement('i');
  i.setAttribute("class", itClass);
  addChildNode(label, i);
}
