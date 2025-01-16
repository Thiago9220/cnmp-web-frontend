import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Box, Button, Heading } from '@chakra-ui/react';
import MonthlyTableRow from './MonthlyTableRow';
import AnalysisModal from '../AnalysisModal';

// Os 12 meses
const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

// Mês atual (0 = Janeiro, 1 = Fevereiro, ..., 11 = Dezembro)
const currentMonth = new Date().getMonth();

const MonthlyTableView = ({
  selectedDate,
  selectedIndicator,
  meta,
  setMeta,
  formData,
  handleInputChange,
  valorCalculado,
  openEditModal,
  openViewModal,
  isOpen,
  onClose,
  modalMode,
  selectedMonth,
  selectedMonthText,
  setSelectedMonthText,
  saveAnalysis,
  salvarDados
}) => {
  // Verifica se todas as estruturas necessárias existem e têm 12 posições
  if (
    !formData ||
    !formData.prescrito || formData.prescrito.length !== 12 ||
    !formData.finalizado || formData.finalizado.length !== 12 ||
    !formData.analiseMensal || formData.analiseMensal.length !== 12 ||
    !Array.isArray(valorCalculado) || valorCalculado.length !== 12
  ) {
    return <p>Carregando dados mensais...</p>;
  }

  return (
    <>
      <Heading as="h3" size="sm" mb="4" textAlign="center">
        Prescrição de Processos Administrativos Disciplinares (PAD) - Mensal
      </Heading>

      <Table variant="simple" size="sm" colorScheme="gray">
        <Thead>
          <Tr>
            {/* Indicador (coluna mesclada nas linhas) */}
            <Th rowSpan="2" p="1" textAlign="center">Indicador</Th>
            {/* Título da coluna de "Valores" */}
            <Th rowSpan="2" p="1" textAlign="center">Valores</Th>

            {/* Cabeçalho para cada mês */}
            {months.map((month) => (
              <Th key={month} textAlign="center" p="1">
                {month}
              </Th>
            ))}

            {/* Meta (coluna mesclada) */}
            <Th rowSpan="2" p="1" textAlign="center">
              Meta {selectedDate.getFullYear()}
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {/* Linha 1 => "Número de PAD prescritos" */}
          <MonthlyTableRow
            label="Número de PAD prescritos"
            type="prescrito"
            formData={formData}
            handleInputChange={handleInputChange}
            valorCalculado={valorCalculado}
            openEditModal={openEditModal}
            openViewModal={openViewModal}
            selectedIndicator={selectedIndicator}
            meta={meta}
            setMeta={setMeta}
            months={months}
            currentMonth={currentMonth}
          />

          {/* Linha 2 => "Número de PAD finalizados" */}
          <MonthlyTableRow
            label="Número de PAD finalizados no período"
            type="finalizado"
            formData={formData}
            handleInputChange={handleInputChange}
            valorCalculado={valorCalculado}
            openEditModal={openEditModal}
            openViewModal={openViewModal}
            months={months}
            currentMonth={currentMonth}
          />

          {/* Linha 3 => "Valor Calculado" (apenas leitura, exibe a % calculada) */}
          <MonthlyTableRow
            label="Valor Calculado"
            type="calculado"
            formData={formData}
            valorCalculado={valorCalculado}
            months={months}
            currentMonth={currentMonth}
          />

          {/* Linha 4 => "Análise Mensal" (botões de Editar/Visualizar) */}
          <MonthlyTableRow
            label="Análise Mensal"
            type="analise"
            formData={formData}
            openEditModal={openEditModal}
            openViewModal={openViewModal}
            months={months}
            currentMonth={currentMonth}
          />
        </Tbody>
      </Table>

      <Box textAlign="center" mt="4">
        <Button bg="red.600" colorScheme="red" onClick={salvarDados}>
          Salvar Dados Mensais
        </Button>
      </Box>

      {/* Modal de Análise (usar se for exibir/editar textos) */}
      <AnalysisModal
        isOpen={isOpen}
        onClose={onClose}
        selectedMonth={months[selectedMonth]}
        selectedMonthText={selectedMonthText}
        setSelectedMonthText={setSelectedMonthText}
        modalMode={modalMode}
        saveAnalysis={saveAnalysis}
      />
    </>
  );
};

export default MonthlyTableView;
