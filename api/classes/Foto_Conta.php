<?php

class Foto_Conta extends ConnectionDB {
    public function salvar($conta_id){
        $_user = validateJWT(@ $_REQUEST['token']);

        $this->idfoto_conta = $_REQUEST['idfoto_conta'];
        $this->conta_id = $conta_id;
        $this->base64 = @ $_REQUEST['base64'];

        if($this->idfoto_conta){
            $this->update();
        }else{
            $this->idfoto_conta = $this->create();
        }

        return 'foto salva';
    }
    
}
?>