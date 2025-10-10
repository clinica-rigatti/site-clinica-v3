document.addEventListener('DOMContentLoaded', () => {

  // Função para capturar UTMs da URL
  function getUtmParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || ''
    };
  }

  // Função para formatar telefone brasileiro
  function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    
    // Limita a 11 dígitos (celular com DDD)
    value = value.substring(0, 11);
    
    // Formata o número
    if (value.length <= 10) {
      // Formato: (XX) XXXX-XXXX
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else {
      // Formato: (XX) XXXXX-XXXX (celular)
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    }
    
    input.value = value;
  }

  // Adiciona evento de input para formatar telefone enquanto digita
  const phoneInput = document.querySelector('#phoneInput');
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      formatPhoneNumber(this);
    });
  }

  // Validação do formulário no submit
  const WEBHOOK_URL = 'https://automacoes.clinicarigatti.com.br/webhook/0a1252de-9587-4656-ac2e-2840414b1146';
  let isSubmitting = false;

  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Previne múltiplos envios
      if (isSubmitting) {
        return;
      }
      
      const submitButton = document.getElementById('submitButton');
      const phoneInput = document.querySelector('#phoneInput');
      
      // Valida o telefone antes de enviar
      const phoneDigits = phoneInput.value.replace(/\D/g, '');
      
      if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        alert('Por favor, insira um número de telefone válido com DDD.');
        phoneInput.focus();
        return;
      }
      
      // Desabilita o botão
      isSubmitting = true;
      submitButton.disabled = true;
      submitButton.textContent = 'ENVIANDO...';
      
      // Coleta os dados do formulário
      const utmParams = getUtmParameters();
      const formData = {
        name: document.querySelector('#nameInput').value,
        phone: phoneInput.value,
        email: document.querySelector('#emailInput').value,
        city: document.querySelector('#cityInput').value,
        type: 'site',
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_content: utmParams.utm_content,
        utm_term: utmParams.utm_term
      };
      
      console.log("formData =>", formData);
      
      try {
        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          submitButton.textContent = 'ENVIADO COM SUCESSO!';
          submitButton.classList.add('bg-green-600', 'text-white');
          submitButton.classList.remove('bg-sand', 'hover:bg-coffee');

          // Limpa o formulário
          form.reset();

          // Redireciona para a página de agradecimento
          setTimeout(() => {
            window.location.href = 'https://rigatti.blog/obrigado';
          }, 1000);
        } else {
          throw new Error('Erro no envio');
        }
      } catch (error) {
        submitButton.textContent = 'ERRO AO ENVIAR';
        submitButton.classList.add('bg-red-600', 'text-white');
        submitButton.classList.remove('bg-sand', 'hover:bg-coffee');
        
        // Reabilita o botão após 3 segundos em caso de erro
        setTimeout(() => {
          isSubmitting = false;
          submitButton.disabled = false;
          submitButton.textContent = 'AGENDAR AGORA';
          submitButton.classList.remove('bg-red-600', 'text-white');
          submitButton.classList.add('bg-sand', 'hover:bg-coffee');
        }, 3000);
      }
    });
  }
});