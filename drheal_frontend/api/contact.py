@frappe.whitelist(allow_guest=True)
def submit_contact():
    frappe.local.flags.ignore_csrf = True

    try:
        data = json.loads(frappe.request.data or '{}')
    except Exception:
        return {"message": "Invalid JSON data"}

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    source = data.get("source")

    if not (name and email):
        return {"message": "Name and Email are required"}

  
    try:
        send_direct_email(
            to_email="wequantumberg@gmail.com",
            sender=email,
            subject=f"New Contact Form Submission from {name}",
            html_message=f"""
                <b>Name:</b> {name}<br>
                <b>Email:</b> {email}<br>
                <b>Phone:</b> {phone or '-'}<br>
                <b>How did you find us:</b> {source or '-'}
            """,
        )
    except Exception as e:
        return {"message": f"Email sending failed: {str(e)}"}

    return {"message": "success"}
