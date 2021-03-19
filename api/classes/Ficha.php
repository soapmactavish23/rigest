<?php

class Paciente extends ConnectionDB {

	public function obterTodos () {
		$_user = validateJWT( @ $_REQUEST['token']);
		$sql = "SELECT * FROM pergunta";
		return $this->read($sql);
	}

    public function salvar(){
        $_user = validateJWT( @ $_REQUEST['token']);

        require_once('Paciente.php');
        $_paciente = new Paciente();
        
        require_once('Paciente.php');
        $_paciente = new Paciente();
		
        $this->idficha = @ $_REQUEST['idficha'];
        $this->usuario_id = $_user->idusuario; 
        $this->paciente_id = $_paciente->salvar();
        $this->risco = addcslashes(@ $_REQUEST['risco']);

        if($this->idficha){
            $this->dt_update = date('Y-m-d H:i:s');
			$this->update();
        }else{    
            $this->idficha = $this->create();

        }

        return $this->idficha;

	}
}
?>