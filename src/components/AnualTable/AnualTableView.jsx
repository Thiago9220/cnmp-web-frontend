import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Heading,
  Text,
  Input,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { InfoIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import AnalysisModal from '../AnalysisModal';

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
  salvarDados,
}) => {
  if (
    !formData ||
    !formData.prescrito ||
    !formData.finalizado ||
    !formData.analiseAnual
  ) {
    return <p>Carregando dados anuais...</p>;
  }

  const index = 0;

  const prescritoValue = formData.prescrito[index] || '';
  const finalizadoValue = formData.finalizado[index] || '';
  const analiseValue = formData.analiseAnual[index] || '';
  const calculadoPercent = valorCalculado?.[index] || 0;

  return (
    <>
      <Heading as="h3" size="sm" mb="4" textAlign="center">
        Prescrição de Processos Administrativos Disciplinares (PAD) - Anual
      </Heading>

      <Table variant="simple" size="sm" colorScheme="gray">
        <Thead>
          <Tr>
            <Th p="1" textAlign="center">Indicador</Th>
            <Th p="1" textAlign="center">Valores</Th>
            <Th p="1" textAlign="center">
              Ano {selectedDate.getFullYear()}
            </Th>
            <Th p="1" textAlign="center">
              Meta {selectedDate.getFullYear()}
            </Th>
          </Tr>
        </Thead>

        <Tbody>

          <Tr>

            <Td
              rowSpan={4}
              p="1"
              textAlign="center"
              border="1px solid"
              borderColor="gray.300"
              fontWeight="bold"
            >
              {selectedIndicator || 'Selecione um Indicador'}
            </Td>


            <Td
              p="1"
              textAlign="left"
              border="1px solid"
              borderColor="gray.300"
            >
              <InfoIcon mr="2" />
              Número de PAD prescritos
            </Td>


            <Td
              p="1"
              textAlign="center"
              border="1px solid"
              borderColor="gray.300"
            >
              <Input
                size="sm"
                variant="outline"
                textAlign="center"
                value={prescritoValue}
                placeholder="0"
                onChange={(e) => handleInputChange('prescrito', index, e.target.value)}
              />
            </Td>


            <Td
              rowSpan={4}
              p="1"
              textAlign="center"
              border="1px solid"
              borderColor="gray.300"
            >
              <Input
                size="sm"
                variant="outline"
                textAlign="center"
                value={meta}
                onChange={(e) => setMeta(e.target.value)}
                placeholder="Meta anual"
              />
            </Td>
          </Tr>


          <Tr>
            <Td
              p="1"
              textAlign="left"
              border="1px solid"
              borderColor="gray.300"
            >
              <InfoIcon mr="2" />
              Número de PAD finalizados
            </Td>

            <Td
              p="1"
              textAlign="center"
              border="1px solid"
              borderColor="gray.300"
            >
              <Input
                size="sm"
                variant="outline"
                textAlign="center"
                value={finalizadoValue}
                placeholder="0"
                onChange={(e) => handleInputChange('finalizado', index, e.target.value)}
              />
            </Td>
          </Tr>


          <Tr>
            <Td
              p="1"
              textAlign="left"
              border="1px solid"
              borderColor="gray.300"
            >
              <InfoIcon mr="2" />
              Valor Calculado
            </Td>

            <Td
              p="1"
              textAlign="center"
              border="1px solid"
              borderColor="gray.300"
            >

              <Text fontWeight="medium">
                {calculadoPercent.toFixed(2)}%
              </Text>
            </Td>
          </Tr>


          <Tr>
            <Td
              p="1"
              textAlign="left"
              border="1px solid"
              borderColor="gray.300"
            >
              <InfoIcon mr="2" />
              Análise Anual
            </Td>

            <Td
              p="1"
              textAlign="center"
              border="1px solid"
              borderColor="gray.300"
            >
              <Stack direction="row" spacing={2} justify="center" align="center">
                <IconButton
                  size="xs"
                  icon={<EditIcon />}
                  aria-label="Editar Análise"
                  onClick={() => openEditModal(0)}
                />
                <IconButton
                  size="xs"
                  icon={<ViewIcon />}
                  aria-label="Visualizar Análise"
                  onClick={() => openViewModal(0)}
                  isDisabled={!analiseValue}
                />
              </Stack>
            </Td>
          </Tr>
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
        selectedMonthText={selectedMonthText}
        setSelectedMonthText={setSelectedMonthText}
        modalMode={modalMode}
        saveAnalysis={saveAnalysis}
      />
    </>
  );
};

export default AnualTableView;
