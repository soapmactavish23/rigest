// Load Form
$('.modal-title').text('Novo Time');
$('alert').hide();
$('#div-midia').hide();

if (data) {
    $('.modal-title').text('Time #' + data.idtime);
    $('input[name="idtime"]').val(data.idtime);
    $('input[name="nome"]').val(data.nome);
    $('input[name="sigla"]').val(data.sigla);
    $('#ativado').prop('checked', (data.ativado == 'S' ? true : false));
    $('#upload').hide();
    $.ajax({
        url: 'api/time/obterFoto',
        type: 'POST',
        data: { token: token, time_id: data.idtime },
        success: function (result) {
            if (result.status == 'success') {
                $.each(result.data, function (index, element) {
                    $('#div-midia').show();
                    $('input[name="idmidia_time"]').val(element.idmidia_time);
                    $('#midia-time').attr('src', element.base64);
                    $('input[name="base64"]').val(element.base64);
                    $('#preview_foto_time').attr('src', element.base64);
                    $('#upload_foto_time').attr('required', false);
                });
            }
        }
    });
}

$('#btn-alterar').click(function () {
    $('#div-midia').hide();
    $('#upload').show();
});

var compress = new Compress(); //instanciando elemento do Compress;
var upload_foto_time = document.getElementById('upload_foto_time'); // aonde eu to pegando a imagem
var preview_foto_time = document.getElementById('preview_foto_time'); //aonde vai ser exibido a imagem

upload_foto_time.addEventListener('change', (evt) => {
    var files = [...evt.target.files]
    compress.compress(files, {
        size: 1, // O tamanho máximo em MB, o padrão é 2 MB;
        quality: 0.75, // A qualidade da imagem, no máximo 1;
        maxWidth: 1920, // A lacompura máxima da imagem de saída, o padrão é 1920px;
        maxHeight: 1920, // A altura máxima da imagem de saída, o padrão é 1920px;
        resize: true // Padrão é verdadeiro, defina falso caso não quiser redimensionar a lacompura e altura da imagem;
    }).then((images) => {

        var img = images[0]; // criando array que vai receber as informações da imagem
        // Retorna uma imagens compactadas dentro do array;
        preview_foto_time.src = `${img.prefix}${img.data}`;
        $('input[name="base64"]').val(`${img.prefix}${img.data}`);
    })

}, false);

$('form').submit(function () {
    var formData = $(this).serializeArray();
    formData.push({ name: 'token', value: token });
    $.ajax({
        type: 'POST',
        url: 'api/time/salvar',
        data: formData,
        beforeSend: function () {
            alertar('info', 'Aguarde um momento ...');
        },
        error: function () {
            $('.modal-footer').attr('class', `modal-footer bg-danger text-light`);
            $('alert').text(result.data);
        },
        success: function (result) {
            if (result.status == 'error') {
                $('.modal-footer').attr('class', `modal-footer bg-danger text-light`);
                $('alert').text(result.data);
            } else {
                $('.modal-title').text('Time #' + result.data);
                $('.modal-title').text('Time #' + result.data);
                $('input[name="idtime"]').val(result.data);
                $('.modal-footer').attr('class', `modal-footer bg-success text-light`);
                $('alert').text(`Time salvo!`);
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
