$('#cartao_sus').mask('9999 9999 9999 9999');

$.ajax({
    url: 'api/pergunta/obterTodos',
    type: 'POST',
    data: { token },
    success: function (result) {
        $.each(result.data, function (index, element) {
            $('#perguntas').append(`<div class="form-group"><label>${element.nome}</label><select class='form-control selectpicker' data-risco="${element.risco}" name='resposta-${element.idpergunta}[]' data-live-search='true' data-actions-box='true' multiple></select></div>`);
            $.ajax({
                url: 'api/resposta/obterPorPergunta',
                type: 'POST',
                data: { token: token, pergunta_id: element.idpergunta },
                success: function (result) {
                    $.each(result.data, function (index, element) {
                        $(`select[name="resposta-${element.pergunta_id}[]"]`).append($('<option>', { value: element.idresposta, text: element.resposta }));
                    });
                    $(`select[name="resposta-${element.idpergunta}[]"]`).selectpicker();
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
    console.log(formData);
    // $.ajax({
    //     type: 'POST',
    //     url: 'api/usuario/salvar',
    //     data: formData,
    //     beforeSend: function () {
    //         alertar('info', 'Aguarde um momento ...');
    //     },
    //     error: function () { },
    //     success: function (result) {
    //         if (result.status == 'error') {
    //             $('alert').text(result.data);
    //         } else {
    //             $('.modal-title').text('Usuário #' + result.data.idusuario);
    //             $('input[name="idusuario"]').val(result.data.idusuario);
    //             $('#btn-renovar-senha').show();

    //             $('.modal-footer').attr('class', `modal-footer bg-success text-light`);
    //             $('alert').text(`Usuário salvo!`);

    //             if (result.data.ativado == 'N') $('#btn-excluir').show();
    //             else $('#btn-excluir').hide();

    //             datatable.ajax.reload(null, false);
    //         }
    //     },
    //     complete: function () {
    //         setTimeout(function () {
    //             $('alert').toggle();
    //             $('buttons').toggle();
    //             $('.modal-footer').attr('class', 'modal-footer');
    //         }, 2000);
    //     }
    // });
    return false;
});