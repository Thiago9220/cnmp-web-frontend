import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Box, Button, Heading } from '@chakra-ui/react';
import TrimestralTableRow from './TrimestralTableRow';
import AnalysisModal from '../AnalysisModal';

const trimestres = ['1º Trimestre', '2º Trimestre', '3º Trimestre', '4º Trimestre'];

const currentTrimester = Math.floor(new Date().getMonth() / 3);

const TrimestralTableView = ({
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
  if (
    !formData ||
    !formData.prescrito ||
    formData.prescrito.length !== 4
  ) {
    return <p>Carregando dados trimestrais...</p>;
  }

  return (
    <>
      <Heading as="h3" size="sm" mb="4" textAlign="center">
        {selectedIndicator || 'Selecione um Indicador'} - Trimestral
      </Heading>

      <Table variant="simple" size="sm" colorScheme="gray">
        <Thead>
          <Tr>
            <Th rowSpan="2" p="1" textAlign="center">Indicador</Th>
            <Th rowSpan="2" p="1" textAlign="center">Valores</Th>
            {trimestres.map((trim) => (
              <Th key={trim} textAlign="center" p="1">{trim}</Th>
            ))}
            <Th rowSpan="2" p="1" textAlign="center">
              Meta {selectedDate.getFullYear()}
            </Th>
          </Tr>
        </Thead>
        <Tbody>

          <TrimestralTableRow
            label="Número Prescrito"
            type="prescrito"
            formData={formData}
            handleInputChange={handleInputChange}
            valorCalculado={valorCalculado}
            openEditModal={openEditModal}
            openViewModal={openViewModal}
            selectedIndicator={selectedIndicator}
            meta={meta}
            setMeta={setMeta}
            trimestres={trimestres}
            currentTrimester={currentTrimester}
          />


          <TrimestralTableRow
            label="Número Finalizado"
            type="finalizado"
            formData={formData}
            handleInputChange={handleInputChange}
            valorCalculado={valorCalculado}
            openEditModal={openEditModal}
            openViewModal={openViewModal}
            trimestres={trimestres}
            currentTrimester={currentTrimester}
          />


          <TrimestralTableRow
            label="Valor Calculado"
            type="calculado"
            formData={formData}
            valorCalculado={valorCalculado}
            trimestres={trimestres}
            currentTrimester={currentTrimester}
          />


          <TrimestralTableRow
            label="Análise Trimestral"
            type="analise"
            formData={formData}
            openEditModal={openEditModal}
            openViewModal={openViewModal}
            trimestres={trimestres}
            currentTrimester={currentTrimester}
          />
        </Tbody>
      </Table>

      <Box textAlign="center" mt="4">
        <Button bg="red.600" colorScheme="red" onClick={salvarDados}>
          Salvar Dados Trimestrais
        </Button>
      </Box>

      <AnalysisModal
        isOpen={isOpen}
        onClose={onClose}
        selectedMonth={trimestres[selectedMonth]}
        selectedMonthText={selectedMonthText}
        setSelectedMonthText={setSelectedMonthText}
        modalMode={modalMode}
        saveAnalysis={saveAnalysis}
      />
    </>
  );
};

export default TrimestralTableView;
