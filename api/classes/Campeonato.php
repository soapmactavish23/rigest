<?php

class Campeonato extends ConnectionDB {
    public function salvar(){
		$_user = validateJWT(@ $_REQUEST['token']);
        $this->idcampeonato = @ $_REQUEST['idcampeonato'];
        $this->nome = addslashes(@ $_REQUEST['nome']);
        $this->dt_inicial = @ $_REQUEST['dt_inicial'];
        $this->dt_final = @ $_REQUEST['dt_final'];
        $this->ano = @ $_REQUEST['ano'];

        if($this->idcampeonato){
            $this->idcampeonato = $this->update();
        }else{
            $this->idcampeonato = $this->create();
        }

        require('Midia_Campeonato.php');
        $_midia_campeonato = new Midia_Campeonato();
        $_midia_campeonato->salvar($this->idcampeonato);

        return $this->idcampeonato;
    }

    public function obterTodos(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT * FROM campeonato";
        return $this->read($sql);
    }

    public function obterNomes(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT idcampeonato, nome FROM campeonato";
        return $this->read($sql);
    }

    public function obterFoto(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT idmidia_campeonato, base64 FROM midia_campeonato WHERE campeonato_id = ".$_REQUEST['campeonato_id'];
        return $this->read($sql);
    }

    public function addTime(){
        $_user = validateJWT(@ $_REQUEST['token']);
        
        $this->idcampeonato = @ $_REQUEST['campeonato_id'];

        require_once("Time_Campeonato.php");
        $_t = new Time_Campeonato();
        
        return $_t->salvar($this->idcampeonato);
    }

    public function rmTime(){
        $_user = validateJWT(@ $_REQUEST['token']);
        require_once("Time_Campeonato.php");
        $_t = new Time_Campeonato();
        return $_t->excluir();
    }
    
    public function obterTimeCampeonato(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT time_id FROM time_campeonato WHERE campeonato_id = ".$_REQUEST['campeonato_id'];
        return $this->read($sql);
    }

}
?>