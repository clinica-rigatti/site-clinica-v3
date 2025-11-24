(() => {
  // Elementos do DOM
  const form = document.getElementById('imcForm');
  const pesoInput = document.getElementById('peso');
  const alturaInput = document.getElementById('altura');
  const resultadoDiv = document.getElementById('resultado');
  const imcValorSpan = document.getElementById('imcValor');
  const imcCategoriaDiv = document.getElementById('imcCategoria');
  const imcDescricaoP = document.getElementById('imcDescricao');

  /**
   * Calcula o IMC baseado no peso (kg) e altura (cm)
   * Fórmula: IMC = peso / (altura em metros)²
   */
  function calcularIMC(peso, alturaCm) {
    const alturaMetros = alturaCm / 100;
    const imc = peso / (alturaMetros * alturaMetros);
    return imc;
  }

  /**
   * Retorna a classificação, cor e descrição baseada no valor do IMC
   */
  function classificarIMC(imc) {
    if (imc < 18.5) {
      return {
        categoria: 'ABAIXO DO PESO',
        cor: '#3B82F6', // blue-500
        descricao: 'Você está abaixo do peso ideal. É importante consultar um nutricionista para avaliar sua alimentação e garantir que está recebendo todos os nutrientes necessários.'
      };
    } else if (imc >= 18.5 && imc < 25) {
      return {
        categoria: 'PESO NORMAL',
        cor: '#10B981', // green-500
        descricao: 'Parabéns! Você está dentro da faixa de peso considerada saudável. Continue mantendo hábitos saudáveis de alimentação e atividade física.'
      };
    } else if (imc >= 25 && imc < 30) {
      return {
        categoria: 'SOBREPESO',
        cor: '#F59E0B', // amber-500
        descricao: 'Você está com sobrepeso. Considere adotar uma alimentação mais equilibrada e praticar atividades físicas regularmente. Consulte um profissional de saúde para orientação personalizada.'
      };
    } else if (imc >= 30 && imc < 35) {
      return {
        categoria: 'OBESIDADE GRAU I',
        cor: '#EF4444', // red-500
        descricao: 'Você está com obesidade grau I. É importante buscar acompanhamento médico e nutricional para desenvolver um plano de emagrecimento saudável e sustentável.'
      };
    } else if (imc >= 35 && imc < 40) {
      return {
        categoria: 'OBESIDADE GRAU II',
        cor: '#DC2626', // red-600
        descricao: 'Você está com obesidade grau II (severa). Procure um médico urgentemente para avaliação completa e tratamento adequado. A obesidade pode trazer sérios riscos à saúde.'
      };
    } else {
      return {
        categoria: 'OBESIDADE GRAU III',
        cor: '#991B1B', // red-800
        descricao: 'Você está com obesidade grau III (mórbida). É fundamental buscar acompanhamento médico especializado imediatamente. A Clínica Rigatti pode te ajudar com um tratamento personalizado.'
      };
    }
  }

  /**
   * Exibe o resultado do cálculo na tela
   */
  function exibirResultado(imc, classificacao) {
    // Atualiza os valores
    imcValorSpan.textContent = imc.toFixed(1);
    imcCategoriaDiv.textContent = classificacao.categoria;
    imcCategoriaDiv.style.color = classificacao.cor;
    imcDescricaoP.textContent = classificacao.descricao;

    // Remove a classe hidden e adiciona animação
    resultadoDiv.classList.remove('hidden');
    resultadoDiv.classList.add('result-appear');

    // Scroll suave até o resultado
    setTimeout(() => {
      resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  /**
   * Handler do submit do formulário
   */
  function handleSubmit(event) {
    event.preventDefault();

    // Obtém os valores
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);

    // Validação básica
    if (!peso || !altura || peso <= 0 || altura <= 0) {
      alert('Por favor, insira valores válidos para peso e altura.');
      return;
    }

    if (altura > 250) {
      alert('Por favor, insira a altura em centímetros (ex: 170 para 1,70m).');
      return;
    }

    // Calcula e classifica
    const imc = calcularIMC(peso, altura);
    const classificacao = classificarIMC(imc);

    // Exibe o resultado
    exibirResultado(imc, classificacao);
  }

  /**
   * Reseta a calculadora para estado inicial
   */
  window.resetarCalculadora = function() {
    // Limpa os inputs
    pesoInput.value = '';
    alturaInput.value = '';

    // Esconde o resultado
    resultadoDiv.classList.add('hidden');

    // Scroll de volta para o formulário
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Foca no primeiro input
    setTimeout(() => {
      pesoInput.focus();
    }, 500);
  };

  /**
   * Permite apenas números e ponto decimal nos inputs
   */
  function validarInput(event) {
    const input = event.target;
    const valor = input.value;

    // Remove caracteres não numéricos exceto ponto
    input.value = valor.replace(/[^0-9.]/g, '');

    // Garante apenas um ponto decimal
    const pontos = input.value.split('.');
    if (pontos.length > 2) {
      input.value = pontos[0] + '.' + pontos.slice(1).join('');
    }
  }

  /**
   * Inicialização
   */
  function init() {
    if (!form) {
      console.error('Formulário da calculadora de IMC não encontrado');
      return;
    }

    // Event listeners
    form.addEventListener('submit', handleSubmit);
    pesoInput.addEventListener('input', validarInput);
    alturaInput.addEventListener('input', validarInput);

    // Foca no primeiro input ao carregar
    pesoInput.focus();
  }

  // Inicializa quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
