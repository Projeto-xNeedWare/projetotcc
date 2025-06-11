export async function GET() {
  const markdown = `# 📚 **DOCUMENTAÇÃO COMPLETA - SISTEMA DE MIGRAÇÃO MONGODB → MYSQL**

## 📋 **ÍNDICE**
1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Pré-requisitos](#pré-requisitos)
4. [Instalação e Configuração](#instalação-e-configuração)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Implementação Completa](#implementação-completa)
7. [Como Executar](#como-executar)
8. [Monitoramento e Logs](#monitoramento-e-logs)
9. [Troubleshooting](#troubleshooting)
10. [Extensões e Melhorias](#extensões-e-melhorias)

---

## 🎯 **VISÃO GERAL**

### **Objetivo**
Criar um sistema automatizado em Python para migrar dados do MongoDB (NoSQL) para MySQL (SQL), mantendo integridade, rastreabilidade e possibilidade de rollback.

### **Benefícios**
- ✅ **Automação completa** da migração
- ✅ **Validação e limpeza** de dados
- ✅ **Backup automático** antes da migração
- ✅ **Logs detalhados** de todo o processo
- ✅ **Processamento em lotes** para grandes volumes
- ✅ **Mapeamento flexível** de campos
- ✅ **Preservação dos dados originais**

### **Casos de Uso**
- Migração de sistemas legados
- Mudança de arquitetura de dados
- Integração entre sistemas
- Backup estruturado de dados NoSQL

---

## 🏗️ **ARQUITETURA DO SISTEMA**

\`\`\`
graph TD
    A[MongoDB] --> B[Python Migrator]
    B --> C[Validação de Dados]
    C --> D[Mapeamento de Campos]
    D --> E[MySQL]
    B --> F[Sistema de Logs]
    B --> G[Backup System]
    E --> H[Verificação de Integridade]
\`\`\`

### **Componentes Principais**
1. **Conector MongoDB** - Extração de dados
2. **Validador de Dados** - Limpeza e validação
3. **Mapeador de Campos** - Conversão de estruturas
4. **Conector MySQL** - Inserção de dados
5. **Sistema de Logs** - Monitoramento
6. **Sistema de Backup** - Segurança

---

## 📋 **PRÉ-REQUISITOS**

### **Software Necessário**
- **Python 3.8+**
- **MongoDB 4.0+** (rodando)
- **MySQL 8.0+** (rodando)
- **pip** (gerenciador de pacotes Python)

### **Conhecimentos Recomendados**
- Básico de Python
- Conceitos de banco de dados
- Estruturas JSON
- SQL básico

### **Hardware Mínimo**
- **RAM**: 4GB (8GB recomendado)
- **Espaço**: 2GB livres
- **CPU**: Dual-core

---

## 🛠️ **INSTALAÇÃO E CONFIGURAÇÃO**

### **1. Preparação do Ambiente**

\`\`\`bash
# 1. Criar diretório do projeto
mkdir migracao-mongodb-mysql
cd migracao-mongodb-mysql

# 2. Criar ambiente virtual Python
python -m venv venv

# 3. Ativar ambiente virtual
# Windows:
venv\\Scripts\\activate
# Linux/Mac:
source venv/bin/activate

# 4. Criar estrutura de pastas
mkdir -p {config,logs,backup,dados,scripts,tests}
\`\`\`

### **2. Instalação de Dependências**

**Arquivo: \`requirements.txt\`**
\`\`\`txt
# Conectores de banco de dados
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
pytest-cov==4.1.0
\`\`\`

\`\`\`bash
# Instalar dependências
pip install -r requirements.txt
\`\`\`

### **3. Configuração de Ambiente**

**Arquivo: \`.env\`**
\`\`\`env
# ===========================================
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
BACKUP_RETENTION_DAYS=30
\`\`\`

---

## 📁 **ESTRUTURA DO PROJETO**

\`\`\`
📁 migracao-mongodb-mysql/
├── 📄 README.md
├── 📄 requirements.txt
├── 📄 .env
├── 📄 .gitignore
├── 📄 main.py                    # Script principal
├── 📁 config/
│   ├── 📄 __init__.py
│   ├── 📄 settings.py            # Configurações
│   ├── 📄 database.py            # Conexões de banco
│   └── 📄 mappings.yaml          # Mapeamentos de dados
├── 📁 src/
│   ├── 📄 __init__.py
│   ├── 📄 migrator.py            # Classe principal
│   ├── 📄 validators.py          # Validadores de dados
│   ├── 📄 transformers.py        # Transformadores de dados
│   ├── 📄 backup.py              # Sistema de backup
│   └── 📄 utils.py               # Utilitários
├── 📁 logs/
│   ├── 📄 migration.log
│   ├── 📄 errors.log
│   └── 📄 performance.log
├── 📁 backup/
│   ├── 📄 mysql_backup_YYYYMMDD.sql
│   └── 📄 mongodb_export_YYYYMMDD.json
├── 📁 dados/
│   ├── 📄 sample_data.json
│   └── 📄 test_data.json
├── 📁 scripts/
│   ├── 📄 setup_mysql.sql        # Scripts SQL
│   ├── 📄 cleanup.py             # Limpeza
│   └── 📄 verify.py              # Verificação
└── 📁 tests/
    ├── 📄 test_migrator.py
    ├── 📄 test_validators.py
    └── 📄 test_integration.py
\`\`\`

---

## 💻 **IMPLEMENTAÇÃO COMPLETA**

### **1. Configurações (config/settings.py)**

\`\`\`python
"""
Configurações do sistema de migração
"""
import os
from dotenv import load_dotenv
from typing import Dict, Any

load_dotenv()

class Config:
    """Classe de configurações centralizadas"""
    
    # MongoDB
    MONGO_CONFIG = {
        'host': os.getenv('MONGO_HOST', 'localhost'),
        'port': int(os.getenv('MONGO_PORT', 27017)),
        'database': os.getenv('MONGO_DATABASE', 'test'),
        'username': os.getenv('MONGO_USERNAME'),
        'password': os.getenv('MONGO_PASSWORD'),
        'auth_source': os.getenv('MONGO_AUTH_SOURCE', 'admin'),
    }
    
    # MySQL
    MYSQL_CONFIG = {
        'host': os.getenv('MYSQL_HOST', 'localhost'),
        'port': int(os.getenv('MYSQL_PORT', 3306)),
        'database': os.getenv('MYSQL_DATABASE', 'test'),
        'user': os.getenv('MYSQL_USERNAME', 'root'),
        'password': os.getenv('MYSQL_PASSWORD', ''),
        'charset': os.getenv('MYSQL_CHARSET', 'utf8mb4'),
        'autocommit': False,
        'raise_on_warnings': True
    }
    
    # Migração
    MIGRATION_CONFIG = {
        'batch_size': int(os.getenv('BATCH_SIZE', 1000)),
        'max_retries': int(os.getenv('MAX_RETRIES', 3)),
        'backup_enabled': os.getenv('BACKUP_ENABLED', 'true').lower() == 'true',
        'validate_data': os.getenv('VALIDATE_DATA', 'true').lower() == 'true',
        'preserve_original': os.getenv('PRESERVE_ORIGINAL_DATA', 'true').lower() == 'true',
    }
    
    # Logs
    LOG_CONFIG = {
        'level': os.getenv('LOG_LEVEL', 'INFO'),
        'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        'file_rotation': True,
        'max_file_size': 10 * 1024 * 1024,  # 10MB
        'backup_count': 5
    }
    
    # Diretórios
    DIRECTORIES = {
        'logs': 'logs',
        'backup': 'backup',
        'config': 'config',
        'data': 'dados'
    }
    
    @classmethod
    def get_mongo_uri(cls) -> str:
        """Gerar URI de conexão MongoDB"""
        config = cls.MONGO_CONFIG
        
        if config['username'] and config['password']:
            return f"mongodb://{config['username']}:{config['password']}@{config['host']}:{config['port']}/{config['database']}?authSource={config['auth_source']}"
        else:
            return f"mongodb://{config['host']}:{config['port']}/{config['database']}"
    
    @classmethod
    def validate_config(cls) -> bool:
        """Validar configurações"""
        required_vars = [
            'MONGO_DATABASE',
            'MYSQL_DATABASE'
        ]
        
        missing_vars = []
        for var in required_vars:
            if not os.getenv(var):
                missing_vars.append(var)
        
        if missing_vars:
            raise ValueError(f"Variáveis de ambiente obrigatórias não definidas: {missing_vars}")
        
        return True
\`\`\`

### **2. Conexões de Banco (config/database.py)**

\`\`\`python
"""
Gerenciadores de conexão com bancos de dados
"""
import pymongo
import mysql.connector
from mysql.connector import Error as MySQLError
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from typing import Optional
import logging
from .settings import Config

logger = logging.getLogger(__name__)

class MongoDBConnection:
    """Gerenciador de conexão MongoDB"""
    
    def __init__(self):
        self.client: Optional[pymongo.MongoClient] = None
        self.database = None
        
    def connect(self) -> bool:
        """Estabelecer conexão com MongoDB"""
        try:
            uri = Config.get_mongo_uri()
            self.client = pymongo.MongoClient(
                uri,
                serverSelectionTimeoutMS=5000,  # 5 segundos timeout
                connectTimeoutMS=10000,         # 10 segundos timeout
                socketTimeoutMS=20000           # 20 segundos timeout
            )
            
            # Testar conexão
            self.client.admin.command('ping')
            self.database = self.client[Config.MONGO_CONFIG['database']]
            
            logger.info("✅ Conexão MongoDB estabelecida com sucesso")
            return True
            
        except (ConnectionFailure, ServerSelectionTimeoutError) as e:
            logger.error(f"❌ Erro ao conectar MongoDB: {e}")
            return False
        except Exception as e:
            logger.error(f"❌ Erro inesperado MongoDB: {e}")
            return False
    
    def get_collection(self, name: str):
        """Obter coleção"""
        if not self.database:
            raise RuntimeError("Conexão MongoDB não estabelecida")
        return self.database[name]
    
    def list_collections(self) -> list:
        """Listar coleções disponíveis"""
        if not self.database:
            return []
        return self.database.list_collection_names()
    
    def get_collection_stats(self, collection_name: str) -> dict:
        """Obter estatísticas da coleção"""
        if not self.database:
            return {}
        
        try:
            stats = self.database.command("collStats", collection_name)
            return {
                'count': stats.get('count', 0),
                'size': stats.get('size', 0),
                'avgObjSize': stats.get('avgObjSize', 0)
            }
        except Exception as e:
            logger.warning(f"Não foi possível obter stats de {collection_name}: {e}")
            return {}
    
    def close(self):
        """Fechar conexão"""
        if self.client:
            self.client.close()
            logger.info("🔒 Conexão MongoDB fechada")

class MySQLConnection:
    """Gerenciador de conexão MySQL"""
    
    def __init__(self):
        self.connection: Optional[mysql.connector.MySQLConnection] = None
        self.cursor = None
        
    def connect(self) -> bool:
        """Estabelecer conexão com MySQL"""
        try:
            self.connection = mysql.connector.connect(**Config.MYSQL_CONFIG)
            self.cursor = self.connection.cursor(dictionary=True)
            
            # Testar conexão
            self.cursor.execute("SELECT 1")
            self.cursor.fetchone()
            
            logger.info("✅ Conexão MySQL estabelecida com sucesso")
            return True
            
        except MySQLError as e:
            logger.error(f"❌ Erro ao conectar MySQL: {e}")
            return False
        except Exception as e:
            logger.error(f"❌ Erro inesperado MySQL: {e}")
            return False
    
    def execute_query(self, query: str, params: tuple = None) -> list:
        """Executar query SELECT"""
        if not self.cursor:
            raise RuntimeError("Conexão MySQL não estabelecida")
        
        try:
            self.cursor.execute(query, params)
            return self.cursor.fetchall()
        except MySQLError as e:
            logger.error(f"Erro ao executar query: {e}")
            raise
    
    def execute_insert(self, query: str, params: tuple = None) -> int:
        """Executar INSERT e retornar ID"""
        if not self.cursor:
            raise RuntimeError("Conexão MySQL não estabelecida")
        
        try:
            self.cursor.execute(query, params)
            return self.cursor.lastrowid
        except MySQLError as e:
            logger.error(f"Erro ao executar insert: {e}")
            raise
    
    def execute_many(self, query: str, params_list: list) -> int:
        """Executar múltiplos INSERTs"""
        if not self.cursor:
            raise RuntimeError("Conexão MySQL não estabelecida")
        
        try:
            self.cursor.executemany(query, params_list)
            return self.cursor.rowcount
        except MySQLError as e:
            logger.error(f"Erro ao executar batch insert: {e}")
            raise
    
    def commit(self):
        """Confirmar transação"""
        if self.connection:
            self.connection.commit()
    
    def rollback(self):
        """Reverter transação"""
        if self.connection:
            self.connection.rollback()
    
    def close(self):
        """Fechar conexão"""
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
        logger.info("🔒 Conexão MySQL fechada")

class DatabaseManager:
    """Gerenciador centralizado de conexões"""
    
    def __init__(self):
        self.mongo = MongoDBConnection()
        self.mysql = MySQLConnection()
        self.connected = False
    
    def connect_all(self) -> bool:
        """Conectar todos os bancos"""
        mongo_ok = self.mongo.connect()
        mysql_ok = self.mysql.connect()
        
        self.connected = mongo_ok and mysql_ok
        
        if self.connected:
            logger.info("🎉 Todas as conexões estabelecidas com sucesso")
        else:
            logger.error("❌ Falha ao estabelecer conexões")
        
        return self.connected
    
    def close_all(self):
        """Fechar todas as conexões"""
        self.mongo.close()
        self.mysql.close()
        self.connected = False
        logger.info("🔒 Todas as conexões fechadas")
\`\`\`

### **3. Mapeamentos de Dados (config/mappings.yaml)**

\`\`\`yaml
# ===========================================
# MAPEAMENTOS DE COLEÇÕES MONGODB → MYSQL
# ===========================================

# Configuração para usuários
usuarios:
  mysql_table: "usuarios"
  create_table: true
  fields:
    _id: 
      mysql_field: "mongo_id"
      mysql_type: "VARCHAR(24)"
      transform: "str"
    nome:
      mysql_field: "nome"
      mysql_type: "VARCHAR(100)"
      required: true
      validate: "not_empty"
    email:
      mysql_field: "email"
      mysql_type: "VARCHAR(100)"
      required: true
      validate: "email"
      unique: true
    telefone:
      mysql_field: "telefone"
      mysql_type: "VARCHAR(20)"
      transform: "clean_phone"
    idade:
      mysql_field: "idade"
      mysql_type: "INT"
      validate: "positive_int"
    data_cadastro:
      mysql_field: "data_cadastro"
      mysql_type: "TIMESTAMP"
      default: "CURRENT_TIMESTAMP"
    ativo:
      mysql_field: "ativo"
      mysql_type: "BOOLEAN"
      default: true
  indexes:
    - fields: ["email"]
      unique: true
    - fields: ["mongo_id"]
      unique: true
  preserve_original: true

# Configuração para produtos
produtos:
  mysql_table: "produtos"
  create_table: true
  fields:
    _id:
      mysql_field: "mongo_id"
      mysql_type: "VARCHAR(24)"
      transform: "str"
    nome:
      mysql_field: "nome"
      mysql_type: "VARCHAR(200)"
      required: true
    descricao:
      mysql_field: "descricao"
      mysql_type: "TEXT"
    preco:
      mysql_field: "preco"
      mysql_type: "DECIMAL(10,2)"
      validate: "positive_decimal"
      transform: "to_decimal"
    categoria:
      mysql_field: "categoria"
      mysql_type: "VARCHAR(100)"
    tags:
      mysql_field: "tags"
      mysql_type: "JSON"
      transform: "array_to_json"
    ativo:
      mysql_field: "ativo"
      mysql_type: "BOOLEAN"
      default: true
    data_criacao:
      mysql_field: "data_criacao"
      mysql_type: "TIMESTAMP"
      default: "CURRENT_TIMESTAMP"
  indexes:
    - fields: ["categoria"]
    - fields: ["ativo"]
  preserve_original: true

# Configuração para pedidos
pedidos:
  mysql_table: "pedidos"
  create_table: true
  fields:
    _id:
      mysql_field: "mongo_id"
      mysql_type: "VARCHAR(24)"
    numero_pedido:
      mysql_field: "numero_pedido"
      mysql_type: "VARCHAR(50)"
      unique: true
    usuario_id:
      mysql_field: "usuario_id"
      mysql_type: "VARCHAR(24)"
      required: true
    produtos:
      mysql_field: "produtos"
      mysql_type: "JSON"
      transform: "array_to_json"
    total:
      mysql_field: "total"
      mysql_type: "DECIMAL(10,2)"
      validate: "positive_decimal"
    status:
      mysql_field: "status"
      mysql_type: "ENUM('pendente','processando','enviado','entregue','cancelado')"
      default: "pendente"
    data_pedido:
      mysql_field: "data_pedido"
      mysql_type: "TIMESTAMP"
      default: "CURRENT_TIMESTAMP"
  indexes:
    - fields: ["numero_pedido"]
      unique: true
    - fields: ["usuario_id"]
    - fields: ["status"]
  preserve_original: true

# Configuração para eventos/inscrições
inscricoes_eventos:
  mysql_table: "inscricoes_eventos"
  create_table: true
  fields:
    _id:
      mysql_field: "mongo_id"
      mysql_type: "VARCHAR(24)"
    nome:
      mysql_field: "nome"
      mysql_type: "VARCHAR(100)"
      required: true
    email:
      mysql_field: "email"
      mysql_type: "VARCHAR(100)"
      required: true
      validate: "email"
    telefone:
      mysql_field: "telefone"
      mysql_type: "VARCHAR(20)"
      transform: "clean_phone"
    evento:
      mysql_field: "evento"
      mysql_type: "VARCHAR(100)"
      default: "GeekFest 2025"
    tipo_ingresso:
      mysql_field: "tipo_ingresso"
      mysql_type: "ENUM('individual','vip','grupo')"
      default: "individual"
    data_inscricao:
      mysql_field: "data_inscricao"
      mysql_type: "TIMESTAMP"
      default: "CURRENT_TIMESTAMP"
    confirmado:
      mysql_field: "confirmado"
      mysql_type: "BOOLEAN"
      default: false
  indexes:
    - fields: ["email", "evento"]
      unique: true
    - fields: ["evento"]
  preserve_original: true

# ===========================================
# CONFIGURAÇÕES GLOBAIS
# ===========================================
global_settings:
  preserve_original_field: "dados_originais"
  preserve_original_type: "JSON"
  add_migration_timestamp: true
  migration_timestamp_field: "migrado_em"
  migration_timestamp_type: "TIMESTAMP"
  add_migration_id: true
  migration_id_field: "migracao_id"
  migration_id_type: "VARCHAR(36)"
\`\`\`

---

## 🚀 **COMO EXECUTAR**

### **1. Instalação Inicial**

\`\`\`bash
# 1. Clonar/criar projeto
git clone <seu-repositorio> migracao-mongodb-mysql
cd migracao-mongodb-mysql

# 2. Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\\Scripts\\activate     # Windows

# 3. Instalar dependências
pip install -r requirements.txt

# 4. Configurar ambiente
cp .env.example .env
# Editar .env com suas configurações
\`\`\`

### **2. Configuração**

\`\`\`bash
# Editar arquivo .env
nano .env

# Ajustar mapeamentos se necessário
nano config/mappings.yaml
\`\`\`

### **3. Testes Iniciais**

\`\`\`bash
# Testar conexões
python main.py test-connections

# Criar dados de exemplo (opcional)
python main.py create-sample-data
\`\`\`

### **4. Executar Migração**

\`\`\`bash
# Migração completa
python main.py migrate

# Migrar coleções específicas
python main.py migrate -c usuarios -c produtos

# Modo dry-run (teste sem alterações)
python main.py migrate --dry-run

# Usar arquivo de mapeamentos personalizado
python main.py migrate -m config/meu_mapeamento.yaml
\`\`\`

### **5. Manutenção**

\`\`\`bash
# Limpar backups antigos
python main.py cleanup-backups --retention-days 15

# Ver logs
tail -f logs/migration.log

# Ver apenas erros
tail -f logs/errors.log
\`\`\`

---

## 📊 **MONITORAMENTO E LOGS**

### **Estrutura de Logs**
\`\`\`
📁 logs/
├── 📄 migration.log      # Log geral da migração
├── 📄 errors.log         # Apenas erros críticos
├── 📄 performance.log    # Métricas de performance
└── 📄 validation.log     # Erros de validação
\`\`\`

### **Tipos de Logs**

**1. Log Geral (migration.log)**
\`\`\`
2024-01-15 10:30:15 - INFO - 🚀 Iniciando migração - ID: abc123
2024-01-15 10:30:16 - INFO - ✅ Conexão MongoDB estabelecida
2024-01-15 10:30:17 - INFO - ✅ Conexão MySQL estabelecida
2024-01-15 10:30:18 - INFO - 🏗️ Criando tabelas MySQL...
2024-01-15 10:30:20 - INFO - 🔄 Migrando coleção: usuarios
2024-01-15 10:30:25 - INFO - ✅ Coleção 'usuarios' migrada com sucesso
\`\`\`

**2. Log de Erros (errors.log)**
\`\`\`
2024-01-15 10:32:10 - ERROR - ❌ Documento inválido 507f1f77bcf86cd799439011: ['Email inválido']
2024-01-15 10:32:15 - ERROR - ❌ Erro ao inserir lote: Duplicate entry 'joao@email.com'
2024-01-15 10:32:20 - ERROR - ❌ Falha na validação: Campo 'nome' está vazio
\`\`\`

**3. Métricas em Tempo Real**
\`\`\`python
# Durante a execução, você verá:
Migrando usuarios: 100%|████████████| 1500/1500 [00:45<00:00, 33.33docs/s]
Migrando produtos: 100%|████████████| 500/500 [00:15<00:00, 33.33docs/s]
\`\`\`

---

## 🔧 **TROUBLESHOOTING**

### **Problemas Comuns e Soluções**

#### **1. Erro de Conexão MongoDB**
\`\`\`bash
❌ Erro: ServerSelectionTimeoutError
\`\`\`
**Soluções:**
- Verificar se MongoDB está rodando: \`sudo systemctl status mongod\`
- Testar conexão manual: \`mongo --host localhost --port 27017\`
- Verificar firewall e portas
- Confirmar credenciais no \`.env\`

#### **2. Erro de Conexão MySQL**
\`\`\`bash
❌ Erro: Access denied for user 'root'@'localhost'
\`\`\`
**Soluções:**
- Verificar senha no \`.env\`
- Resetar senha MySQL: \`sudo mysql_secure_installation\`
- Verificar permissões: \`GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';\`

#### **3. Erro de Dependências**
\`\`\`bash
❌ ModuleNotFoundError: No module named 'pymongo'
\`\`\`
**Soluções:**
\`\`\`bash
# Ativar ambiente virtual
source venv/bin/activate

# Reinstalar dependências
pip install -r requirements.txt

# Verificar instalação
pip list | grep pymongo
\`\`\`

#### **4. Erro de Validação de Dados**
\`\`\`bash
❌ Campo 'email' falhou na validação 'email'
\`\`\`
**Soluções:**
- Verificar dados no MongoDB: \`db.usuarios.find({"email": {$regex: ".*@.*"}})\`
- Ajustar regras de validação em \`mappings.yaml\`
- Implementar limpeza de dados personalizada

#### **5. Erro de Espaço em Disco**
\`\`\`bash
❌ Erro: No space left on device
\`\`\`
**Soluções:**
\`\`\`bash
# Verificar espaço
df -h

# Limpar logs antigos
python main.py cleanup-backups --retention-days 7

# Comprimir logs grandes
gzip logs/migration.log
\`\`\`

---

## 🚀 **EXTENSÕES E MELHORIAS**

### **1. Interface Web (Flask)**

**Arquivo: \`web/app.py\`**
\`\`\`python
from flask import Flask, render_template, request, jsonify
import threading
from src.migrator import MongoToMySQLMigrator

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/migrate', methods=['POST'])
def start_migration():
    collections = request.json.get('collections', [])
    
    def run_migration():
        migrator = MongoToMySQLMigrator()
        migrator.run_migration(collections)
    
    thread = threading.Thread(target=run_migration)
    thread.start()
    
    return jsonify({'status': 'started'})

@app.route('/api/status')
def migration_status():
    # Implementar status da migração
    return jsonify({'status': 'running', 'progress': 45})

if __name__ == '__main__':
    app.run(debug=True)
\`\`\`

### **2. Monitoramento com Grafana**

**Arquivo: \`monitoring/metrics.py\`**
\`\`\`python
import time
import json
from prometheus_client import Counter, Histogram, Gauge

# Métricas Prometheus
documents_processed = Counter('migration_documents_processed_total')
migration_duration = Histogram('migration_duration_seconds')
active_migrations = Gauge('migration_active_count')

class MetricsCollector:
    def __init__(self):
        self.start_time = time.time()
    
    def record_document_processed(self):
        documents_processed.inc()
    
    def record_migration_complete(self):
        duration = time.time() - self.start_time
        migration_duration.observe(duration)
\`\`\`

### **3. Notificações (Slack/Email)**

**Arquivo: \`notifications/notifier.py\`**
\`\`\`python
import smtplib
import requests
from email.mime.text import MIMEText

class NotificationManager:
    def __init__(self):
        self.slack_webhook = os.getenv('SLACK_WEBHOOK_URL')
        self.email_config = {
            'smtp_server': os.getenv('SMTP_SERVER'),
            'smtp_port': int(os.getenv('SMTP_PORT', 587)),
            'username': os.getenv('SMTP_USERNAME'),
            'password': os.getenv('SMTP_PASSWORD')
        }
    
    def send_slack_notification(self, message):
        if self.slack_webhook:
            payload = {'text': message}
            requests.post(self.slack_webhook, json=payload)
    
    def send_email_notification(self, subject, message, to_email):
        msg = MIMEText(message)
        msg['Subject'] = subject
        msg['From'] = self.email_config['username']
        msg['To'] = to_email
        
        with smtplib.SMTP(self.email_config['smtp_server'], self.email_config['smtp_port']) as server:
            server.starttls()
            server.login(self.email_config['username'], self.email_config['password'])
            server.send_message(msg)
    
    def notify_migration_complete(self, statistics):
        message = f"""
        🎉 Migração Concluída!
        
        📊 Estatísticas:
        - Documentos migrados: {statistics['migrated_successfully']}
        - Falhas: {statistics['failed_migrations']}
        - Duração: {statistics['end_time'] - statistics['start_time']}
        """
        
        self.send_slack_notification(message)
        self.send_email_notification("Migração Concluída", message, "admin@empresa.com")
\`\`\`

---

## 📋 **CHECKLIST DE IMPLEMENTAÇÃO**

### **Fase 1: Preparação (1-2 dias)**
- [ ] Instalar Python 3.8+
- [ ] Configurar ambiente virtual
- [ ] Instalar dependências
- [ ] Configurar MongoDB e MySQL
- [ ] Testar conexões básicas

### **Fase 2: Configuração (1 dia)**
- [ ] Criar arquivo \`.env\`
- [ ] Configurar \`mappings.yaml\`
- [ ] Ajustar validadores personalizados
- [ ] Testar mapeamentos

### **Fase 3: Implementação (2-3 dias)**
- [ ] Implementar classes base
- [ ] Criar sistema de backup
- [ ] Implementar validadores
- [ ] Criar migrador principal

### **Fase 4: Testes (1-2 dias)**
- [ ] Testar com dados pequenos
- [ ] Validar integridade dos dados
- [ ] Testar recuperação de erros
- [ ] Otimizar performance

### **Fase 5: Produção (1 dia)**
- [ ] Fazer backup completo
- [ ] Executar migração final
- [ ] Validar resultados
- [ ] Configurar monitoramento

---

## 🎯 **CONCLUSÃO**

Esta documentação fornece um sistema completo e robusto para migração de dados MongoDB → MySQL. O sistema oferece:

### **Características Principais:**
- ✅ **Automação completa** do processo
- ✅ **Validação rigorosa** de dados
- ✅ **Backup automático** para segurança
- ✅ **Logs detalhados** para auditoria
- ✅ **Processamento em lotes** para performance
- ✅ **Recuperação de erros** robusta
- ✅ **Extensibilidade** para futuras necessidades

### **Benefícios:**
- **Reduz tempo** de migração manual
- **Minimiza erros** humanos
- **Garante integridade** dos dados
- **Fornece rastreabilidade** completa
- **Permite rollback** se necessário

### **Próximos Passos:**
1. Implementar o sistema básico
2. Testar com seus dados reais
3. Aju
