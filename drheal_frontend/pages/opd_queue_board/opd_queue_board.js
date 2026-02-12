frappe.pages['opd_queue_board'].on_page_load = function (wrapper) {

    $('<style>').html(`
    header.navbar,
    .page-head,
    .layout-side-section {
        display: none !important;
    }
    .layout-main-section,
    .page-content {
        padding: 0 !important;
    }
`).appendTo('head');


    /* ------------------------------
       Helper: Date & Time
    ------------------------------ */
    function getCurrentDateTime() {
        const now = new Date();

        const date = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        return { date, time };
    }

    const page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'OPD Token Display',
        single_column: true
    });

    /* ------------------------------
       Doctor Filter
    ------------------------------ */
    const filter_section = $(`
        <div style="
            display:flex;
            justify-content:space-between;
            align-items:flex-end;
            margin-bottom:24px;
            padding:16px;
            border:1px solid #f0abfc;
            border-radius:12px;
        ">
            <div>
                <label style="font-weight:600;">Doctor</label>
                <select class="form-control practitioner-filter" style="min-width:280px;">
                    <option value="">All Doctors</option>
                </select>
            </div>
        </div>
    `);

    const container = $('<div style="width:100%;"></div>');

    page.body.append(filter_section);
    page.body.append(container);

    const practitioner_select = filter_section.find('.practitioner-filter');

    /* ------------------------------
       Load Doctors Dropdown
    ------------------------------ */
    frappe.call({
        method: "healthcare_app.api.queue_dashboard.get_practitioners",
        callback(r) {
            if (r.message) {
                r.message.forEach(pr => {
                    practitioner_select.append(`
                        <option value="${pr.name}">
                            ${pr.practitioner_name}
                        </option>
                    `);
                });
            }
        }
    });

    /* ------------------------------
       Render Queue
    ------------------------------ */
    function render() {
        const practitioner = practitioner_select.val();
        const { date, time } = getCurrentDateTime();

        frappe.call({
            method: "healthcare_app.api.queue_dashboard.get_practitioner_queue",
            args: practitioner ? { practitioner } : {},
            callback(r) {
                container.empty();

                if (!r.message || r.message.length === 0) {
                    container.append(`
                        <div style="text-align:center;font-size:28px;color:#777;">
                            No OPD Queue
                        </div>
                    `);
                    return;
                }

                /* ---------- HEADER (once) ---------- */
                container.append(`
                    <div style="
                        background:#0f3b82;
                        color:white;
                        padding:22px 40px;
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        font-size:26px;
                        font-weight:600;
                        margin-bottom:32px;
                    ">
                        <div>OPD TOKEN DISPLAY</div>
                        <div style="text-align:right;font-size:18px;">
                            <div>${date}</div>
                            <div style="font-weight:700;">${time}</div>
                        </div>
                    </div>
                `);

                /* ---------- DOCTORS LIST ---------- */
                const doctors = practitioner ? [r.message[0]] : r.message;

                doctors.forEach(row => {
                    const current = row.current;
                    const next = row.next;

                    container.append(`
                        <div style="margin-bottom:60px;">

                            <!-- Doctor Name -->
                            <div style="
                                text-align:center;
                                font-size:36px;
                                font-weight:700;
                                margin-bottom:24px;
                                color:#1e3a8a;
                            ">
                                ${row.practitioner_name}
                            </div>

                            <!-- CURRENT PATIENT -->
                            <div style="
                                max-width:1100px;
                                margin:0 auto;
                                background:#ede9fe;
                                border-radius:22px;
                                border:3px solid #7c3aed;
                                padding:40px;
                                text-align:center;
                                cursor:pointer;
                            "
                            ${current ? `onclick="window.location.href='/app/patient-appointment/${current.appointment_id}'"` : ``}
                            >
                                <div style="
                                    background:#7c3aed;
                                    color:white;
                                    font-size:24px;
                                    font-weight:600;
                                    padding:14px;
                                    border-radius:16px 16px 0 0;
                                    margin:-40px -40px 32px;
                                ">
                                    PATIENT IN CONSULTATION
                                </div>

                                ${current
                            ? `
                                        <div style="font-size:120px;font-weight:900;color:#7c3aed;">
                                            ${current.token.replace('Token ', '')}
                                        </div>
                                        <div style="font-size:40px;margin-top:16px;">
                                            ${current.patient_name}
                                        </div>
                                        <div style="font-size:14px;color:#2563eb;margin-top:8px;">
                                            Click to open appointment
                                        </div>
                                        `
                            : `
                                        <div style="font-size:32px;color:#777;">
                                            No patient in consultation
                                        </div>
                                        `
                        }
                            </div>

                            <!-- NEXT PATIENT -->
                            <div style="
                                max-width:1100px;
                                margin:24px auto 0;
                                display:flex;
                                border-radius:16px;
                                overflow:hidden;
                                font-size:32px;
                                font-weight:700;
                                cursor:pointer;
                            "
                            ${next ? `onclick="window.location.href='/app/patient-appointment/${next.appointment_id}'"` : ``}
                            >
                                <div style="
                                    background:#14b8a6;
                                    color:white;
                                    padding:20px 36px;
                                ">
                                    NEXT
                                </div>

                                <div style="
                                    background:#ecfdf5;
                                    color:#065f46;
                                    padding:20px 36px;
                                    width:100%;
                                ">
                                    ${next
                            ? `${next.token.replace('Token ', '')} – ${next.patient_name}`
                            : `No next patient`
                        }
                                </div>
                            </div>

                        </div>
                    `);
                });
            }
        });
    }

    /* ------------------------------
       Events & Auto Refresh
    ------------------------------ */
    practitioner_select.on('change', render);

    render();
    setInterval(render, 5000);

};