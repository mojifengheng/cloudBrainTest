from flask import Flask, render_template, request
import json

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


if __name__ == "__main__":
    app.run(host='0.0.0.0',
            port='1817',
            debug=True)
