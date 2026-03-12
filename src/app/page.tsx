'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://seudominio.com';
  
  const exampleUrl = `${baseUrl}/api/track?linkname=canal_a&nomecampanha=campanha_teste&valor=40&dataRegistro=2026-03-12`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exampleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Sistema de Tracking
          </h1>
          <p className="text-xl text-gray-600">
            Rastreie suas campanhas e eventos de forma simples e eficiente
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Como usar
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                1. Formato da URL de Tracking
              </h3>
              <p className="text-gray-600 mb-4">
                Faça requisições HTTP GET para o endpoint abaixo com os parâmetros necessários:
              </p>
              <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                <code className="text-sm text-gray-800 break-all">
                  {baseUrl}/api/track?linkname=<span className="text-primary-600">{'{{link_name}}'}</span>&nomecampanha=<span className="text-primary-600">{'{{campaign_name}}'}</span>&valor=<span className="text-primary-600">{'{{value}}'}</span>&dataRegistro=<span className="text-primary-600">{'{{registration_date}}'}</span>
                </code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                2. Parâmetros obrigatórios
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                  <strong className="text-gray-900">linkname:</strong> Nome identificador do link (ex: canal_a, fonte_b)
                </li>
                <li>
                  <strong className="text-gray-900">nomecampanha:</strong> Nome da campanha (ex: campanha_teste, promo_verao)
                </li>
                <li>
                  <strong className="text-gray-900">valor:</strong> Valor numérico do evento (ex: 40, 150.50)
                </li>
                <li>
                  <strong className="text-gray-900">dataRegistro:</strong> Data do registro no formato YYYY-MM-DD ou ISO 8601
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                3. Exemplo de URL completa
              </h3>
              <div className="bg-gray-50 rounded-md p-4 border border-gray-200 relative">
                <code className="text-sm text-gray-800 break-all pr-12">
                  {exampleUrl}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors"
                >
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                4. Resposta da API
              </h3>
              <p className="text-gray-600 mb-4">
                Em caso de sucesso, você receberá uma resposta JSON:
              </p>
              <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                <pre className="text-sm text-gray-800 overflow-x-auto">
{`{
  "success": true,
  "message": "Evento registrado com sucesso",
  "data": {
    "id": "123",
    "link_name": "canal_a",
    "campaign_name": "campanha_teste",
    "value": 40,
    "registration_date": "2026-03-12T00:00:00.000Z",
    "created_at": "2026-03-12T10:30:00.000Z"
  }
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                5. Dados capturados automaticamente
              </h3>
              <p className="text-gray-600 mb-2">
                O sistema também captura automaticamente:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Endereço IP do cliente</li>
                <li>User-Agent do navegador</li>
                <li>Data e hora da criação do evento</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recursos disponíveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-primary-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="font-semibold text-gray-900">Dashboard completo</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Visualize estatísticas, gráficos e tabelas com todos os eventos
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-primary-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <h3 className="font-semibold text-gray-900">Filtros avançados</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Filtre por campanha, link, data e busca por texto
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-primary-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="font-semibold text-gray-900">Estatísticas em tempo real</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Acompanhe valores totais, eventos e campanhas únicas
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-primary-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="font-semibold text-gray-900">Paginação inteligente</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Navegue facilmente por grandes volumes de dados
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-colors"
          >
            Acessar Dashboard
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
