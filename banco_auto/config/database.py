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
        