$.ajax({
    type: 'POST',
    url: 'api/usuario/obter',
    data: { token },
    success: function (result) {
        $.each(result.data, function (index, element) {
            $('input[name="nome"]').val(element.nome);
            $('input[name="email"]').val(element.email);
            $('input[name="contato"]').val(element.contato);
            $('input[name="cartao_sus"]').val(element.cartao_sus);
            $('input[name="cbo"]').val(element.cbo);
            //Mascaras
            $('#cartao_sus').mask('9999 9999 9999 9999');
            $('#contato').mask('(99) 99999-9999');
        });
    }
});

$('form').submit(function () {
    var formData = $(this).serializeArray();
    formData.push({ name: 'idusuario', value: user.idusuario });
    formData.push({ name: 'token', value: token });
    $.ajax({
        type: 'POST',
        url: 'api/usuario/editarPerfil',
        data: formData,
        beforeSend: function () {
            alertar('info', 'Aguarde um momento ...');
        },
        error: function () { },
        success: function (result) {
            if (result.status == 'error') {
                $('alert').text(result.data);
            } else {
                $('.modal-title').text('Usuário #' + result.idusuario);

                $('.modal-footer').attr('class', `modal-footer bg-success text-light`);
                $('alert').text(`Perfil Editado!`);
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