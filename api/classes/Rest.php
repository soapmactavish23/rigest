<?php

class Rest {
	public static function open() {
		$uri = explode('api/', trim($_SERVER['REQUEST_URI'], '/'));
		array_shift($uri);
	
		$parametros = explode('/', @ $uri[0]);

		$classe = ucfirst( @ $parametros[0]);
		array_shift($parametros);
		
		$metodo = @ $parametros[0];
		array_shift($parametros);

		try {
			if ( file_exists('classes/'.$classe.'.php') ) {
				require_once ('classes/'.$classe.'.php');
				if (method_exists($classe, $metodo)) {
					$retorno = call_user_func_array(array(new $classe, $metodo), $parametros);
					return json_encode(array('status' => 'success', 'data' => $retorno));
				} else {
					return json_encode(array('status' => 'error', 'data' => 'Metodo inexistente'));
				}
			} else {
				return json_encode(array('status' => 'error', 'data' => 'Classe inexistente'));
			}	
		} catch (Exception $e) {
			return json_encode(array('status' => 'error', 'data' => $e->getMessage()));
		}
		
	}
}
