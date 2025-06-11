import { Card } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">📚 Documentação Completa</h1>
      <h2 className="text-2xl font-semibold mb-4">Sistema de Migração MongoDB → MySQL</h2>

      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          Bem-vindo à documentação completa do sistema de migração de dados do MongoDB para MySQL. Esta documentação
          fornece informações detalhadas sobre como instalar, configurar e usar o sistema.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Índice</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="p-4 hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">1. Visão Geral</h4>
            <p className="text-sm text-gray-600">Introdução ao sistema e seus benefícios</p>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">2. Arquitetura</h4>
            <p className="text-sm text-gray-600">Componentes e fluxo de dados</p>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">3. Pré-requisitos</h4>
            <p className="text-sm text-gray-600">Software e conhecimentos necessários</p>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">4. Instalação</h4>
            <p className="text-sm text-gray-600">Configuração do ambiente</p>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">5. Estrutura</h4>
            <p className="text-sm text-gray-600">Organização de arquivos e pastas</p>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">6. Implementação</h4>
            <p className="text-sm text-gray-600">Código-fonte e explicações</p>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">7. Execução</h4>
            <p className="text-sm text-gray-600">Como executar o sistema</p>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">8. Monitoramento</h4>
            <p className="text-sm text-gray-600">Logs e acompanhamento</p>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">9. Troubleshooting</h4>
            <p className="text-sm text-gray-600">Solução de problemas comuns</p>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">10. Extensões</h4>
            <p className="text-sm text-gray-600">Melhorias e funcionalidades adicionais</p>
          </Card>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Começando</h3>
          <p className="mb-4">Para começar a usar o sistema, recomendamos seguir estas etapas:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Leia a Visão Geral para entender o propósito do sistema</li>
            <li>Verifique os Pré-requisitos para garantir que seu ambiente está preparado</li>
            <li>Siga o guia de Instalação passo a passo</li>
            <li>Configure o sistema de acordo com suas necessidades</li>
            <li>Execute a migração seguindo as instruções da seção Execução</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
