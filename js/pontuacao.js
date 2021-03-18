$('title').text('Pontuação');

var datatable = $('#datatable').DataTable( {
	ajax: {
		url: 'api/pontuacao/obterTodos',
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
        { data: "dt_update", className: "details-control", render: function(dt) { return datetime_format(dt, 'd/m/y h:i') } }
	],
	responsive: true,		
	language: {
		url: "lib/datatables/Portuguese-Brasil.lang"
	}
});

var loadForm = function () {
	$('.modal-content').load('partial/pontuacao-tabs.html', function(response,status) {
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