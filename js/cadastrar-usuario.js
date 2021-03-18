$('alert').hide();
$('.modal-dialog').addClass('modal-lg');

//Validar CPF
$('input[name="cpf"]').change(function () {
    if ($(this).val().length > 13) {
        if (!isValidCPF($(this).val())) {
            alertar('danger', 'CPF Inválido');
            setTimeout(function () {
                $('alert').toggle();
                $('buttons').toggle();
                $('.modal-footer').attr('class', 'modal-footer');
            }, 2000);
            $(this).val(null);
            $('.cpf').mask('999.999.999-99');
        }
    }
});

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

function getAge(d1, d2) {
    d2 = d2 || new Date();
    var diff = d2.getTime() - d1.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

$('input[name="dt_nascimento"]').change(function () {
    var dataNascimento = new Date($(this).val())
    var ano = dataNascimento.getFullYear();
    var mes = dataNascimento.getMonth() + 1;
    var dia = dataNascimento.getDate() + 1;
    var idade = getAge(new Date(ano, mes, dia));
    if (idade < 18) {
        alertar('danger', 'Para se cadastrar precisa ser maior de 18 anos');
        setTimeout(function () {
            $('alert').toggle();
            $('buttons').toggle();
            $('.modal-footer').attr('class', 'modal-footer');
        }, 2000);
        $(this).val(null);
    }
});

//Carregando cidades
var selectEstado = $('select[name="estado_id"]');
$.ajax({
    url: 'api/usuario/obterEstados',
    success: function (result) {
        $.each(result.data, function (index, element) {
            selectEstado.append($('<option>', { value: element.idestado, text: element.estado }));
        })
        selectEstado.val(null);
        selectEstado.selectpicker();
    }
});

//Carregando municipios
selectEstado.change(function () {
    obterCidades($(this).val());
});

function obterCidades(estado_id) {
    $.ajax({
        url: 'api/usuario/obterCidades',
        type: 'post',
        data: { estado_id: estado_id },
        success: function (result) {
            $('#div-cidade').html('<select name="cidade_id" id="cidade_id" class="form-control" required data-live-search="true"></select>');
            selectCidade = $('select[name="cidade_id"]');
            $.each(result.data, function (index, element) {
                selectCidade.append($('<option>', { value: element.idcidade, text: element.nome }));
            });

            selectCidade.val(null);

            selectCidade.selectpicker();
        }
    });
}

$('#cep').change(function () {
    if ($('input[name="cep"]').val().length >= 9) {
        var cep = $('input[name="cep"]').val().replace(/[^\d]+/g, '');
        $.ajax({
            url: 'https://viacep.com.br/ws/' + cep + '/json/',
            success: function (result) {
                $('input[name="logradouro"]').val(result.logradouro);
                $('input[name="bairro"]').val(result.bairro);
            }
        })
    }
});

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
                if (result.data.indexOf("cpf") != -1) {
                    $('alert').text('CPF em uso por outro usuario!');
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
$('#cpf').mask('999.999.999-99');
$('#contato').mask('(99) 99999-9999');
$('#cep').mask('99999-999');