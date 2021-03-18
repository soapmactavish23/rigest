<?PHP

# carrega classe MYSQLi
require_once "phpmailer/class.phpmailer.php";

class Mail extends PHPMailer {

	// Configuração dos dados do servidor e tipo de conexão (Estes dados você obtem com seu host)
	public function __construct() {
		// Define que a mensagem será SMTP
		$this->IsSMTP();
		// Endereço do servidor SMTP
		$this->Host = SMTP_HOST; 
		$this->Port = SMTP_PORT;
		// Autenticação (True: Se o email será autenticado ou False: se o Email não será autenticado)
		$this->SMTPAuth = SMTP_AUTH; 
		// Usuário do servidor SMTP
		$this->Username = SMTP_USER; 
		// A Senha do email indicado acima
		$this->Password = SMTP_PASSWD; 
		// Remetente (Identificação que será mostrada para quem receber o email)
		$this->From = SMTP_FROM;
		$this->FromName = SMTP_FROM_NAME;
		// Define que o e-mail será enviado como HTML
		$this->IsHTML(true); 
		$this->CharSet = 'UTF-8';
	}

}

?>