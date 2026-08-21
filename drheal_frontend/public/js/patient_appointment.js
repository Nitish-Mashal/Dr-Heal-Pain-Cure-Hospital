/*
 * DrHeal Frontend
 * Patient Appointment - Custom Slot Availability
 *
 * IMPORTANT:
 * This file overrides the slot availability display from the custom app.
 * DO NOT modify the Healthcare app.
 */

(function () {

    "use strict";

    // -------------------------------------------------------------
    // Store the latest availability response
    // -------------------------------------------------------------

    let drheal_availability_response = null;


    // -------------------------------------------------------------
    // Helper:
    // Get all slot buttons from the availability dialog
    // -------------------------------------------------------------

    function get_slot_buttons() {

        let buttons = [];

        /*
         * The standard Healthcare Patient Appointment dialog
         * renders slot buttons inside the "available_slots" field.
         */

        $(".modal:visible").each(function () {

            let $modal = $(this);

            let $buttons = $modal
                .find('[data-fieldname="available_slots"]')
                .find("button");

            if ($buttons.length) {
                buttons = buttons.concat($buttons.toArray());
            }

        });

        return buttons;
    }


    // -------------------------------------------------------------
    // Update slot buttons using OUR backend values
    // -------------------------------------------------------------

    function update_slot_buttons(data) {

        if (
            !data ||
            !data.slot_details ||
            !Array.isArray(data.slot_details)
        ) {
            console.log(
                "[DrHeal] No slot_details returned from availability API"
            );
            return;
        }

        console.log(
            "[DrHeal] Custom availability response:",
            data
        );

        /*
         * Flatten all slots from all schedules.
         *
         * Example:
         *
         * 07:00 -> 30
         * 08:00 -> 29
         * 09:00 -> 30
         * 10:00 -> 19
         */

        let backend_slots = [];

        data.slot_details.forEach(function (slot_info) {

            if (
                !slot_info.avail_slot ||
                !Array.isArray(slot_info.avail_slot)
            ) {
                return;
            }

            slot_info.avail_slot.forEach(function (slot) {

                backend_slots.push({
                    slot_info: slot_info,
                    slot: slot
                });

            });

        });


        if (!backend_slots.length) {
            return;
        }


        // ---------------------------------------------------------
        // Wait until Healthcare's standard JS has rendered buttons
        // ---------------------------------------------------------

        setTimeout(function () {

            let buttons = get_slot_buttons();

            console.log(
                "[DrHeal] Slot buttons found:",
                buttons.length
            );

            console.log(
                "[DrHeal] Backend slots found:",
                backend_slots.length
            );


            if (!buttons.length) {
                return;
            }


            // -----------------------------------------------------
            // Match buttons by data-name where possible
            // -----------------------------------------------------

            backend_slots.forEach(function (item) {

                let slot = item.slot;
                let slot_info = item.slot_info;

                let from_time = String(
                    slot.from_time || ""
                );

                /*
                 * Frappe may render the time as:
                 *
                 * 07:00:00
                 *
                 * while data-name can contain:
                 *
                 * 07:00:00
                 *
                 * so compare normalized values.
                 */

                let normalized_from_time =
                    from_time.substring(0, 8);


                let $button = null;


                $(buttons).each(function () {

                    let $candidate = $(this);

                    let candidate_time =
                        String(
                            $candidate.attr("data-name") || ""
                        ).substring(0, 8);


                    if (
                        candidate_time ===
                        normalized_from_time
                    ) {

                        /*
                         * If this button was already processed
                         * for another schedule, don't reuse it.
                         */

                        if (
                            !$candidate.data(
                                "drheal-processed"
                            )
                        ) {

                            $button = $candidate;

                            $candidate.data(
                                "drheal-processed",
                                true
                            );

                            return false;
                        }

                    }

                });


                /*
                 * If matching by data-name failed,
                 * use the button position.
                 */

                if (!$button || !$button.length) {

                    let index =
                        backend_slots.indexOf(item);

                    if (
                        buttons[index] &&
                        !$(buttons[index]).data(
                            "drheal-processed"
                        )
                    ) {

                        $button =
                            $(buttons[index]);

                        $button.data(
                            "drheal-processed",
                            true
                        );
                    }
                }


                if (!$button || !$button.length) {
                    return;
                }


                // -------------------------------------------------
                // Maximum appointments
                // -------------------------------------------------

                let maximum =
                    parseInt(
                        slot.maximum_appointments || 0
                    );


                if (maximum > 0) {

                    let booked =
                        parseInt(
                            slot.booked_count || 0
                        );

                    let available =
                        parseInt(
                            slot.available_count
                        );


                    if (isNaN(available)) {

                        available =
                            Math.max(
                                maximum - booked,
                                0
                            );
                    }


                    let is_full =
                        available <= 0;


                    // ---------------------------------------------
                    // Set disabled state
                    // ---------------------------------------------

                    if (is_full) {

                        $button
                            .prop("disabled", true)
                            .attr(
                                "disabled",
                                "disabled"
                            );

                    } else {

                        $button
                            .prop("disabled", false)
                            .removeAttr("disabled");

                    }


                    // ---------------------------------------------
                    // Find existing badge
                    // ---------------------------------------------

                    let $badge =
                        $button.find(".badge");


                    let count_text =
                        available > 0
                            ? String(available)
                            : __("Full");


                    let badge_class =
                        available > 0
                            ? "badge-success"
                            : "badge-danger";


                    // ---------------------------------------------
                    // Update badge
                    // ---------------------------------------------

                    if ($badge.length) {

                        $badge
                            .removeClass(
                                "badge-success badge-danger"
                            )
                            .addClass(badge_class)
                            .text(count_text);

                    } else {

                        $button.append(
                            `
                            <br>
                            <span class="badge ${badge_class}">
                                ${count_text}
                            </span>
                            `
                        );

                    }


                    // ---------------------------------------------
                    // Tooltip
                    // ---------------------------------------------

                    $button.attr(
                        "title",
                        `${Math.max(available, 0)} ${__("slots available for booking")}`
                    );


                    /*
                     * Store our values on the button.
                     * This is useful for debugging.
                     */

                    $button.attr(
                        "data-drheal-booked-count",
                        booked
                    );

                    $button.attr(
                        "data-drheal-available-count",
                        available
                    );

                    $button.attr(
                        "data-drheal-maximum",
                        maximum
                    );


                    console.log(
                        "[DrHeal] Slot:",
                        from_time,
                        "Maximum:",
                        maximum,
                        "Booked:",
                        booked,
                        "Available:",
                        available,
                        "Full:",
                        is_full
                    );

                }

            });


            // -----------------------------------------------------
            // Remove processing flag
            // -----------------------------------------------------

            $(buttons).removeData(
                "drheal-processed"
            );


        }, 100);

    }


    // -------------------------------------------------------------
    // Intercept frappe.call
    // -------------------------------------------------------------
    //
    // We DO NOT replace the Healthcare function.
    //
    // We simply observe the response from:
    //
    // healthcare....get_availability_data
    //
    // After Healthcare renders its buttons, we replace the
    // displayed counts with the values returned by our custom API.
    //
    // -------------------------------------------------------------

    if (
        typeof frappe !== "undefined" &&
        typeof frappe.call === "function"
    ) {

        const original_frappe_call =
            frappe.call;


        frappe.call = function () {

            let args = arguments[0];

            let is_availability_call = false;


            // -----------------------------------------------------
            // Detect the Healthcare availability API
            // -----------------------------------------------------

            if (
                args &&
                typeof args === "object"
            ) {

                let method =
                    args.method || "";


                if (
                    method ===
                    "healthcare.healthcare.doctype.patient_appointment.patient_appointment.get_availability_data"
                ) {

                    is_availability_call = true;

                    console.log(
                        "[DrHeal] Intercepted Patient Appointment availability call"
                    );

                }

            }


            // -----------------------------------------------------
            // No availability call:
            // execute normally
            // -----------------------------------------------------

            if (!is_availability_call) {

                return original_frappe_call.apply(
                    this,
                    arguments
                );

            }


            // -----------------------------------------------------
            // Save original callback
            // -----------------------------------------------------

            let original_callback =
                args.callback;


            // -----------------------------------------------------
            // Replace callback temporarily
            // -----------------------------------------------------

            args.callback = function (r) {

                /*
                 * Save OUR backend response.
                 */

                if (
                    r &&
                    r.message
                ) {

                    drheal_availability_response =
                        r.message;

                }


                /*
                 * IMPORTANT:
                 *
                 * First allow Healthcare's standard JS
                 * to render the popup.
                 */

                if (
                    typeof original_callback ===
                    "function"
                ) {

                    original_callback.apply(
                        this,
                        arguments
                    );

                }


                /*
                 * Then correct the displayed slot
                 * availability using our custom API.
                 */

                if (
                    r &&
                    r.message
                ) {

                    update_slot_buttons(
                        r.message
                    );

                }

            };


            return original_frappe_call.apply(
                this,
                arguments
            );

        };

    }


    // -------------------------------------------------------------
    // Extra safety:
    // If dialog takes longer to render, update again.
    // -------------------------------------------------------------

    $(document).on(
        "shown.bs.modal",
        ".modal",
        function () {

            if (
                drheal_availability_response
            ) {

                setTimeout(function () {

                    update_slot_buttons(
                        drheal_availability_response
                    );

                }, 300);

            }

        }
    );


    console.log(
        "[DrHeal] Custom Patient Appointment availability JS loaded"
    );

})();