function obterPerguntasERespostas(){
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
                        });
                        $(`#pergunta-${element.idpergunta}`).selectpicker();
                    }
                });

                $('select').change(function () {
                    var risco = $(this).data("risco");
                    var inputRisco = $('input[name="risco"]');
                    inputRisco.val(risco);
                });
            });
        }
    });
}