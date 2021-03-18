<?php

class Rodada_Campeonato extends ConnectionDB {
    
    public function salvar($rodada_id){
        $_user = validateJWT(@ $_REQUEST['token']);
        $this->rodada_id = $rodada_id;
        
        for($i = 0; $i < sizeof($_REQUEST['campeonato']); $i++){
        
            $this->campeonato_id = @ $_REQUEST['campeonato'][$i];
            $this->create();
        }

        return "campeonato rodada salvo";

    }

    public function obter(){
        $_user = validateJWT(@ $_REQUEST['token']);
        $sql = "SELECT campeonato_id FROM rodada_campeonato
        WHERE rodada_id = ".$_REQUEST['rodada_id'];
        return $this->read($sql);
    }

}
?>