export default function PreRequisitosPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">📋 Pré-requisitos</h1>

      <div className="prose max-w-none">
        <h2>Software Necessário</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">🐍 Python 3.8+</h3>
            <p className="mb-4">Linguagem principal do sistema</p>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <strong>Verificar instalação:</strong>
              <br />
              <code>python --version</code>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-green-600">🍃 MongoDB 4.0+</h3>
            <p className="mb-4">Banco de dados de origem</p>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <strong>Verificar instalação:</strong>
              <br />
              <code>mongod --version</code>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-orange-600">🐬 MySQL 8.0+</h3>
            <p className="mb-4">Banco de dados de destino</p>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <strong>Verificar instalação:</strong>
              <br />
              <code>mysql --version</code>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-purple-600">📦 pip</h3>
            <p className="mb-4">Gerenciador de pacotes Python</p>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <strong>Verificar instalação:</strong>
              <br />
              <code>pip --version</code>
            </div>
          </div>
        </div>

        <h2>Conhecimentos Recomendados</h2>
        <ul>
          <li>
            <strong>Python básico</strong> - Sintaxe, estruturas de dados, orientação a objetos
          </li>
          <li>
            <strong>Conceitos de banco de dados</strong> - SQL, NoSQL, transações
          </li>
          <li>
            <strong>Estruturas JSON</strong> - Manipulação e validação
          </li>
          <li>
            <strong>SQL básico</strong> - SELECT, INSERT, CREATE TABLE
          </li>
          <li>
            <strong>Terminal/Command Line</strong> - Comandos básicos
          </li>
        </ul>

        <h2>Hardware Mínimo</h2>
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 my-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">💾</div>
              <h3 className="font-semibold">RAM</h3>
              <p className="text-sm">4GB (8GB recomendado)</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💿</div>
              <h3 className="font-semibold">Espaço</h3>
              <p className="text-sm">2GB livres</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold">CPU</h3>
              <p className="text-sm">Dual-core</p>
            </div>
          </div>
        </div>

        <h2>Verificação do Ambiente</h2>
        <p>Execute os comandos abaixo para verificar se seu ambiente está pronto:</p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm my-6">
          <div className="mb-2"># Verificar Python</div>
          <div className="mb-4">python --version</div>

          <div className="mb-2"># Verificar MongoDB</div>
          <div className="mb-4">mongod --version</div>

          <div className="mb-2"># Verificar MySQL</div>
          <div className="mb-4">mysql --version</div>

          <div className="mb-2"># Verificar pip</div>
          <div>pip --version</div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200 my-8">
          <h3 className="text-xl font-semibold text-green-800 mb-2">✅ Tudo Pronto?</h3>
          <p>Se todos os comandos acima funcionaram, você está pronto para prosseguir para a instalação!</p>
        </div>
      </div>
    </div>
  )
}
