import frappe
import json

@frappe.whitelist(allow_guest=True)
def submit_contact():
    try:
        data = json.loads(frappe.request.data)
    except Exception:
        return {"message": "Invalid JSON data"}, 400

    # Extract fields
    name = data.get("name")
    email = data.get("email")
    subject = data.get("subject")
    message = data.get("message")

    # Basic validation
    if not (name and email and message):
        return {"message": "Name, Email, and Message are required"}, 400

    # Send email
    frappe.sendmail(
        recipients=["wequantumberg@gmail.com"],   # 👈 Your recipient
        sender=email,
        subject=subject or f"New Contact Form Submission from {name}",
        message=f"""
            <b>Name:</b> {name}<br>
            <b>Email:</b> {email}<br>
            <b>Subject:</b> {subject or '-'}<br>
            <b>Message:</b><br>{message}
        """
    )

    return {"message": "Message submitted successfully"}
