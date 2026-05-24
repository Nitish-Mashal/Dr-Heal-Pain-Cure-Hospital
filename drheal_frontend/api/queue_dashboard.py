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

        # CURRENT CHECKED-IN PATIENT
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

        # NEXT OPEN PATIENT
        if (
            appt.status == "Open"
            and not queue_map[pr]["next"]
        ):

            queue_map[pr]["next"] = {
                "token": appt.custom_queue_number,
                "appointment_id": appt.name,
                "patient": appt.patient,
                "patient_name": appt.patient_name
            }

    if not queue_map:
        return []

    # GET PRACTITIONER NAMES
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



@frappe.whitelist(allow_guest=True)
def get_practitioners():

    practitioners = frappe.get_all(
        "Healthcare Practitioner",
        filters={
            "status": "Active",
            "custom_online_visibility": "Yes"
        },
        fields=[
            "name",
            "practitioner_name"
        ],
        order_by="practitioner_name asc"
    )

    return practitioners