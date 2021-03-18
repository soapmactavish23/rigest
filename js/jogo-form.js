$('alert').hide();

$('#btn-excluir').hide();

if (data_jogo) {
    $('input[name="idjogo"]').val(data_jogo.idjogo);
    $('input[name="dt_jogo"]').val(padronizarData(data_jogo.dt_jogo));
    $('#btn-excluir').show();
}

//SELECT DE CAMPEONATO
var selectCampeonato = $('#campeonato_id');
$.ajax({
    url: 'api/campeonato/obterNomes',
    type: 'post',
    data: { token },
    success: function (result) {
        $.each(result.data, function (index, element) {
            selectCampeonato.append($('<option>', { value: element.idcampeonato, text: element.nome }));
        });
        if (data_jogo) {
            selectCampeonato.val(data_jogo.campeonato_id);
            selectCampeonato.change();
        } else {
            selectCampeonato.val(null);
        }
        selectCampeonato.selectpicker();
    }
});
selectCampeonato.change(function () {
    //SELECT DE TIME 1
    var selectTime1 = $('select[name="time1"]');
    $.ajax({
        url: 'api/time/obterTodosDoCampeonato',
        type: 'post',
        data: { token: token, campeonato_id: selectCampeonato.val() },
        success: function (result) {
            $.each(result.data, function (index, element) {
                selectTime1.append($('<option>', { value: element.idtime, text: element.time }));
            })
            if (data_jogo != null) {
                selectTime1.val(data_jogo.time1);
                selectTime1.change();
            } else {
                selectTime1.val(null);
            }
            selectTime1.selectpicker();
        }
    });
    //SELECT DE TIME 2
    var selectTime2 = $('select[name="time2"]');
    $.ajax({
        url: 'api/time/obterTodosDoCampeonato',
        type: 'post',
        data: { token: token, campeonato_id: selectCampeonato.val() },
        success: function (result) {
            $.each(result.data, function (index, element) {
                selectTime2.append($('<option>', { value: element.idtime, text: element.time }));
            })
            if (data_jogo != null) {
                selectTime2.val(data_jogo.time2);
                selectTime2.change();
            } else {
                selectTime2.val(null);
            }
            selectTime2.selectpicker();
        }
    });
});

$('select[name="time1"]').change(function () {
    var time_id = $(this).val();
    $.ajax({
        url: 'api/time/obterFoto',
        type: 'post',
        data: { token: token, time_id: time_id },
        success: function (result) {
            if (result.status == "success") {
                $.each(result.data, function (index, element) {
                    $('#foto_time1').attr('src', element.base64);
                });
            }
        }
    });
});

$('select[name="time2"]').change(function () {
    var time_id = $(this).val();
    $.ajax({
        url: 'api/time/obterFoto',
        type: 'post',
        data: { token: token, time_id: time_id },
        success: function (result) {
            if (result.status == "success") {
                $.each(result.data, function (index, element) {
                    $('#foto_time2').attr('src', element.base64);
                });
            }
        }
    });
});

//ENVIO DO FORMULARIO
$('#form-jogo').submit(function () {
    var formData = $(this).serializeArray();
    formData.push({ name: 'token', value: token });
    formData.push({ name: 'rodada_id', value: data.idrodada })
    $.ajax({
        type: 'POST',
        url: 'api/jogo/salvar',
        data: formData,
        beforeSend: function () {
            alertar('info', 'Aguarde um momento ...');
        },
        error: function (result) {
            $('.modal-footer').attr('class', `modal-footer bg-danger text-light`);
            $('alert').text(result.data);
            setTimeout(function () {
                $('alert').toggle();
                $('buttons').toggle();
                $('.modal-footer').attr('class', 'modal-footer');
            }, 2000);
        },
        success: function (result) {
            if (result.status == 'error') {
                $('.modal-footer').attr('class', `modal-footer bg-danger text-light`);
                $('alert').text(result.data);
            } else {
                $('input[name="idjogo"]').val(result.data);
                $('.modal-footer').attr('class', `modal-footer bg-success text-light`);
                $('alert').text(`Jogo salvo!`);
                datatable_jogo.ajax.reload(null, false);
                $('#btn-excluir').show();
            }
        },
        complete: function () {
            setTimeout(function () {
                $('alert').toggle();
                $('buttons').toggle();
                $('.modal-footer').attr('class', 'modal-footer');
            }, 2000);
        }
    });
    return false;
});

$('#btn-excluir').click(function () {
    if (confirm('Tem certeza que deseja excluir o registro?')) {
        $.ajax({
            type: 'POST',
            url: 'api/jogo/excluir',
            data: { token: token, idjogo: data_jogo.idjogo },
            beforeSend: function () {
                alertar('info', 'Aguarde um momento ...');
            },
            error: function () { },
            success: function (result) {
                if (result.status == 'error') {
                    $('alert').text(result.data);
                } else {
                    $('.modal-footer').attr('class', `modal-footer bg-success text-light`);
                    $('alert').text(`Jogo ID ${result.data} excluído!`);
                    datatable_jogo.ajax.reload(null, false);
                }
            },
            complete: function () {
                $('#jogos').load('partial/jogo.html');
            }
        });
    }
});

$('#btn-cancelar').click(function () {
    $('#jogos').load('partial/jogo.html');
});