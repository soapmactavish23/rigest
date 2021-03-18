<?php

class Conta extends ConnectionDB {
    public function salvar(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $_helper = new Helper();

        $this->idconta = @ $_REQUEST['idconta'];
        $this->banco = addslashes(@ $_REQUEST['banco']);
        $this->pessoa = addslashes(@ $_REQUEST['pessoa']);
        $this->conta = $_helper->removerCaracteres($_REQUEST['conta']);
        $this->agencia = @ $_REQUEST['agencia'];
        $this->tipo = addslashes(@ $_REQUEST['tipo']);
        $this->pix = addslashes(@ $_REQUEST['pix']);
        if ( @ $_REQUEST['ativado'] ) $this->ativado = 'S';
		else $this->ativado = 'N';
        
        require('Foto_Conta.php');
        $_foto = new Foto_Conta(); 

        if($this->idconta){
            $this->update();
        }else{
            $this->idconta = $this->create();
        }

        $_foto->salvar($this->idconta);

        return $this->idconta;
    }
    
    public function obterTodos(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT * FROM conta";
        return $this->read($sql);
    }

    public function obterFoto(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT idfoto_conta, base64 FROM foto_conta WHERE conta_id = ".$_REQUEST['idconta'];
        return $this->read($sql);
	}
}
?>