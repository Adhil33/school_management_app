# Copyright (c) 2023, ad and contributors
# For license information, please see license.txt

import frappe
from frappe import _, msgprint

def execute(filters=None):
    if not filters:
        filters = {}

    data, columns = [], []

    columns = get_columns()
    student_data = get_student_data(filters)

    if not student_data:
        msgprint(_('No records found'))
        return columns, student_data

    data = []
    for d in student_data:
        row = frappe._dict({
            'id': d.name,
            'student_id': d.student_id,
            'class_teacher': d.class_teacher,
            'class_name': d.class_name
        })
        data.append(row)

    chart = get_chart_data(data)
    return columns, data, None, chart

def get_columns():
    return [
        {
            'fieldname': 'id',
            'label': _('ID'),
            'fieldtype': 'Link',
            'options': 'Student',
            'width': '100'
        },
        {
            'fieldname': 'student_id',
            'label': _('Student ID'),
            'fieldtype': 'Data',
            'width': '150'
        },
        {
            'fieldname': 'class_teacher',
            'label': _('Class Teacher'),
            'fieldtype': 'Link',
            'options': 'Faculty',
            'width': '150'
        },
        {
            'fieldname': 'class_name',
            'label': _('Class Name'),
            'fieldtype': 'Data',
            'width': '150'
        }
    ]

def get_student_data(filters):
    conditions = get_conditions(filters)
    data = frappe.get_all(
        doctype='Student',
        fields=['name', 'student_id', 'class_teacher', 'class_name'],
        filters=conditions
    )
    return data

def get_conditions(filters):
    conditions = {}
    for key, value in filters.items():
        if filters.get(key):
            conditions[key] = value

    return conditions

def get_chart_data(data):
    if not data:
        return None

    class_name_data = {}
    labels = []
    datasets = []

    for entry in data:
        class_name = entry.class_name
        if class_name not in class_name_data:
            class_name_data[class_name] = 1
            labels.append(class_name)
        else:
            class_name_data[class_name] += 1

    dataset_values = list(class_name_data.values())
    datasets.append({
        'name': 'Class Name',
        'values': dataset_values
    })

    chart = {
        'data': {
            'labels': labels,
            'datasets': datasets
        },
        'type': 'pie',
        'height': 300,
    }

    return chart

