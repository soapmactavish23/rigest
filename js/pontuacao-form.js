// Load Form
$('alert').hide();

$('.modal-title').text('Nova Pontuação');

if (data) {
    $('.modal-title').text(data.nome);
    $('input[name="idpontuacao"]').val(data.idpontuacao);
    $('input[name="nome"]').val(data.nome);
    $('input[name="colocacao"]').val(data.colocacao);
    $('input[name="porcentagem"]').val(data.porcentagem);
}

$('form').submit(function () {
    var formData = $(this).serializeArray();
    formData.push({ name: 'token', value: token });
    $.ajax({
        type: 'POST',
        url: `api/pontuacao/salvar`,
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
                $('.modal-title').text('Pontuação #' + result.data);
                $('input[name="idpontuacao"]').val(result.data);
                $('.modal-footer').attr('class', `modal-footer bg-success text-light`);
                $('alert').text(`Pontuação Salva!`);
                $('#tabs').show();
                data.idpontuacao = result.data;
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