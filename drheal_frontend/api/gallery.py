import frappe

@frappe.whitelist(allow_guest=True)
def get_gallery_images():
    """
    Public API to fetch gallery images grouped by tags
    """
    records = frappe.get_all(
        "Gallery-Image-Drheal-App",
        filters={
            "is_active": 1
        },
        fields=[
            "name",
            "upload_image",
            "date"
        ],
        order_by="date desc"
    )

    response = {}
    all_tags = set()

    for row in records:
        # Get tags for each document
        tags = frappe.get_doc(
            "Gallery-Image-Drheal-App",
            row.name
        ).get_tags()

        if not tags:
            tags = ["All"]

        for tag in tags:
            all_tags.add(tag)

            if tag not in response:
                response[tag] = []

            if row.upload_image:
                response[tag].append(row.upload_image)

    return {
        "tags": sorted(list(all_tags)),
        "images_by_tag": response
    }
