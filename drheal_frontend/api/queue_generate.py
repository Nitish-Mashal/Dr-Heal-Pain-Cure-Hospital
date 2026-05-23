import frappe
from frappe.utils import cint


@frappe.whitelist()
def generate_queue_number(appointment):

    appointment_doc = frappe.get_doc(
        "Patient Appointment",
        appointment
    )

    # Already Generated
    if appointment_doc.custom_queue_number:
        return appointment_doc.custom_queue_number

    if not appointment_doc.practitioner:
        frappe.throw("Practitioner is mandatory")

    # Get Queue Master
    master_name = frappe.db.get_value(
        "Practitioner Queue Master",
        {
            "practitioner": appointment_doc.practitioner
        }
    )

    if not master_name:
        frappe.throw(
            f"Queue Master not found for Practitioner: "
            f"{appointment_doc.practitioner}"
        )

    master = frappe.get_doc(
        "Practitioner Queue Master",
        master_name
    )

    # Generate Queue Number
    if not master.current_queue_number:
        queue_no = cint(master.queue_start_number)
    else:
        queue_no = cint(master.current_queue_number) + 1

    # Update Appointment
    appointment_doc.custom_queue_number = queue_no

    appointment_doc.custom_queue_generated = 1

    appointment_doc.save(ignore_permissions=True)

    # Update Master
    master.current_queue_number = queue_no

    master.save(ignore_permissions=True)

    frappe.db.commit()

    return queue_no