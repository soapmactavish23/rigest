// Load Form
$('.modal-title').text('Nova Conta');
$('alert').hide();
$('#div-midia').hide();

$('#conta').mask('99999999-9');
$('#agencia').mask('9999');

if (data) {
    $('.modal-title').text('Conta #' + data.idconta);
    $('input[name="idconta"]').val(data.idconta);
    $('input[name="banco"]').val(data.banco);
    $('input[name="pessoa"]').val(data.pessoa);
    $('input[name="conta"]').val(data.conta);
    $('input[name="agencia"]').val(data.agencia);
    $('#conta').mask('99999999-9');
    $('#agencia').mask('9999');
    data.pix != null ? $('input[name="pix"]').val(data.pix) : $('input[name="pix"]').val(null);
    $('#ativado').prop('checked', (data.ativado == 'S' ? true : false));
    $('#tipo_poupanca').prop('checked', (data.tipo == 'poupanca' ? true : false));
    $('#tipo_corrente').prop('checked', (data.tipo == 'corrente' ? true : false));
    $('#upload').hide();
    $.ajax({
        url: 'api/conta/obterFoto',
        type: 'POST',
        data: { token: token, idconta: data.idconta },
        success: function (result) {
            if (result.status == 'success') {
                $.each(result.data, function (index, element) {
                    $('#div-midia').show();
                    $('input[name="idfoto_conta"]').val(element.idfoto_conta);
                    $('#midia-conta').attr('src', element.base64);
                    $('input[name="base64"]').val(element.base64);
                    $('#preview_foto_conta').attr('src', element.base64);
                    $('#upload_foto_conta').attr('required', false);
                });
            }
        }
    });
    $('#btn-pix').show();
}

$('#btn-alterar').click(function () {
    $('#div-midia').hide();
    $('#upload').show();
});

var compress = new Compress(); //instanciando elemento do Compress;
var upload_foto_conta = document.getElementById('upload_foto_conta'); // aonde eu to pegando a imagem
var preview_foto_conta = document.getElementById('preview_foto_conta'); //aonde vai ser exibido a imagem

upload_foto_conta.addEventListener('change', (evt) => {
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
        preview_foto_conta.src = `${img.prefix}${img.data}`;
        $('input[name="base64"]').val(`${img.prefix}${img.data}`);
    })

}, false);

$('form').submit(function () {
    var formData = $(this).serializeArray();
    formData.push({ name: 'token', value: token });
    $.ajax({
        type: 'POST',
        url: `api/conta/salvar`,
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
                $('.modal-title').text('conta #' + result.data);
                $('.modal-title').text('conta #' + result.data);
                $('input[name="idconta"]').val(result.data);
                $('.modal-footer').attr('class', `modal-footer bg-success text-light`);
                $('alert').text(`Conta salva!`);
                $('#btn-pix').show();
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