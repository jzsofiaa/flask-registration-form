from flask import render_template, redirect, url_for, request, jsonify, json
from app import app
import random


@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/registration')
def registration():
    return render_template('registration.html')

@app.route('/registration/result', methods=["GET", "POST"])
def result():
    if request.method == 'GET':
        return redirect(url_for('home'))

    req = request.get_json()

    with open("data.json", 'r') as f:
        data = json.load(f)

        userData = {
            "firstname": req['firstname'],
            "lastname": req['lastname'],
            "gender": req['gender'],
            "email": req['email'],
            "phonenumber": req['phonenumber'],
            "id": generate_id()
        }

        data.append(userData)

    write_data_to_json(data)

    return req

@app.route('/json_data')
def json_data():
    with open("data.json", 'r') as f:
        data = json.load(f)
    return jsonify(data)


def write_data_to_json(data):
    with open("data.json", 'w') as f:
        json.dump(data, f, indent = 2)


@app.route('/delete', methods=["POST"])
def delete():
    req = request.get_json()

    id = req['id']

    with open("data.json", 'r') as f:
        data = json.load(f)

        for element in data:
            if id == element['id']:
                print(element)
                data.remove(element)

    write_data_to_json(data)

    return req

def generate_id():
    return random.randint(1111,9999)

@app.route('/edit')
def edit():
    return render_template('edit.html')

@app.route('/edit/result', methods=["POST"])
def edit_result():
    req = request.get_json()

    userId = req['id']

    with open("data.json", 'r') as f:
        data = json.load(f)

        for element in data:
            if int(userId) == element['id']:
                print(element)
                element['firstname'] = req['firstname']
                element['lastname'] = req['lastname']
                element['gender'] = req['gender']
                element['phonenumber'] = req['phonenumber']
                element['email'] = req['email']

    write_data_to_json(data)

    return req
