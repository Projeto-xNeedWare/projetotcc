"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Settings,
  Database,
  Code,
  Play,
  BarChart3,
  AlertTriangle,
  Puzzle,
  Home,
  Eye,
  Building,
} from "lucide-react"

const navigation = [
  {
    name: "Início",
    href: "/docs",
    icon: Home,
  },
  {
    name: "Visão Geral",
    href: "/docs/visao-geral",
    icon: Eye,
  },
  {
    name: "Arquitetura",
    href: "/docs/arquitetura",
    icon: Building,
  },
  {
    name: "Pré-requisitos",
    href: "/docs/pre-requisitos",
    icon: BookOpen,
  },
  {
    name: "Instalação",
    href: "/docs/instalacao",
    icon: Settings,
  },
  {
    name: "Estrutura",
    href: "/docs/estrutura",
    icon: Database,
  },
  {
    name: "Implementação",
    href: "/docs/codigo",
    icon: Code,
  },
  {
    name: "Execução",
    href: "/docs/execucao",
    icon: Play,
  },
  {
    name: "Monitoramento",
    href: "/docs/monitoramento",
    icon: BarChart3,
  },
  {
    name: "Troubleshooting",
    href: "/docs/troubleshooting",
    icon: AlertTriangle,
  },
  {
    name: "Extensões",
    href: "/docs/extensoes",
    icon: Puzzle,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-6">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900">📚 Documentação</h2>
        <p className="text-sm text-gray-600 mt-1">MongoDB → MySQL</p>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-sm font-medium text-blue-800 mb-2">💡 Dica</h3>
        <p className="text-xs text-blue-700">Use Ctrl+F para buscar conteúdo específico em cada página.</p>
      </div>
    </div>
  )
}
