import { Tr, Td, Text, Tooltip, Input, IconButton, Stack } from '@chakra-ui/react';
import { InfoIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';

const MonthlyTableRow = ({
  label,
  type,
  formData,
  handleInputChange,
  valorCalculado,
  openEditModal,
  openViewModal,
  selectedIndicator,
  meta,
  setMeta,
  months,
  currentMonth
}) => {
  return (
    <Tr>
      {/* Coluna do Indicador aparece apenas para a primeira linha (type === 'prescrito') */}
      {type === 'prescrito' && (
        <Td
          rowSpan="4"
          p="1"
          textAlign="center"
          border="1px solid"
          borderColor="gray.300"
        >
          <Text fontWeight="bold">
            {selectedIndicator || 'Selecione um Indicador'}
          </Text>
        </Td>
      )}

      {/* Coluna com o label (ex.: "Número de PAD prescritos") */}
      <Td p="1" textAlign="left" border="1px solid" borderColor="gray.300">
        <Tooltip label={`Informações sobre ${label}`} aria-label="Tooltip">
          <Text>
            <InfoIcon mr="2" />
            {label}
          </Text>
        </Tooltip>
      </Td>

      {/* Colunas referentes aos 12 meses */}
      {months.map((month, index) => (
        <Td
          key={`${type}-${index}`}
          textAlign="center"
          p="1"
          border="1px solid"
          borderColor="gray.300"
          bgColor={index === currentMonth ? 'gray.200' : 'white'}
          fontWeight={index === currentMonth ? 'medium' : 'normal'}
        >
          {type === 'calculado' ? (
            // Exibe a % calculada. Precisamos acessar com segurança:
            <Text>
              {valorCalculado && valorCalculado[index] != null
                ? valorCalculado[index].toFixed(2) + '%'
                : '0%'
              }
            </Text>
          ) : type === 'analise' ? (
            <Stack direction="row" spacing={2} justify="center" align="center">
              <IconButton
                size="xs"
                icon={<EditIcon />}
                aria-label="Editar Análise"
                onClick={() => openEditModal(index)}
                // Ajuste se deseja permitir edição retroativa ou não
                isDisabled={index >= currentMonth}
              />
              <IconButton
                size="xs"
                icon={<ViewIcon />}
                aria-label="Visualizar Análise"
                onClick={() => openViewModal(index)}
                // Só habilita se houver texto em analiseMensal[index]
                isDisabled={!formData.analiseMensal || !formData.analiseMensal[index]}
              />
            </Stack>
          ) : (
            // Prescrito ou Finalizado
            <Input
              size="sm"
              variant="outline"
              textAlign="center"
              // Acesso seguro: caso formData[type] não exista, pode gerar erro. 
              // Mas se você garantiu no TableView que formData[type] é array[12], já está ok.
              value={formData[type] ? formData[type][index] : ''}
              onChange={(e) => handleInputChange(type, index, e.target.value)}
              placeholder="0,00"
              isDisabled={index >= currentMonth}
            />
          )}
        </Td>
      ))}

      {/* Coluna de Meta aparece na primeira linha (type === 'prescrito') unindo as 4 linhas. */}
      {type === 'prescrito' && (
        <Td
          rowSpan="4"
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
            placeholder="0%"
          />
        </Td>
      )}
    </Tr>
  );
};

export default MonthlyTableRow;
