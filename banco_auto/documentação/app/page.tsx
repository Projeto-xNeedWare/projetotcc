import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Documentação do Sistema de Migração MongoDB → MySQL</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Arquivo Markdown</h2>
          <p className="mb-4">
            Baixe a documentação completa em um único arquivo Markdown que pode ser visualizado em qualquer editor ou
            convertido para PDF.
          </p>
          <Button className="flex items-center gap-2">
            <Download size={18} />
            Baixar Documentação Markdown
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Site Interativo</h2>
          <p className="mb-4">
            Acesse a documentação em formato de site interativo com navegação, busca e formatação avançada.
          </p>
          <Button className="flex items-center gap-2" variant="outline" asChild>
            <a href="/docs">Acessar Site da Documentação</a>
          </Button>
        </Card>
      </div>

      <div className="prose max-w-none">
        <h2>Sobre esta Documentação</h2>
        <p>
          Esta documentação completa cobre o sistema de migração de dados do MongoDB para MySQL, incluindo instalação,
          configuração, execução e solução de problemas.
        </p>

        <h3>Conteúdo Incluído:</h3>
        <ul>
          <li>Visão geral do sistema</li>
          <li>Arquitetura e componentes</li>
          <li>Guia de instalação passo a passo</li>
          <li>Configuração detalhada</li>
          <li>Exemplos de código</li>
          <li>Solução de problemas</li>
          <li>Extensões e melhorias</li>
        </ul>
      </div>
    </div>
  )
}
