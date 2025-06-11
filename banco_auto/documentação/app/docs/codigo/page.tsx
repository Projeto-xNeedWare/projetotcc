export default function CodigoPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">💻 Implementação</h1>

      <div className="prose max-w-none">
        <p className="lead">
          Esta seção contém os principais arquivos de código do sistema de migração. Cada arquivo é apresentado com
          explicações sobre seu propósito e funcionamento.
        </p>

        <h2>Arquivo Principal (main.py)</h2>
        <div className="bg-gray-50 p-4 rounded-lg border mb-8">
          <pre className="text-xs overflow-auto p-4">
            {`#!/usr/bin/env python3
"""
Script principal para migração MongoDB → MySQL
"""
import os
import sys
import logging
import click
from datetime import datetime
from colorlog import ColoredFormatter

# Adicionar src ao path
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from config.settings import Config
from src.migrator import MongoToMySQLMigrator

def setup_logging():
    """Configurar sistema de logs"""
    # Criar diretório de logs
    os.makedirs(Config.DIRECTORIES['logs'], exist_ok=True)
    
    # Configurar formatador colorido para console
    console_formatter = ColoredFormatter(
        "%(log_color)s%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        datefmt='%Y-%m-%d %H:%M:%S',
        log_colors={
            'DEBUG': 'cyan',
            'INFO': 'green',
            'WARNING': 'yellow',
            'ERROR': 'red',
            'CRITICAL': 'red,bg_white',
        }
    )
    
    # Configurar formatador para arquivo
    file_formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    
    # Configurar logger raiz
    root_logger = logging.getLogger()
    root_logger.setLevel(getattr(logging, Config.LOG_CONFIG['level']))
    
    # Handler para console
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(console_formatter)
    root_logger.addHandler(console_handler)
    
    # Handler para arquivo
    log_file = os.path.join(Config.DIRECTORIES['logs'], 'migration.log')
    file_handler = logging.FileHandler(log_file, encoding='utf-8')
    file_handler.setFormatter(file_formatter)
    root_logger.addHandler(file_handler)
    
    # Handler para erros
    error_file = os.path.join(Config.DIRECTORIES['logs'], 'errors.log')
    error_handler = logging.FileHandler(error_file, encoding='utf-8')
    error_handler.setLevel(logging.ERROR)
    error_handler.setFormatter(file_formatter)
    root_logger.addHandler(error_handler)

@click.group()
def cli():
    """Sistema de Migração MongoDB → MySQL"""
    setup_logging()

@cli.command()
@click.option('--collections', '-c', multiple=True, help='Coleções específicas para migrar')
@click.option('--mappings', '-m', default='config/mappings.yaml', help='Arquivo de mapeamentos')
@click.option('--dry-run', is_flag=True, help='Executar sem fazer alterações')
def migrate(collections, mappings, dry_run):
    """Executar migração completa"""
    logger = logging.getLogger(__name__)
    
    try:
        # Validar configurações
        Config.validate_config()
        
        if dry_run:
            logger.info("🧪 Modo DRY-RUN ativado - nenhuma alteração será feita")
            return
        
        # Criar migrador
        migrator = MongoToMySQLMigrator(mappings)
        
        # Executar migração
        collections_list = list(collections) if collections else None
        migrator.run_migration(collections_list)
        
    except Exception as e:
        logger.error(f"❌ Erro na migração: {e}")
        sys.exit(1)

@cli.command()
def test_connections():
    """Testar conexões com os bancos de dados"""
    logger = logging.getLogger(__name__)
    
    try:
        from config.database import DatabaseManager
        
        db_manager = DatabaseManager()
        
        if db_manager.connect_all():
            logger.info("✅ Todas as conexões testadas com sucesso!")
            
            # Listar coleções MongoDB
            collections = db_manager.mongo.list_collections()
            logger.info(f"📦 Coleções MongoDB encontradas: {collections}")
            
            # Testar MySQL
            tables = db_manager.mysql.execute_query("SHOW TABLES")
            table_names = [list(table.values())[0] for table in tables]
            logger.info(f"📊 Tabelas MySQL encontradas: {table_names}")
            
        else:
            logger.error("❌ Falha ao conectar com os bancos")
            sys.exit(1)
            
    except Exception as e:
        logger.error(f"❌ Erro ao testar conexões: {e}")
        sys.exit(1)
    finally:
        if 'db_manager' in locals():
            db_manager.close_all()

if __name__ == '__main__':
    cli()`}
          </pre>
        </div>

        <h2>Configurações (config/settings.py)</h2>
        <div className="bg-gray-50 p-4 rounded-lg border mb-8">
          <pre className="text-xs overflow-auto p-4">
            {`"""
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
        
        return True`}
          </pre>
        </div>

        <p>
          Veja mais arquivos de código na documentação completa. Cada arquivo inclui comentários detalhados explicando
          seu funcionamento.
        </p>
      </div>
    </div>
  )
}
