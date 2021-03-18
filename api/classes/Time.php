<?php

class Time extends ConnectionDB {
    public function salvar(){
		$_user = validateJWT(@ $_REQUEST['token']);
        $this->idtime = @ $_REQUEST['idtime'];
        $this->nome = addslashes(@ $_REQUEST['nome']);
        $this->sigla = @ $_REQUEST['sigla'];
        if ( @ $_REQUEST['ativado'] ) $this->ativado = 'S';
		else $this->ativado = 'N';
        
        require('Midia_Time.php');
        $_midia_time = new Midia_Time(); 

        if($this->idtime){
            $this->update();
        }else{
            $this->idtime = $this->create();
        }

        $_midia_time->salvar($this->idtime);

        return $this->idtime;
    }
    
    public function obterTodos(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT * FROM time";
        return $this->read($sql);
    }

    public function obterTimes(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT idtime, CONCAT(nome, ' - ', sigla) AS time FROM time";
        return $this->read($sql);
    }

    public function obterFoto(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT idmidia_time, base64 FROM midia_time WHERE time_id = ".$_REQUEST['time_id'];
        return $this->read($sql);
	}

    public function obterTodosDoCampeonato(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT id, idtime, nome, sigla, CONCAT(nome, ' / ' , sigla) AS time 
        FROM time t
        INNER JOIN time_campeonato tc
        ON tc.time_id = t.idtime
        WHERE campeonato_id = ".$_REQUEST['campeonato_id'];
        return $this->read($sql);
    }
    
    public function obterTodosSemCampeonato(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT idtime, nome, sigla, campeonato_id FROM time t
        LEFT JOIN time_campeonato tc
        ON tc.time_id = t.idtime
        WHERE campeonato_id IS NULL OR campeonato_id != ".$_REQUEST['campeonato_id'];
        return $this->read($sql);
    }
}
?>