import frappe

@frappe.whitelist(allow_guest=True)
def get_our_facilities():
    """
    Guest API to fetch all active Facilities
    Ordered by order_by_sequence (ascending)
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
            "thumnail_image",
            "order_by_sequence"   # include sequence field
        ],
        order_by="order_by_sequence asc"
    )

    return {
        "status": "success",
        "count": len(facilities),
        "data": facilities
    }
