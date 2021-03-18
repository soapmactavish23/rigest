if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
    /* Token existe no localStorage */
    var token = localStorage.getItem('token');
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jwt = JSON.parse(window.atob(base64));
    var user = JSON.parse(jwt.data);
    var permissions = user.permissao.split(',');

    var menu = $.ajax({
        url: 'json/menu.json',

        success: function(result) {
            $('title').text(result.title);
            $('.sidebar-heading').html(`${result.title}`);
            $('.brand-title').text('Olá ' + user.nome);

            var menu = '';
            $.each(result.items, function(index, element) {
                if (permissions.indexOf(element.id) > -1) {
                    menu += '<a href="#' + element.id + '" class="list-group-item bg-success text-light list-group-item-action">' + '<i class="' + element.icon + '"></i> ' + element.label + '</a>';
                }
            });
            menu += '<a href="#perfil" class="list-group-item bg-success text-light list-group-item-action"> <i class="fas fa-user-edit"></i> Editar Perfil</a>';
            menu += '<a href="#mudasenha" class="list-group-item bg-success text-light list-group-item-action"> <i class="fas fa-lock"></i> Mudar senha</a>';
            menu += '<a href="#out" class="list-group-item bg-success text-light list-group-item-action"> <i class="fas fa-sign-out-alt"></i> Sair</a>';

            $('#menu').html(menu);

            return result;
        }
    });
    var data = null;
    var urlAPI = location.origin + '/gol/api/index.php';
    var loop;
    var userCaseId;
    var out = function() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    $('#menu').on('click', 'a', function() {
        clearInterval(loop);

        $('#menu a').removeClass("active");
        $(this).addClass("active");

        userCaseId = $(this).attr('href').substring(1);;
        if (typeof userCaseId !== 'undefined') {
            if (jwt.exp * 1000 > $.now()) {
                if (userCaseId !== 'out') {
                    if (user.mudasenha == "1") userCaseId = 'mudasenha';
                    $('main').load('partial/' + userCaseId + '.html', function(responseTxt, statusTxt, xhr) {
                        if (statusTxt == 'success') $("#menu-toggle").click();
                    });
                } else out();
            } else out();
        }
    });

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    
    if (user.mudasenha == "1") {
        $('main').load('partial/mudasenha.html', function(responseTxt, statusTxt, xhr) {
            if (statusTxt == 'success') $('[href="#mudasenha"]').addClass("active");
        });
    } else {
        if (permissions.indexOf('dashboard') > -1) {
            /* se tiver permissao de cadastro de infracao */
            $('main').load('partial/painel-controle.html', function(responseTxt, statusTxt, xhr) {
                if (statusTxt == 'success') $('[href="#dashboard"]').addClass("active");
            });
        } else {
            $('main').html('<h4>Você não tem permissão para acessar este recurso.</h4><h5>Entre em contato com o responsável pelo cadastro de usuários em sua Instituição.</h5>');
        }
    }

    $.fn.dataTable.ext.errMode = function (settings, helpPage, message) {
        var error = message.split(" - ", 2);
        console.log(error[1]);
    }

    if(user.permissao == 'painel-controle-externo,solicitacao,solicitacao-acompanhar'){
    $('main').load('partial/painel-controle-externo.html'); 
        console.log("externo")

    }else{
        $('main').load('partial/painel-controle.html');
    }

    $('.modal-dialog').addClass('modal-lg');
    
    function padronizarData(dt){
        return dt.replace(" ", "T");
    }

} else {
    /* Token não existe no localStorage */
    $('nav').hide()
    $('#sidebar-wrapper').hide();
    $('main').hide();
    $('title').text('RIGEST');
    $('.modal-dialog').addClass('modal-sm modal-dialog-centered');
    $('.modal-content').load('partial/login.html');
    $('.modal').modal('show');
    $('.footer').hide();
    
}

function alertar(classe, msg) {
    $('buttons').toggle();
    $('.modal-footer').attr('class', `modal-footer bg-${classe} text-light`);
    $('alert').text(msg).toggle();
}