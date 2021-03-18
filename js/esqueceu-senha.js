$('alert').hide();

$('form').submit(function () {
    var formData = $(this).serializeArray();
    $.ajax({
        type: 'POST',
        url: 'api/usuario/esqueceuSenha',
        data: formData,
        beforeSend: function () {
            alertar('info', 'Aguarde um momento ...');
        },
        error: function () { },
        success: function (result) {
            if (result.status == 'error') {
                $('.modal-footer').attr('class', `modal-footer bg-danger text-light`);
                $('alert').text(result.data);
            } else {
                if(result.data == true){
                    $('.modal-footer').attr('class', `modal-footer bg-success text-light`);
                    $('alert').text('Nova senha enviada com sucesso!');
                }else{
                    $('.modal-footer').attr('class', `modal-footer bg-danger text-light`);
                    $('alert').text(result.data);
                }
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

$('#btn-cancelar').click(function () {
    window.location.reload(true);
});