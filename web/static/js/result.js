function loadAllInResult(){
    var urlData = getUrlData();
    var userData = getUserData(urlData["urlUserName"]);
    loadNav(urlData, userData);
    loadResult(urlData);
}

function loadResult(urlData){
    // alert(urlData["urlUserName"]) zhangzhi
    // alert(urlData["urlProjectName"]) "康复信息软件测试"
    // alert(urlData["urlTestsuitName"]) “软件注册登陆”
    // alert(urlData["urlTestcaseName"]) “软件注册”
    var testResultData = getTestResultData(urlData);
    alert(testResultData["testsuitDoc"])
}