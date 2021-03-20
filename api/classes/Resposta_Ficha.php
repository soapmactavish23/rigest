<?php

class Resposta_Ficha extends ConnectionDB {

    public function salvar($ficha_id){
		$_user = validateJWT(@ $_REQUEST['token']);
		require_once('Helper.php');
		
		$this->ficha_id = $ficha_id;
		for($i = 0; $i < sizeof($_REQUEST['respostas']); $i++){
			$this->resposta_id = @ $_REQUEST['respostas'][$i];
			$this->create();
		}

	}
}
?>