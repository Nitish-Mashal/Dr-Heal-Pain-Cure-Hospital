import frappe

@frappe.whitelist(allow_guest=True)
def get_job_hirings(job_title=None):
    """
    Fetch Job Hiring records.
    - No parameter → return ALL
    - With parameter → return ONLY matching record
    """

    filters = {"disabled": 0} if frappe.db.has_column("Job Hiring", "disabled") else {}

    # If parameter exists → filter by name (or job_title if you prefer)
    if job_title:
        filters["job_title"] = job_title

    try:
        data = frappe.get_all(
            "Job Hiring",
            filters=filters,
            fields=[
                "name",
                "job_title",
                "job_type",
                "description",
                "qualification",
                "experience",
                "department",
                "schedule",
                "shift"
            ],
            order_by="modified desc"
        )

        return {
            "status": "success",
            "count": len(data),
            "data": data
        }

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Get Job Hiring API Error")
        return {
            "status": "error",
            "message": str(e)
        }


@frappe.whitelist(allow_guest=True)
def submit_job_application(
    first_name,
    email,
    job_opening,
    qualification,
    experience,
    contact_number,
    city,
    description=None
):
    try:
        resume_file = frappe.request.files.get("resume")
        file_url = None

        # Upload resume
        if resume_file:
            file_doc = frappe.get_doc({
                "doctype": "File",
                "file_name": resume_file.filename,
                "content": resume_file.read(),
                "is_private": 1
            })
            file_doc.insert(ignore_permissions=True)
            file_url = file_doc.file_url   # ✅ IMPORTANT

        # Create Job Application
        doc = frappe.get_doc({
            "doctype": "Job Application",
            "first_name": first_name,
            "email": email,
            "job_opening": job_opening,
            "qualification": qualification,
            "experience": experience,
            "contact_number": contact_number,
            "city": city,
            "description": description or "",   # ✅ typo fixed
            "resume": file_url                  # ✅ correct value
        })

        doc.insert(ignore_permissions=True)
        frappe.db.commit()

        return {
            "status": "success",
            "message": "Job application submitted successfully"
        }

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Submit Job Application API Error")
        return {
            "status": "error",
            "message": str(e)
        }
