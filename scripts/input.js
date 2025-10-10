document.addEventListener('DOMContentLoaded', () => {
  const formGroups = document.querySelectorAll('#contato .relative');
  
  formGroups.forEach(group => {
    const input = group.querySelector('input');
    const label = group.querySelector('label');
    
    if (!input || !label) return;

    function floatLabel() {
      label.classList.remove('top-4', 'left-8', 'text-base', 'opacity-70');
      label.classList.add('-top-2.5', 'left-7', 'text-[11px]', 'opacity-100', 'bg-pearl', 'px-2');
    }
    
    function sinkLabel() {
      label.classList.remove('-top-2.5', 'left-7', 'text-[11px]', 'opacity-100', 'bg-pearl', 'px-2');
      label.classList.add('top-4', 'left-8', 'text-base', 'opacity-70');
    }

    if (input.value) {
      floatLabel();
    }

    input.addEventListener('focus', () => {
      floatLabel();
    });

    input.addEventListener('blur', () => {
      if (!input.value) {
        sinkLabel();
      }
    });

    input.addEventListener('input', () => {
      if (input.value) {
        floatLabel();
      }
    });
  });
});