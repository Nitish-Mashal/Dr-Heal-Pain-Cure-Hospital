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
            "upload_image",
            "link",
            "external_site"
        ],
        order_by="order_by_sequence asc"
    )

    # Optional: normalize external_site to boolean
    for b in banners:
        b["external_site"] = 1 if str(b.get("external_site")).lower() in ["yes", "1"] else 0

    return {
        "status": "success",
        "count": len(banners),
        "data": banners
    }
