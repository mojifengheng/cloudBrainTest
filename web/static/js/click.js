

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

function clickChangeProject(e){
  var name = getClickLabelName(e);
  var userData = getUserData(name["userName"]);
  for(var i = 0; i < userData["project"].length; ++i){
    if (userData["project"][i]["projectName"] == name["projectName"]){
      var project = userData["project"][i];
      var ids = ["projectName","projectDiscribe","projectType","projectStartTime","projectEndTime","projectManager","projectDeveloper","projectTester"];
      for(var j = 0; j < ids.length; ++j){
        setFormValue(ids[j], project[ids[j]]);
      }
    }
  }
}

function clickChangeTestsuit(e){
  var name = getClickLabelName(e);
  var userData = getUserData(name["userName"]);
  for(var i = 0; i < userData["project"].length; ++i){
    if (userData["project"][i]["projectName"] == name["projectName"]){
      var suits = userData["project"][i]["suit"];
      for(var j = 0; j < suits.length; ++j){
        if (suits[j]["suitName"] == name["testsuitName"]){
          var suit = suits[j];
          var ids = ["suitName","suitDiscribe","suitLibrary","suitSetup","suitTeardown","suitCreatTime"];
          for(var k = 0; k < ids.length; ++k){
            setFormValue(ids[k], suit[ids[k]]);
          }
        }
      }
    }
  }
}

function clickChangeTestcase(e){
  var name = getClickLabelName(e);
  var userData = getUserData(name["userName"]);
  for(var i = 0; i < userData["project"].length; ++i){
    if (userData["project"][i]["projectName"] == name["projectName"]){
      var project = userData["project"][i];
      for(var j = 0; j < project["suit"].length; ++j){
        if(project["suit"][j]["suitName"] == name["testsuitName"]){
          var suit = project["suit"][j];
          for(var k = 0; k < suit["case"].length; ++k){
            if(suit["case"][k]["caseName"] == name["testcaseName"]){
              var testcase = suit["case"][k];
              var ids = ["caseName","caseDiscribe","casePriority","casePrifix","caseStep","caseExpectResult","caseCreateTime"];
              for(var t = 0; t < ids.length; ++t){
                setFormValue(ids[t], testcase[ids[t]]);
              }
            }
          }
        }
      }
    }
  }
}

function setFormValue(formId, value){
  var obj = document.getElementById(formId);
  obj.setAttribute("value", value);
}


function getClickLabelName(e){
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
