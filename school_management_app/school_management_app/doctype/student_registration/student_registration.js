// Copyright (c) 2023, ad and contributors
// For license information, please see license.txt

frappe.ui.form.on('Student Registration', {
    refresh: function(frm) {
        if (frm.is_new()) {
            frm.set_intro("Use Capital Letters To Fill Up The Registration");
        }

        frm.add_custom_button('Class Allocation', () => {
            // Check if class is already allocated
            frappe.call({
                method: 'frappe.client.get_value',
                args: {
                    doctype: 'Class',
                    filters: { student_id: frm.doc.name },
                    fieldname: 'name'
                },
                callback: function(response) {
                    if (response.message && response.message.name) {
                        frappe.msgprint('Class already allocated for this student');
                    } else {
                        frappe.new_doc('Class', { 'student_id': frm.doc.name });
                    }
                }
            });
        });

        frm.add_custom_button('Go To Student View', () => {
            frappe.new_doc('Student', { 'student_id': frm.doc.name });
        });
    },
    on_submit: function(frm) {
        frappe.msgprint("Registration Successful!");
    },
    after_save: function(frm) {
        // Convert email to lowercase after saving
        frappe.db.set_value('Student Registration', frm.doc.name, 'email', frm.doc.email.toLowerCase());
    },

    validate: function(frm) {
        var emailPattern = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var mobilePattern = /^\d*(?:\.\d{1,2})?$/;
        
        if (frm.doc.email && !emailPattern.test(frm.doc.email)) {
            frappe.msgprint('Enter a valid email address');
            frappe.validated = false;
        }

        if (frm.doc.contact_number && !mobilePattern.test(frm.doc.contact_number)) {
            frappe.msgprint('Enter a valid mobile number');
            frappe.validated = false;
        }
    }
});



  
 


