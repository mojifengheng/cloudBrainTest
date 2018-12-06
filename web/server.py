from flask import Flask, render_template, request
import json

app = Flask(__name__)


@app.route('/', methods=["POST", "GET"])
def login():
    return render_template("index.html")


@app.route('/homepage', methods=["POST", "GET"])
def homepage():
    return render_template("homepage.html")


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


if __name__ == "__main__":
    app.run(host='0.0.0.0',
            port='1817',
            debug=True)
