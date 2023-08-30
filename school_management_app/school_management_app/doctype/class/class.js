// Copyright (c) 2023, ad and contributors
// For license information, please see license.txt

frappe.ui.form.on('Class', {
    class_name: function(frm) {
        if (frm.doc.class_name) {
            frappe.call({
                method: 'frappe.client.get_value',
                args: {
                    doctype: 'Faculty',
                    filters: { class_allocated: frm.doc.class_name },
                    fieldname: 'full_name1'
                },
                callback: function(response) {
                    if (response.message && response.message.full_name1) {
                        frm.set_value('class_teacher_name', response.message.full_name1);
                        frm.set_value('subjects_offered', getSubjectsOffered(frm.doc.class_name));
                    } else {
                        frappe.msgprint('The class teacher has not been decided yet.\nNavigate to Faculty and appoint a class teacher.');
                    }
                }
            });
        }
    },
  
    on_submit: function(frm) {
        frappe.msgprint("Class Allocated");
    } 
});

function getSubjectsOffered(class_name) {
    switch (class_name) {
        case '+1 Science':
            return `<pre>Physics\nChemistry\nMathematics\nEnglish\nComputer Science</pre>`;
        case '+1 Humanities':
            return `<pre>History\nGeography\nEconomics\nPolitical Science\nSociology\nPsychology</pre>`;
        case '+1 Commerce':
            return `<pre>Accountancy\nBusiness Studies\nEconomics\nMathematics</pre>`;
        default:
            return '';
    }
}




        


