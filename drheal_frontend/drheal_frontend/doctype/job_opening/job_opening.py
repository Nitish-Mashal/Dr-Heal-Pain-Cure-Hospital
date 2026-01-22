# Copyright (c) 2026, Nitish and contributors
# For license information, please see license.txt

# import frappe
from hrms.hr.doctype.job_opening.job_opening import JobOpening as HRMSJobOpening
import frappe

class JobOpening(HRMSJobOpening):

    def validate(self):
        # Override route generation safely
        if hasattr(self, "company") and self.company:
            self.route = f"jobs/{frappe.scrub(self.company)}/{frappe.scrub(self.job_title).replace('_','-')}"
        else:
            self.route = f"jobs/{frappe.scrub(self.job_title).replace('_','-')}"

    def update_job_requisition_status(self):
        # Override to avoid error if status/job_requisition not present
        if hasattr(self, "status") and hasattr(self, "job_requisition"):
            if self.status == "Closed" and self.job_requisition:
                # your logic here
                pass
