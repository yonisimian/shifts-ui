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