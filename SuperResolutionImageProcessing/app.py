# -*- coding: utf-8 -*-

from flask import Flask, Response
import os
import torch

app = Flask(__name__)
app.config.from_object(__name__)


def root_dir():
    return os.path.abspath(os.path.dirname(__file__))


def get_file(file_name: str) -> str:
    try:
        src = os.path.join(root_dir(), file_name)
        return open(src, encoding="utf-8").read()
    except IOError as e:
        return str(e)


@app.route("/static/<path:path>", methods=['GET'])
def get_static_file(filename: str):
    return open(filename, "rb").read()


@app.route("/proc/<path:path>", methods=['POST'])
def proc_img(img: str):
    pass


@app.route("/", methods=['GET'])
def index():
    content = get_file("index.html")
    return Response(content, mimetype="text/html")


if __name__ == "__main__":
    app.run()
