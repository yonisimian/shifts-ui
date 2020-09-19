from flask import Flask, render_template, url_for, request, jsonify
from tinydb import TinyDB, Query
import json
import time, datetime

# app declaration
app = Flask(__name__)

# DB config
db = TinyDB('db.json')


@app.route('/time')
def index():
    return {'time': time.time()}

@app.route('/block', methods=['GET', 'POST'])
def shift_blocks():
    if request.method == 'POST':
        pass
        #TODO: what happens when the user posts blocked shifts.

    else :
        pass
        #TODO: what happens when the user gets the page initially.

@app.route('/submitconstraints', methods=['GET', 'POST'])
def form_example():
    if request.method == 'POST':
        name = request.form.get('name')
        date = request.form.get('week')
        shifts = [request.form.get(f'shift-{i}') for i in range(0,21)]

        cons_table = db.table("Constraints")
        
        # TODO: check if the cons already exist. Maybe upsert func will serve me best here.
        # maybe search for the name and date and then upsert...
        inserted = cons_table.insert({"name":name, "date":date, "shifts":shifts})

        return jsonify(inserted)

@app.route('/allData')
def get_all_data():
    cons_table = db.table("Constraints")

    return cons_table.all()[len(cons_table) - 1]

@app.route('/empconstraints', methods=['GET', 'POST'])
def get_emp_constraints():
    if request.method == 'GET': # TODO(yoni the front man): Change to post to handle form post.

        name = 'גיא שמיליאן'
        # TODO(yoni the front man): Change to the next line for request handling:
        # name = request.form.get('name')
        
        cons_table = db.table("Constraints")
        user = Query()

        return ({'emp_constraints': cons_table.search(user.name == name)})

@app.route('/weekconstraints', methods=['GET', 'POST'])
def get_week_constraints():
    if request.method == 'GET': # TODO(yoni the front man): Change to post to handle form post.

        # Returns the current week num
        today = datetime.date.today().isocalendar()
        date_to_search = f'{today[0]}-W{today[1] + 1}'
        
        # TODO(yoni the front man): Change to the next line for request handling:
        # date_to_search = request.form.get('date')
        
        cons_table = db.table("Constraints")
        user = Query()
        
        return ({'week_constraints': cons_table.search(user.date == date_to_search)})

if __name__ == '__main__':
    app.run(debug=True)



#made by: Guy the back man 8-) (works from the back :))
