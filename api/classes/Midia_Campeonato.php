<?php

class Midia_Campeonato extends ConnectionDB {
    public function salvar($campeonato_id){
		$_user = validateJWT(@ $_REQUEST['token']);
        $this->idmidia_campeonato = @ $_REQUEST['idmidia_campeonato'];
        $this->campeonato_id = $campeonato_id;
        $this->base64 = @ $_REQUEST['base64'];
        
        if($this->idmidia_campeonato){
			$this->update();
        }else{
            $this->idmidia_campeonato = $this->create();
        }

        return $this->idmidia_campeonato;

    }
    
    public function obterFoto(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT idmidia_campeonato, base64 FROM midia_campeonato WHERE campeonato_id = ".$_REQUEST['idcampeonato'];
        return $this->read($sql);
    }

}
?>