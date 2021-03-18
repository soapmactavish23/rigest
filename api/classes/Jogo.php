<?php

class Jogo extends ConnectionDB {
    
    public function salvar(){
		$_user = validateJWT(@ $_REQUEST['token']);
        $this->idjogo = @ $_REQUEST['idjogo'];
        $this->rodada_id = @ $_REQUEST['rodada_id'];
        $this->time1 = @ $_REQUEST['time1'];
        $this->time2 = @ $_REQUEST['time2'];
        $this->dt_jogo = @ $_REQUEST['dt_jogo'];

        if($this->idjogo){
            $this->dt_update = $this->update();
        }else{
            $this->idjogo = $this->create();
        }

        return $this->idjogo;
    }

    public function obterTodos(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT idjogo, campeonato_id,time1, t1.nome AS nome_time1, time2, t2.nome AS nome_time2, dt_jogo, dt_update 
        FROM jogo j
        INNER JOIN time t1
        ON t1.idtime = time1
        INNER JOIN time t2
        ON t2.idtime = time2
        WHERE rodada_id = ".$_REQUEST['rodada_id'];
        return $this->read($sql);
    }

    public function excluir() {
		$_user = validateJWT( @ $_REQUEST['token']);
		if ( ! @ $_REQUEST['idjogo'] ) throw new Exception("parametro inexistente");
		$this->idjogo = $_REQUEST['idjogo'];
		return $this->delete();
	}

}
?>