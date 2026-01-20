import frappe

@frappe.whitelist(allow_guest=True)
def get_our_facilities():
    """
    Guest API to fetch all active Facilities
    """

    facilities = frappe.get_all(
        "Facilities",
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
            "thumnail_image"   # ✅ corrected field name
        ],
        order_by="created_date desc"
    )

    return {
        "status": "success",
        "count": len(facilities),
        "data": facilities
    }
