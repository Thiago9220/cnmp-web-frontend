// TrimestralTableRow.jsx
import React from 'react';
import { Tr, Td, Text, Tooltip, Input, IconButton, Stack } from '@chakra-ui/react';
import { InfoIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';

const TrimestralTableRow = ({
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
  trimestres,
  currentTrimester
}) => (
  <Tr>
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

    {/* Coluna com Tooltip e label */}
    <Td p="1" textAlign="left" border="1px solid" borderColor="gray.300">
      <Tooltip label={`Informações sobre ${label}`} aria-label="Tooltip">
        <Text>
          <InfoIcon mr="2" />
          {label}
        </Text>
      </Tooltip>
    </Td>

    {/* Renderiza os 4 trimestres */}
    {trimestres.map((trim, index) => (
      <Td
        key={`${type}-${index}`}
        textAlign="center"
        p="1"
        border="1px solid"
        borderColor="gray.300"
        bgColor={index === currentTrimester ? 'gray.200' : 'white'}
        fontWeight={index === currentTrimester ? 'medium' : 'normal'}
      >
        {type === 'calculado' ? (
          <Text>
            {valorCalculado[index]?.toFixed
              ? valorCalculado[index].toFixed(2)
              : valorCalculado[index] || 0}%
          </Text>
        ) : type === 'analise' ? (
          <Stack direction="row" spacing={2} justify="center" align="center">
            <IconButton
              size="xs"
              icon={<EditIcon />}
              aria-label="Editar Análise"
              onClick={() => openEditModal(index)}
              isDisabled={index > currentTrimester}
            />
            <IconButton
              size="xs"
              icon={<ViewIcon />}
              aria-label="Visualizar Análise"
              onClick={() => openViewModal(index)}
              isDisabled={!formData.analiseTrimestral[index]}
            />
          </Stack>
        ) : (
          <Input
            size="sm"
            variant="outline"
            textAlign="center"
            value={formData[type][index]}
            onChange={(e) => handleInputChange(type, index, e.target.value)}
            placeholder="0,00"
            isDisabled={index > currentTrimester}
          />
        )}
      </Td>
    ))}

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
        />
      </Td>
    )}
  </Tr>
);

export default TrimestralTableRow;
