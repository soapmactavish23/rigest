// Carregar Dados
function carregarDados() {
    $.ajax({
        type: 'POST',
        url: 'api/usuario/obter',
        data: { token },
        success: function (result) {
            $.each(result.data, function (index, element) {
                data = element;
                // Dados Pessoais
                $('#nome').text(element.nome);
                $('.apelido').text(element.apelido);
                $('.email').text(element.email);
                $('#contato').text(element.contato);
                $('#cpf').text(element.cpf);
                $('#dt_nascimento').text(datetime_format(element.dt_nascimento, 'd/m/y'));

                // Informações de Endereço
                $('#estado').text(element.estado);
                $('#cidade').text(element.cidade);
                $('#cep').text(element.cep);
                $('#bairro').text(element.bairro);
                $('#logradouro').text(element.logradouro);
                $('#numero').text(element.numero);

                //Mascara
                $('.contato').mask('(99) 99999-9999');
                $('.cpf').mask('999.999.999-99');
                $('.cep').mask('99999-999');
            })
        }
    });
    $.ajax({
        type: 'POST',
        url: 'api/midia/obterFotoPerfil',
        data: { token: token, idusuario: user.idusuario },
        success: function (result) {
            if (result.status == 'success') {
                $.each(result.data, function (index, element) {
                    data.base64 = element.base64;
                    data.idmidia = element.base64;
                    if (element.base64) $('#img-foto-perfil').attr('src', element.base64);
                })
            }
        }
    });
}

carregarDados();

$('#btn-editar-perfil').click(function () {
    $('.modal-content').load('partial/perfil-form.html', function (response, status) {
        if (status == 'success') $('.modal').modal('show');
    });
})

$('#btn-editar-foto').click(function () {
    $('.modal-content').load('partial/foto-perfil.html', function (response, status) {
        if (status == 'success') $('.modal').modal('show');
    });
})