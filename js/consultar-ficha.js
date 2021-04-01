$('title').text('Consultar Risco Gestacional');

var datatable = $('#datatable').DataTable( {
	ajax: {
		url: 'api/ficha/obterTodosDoUsuario',
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
		{ data: "idficha", className: "details-control" },
		{ data: "nome", className: "details-control" },
		{
			data: "risco", className: "details-control", "render": function (risco) {
				if (risco == "HABITUAL") badge = "badge-success";
				if (risco == "INTERMEDIÁRIO") badge = "badge-warning";
				if (risco == "ALTO") badge = "badge-danger";
				return "<span class = 'badge " + badge + "'>" + risco + "</span>";
			}
		},
		{ data: "dt_nascimento", className: "details-control", render: function(dt_update) { return datetime_format(dt_update, 'd/m/y') } },
		{ data: "idade", className: "details-control" },
		{ data: "cartao_sus", className: "details-control" },
		{ data: "dt_update", className: "details-control", render: function(dt_update) { return datetime_format(dt_update, 'd/m/y h:i') } }
	],
	responsive: true,		
	language: {
		url: "lib/datatables/Portuguese-Brasil.lang"
	}
});

var loadForm = function () {
	$('.modal-content').load('partial/consultar-ficha-form.html', function(response,status) {
		if ( status == 'success' ) $('.modal').modal('show');
	});
}

$('#datatable tbody').on('click', 'tr', function () {
	data = datatable.row( this ).data();
	loadForm();
});