from flask import Flask, render_template, url_for, request, jsonify
from tinydb import TinyDB, Query
import json
import time, datetime

# app declaration
app = Flask(__name__)

# DB config
db = TinyDB('db.json')

@app.route('/submitconstraints', methods=['GET', 'POST'])
def submit_constraints():
    
    '''
    Handles constraint submittion by the users.
    '''

    if request.method == 'POST':
        name = request.form.get('name')
        week = request.form.get('week')
        shifts = [request.form.get(f'shift-{i}') for i in range(0,21)]
        comments = request.form.get('comments')

        cons_table = db.table('Constraints')
        user = Query()
        
        inserted = cons_table.upsert({'name':name, 'week':week, 'shifts':shifts, 'comments':comments},
                   ((user.name == name) & (user.week == week)))

        # print(inserted)
        # TODO: check what does upsert returns.

        return ({'submitted data': inserted})

@app.route('/submitschedule', methods=['POST'])
def submit_schedule():

    '''
    Handles schedule submittion by the shift manager.
    '''

    if request.method == 'POST':

        schedules_table = db.table('Schedules')
        user = Query()

        week = request.form.get('week')

        shifts = [json.loads(request.form.get(f'shift-{i}')) for i in range(0,21)]
        # TODO: change to range(0,21)

        print(shifts)

        schedules_table.upsert({'week':week, 'shifts': shifts}, (user.week == week))

        return 'success'

@app.route('/allData')
def get_all_data():

    '''
    Returns all of the constraints and schedules.
    '''

    cons_table = db.table('Constraints')
    schedules_table = db.table('Schedules')
    # TODO: return the data ordered by date (newest to oldest)
    
    return ({'all_data' :
                {'Constraints' : cons_table.all(),
                 'Schedules' : schedules_table.all()}
            })

@app.route('/schedules', methods=['GET'])
def get_schedules():

    '''
    Returns all of the schedules.
    '''

    if request.method == 'GET':
        schedules_table = db.table('Schedules')

        return ({'schedules' : schedules_table.all()})

@app.route('/weekschedule', methods=['GET', 'POST'])
def get_week_schedule():
    
    '''
    Return the weekly schedule.
    '''

    if request.method == 'GET':
        week = request.values['week']

        schedules_table = db.table('Schedules')
        user = Query()

        return ({'Weekly schedule': schedules_table.search(user.week == week)})

@app.route('/empconstraints', methods=['GET', 'POST'])
def get_emp_constraints():

    '''
    Returns all of the constraints of a certain employee.
    '''

    if request.method == 'GET':

        name = request.values['name']
        
        cons_table = db.table('Constraints')
        user = Query()

        return ({'emp_constraints': cons_table.search(user.name == name)})

@app.route('/weekconstraints', methods=['GET', 'POST'])
def get_week_constraints():

    '''
    Returns all of the constraints at a certain week.
    '''

    if request.method == 'GET':

        week= request.values['week']
        
        cons_table = db.table('Constraints')
        user = Query()
        
        return ({'week_constraints': cons_table.search(user.week == week)})

@app.route('/empweekconstraints', methods=['GET', 'POST'])
def get_emp_week_constraints():

    '''
    Returns all of the constraints of a certain employee, at a certain week.
    '''

    if request.method == 'GET':
        name = request.values['name']
        week = request.values['week']

        cons_table = db.table('Constraints')
        user = Query()

        return (cons_table.search((user.name == name) & (user.week == week))[0])

@app.route('/addemployee', methods=['GET', 'POST'])
def add_employee():

    '''
    Adds a new employee to the DB.
    '''

    if request.method == 'POST':
        full_name = request.form.get('full_name')
        short_name = request.form.get('short_name')

        emps_table = db.table('Employees')
        user = Query()

        inserted = emps_table.upsert({'full_name': full_name, 'short_name': short_name},
                                     ((user.full_name == full_name) & (user.short_name == short_name)))

        return (inserted)

@app.route('/removeemployee', methods=['GET', 'POST'])
def remove_employee():

    '''
    Removes an employee from the DB.
    '''

    if request.method == 'POST':
        data = request.get_json()

        full_name = data['full_name']

        emps_table = db.table('Employees')
        user = Query()

        removed = emps_table.remove(user.full_name == full_name)

        return (removed)

@app.route('/getemployees', methods=['GET', 'POST'])
def get_emps():

    '''
    Returns all of the employees from the DB.
    '''

    if request.method == 'GET':
        emps_table = db.table('Employees')
        #return (emps_table.all()[0])
        return ({'all_emps': emps_table.all()})

if __name__ == '__main__':
    app.run(debug=True)

#made by: Guy the back man 8-) [works from the back :)]
