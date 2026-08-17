import frappe


@frappe.whitelist(allow_guest=True)
def get_companies():
    try:
        companies = frappe.get_all(
            "Company",
            fields=["name"],
            order_by="name asc"
        )

        return {
            "status": "success",
            "data": companies
        }

    except Exception as e:
        frappe.log_error(
            frappe.get_traceback(),
            "Get Companies API Error"
        )

        return {
            "status": "error",
            "message": str(e)
        }