frappe.pages['opd_queue_board'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'OPD Queue Board',
		single_column: true
	});
}