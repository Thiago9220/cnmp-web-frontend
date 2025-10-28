import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

export function useIndicadorData(viewType) {
  const toast = useToast();

  const [selectedIndicator, setSelectedIndicator] = useState('');
  const [meta, setMeta] = useState('0%');


  const initialStateMensal = {
    prescrito: Array(12).fill(''),
    finalizado: Array(12).fill(''),
    analiseMensal: Array(12).fill('')
  };

  const initialStateBimestral = {
    prescrito: Array(6).fill(''),
    finalizado: Array(6).fill(''),
    analiseBimestral: Array(6).fill('')
  };

  const initialStateTrimestral = {
    prescrito: Array(4).fill(''),
    finalizado: Array(4).fill(''),
    analiseTrimestral: Array(4).fill('')
  };

  const initialStateSemestral = {
    prescrito: Array(2).fill(''),
    finalizado: Array(2).fill(''),
    analiseSemestral: Array(2).fill('')
  };

  const initialStateAnual = {
    prescrito: Array(12).fill(''),
    finalizado: Array(12).fill(''),
    analiseAnual: Array(12).fill('')
  };

  const initialState =
    viewType === 'mensal'
      ? initialStateMensal
      : viewType === 'bimestral'
      ? initialStateBimestral
      : viewType === 'trimestral'
      ? initialStateTrimestral
      : viewType === 'semestral'
      ? initialStateSemestral
      : initialStateAnual; // se for "anual" ou não se encaixar nos demais

  const [formData, setFormData] = useState(initialState);

  const [indicators, setIndicators] = useState([]);

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
      case 'anual':
        storageKey = 'formDataAnual';
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
      setFormData(initialState);
      setSelectedIndicator('');
      setMeta('0%');
    }
  }, [viewType]);

  const handleInputChange = (field, index, value) => {
    const sanitizedValue = value.replace(/[^0-9.,]/g, '');
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? sanitizedValue : item)),
    }));
  };

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
      case 'anual':
        storageKey = 'formDataAnual';
        break;
      default:
        storageKey = 'formDataMensal';
        break;
    }

    localStorage.setItem(
      storageKey,
      JSON.stringify({ selectedIndicator, meta, formData })
    );

    let periodoText;
    switch (viewType) {
      case 'mensal':
        periodoText = 'Mensais';
        break;
      case 'bimestral':
        periodoText = 'Bimestrais';
        break;
      case 'trimestral':
        periodoText = 'Trimestrais';
        break;
      case 'semestral':
        periodoText = 'Semestrais';
        break;
      case 'anual':
        periodoText = 'Anuais';
        break;
      default:
        periodoText = 'Mensais';
        break;
    }

    toast({
      title: `Dados ${periodoText} salvos!`,
      description: `Suas informações foram armazenadas.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

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
