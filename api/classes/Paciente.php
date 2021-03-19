<?php

class Paciente extends ConnectionDB {

	public function obterTodos () {
		$_user = validateJWT( @ $_REQUEST['token']);
		$sql = "SELECT * FROM pergunta";
		return $this->read($sql);
	}

    public function cadastrar(){
		require_once('Helper.php');
		$_helper = new Helper();
		$cartao_sus = $_helper->removerCaracteres(addslashes(@ $_REQUEST['cartao_sus']));
		$cbo = $_helper->removerCaracteres(addslashes(@ $_REQUEST['cbo']));

		$this->nome = addslashes($_REQUEST['nome']);
		$this->dt_nascimento = addslashes($_REQUEST['dt_nascimento']);
		$this->contato = $contato;
		$this->cpf = $cpf;
		$this->senha = md5(addslashes(@ $_REQUEST['senha']));
		$this->permissao = "usuario";

		return $this->create();

	}
}
?>