(() => {
  let currentStep = 1;
  const totalSteps = 4;

  // Dados do formulário
  const formData = {
    condicionamento: null,
    genero: null,
    idade: 19,
    altura: 170,
    peso: 100,
    atividadeFisica: null
  };

  // Elementos DOM
  const steps = {
    1: document.getElementById('step1'),
    2: document.getElementById('step2'),
    3: document.getElementById('step3'),
    4: document.getElementById('step4')
  };

  /**
   * Mostra uma etapa específica
   */
  function showStep(stepNumber) {
    // Esconde todas as etapas
    Object.values(steps).forEach(step => {
      if (step) step.style.display = 'none';
    });

    // Mostra a etapa atual
    if (steps[stepNumber]) {
      steps[stepNumber].style.display = 'block';
      currentStep = stepNumber;
    }
  }

  /**
   * Avança para a próxima etapa
   */
  function nextStep() {
    if (currentStep < totalSteps) {
      showStep(currentStep + 1);
    }
  }

  /**
   * Volta para a etapa anterior
   */
  function previousStep() {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  }

  /**
   * Step 1: Selecionar condicionamento físico
   */
  function initStep1() {
    const options = document.querySelectorAll('[data-step="1"] input[name="condicionamento"]');
    const btnContinuar = document.getElementById('btnStep1');

    options.forEach(option => {
      option.addEventListener('change', (e) => {
        formData.condicionamento = e.target.value;
        btnContinuar.disabled = false;
      });
    });

    btnContinuar.addEventListener('click', () => {
      if (formData.condicionamento) {
        nextStep();
      }
    });
  }

  /**
   * Step 2: Informações pessoais
   */
  function initStep2() {
    const generoInputs = document.querySelectorAll('input[name="genero"]');
    const idadeRange = document.getElementById('idadeRange');
    const idadeValue = document.getElementById('idadeValue');
    const alturaRange = document.getElementById('alturaRange');
    const alturaValue = document.getElementById('alturaValue');
    const pesoRange = document.getElementById('pesoRange');
    const pesoValue = document.getElementById('pesoValue');
    const btnContinuar = document.getElementById('btnStep2');
    const btnVoltar = document.getElementById('btnVoltarStep2');

    // Verifica se todos os elementos foram encontrados
    if (!idadeRange || !idadeValue) {
      console.error('Elementos de idade não encontrados');
      return;
    }
    if (!alturaRange || !alturaValue) {
      console.error('Elementos de altura não encontrados');
      return;
    }
    if (!pesoRange || !pesoValue) {
      console.error('Elementos de peso não encontrados');
      return;
    }

    // Gênero - habilita o botão quando selecionado
    generoInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        formData.genero = e.target.value;
        if (btnContinuar) {
          btnContinuar.disabled = false;
        }
      });
    });

    // Idade
    idadeRange.addEventListener('input', (e) => {
      const valor = parseInt(e.target.value);
      formData.idade = valor;
      idadeValue.textContent = `${valor} anos`;
      console.log('Idade atualizada:', valor);
    });

    // Altura
    alturaRange.addEventListener('input', (e) => {
      const valor = parseInt(e.target.value);
      formData.altura = valor;
      alturaValue.textContent = `${valor} cm`;
      console.log('Altura atualizada:', valor);
    });

    // Peso
    pesoRange.addEventListener('input', (e) => {
      const valor = parseInt(e.target.value);
      formData.peso = valor;
      pesoValue.textContent = `${valor} kg`;
      console.log('Peso atualizado:', valor);
    });

    // Botão Continuar - apenas avança se gênero estiver selecionado
    if (btnContinuar) {
      btnContinuar.addEventListener('click', () => {
        if (formData.genero) {
          nextStep();
        }
      });
    }

    if (btnVoltar) {
      btnVoltar.addEventListener('click', previousStep);
    }
  }

  /**
   * Step 3: Nível de atividade física
   */
  function initStep3() {
    const options = document.querySelectorAll('[data-step="3"] input[name="atividade"]');
    const btnCalcular = document.getElementById('btnCalcular');
    const btnVoltar = document.getElementById('btnVoltarStep3');

    options.forEach(option => {
      option.addEventListener('change', (e) => {
        formData.atividadeFisica = parseFloat(e.target.value);
        btnCalcular.disabled = false;
      });
    });

    btnCalcular.addEventListener('click', () => {
      if (formData.atividadeFisica) {
        calcularResultados();
        buscarTelefoneWhatsApp(); // Busca o telefone ao calcular os resultados
        nextStep();
      }
    });

    btnVoltar.addEventListener('click', previousStep);
  }

  /**
   * Busca o telefone do webhook e atualiza o link do WhatsApp
   */
  async function buscarTelefoneWhatsApp() {
    try {
      const response = await fetch('https://automacoes.clinicarigatti.com.br/webhook/db448677-4dca-4eb7-9988-d37ad099cc41?classification=false');
      const data = await response.json();

      if (data && data.phone) {
        const whatsappBtn = document.getElementById('whatsappBtn');
        const telefone = data.phone.replace(/\D/g, ''); // Remove caracteres não numéricos
        const mensagem = encodeURIComponent('Olá! Acabei de calcular meu gasto energético e gostaria de mais informações sobre os serviços da clínica.');
        whatsappBtn.href = `https://wa.me/${telefone}?text=${mensagem}`;
      }
    } catch (error) {
      console.error('Erro ao buscar telefone:', error);
      // Em caso de erro, usa o telefone padrão
      const whatsappBtn = document.getElementById('whatsappBtn');
      const mensagem = encodeURIComponent('Olá! Acabei de calcular meu gasto energético e gostaria de mais informações sobre os serviços da clínica.');
      whatsappBtn.href = `https://wa.me/554731701671?text=${mensagem}`;
    }
  }

  /**
   * Calcula os resultados com base nas fórmulas
   */
  function calcularResultados() {
    let tmb; // Taxa Metabólica Basal

    // Calcula TMB baseado no condicionamento físico
    const isFeminino = formData.genero === 'feminino';
    const idade = formData.idade;
    const peso = formData.peso;
    const altura = formData.altura;

    switch (formData.condicionamento) {
      case 'abaixo-peso':
      case 'peso-ideal':
        // Harris-Benedict
        if (isFeminino) {
          tmb = 655 + (9.6 * peso) + (1.8 * altura) - (4.7 * idade);
        } else {
          tmb = 66 + (13.7 * peso) + (5 * altura) - (6.8 * idade);
        }
        break;

      case 'acima-peso':
        // Mifflin-St Jeor
        if (isFeminino) {
          tmb = (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
        } else {
          tmb = (10 * peso) + (6.25 * altura) - (5 * idade) + 5;
        }
        break;

      case 'atleta':
        // Tinsley (aproximação similar a Mifflin com ajuste)
        if (isFeminino) {
          tmb = (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
        } else {
          tmb = (10 * peso) + (6.25 * altura) - (5 * idade) + 5;
        }
        tmb *= 1.1; // Ajuste para atletas
        break;
    }

    // Gasto energético diário (TMB * fator de atividade)
    const gastoEnergetico = Math.round(tmb * formData.atividadeFisica);

    // Meta de proteínas (2g por kg de peso)
    const proteina = Math.round(peso * 2);

    // Calorias para emagrecer (déficit de 20%)
    const emagrecer = Math.round(gastoEnergetico * 0.8);

    // Calorias para hipertrofia (superávit de 10%)
    const hipertrofia = Math.round(gastoEnergetico * 1.1);

    // Atualiza os valores na tela
    document.getElementById('gastoEnergetico').textContent = gastoEnergetico;
    document.getElementById('proteina').textContent = proteina;
    document.getElementById('emagrecer').textContent = emagrecer;
    document.getElementById('hipertrofia').textContent = hipertrofia;
    document.getElementById('manterPeso').textContent = gastoEnergetico;
  }

  /**
   * Reinicia o questionário
   */
  function resetQuestionario() {
    formData.condicionamento = null;
    formData.genero = null;
    formData.idade = 19;
    formData.altura = 170;
    formData.peso = 100;
    formData.atividadeFisica = null;

    // Reseta os formulários
    document.querySelectorAll('input[type="radio"]').forEach(input => {
      input.checked = false;
    });

    // Reseta os valores dos sliders
    const idadeRange = document.getElementById('idadeRange');
    const alturaRange = document.getElementById('alturaRange');
    const pesoRange = document.getElementById('pesoRange');
    const idadeValue = document.getElementById('idadeValue');
    const alturaValue = document.getElementById('alturaValue');
    const pesoValue = document.getElementById('pesoValue');

    if (idadeRange) {
      idadeRange.value = 19;
      idadeValue.textContent = '19 anos';
    }
    if (alturaRange) {
      alturaRange.value = 170;
      alturaValue.textContent = '170 cm';
    }
    if (pesoRange) {
      pesoRange.value = 100;
      pesoValue.textContent = '100 kg';
    }

    // Volta para o início
    showStep(1);
  }

  // Torna a função global para ser chamada do HTML
  window.resetQuestionario = resetQuestionario;

  /**
   * Inicialização
   */
  function init() {
    // Inicializa cada etapa
    initStep1();
    initStep2();
    initStep3();

    // Busca o telefone do WhatsApp na inicialização
    buscarTelefoneWhatsApp();

    // Mostra a primeira etapa
    showStep(1);
  }

  // Inicializa quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
