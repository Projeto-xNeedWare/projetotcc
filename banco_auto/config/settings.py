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
        'database': os.getenv('xNeed768@xneed', 'test'),
        'username': os.getenv('xNeedDatabase'),
        'password': os.getenv('z5PWKPJx5tUYyjmi8GzovZzpH6W3q'),
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
        
