<?php

class Midia extends ConnectionDB {
    public function salvarFotoPerfil(){
		$_user = validateJWT(@ $_REQUEST['token']);
        $this->idmidia = @ $_REQUEST['idmidia'];
        $this->usuario_id = $_user->idusuario;
        $this->base64 = @ $_REQUEST['base64'];
        $this->nome = @ $_REQUEST['nome'];
        
        if($this->idmidia){
            $this->dt_update = date('Y-m-d H:i:s');
			$this->update();
        }else{
            $this->idmidia = $this->create();
        }

        return $this->idmidia;

	}

    public function obterIdFotoPerfil(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT idmidia FROM midia WHERE nome LIKE 'foto_perfil' AND usuario_id = ".$_REQUEST['idusuario'];
        return $this->read($sql);
    }

	public function obterFotoPerfil(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT idmidia, base64 FROM midia WHERE nome LIKE 'foto_perfil' AND usuario_id = ".$_REQUEST['idusuario'];
        return $this->read($sql);
	}
}
?>