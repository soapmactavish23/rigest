<?php

class Resposta extends ConnectionDB {
	public function obterPorPergunta(){
		$_user = validateJWT( @ $_REQUEST['token']);
		$sql = "SELECT * FROM resposta WHERE pergunta_id = ".$_REQUEST['pergunta_id'];
		return $this->read($sql);
	}
}
?>