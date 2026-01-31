import frappe

@frappe.whitelist(allow_guest=True)
def get_banner_images():
    banners = frappe.get_all(
        "Banner Image",
        filters={
            "is_active": 1
        },
        fields=[
            "name",
            "name1",
            "date",
            "order_by_sequence",
            "upload_image"
        ],
        order_by="order_by_sequence asc"
    )

    return {
        "status": "success",
        "count": len(banners),
        "data": banners
    }
