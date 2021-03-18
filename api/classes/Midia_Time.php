<?php

class Midia_Time extends ConnectionDB {
    public function salvar($time_id){
		$_user = validateJWT(@ $_REQUEST['token']);
        $this->idmidia_time = @ $_REQUEST['idmidia_time'];
        $this->time_id = $time_id;
        $this->base64 = @ $_REQUEST['base64'];
        
        if($this->idmidia_time){
			$this->update();
        }else{
            $this->idmidia_time = $this->create();
        }

        return $this->idmidia_time;

    }
    
    public function obterFoto(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT idmidia_time, base64 FROM midia_time WHERE time_id = ".$_REQUEST['idtime'];
        return $this->read($sql);
	}
}
?>