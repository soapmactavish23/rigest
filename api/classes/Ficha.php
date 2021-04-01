<?php

class Ficha extends ConnectionDB {

	public function obterTodos () {
		$_user = validateJWT( @ $_REQUEST['token']);
		$sql = "SELECT idficha, paciente_id, p.nome, p.dt_nascimento, p.idade, p.cartao_sus, p.dum, p.dpp, p.ig, f.dt_update, risco 
        FROM ficha f
        INNER JOIN paciente p
        ON f.paciente_id = p.idpaciente";
		return $this->read($sql);
	}

	public function obterTodosDoUsuario () {
		$_user = validateJWT( @ $_REQUEST['token']);
		$sql = "SELECT idficha, paciente_id, p.nome, p.dt_nascimento, p.idade, p.cartao_sus, p.dum, p.dpp, p.ig, f.dt_update, risco
        FROM ficha f
        INNER JOIN paciente p
        ON f.paciente_id = p.idpaciente
        WHERE f.usuario_id = ".$_user->idusuario;
		return $this->read($sql);
	}

    public function obterRespostas(){
        $_user = validateJWT( @ $_REQUEST['token']);

        $sql = "SELECT resposta_id, resposta, risco
        FROM resposta_ficha rf
        INNER JOIN resposta r
        ON r.idresposta = rf.resposta_id
        INNER JOIN pergunta p
        ON p.idpergunta = r.pergunta_id
        WHERE ficha_id = ".$_REQUEST['ficha_id'];
        
        return $this->read($sql);
    }

    public function salvar(){
        $_user = validateJWT( @ $_REQUEST['token']);

        require_once('Paciente.php');
        $_paciente = new Paciente();
        
        require_once('Resposta_Ficha.php');
        $_resposta_ficha = new Resposta_Ficha();
		
        $this->idficha = @ $_REQUEST['idficha'];
        $this->usuario_id = $_user->idusuario; 
        $this->paciente_id = $_paciente->salvar();
        $this->risco = addslashes(@ $_REQUEST['risco']);

        if($this->idficha){
            $this->dt_update = date('Y-m-d H:i:s');
			$this->update();
        }else{
            $this->idficha = $this->create();
            $_resposta_ficha->salvar($this->idficha);
        }

        return $this->idficha;

	}
}
?>