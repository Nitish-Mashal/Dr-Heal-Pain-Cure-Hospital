import frappe
import json

@frappe.whitelist(allow_guest=True)
def submit_contact():
    frappe.local.flags.ignore_csrf = True

    try:
        data = json.loads(frappe.request.data or "{}")
    except Exception:
        return {"message": "Invalid JSON data"}

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    source = data.get("source")

    if not (name and email):
        return {"message": "Name and Email are required"}

    try:
        doc = frappe.get_doc({
            "doctype": "Contact Enquiry",
            "name1": name,
            "email": email,
            "phone_number": phone,
            "how_did_you_find_us": source
        })

        doc.insert(ignore_permissions=True)
        frappe.db.commit()

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Contact Enquiry API Error")
        return {"message": "Failed to save enquiry"}

    return {
        "message": "success",
        "success_message": "Thank you for reaching out to us, our faculty will connect with you shortly"
    }
