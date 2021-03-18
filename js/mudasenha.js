$('alert').hide();

$('form').submit(function() {

	if ( $('#novasenha').val() != $('#confirmanovasenha').val() ) {
		$('buttons').toggle();
		$('alert').text('A senha de confirmação é diferente da nova senha').toggle();
		setTimeout(function() {
			$('alert').toggle();
			$('buttons').toggle();
			$('input').val('');
		}, 2000 );
		return false;
	}

	var formData = $(this).serializeArray();
	formData.push({name: 'token', value: token});
	$.ajax({
		type: 'POST',
		url: 'api/usuario/mudarsenha',
		data: formData,
		beforeSend: function() {
			$('buttons').toggle();
			$('alert').text('Aguarde um momento ...').toggle();
		},
		success: function(response) {
			if ( response.status=='error' ) {
				$('alert').text(response.data);
			} else {
				localStorage.setItem('token', response.data.token);
				$('alert').text('Sua senha foi alterada com sucesso');
			}
		},
		complete: function () {
			setTimeout(function() {
				$('alert').toggle();
				$('buttons').toggle();				
				window.location.reload();
			}, 2000 );
		}
	});	
	
	return false;
});	