<?php

class Rodada extends ConnectionDB {
    public function salvar(){
		$_user = validateJWT(@ $_REQUEST['token']);
        $this->idrodada = @ $_REQUEST['idrodada'];
        $this->nome = addslashes(@ $_REQUEST['nome']);
        $this->valor = addslashes(@ $_REQUEST['valor']);
        $this->taxa = addslashes(@ $_REQUEST['taxa']);
        $this->dt_inicio = @ $_REQUEST['dt_inicio'];
        $this->dt_fim = @ $_REQUEST['dt_fim'];
        $this->dt_inicio_inscricao = @ $_REQUEST['dt_inicio_inscricao'];
        $this->dt_fim_inscricao = @ $_REQUEST['dt_fim_inscricao'];

        if($this->idrodada){
            $this->update();
        }else{
            $this->idrodada = $this->create();
        }

        return $this->idrodada;
    }
    
    public function obterTodos(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT * FROM rodada";
        return $this->read($sql);
    }

    public function obterTodosDaRodada(){
        require_once("Rodada_Campeonato.php");
        $_rodada_campeonato = new Rodada_Campeonato();
        return $_rodada_campeonato->obter();
    }
}
?>