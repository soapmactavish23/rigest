$('title').text('Campeonatos');

var datatable = $('#datatable').DataTable( {
	ajax: {
		url: 'api/campeonato/obterTodos',
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
		{ data: "dt_inicial", className: "details-control", render: function(dt_update) { return datetime_format(dt_update, 'd/m/y') } },
		{ data: "dt_final", className: "details-control", render: function(dt_update) { return datetime_format(dt_update, 'd/m/y') } },
		{ data: "ano", className: "details-control" },
	],
	responsive: true,		
	language: {
		url: "lib/datatables/Portuguese-Brasil.lang"
	}
});

var loadForm = function () {
	$('.modal-content').load('partial/campeonato-tabs.html', function(response,status) {
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