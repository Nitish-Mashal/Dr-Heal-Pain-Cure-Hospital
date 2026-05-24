import frappe
from frappe.utils import today


@frappe.whitelist(allow_guest=True)
def get_practitioner_queue(practitioner=None):

    today_date = today()

    filters = {
        "appointment_date": today_date,
        "status": ["in", ["Checked In", "Open"]],
        "custom_queue_number": [">", 0]
    }

    if practitioner:
        filters["practitioner"] = practitioner

    appointments = frappe.get_all(
        "Patient Appointment",
        filters=filters,
        fields=[
            "name",
            "practitioner",
            "status",
            "patient",
            "patient_name",
            "custom_queue_number"
        ],
        order_by="custom_queue_number asc"
    )

    queue_map = {}

    # FIND CURRENT
    for appt in appointments:

        pr = appt.practitioner

        if not pr:
            continue

        if pr not in queue_map:

            queue_map[pr] = {
                "practitioner_id": pr,
                "practitioner_name": None,
                "current": None,
                "next": None
            }

        if (
            appt.status == "Checked In"
            and not queue_map[pr]["current"]
        ):

            queue_map[pr]["current"] = {
                "token": appt.custom_queue_number,
                "appointment_id": appt.name,
                "patient": appt.patient,
                "patient_name": appt.patient_name
            }

    # FIND NEXT GREATER QUEUE
    for appt in appointments:

        pr = appt.practitioner

        if pr not in queue_map:
            continue

        current = queue_map[pr]["current"]

        if not current:
            continue

        current_queue = current["token"]

        if (
            appt.status == "Open"
            and appt.custom_queue_number > current_queue
        ):

            queue_map[pr]["next"] = {
                "token": appt.custom_queue_number,
                "appointment_id": appt.name,
                "patient": appt.patient,
                "patient_name": appt.patient_name
            }

            break

    if not queue_map:
        return []

    practitioners = frappe.get_all(
        "Healthcare Practitioner",
        filters={
            "name": ["in", list(queue_map.keys())]
        },
        fields=[
            "name",
            "practitioner_name"
        ]
    )

    name_map = {
        p.name: p.practitioner_name
        for p in practitioners
    }

    result = []

    for pr, data in queue_map.items():

        result.append({
            "practitioner_id": pr,
            "practitioner_name": name_map.get(pr),
            "current": data["current"],
            "next": data["next"]
        })

    return result