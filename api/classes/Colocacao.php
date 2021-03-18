<?php
class Colocacao extends ConnectionDB {
    public function salvar(){
		$_user = validateJWT(@ $_REQUEST['token']);
        $this->idcolocacao = @ $_REQUEST['idcolocacao'];
        $this->colocacao = addslashes(@ $_REQUEST['colocacao']);
        $this->porcentagem = addslashes(@ $_REQUEST['porcentagem']);

        if($this->idcolocacao){
            $this->update();
        }else{
            $this->idcolocacao = $this->create();
        }

        return $this->idcolocacao;
    }
    
    public function obterTodos(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT * FROM colocacao";
        return $this->read($sql);
    }
}
?>