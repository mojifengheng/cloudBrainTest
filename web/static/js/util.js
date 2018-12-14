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

function addOperation(label, operation, clickOperation){
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
    var aHrefUrl = clickOperation[i];
    var aAttribute = {"class":"dropdown-item", "href":aHrefUrl};
    var a = createHtmlLabel("a", aAttribute, operation[i]);
    addChildLabel(div3, a);

    var iAttribute = {"class": "fa fa-reply fa-fw"};
    var iLabel = createHtmlLabel("i", iAttribute);
    addChildLabel(div3, iLabel);
  }
  addChildLabel(div2, div3);
  addChildLabel(label, td);
}
