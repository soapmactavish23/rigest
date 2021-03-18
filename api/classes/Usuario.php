<?php

class Usuario extends ConnectionDB {

	public function autenticar () {
		// if ( ! recaptcha() ) throw new Exception('reCAPTCHA invalido!');
		$sql = "SELECT idusuario, nome, permissao, email, if(md5(email)=senha,true,false) mudasenha
		FROM usuario
		WHERE binary email='".addslashes($_REQUEST['login'])."' and binary senha ='".md5(addslashes($_REQUEST['password']))."' and ativado='S'
		LIMIT 1";

		if ( $rows = $this->read($sql) ) {
			$row = array_shift($rows);
			return array('token' => createJWT ($row, 36000));
		}
	}

	public function obter(){
		$_user = validateJWT( @ $_REQUEST['token']);
		$sql = "SELECT u.idusuario, u.nome, apelido, email, contato, cpf, contato, dt_nascimento, u.estado_id, u.cidade_id, cep, bairro, logradouro, numero, c.nome AS cidade, 
		CONCAT(e.sigla, ' / ', e.nome) AS estado
		FROM usuario u
		INNER JOIN cidade c
		ON c.idcidade = u.cidade_id
		INNER JOIN estado e
		ON e.idestado = u.estado_id
		WHERE idusuario = ".$_user->idusuario;
		return $this->read($sql);
	}

	public function obterTodos () {
		$_user = validateJWT( @ $_REQUEST['token']);
		$sql = "SELECT * FROM usuario";
		return $this->read($sql);
	}

	public function obterTodosAtivados(){
		$_user = validateJWT(@ $_REQUEST['token']);
		$sql = "SELECT * FROM usuario WHERE ativado = 'S'";
		return $this->read($sql);
	}

	public function obterNomeAtivados(){
		$_user = validateJWT(@ $_REQUEST['token']);
		$sql = "SELECT idusuario, nome FROM usuario WHERE ativado = 'S'";
		return $this->read($sql);
	}

	public function obterNome(){
		$_user = validateJWT(@ $_REQUEST['token']);
		$sql = "SELECT nome FROM usuario WHERE idusuario = ".$_REQUEST['idusuario'];
		return $this->read($sql);
	}

	public function obterCidades(){
		$sql = "SELECT idcidade, nome FROM cidade WHERE estado_id = ".$_REQUEST['estado_id'];
		return $this->read($sql);
	}

	public function obterEstados(){
		$sql = "SELECT idestado, concat(nome, ' - ', sigla) as estado FROM estado";
		return $this->read($sql);
	}

	public function editarPerfil(){
		$_user = validateJWT(@ $_REQUEST['token']);
		$this->idusuario = $_user->idusuario;
		$this->nome = addslashes($_REQUEST['nome']);
		$this->apelido = addslashes($_REQUEST['apelido']);
		$this->email = addslashes($_REQUEST['email']);

		require_once('Helper.php');
		$_helper = new Helper();

		$this->contato = $_helper->removerCaracteres(addslashes(@ $_REQUEST['contato']));
		$this->cpf = $_helper->removerCaracteres(addslashes(@ $_REQUEST['cpf']));
		$this->cep = $_helper->removerCaracteres(addslashes(@ $_REQUEST['cep']));

		$this->dt_nascimento = @ $_REQUEST['dt_nascimento'];
		$this->estado_id = @ $_REQUEST['estado_id'];
		$this->cidade_id = @ $_REQUEST['cidade_id'];
		$this->bairro = addslashes(@ $_REQUEST['bairro']);
		$this->logradouro = addslashes(@ $_REQUEST['logradouro']);
		$this->numero = addslashes(@ $_REQUEST['numero']);

		$this->dt_update = date('Y-m-d H:i:s');
		$this->update();
		return $this->idusuario;
	}

	public function salvar(){
		$_user = validateJWT(@ $_REQUEST['token']);
		$this->idusuario = @ $_REQUEST['idusuario'];
		$this->nome = addslashes($_REQUEST['nome']);
		$this->apelido = addslashes($_REQUEST['apelido']);
		$this->email = addslashes($_REQUEST['email']);
		
		require_once('Helper.php');
		$_helper = new Helper();

		$this->contato = $_helper->removerCaracteres(addslashes(@ $_REQUEST['contato']));
		$this->cpf = $_helper->removerCaracteres(addslashes(@ $_REQUEST['cpf']));
		$this->cep = $_helper->removerCaracteres(addslashes(@ $_REQUEST['cep']));

		$this->dt_nascimento = @ $_REQUEST['dt_nascimento'];
		$this->estado_id = @ $_REQUEST['estado_id'];
		$this->cidade_id = @ $_REQUEST['cidade_id'];
		$this->bairro = addslashes(@ $_REQUEST['bairro']);
		$this->logradouro = addslashes(@ $_REQUEST['logradouro']);
		$this->numero = addslashes(@ $_REQUEST['numero']);
		$this->permissao = implode(',', @ $_REQUEST['permissao']);

		if ( @ $_REQUEST['ativado'] ) $this->ativado = 'S';
		else $this->ativado = 'N';

		if ( $this->idusuario ) {
			$this->dt_update = date('Y-m-d H:i:s');
			$this->update();
		} else {
			$this->senha = md5($this->email);
			$this->idusuario = $this->create();
		}
		
		return array ( 'idusuario' => $this->idusuario, 'ativado' => $this->ativado );
	}

	public function cadastrar(){
		$_helper = new Helper();
		$cpf = $_helper->removerCaracteres(addslashes(@ $_REQUEST['cpf']));
		$contato = $_helper->removerCaracteres(addslashes(@ $_REQUEST['contato']));
		$cep = $_helper->removerCaracteres(addslashes(@ $_REQUEST['cep']));

		$this->nome = addslashes($_REQUEST['nome']);
		$this->apelido = addslashes($_REQUEST['apelido']);
		$this->email = addslashes($_REQUEST['email']);
		$this->contato = $contato;
		$this->cpf = $cpf;
		$this->dt_nascimento = @ $_REQUEST['dt_nascimento'];
		$this->estado_id = @ $_REQUEST['estado_id'];
		$this->cidade_id = @ $_REQUEST['cidade_id'];
		$this->cep = $cep;
		$this->bairro = addslashes(@ $_REQUEST['bairro']);
		$this->logradouro = addslashes(@ $_REQUEST['logradouro']);
		$this->numero = addslashes(@ $_REQUEST['numero']);
		$this->senha = md5(addslashes(@ $_REQUEST['senha']));
		$this->permissao = "usuario";

		return $this->create();

	}

	public function atualizarPerfil(){
		$_user = validateJWT( @ $_REQUEST['token']);
		$this->idusuario = @ $_REQUEST['idusuario'];
		$this->nome = addslashes(@ $_REQUEST['nome']);
		$this->cpf = addslashes(@ $_REQUEST['cpf']);
		$this->email = addslashes(@ $_REQUEST['email']);
		$this->contato = addslashes(@ $_REQUEST['contato']);
		return $this->update();
	}

	public function renovarSenha() {
		$_user = validateJWT( @ $_REQUEST['token']);

		if ( ! @ $_REQUEST['idusuario'] || ! @ $_REQUEST['email'] ) throw new Exception("parametros inexistentes");

		$this->idusuario = $_REQUEST['idusuario'];
		$this->senha = md5( addslashes($_REQUEST['email']) );
		return $this->update();
	}
	
	public function esqueceuSenha() {
		$sql = "SELECT idusuario, nome, email 
		FROM usuario WHERE email like '".$_REQUEST['email']."'";
		if ( $rs = $this->read($sql) ) {
			$col = $rs[0];
			$this->idusuario = $col['idusuario'];
			
			$_helper = new Helper();
			$senha = $_helper->gerar_senha(10, true, true, false, false);

			$this->senha = md5( $senha );

			$_mail = new Mail();
			$_mail->AddAddress($col['email'],$col['nome']);
			$_mail->Subject = "Renovação de senha"; 
			$_mail->Body = "Sua nova senha é: ".$senha;

			if( $_mail->Send() ) {
				$this->update();
				return true;
			} else {
				return $_mail->ErrorInfo;
			}
		}
		else{
			throw new Exception("Email não encontrado no sistema");
		}

	}

	public function excluir() {
		$_user = validateJWT( @ $_REQUEST['token']);
		if ( ! @ $_REQUEST['idusuario'] ) throw new Exception("parametro inexistente");
		$this->idusuario = $_REQUEST['idusuario'];
		return $this->delete();
	}

	public function mudarSenha() {
		$_user = validateJWT( @ $_REQUEST['token']);
		
		$sql = "SELECT idusuario, nome, permissao
		FROM usuario
		WHERE binary idusuario='".$_user->idusuario."' and binary senha='".md5( addslashes($_REQUEST['senha']) )."' 
		LIMIT 1";
		$rows = $this->read($sql);
		$row = array_shift($rows);

		$this->idusuario = $_user->idusuario;
		$this->senha = md5( addslashes ($_REQUEST['novasenha']) );
		$this->update();

		$row['mudasenha'] = false;
		return array('token' => createJWT ($row, 36000));
	}
}
?>