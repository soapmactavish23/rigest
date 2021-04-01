$('.modal-title').text(`Ficha #${data.idficha} - ${data.risco}`);

$('input[name="nome"]').val(data.nome);
$('input[name="dt_nascimento"]').val(data.dt_nascimento);
$('input[name="idade"]').val(data.idade);
$('input[name="cartao_sus"]').val(data.cartao_sus);
$('input[name="dum"]').val(data.dum);
$('input[name="dpp"]').val(data.dpp);
$('input[name="ig"]').val(data.ig);
$('.cartao_sus').mask('9999 9999 9999 9999');
$('#btn-voltar').hide();
$('#btn-salvar').hide();

$.ajax({
    type: 'POST',
    url: 'api/ficha/obterRespostas',
    data: { token: token, ficha_id: data.idficha },
    success: function (result) {
        if (result.status == 'error') {
            $('#respostas').html(`<div class="text-center">${result.data}</div>`);
        } else {
            var item = '<div class="list-group">'
            var classItem;
            $.each(result.data, function (index, element) {
                switch (element.risco) {
                    case 'HABITUAL':
                        classItem = 'success';
                        break;
                    case 'INTERMEDIÁRIO':
                        classItem = 'warning';
                        break;
                    case 'ALTO':
                        classItem = 'danger';
                        break;
                }
                item += `<a href="#" class="list-group-item list-group-item-action list-group-item-${classItem}">${element.resposta}</a>`
            });
            item += '</div>';
            $('#respostas').html(item);
        }
    }
});

$('#btn-editar').click(function () {
    alterarExibicao(true);
});

$('#btn-voltar').click(function(){
    alterarExibicao(false);
});

function alterarExibicao(edicao){
    if(edicao){
        $('#btn-editar').hide();
        $('#btn-voltar').show();
        $('input').attr('readonly', false);
        $('#btn-salvar').show();
    }else{
        $('#btn-editar').show();
        $('#btn-voltar').hide();
        $('input').attr('readonly', true);
        $('#btn-salvar').hide();
    }
}