

function clickNewProject(){
  var urlData = getUrlData();
  var projectUrl = "project?userName=" + urlData["urlUserName"];
  window.location.href = projectUrl;
}

function clickAddTestcase(e){
  var name = getClickLabelName(e);
  var urlHref = "testcase?userName=" + name["userName"] + "&project=" + name["projectName"] + "&testsuit=" + name["testsuitName"];
  window.location.href = urlHref;
}

function clickAddTestsuit(e){
  var name = getClickLabelName(e);
  var urlHref = "testsuit?userName=" + name["userName"] + "&project=" + name["projectName"];
  window.location.href = urlHref;
}


function getClickLabelName(e){
  var labelNameDict = {
    "userName" : null,
    "projectName" : null,
    "testsuitName" : null
  }
  var name = $(e).attr("name").split("_");
  try{
    labelNameDict["userName"] = name[0];
    labelNameDict["projectName"] = name[1];
    labelNameDict["testsuitName"] = name[2];
  } catch(err){

  }
  return labelNameDict;
}
