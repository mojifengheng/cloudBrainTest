function getUrlData(){
  var urlUserName = null;
  var urlProjectName = null;
  try{
    urlUserName = decodeURI(document.URL.split('?')[1].split("&")[0].split('=')[1]);
    urlProjectName = decodeURI(document.URL.split('?')[1].split("&")[1].split('=')[1]);
  } catch(err){
    //TODO：here we should do something or report log
  }
  var urlData = {
    "urlUserName":urlUserName,
    "urlProjectName":urlProjectName
  };
  return urlData;
}


//getUserData : post userName to server and get user'Data from json
function getUserData(userName){
  var subUrl = "getData";
  var postData = {"userName":userName}
  var userData = JSON.parse(ajax_fun(subUrl, postData));
  return userData
}


// jquery-ajax : for communication with server
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
