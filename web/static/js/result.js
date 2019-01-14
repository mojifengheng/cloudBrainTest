function loadAllInResult(){
    var urlData = getUrlData();
    var userData = getUserData(urlData["urlUserName"]);
    loadNav(urlData, userData);
    loadResult(urlData);
}

function loadResult(urlData){
    // alert(urlData["urlTestsuitName"]) “软件注册登陆”
    // alert(urlData["urlTestcaseName"]) “软件注册”
    var testResultData = getTestResultData(urlData);
    // alert(testResultData["testsuitDoc"])
    loadSummaryResult(testResultData);
    loadDetailResult(testResultData);

}

function loadSummaryResult(testResultData){
    summaryResultKey = ["testsuitName", "testsuitStatus", "testsuitDoc", "testsuitStartTime", "testsuitEndTime"];
    for(var i = 0; i < summaryResultKey.length; ++i){
        setValueToText(summaryResultKey[i], testResultData[summaryResultKey[i]]);
    }
}

function loadDetailResult(testResultData){
    var tbody = document.getElementById("tbody-result");
    var testcases = testResultData["testcase"];
    for(var i = 0; i < testcases.length; ++i){
        // alert(testcases[i]["testcaseName"]);
        addTestcaseToTable(tbody, testcases[i]);
    }
}

function addTestcaseToTable(tbody, testcase){
    addTestcaseHeader(tbody, testcase);
    for(var i = 0; i < testcase["step"].length; ++i){
        var step = testcase["step"][i];
        addTestcaseStep(tbody, step);
    }
}

function addTestcaseStep(tbody, step){
    var tr = createHtmlLabel("tr", null, null);
    var tdKey = ["keywordName", "keywordStatus"];
    addNullTd(tr);
    for(var i = 0; i < tdKey.length; ++i){
        if (tdKey[i] == "keywordName"){
            var tdText = step["keywordName"];
            var td = createHtmlLabel("td", null, tdText);
            addChildLabel(tr, td)
        } else {
            var td = createHtmlLabel("td", null, null);
            var labelAttribute = null;
            if (step[tdKey[i]] == "PASS"){                
                labelAttribute = {
                    "class":"badge badge-success"
                }
            } else {
                labelAttribute = {"class" : "badge badge-danger"}
            }
            var label = createHtmlLabel("label", labelAttribute, step[tdKey[i]]);
            addChildLabel(td, label);
            addChildLabel(tr, td);
        }
    }
    addChildLabel(tbody, tr);
}

function addNullTd(tr){
    var td = createHtmlLabel("td", null, null);
    addChildLabel(tr, td);
}


function addTestcaseHeader(tbody, testcase){
    var tr = createHtmlLabel("tr", null, null);
    var tdKey = ["testcaseName", "step", "testcaseStatus"];
    for(var i = 0; i < tdKey.length; ++i){
        if (tdKey[i] == "testcaseName"){
            var tdText = testcase[tdKey[i]];
            var td = createHtmlLabel("td", null, tdText);
            addChildLabel(tr, td);
        } else if (tdKey[i] == "step") {
            var td = createHtmlLabel("td", null, null);
            addChildLabel(tr, td);
        } else {
            var td = createHtmlLabel("td", null, null);
            var labelAttribute = null;
            if (testcase[tdKey[i]] == "PASS"){                
                labelAttribute = {
                    "class":"badge badge-success"
                }
            } else {
                labelAttribute = {"class" : "badge badge-danger"}
            }
            var label = createHtmlLabel("label", labelAttribute, testcase[tdKey[i]]);
            addChildLabel(td, label);
            addChildLabel(tr, td);
        }
    }
    addChildLabel(tbody, tr);
}