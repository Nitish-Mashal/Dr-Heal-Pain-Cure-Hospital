import frappe

@frappe.whitelist(allow_guest=True)
def get_gallery_images():
    """
    Public API to fetch latest gallery images
    """
    gallery = frappe.get_all(
        "Gallery-Image-Drheal-App",
        fields=[
            "first_image",
            "second_image",
            "third_image",
            "fourth_image",
            "fifth_image",
            "sixth_image"
        ],
        order_by="creation desc",
        limit_page_length=1
    )

    if gallery:
        return gallery[0]

    return {}
