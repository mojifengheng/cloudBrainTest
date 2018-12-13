function loadNav(urlData, userData){
  loadProjectInNav(urlData, userData);
}




// loadProjectInNav
function loadProjectInNav(urlData, userData){
  for(var i = 0; i < userData["project"].length; ++i){
    var userProject = userData["project"][i];
    addProjectToNav(urlData, userProject);
  }
}


// addProjectToNav : add one project to navigation
function addProjectToNav(urlData, userProject){
  // nav is just us li label
  addLiToProject(urlData, userProject);
}



function addLiToProject(urlData, userProject){
  var liAttribute = {"class" : "nav-item"};
  var liLabel = createHtmlLabel("li", liAttribute);

  var aHrefUrl = "testsuit?userName=" + urlData["urlUserName"] + "&projectName=" + userProject["projectName"];
  var aAttribute = {"class":"nav-link", "href":aHrefUrl};
  var aLabel = createHtmlLabel("a", aAttribute);
  addChildLabel(liLabel, aLabel);

  var iAttribute = {"class":"menu-icon mdi mdi-television"}
  var iLable = createHtmlLabel("i", iAttribute);
  addChildLabel(aLabel, iLable);

  var spanAttribute = {"class":"text-black"};
  if (urlData["urlProjectName"] == userProject["projectName"]){
    spanAttribute = {"class":"text-blue"}
  }
  var spanText = userProject["projectName"];
  var spanLabel = createHtmlLabel("span", spanAttribute, spanText);
  addChildLabel(aLabel, spanLabel);

  var ul = document.getElementById("ul-project");
  addChildLabel(ul, liLabel);
}


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
