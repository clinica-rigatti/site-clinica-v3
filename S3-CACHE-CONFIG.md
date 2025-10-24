# Configuração de Cache para AWS S3

## Problema Identificado pelo PageSpeed
- **Economia potencial**: 1.711 KiB
- **TTL atual**: None (sem cache)
- **Impacto**: Todas as imagens são baixadas novamente em cada visita

## Solução: Configurar Cache-Control Headers no S3

### Passo 1: Acessar o AWS S3 Console
1. Acesse: https://s3.console.aws.amazon.com/
2. Navegue até o bucket: `clinicarigatti`

### Passo 2: Configurar Metadata em Massa

#### Para IMAGENS ESTÁTICAS (logos, imagens fixas):
```
Cache-Control: public, max-age=31536000, immutable
```
- **Validade**: 1 ano
- **Aplicar em**:
  - `imagens-site-v3/logos/*`
  - `imagens-site-v3/time/*`
  - `imagens-site-v3/servicos/*`
  - `imagens-site-v3/antes-e-depois/*`

#### Para IMAGENS DINÂMICAS (podem mudar):
```
Cache-Control: public, max-age=604800
```
- **Validade**: 7 dias
- **Aplicar em**:
  - `imagens-site-v3/diversos/*`

### Passo 3: Como Aplicar (via AWS CLI)

```bash
# Logos (1 ano de cache)
aws s3 cp s3://clinicarigatti/imagens-site-v3/logos/ \
  s3://clinicarigatti/imagens-site-v3/logos/ \
  --recursive \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=31536000, immutable" \
  --acl public-read

# Time (1 ano de cache)
aws s3 cp s3://clinicarigatti/imagens-site-v3/time/ \
  s3://clinicarigatti/imagens-site-v3/time/ \
  --recursive \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=31536000, immutable" \
  --acl public-read

# Servicos (1 ano de cache)
aws s3 cp s3://clinicarigatti/imagens-site-v3/servicos/ \
  s3://clinicarigatti/imagens-site-v3/servicos/ \
  --recursive \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=31536000, immutable" \
  --acl public-read

# Antes e Depois (1 ano de cache)
aws s3 cp s3://clinicarigatti/imagens-site-v3/antes-e-depois/ \
  s3://clinicarigatti/imagens-site-v3/antes-e-depois/ \
  --recursive \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=31536000, immutable" \
  --acl public-read

# Diversos (7 dias de cache)
aws s3 cp s3://clinicarigatti/imagens-site-v3/diversos/ \
  s3://clinicarigatti/imagens-site-v3/diversos/ \
  --recursive \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=604800" \
  --acl public-read
```

### Passo 4: Verificar se funcionou

```bash
curl -I https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/logos/logo+capa.webp
```

Você deve ver:
```
cache-control: public, max-age=31536000, immutable
```

## Impacto Esperado
- ✅ Visitas repetidas: **instantâneas**
- ✅ Economia de banda: ~1.7 MB por visita
- ✅ PageSpeed Score: **+5 a +10 pontos**

## Quando atualizar uma imagem
Se você alterar uma imagem que tem cache longo (1 ano):
1. Mude o nome do arquivo: `logo-v2.webp`
2. Ou use query string: `logo.webp?v=2`
