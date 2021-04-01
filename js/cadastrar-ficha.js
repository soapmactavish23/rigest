$('#cartao_sus').mask('9999 9999 9999 9999');
$('alert').hide();

obterPerguntasERespostas();

$('form').submit(function () {
    var formData = $(this).serializeArray();
    formData.push({ name: 'token', value: token });
    $.ajax({
        type: 'POST',
        url: 'api/ficha/salvar',
        data: formData,
        beforeSend: function () {
            alertar('info', 'Aguarde um momento ...');
        },
        error: function () { },
        success: function (result) {
            if (result.status == 'error') {
                $('alert').text(result.data);
            } else {
                $('alert').text(`Ficha Salva!`);
            }
        },
        complete: function () {
            setTimeout(function () {
                $('alert').toggle();
                $('buttons').toggle();
                window.location.reload(true);
            }, 2000);
        }
    });
    return false;
});