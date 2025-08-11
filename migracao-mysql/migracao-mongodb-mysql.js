// Importando os módulos necessários
import { MongoClient } from 'mongodb'; // Cliente para conexão com MongoDB
import mysql from 'mysql2/promise'; // Cliente para conexão com MySQL (versão com suporte a Promises)

// Configurações de conexão com o MongoDB
const mongoConfig = {
  url: 'mongodb://localhost:27017', // URL de conexão do MongoDB
  dbName: 'meuBancoDeDados', // Nome do banco de dados MongoDB
};

// Configurações de conexão com o MySQL
const mysqlConfig = {
  host: 'localhost', // Endereço do servidor MySQL
  port: 3306, // Porta padrão do MySQL
  database: 'bancoxneedware', // Nome do banco de dados MySQL
  user: 'root', // Nome de usuário do MySQL
  password: '', // Senha do MySQL
  waitForConnections: true, // Aguardar por conexões disponíveis
  connectionLimit: 10, // Limite máximo de conexões simultâneas
};

/**
 * Função principal que orquestra todo o processo de migração
 * Esta função conecta aos dois bancos de dados e coordena a transferência de dados
 */
async function migrarDados() {
  console.log('Iniciando migração de dados do MongoDB para MySQL...');
  
  // Variáveis para armazenar as conexões com os bancos de dados
  let mongoClient = null;
  let mysqlConnection = null;
  
  try {
    // ETAPA 1: Conectar ao MongoDB
    mongoClient = new MongoClient(mongoConfig.url);
    await mongoClient.connect();
    console.log('✓ Conectado ao MongoDB com sucesso');
    
    const db = mongoClient.db(mongoConfig.dbName);
    
    // ETAPA 2: Conectar ao MySQL
    // Criamos um pool de conexões para melhor gerenciamento de recursos
    mysqlConnection = await mysql.createConnection(mysqlConfig);
    console.log('✓ Conectado ao MySQL com sucesso');
    
    // ETAPA 3: Criar as tabelas no MySQL (se não existirem)
    // Aqui definimos o esquema relacional que vai receber os dados do MongoDB
    console.log('Criando tabelas no MySQL (se não existirem)...');
    
    // Tabela principal para armazenar os dados básicos dos usuários
    await mysqlConnection.execute(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255),
        email VARCHAR(255),
        data_criacao DATETIME
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    
    // Tabela para armazenar os endereços (relacionamento 1:1 ou 1:N com usuários)
    await mysqlConnection.execute(`
      CREATE TABLE IF NOT EXISTS enderecos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario_id VARCHAR(255),
        rua VARCHAR(255),
        cidade VARCHAR(255),
        estado VARCHAR(50),
        cep VARCHAR(20),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    
    // Tabela para armazenar os interesses (relacionamento N:M com usuários)
    await mysqlConnection.execute(`
      CREATE TABLE IF NOT EXISTS interesses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario_id VARCHAR(255),
        interesse VARCHAR(255),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    
    console.log('✓ Tabelas criadas/verificadas com sucesso');
    
    // ETAPA 4: Buscar os documentos do MongoDB
    // Aqui obtemos todos os documentos da coleção 'usuarios'
    const colecao = db.collection('usuarios');
    const documentos = await colecao.find({}).toArray();
    
    console.log(`Encontrados ${documentos.length} documentos na coleção 'usuarios'`);
    
    // ETAPA 5: Processar e inserir cada documento no MySQL
    console.log('Iniciando transferência de dados...');
    
    // Contador para acompanhar o progresso
    let contador = 0;
    
    // Para cada documento no MongoDB, vamos processá-lo e inseri-lo no MySQL
    for (const doc of documentos) {
      // Iniciar uma transação para garantir a consistência dos dados
      await mysqlConnection.beginTransaction();
      
      try {
        // 5.1: Inserir dados principais do usuário
        // Convertemos o ObjectId do MongoDB para string para usar como chave primária
        const userId = doc._id.toString();
        
        // Preparar a data de criação (ou usar a data atual se não existir)
        const dataCriacao = doc.dataCriacao ? new Date(doc.dataCriacao) : new Date();
        
        // Inserir na tabela de usuários
        // Usamos REPLACE INTO para lidar com possíveis duplicações (atualiza se já existir)
        await mysqlConnection.execute(
          'REPLACE INTO usuarios (id, nome, email, idade, data_criacao) VALUES (?, ?, ?, ?, ?)',
          [
            userId,
            doc.nome || null, // Usar null se o campo não existir
            doc.email || null,
            doc.idade || null,
            dataCriacao
          ]
        );
        
        // 5.2: Processar e inserir o endereço (se existir)
        // Documentos MongoDB podem ter objetos aninhados que precisam ser normalizados
        if (doc.endereco) {
          await mysqlConnection.execute(
            'INSERT INTO enderecos (usuario_id, rua, cidade, estado, cep) VALUES (?, ?, ?, ?, ?)',
            [
              userId,
              doc.endereco.rua || null,
              doc.endereco.cidade || null,
              doc.endereco.estado || null,
              doc.endereco.cep || null
            ]
          );
        }
        
        // 5.3: Processar e inserir os interesses (se existirem)
        // Arrays no MongoDB são transformados em múltiplas linhas na tabela de interesses
        if (Array.isArray(doc.interesses)) {
          // Para cada interesse no array, criamos um registro na tabela de interesses
          for (const interesse of doc.interesses) {
            await mysqlConnection.execute(
              'INSERT INTO interesses (usuario_id, interesse) VALUES (?, ?)',
              [userId, interesse]
            );
          }
        }
        
        // Confirmar a transação após processar o documento completo
        await mysqlConnection.commit();
        
        // Incrementar o contador e mostrar progresso
        contador++;
        if (contador % 10 === 0 || contador === documentos.length) {
          console.log(`Progresso: ${contador}/${documentos.length} documentos processados`);
        }
      } catch (error) {
        // Em caso de erro, reverter a transação para manter a consistência
        await mysqlConnection.rollback();
        console.error(`Erro ao processar documento ${doc._id}:`, error);
      }
    }
    
    // ETAPA 6: Verificar os resultados da migração
    console.log('Migração concluída! Verificando resultados...');
    
    // Consultar o número de registros em cada tabela para confirmar a migração
    const [usuariosCount] = await mysqlConnection.execute('SELECT COUNT(*) as total FROM usuarios');
    const [enderecosCount] = await mysqlConnection.execute('SELECT COUNT(*) as total FROM enderecos');
    const [interessesCount] = await mysqlConnection.execute('SELECT COUNT(*) as total FROM interesses');
    
    // Exibir estatísticas da migração
    console.log(`
Estatísticas da migração:
- Usuários: ${usuariosCount[0].total}
- Endereços: ${enderecosCount[0].total}
- Interesses: ${interessesCount[0].total}
    `);
    
  } catch (error) {
    // Tratamento de erros gerais da migração
    console.error('ERRO FATAL durante a migração:', error);
  } finally {
    // ETAPA 7: Fechar todas as conexões, independentemente do resultado
    console.log('Fechando conexões com os bancos de dados...');
    
    if (mongoClient) {
      await mongoClient.close();
    }
    
    if (mysqlConnection) {
      await mysqlConnection.end();
    }
    
    console.log('✓ Conexões fechadas. Processo de migração finalizado.');
  }
}

// Executar a função principal e tratar erros não capturados
migrarDados().catch(error => {
  console.error('Erro não tratado:', error);
  process.exit(1); // Sair com código de erro
});

// Explicação adicional do processo de normalização:
/*
 * PROCESSO DE NORMALIZAÇÃO DE DADOS DO MONGODB PARA MYSQL:
 * 
 * 1. Documentos MongoDB -> Tabelas Relacionais:
 *    - Cada tipo de documento se torna uma tabela principal
 *    - O _id do MongoDB se torna a chave primária (convertido para string)
 * 
 * 2. Campos simples -> Colunas:
 *    - Campos como nome, email, idade são mapeados diretamente para colunas
 * 
 * 3. Objetos aninhados -> Tabelas relacionadas:
 *    - Objetos como 'endereco' se tornam registros em tabelas separadas
 *    - Relacionados pela chave estrangeira (usuario_id)
 * 
 * 4. Arrays -> Tabelas de relacionamento:
 *    - Arrays como 'interesses' se tornam múltiplas linhas em uma tabela separada
 *    - Cada elemento do array vira um registro relacionado ao usuário
 * 
 * 5. Tipos de dados:
 *    - ObjectId -> VARCHAR (string)
 *    - String -> VARCHAR ou TEXT
 *    - Number -> INT, FLOAT, etc.
 *    - Date -> DATETIME
 *    - Boolean -> TINYINT(1)
 *    - Null -> NULL
 */