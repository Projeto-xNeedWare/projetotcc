export default function InstalacaoPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">🛠️ Instalação e Configuração</h1>

      <div className="prose max-w-none">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">📋 Passo a Passo</h3>
          <p>Siga estas etapas na ordem para configurar o ambiente completo.</p>
        </div>

        <h2>1. Preparação do Ambiente</h2>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm my-6">
          <div className="mb-2"># 1. Criar diretório do projeto</div>
          <div className="mb-4">mkdir migracao-mongodb-mysql</div>
          <div className="mb-4">cd migracao-mongodb-mysql</div>

          <div className="mb-2"># 2. Criar ambiente virtual Python</div>
          <div className="mb-4">python -m venv venv</div>

          <div className="mb-2"># 3. Ativar ambiente virtual</div>
          <div className="mb-2"># Windows:</div>
          <div className="mb-2">venv\Scripts\activate</div>
          <div className="mb-2"># Linux/Mac:</div>
          <div className="mb-4">source venv/bin/activate</div>

          <div className="mb-2"># 4. Criar estrutura de pastas</div>
          <div>mkdir -p config logs backup dados scripts tests src</div>
        </div>

        <h2>2. Instalação de Dependências</h2>

        <p>
          Primeiro, crie o arquivo <code>requirements.txt</code>:
        </p>

        <div className="bg-gray-50 p-4 rounded-lg border my-6">
          <h4 className="font-semibold mb-2">📄 requirements.txt</h4>
          <pre className="text-sm overflow-auto">
            {`# Conectores de banco de dados
pymongo==4.6.0
mysql-connector-python==8.2.0

# Manipulação de dados
pandas==2.1.4
numpy==1.24.3

# Configuração e ambiente
python-dotenv==1.0.0
pyyaml==6.0.1

# Validação de dados
jsonschema==4.20.0
cerberus==1.3.5

# Logs e monitoramento
colorlog==6.8.0
tqdm==4.66.1

# Utilitários
click==8.1.7
tabulate==0.9.0

# Testes (opcional)
pytest==7.4.3
pytest-cov==4.1.0`}
          </pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm my-6">
          <div className="mb-2"># Instalar dependências</div>
          <div>pip install -r requirements.txt</div>
        </div>

        <h2>3. Configuração de Ambiente</h2>

        <p>
          Crie o arquivo <code>.env</code> na raiz do projeto:
        </p>

        <div className="bg-gray-50 p-4 rounded-lg border my-6">
          <h4 className="font-semibold mb-2">📄 .env</h4>
          <pre className="text-sm overflow-auto">
            {`# ===========================================
# CONFIGURAÇÕES MONGODB
# ===========================================
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DATABASE=seu_banco_mongo
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_AUTH_SOURCE=admin

# ===========================================
# CONFIGURAÇÕES MYSQL
# ===========================================
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=seu_banco_mysql
MYSQL_USERNAME=root
MYSQL_PASSWORD=
MYSQL_CHARSET=utf8mb4

# ===========================================
# CONFIGURAÇÕES DE MIGRAÇÃO
# ===========================================
BATCH_SIZE=1000
MAX_RETRIES=3
BACKUP_ENABLED=true
VALIDATE_DATA=true
LOG_LEVEL=INFO
PRESERVE_ORIGINAL_DATA=true

# ===========================================
# CONFIGURAÇÕES DE SEGURANÇA
# ===========================================
ENCRYPTION_KEY=sua_chave_secreta_aqui
BACKUP_RETENTION_DAYS=30`}
          </pre>
        </div>

        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 my-8">
          <h3 className="text-xl font-semibold text-amber-800 mb-2">⚠️ Importante</h3>
          <ul className="mt-2">
            <li>
              Substitua <code>seu_banco_mongo</code> pelo nome do seu banco MongoDB
            </li>
            <li>
              Substitua <code>seu_banco_mysql</code> pelo nome do seu banco MySQL
            </li>
            <li>Configure as credenciais de acesso aos bancos</li>
            <li>
              Nunca commite o arquivo <code>.env</code> no Git
            </li>
          </ul>
        </div>

        <h2>4. Verificação da Instalação</h2>

        <p>Teste se tudo foi instalado corretamente:</p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm my-6">
          <div className="mb-2"># Verificar se o ambiente virtual está ativo</div>
          <div className="mb-4">which python</div>

          <div className="mb-2"># Listar pacotes instalados</div>
          <div className="mb-4">pip list</div>

          <div className="mb-2"># Testar importações principais</div>
          <div className="mb-2">python -c "import pymongo; print('MongoDB OK')"</div>
          <div className="mb-2">python -c "import mysql.connector; print('MySQL OK')"</div>
          <div>python -c "import yaml; print('YAML OK')"</div>
        </div>

        <h2>5. Estrutura Final</h2>

        <p>Após a instalação, sua estrutura deve ficar assim:</p>

        <div className="bg-gray-50 p-4 rounded-lg border my-6">
          <pre className="text-sm">
            {`📁 migracao-mongodb-mysql/
├── 📄 .env                       # Configurações
├── 📄 requirements.txt           # Dependências
├── 📁 venv/                      # Ambiente virtual
├── 📁 config/                    # Arquivos de configuração
├── 📁 src/                       # Código fonte
├── 📁 logs/                      # Arquivos de log
├── 📁 backup/                    # Backups
├── 📁 dados/                     # Dados de exemplo
├── 📁 scripts/                   # Scripts auxiliares
└── 📁 tests/                     # Testes`}
          </pre>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200 my-8">
          <h3 className="text-xl font-semibold text-green-800 mb-2">🎉 Instalação Concluída!</h3>
          <p>
            Se chegou até aqui sem erros, o ambiente está pronto. Próximo passo: configurar os mapeamentos de dados.
          </p>
        </div>
      </div>
    </div>
  )
}
