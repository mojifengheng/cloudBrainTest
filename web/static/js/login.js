function checkForm()
{
  var username = $("input[name='username']").val();
  var password = $("input[name='password']").val();
  //alert(username)
  //alert(password)
  $.ajax({
  //提交数据的类型 POST GET
    type:"POST",
  //提交的网址
    url:$SCRIPT_ROOT + "checkForm",
   //	url:$SCRIPT_ROOT + "Robot/" + p_from_aa + "/Start",
  //提交的数据
    data:{"username":username,"password":password},
  //返回数据的格式
    datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
  //在请求之前调用的函数
  //成功返回之后调用的函数
    success:function(data){
    },
  //调用执行后调用的函数
    complete: function(XMLHttpRequest, textStatus){
      text = XMLHttpRequest.responseText;
      if (text == "True"){
        window.location = "testsuit?userName=" + username;
      }
    },
  //调用出错执行的函数
    error: function(){
    //请求出错处理
    }
  });
}
