# -*- coding: utf-8 -*-

from flask import Flask, request, session, url_for, redirect, jsonify, render_template
import os, re, json, hashlib, datetime

app = Flask(__name__)
app.debug = True
app.secret_key = "KALILA-CC"

account_path = "./static/account.json"


def make_sure_account():
    if not os.path.exists(account_path):
        with open(account_path, "w", encoding="utf-8") as f:
            f.write(str({}))
    else:
        with open(account_path, "r+", encoding="utf-8") as f:
            f.seek(2)
            if f.tell() == 0:
                f.seek(0)
                f.write(str({}))


@app.route("/")
def root():
    return redirect(url_for("index"))


@app.route("/index.html")
def index():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()


@app.route("/static/<filename>")
def get_file(filename):
    return app.send_static_file(filename)


@app.route("/login", methods=["POST"])
def login():
    make_sure_account()
    usr, pwd = request.form["usr"], request.form["pwd"]
    with open(account_path, "r+", encoding="utf-8") as f:
        account = json.load(f)
        if usr not in account:
            return jsonify({
                "errCode": 1,
                "errMsg": "用户名不存在，请重试",
            })
        submitted_pwd = hashlib.md5(pwd.encode("utf-8")).hexdigest()
        if submitted_pwd != account[usr]:
            return jsonify({
                "errCode": 2,
                "errMsg": "密码错误，请重试",
            })
    session.clear()
    session[usr] = usr
    session.permanent = True
    app.permanent_session_lifetime = datetime.timedelta(minutes=1)
    return jsonify({
        "errCode": 0,
        "errMsg": "登录成功",
    })


@app.route("/user/<username>")
def user(username):
    auth = username in session
    return render_template("user.html", username=username, auth=auth)


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template("register.html")
    elif request.method == "POST":
        make_sure_account()
        minlength, maxlength = 6, 14
        usr, pwd = request.form["usr"], request.form["pwd"]
        if not minlength <= len(usr) <= maxlength:
            return jsonify({
                "errCode": 1,
                "errMsg": f"用户名长度需要在 {minlength} 与 {maxlength} 之间"
            })
        if not minlength <= len(pwd) <= maxlength:
            return jsonify({
                "errCode": 2,
                "errMsg": f"密码长度需要在 {minlength} 与 {maxlength} 之间"
            })
        if not re.search(r"^[\w|\-]+$", usr):
            return jsonify({
                "errCode": 3,
                "errMsg": "用户名不能包含特殊字符"
            })
        if not re.search(r"^[\w|\-]+$", pwd):
            return jsonify({
                "errCode": 4,
                "errMsg": "密码不能包含特殊字符"
            })
        with open(account_path, "r+", encoding="utf-8") as f:
            account = json.load(f)
            if usr in account:
                return jsonify({
                    "errCode": 5,
                    "errMsg": "用户名已存在，请重试"
                })
            account[usr] = hashlib.md5(pwd.encode("utf-8")).hexdigest()
            f.seek(0)
            json.dump(account, f)
        return jsonify({
            "errCode": 0,
            "errMsg": "注册成功"
        })
    return ""
