var datatable_jogo = $('#datatable-jogo').DataTable( {
	ajax: {
		url: 'api/jogo/obterTodos',
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
            d.rodada_id = data.idrodada;
		}
	},
	columns: [
		{ data: "nome_time1", className: "details-control" },
		{ data: "nome_time2", className: "details-control" },
		{ data: "dt_jogo", className: "details-control", render: function(dt_update) { return datetime_format(dt_update, 'd/m/y') } },
		{ data: "dt_update", className: "details-control", render: function(dt_update) { return datetime_format(dt_update, 'd/m/y') } }
	],
	responsive: true,		
	language: {
		url: "lib/datatables/Portuguese-Brasil.lang"
	}
});

var loadFormJogo = function () {
	$('#jogos').load('partial/jogo-form.html', function(response,status) {
		if ( status == 'success' ) $('.modal').modal('show');
	});
}

$('#datatable-jogo tbody').on('click', 'tr', function () {
	data_jogo = datatable_jogo.row( this ).data();
	loadFormJogo();
});

$('#btn-novo-jogo').click(function() {
	data_jogo = null;
	loadFormJogo();
});