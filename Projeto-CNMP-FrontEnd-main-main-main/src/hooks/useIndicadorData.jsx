import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

export function useIndicadorData(viewType) {
  const toast = useToast();

  // Indicador selecionado e meta
  const [selectedIndicator, setSelectedIndicator] = useState('');
  const [meta, setMeta] = useState('0%');

  // ==========================
  // Estados iniciais
  // ==========================

  // Mensal => 12 posições
  const initialStateMensal = {
    prescrito: Array(12).fill(''),
    finalizado: Array(12).fill(''),
    analiseMensal: Array(12).fill('')
  };

  // Bimestral => 6 posições
  const initialStateBimestral = {
    prescrito: Array(6).fill(''),
    finalizado: Array(6).fill(''),
    analiseBimestral: Array(6).fill('')
  };

  // Trimestral => 4 posições
  const initialStateTrimestral = {
    prescrito: Array(4).fill(''),
    finalizado: Array(4).fill(''),
    analiseTrimestral: Array(4).fill('')
  };

  // Semestral => 2 posições
  const initialStateSemestral = {
    prescrito: Array(2).fill(''),
    finalizado: Array(2).fill(''),
    analiseSemestral: Array(2).fill('')
  };

  // ==========================
  // Seleciona o estado inicial
  // ==========================
  const initialState = 
    viewType === 'mensal' 
      ? initialStateMensal
      : viewType === 'bimestral'
      ? initialStateBimestral
      : viewType === 'trimestral'
      ? initialStateTrimestral
      : initialStateSemestral; // se for semestral ou default

  // Armazena os dados do formulário (prescrito, finalizado, analiseMensal, etc.)
  const [formData, setFormData] = useState(initialState);

  // Lista de indicadores carregada da API
  const [indicators, setIndicators] = useState([]);

  // ==========================
  // Carrega indicadores da API
  // ==========================
  useEffect(() => {
    fetch('http://localhost:8000/indicadores/')
      .then((response) => response.json())
      .then((data) => setIndicators(data))
      .catch((error) => {
        console.error('Erro ao carregar indicadores:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os indicadores.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  // =================================================
  // Carrega dados do localStorage de acordo com viewType
  // =================================================
  useEffect(() => {
    let storageKey;
    switch (viewType) {
      case 'mensal':
        storageKey = 'formDataMensal';
        break;
      case 'bimestral':
        storageKey = 'formDataBimestral';
        break;
      case 'trimestral':
        storageKey = 'formDataTrimestral';
        break;
      case 'semestral':
        storageKey = 'formDataSemestral';
        break;
      default:
        storageKey = 'formDataMensal';
        break;
    }

    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData.formData || initialState);
      setSelectedIndicator(parsedData.selectedIndicator || '');
      setMeta(parsedData.meta || '0%');
    } else {
      // Se não houver dados salvos, reinicia com o estado inicial
      setFormData(initialState);
      setSelectedIndicator('');
      setMeta('0%');
    }
  }, [viewType]);

  // ==============================
  // Manipulador de mudanças de input
  // ==============================
  const handleInputChange = (field, index, value) => {
    const sanitizedValue = value.replace(/[^0-9.,]/g, '');
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? sanitizedValue : item)),
    }));
  };

  // =================================
  // Cálculo do valorCalculado (percent)
  // =================================
  let valorCalculado = [];
  if (
    formData &&
    formData.prescrito &&
    formData.finalizado &&
    formData.prescrito.length === formData.finalizado.length
  ) {
    valorCalculado = formData.prescrito.map((value, index) => {
      const prescrito = parseFloat((value || '').replace(',', '.')) || 0;
      const finalizado = parseFloat((formData.finalizado[index] || '').replace(',', '.')) || 0;
      return prescrito === 0 ? 0 : (finalizado / prescrito) * 100;
    });
  }

  // ==========================
  // Salvar dados no localStorage
  // ==========================
  const salvarDados = () => {
    let storageKey;
    switch (viewType) {
      case 'mensal':
        storageKey = 'formDataMensal';
        break;
      case 'bimestral':
        storageKey = 'formDataBimestral';
        break;
      case 'trimestral':
        storageKey = 'formDataTrimestral';
        break;
      case 'semestral':
        storageKey = 'formDataSemestral';
        break;
      default:
        storageKey = 'formDataMensal';
        break;
    }

    localStorage.setItem(
      storageKey,
      JSON.stringify({ selectedIndicator, meta, formData })
    );

    toast({
      title: `Dados ${
        viewType === 'mensal'
          ? 'Mensais'
          : viewType === 'bimestral'
          ? 'Bimestrais'
          : viewType === 'trimestral'
          ? 'Trimestrais'
          : 'Semestrais'
      } salvos!`,
      description: `Suas informações foram armazenadas.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Retorna tudo o que for necessário nos componentes
  return {
    indicators,
    selectedIndicator,
    setSelectedIndicator,
    meta,
    setMeta,
    formData,
    setFormData,
    handleInputChange,
    valorCalculado,
    salvarDados
  };
}
