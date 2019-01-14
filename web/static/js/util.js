//util getHtmlLabel: get Html Label With attribute
function createHtmlLabel(label, labelAttributeDict, text=null){
  var label = document.createElement(label);
  for(var key in labelAttributeDict){
    label.setAttribute(key, labelAttributeDict[key]);
  }
  if (text != null){
    label.innerHTML = text;
  }
  return label;
}


//util addChildLabel: add childLabel to fatherLabel
function addChildLabel(fatherLabel, childLabel){
  fatherLabel.appendChild(childLabel)
}

function addOperation(label, operation, clickOperation, itName=null){
  var td = createHtmlLabel("td", null, null);
  var div1Attribute = {"class":"ticket-actions col-md-2"};
  var div1 = createHtmlLabel("div", div1Attribute);
  addChildLabel(td, div1);

  var div2Attribute = {"class":"btn-group dropdown"};
  var div2 = createHtmlLabel("div", div2Attribute);
  addChildLabel(div1, div2);

  var buttonAttribute = {
    "type":"button",
    "class":"btn btn-success dropdown-toggle btn-sm",
    "data-toggle":"dropdown",
    "aria-haspopup":"true",
    "aria-expanded":"false"
  };
  var buttonText = "操作";
  var button = createHtmlLabel("button", buttonAttribute, buttonText);
  addChildLabel(div2, button);


  var div3Attribute = {"class":"dropdown-menu"}
  var div3 = createHtmlLabel("div", div3Attribute);

  for(var i = 0; i < operation.length; ++i){
    var eachClickOperation = clickOperation[i];
    var aAttribute = {"class":"dropdown-item", "onclick":eachClickOperation, "name": itName};
    var a = createHtmlLabel("a", aAttribute, operation[i]);
    addChildLabel(div3, a);

    var iAttribute = {"class": "fa fa-reply fa-fw"};
    var iLabel = createHtmlLabel("i", iAttribute);
    addChildLabel(div3, iLabel);
  }
  addChildLabel(div2, div3);
  addChildLabel(label, td);
}

// find data from file by using clickData

function findDataFromFile(type, userData, clickData){
  var returnData = null;
  if(type == "project"){
    returnData = findProjectFromFile(userData, clickData);
  } else if (type == "testsuit"){
    returnData = findTestsuitFromFile(userData, clickData);
  } else if (type == "testcase"){
    returnData = findTestcaseFromFile(userData, clickData);
  } else {

  }
  return returnData;
}

function findProjectFromFile(userData, clickData){
  var returnProject = null;
  for(var i = 0; i < userData["project"].length; ++i){
    var project = userData["project"][i];
    if (project["projectName"] == clickData["projectName"]){
      returnProject = project;
    }
  }
  return returnProject;
}

function findTestsuitFromFile(userData, clickData){
  var returnSuit = null;
  var project = findProjectFromFile(userData, clickData);
  for(var i = 0; i < project["suit"].length; ++i){
    var suit = project["suit"][i];
    if (suit["suitName"] == clickData["testsuitName"]){
      returnSuit = suit;
    }
  }
  return returnSuit;
}

function findTestcaseFromFile(userData, clickData){
  var returnCase = null;
  var suit = findTestsuitFromFile(userData, clickData);
  for(var i = 0; i < suit["case"].length; ++i){
    var testcase = suit["case"][i];
    if (testcase["caseName"] == clickData["testcaseName"]){
      returnCase = testcase;
    }
  }
  return returnCase;
}



// set value from click data to form by id 
function setValueToForm(ids, values){
  for(var i = 0; i < ids.length; ++i){
    document.getElementById(ids[i]).value = values[ids[i]];
  }
}

function setValueToText(id, value){
  var obj = document.getElementById(id);
  obj.innerHTML = value;
}
