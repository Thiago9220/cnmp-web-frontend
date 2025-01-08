import React, { useState } from 'react';
import { ChakraProvider, Box, Select, Button, useDisclosure, useToast } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from '@chakra-ui/icons';

// Hook de dados (ajuste conforme seu projeto)
import { useIndicadorData } from '../../hooks/useIndicadorData';

// Componentes de cada visualização
import MonthlyTableView from '../../components/MonthlyTable/MonthlyTableView';
import BimestralTableView from '../../components/BimestralTable/BimestralTableView';
import TrimestralTableView from '../../components/TrimestralTable/TrimestralTableView';
import SemestralTableView from '../../components/SemestralTable/SemestralTableView';


const IndicadoresPage = () => {
  // Define qual visualização (mensal, bimestral, trimestral, semestral)
  const [viewType, setViewType] = useState('mensal');

  // Data selecionada (mês ou ano, dependendo da visualização)
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Lógica de exibição/fechamento do modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Notificações do Chakra
  const toast = useToast();

  // Hook personalizado para lidar com dados do indicador
  const {
    indicators,           // lista de indicadores disponíveis
    selectedIndicator,    // indicador escolhido
    setSelectedIndicator, // setter do indicador escolhido
    meta,
    setMeta,
    formData,             // dados do formulário (valores prescrito, finalizado etc.)
    setFormData,
    handleInputChange,    // lida com alterações de input
    valorCalculado,
    salvarDados           // função para salvar no backend ou local
  } = useIndicadorData(viewType);

  // Define o modo do modal (visualizar/editar)
  const [modalMode, setModalMode] = useState('');
  // Índice do mês, bimestre, trimestre ou semestre selecionado para edição/visualização
  const [selectedMonth, setSelectedMonth] = useState(null);
  // Texto de análise (mensal, bimestral, trimestral ou semestral)
  const [selectedMonthText, setSelectedMonthText] = useState('');

  // Ao abrir modal de Edição
  const openEditModal = (index) => {
    setSelectedMonth(index);

    // Define o campo de análise correto conforme a visualização
    const analysisField =
      viewType === 'mensal'
        ? 'analiseMensal'
        : viewType === 'bimestral'
        ? 'analiseBimestral'
        : viewType === 'semestral'
        ? 'analiseSemestral'
        : 'analiseTrimestral';

    setSelectedMonthText(formData[analysisField][index] || '');
    setModalMode('edit');
    onOpen();
  };

  // Ao abrir modal de Visualização
  const openViewModal = (index) => {
    setSelectedMonth(index);

    const analysisField =
      viewType === 'mensal'
        ? 'analiseMensal'
        : viewType === 'bimestral'
        ? 'analiseBimestral'
        : viewType === 'semestral'
        ? 'analiseSemestral'
        : 'analiseTrimestral';

    setSelectedMonthText(formData[analysisField][index] || '');
    setModalMode('view');
    onOpen();
  };

  // Salvar a análise (chamado pelo modal)
  const saveAnalysis = () => {
    const analysisField =
      viewType === 'mensal'
        ? 'analiseMensal'
        : viewType === 'bimestral'
        ? 'analiseBimestral'
        : viewType === 'semestral'
        ? 'analiseSemestral'
        : 'analiseTrimestral';

    setFormData((prev) => ({
      ...prev,
      [analysisField]: prev[analysisField].map((item, i) =>
        i === selectedMonth ? selectedMonthText : item
      ),
    }));

    toast({
      title: `Análise ${viewType === 'mensal' 
        ? 'Mensal' 
        : viewType === 'bimestral' 
        ? 'Bimestral' 
        : viewType === 'semestral' 
        ? 'Semestral' 
        : 'Trimestral'} salva!`,
      description: 'O conteúdo foi atualizado.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    onClose();
  };

  return (
    <ChakraProvider>
      <Box padding="4" maxW="100%" margin="auto">
        
        {/* SELETOR DE DATA E INDICADOR */}
        <Box mb="4" textAlign="center">

          {/* DatePicker para escolher mês/ano ou somente ano */}
          <Box mb="4">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              // Exemplo: para bimestral, trimestral e semestral, podemos usar showYearPicker
              showYearPicker={viewType !== 'mensal'}
              dateFormat={viewType === 'mensal' ? "MM/yyyy" : "yyyy"}
              customInput={
                <Button leftIcon={<CalendarIcon />} variant="outline">
                  {viewType === 'mensal'
                    ? selectedDate.toLocaleDateString('pt-BR', {
                        month: 'long',
                        year: 'numeric',
                      })
                    : selectedDate.getFullYear()}
                </Button>
              }
            />
          </Box>

          {/* Select para escolher um indicador */}
          <Select
            placeholder="Escolha um indicador"
            value={selectedIndicator}
            onChange={(e) => setSelectedIndicator(e.target.value)}
            size="md"
            variant="outline"
            maxW="300px"
            margin="auto"
            mb="4"
          >
            {indicators.map((indicator) => (
              <option key={indicator.id} value={indicator.nomeIndicador}>
                {indicator.nomeIndicador}
              </option>
            ))}
          </Select>

          {/* Select para escolher qual visualização (mensal, bimestral, trimestral, semestral) */}
          <Select
            placeholder="Escolha a Visualização"
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            size="md"
            variant="outline"
            maxW="300px"
            margin="auto"
          >
            <option value="mensal">Mensal</option>
            <option value="bimestral">Bimestral</option>
            <option value="trimestral">Trimestral</option>
            <option value="semestral">Semestral</option>
          </Select>
        </Box>

        {/* TABELAS (renderizadas condicionalmente) */}
        <Box overflowX="auto">
          
          {viewType === 'mensal' && (
            <MonthlyTableView
              selectedDate={selectedDate}
              selectedIndicator={selectedIndicator}
              meta={meta}
              setMeta={setMeta}
              formData={formData}
              handleInputChange={handleInputChange}
              valorCalculado={valorCalculado}
              openEditModal={openEditModal}
              openViewModal={openViewModal}
              isOpen={isOpen}
              onClose={onClose}
              modalMode={modalMode}
              selectedMonth={selectedMonth}
              selectedMonthText={selectedMonthText}
              setSelectedMonthText={setSelectedMonthText}
              saveAnalysis={saveAnalysis}
              salvarDados={salvarDados}
            />
          )}

          {viewType === 'bimestral' && (
            <BimestralTableView
              selectedDate={selectedDate}
              selectedIndicator={selectedIndicator}
              meta={meta}
              setMeta={setMeta}
              formData={formData}
              handleInputChange={handleInputChange}
              valorCalculado={valorCalculado}
              openEditModal={openEditModal}
              openViewModal={openViewModal}
              isOpen={isOpen}
              onClose={onClose}
              modalMode={modalMode}
              selectedMonth={selectedMonth}
              selectedMonthText={selectedMonthText}
              setSelectedMonthText={setSelectedMonthText}
              saveAnalysis={saveAnalysis}
              salvarDados={salvarDados}
            />
          )}

          {viewType === 'trimestral' && (
            <TrimestralTableView
              selectedDate={selectedDate}
              selectedIndicator={selectedIndicator}
              meta={meta}
              setMeta={setMeta}
              formData={formData}
              handleInputChange={handleInputChange}
              valorCalculado={valorCalculado}
              openEditModal={openEditModal}
              openViewModal={openViewModal}
              isOpen={isOpen}
              onClose={onClose}
              modalMode={modalMode}
              selectedMonth={selectedMonth}
              selectedMonthText={selectedMonthText}
              setSelectedMonthText={setSelectedMonthText}
              saveAnalysis={saveAnalysis}
              salvarDados={salvarDados}
            />
          )}

          {viewType === 'semestral' && (
            <SemestralTableView
              selectedDate={selectedDate}
              selectedIndicator={selectedIndicator}
              meta={meta}
              setMeta={setMeta}
              formData={formData}
              handleInputChange={handleInputChange}
              valorCalculado={valorCalculado}
              openEditModal={openEditModal}
              openViewModal={openViewModal}
              isOpen={isOpen}
              onClose={onClose}
              modalMode={modalMode}
              selectedMonth={selectedMonth}
              selectedMonthText={selectedMonthText}
              setSelectedMonthText={setSelectedMonthText}
              saveAnalysis={saveAnalysis}
              salvarDados={salvarDados}
            />
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default IndicadoresPage;
