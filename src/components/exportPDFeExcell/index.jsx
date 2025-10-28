import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const filtrarSelecionados = (indicadores, selecionados) => {
  const idsSelecionados = new Set(selecionados.map((valor) => String(valor)));

  return indicadores.filter((item) =>
    idsSelecionados.has(String(item.id ?? item.codigo ?? item.codigoIndicador))
  );
};

export const exportarSelecionadosParaPDF = (selectedIndicators, indicadores, toast) => {
  if (selectedIndicators.length === 0) {
    toast({
      title: 'Nenhum indicador selecionado',
      description: 'Por favor, selecione pelo menos um indicador para exportar.',
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
    return;
  }

  const doc = new jsPDF();
  const dados = filtrarSelecionados(indicadores, selectedIndicators);

  dados.forEach((item, index) => {
    if (index > 0) {
      doc.addPage();
    }

    doc.setFontSize(12);
    doc.text(`Codigo do Indicador: ${item.codigo ?? item.codigoIndicador}`, 10, 10);

    autoTable(doc, {
      startY: 20,
      body: [
        ['Nome do Indicador', item.nomeIndicador || ''],
        ['Objetivo Estrategico Associado', item.objetivoEstrategico || ''],
        ['Perspectiva Estrategica', item.perspectivaEstrategica || ''],
        ['Descricao do Objetivo Estrategico', item.descricaoObjetivoEstrategico || ''],
        ['Descricao do Indicador', item.descricaoIndicador || ''],
        ['Finalidade do Indicador', item.finalidadeIndicador || ''],
        ['Dimensao do Desempenho', item.dimensaoDesempenho || ''],
        ['Formula', item.formula || ''],
        ['Fonte/Forma de Coleta dos Dados', item.fonteFormaColeta || ''],
        ['Peso do Indicador', item.pesoIndicador || ''],
        ['Interpretacao do Indicador/Recomendacoes', item.interpretacaoIndicador || ''],
        ['Area Responsavel', item.area ?? item.areaResponsavel ?? ''],
        ['Meta', item.meta || ''],
        ['Tipos de Acumulacao', item.tiposAcumulacao || ''],
        ['Polaridade', item.polaridade || ''],
        ['Periodicidade de Coleta', item.periodicidadeColeta || ''],
        ['Frequencia da Meta', item.frequenciaMeta || ''],
        ['Unidade de Medida', item.unidadeMedida || ''],
      ],
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] },
      bodyStyles: { textColor: [0, 0, 0] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });
  });

  doc.save('indicadores_selecionados.pdf');
};

export const exportarSelecionadosParaExcel = (selectedIndicators, indicadores, toast) => {
  if (selectedIndicators.length === 0) {
    toast({
      title: 'Nenhum indicador selecionado',
      description: 'Por favor, selecione pelo menos um indicador para exportar.',
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
    return;
  }

  const dados = filtrarSelecionados(indicadores, selectedIndicators).map((item) => ({
    'Codigo do Indicador': item.codigo ?? item.codigoIndicador,
    'Nome do Indicador': item.nomeIndicador || '',
    'Objetivo Estrategico Associado': item.objetivoEstrategico || '',
    'Perspectiva Estrategica': item.perspectivaEstrategica || '',
    'Descricao do Objetivo Estrategico': item.descricaoObjetivoEstrategico || '',
    'Descricao do Indicador': item.descricaoIndicador || '',
    'Finalidade do Indicador': item.finalidadeIndicador || '',
    'Dimensao do Desempenho': item.dimensaoDesempenho || '',
    Formula: item.formula || '',
    'Fonte/Forma de Coleta dos Dados': item.fonteFormaColeta || '',
    'Peso do Indicador': item.pesoIndicador || '',
    'Interpretacao do Indicador/Recomendacoes': item.interpretacaoIndicador || '',
    'Area Responsavel': item.area ?? item.areaResponsavel ?? '',
    Meta: item.meta || '',
    'Tipos de Acumulacao': item.tiposAcumulacao || '',
    Polaridade: item.polaridade || '',
    'Periodicidade de Coleta': item.periodicidadeColeta || '',
    'Frequencia da Meta': item.frequenciaMeta || '',
    'Unidade de Medida': item.unidadeMedida || '',
  }));

  const ws = XLSX.utils.json_to_sheet(dados);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Indicadores Selecionados');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'indicadores_selecionados.xlsx');
};
