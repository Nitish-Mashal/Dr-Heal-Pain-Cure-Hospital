import frappe
from frappe.utils import today


@frappe.whitelist(allow_guest=True)
def get_practitioner_queue():
    today_date = today()

    appointments = frappe.get_all(
        "Patient Appointment",
        filters={
            "appointment_date": today_date,
            "status": ["in", ["Checked In", "Open"]]
        },
        fields=[
            "practitioner",
            "status",
            "token_no"
        ],
        order_by="practitioner asc, token_no asc"
    )

    queue_map = {}

    #  queue per practitioner
    for appt in appointments:
        pr = appt.practitioner
        if not pr:
            continue

        if pr not in queue_map:
            queue_map[pr] = {
                "practitioner_id": pr,
                "practitioner_name": None,
                "current_token": None,
                "next_token": None
            }

        # CURRENT TOKEN Checked In
        if appt.status == "Checked In" and not queue_map[pr]["current_token"]:
            queue_map[pr]["current_token"] = appt.token_no

        # NEXT TOKEN  Open
        if appt.status == "Open" and not queue_map[pr]["next_token"]:
            queue_map[pr]["next_token"] = appt.token_no

    #  Fetch Healthcare Practitioner names
    practitioner_ids = list(queue_map.keys())

    if practitioner_ids:
        practitioners = frappe.get_all(
            "Healthcare Practitioner",
            filters={"name": ["in", practitioner_ids]},
            fields=["name", "practitioner_name"]
        )

        name_map = {p.name: p.practitioner_name for p in practitioners}

        for pr in queue_map:
            queue_map[pr]["practitioner_name"] = name_map.get(pr)

    #  Return all practitioners who have at least one token
    result = [
        data for data in queue_map.values()
        if data["current_token"] or data["next_token"]
    ]

    return result