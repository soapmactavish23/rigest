$('alert').hide();

$('input[name="idfoto_perfil"]').val(data.idfoto_perfil);
$('input[name="base64"]').val(data.base64);
$('#preview_foto_perfil').attr('src', data.base64);

var compress = new Compress(); //instanciando elemento do Compress;
var upload_foto_perfil = document.getElementById('upload_foto_perfil'); // aonde eu to pegando a imagem
var preview_foto_perfil = document.getElementById('preview_foto_perfil'); //aonde vai ser exibido a imagem

upload_foto_perfil.addEventListener('change', (evt) => {
    var files = [...evt.target.files]
    compress.compress(files, {
        size: 2, // O tamanho máximo em MB, o padrão é 2 MB;
        quality: 0.75, // A qualidade da imagem, no máximo 1;
        maxWidth: 1920, // A lacompura máxima da imagem de saída, o padrão é 1920px;
        maxHeight: 1920, // A altura máxima da imagem de saída, o padrão é 1920px;
        resize: true // Padrão é verdadeiro, defina falso caso não quiser redimensionar a lacompura e altura da imagem;
    }).then((images) => {

        var img = images[0]; // criando array que vai receber as informações da imagem
        // Retorna uma imagens compactadas dentro do array;
        preview_foto_perfil.src = `${img.prefix}${img.data}`;
        $('input[name="base64"]').val(`${img.prefix}${img.data}`);
    })

}, false);

$('form').submit(function () {
    var formData = $(this).serializeArray();
    formData.push({ name: 'token', value: token });
    formData.push({ name: 'nome', value: 'foto_perfil' });
    $.ajax({
        type: 'POST',
        url: 'api/midia/salvarFotoPerfil',
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
                $('alert').text(`Foto de perfil do Usuário salva com Sucesso!`);
                carregarDados();
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