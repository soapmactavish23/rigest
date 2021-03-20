<?php

class Paciente extends ConnectionDB {

	public function obterTodos () {
		$_user = validateJWT( @ $_REQUEST['token']);
		$sql = "SELECT * FROM pergunta";
		return $this->read($sql);
	}

    public function salvar(){
		$_user = validateJWT( @ $_REQUEST['token']);
		require_once('Helper.php');
		$_helper = new Helper();
		$cartao_sus = $_helper->removerCaracteres(addslashes(@ $_REQUEST['cartao_sus']));

		$this->nome = addslashes($_REQUEST['nome']);
		$this->dt_nascimento = addslashes($_REQUEST['dt_nascimento']);
		$this->idade = addslashes($_REQUEST['idade']);
		$this->cartao_sus = $cartao_sus;
		$this->dum = addslashes($_REQUEST['dum']);
		$this->dpp = addslashes($_REQUEST['dpp']);
		$this->ig = addslashes($_REQUEST['ig']);
		$this->parto = addslashes($_REQUEST['parto']);
		$this->idpaciente = $this->create();
		return $this->idpaciente;

	}
}
?>