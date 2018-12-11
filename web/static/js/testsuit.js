function loadAll(){
  getUrlData();
  getUserData(userName);
  loadProject(userName, project);
  loadTestsuit(project);
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

function loadProject(userName, project){
  if (project == null){
    project = userData["project"][0]["projectName"];
  }
  for(var i = 0; i < userData["project"].length; ++i){
    //alert(data["project"][i]["projectName"]);
    var projectName = userData["project"][i]["projectName"];
    addLi(projectName, userName, project);
  }

}

function addLi(projectName, userName, project){
    var li_1=document.createElement("li");
    li_1.setAttribute("class","nav-item");
    d_a = addProjectA(li_1, projectName, userName);
    addI(d_a);
    addSpan(d_a,projectName, project);
    document.getElementById("ul-project").appendChild(li_1);
}

function addProjectA(label, projectName, userName){
  var a = document.createElement("a");
  a.setAttribute("class", "nav-link");
  var projectUrl = "testsuit?userName=" + userName + "&projectName=" + projectName;
  a.setAttribute("href", projectUrl);
  label.appendChild(a);
  return a;
}

function addI(label){
  var i = document.createElement("i");
  i.setAttribute("class", "menu-icon mdi mdi-television");
  label.appendChild(i);
}

function addSpan(label,projectName, project){
    var span_1 = document.createElement("span");
    span_1.setAttribute("class","text-black");
    if (project == projectName){
      span_1.setAttribute("class","text-blue");
    }
    span_1.innerHTML=projectName;
    label.appendChild(span_1);
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

function loadTestsuit(project){
  if (project == null){
    project = userData["project"][0]["projectName"];
  }
  for(var i = 0; i < userData["project"].length; ++i){
    var projectName = userData["project"][i]["projectName"];
    if (project == projectName){
      var allSuit = userData["project"][i]["suit"]
      for(var j = 0; j < allSuit.length; ++j){
        var suit = allSuit[j];
        addSuitTr(suit);
      }
    }
  }
}

function addSuitTr(suit){
  var tr = document.createElement("tr");
  var tdData = [suit["suitName"], suit["suitDiscribe"], suit["suitCreatTime"]];
  for(var i = 0; i < 3; ++i){
    addSuitTd(tr, tdData[i]);
  }
  var operation = ["添加测试用例", "执行测试用例集", "修改测试用例集", "删除测试用例集"];
  addOperation(tr, operation);
  document.getElementById("tbody-suit").appendChild(tr);
}

function addSuitTd(label, data){
  var td = document.createElement("td");
  td.innerHTML = data;
  label.appendChild(td);
}

function addOperation(label, operation){
  var td = document.createElement("td");
  var div_1 = addDiv(td, "ticket-actions col-md-2");
  var div_2 = addDiv(div_1, "btn-group dropdown");
  addSuitButton(div_2);
  var div_3 = addDiv(div_2, "dropdown-menu");
  for(var i = 0; i < operation.length; ++i){
    var a = addSuitA(div_3, operation[i]);
    addSuitI(a,"fa fa-reply fa-fw");
  }
  label.appendChild(td);
}

function addDiv(label, itClass){
  var div = document.createElement("div");
  div.setAttribute("class", itClass);
  label.appendChild(div);
  return div;
}

function addSuitButton(label){
  var button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "btn btn-success dropdown-toggle btn-sm");
  button.setAttribute("data-toggle","dropdown");
  button.setAttribute("aria-haspopup","true");
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = "操作";
  label.appendChild(button);
}

function addSuitA(label, data){
  var a = document.createElement("a");
  a.setAttribute("class", "dropdown-item");
  a.setAttribute("href", "#")
  a.innerHTML = data;
  label.appendChild(a);
  return a;
}

function addSuitI(label, itClass){
  var i = document.createElement('i');
  i.setAttribute("class", itClass);
  label.appendChild(i);
}
