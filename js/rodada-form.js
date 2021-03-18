// Load Form
$('alert').hide();


//Select do pontuacao
var selectPontuacao = $('select[name="pontuacao_id"]');
$.ajax({
    url: 'api/pontuacao/obterTodos',
    type: 'POST',
    data: { token },
    success: function (result) {
        $.each(result.data, function (index, element) {
            selectPontuacao.append($('<option>', { value: element.idpontuacao, text: element.nome }));
        });
        data ? selectPontuacao.val(data.pontuacao_id) : selectPontuacao.val(null);
        selectPontuacao.selectpicker();   
    }
});

if (data) {
    $('.modal-title').text(data.nome);
    $('input[name="idrodada"]').val(data.idrodada);
    $('input[name="nome"]').val(data.nome);
    $('input[name="valor"]').val(data.valor);
    $('input[name="taxa"]').val(data.taxa);
    $('input[name="dt_inicio"]').val(padronizarData(data.dt_inicio));
    $('input[name="dt_fim"]').val(padronizarData(data.dt_fim));
    $('input[name="dt_inicio_inscricao"]').val(padronizarData(data.dt_inicio_inscricao));
    $('input[name="dt_fim_inscricao"]').val(padronizarData(data.dt_fim_inscricao));
}

$('form').submit(function () {
    var formData = $(this).serializeArray();
    formData.push({ name: 'token', value: token });
    $.ajax({
        type: 'POST',
        url: `api/rodada/salvar`,
        data: formData,
        beforeSend: function () {
            alertar('info', 'Aguarde um momento ...');
        },
        error: function (result) {
            $('.modal-footer').attr('class', `modal-footer bg-danger text-light`);
            $('alert').text(result.data);
        },
        success: function (result) {
            if (result.status == 'error') {
                $('.modal-footer').attr('class', `modal-footer bg-danger text-light`);
                $('alert').text(result.data);
            } else {
                $('.modal-title').text('Rodada #' + result.data);
                $('.modal-title').text('Rodada #' + result.data);
                $('input[name="idrodada"]').val(result.data);
                $('.modal-footer').attr('class', `modal-footer bg-success text-light`);
                $('alert').text(`Rodada Salva!`);
                $('#btn-pix').show();
                $('#tabs').show();
                datatable.ajax.reload(null, false);
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