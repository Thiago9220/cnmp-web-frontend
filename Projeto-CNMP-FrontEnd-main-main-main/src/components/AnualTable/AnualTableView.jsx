import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Box, Button, Heading } from '@chakra-ui/react';
import AnualTableRow from './AnualTableRow';
import AnalysisModal from '../AnalysisModal';

// Array com os 12 meses do ano
const meses = [
  'Janeiro', 
  'Fevereiro', 
  'Março', 
  'Abril', 
  'Maio', 
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

// Mês atual (0 = janeiro, 1 = fevereiro, ..., 11 = dezembro)
const currentMonth = new Date().getMonth();

const AnualTableView = ({
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
  // Verificação se formData está pronto para anual
  // Esperamos que formData tenha arrays como formData.prescrito, formData.finalizado, 
  // formData.analiseAnual, cada um com length = 12
  if (
    !formData ||
    !formData.prescrito ||
    formData.prescrito.length !== 12 ||
    !formData.finalizado ||
    formData.finalizado.length !== 12 ||
    !formData.analiseAnual ||
    formData.analiseAnual.length !== 12
  ) {
    return <p>Carregando dados anuais...</p>;
  }

  return (
    <>
      <Heading as="h3" size="sm" mb="4" textAlign="center">
        Prescrição de Processos Administrativos Disciplinares (PAD) - Anual
      </Heading>
      <Table variant="simple" size="sm" colorScheme="gray">
        <Thead>
          <Tr>
            <Th rowSpan="2" p="1" textAlign="center">Indicador</Th>
            <Th rowSpan="2" p="1" textAlign="center">Valores</Th>
            {meses.map((mes, idx) => (
              <Th key={idx} textAlign="center" p="1">
                {mes}
              </Th>
            ))}
            <Th rowSpan="2" p="1" textAlign="center">
              Meta {selectedDate.getFullYear()}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <AnualTableRow
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
            meses={meses}
            currentMonth={currentMonth}
          />
          <AnualTableRow
            label="Número de PAD finalizados no período"
            type="finalizado"
            formData={formData}
            handleInputChange={handleInputChange}
            valorCalculado={valorCalculado}
            openEditModal={openEditModal}
            openViewModal={openViewModal}
            meses={meses}
            currentMonth={currentMonth}
          />
          <AnualTableRow
            label="Valor Calculado"
            type="calculado"
            formData={formData}
            valorCalculado={valorCalculado}
            meses={meses}
            currentMonth={currentMonth}
          />
          <AnualTableRow
            label="Análise Mensal"
            type="analise"
            formData={formData}
            openEditModal={openEditModal}
            openViewModal={openViewModal}
            meses={meses}
            currentMonth={currentMonth}
          />
        </Tbody>
      </Table>
      <Box textAlign="center" mt="4">
        <Button bg="red.600" colorScheme="red" onClick={salvarDados}>
          Salvar Dados Anuais
        </Button>
      </Box>
      <AnalysisModal
        isOpen={isOpen}
        onClose={onClose}
        selectedMonth={meses[selectedMonth]}
        selectedMonthText={selectedMonthText}
        setSelectedMonthText={setSelectedMonthText}
        modalMode={modalMode}
        saveAnalysis={saveAnalysis}
      />
    </>
  );
};

export default AnualTableView;
