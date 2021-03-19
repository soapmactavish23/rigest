<?php

class Pergunta extends ConnectionDB {

	public function obterTodos () {
		$_user = validateJWT( @ $_REQUEST['token']);
		$sql = "SELECT * FROM pergunta";
		return $this->read($sql);
	}
}
?>