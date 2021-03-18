$('title').text('Times');

var datatable = $('#datatable').DataTable( {
	ajax: {
		url: 'api/time/obterTodos',
		deferRender: true,
		dataSrc: function (json) { 
			if (json.status=='success') return json.data;
			else return false; 
		},
		type: "POST",
		data: function (d) {
			d.token = token;
		}
	},
	columns: [
		{ data: "nome", className: "details-control" },
		{ data: "sigla", className: "details-control" }
	],
	responsive: true,		
	language: {
		url: "lib/datatables/Portuguese-Brasil.lang"
	}
});

var loadForm = function () {
	$('.modal-content').load('partial/time-form.html', function(response,status) {
		if ( status == 'success' ) $('.modal').modal('show');
	});
}

$('#datatable tbody').on('click', 'tr', function () {
	data = datatable.row( this ).data();
	loadForm();
});

$('#btn-novo').click(function() {
	data = null;
	loadForm();
});