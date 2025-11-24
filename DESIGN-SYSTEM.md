# Design System - Clínica Rigatti

Sistema de design completo extraído do site institucional da Clínica Rigatti.

## Índice
1. [Cores](#cores)
2. [Tipografia](#tipografia)
3. [Espaçamentos](#espaçamentos)
4. [Componentes](#componentes)
5. [Animações](#animações)
6. [Breakpoints Responsivos](#breakpoints-responsivos)

---

## Cores

### Paleta Principal

```css
--sand: #C1B490;      /* Cor primária da marca - dourado suave */
--pearl: #EEECEA;     /* Background claro - bege perolado */
--coffee: #45372C;    /* Cor escura da marca - marrom café */
```

### Aplicações das Cores

- **Sand (#C1B490)**: Botões primários, highlights, bordas de destaque, elementos interativos
- **Pearl (#EEECEA)**: Backgrounds de seções, cards secundários, áreas de conteúdo
- **Coffee (#45372C)**: Textos principais, ícones, bordas, elementos de contraste
- **Black (#000000)**: Textos de alta hierarquia, títulos, labels
- **White (#FFFFFF)**: Backgrounds de cards principais, textos sobre fundos escuros

### Cores de Apoio

```css
/* Gradientes WhatsApp */
--whatsapp-primary: #25D366;
--whatsapp-secondary: #128C7E;
--whatsapp-dark: #075E54;

/* Badge/Alert */
--badge-yellow-bg: #fbbf24;
--badge-yellow-text: #78350f;

/* Cinzas */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
```

### Variações com Opacidade

```css
/* Sand com transparência */
sand/5    /* rgba(193, 180, 144, 0.05) */
sand/10   /* rgba(193, 180, 144, 0.10) */
sand/20   /* rgba(193, 180, 144, 0.20) */
sand/40   /* rgba(193, 180, 144, 0.40) */
sand/80   /* rgba(193, 180, 144, 0.80) */

/* Coffee com transparência */
coffee/10  /* rgba(69, 55, 44, 0.10) */
coffee/20  /* rgba(69, 55, 44, 0.20) */
coffee/90  /* rgba(69, 55, 44, 0.90) */
```

---

## Tipografia

### Fonte Principal

```css
font-family: 'Poppins', sans-serif;
```

**Pesos disponíveis:**
- Regular: 400
- Semi-Bold: 600
- Bold: 700

### Hierarquia de Tamanhos

```css
/* Títulos */
h1: text-2xl (24px)      /* Títulos principais de página */
h2: text-xl (20px)       /* Subtítulos de seção */
h3: text-lg (18px)       /* Títulos de cards/componentes */

/* Corpo */
text-base: 16px          /* Texto padrão de corpo */
text-sm: 14px            /* Texto secundário */
text-xs: 12px            /* Labels, legendas, metadados */

/* Botões */
text-lg: 18px            /* Botões grandes/principais */
text-base: 16px          /* Botões médios */
text-sm: 14px            /* Botões pequenos/links */
```

### Pesos de Fonte

```css
font-light: 300          /* Textos descritivos, parágrafos longos */
font-normal: 400         /* Texto padrão */
font-semibold: 600       /* Destaques, subtítulos */
font-bold: 700           /* Títulos, labels importantes */
font-black: 900          /* Títulos principais, CTAs */
```

### Letter Spacing (Espaçamento entre Letras)

```css
tracking-wide: 0.025em         /* 0.4px */
tracking-widest: 0.1em         /* 1.6px */
tracking-widest-xl: 0.3125rem  /* 5px - Títulos grandes */
tracking-widest-2xl: 0.625rem  /* 10px - Títulos especiais */
```

### Regra Especial: Strong sempre negrito

```css
strong {
  font-weight: 700 !important;
}
```
*Garante que tags `<strong>` sejam sempre bold, mesmo dentro de elementos com `font-light`*

---

## Espaçamentos

### Padding Padrão

```css
/* Cards */
p-10: 40px               /* Cards grandes (desktop) */
p-6: 24px                /* Cards médios */
p-5: 20px                /* Cards pequenos */
p-4: 16px                /* Cards mobile */

/* Botões */
py-4 px-6: 16px 24px     /* Botões grandes */
py-3.5 px-6: 14px 24px   /* Botões médios */
py-3 px-5: 12px 20px     /* Botões pequenos */
```

### Margens e Gaps

```css
/* Espaçamento vertical entre seções */
mb-8: 32px               /* Entre título e conteúdo */
mb-6: 24px               /* Entre elementos de seção */
mt-8: 32px               /* Acima de CTAs principais */

/* Gaps em flex/grid */
gap-4: 16px              /* Grid de cards */
gap-3: 12px              /* Elementos menores */
gap-2: 8px               /* Elementos compactos */
```

---

## Componentes

### 1. Botões

#### Botão Primário (Sand)
```html
<button class="w-full py-4 px-6 text-lg font-bold tracking-widest-xl bg-sand text-coffee rounded-md shadow-md hover:bg-coffee hover:text-sand transition-all duration-300">
  TEXTO DO BOTÃO
</button>
```

**Características:**
- Background: `sand`
- Texto: `coffee`
- Hover: Inverte as cores (background `coffee`, texto `sand`)
- Border-radius: `rounded-md` (6px)
- Shadow: `shadow-md`
- Transição: `300ms`
- Text-transform: Maiúsculas
- Letter-spacing: `widest-xl`

#### Botão Secundário (Coffee)
```html
<button class="w-full py-4 px-6 text-base font-bold tracking-widest-xl bg-coffee text-sand rounded-xl shadow-md hover:bg-sand hover:text-coffee transition-all duration-300">
  TEXTO DO BOTÃO
</button>
```

**Características:**
- Background: `coffee`
- Texto: `sand`
- Hover: Inverte as cores
- Border-radius: `rounded-xl` (12px)

#### Botão WhatsApp
```html
<a class="flex items-center justify-center gap-3 w-full h-[56px] px-6 text-base font-bold tracking-widest-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-xl shadow-lg hover:from-[#128C7E] hover:to-[#075E54] hover:scale-[1.02] transition-all duration-300">
  <i class="fab fa-whatsapp text-xl"></i>
  FALAR COM ESPECIALISTA
</a>
```

**Características:**
- Gradiente: Verde WhatsApp
- Hover: Escurece o gradiente + scale
- Altura fixa: `56px`
- Ícone: Font Awesome WhatsApp

#### Botão Disabled
```css
disabled:opacity-50
disabled:cursor-not-allowed
```

---

### 2. Cards

#### Card Básico
```html
<div class="bg-white rounded-lg shadow-lg p-10 max-md:p-6">
  <!-- Conteúdo -->
</div>
```

**Características:**
- Background: branco
- Border-radius: `rounded-lg` (8px)
- Shadow: `shadow-lg`
- Padding: 40px desktop, 24px mobile

#### Card com Borda
```html
<div class="border-2 border-sand rounded-lg p-6 transition-all duration-300 hover:border-coffee hover:bg-sand/10">
  <!-- Conteúdo -->
</div>
```

**Características:**
- Borda: 2px `sand`
- Hover: Borda muda para `coffee` e background `sand/10`

#### Card de Resultado/Destaque
```html
<div class="bg-sand/10 border-2 border-sand rounded-lg p-5">
  <div class="flex items-center gap-4">
    <div class="flex-shrink-0">
      <i class="fas fa-icon text-3xl text-black"></i>
    </div>
    <div class="flex-1">
      <p class="text-xs text-black font-semibold uppercase tracking-wide mb-1">Label</p>
      <p class="text-2xl font-black text-black">Valor</p>
    </div>
  </div>
</div>
```

---

### 3. Service Cards (Hover Overlay)

```css
.service-card {
  --peek: 25%;
  position: relative;
  overflow: hidden;
}

.service-card__overlay {
  transform: translateY(calc(100% - var(--peek)));
  transition: transform 0.5s ease;
  will-change: transform;
}

.service-card:hover .service-card__overlay {
  transform: translateY(0);
}

.service-card__text {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity .3s ease .12s, max-height .3s ease .12s;
}

.service-card:hover .service-card__text {
  opacity: 1;
  max-height: 500px;
}
```

**Uso:**
- Overlay desliza de baixo para cima no hover
- Exibe 25% do conteúdo por padrão
- Texto aparece com fade-in suave
- Scrollbar customizada para conteúdo longo

---

### 4. Inputs e Formulários

#### Input com Label Flutuante
```html
<div class="form-group">
  <label class="form-label">LABEL DO CAMPO</label>
  <input type="text" class="form-input" placeholder="Digite aqui">
</div>
```

**Estilos:**
```css
.form-group {
  margin-bottom: 24px;
}

.form-label {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.form-input {
  width: 100%;
  padding: 12px 16px 12px 0;
  border: none;
  border-bottom: 2px solid #d1d5db;
  background: transparent;
  font-size: 16px;
  font-weight: 300;
  min-height: 45px;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: #C1B490;
  outline: none;
}

.form-input::placeholder {
  color: #9ca3af;
}
```

#### Radio Button Customizado
```html
<label class="block cursor-pointer">
  <input type="radio" name="opcao" value="valor" class="hidden peer">
  <div class="border-2 border-sand rounded-lg p-6 transition-all duration-300 hover:border-coffee hover:bg-sand/10 peer-checked:border-coffee peer-checked:bg-sand/20 peer-checked:shadow-md">
    <h3 class="text-lg font-bold text-black">Título</h3>
    <p class="text-sm text-black">Descrição</p>
  </div>
</label>
```

**Características:**
- Input hidden com classe `peer`
- Utiliza `peer-checked:` para estilizar o card
- Hover e checked states claramente definidos

#### Range Slider Elegante
```css
input[type="range"].slider-elegant {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 10px;
  background: linear-gradient(90deg, #C1B490 0%, #45372C 100%);
  outline: none;
  transition: all 0.3s ease;
}

input[type="range"].slider-elegant:hover {
  height: 8px;
}

input[type="range"].slider-elegant::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, #C1B490 0%, #45372C 100%);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(69, 55, 44, 0.3);
  border: 3px solid white;
  transition: all 0.3s ease;
}

input[type="range"].slider-elegant::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
```

---

### 5. Modal

#### Estrutura
```html
<div class="modal-overlay hidden">
  <div class="modal-container">
    <div class="modal-header">
      <button class="close-btn">
        <i class="fas fa-times"></i>
      </button>

      <div class="progress-container">
        <p class="progress-text">ETAPA 1 DE 3</p>
        <div class="progress-bar-bg">
          <div class="progress-bar" style="width: 33%"></div>
        </div>
      </div>

      <h2 class="modal-title">Título do Modal</h2>
      <p class="modal-subtitle">Subtítulo ou descrição</p>
    </div>

    <div class="modal-content">
      <!-- Conteúdo do modal -->
    </div>
  </div>
</div>
```

**Estilos principais:**
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  background: white;
  max-width: 672px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
}

.progress-bar-bg {
  width: 100%;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.253);
}

.progress-bar {
  height: 100%;
  background-color: black;
  transition: width 0.5s ease;
}
```

---

### 6. WhatsApp Floating Button

```html
<a href="https://wa.me/5541..." class="whatsapp-floating-btn" target="_blank">
  <i class="fab fa-whatsapp"></i>
</a>
```

**Estilos:**
```css
.whatsapp-floating-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.whatsapp-floating-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
}

.whatsapp-floating-btn i {
  font-size: 32px;
  color: white;
}

/* Mobile */
@media (max-width: 768px) {
  .whatsapp-floating-btn {
    width: 56px;
    height: 56px;
    bottom: 20px;
    right: 20px;
  }

  .whatsapp-floating-btn i {
    font-size: 28px;
  }
}
```

---

### 7. Team Carousel (Carrossel Infinito)

```css
.team-carousel {
  --gap: 12px;
  --card-w: 206px;
  --card-h: 243px;
  --fade: 32px;
  position: relative;
  overflow: hidden;
  padding-inline: 24px;
  -webkit-mask-image: linear-gradient(to right, transparent 0, black var(--fade), black calc(100% - var(--fade)), transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, black var(--fade), black calc(100% - var(--fade)), transparent 100%);
}

.team-track {
  display: flex;
  gap: var(--gap);
  will-change: transform;
  animation: team-scroll 60s linear infinite;
}

.team-carousel:hover .team-track {
  animation-play-state: paused;
}

@keyframes team-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-1 * ((var(--card-w) * 18) + (var(--gap) * 18))));
  }
}

.team-member-card {
  position: relative;
  width: var(--card-w);
  flex: 0 0 var(--card-w);
  border-radius: 8px;
  overflow: hidden;
  background: #111;
}

/* Responsivo */
@media (max-width: 1024px) {
  .team-carousel { --card-w: 180px; --card-h: 220px; }
}
@media (max-width: 768px) {
  .team-carousel { --card-w: 160px; --card-h: 200px; }
}
@media (max-width: 480px) {
  .team-carousel { --card-w: 140px; --card-h: 180px; --fade: 20px; }
}

/* Acessibilidade */
@media (prefers-reduced-motion: reduce) {
  .team-track { animation: none; }
}
```

**Características:**
- Scrolling infinito automático
- Pausa no hover
- Fade nas bordas com mask
- Responsivo com CSS variables
- Respeita prefers-reduced-motion

---

### 8. Badges

#### Badge Amarelo (Destaque)
```html
<span class="gate-badge">EXCLUSIVO</span>
```

```css
.gate-badge {
  display: inline-block;
  background-color: #fbbf24;
  color: #78350f;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
```

---

## Animações

### 1. Fade In (Carregamento de Imagens)

```css
img[loading="lazy"] {
  opacity: 0;
  animation: fadeIn 0.3s ease-in forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}
```

### 2. Slide In Up

```css
.step-content > div {
  animation: slideInUp 0.4s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 3. Result Appear

```css
.result-appear {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 4. Transições Padrão

```css
/* Botões e elementos interativos */
transition: all 0.3s ease;

/* Bordas e cores */
transition: border-color 0.2s ease;

/* Overlays */
transition: transform 0.5s ease;

/* Opacidade */
transition: opacity 0.3s ease;
```

---

## Breakpoints Responsivos

### Tailwind Breakpoints

```css
/* Mobile First */
base:     0px      /* Padrão (mobile) */
sm:     640px      /* Tablets pequenos */
md:     768px      /* Tablets */
lg:    1024px      /* Desktop pequeno */
xl:    1280px      /* Desktop médio */
2xl:   1536px      /* Desktop grande */

/* Max-width (uso: max-md:, max-lg:) */
max-sm:  639px
max-md:  767px
max-lg: 1023px
max-xl: 1279px
```

### Padrões de Uso Responsivo

#### Padding Responsivo
```html
<!-- Desktop: 40px, Mobile: 24px -->
<div class="p-10 max-md:p-6">
```

#### Text Size Responsivo
```html
<!-- Desktop: 24px, Mobile: 20px -->
<h1 class="text-2xl max-md:text-xl">
```

#### Grid Responsivo
```html
<!-- Desktop: 3 colunas, Mobile: 1 coluna -->
<div class="grid grid-cols-3 gap-3 max-md:grid-cols-1">
```

#### Altura Fixa em Botões
```html
<!-- Mantém altura consistente em todos os tamanhos -->
<button class="h-[56px]">
```

---

## Scrollbars Customizadas

### Service Card Scrollbar

```css
.service-card__content {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(193, 180, 144, 0.5) transparent;
}

.service-card__content::-webkit-scrollbar {
  width: 4px;
}

.service-card__content::-webkit-scrollbar-track {
  background: transparent;
}

.service-card__content::-webkit-scrollbar-thumb {
  background-color: rgba(193, 180, 144, 0.5);
  border-radius: 10px;
}

.service-card__content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(193, 180, 144, 0.8);
}
```

### Esconder Scrollbar

```css
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

---

## Utilitários

### Máscara de Gradiente (Fade nas Bordas)

```css
-webkit-mask-image: linear-gradient(to right, transparent 0, black 32px, black calc(100% - 32px), transparent 100%);
mask-image: linear-gradient(to right, transparent 0, black 32px, black calc(100% - 32px), transparent 100%);
```

### GPU Acceleration

```css
will-change: transform;
transform: translateZ(0);
```

### Placeholder Video/Imagem

```css
.hero-video-placeholder {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  will-change: opacity;
  transform: translateZ(0);
}

.hero-video-placeholder.loaded {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}
```

---

## Acessibilidade

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  /* Desabilita animações */
  .team-carousel {
    -webkit-mask-image: none;
    mask-image: none;
  }
  .team-track {
    animation: none;
  }
}
```

### Focus States

```css
.form-input:focus {
  border-color: #C1B490;
  outline: none;
}

button:focus-visible {
  outline: 2px solid #C1B490;
  outline-offset: 2px;
}
```

---

## Ícones (Font Awesome 6.5.0)

### Ícones Principais Usados

```html
<!-- WhatsApp -->
<i class="fab fa-whatsapp"></i>

<!-- Fogo/Energia -->
<i class="fas fa-fire"></i>

<!-- Proteína -->
<i class="fas fa-drumstick-bite"></i>

<!-- Peso/Balança -->
<i class="fas fa-weight-scale"></i>
<i class="fas fa-balance-scale"></i>

<!-- Exercício -->
<i class="fas fa-dumbbell"></i>

<!-- Pessoas -->
<i class="fas fa-user-circle"></i>
<i class="fas fa-user-check"></i>
<i class="fas fa-venus-mars"></i>
<i class="fas fa-venus"></i>
<i class="fas fa-mars"></i>

<!-- Medidas -->
<i class="fas fa-calendar-alt"></i>
<i class="fas fa-ruler-vertical"></i>
<i class="fas fa-weight"></i>

<!-- Navegação -->
<i class="fas fa-arrow-right"></i>
<i class="fas fa-arrow-left"></i>
<i class="fas fa-times"></i>
<i class="fas fa-check"></i>

<!-- Outros -->
<i class="fas fa-feather"></i>
```

---

## Z-Index Scale

```css
z-index: 50      /* Navigation overlay */
z-index: 999     /* WhatsApp floating button */
z-index: 9999    /* Modal overlay */
```

---

## Border Radius Scale

```css
rounded-sm:   2px
rounded:      4px
rounded-md:   6px
rounded-lg:   8px
rounded-xl:  12px
rounded-2xl: 16px
rounded-full: 9999px
```

---

## Shadow Scale

```css
shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05)
shadow:     0 1px 3px rgba(0, 0, 0, 0.1)
shadow-md:  0 4px 6px rgba(0, 0, 0, 0.1)
shadow-lg:  0 10px 15px rgba(0, 0, 0, 0.1)
shadow-xl:  0 20px 25px rgba(0, 0, 0, 0.1)
```

---

## Notas de Implementação

### Performance
- Uso de `will-change` em elementos animados
- GPU acceleration com `translateZ(0)`
- Lazy loading nativo em imagens: `loading="lazy"`
- Preconnect para domínios críticos

### Compatibilidade
- Prefixos `-webkit-` para melhor suporte
- Fallbacks para máscaras CSS
- Scrollbar customizada para Chrome e Firefox

### Acessibilidade
- Respeita `prefers-reduced-motion`
- Focus states visíveis
- Labels semânticos em formulários
- ARIA labels em elementos interativos

---

**Versão do Design System:** 3.0
**Última atualização:** 2025
**Framework:** Tailwind CSS 3.x (via CDN)
