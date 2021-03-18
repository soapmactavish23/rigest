// Load Form
$('.modal-title').text('Novo usuário');
$('alert').hide();
$('#btn-excluir').hide();

if (data) {
    $('.modal-title').text('Usuário #' + data.idusuario);
    $('input[name="idusuario"]').val(data.idusuario);
    $('input[name="nome"]').val(data.nome);
    $('input[name="apelido"]').val(data.apelido);
    $('input[name="email"]').val(data.email);
    $('#ativado').prop('checked', (data.ativado == 'S' ? true : false));
    $('input[name="contato"]').val(data.contato);
    $('input[name="cpf"]').val(data.cpf);
    $('input[name="dt_nascimento"]').val(data.dt_nascimento);
    $('input[name="cep"]').val(data.cep);
    $('input[name="bairro"]').val(data.bairro);
    $('input[name="logradouro"]').val(data.logradouro);
    $('input[name="numero"]').val(data.numero);
    obterCidades(data.estado_id);
    if (data.ativado == 'S') $('#btn-excluir').hide();
    else $('#btn-excluir').show();

    $.ajax({
        url: 'api/midia/obterFotoPerfil',
        type: 'POST',
        data: { token: token, idusuario: data.idusuario },
        success: function(result){
            if(result.status == 'success'){
                $.each(result.data, function(index, element){
                    $('#img-foto-perfil').attr('src', element.base64);
                });
            }
        }
    });

} else {
    data = {
        idusuario: null,
        permissao: '',
        ativado: null
    };
    $('#btn-renovar-senha').hide();
    $('#btn-excluir').hide();
}

//Validar CPF
$('#cpf').change(function () {
    if ($(this).val().length > 13) {
        if (!isValidCPF($(this).val())) {
            alertar('danger', 'CPF Inválido');
            setTimeout(function () {
                $('alert').toggle();
                $('buttons').toggle();
                $('.modal-footer').attr('class', 'modal-footer');
            }, 2000);
            $(this).val(null);
        }
    }
});

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
        if (data) selectEstado.val(data.estado_id);
        else selectEstado.val(null);
        selectEstado.selectpicker();
    }
});

//Carregando municipios
selectEstado.change(function () {
    obterCidades($(this).val());
});

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

var selectPermissao = $('select[name="permissao[]"]');
var loadPermissao = function () {
    $.each(menu.responseJSON.items, function (index, element) {
        selectPermissao.append($('<option>', { value: element.id, text: element.label }));
    });
    selectPermissao.val(data.permissao.split(','));
    selectPermissao.selectpicker();
}
loadPermissao();

$('form').submit(function () {
    var formData = $(this).serializeArray();
    formData.push({ name: 'token', value: token });
    $.ajax({
        type: 'POST',
        url: 'api/usuario/salvar',
        data: formData,
        beforeSend: function () {
            alertar('info', 'Aguarde um momento ...');
        },
        error: function () { },
        success: function (result) {
            if (result.status == 'error') {
                $('alert').text(result.data);
            } else {
                $('.modal-title').text('Usuário #' + result.data.idusuario);
                $('input[name="idusuario"]').val(result.data.idusuario);
                $('#btn-renovar-senha').show();

                $('.modal-footer').attr('class', `modal-footer bg-success text-light`);
                $('alert').text(`Usuário salvo!`);

                if (result.data.ativado == 'N') $('#btn-excluir').show();
                else $('#btn-excluir').hide();

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

$('#btn-excluir').click(function () {
    if (confirm('Tem certeza que deseja excluir o registro?')) {
        var formData = [];
        formData.push({ name: 'token', value: token });
        formData.push({ name: 'idusuario', value: $('input[name="idusuario"]').val() });
        $.ajax({
            type: 'POST',
            url: 'api/usuario/excluir',
            data: formData,
            beforeSend: function () {
                alertar('info', 'Aguarde um momento ...');
            },
            error: function () { },
            success: function (result) {
                if (result.status == 'error') {
                    $('alert').text(result.data);
                } else {
                    $('.modal-footer').attr('class', `modal-footer bg-success text-light`);
                    $('alert').text(`Usuário ID ${result.data} excluído!`);
                    datatable.ajax.reload(null, false);
                }
            },
            complete: function () {
                $('.modal').modal('hide');
            }
        });
    }
});

$('#btn-renovar-senha').click(function () {
    var formData = [];
    formData.push({ name: 'token', value: token });
    formData.push({ name: 'idusuario', value: $('input[name="idusuario"]').val() });
    formData.push({ name: 'email', value: $('input[name="email"]').val() });
    $.ajax({
        type: 'POST',
        url: 'api/usuario/renovarSenha',
        data: formData,
        beforeSend: function () {
            alertar('info', 'Aguarde um momento ...');
        },
        error: function () { },
        success: function (result) {
            if (result.status == 'error') {
                $('alert').text(result.data);
            } else {
                $('.modal-footer').attr('class', `modal-footer bg-primary text-light`);
                $('alert').text('Senha do usuário ID ' + result.data + ' renovada!');
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
});

//Mascaras
$('#cpf').mask('999.999.999-99');
$('#contato').mask('(99) 99999-9999');
$('#cep').mask('99999-999');

function getAge(d1, d2) {
    d2 = d2 || new Date();
    var diff = d2.getTime() - d1.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

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

            if (data) selectCidade.val(data.cidade_id);
            else selectCidade.val(null);

            selectCidade.selectpicker();
        }
    });
}