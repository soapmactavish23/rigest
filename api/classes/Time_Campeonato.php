<?php

class Time_Campeonato extends ConnectionDB {
    
    public function salvar($campeonato_id){
        $_user = validateJWT(@ $_REQUEST['token']);
        $this->campeonato_id = $campeonato_id;
        $this->time_id = $_REQUEST['time_id'];
        $this->id = $this->create();
        return "Time Campeonato salvo";
    }

    public function obter(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT time_id FROM time_campeonato WHERE campeonato_id = ".$_REQUEST['campeonato_id'];
        return $this->read($sql);
    }

    public function excluir() {
		$_user = validateJWT( @ $_REQUEST['token']);
		if ( ! @ $_REQUEST['id'] ) throw new Exception("parametro inexistente");
		$this->id = $_REQUEST['id'];
		return $this->delete();
	}

}
?>