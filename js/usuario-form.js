// Load Form
$('.modal-title').text('Novo usuário');
$('alert').hide();
$('#btn-excluir').hide();

if (data) {
    $('.modal-title').text('Usuário #' + data.idusuario);
    $('input[name="idusuario"]').val(data.idusuario);
    $('input[name="nome"]').val(data.nome);
    $('input[name="email"]').val(data.email);
    $('#ativado').prop('checked', (data.ativado == 'S' ? true : false));
    $('input[name="contato"]').val(data.contato);
    $('input[name="cartao_sus"]').val(data.cartao_sus);
    $('input[name="cbo"]').val(data.cbo);

    if (data.ativado == 'S') $('#btn-excluir').hide();
    else $('#btn-excluir').show();

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
$('#cartao_sus').mask('9999 9999 9999 9999');
$('#contato').mask('(99) 99999-9999');