import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'

// auth
import LoginPage from './pages/auth/LoginPage'
import RecoverPasswordPage from './pages/auth/RecoverPasswordPage'
// home
import HomePage from './pages/home/HomePage'
// operacao
import OperacaoDashboard from './pages/operacao/OperacaoDashboard'
import ColetasList from './pages/operacao/ColetasList'
import ColetaNova from './pages/operacao/ColetaNova'
import OrdensList from './pages/operacao/OrdensList'
import OrdemDetalhe from './pages/operacao/OrdemDetalhe'
import EtapasLogisticas from './pages/operacao/EtapasLogisticas'
import OrdemEtapas from './pages/operacao/OrdemEtapas'
import ProgramacaoCargas from './pages/operacao/ProgramacaoCargas'
import Expedicao from './pages/operacao/Expedicao'
import LiberacaoViagem from './pages/operacao/LiberacaoViagem'
import Rastreabilidade from './pages/operacao/Rastreabilidade'
import MapaFrota from './pages/operacao/MapaFrota'
import EventosFilial from './pages/operacao/EventosFilial'
import CargasTransferencia from './pages/operacao/CargasTransferencia'
import UltimaMilha from './pages/operacao/UltimaMilha'
import EntregasList from './pages/operacao/EntregasList'
import EntregaDetalhe from './pages/operacao/EntregaDetalhe'
import OcorrenciasList from './pages/operacao/OcorrenciasList'
import OcorrenciaDetalhe from './pages/operacao/OcorrenciaDetalhe'
import DocumentosFiscais from './pages/operacao/DocumentosFiscais'
import DevicesList from './pages/operacao/DevicesList'
import Comprovantes from './pages/operacao/Comprovantes'
// cliente
import ClienteLogin from './pages/cliente/ClienteLogin'
import ClienteRastreio from './pages/cliente/ClienteRastreio'
import ClienteDashboard from './pages/cliente/ClienteDashboard'
import ClienteEntregaDetalhe from './pages/cliente/ClienteEntregaDetalhe'
import ClienteNotificacoes from './pages/cliente/ClienteNotificacoes'
import ClienteAPI from './pages/cliente/ClienteAPI'
// motorista
import MotoristaLogin from './pages/motorista/MotoristaLogin'
import MotoristaInicio from './pages/motorista/MotoristaInicio'
import MotoristaRota from './pages/motorista/MotoristaRota'
import MotoristaEntregaDetalhe from './pages/motorista/MotoristaEntregaDetalhe'
import MotoristaOcorrencia from './pages/motorista/MotoristaOcorrencia'
import MotoristaConfirmarEntrega from './pages/motorista/MotoristaConfirmarEntrega'
import MotoristaChat from './pages/motorista/MotoristaChat'
// IA
import IACliente from './pages/ia/IACliente'
import IAOperacao from './pages/ia/IAOperacao'
import IAConfiguracoes from './pages/ia/IAConfiguracoes'
import IAAlertas from './pages/ia/IAAlertas'
// migração
import MigracaoDashboard from './pages/migracao/MigracaoDashboard'
import MigracaoImportacao from './pages/migracao/MigracaoImportacao'
import MigracaoDePara from './pages/migracao/MigracaoDePara'
import MigracaoStatus from './pages/migracao/MigracaoStatus'
import MigracaoInconsistencias from './pages/migracao/MigracaoInconsistencias'
import MigracaoGoLive from './pages/migracao/MigracaoGoLive'
// admin
import AdminUsuarios from './pages/admin/AdminUsuarios'
import AdminIntegracoes from './pages/admin/AdminIntegracoes'
import AdminStatusEventos from './pages/admin/AdminStatusEventos'
import AdminGeofences from './pages/admin/AdminGeofences'
import AdminTemplates from './pages/admin/AdminTemplates'
import AdminAuditoriaLGPD from './pages/admin/AdminAuditoriaLGPD'
import AdminConfigOperacionais from './pages/admin/AdminConfigOperacionais'
import AdminConfigFiscais from './pages/admin/AdminConfigFiscais'
// cadastros
import ClientesList from './pages/cadastros/ClientesList'
import ClienteDetalhe from './pages/cadastros/ClienteDetalhe'
import RemetentesList from './pages/cadastros/RemetentesList'
import DestinatariosList from './pages/cadastros/DestinatariosList'
import VeiculosList from './pages/cadastros/VeiculosList'
import VeiculoDetalhe from './pages/cadastros/VeiculoDetalhe'
import MotoristasList from './pages/cadastros/MotoristasList'
import MotoristaDetalhe from './pages/cadastros/MotoristaDetalhe'
import FiliaisList from './pages/cadastros/FiliaisList'
import TerceirosList from './pages/cadastros/TerceirosList'
import TerceiroDetalhe from './pages/cadastros/TerceiroDetalhe'
// comercial / financeiro
import TabelasFrete from './pages/comercial/TabelasFrete'
import SimulacaoFrete from './pages/comercial/SimulacaoFrete'
import Faturamento from './pages/financeiro/Faturamento'
// relatórios e design system
import Relatorios from './pages/relatorios/Relatorios'
import DesignSystem from './pages/design-system/DesignSystem'
// integrações
import RastreadoresTerceiros from './pages/integracoes/RastreadoresTerceiros'

function Shell({ Component }: { Component: React.ComponentType }) {
  return <AppShell><Component /></AppShell>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recover-password" element={<RecoverPasswordPage />} />

      {/* Home */}
      <Route path="/home" element={<HomePage />} />

      {/* Cliente (portal cliente) */}
      <Route path="/cliente/login" element={<ClienteLogin />} />
      <Route path="/cliente/rastreio" element={<ClienteRastreio />} />
      <Route path="/cliente/dashboard" element={<ClienteDashboard />} />
      <Route path="/cliente/entregas/:id" element={<ClienteEntregaDetalhe />} />
      <Route path="/cliente/notificacoes" element={<ClienteNotificacoes />} />
      <Route path="/cliente/api" element={<ClienteAPI />} />

      {/* Motorista */}
      <Route path="/motorista/login" element={<MotoristaLogin />} />
      <Route path="/motorista/inicio" element={<MotoristaInicio />} />
      <Route path="/motorista/rota" element={<MotoristaRota />} />
      <Route path="/motorista/entrega/:id" element={<MotoristaEntregaDetalhe />} />
      <Route path="/motorista/ocorrencia" element={<MotoristaOcorrencia />} />
      <Route path="/motorista/confirmar-entrega" element={<MotoristaConfirmarEntrega />} />
      <Route path="/motorista/chat" element={<MotoristaChat />} />

      {/* IA cliente (público com shell light) */}
      <Route path="/ia/cliente" element={<IACliente />} />

      {/* Tudo abaixo com AppShell (operação) */}
      <Route path="/operacao/dashboard" element={<Shell Component={OperacaoDashboard} />} />
      <Route path="/operacao/coletas" element={<Shell Component={ColetasList} />} />
      <Route path="/operacao/coletas/nova" element={<Shell Component={ColetaNova} />} />
      <Route path="/operacao/ordens" element={<Shell Component={OrdensList} />} />
      <Route path="/operacao/ordens/:id" element={<Shell Component={OrdemDetalhe} />} />
      <Route path="/operacao/ordens/:id/etapas" element={<Shell Component={OrdemEtapas} />} />
      <Route path="/operacao/etapas-logisticas" element={<Shell Component={EtapasLogisticas} />} />
      <Route path="/operacao/programacao-cargas" element={<Shell Component={ProgramacaoCargas} />} />
      <Route path="/operacao/expedicao" element={<Shell Component={Expedicao} />} />
      <Route path="/operacao/liberacao-viagem" element={<Shell Component={LiberacaoViagem} />} />
      <Route path="/operacao/rastreabilidade" element={<Shell Component={Rastreabilidade} />} />
      <Route path="/operacao/mapa" element={<Shell Component={MapaFrota} />} />
      <Route path="/operacao/eventos-filial" element={<Shell Component={EventosFilial} />} />
      <Route path="/operacao/cargas-transferencia" element={<Shell Component={CargasTransferencia} />} />
      <Route path="/operacao/ultima-milha" element={<Shell Component={UltimaMilha} />} />
      <Route path="/operacao/entregas" element={<Shell Component={EntregasList} />} />
      <Route path="/operacao/entregas/:id" element={<Shell Component={EntregaDetalhe} />} />
      <Route path="/operacao/ocorrencias" element={<Shell Component={OcorrenciasList} />} />
      <Route path="/operacao/ocorrencias/:id" element={<Shell Component={OcorrenciaDetalhe} />} />
      <Route path="/operacao/documentos" element={<Shell Component={DocumentosFiscais} />} />
      <Route path="/operacao/devices" element={<Shell Component={DevicesList} />} />
      <Route path="/operacao/comprovantes" element={<Shell Component={Comprovantes} />} />

      {/* Comercial / Financeiro */}
      <Route path="/comercial/tabelas-frete" element={<Shell Component={TabelasFrete} />} />
      <Route path="/comercial/simulacao-frete" element={<Shell Component={SimulacaoFrete} />} />
      <Route path="/financeiro/faturamento" element={<Shell Component={Faturamento} />} />

      {/* Cadastros */}
      <Route path="/cadastros/clientes" element={<Shell Component={ClientesList} />} />
      <Route path="/cadastros/clientes/:id" element={<Shell Component={ClienteDetalhe} />} />
      <Route path="/cadastros/remetentes" element={<Shell Component={RemetentesList} />} />
      <Route path="/cadastros/destinatarios" element={<Shell Component={DestinatariosList} />} />
      <Route path="/cadastros/veiculos" element={<Shell Component={VeiculosList} />} />
      <Route path="/cadastros/veiculos/:id" element={<Shell Component={VeiculoDetalhe} />} />
      <Route path="/cadastros/motoristas" element={<Shell Component={MotoristasList} />} />
      <Route path="/cadastros/motoristas/:id" element={<Shell Component={MotoristaDetalhe} />} />
      <Route path="/cadastros/filiais" element={<Shell Component={FiliaisList} />} />
      <Route path="/cadastros/terceiros" element={<Shell Component={TerceirosList} />} />
      <Route path="/cadastros/terceiros/:id" element={<Shell Component={TerceiroDetalhe} />} />

      {/* IA */}
      <Route path="/ia/operacao" element={<Shell Component={IAOperacao} />} />
      <Route path="/ia/configuracoes" element={<Shell Component={IAConfiguracoes} />} />
      <Route path="/ia/alertas" element={<Shell Component={IAAlertas} />} />

      {/* Integrações */}
      <Route path="/integracoes/rastreadores-terceiros" element={<Shell Component={RastreadoresTerceiros} />} />

      {/* Admin */}
      <Route path="/admin/usuarios" element={<Shell Component={AdminUsuarios} />} />
      <Route path="/admin/integracoes" element={<Shell Component={AdminIntegracoes} />} />
      <Route path="/admin/status-eventos" element={<Shell Component={AdminStatusEventos} />} />
      <Route path="/admin/geofences" element={<Shell Component={AdminGeofences} />} />
      <Route path="/admin/templates" element={<Shell Component={AdminTemplates} />} />
      <Route path="/admin/auditoria-lgpd" element={<Shell Component={AdminAuditoriaLGPD} />} />
      <Route path="/admin/configuracoes-operacionais" element={<Shell Component={AdminConfigOperacionais} />} />
      <Route path="/admin/configuracoes-fiscais" element={<Shell Component={AdminConfigFiscais} />} />

      {/* Migração */}
      <Route path="/migracao/dashboard" element={<Shell Component={MigracaoDashboard} />} />
      <Route path="/migracao/importacao" element={<Shell Component={MigracaoImportacao} />} />
      <Route path="/migracao/de-para" element={<Shell Component={MigracaoDePara} />} />
      <Route path="/migracao/status" element={<Shell Component={MigracaoStatus} />} />
      <Route path="/migracao/inconsistencias" element={<Shell Component={MigracaoInconsistencias} />} />
      <Route path="/migracao/go-live" element={<Shell Component={MigracaoGoLive} />} />

      {/* Relatórios e design system */}
      <Route path="/relatorios" element={<Shell Component={Relatorios} />} />
      <Route path="/design-system" element={<Shell Component={DesignSystem} />} />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}
