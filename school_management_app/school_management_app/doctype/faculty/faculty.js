// Copyright (c) 2023, ad and contributors
// For license information, please see license.txt

frappe.ui.form.on('Faculty', {
    refresh: function(frm){
        frm.set_intro("USE CAPITAL LETTERS");
    },
    before_save: function(frm) {
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
        
        // Convert email to lowercase before saving
        if (frm.doc.email) {
            frm.doc.email = frm.doc.email.toLowerCase();
        }
    }
});


