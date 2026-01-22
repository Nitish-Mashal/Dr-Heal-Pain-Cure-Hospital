import frappe

@frappe.whitelist(allow_guest=True)
def get_our_services():
    """
    Guest API to fetch all active Our Services
    """

    services = frappe.get_all(
        "Our Services",
        filters={
            "is_active": 1
        },
        fields=[
            "name1",
            "description",
            "url",
            "created_date",
            "meta_title",
            "meta_keyword",
            "meta_description",
            "thumnail_image"
        ],
        order_by="created_date desc"
    )

    return {
        "status": "success",
        "count": len(services),
        "data": services
    }
