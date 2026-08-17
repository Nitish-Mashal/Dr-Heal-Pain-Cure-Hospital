import frappe, json

# ✅ Get all Medical Departments
@frappe.whitelist(allow_guest=True)
def get_departments():
    try:
        departments = frappe.get_all(
            "Medical Department",
            fields=["name", "department"]
        )
        return {"status": "success", "data": departments}
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "get_departments API Error")
        return {"status": "error", "message": str(e)}

# ✅ Get Practitioners by Department
import frappe


@frappe.whitelist(allow_guest=True)
def get_practitioners(department=None, hospital=None, doctor_group=None):
    try:

        filters = {
            "custom_online_visibility": "Yes"
        }

        # Filter by department
        if department:
            filters["department"] = department

        # Filter by selected company / hospital
        if hospital:
            filters["hospital"] = hospital

        # Filter by doctor group
        if doctor_group:
            filters["first_name"] = doctor_group

        print("Doctor Filters:", filters)

        doctors = frappe.get_all(
            "Healthcare Practitioner",
            filters=filters,
            fields=[
                "name",
                "first_name",
                "last_name",
                "designation",
                "hospital",
                "department",
                "custom_online_visibility"
            ],
            order_by="first_name asc"
        )

        print("Doctors:", doctors)

        return {
            "status": "success",
            "data": doctors
        }

    except Exception as e:

        frappe.log_error(
            frappe.get_traceback(),
            "get_practitioners API Error"
        )

        return {
            "status": "error",
            "message": str(e)
        }
# ✅ Get Appointment Types by Department (and hide specific type for a doctor)
import frappe


@frappe.whitelist(allow_guest=True)
def get_appointment_types(practitioner=None):
    try:

        appointment_types = frappe.get_all(
            "Appointment Type",
            fields=[
                "name",
                "appointment_type",
                "custom_doctor_group"
            ],
            order_by="name asc"
        )

        # Hide ONLY "1st Appointment" for this particular doctor
        if practitioner == "HLC-PRAC-2026-00001":
            appointment_types = [
                a for a in appointment_types
                if a.get("appointment_type") != "1st Appointment"
            ]

        return {
            "status": "success",
            "data": appointment_types
        }

    except Exception:
        frappe.log_error(
            frappe.get_traceback(),
            "get_appointment_types API Error"
        )

        return {
            "status": "error",
            "message": "Unable to fetch appointment types"
        }
import frappe
from frappe.utils import getdate, get_time


@frappe.whitelist(allow_guest=True)
def get_doctor_schedule(practitioner, appointment_date=None):

    if not practitioner:
        return []

    practitioner_doc = frappe.get_doc(
        "Healthcare Practitioner",
        practitioner
    )

    slots = []

    # ==================================================
    # CASE 1: NO DATE
    # Used only to generate available dates
    # ==================================================
    if not appointment_date:

        for row in practitioner_doc.practitioner_schedules:

            if not row.schedule:
                continue

            schedule_doc = frappe.get_doc(
                "Practitioner Schedule",
                row.schedule
            )

            if schedule_doc.disabled:
                continue

            for slot in schedule_doc.time_slots:

                if not slot.day:
                    continue

                if not slot.from_time or not slot.to_time:
                    continue

                from_time = get_time(slot.from_time)
                to_time = get_time(slot.to_time)

                slots.append({
                    "day": slot.day,
                    "from_time": str(from_time),
                    "to_time": str(to_time),
                    "time_label": (
                        f"{from_time.strftime('%H:%M')} - "
                        f"{to_time.strftime('%H:%M')}"
                    ),

                    # Per-slot capacity
                    "maximum_appointments": (
                        slot.maximum_appointments or 0
                    )
                })

        return slots

    # ==================================================
    # CASE 2: DATE PROVIDED
    # Return slots + remaining capacity
    # ==================================================

    appointment_date = getdate(appointment_date)
    day_name = appointment_date.strftime("%A")

    for row in practitioner_doc.practitioner_schedules:

        if not row.schedule:
            continue

        schedule_doc = frappe.get_doc(
            "Practitioner Schedule",
            row.schedule
        )

        if schedule_doc.disabled:
            continue

        for slot in schedule_doc.time_slots:

            if slot.day != day_name:
                continue

            if not slot.from_time or not slot.to_time:
                continue

            from_time = get_time(slot.from_time)
            to_time = get_time(slot.to_time)

            # ------------------------------------------
            # Maximum appointments configured
            # for THIS particular time slot
            # ------------------------------------------
            maximum_appointments = int(
                slot.maximum_appointments or 0
            )

            # ------------------------------------------
            # Count booked appointments for this slot
            # ------------------------------------------
            booked_count = frappe.db.count(
                "Patient Appointment",
                {
                    "practitioner": practitioner,
                    "appointment_date": appointment_date,
                    "appointment_time": from_time,
                    "status": ["not in", ["Cancelled"]]
                }
            )

            # ------------------------------------------
            # Calculate remaining availability
            # ------------------------------------------
            if maximum_appointments > 0:

                available_count = max(
                    maximum_appointments - booked_count,
                    0
                )

            else:

                # If no capacity is configured,
                # treat it as one appointment allowed
                available_count = 0 if booked_count else 1

            # ------------------------------------------
            # Full / unavailable
            # ------------------------------------------
            booked = available_count <= 0

            slots.append({
                "appointment_date": str(appointment_date),
                "day": day_name,

                "from_time": str(from_time),
                "to_time": str(to_time),

                "time_label": (
                    f"{from_time.strftime('%H:%M')} - "
                    f"{to_time.strftime('%H:%M')}"
                ),

                # Capacity configured in Practitioner Schedule
                "maximum_appointments": maximum_appointments,

                # Already booked
                "booked_count": booked_count,

                # Remaining capacity
                "available_count": available_count,

                # Full when remaining = 0
                "booked": booked
            })

    slots.sort(key=lambda x: x["from_time"])

    return slots

import frappe
import json
from datetime import datetime


def get_or_create_patient(name, phone, email, gender, age):
    """
    Create Patient if not exists based on mobile number.
    """

    patient = frappe.db.get_value(
        "Patient",
        {"mobile": phone},
        "name"
    )

    if patient:
        return patient

    patient_doc = frappe.get_doc({
        "doctype": "Patient",
        "first_name": name,
        "patient_name": name,
        "mobile": phone,
        "email": email,
        "sex": gender,
        "age": age
    })

    patient_doc.insert(ignore_permissions=True)
    frappe.db.commit()

    return patient_doc.name


@frappe.whitelist(allow_guest=True)
def create_appointment():
    """Create Patient Appointment from Website (Guest Allowed)"""

    try:
        # ---------------------------------------------------
        # 1. Read Incoming Data
        # ---------------------------------------------------
        data = frappe.local.form_dict

        if isinstance(data, str):
            data = json.loads(data)

        patient_name = data.get("name1")
        email = data.get("email")
        gender = data.get("gender")
        phone = data.get("phone")
        age = data.get("age")

        practitioner = data.get("practitioner")
        department = data.get("department")
        appointment_type = data.get("appointment_type")
        appointment_date = data.get("appointment_date")
        appointment_time = data.get("appointment_time")
        notes = data.get("notes", "")
        token_no = data.get("token_no")

        custom_location = data.get("custom_location")
        custom_branch = data.get("custom_branch")
        custom_time_slots = data.get("custom_time_slots")

        alternative_phone_number = data.get(
            "alternative_phone_number"
        )

        whatsapp_number = (
            1
            if str(data.get("whatsapp_number")).lower()
            in ["1", "true", "yes"]
            else 0
        )

        custom_booking_type = "Online"

        # ---------------------------------------------------
        # 2. Validate Required Fields
        # ---------------------------------------------------
        if not all([
            patient_name,
            phone,
            practitioner,
            appointment_date,
            appointment_time,
            appointment_type
        ]):
            frappe.throw("Missing required appointment details")

        # ---------------------------------------------------
        # 3. Parse Appointment Time
        # ---------------------------------------------------
        if "-" in appointment_time:
            appointment_time = appointment_time.split("-")[0].strip()

        try:
            start_time = datetime.strptime(
                appointment_time,
                "%H:%M:%S"
            ).time()

        except ValueError:
            start_time = datetime.strptime(
                appointment_time,
                "%H:%M"
            ).time()

        # ---------------------------------------------------
        # 4. Find Existing Patient
        # ---------------------------------------------------
        existing_patient = frappe.db.get_value(
            "Patient",
            {"mobile": phone},
            ["name", "patient_name"],
            as_dict=True
        )

        patient = None

        if existing_patient:
            existing_patient_name = (
                existing_patient.patient_name or ""
            ).strip().lower()

            if existing_patient_name == patient_name.strip().lower():
                patient = existing_patient.name

        # ---------------------------------------------------
        # 5. Prevent Duplicate Appointment
        # ---------------------------------------------------
        if patient:

            duplicate = frappe.db.exists(
                "Patient Appointment",
                {
                    "patient": patient,
                    "practitioner": practitioner,
                    "appointment_date": appointment_date,
                    "status": [
                        "not in",
                        ["Cancelled", "No Show"]
                    ]
                }
            )

            if duplicate:

                practitioner_doc = frappe.get_doc(
                    "Healthcare Practitioner",
                    practitioner
                )

                doctor_name = (
                    practitioner_doc.first_name
                    or practitioner_doc.practitioner_name
                    or "Doctor"
                )

                frappe.throw(
                    f"You already have an appointment with "
                    f"Dr. {doctor_name} on this date."
                )

        # ---------------------------------------------------
        # 6. Prevent Same Doctor + Date + Time Slot
        # ---------------------------------------------------
        overlap = frappe.db.exists(
            "Patient Appointment",
            {
                "practitioner": practitioner,
                "appointment_date": appointment_date,
                "appointment_time": start_time,
                "status": [
                    "not in",
                    ["Cancelled", "No Show"]
                ]
            }
        )

        if overlap:

            practitioner_doc = frappe.get_doc(
                "Healthcare Practitioner",
                practitioner
            )

            doctor_name = (
                practitioner_doc.first_name
                or practitioner_doc.practitioner_name
                or "Doctor"
            )

            frappe.throw(
                f"Selected time slot is already booked "
                f"with Dr. {doctor_name}"
            )

        # ---------------------------------------------------
        # 7. Create Patient If Not Exists
        # ---------------------------------------------------
        if not patient:

            patient_doc = frappe.get_doc({
                "doctype": "Patient",
                "first_name": patient_name,
                "patient_name": patient_name,
                "mobile": phone,
                "email": email,
                "sex": gender,
                "age": age
            })

            patient_doc.insert(
                ignore_permissions=True
            )

            patient = patient_doc.name

        # ---------------------------------------------------
        # 8. Create Patient Appointment
        # ---------------------------------------------------
        appointment = frappe.get_doc({
            "doctype": "Patient Appointment",

            "appointment_for": "Practitioner",

            "patient": patient,

            "appointment_type": appointment_type,

            "appointment_date": appointment_date,

            "appointment_time": start_time,

            "practitioner": practitioner,

            "department": department,

            "notes": notes,

            "token_no": token_no,

            "custom_location": custom_location,

            # ✅ NEW FIELD
            "custom_branch": custom_branch,

            # ✅ NEW FIELD
            "custom_time_slots": custom_time_slots,

            "phone_number": phone,

            "alternative_phone_number":
                alternative_phone_number,

            "whatsapp_number": whatsapp_number,

            "custom_booking_type": custom_booking_type
        })

        appointment.insert(
            ignore_permissions=True
        )

        frappe.db.commit()

        # ---------------------------------------------------
        # 9. Response
        # ---------------------------------------------------
        return {
            "status": "success",

            "appointment_id": appointment.name,

            "appointment_date":
                str(appointment.appointment_date),

            "appointment_time":
                str(appointment.appointment_time),

            "patient": patient,

            "token_no":
                appointment.token_no,

            "practitioner":
                practitioner,

            "custom_branch":
                appointment.custom_branch,

            "custom_time_slots":
                appointment.custom_time_slots,

            "alternative_phone_number":
                appointment.alternative_phone_number,

            "whatsapp_number":
                appointment.whatsapp_number
        }

    except Exception as e:

        frappe.log_error(
            frappe.get_traceback(),
            "Create Appointment API Error"
        )

        return {
            "status": "error",
            "message": str(e)
        }