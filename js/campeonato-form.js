// Load Form
$('.modal-title').text('Novo Campenato');
$('alert').hide();
$('#div-midia').hide();

if (data) {
    $('.modal-title').text('Campeonato #' + data.idcampeonato);
    $('input[name="idcampeonato"]').val(data.idcampeonato);
    $('input[name="nome"]').val(data.nome);
    $('input[name="ano"]').val(data.ano);
    $('input[name="dt_inicial"]').val(data.dt_inicial);
    $('input[name="dt_final"]').val(data.dt_final);

    $('#upload').hide();

    $.ajax({
        type: 'POST',
        url: 'api/campeonato/obterFoto',
        data: { token: token, campeonato_id: data.idcampeonato },
        success: function (result) {
            if (result.status == 'success') {
                $.each(result.data, function (index, element) {
                    $('#div-midia').show();
                    $('input[name="idmidia_campeonato"]').val(element.idmidia_campeonato);
                    $('#midia-time').attr('src', element.base64);
                    $('input[name="base64"]').val(element.base64);
                    $('#preview_foto_campeonato').attr('src', element.base64);
                    $('#upload_foto_campeonato').attr('required', false);
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
var upload_foto_campeonato = document.getElementById('upload_foto_campeonato'); // aonde eu to pegando a imagem
var preview_foto_campeonato = document.getElementById('preview_foto_campeonato'); //aonde vai ser exibido a imagem

upload_foto_campeonato.addEventListener('change', (evt) => {
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
        preview_foto_campeonato.src = `${img.prefix}${img.data}`;
        $('input[name="base64"]').val(`${img.prefix}${img.data}`);
    })

}, false);

$('form').submit(function () {
    var formData = $(this).serializeArray();
    formData.push({ name: 'token', value: token });
    $.ajax({
        type: 'POST',
        url: 'api/campeonato/salvar',
        data: formData,
        beforeSend: function () {
            alertar('info', 'Aguarde um momento ...');
        },
        error: function (result) {
            $('.modal-footer').attr('class', `modal-footer bg-danger text-light`);
            $('alert').text(result.data);
            setTimeout(function () {
                $('alert').toggle();
                $('buttons').toggle();
                $('.modal-footer').attr('class', 'modal-footer');
            }, 2000);
        },
        success: function (result) {
            if (result.status == 'error') {
                $('.modal-footer').attr('class', `modal-footer bg-danger text-light`);
                $('alert').text(result.data);
            } else {
                $('.modal-title').text('Time #' + result.data);
                $('.modal-title').text('Time #' + result.data);
                $('input[name="idcampeonato"]').val(result.data);
                $('.modal-footer').attr('class', `modal-footer bg-success text-light`);
                $('alert').text(`Campeonato salvo!`);
                $('#tabs').show();
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