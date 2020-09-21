from flask import Flask, render_template, url_for, request, jsonify
from tinydb import TinyDB, Query
import json
import time, datetime

# app declaration
app = Flask(__name__)

# DB config
db = TinyDB('db.json')

@app.route('/submitconstraints', methods=['GET', 'POST'])
def form_example():
    if request.method == 'POST':
        name = request.form.get('name')
        date = request.form.get('week')
        shifts = [request.form.get(f'shift-{i}') for i in range(0,21)]
        comments = request.form.get('comments')

        cons_table = db.table('Constraints')
        user = Query()
        
        inserted = cons_table.upsert({"name":name, "date":date, "shifts":shifts, "comments":comments},
                   ((user.name == name) & (user.date == date)))

        # print(inserted)
        # TODO: check what does upsert returns.

        return ({'submitted data': inserted})

@app.route('/allData')
def get_all_data():
    cons_table = db.table('Constraints')
    # TODO: return the data ordered by date (newest to oldest)
    return ({'all_data' : cons_table.all()})
    #return cons_table.all()[len(cons_table) - 1]

@app.route('/empconstraints', methods=['GET', 'POST'])
def get_emp_constraints():
    if request.method == 'GET':

        name = request.values['name']
        
        cons_table = db.table('Constraints')
        user = Query()

        return ({'emp_constraints': cons_table.search(user.name == name)})

@app.route('/weekconstraints', methods=['GET', 'POST'])
def get_week_constraints():
    if request.method == 'GET':

        week_to_search = request.values['week']
        
        cons_table = db.table('Constraints')
        user = Query()
        
        return ({'week_constraints': cons_table.search(user.date == week_to_search)})

@app.route('/empweekconstraints', methods=['GET', 'POST'])
def get_emp_week_constraints():
    if request.method == 'GET':
        name = request.values['name']
        week = request.values['week']

        cons_table = db.table('Constraints')
        user = Query()

        return (cons_table.search((user.name == name) & (user.date == week))[0])

if __name__ == '__main__':
    app.run(debug=True)

#made by: Guy the back man 8-) (works from the back :))
