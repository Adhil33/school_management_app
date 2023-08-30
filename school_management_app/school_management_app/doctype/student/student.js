// Copyright (c) 2023, ad and contributors
// For license information, please see license.txt

frappe.ui.form.on('Student', {
    student_id: function(frm) {
        if (frm.doc.student_id) {
            frappe.call({
                method: 'frappe.client.get_value',
                args: {
                    doctype: 'Class',
                    filters: { student_id: frm.doc.student_id },
                    fieldname: ['class_name', 'class_teacher_name']
                },
                callback: function(response) {
                    if (response.message && response.message.class_name) {
                        frm.set_value('class_name', response.message.class_name);
                        frm.set_value('class_teacher', response.message.class_teacher_name);
                    } else {
                        frappe.msgprint('Class allocation is not done for this student ID');
                    }
                }
            });
        }
    }
});



