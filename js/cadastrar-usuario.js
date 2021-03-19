$('alert').hide();
$('.modal-dialog').addClass('modal-lg');

//Validar Senha
$('input[name="senha2"]').change(function () {
    if ($(this).val() != $('input[name="senha"]').val()) {
        alertar('danger', 'As senha não são iguais');
        setTimeout(function () {
            $('alert').toggle();
            $('buttons').toggle();
            $('.modal-footer').attr('class', 'modal-footer');
        }, 2000);
        $(this).val(null);
    }
})

$('form').submit(function () {
    var formData = $(this).serializeArray();
    $.ajax({
        type: 'POST',
        url: 'api/usuario/cadastrar',
        data: formData,
        beforeSend: function () {
            alertar('info', 'Aguarde um momento ...');
        },
        error: function () { },
        success: function (result) {
            if (result.status == 'error') {
                console.log(result.data)
                $('.modal-footer').attr('class', `modal-footer bg-danger text-light`);
                if (result.data.indexOf("cartao_sus") != -1) {
                    $('alert').text('cartao_sus em uso por outro usuario!');
                } else if (result.data.indexOf("email") != -1) {
                    $('alert').text("E-mail em uso por outro usuario!");
                } else {
                    $('alert').text("Erro ao cadastrar o usuario. Contate o suporte!");
                }
            } else {
                $('.modal-footer').attr('class', `modal-footer bg-success text-light`);
                $('alert').text('Usuário salvo com sucesso!');
                window.location.reload(true);
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

$('.modal-dialog').addClass('modal-md modal-dialog-centered');

//Mascaras
$('#cartao_sus').mask('9999 9999 9999 9999');
$('#contato').mask('(99) 99999-9999');