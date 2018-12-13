function loadAllInTestSuit(){
  var urlData = getUrlData();
  var userData = getUserData(urlData["urlUserName"]);
  loadNav(urlData, userData);
  //loadTestsuit(project);
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
  var tbody = document.getElementById("tbody-suit");
  addChildNode(tbody, tr);
}

function addSuitTd(label, data){
  var td = document.createElement("td");
  td.innerHTML = data;
  addChildNode(label, td);
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
  addChildNode(label, td);
}

function addDiv(label, itClass){
  var div = document.createElement("div");
  div.setAttribute("class", itClass);
  addChildNode(label, div);
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
  addChildNode(label, button);
}

function addSuitA(label, data){
  var a = document.createElement("a");
  a.setAttribute("class", "dropdown-item");
  a.setAttribute("href", "#")
  a.innerHTML = data;
  addChildNode(label, a);
  return a;
}

function addSuitI(label, itClass){
  var i = document.createElement('i');
  i.setAttribute("class", itClass);
  addChildNode(label, i);
}
