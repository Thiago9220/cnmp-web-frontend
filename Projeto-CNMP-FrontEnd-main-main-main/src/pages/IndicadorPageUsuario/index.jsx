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
// IMPORTANTE: importe também sua AnualTableView
import AnualTableView from '../../components/AnualTable/AnualTableView';

const IndicadoresPage = () => {
  // Define qual visualização (mensal, bimestral, trimestral, semestral, anual)
  const [viewType, setViewType] = useState('mensal');

  // Data selecionada (mês ou ano, dependendo da visualização)
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Lógica de exibição/fechamento do modal do Chakra UI
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
    salvarDados           // função para salvar no localStorage (ou backend, caso adapte)
  } = useIndicadorData(viewType);

  // Define o modo do modal (visualizar/editar)
  const [modalMode, setModalMode] = useState('');
  // Índice do mês, bimestre, trimestre, semestre ou mês-anual selecionado para edição/visualização
  const [selectedMonth, setSelectedMonth] = useState(null);
  // Texto de análise (mensal, bimestral, trimestral, semestral ou anual)
  const [selectedMonthText, setSelectedMonthText] = useState('');

  // Função auxiliar para decidir qual campo de análise usar
  const getAnalysisField = () => {
    if (viewType === 'mensal') return 'analiseMensal';
    if (viewType === 'bimestral') return 'analiseBimestral';
    if (viewType === 'trimestral') return 'analiseTrimestral';
    if (viewType === 'semestral') return 'analiseSemestral';
    // Se cair aqui, consideramos "anual"
    return 'analiseAnual';
  };

  // Ao abrir modal de Edição
  const openEditModal = (index) => {
    setSelectedMonth(index);
    const analysisField = getAnalysisField();
    setSelectedMonthText(formData[analysisField][index] || '');
    setModalMode('edit');
    onOpen();
  };

  // Ao abrir modal de Visualização
  const openViewModal = (index) => {
    setSelectedMonth(index);
    const analysisField = getAnalysisField();
    setSelectedMonthText(formData[analysisField][index] || '');
    setModalMode('view');
    onOpen();
  };

  // Salvar a análise (chamado pelo modal)
  const saveAnalysis = () => {
    const analysisField = getAnalysisField();

    setFormData((prev) => ({
      ...prev,
      [analysisField]: prev[analysisField].map((item, i) =>
        i === selectedMonth ? selectedMonthText : item
      ),
    }));

    // Mensagem de sucesso
    let periodoLabel;
    if (viewType === 'mensal') periodoLabel = 'Mensal';
    else if (viewType === 'bimestral') periodoLabel = 'Bimestral';
    else if (viewType === 'trimestral') periodoLabel = 'Trimestral';
    else if (viewType === 'semestral') periodoLabel = 'Semestral';
    else periodoLabel = 'Anual';

    toast({
      title: `Análise ${periodoLabel} salva!`,
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
              // Se a view não for mensal, usamos showYearPicker (ex.: bimestral, trimestral, semestral, anual)
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

          {/* Select para escolher qual visualização (mensal, bimestral, trimestral, semestral, anual) */}
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
            <option value="anual">Anual</option> 
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

          {/* NOVA OPÇÃO: ANUAL */}
          {viewType === 'anual' && (
            <AnualTableView
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
