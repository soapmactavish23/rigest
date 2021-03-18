var datatable_times_add = $('#datatable_times_add').DataTable({
	ajax: {
		url: 'api/time/obterTodosSemCampeonato',
		deferRender: true,
		dataSrc: function (json) {
			if (json.status == 'success') return json.data;
			else return false;
		},
		type: "POST",
		data: function (d) {
			d.token = token;
			d.campeonato_id = data.idcampeonato;
		}
	},
	columns: [
		{ data: "nome", className: "details-control" },
		{ data: "sigla", className: "details-control" },
		{ "data": null, "className": "details-control-add", "ordenable": false, "defaultContent": '' }
	],
	responsive: true,
	language: {
		url: "lib/datatables/Portuguese-Brasil.lang"
	}
});

var datatable_times_rm = $('#datatable_times_rm').DataTable({
	ajax: {
		url: 'api/time/obterTodosDoCampeonato',
		deferRender: true,
		dataSrc: function (json) {
			if (json.status == 'success') return json.data;
			else return false;
		},
		type: "POST",
		data: function (d) {
			d.token = token;
			d.campeonato_id = data.idcampeonato;
		}
	},
	columns: [
		{ data: "nome", className: "details-control" },
		{ data: "sigla", className: "details-control" },
		{ "data": null, "className": "details-control-rm", "ordenable": false, "defaultContent": '' }
	],
	responsive: true,
	language: {
		url: "lib/datatables/Portuguese-Brasil.lang"
	}
});

$('#td_add').hide();
$('#td_rm').show();

$('#btn-voltar-time').hide();

$('#btn-novo-time').click(function () {
	$('#td_add').show();
	$('#td_rm').hide();
	$('#btn-voltar-time').show();
	$(this).hide();
	$('#title-times').text('Selecionar Times');
});

$('#btn-voltar-time').click(function () {
	$('#td_add').hide();
	$('#td_rm').show();
	$(this).hide();
	$('#btn-novo-time').show();
	$('#title-times').text('Times Selecionados');
});

$('#datatable_times_add tbody').on('click', 'td.details-control-add', function () {
	var tr = $(this).closest('tr');
	var row = datatable_times_add.row( tr );
	var time_id = row.data().idtime;
	$.ajax({
		url: 'api/campeonato/addTime',
		type: 'post',
		data: {campeonato_id: data.idcampeonato, time_id: time_id, token: token},
		success: function (result) {
			datatable_times_add.ajax.reload(null, false);
			datatable_times_rm.ajax.reload(null, false);
		}
	});
});

$('#datatable_times_rm tbody').on('click', 'td.details-control-rm', function () {
	var tr = $(this).closest('tr');
	var row = datatable_times_rm.row( tr );
	var id = row.data().id;
	$.ajax({
		url: 'api/campeonato/rmTime',
		type: 'post',
		data: {id: id, token: token},
		success: function (result) {
			datatable_times_add.ajax.reload(null, false);
			datatable_times_rm.ajax.reload(null, false);
		}
	});
});