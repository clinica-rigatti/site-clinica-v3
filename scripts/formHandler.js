document.addEventListener('DOMContentLoaded', () => {

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

  function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    value = value.substring(0, 11);
    
    if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    }
    
    input.value = value;
  }

  const phoneInput = document.querySelector('#phoneInput');
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      formatPhoneNumber(this);
    });
  }

  const WEBHOOK_URL = 'https://automacoes.clinicarigatti.com.br/webhook/0a1252de-9587-4656-ac2e-2840414b1146';
  let isSubmitting = false;

  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      if (isSubmitting) {
        return;
      }
      
      const submitButton = document.getElementById('submitButton');
      const phoneInput = document.querySelector('#phoneInput');
      
      const phoneDigits = phoneInput.value.replace(/\D/g, '');
      
      if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        alert('Por favor, insira um número de telefone válido com DDD.');
        phoneInput.focus();
        return;
      }
      
      isSubmitting = true;
      submitButton.disabled = true;
      submitButton.textContent = 'ENVIANDO...';
      
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

          form.reset();

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