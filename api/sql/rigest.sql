-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.5.8-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para rigest
CREATE DATABASE IF NOT EXISTS `rigest` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `rigest`;

-- Copiando estrutura para tabela rigest.ficha
CREATE TABLE IF NOT EXISTS `ficha` (
  `idficha` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `paciente_id` int(11) NOT NULL,
  `risco` varchar(15) NOT NULL,
  `dt_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`idficha`),
  KEY `usuario_id` (`usuario_id`),
  KEY `paciente_id` (`paciente_id`),
  CONSTRAINT `FK__paciente` FOREIGN KEY (`paciente_id`) REFERENCES `paciente` (`idpaciente`),
  CONSTRAINT `FK__usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela rigest.ficha: ~0 rows (aproximadamente)
DELETE FROM `ficha`;
/*!40000 ALTER TABLE `ficha` DISABLE KEYS */;
/*!40000 ALTER TABLE `ficha` ENABLE KEYS */;

-- Copiando estrutura para tabela rigest.paciente
CREATE TABLE IF NOT EXISTS `paciente` (
  `idpaciente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `dt_nascimento` date NOT NULL,
  `idade` int(11) NOT NULL,
  `cartao_sus` varchar(15) NOT NULL,
  `dum` varchar(50) NOT NULL,
  `dpp` varchar(50) NOT NULL,
  `ig` varchar(50) NOT NULL,
  `parto` varchar(10) NOT NULL,
  `dt_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`idpaciente`),
  UNIQUE KEY `cartao_sus` (`cartao_sus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela rigest.paciente: ~0 rows (aproximadamente)
DELETE FROM `paciente`;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;

-- Copiando estrutura para tabela rigest.pergunta
CREATE TABLE IF NOT EXISTS `pergunta` (
  `idpergunta` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `risco` varchar(15) NOT NULL,
  PRIMARY KEY (`idpergunta`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela rigest.pergunta: ~8 rows (aproximadamente)
DELETE FROM `pergunta`;
/*!40000 ALTER TABLE `pergunta` DISABLE KEYS */;
INSERT INTO `pergunta` (`idpergunta`, `nome`, `risco`) VALUES
	(1, 'Características individuais e condições sociodemográficas', 'HABITUAL'),
	(2, 'Características individuais e condições', 'INTERMEDIÁRIO'),
	(3, 'História reprodutiva anterior', 'INTERMEDIÁRIO'),
	(4, 'Condições e intercorrências, clínicas obstétricas, na', 'INTERMEDIÁRIO'),
	(5, 'Características individuais e condições', 'ALTO'),
	(6, 'Condições clínicas prévias a gestação', 'ALTO'),
	(7, 'História reprodutiva anterior', 'ALTO'),
	(8, 'Intercorrências clínicas/obstétricas na gestação', 'ALTO');
/*!40000 ALTER TABLE `pergunta` ENABLE KEYS */;

-- Copiando estrutura para tabela rigest.resposta
CREATE TABLE IF NOT EXISTS `resposta` (
  `idresposta` int(11) NOT NULL AUTO_INCREMENT,
  `pergunta_id` int(11) NOT NULL,
  `resposta` varchar(500) NOT NULL,
  PRIMARY KEY (`idresposta`),
  KEY `pergunta_id` (`pergunta_id`),
  CONSTRAINT `FK_resposta_pergunta` FOREIGN KEY (`pergunta_id`) REFERENCES `pergunta` (`idpergunta`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela rigest.resposta: ~76 rows (aproximadamente)
DELETE FROM `resposta`;
/*!40000 ALTER TABLE `resposta` DISABLE KEYS */;
INSERT INTO `resposta` (`idresposta`, `pergunta_id`, `resposta`) VALUES
	(1, 1, 'Idade entre 16 a 34 anos'),
	(2, 1, 'Aceitação da gestação'),
	(3, 1, ' Intervalo interpartal maior que 2 anos e menor 5 anos'),
	(4, 1, 'Ausência de intercorrências clínicas e/ou obstétricas na gravidez anterior e na atual'),
	(5, 2, 'Idade menor que 15 anos ou maior que 35 anos'),
	(6, 2, 'Condições de trabalho desfavoráveis: esforço físico excessivo, carga horária extensa, exposição a agentes físicos, químicos e biológicos nocivos, níveis altos de estresse'),
	(7, 2, 'Situação conjugal insegura sem violência ou abuso'),
	(8, 2, 'Insuficiência de apoio familiar'),
	(9, 2, 'Capacidade de auto cuidado insuficiente, com apoio'),
	(10, 2, 'Não aceitação da gestação'),
	(11, 2, 'Baixa escolaridade'),
	(12, 2, 'Tabagismo ativo ou passivo'),
	(13, 2, 'Uso de medicamentos teratogênicos'),
	(14, 2, 'Altura menor que 1,45m'),
	(15, 2, 'IMC >18,5 ou 30-39kg/m²'),
	(16, 2, 'Transtorno depressivo ou de ansiedade leve'),
	(17, 2, 'Uso eventual de drogas lícitas ou ilícitas'),
	(18, 2, 'Gestante em situação de rua ou em comunidades indígenas'),
	(19, 2, 'Mulher de raça negra'),
	(20, 2, 'Infertilidade'),
	(21, 2, 'Outras condições de saúde de menor complexidade'),
	(22, 3, 'Alterações no crescimento intrauterino (CIUR e microssômica)'),
	(23, 3, 'Malformação'),
	(24, 3, 'Nuliparidade ou multiparidade (5 ou mais)'),
	(25, 3, 'Diabetes gestacional'),
	(26, 3, 'Síndrome hemorrágicas ou hipertensivas sem critérios de gravidade'),
	(27, 3, 'Cesariana prévia com incisão clássica/corporal/longitudinal'),
	(28, 3, 'Cesárias prévias (2 ou mais) ou cirurgia uterina anterior'),
	(29, 3, 'Intervalo interpartal < 2 anos ou > 5 anos'),
	(30, 3, 'Gestação múltipla'),
	(31, 3, 'Prematuridade anterior'),
	(32, 4, 'Infecção urinária (1 ou 2 ocorrências) ou um episódio de pielonefrite, se tiver condições de avaliar mensalmente com EAS'),
	(33, 4, 'Ganho de peso inadequado'),
	(34, 4, 'Sífilis (exceto sífilis terciária ou resistente ao tratamento com penicilina benzatina e achados ecográficos suspeitos de sífilis congênita); hepatites B (seguir fluxo de notificação para solicitação de imunoglobulina)'),
	(35, 4, 'Suspeita ou confirmação de dengue, vírus Zika ou chikungunya, (quadro febril exantemático), H1N1, COVID-19, condiloma acuminado (verruga viral no canal vaginal ou colo uterino ou lesões extensas/numerosas localizadas em região genital ou perianal); diagnóstico de HIV/AIDS (seguir fluxo para agendar parto no hospital de referência)'),
	(36, 4, 'Arritmia cardíaca fetal (referenciar para FHCGV)'),
	(37, 4, 'Gestação múltipla'),
	(38, 4, 'Gestante Rh negativo, pai Rh positivo, Coombs indireto negativo (seguir fluxo para agendar parto em maternidade de refrencia)'),
	(39, 5, 'Indícios ou ocorrência de violência'),
	(40, 5, 'Dependência e/ou uso abusivo de drogas lícitas ou ilícitas CAPS'),
	(41, 5, 'Agravos alimentares ou nutricionais: IMC ≥ 40 kg/m² ou < 18.5kg/m², desnutrição, carências nutricionais (hipovitaminoses) e transtornos alimentares (anorexia nervosa, bulimia, outros)'),
	(42, 5, 'Capacidade de auto cuidado insuficiente, sem apoio'),
	(43, 6, 'Doença psiquiátrica grave: psicose, depressão grave, transtorno bipolar, outras'),
	(44, 6, 'Hipertensão arterial crônica descompensada'),
	(45, 6, 'Antecedentes de trombo embolismo (TVP ou embolia pulmonar)'),
	(46, 6, 'Cardiopatias (valvulopatias, arritmias e endocardite) ou infarto agudo do miocárdio, com pré-natal complementar de alto risco no ambulatório do FHCGV'),
	(47, 6, 'Pneumopatias graves (asma em uso de medicamento continuo, e fibrose cística)'),
	(48, 6, 'Nefropatias graves (insuficiência renal e rins multicísticos)'),
	(49, 6, 'Endócrinopatias (Diabetes mellitus 1 e 2, e gestacional, hipotireoidismo e hipertireoidismo)'),
	(50, 6, 'Doenças hematológicas: doença falciforme, púrpura trombocitopênica idiopática, talassemia e coagulopatias'),
	(51, 6, 'Doenças neurológicas (epilepsia descompensada, acidente vascular cerebral, déficit motores graves)'),
	(52, 6, 'Doenças auto-imunes (lúpus eritematoso, SAF, artrite\r\nreumatóide, outras colagenoses)'),
	(53, 6, 'Ginecopatias sintomáticas (malformações uterinas, útero bicorno, miomas intramurais maiores que 4cm ou múltiplos miomas submucosos)'),
	(54, 6, 'Câncer de origem ginecológica ou invasores; Câncer em tratamento ou que possa repercutir na gravidez'),
	(55, 6, 'Transplantes'),
	(56, 6, 'Cirurgia bariátrica'),
	(57, 7, 'Morte perinatal inexplicada'),
	(58, 7, 'Abortamento habitual/ recorrente (ocorrência de 3 ou mais abortamentos consecutivos)'),
	(59, 7, 'Isoimunização Rh em gestação anterior'),
	(60, 7, 'Insuficiência cervical'),
	(61, 7, 'Acretismo placentário, placenta prévia'),
	(62, 7, 'Pré-eclâmpsia grave; síndrome HELLP'),
	(63, 8, 'Gestação resultante de estupro'),
	(64, 8, 'Hipertensão gestacional ou pré-eclâmpsia descompensada'),
	(65, 8, 'Diabetes gestacional'),
	(66, 8, 'Infecção urinária de repetição: maior ou igual a 3 episódios de ITU; maior ou igual dois episódios de pielonefrite'),
	(67, 8, 'Doenças infecciosas: sífilis terciária ou resistente ao tratamento com penicilina benzatina ou com achados ecográficos suspeitos de sífilis congênita, toxoplasmose, rubéola, citomegalovírus, herpes simples (com sintomatologia clínica atual), tuberculose e hanseníase (forma ativa)'),
	(68, 8, 'Desvios do crescimento intra-uterino: CIUR (mesmo suspeito, se o ultrassom não disponível), desvio da quantidade de líquido amniótico'),
	(69, 8, 'Insuficiência istmo cervical'),
	(70, 8, 'Anemia grave (hemoglobina menor que 8g/dL) ou anemia refratária a tratamento'),
	(71, 8, 'Hemorragias na gestação'),
	(72, 8, 'Acretismo placentário ou placenta prévia'),
	(73, 8, 'Colestase gestacional (prurido gestacional ou icterícia persistente)'),
	(74, 8, 'Malformação fetal (referenciar para FSCMP)'),
	(75, 8, 'Qualquer patologia clínica que repercutem na gestação ou necessite de acompanhamento clínico especializado'),
	(76, 8, 'Outras condições de saúde de maior complexidade');
/*!40000 ALTER TABLE `resposta` ENABLE KEYS */;

-- Copiando estrutura para tabela rigest.resposta_ficha
CREATE TABLE IF NOT EXISTS `resposta_ficha` (
  `idperguntas` int(11) NOT NULL AUTO_INCREMENT,
  `ficha_id` int(11) NOT NULL,
  `resposta_id` int(11) NOT NULL,
  PRIMARY KEY (`idperguntas`),
  KEY `ficha_id` (`ficha_id`),
  KEY `pergunta_id` (`resposta_id`) USING BTREE,
  CONSTRAINT `FK__ficha` FOREIGN KEY (`ficha_id`) REFERENCES `ficha` (`idficha`),
  CONSTRAINT `FK_resposta_ficha_resposta` FOREIGN KEY (`resposta_id`) REFERENCES `resposta` (`idresposta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela rigest.resposta_ficha: ~0 rows (aproximadamente)
DELETE FROM `resposta_ficha`;
/*!40000 ALTER TABLE `resposta_ficha` DISABLE KEYS */;
/*!40000 ALTER TABLE `resposta_ficha` ENABLE KEYS */;

-- Copiando estrutura para tabela rigest.transacao
CREATE TABLE IF NOT EXISTS `transacao` (
  `idtransacao` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NOT NULL,
  `transacao` varchar(100) NOT NULL,
  `dtTransacao` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idtransacao`),
  KEY `fk_transacao_usuario1_idx` (`idusuario`),
  CONSTRAINT `FK_transacao_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela rigest.transacao: ~0 rows (aproximadamente)
DELETE FROM `transacao`;
/*!40000 ALTER TABLE `transacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `transacao` ENABLE KEYS */;

-- Copiando estrutura para tabela rigest.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(70) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `contato` varchar(15) NOT NULL,
  `cartao_sus` varchar(20) NOT NULL,
  `cbo` varchar(10) NOT NULL,
  `permissao` text NOT NULL,
  `ativado` char(1) NOT NULL DEFAULT 'S',
  `dt_update` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `contato` (`contato`),
  UNIQUE KEY `cpf_UNIQUE` (`cartao_sus`) USING BTREE,
  KEY `cbo` (`cbo`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela rigest.usuario: ~4 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`idusuario`, `nome`, `email`, `senha`, `contato`, `cartao_sus`, `cbo`, `permissao`, `ativado`, `dt_update`) VALUES
	(13, 'Administrador', 'admin@admin.com', '21232f297a57a5a743894a0e4a801fc3', '88888888888', '21307420842', '123456', 'home,cadastrar-ficha,consultar-ficha,consultar-ficha-geral,usuario', 'S', '2021-03-19 00:25:48'),
	(18, 'Eduarda Isadora da Mata', 'eduardaisadoradamata__eduardaisadoradamata@manjubi', '82ec6a42513fe6c282811c8f5b2fe490', '43986798089', '61541511441', '', 'usuario', 'S', '2021-03-17 23:49:48'),
	(19, 'Mariane Tânia Campos', 'marianetaniacampos..marianetaniacampos@chalu.com.b', 'e10adc3949ba59abbe56e057f20f883e', '54996666046', '59425098590', '', 'usuario', 'S', '2021-03-17 23:53:34'),
	(20, 'Tiago Roberto Breno Lopes', 'thiago@webin.com.br', 'e10adc3949ba59abbe56e057f20f883e', '88987776467', '49904493049', '', 'usuario', 'S', '2021-03-17 23:55:00'),
	(21, 'Pietro Thomas Yago Moraes', 'pietrothomasyagomoraes..pietrothomasyagomoraes@iar', 'e10adc3949ba59abbe56e057f20f883e', '68992271796', '266009256010009', '12345', 'usuario', 'S', '2021-03-18 21:23:43');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
