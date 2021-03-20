$('#cartao_sus').mask('9999 9999 9999 9999');
$('alert').hide();

$.ajax({
    url: 'api/pergunta/obterTodos',
    type: 'POST',
    data: { token },
    success: function (result) {
        $.each(result.data, function (index, element) {
            $('#perguntas').append(`<div class="form-group"><label>${element.nome}</label><select class='form-control selectpicker' data-risco="${element.risco}" id="pergunta-${element.idpergunta}" name='respostas[]' data-live-search='true' data-actions-box='true' multiple></select></div>`);
            $.ajax({
                url: 'api/resposta/obterPorPergunta',
                type: 'POST',
                data: { token: token, pergunta_id: element.idpergunta },
                success: function (result) {
                    $.each(result.data, function (index, element) {
                        $(`#pergunta-${element.pergunta_id}`).append($('<option>', { value: element.idresposta, text: element.resposta }));
                        //$(`select[name="resposta-${element.pergunta_id}[]"]`).append($('<option>', { value: element.idresposta, text: element.resposta }));
                    });
                    $(`#pergunta-${element.idpergunta}`).selectpicker();
                }
            });
            
            $('select').change(function(){
                var risco = $(this).data("risco");
                var inputRisco = $('input[name="risco"]');
                inputRisco.val(risco);
            });
        });
    }
});

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