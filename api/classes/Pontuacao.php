<?php
class Pontuacao extends ConnectionDB {
    public function salvar(){
		$_user = validateJWT(@ $_REQUEST['token']);
        $this->idpontuacao = @ $_REQUEST['idpontuacao'];
        $this->nome = addslashes(@ $_REQUEST['nome']);
        $this->porcentagem = addslashes(@ $_REQUEST['porcentagem']);

        if($this->idpontuacao){
            $this->update();
        }else{
            $this->idpontuacao = $this->create();
        }

        return $this->idpontuacao;
    }
    
    public function obterTodos(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT * FROM pontuacao";
        return $this->read($sql);
    }
}
?>