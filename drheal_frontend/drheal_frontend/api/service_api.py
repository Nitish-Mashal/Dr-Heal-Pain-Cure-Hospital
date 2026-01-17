import frappe

@frappe.whitelist(allow_guest=True)
def get_services():
    """
    Returns a list of all Medical Departments with basic info
    """
    try:
        departments = frappe.get_all(
            "Medical Department",
            fields=["department", "custom_description", "custom_image", "custom_tagline"]
        )
        return departments
    except Exception as e:
        frappe.log_error(message=str(e), title="get_services API Error")
        return []

@frappe.whitelist(allow_guest=True)
def get_service(department):
    """
    Returns a single Medical Department by name
    """
    try:
        service = frappe.get_all(
            "Medical Department",
            filters={"department": department},
            fields=["department", "custom_description", "custom_image", "custom_tagline"],
            limit=1
        )
        if service:
            return service[0]
        # Fallback if department not found
        return {
            "department": department,
            "custom_description": "No information available",
            "custom_image": "",
            "custom_tagline": ""
        }
    except Exception as e:
        frappe.log_error(message=str(e), title="get_service API Error")
        return {
            "department": department,
            "custom_description": "No information available",
            "custom_image": "",
            "custom_tagline": ""
        }
