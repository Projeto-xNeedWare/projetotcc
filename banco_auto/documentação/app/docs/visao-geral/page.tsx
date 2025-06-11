export default function VisaoGeralPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">🎯 Visão Geral</h1>

      <div className="prose max-w-none">
        <h2>Objetivo</h2>
        <p>
          Criar um sistema automatizado em Python para migrar dados do MongoDB (NoSQL) para MySQL (SQL), mantendo
          integridade, rastreabilidade e possibilidade de rollback.
        </p>

        <h2>Benefícios</h2>
        <ul>
          <li>
            <strong>Automação completa</strong> da migração
          </li>
          <li>
            <strong>Validação e limpeza</strong> de dados
          </li>
          <li>
            <strong>Backup automático</strong> antes da migração
          </li>
          <li>
            <strong>Logs detalhados</strong> de todo o processo
          </li>
          <li>
            <strong>Processamento em lotes</strong> para grandes volumes
          </li>
          <li>
            <strong>Mapeamento flexível</strong> de campos
          </li>
          <li>
            <strong>Preservação dos dados originais</strong>
          </li>
        </ul>

        <h2>Casos de Uso</h2>
        <ul>
          <li>Migração de sistemas legados</li>
          <li>Mudança de arquitetura de dados</li>
          <li>Integração entre sistemas</li>
          <li>Backup estruturado de dados NoSQL</li>
        </ul>

        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 my-8">
          <h3 className="text-xl font-semibold text-amber-800 mb-2">Por que migrar do MongoDB para MySQL?</h3>
          <p>
            Embora o MongoDB seja excelente para dados não estruturados e desenvolvimento rápido, o MySQL oferece
            vantagens em:
          </p>
          <ul className="mt-2">
            <li>Integridade referencial com chaves estrangeiras</li>
            <li>Transações ACID completas</li>
            <li>Consultas complexas e joins</li>
            <li>Ferramentas maduras de administração</li>
            <li>Menor consumo de recursos em muitos casos</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
