function clickNewProject(){
  if (userName == null){
    getUrlData();
  }
  var projectUrl = "project?userName=" + userName;
  window.location.href = projectUrl;
}

function loadAllInProject(){
  getUrlData();
  getUserData(userName);
  loadProject(userName, project);
  loadProjectInTable();
}

function getUrlData(){
  userName = null;
  project = null;
  try{
    userName = decodeURI(document.URL.split('?')[1].split("&")[0].split('=')[1]);
    project = decodeURI(document.URL.split('?')[1].split("&")[1].split('=')[1]);
  } catch(err){
  }
}

function getUserData(userName){
  var subUrl = "getData";
  var postData = {"userName":userName}
  userData = JSON.parse(ajax_fun(subUrl, postData));
}

function addChildNode(father, child){
  father.appendChild(child);
}

function loadProject(userName){

  for(var i = 0; i < userData["project"].length; ++i){
    //alert(data["project"][i]["projectName"]);
    var projectName = userData["project"][i]["projectName"];
    addLi(projectName, userName);
  }

}

function addLi(projectName, userName){
    var li_1=document.createElement("li");
    li_1.setAttribute("class","nav-item");
    d_a = addA(li_1, projectName, userName);
    addI(d_a);
    addSpan(d_a,projectName);
    var ul = document.getElementById("ul-project");
    addChildNode(ul, li_1);
}

function addA(label, projectName, userName){
  var a = document.createElement("a");
  a.setAttribute("class", "nav-link");
  var projectUrl = "testsuit?userName=" + userName + "&projectName=" + projectName;
  a.setAttribute("href", projectUrl);
  addChildNode(label, a);
  return a;
}

function addI(label){
  var i = document.createElement("i");
  i.setAttribute("class", "menu-icon mdi mdi-television");
  addChildNode(label, i);
}

function addSpan(label,projectName){
    var span_1 = document.createElement("span");
    span_1.setAttribute("class","text-black");
    span_1.innerHTML=projectName;
    addChildNode(label, span_1);
}

function ajax_fun(subUrl, postData){
  var returnText;
  $.ajax({
  //提交数据的类型 POST GET
    type:"POST",
  //提交的网址
    url:$SCRIPT_ROOT + subUrl,
   //	url:$SCRIPT_ROOT + "Robot/" + p_from_aa + "/Start",
  //提交的数据
    data:postData,
  //返回数据的格式
    datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
  //在请求之前调用的函数
  //成功返回之后调用的函数
    async:false,
    success:function(data){
    },
  //调用执行后调用的函数
    complete: function(XMLHttpRequest, textStatus){
      returnText = XMLHttpRequest.responseText;
    },
  //调用出错执行的函数
    error: function(){
    //请求出错处理
    }
  });
  return returnText;
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
