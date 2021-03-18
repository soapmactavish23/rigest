$('alert').hide();

$('form').submit(function() {
    $.ajax({
        type: 'POST',
        url: 'api/usuario/autenticar',
        data: $(this).serializeArray(),
        beforeSend: function() {
            alertar('info', 'Aguarde um momento ...');
        },
        error: function(jqXHR, status, thrown) {
            $('alert').text('Error (' + jqXHR.status + '): API ' + thrown);
        },
        success: function(response) {
            if (response.status == 'error') {
                $('.modal-footer').attr('class', `modal-footer bg-danger text-light`);
                $('alert').text(`Acesso negado!`);
                $('input[name=password]').val(null);
            } else {
                $('.modal-footer').attr('class', `modal-footer bg-success text-light`);
                $('alert').text(`Bem Vindo!`);

                localStorage.setItem('token', response.data.token);
                window.location.reload();
            }
        },
        complete: function() {
            setTimeout(function() {
                $('alert').toggle();
                $('buttons').toggle();
                $('.modal-footer').attr('class', 'modal-footer');
            }, 2000);
        }
    });
    return false;
});

$('#btn-cadastrar').click(function() {
    $(".modal-content").load("partial/cadastrar-usuario.html");
});

$(".modal").on('hide.bs.modal', function() {
    window.location.reload(true);
});

$('#esqueceu-senha').click(function(){
    $(".modal-content").load("partial/esqueceu-senha.html");
});