function loadAll(){
  loadProject();
}

function loadProject(){
  var subUrl = "getData";
  var postData = {"userName":"zhangzhi"}
  var data = JSON.parse(ajax_fun(subUrl, postData));
  for(var i = 0; i < data["project"].length; ++i){
    //alert(data["project"][i]["projectName"]);
    var projectName = data["project"][i]["projectName"];
    addLi(projectName);
  }

}

function addLi(projectName){
    var li_1=document.createElement("li");
    li_1.setAttribute("class","nav-item");
    d_a = addA(li_1);
    addI(d_a);
    addSpan(d_a,projectName);
    document.getElementById("ul-project").appendChild(li_1);
}

function addA(label){
  var a = document.createElement("a");
  a.setAttribute("class", "nav-link");
  a.setAttribute("href", "testcase");
  label.appendChild(a);
  return a;
}

function addI(label){
  var i = document.createElement("i");
  i.setAttribute("class", "menu-icon mdi mdi-television");
  label.appendChild(i);
}

function addSpan(label,text){
    var span_1 = document.createElement("span");
    span_1.setAttribute("class","menu-title")
    span_1.innerHTML=text;
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
