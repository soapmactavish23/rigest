$('title').text('Forma de Pagamento');

var datatable = $('#datatable').DataTable( {
	ajax: {
		url: 'api/conta/obterTodos',
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
		{ data: "banco", className: "details-control" },
		{ data: "pessoa", className: "details-control" },
		{ data: "conta", className: "details-control" },
		{ data: "agencia", className: "details-control" },
		{ data: "tipo", className: "details-control" },
		{ data: "pix", className: "details-control" },
	],
	responsive: true,		
	language: {
		url: "lib/datatables/Portuguese-Brasil.lang"
	}
});

var loadForm = function () {
	$('.modal-content').load('partial/forma-pagamento-form.html', function(response,status) {
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