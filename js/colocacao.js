var datatable_colocacao = $('#datatable-colocacao').DataTable( {
	ajax: {
		url: 'api/colocacao/obterTodos',
		deferRender: true,
		dataSrc: function (json) { 
			if (json.status=='success'){
                return json.data;  
            } 
			else return false;
		},
		type: "POST",
		data: function (d) {
			d.token = token;
			if(data) d.pontuacao_id = data.pontuacao_id;
            else d.pontuacao_id = 0;
		}
	},
	columns: [
		{ data: "colocacao", className: "details-control" },
		{ data: "porcentagem", className: "details-control" },
		{ data: "dt_update", className: "details-control", render: function(dt_update) { return datetime_format(dt_update, 'd/m/y') } }
	],
	responsive: true,		
	language: {
		url: "lib/datatables/Portuguese-Brasil.lang"
	}
});

var loadFormColocacao = function () {
	$('#colocacao').load('partial/colocacao-form.html', function(response,status) {
		if ( status == 'success' ) $('.modal').modal('show');
	});
}

$('#datatable-colocacao tbody').on('click', 'tr', function () {
	data_colocacao = datatable_colocacao.row( this ).data();
	loadFormColocacao();
});

$('#btn-novo-colocacao').click(function() {
	data_colocacao = null;
	loadFormColocacao();
});