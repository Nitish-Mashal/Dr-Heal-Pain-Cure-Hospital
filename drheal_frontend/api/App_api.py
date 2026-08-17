import frappe


@frappe.whitelist(allow_guest=True)
def get_doctors():
    """
    Returns all Healthcare Practitioners who are visible on the website.
    """

    doctors = frappe.get_all(
        "Healthcare Practitioner",
        filters={
            "custom_online_visibility": "Yes"
        },
        fields=[
            "name",
            "first_name",
            "last_name",
            "department",
            "hospital",
            "image",
            "custom_linkedin",
            "custom_facebook",
            "custom_twitter",
            "order_by",
            "custom_online_visibility"
        ],
        order_by="order_by asc"
    )

    return doctors


@frappe.whitelist(allow_guest=True)
def get_doctor(id):
    """
    Returns detailed information for a single website-visible doctor.
    """

    doctor = frappe.get_all(
        "Healthcare Practitioner",
        filters={
            "name": id,
            "custom_online_visibility": "Yes"
        },
        fields=[
            "name",
            "first_name",
            "last_name",
            "department",
            "hospital",
            "image",
            "custom_linkedin",
            "custom_facebook",
            "custom_twitter",
            "custom_working_at",
            "custom_experience",
            "custom_joining_date",
            "op_consulting_charge",
            "custom_degree",
            "custom_online_visibility"
        ],
        limit_page_length=1
    )

    if not doctor:
        frappe.throw(
            "Doctor not found or doctor is not visible online",
            frappe.DoesNotExistError
        )

    return doctor[0]