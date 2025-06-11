export default function ArquiteturaPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">🏗️ Arquitetura do Sistema</h1>

      <div className="prose max-w-none">
        <div className="mb-8">
          <h2>Diagrama de Arquitetura</h2>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <pre className="text-xs overflow-auto p-4 bg-gray-50 rounded">
              {`graph TD
    A[MongoDB] --> B[Python Migrator]
    B --> C[Validação de Dados]
    C --> D[Mapeamento de Campos]
    D --> E[MySQL]
    B --> F[Sistema de Logs]
    B --> G[Backup System]
    E --> H[Verificação de Integridade]`}
            </pre>
          </div>
        </div>

        <h2>Componentes Principais</h2>
        <ol>
          <li>
            <strong>Conector MongoDB</strong> - Responsável pela extração de dados do MongoDB, incluindo paginação e
            filtragem.
          </li>
          <li>
            <strong>Validador de Dados</strong> - Verifica a integridade e validade dos dados antes da migração,
            aplicando regras de validação configuráveis.
          </li>
          <li>
            <strong>Mapeador de Campos</strong> - Converte estruturas de dados do MongoDB para o formato relacional do
            MySQL, incluindo transformações de tipos.
          </li>
          <li>
            <strong>Conector MySQL</strong> - Gerencia a inserção eficiente de dados no MySQL, incluindo transações e
            tratamento de erros.
          </li>
          <li>
            <strong>Sistema de Logs</strong> - Registra todas as operações e erros para auditoria e depuração.
          </li>
          <li>
            <strong>Sistema de Backup</strong> - Cria cópias de segurança antes da migração para permitir recuperação em
            caso de falhas.
          </li>
        </ol>

        <h2>Fluxo de Dados</h2>
        <ol>
          <li>Leitura de documentos do MongoDB em lotes</li>
          <li>Validação e transformação de cada documento</li>
          <li>Mapeamento para estrutura relacional</li>
          <li>Inserção em lotes no MySQL</li>
          <li>Verificação de integridade após inserção</li>
          <li>Registro de resultados e estatísticas</li>
        </ol>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200 my-8">
          <h3 className="text-xl font-semibold text-green-800 mb-2">Vantagens da Arquitetura</h3>
          <ul className="mt-2">
            <li>
              <strong>Modularidade:</strong> Componentes independentes facilitam manutenção
            </li>
            <li>
              <strong>Escalabilidade:</strong> Processamento em lotes permite lidar com grandes volumes
            </li>
            <li>
              <strong>Resiliência:</strong> Mecanismos de recuperação de falhas em cada etapa
            </li>
            <li>
              <strong>Flexibilidade:</strong> Configuração via arquivos YAML permite adaptação
            </li>
            <li>
              <strong>Observabilidade:</strong> Logs detalhados em todas as etapas
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
