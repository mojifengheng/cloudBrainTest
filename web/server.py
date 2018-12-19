from flask import Flask, render_template, request
import json
import os
import io

app = Flask(__name__)


@app.route('/', methods=["POST", "GET"])
def login():
    return render_template("index.html")


@app.route('/testsuit', methods=["POST", "GET"])
def testsuit():
    return render_template("testsuit.html")


@app.route('/testcase', methods=["POST", "GET"])
def testcase():
    return render_template("testcase.html")


@app.route('/project', methods=["POST", "GET"])
def project():
    return render_template("project.html")


@app.route('/checkForm', methods=["POST", "GET"])
def checkForm():
    username = request.form.get("username")
    password = request.form.get("password")
    cheak_flag = "False"
    with open("password.json", "r") as f:
        data = json.loads(f.read())
        if username in data.keys():
            if password == data[username]:
                cheak_flag = "True"
    return cheak_flag


@app.route("/getData", methods=["POST", "GET"])
def getData():
    userName = request.form.get("userName")
    fileName = "data/" + userName + ".json"
    with open(fileName, "r") as f:
        data = json.loads(f.read())
    return json.dumps(data)


@app.route("/setFormValueTestsuit", methods=["POST", "GET"])
def setFormValueTestsuit():
    returnFlag = "false"
    writeJson = {
        "suitName": None,
        "suitDiscribe": None,
        "suitLibrary": None,
        "suitSetup": None,
        "suitTeardown": None,
        "suitCreatTime": None,
        "case": None
    }
    for key in writeJson:
        writeJson[key] = request.form.get(key)
    fileName = request.form.get("userName") + ".json"
    if fileName in os.listdir("./data"):
        with open("data/"+fileName, "r") as f:
            fileJson = json.loads(f.read())
        for project in fileJson["project"]:
            if project["projectName"] == request.form.get("projectName"):
                # print(project["projectStartTime"])
                project["suit"].append(writeJson)
                returnFlag = "true"
        with open("data/" + fileName, "w") as f:
            json.dump(fileJson, f, indent=4, ensure_ascii=False)

    return returnFlag


@app.route("/removeTestsuit", methods=["POST", "GET"])
def removeTestsuit():
    removeSuccess = "false"
    urlData = {
        "userName": None,
        "projectName": None,
        "testsuitName": None,
        "testcaseName": None
    }
    for key in urlData:
        urlData[key] = request.form.get(key)
    fileName = "data/" + urlData["userName"] + ".json"
    with open(fileName, "r") as f:
        fileJson = json.loads(f.read())
    for project in fileJson["project"]:
        if project["projectName"] == urlData["projectName"]:
            for suit in project["suit"]:
                if suit["suitName"] == urlData["testsuitName"]:
                    # print(suit["suitName"])
                    project["suit"].remove(suit)
                    # print(len(project["suit"]))
                    removeSuccess = "true"
    with open(fileName, "w") as f:
        json.dump(fileJson, f, indent=4, ensure_ascii=False)
    return removeSuccess


if __name__ == "__main__":
    app.run(host='0.0.0.0',
            port='1817',
            debug=True)
