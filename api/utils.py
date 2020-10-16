def count_8_8(shifts):
    short_rest_shifts = {}

    for i in [1,2,4,5,7,8,10,11,13,14,16,17]:
        if shifts[i]:
            for emp in shifts[i]:
                if shifts[i+2]:
                    for emp_2 in shifts[i+2]:
                        if emp['value'] == emp_2['value']:
                            if emp['value'] not in short_rest_shifts.keys():
                                short_rest_shifts[f'{emp["value"]}'] = 1
                            else:
                                short_rest_shifts[f'{emp["value"]}'] += 1

    return short_rest_shifts

def count_specials(shifts):
    specials = {}

    for i in [2,5,8,11,14,16,17,18,19,20]:
        if shifts[i]:
            for emp in shifts[i]:
                if emp['value'] not in specials.keys():
                    specials[f'{emp["value"]}'] = 1
                else:
                    specials[f'{emp["value"]}'] += 1

    return specials

def count_statistics(shifts):
    short_rest_shifts = {}
    specials = {}
    shift_counts = {}

    for i in range(21):
        # Counting 8-8
        if i in [1,2,4,5,7,8,10,11,13,14,16,17]:
            if shifts[i]:
                for emp in shifts[i]:
                    if shifts[i+2]:
                        for emp_2 in shifts[i+2]:
                            if emp['value'] == emp_2['value']:
                                if emp['value'] not in short_rest_shifts.keys():
                                    short_rest_shifts[f'{emp["value"]}'] = 1
                                else:
                                    short_rest_shifts[f'{emp["value"]}'] += 1
        
        # Counting specials
        if i in [2,5,8,11,14,16,17,18,19,20]:
            if shifts[i]:
                for emp in shifts[i]:
                    if emp['value'] not in specials.keys():
                        specials[f'{emp["value"]}'] = 1
                    else:
                        specials[f'{emp["value"]}'] += 1

        # Counting shifts per employee
        if shifts[i]:
            for emp in shifts[i]:
                if emp['value'] not in shift_counts.keys():
                    shift_counts[f'{emp["value"]}'] = 1
                else:
                    shift_counts[f'{emp["value"]}'] += 1

    return {'Statistics': {
        'shift_counts': shift_counts,
        'specials': specials,
        'short_rest_shifts': short_rest_shifts
    }}

# TODO: count the stats per week
def calc_statistics_start_to_end(shifts_list):

    for shifts in shifts_list:
        pass
