# Image Optimization Guide

Este guia fornece instruções sobre como otimizar imagens para o site da igreja, garantindo carregamento rápido e boa qualidade visual.

## Ferramentas Recomendadas

### 1. WebP Conversion (cwebp)
Converte imagens para o formato WebP, que oferece melhor compressão:

```bash
# Instalar no Ubuntu/Debian
sudo apt install webp

# Instalar no macOS
brew install webp

# Converter JPEG/PNG para WebP
cwebp input.jpg -o output.webp -quality 80

# Converter com configurações otimizadas
cwebp input.jpg -o output.webp -quality 85 -m 6 -segments 4 -sns 100
```

### 2. AVIF Conversion (avifenc)
Formato ainda mais moderno e eficiente:

```bash
# Instalar libavif
# Ubuntu/Debian:
sudo apt install libavif-bin

# macOS:
brew install libavif

# Converter para AVIF
avifenc --min 20 --max 30 input.jpg output.avif
```

### 3. SVG Optimization (svgo)
Para otimizar logos e ícones SVG:

```bash
# Instalar via npm
npm install -g svgo

# Otimizar SVG
svgo input.svg -o output.svg

# Otimização mais agressiva
svgo input.svg -o output.svg --config '{"plugins": [{"removeViewBox": false}]}'
```

### 4. Ferramentas Online
- **TinyPNG/TinyJPG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim** (macOS): https://imageoptim.com/

## Diretrizes de Otimização

### Tamanhos Recomendados

#### Logos
- **Cabeçalho**: 200x60px (máx. 300x90px)
- **Footer**: 150x45px
- **Favicon**: 32x32px, 16x16px
- **PWA Icons**: 192x192px, 512x512px

#### Imagens Sociais
- **Open Graph**: 1200x630px
- **Twitter Card**: 1200x675px
- **Facebook**: 1200x630px

#### Fotos da Igreja
- **Hero Images**: 1920x1080px (Full HD)
- **Cards**: 600x400px
- **Thumbnails**: 300x200px
- **Galeria**: 800x600px

### Qualidades Recomendadas
- **JPEG**: 80-85% para fotos
- **WebP**: 80-85% para fotos, 90-95% para gráficos
- **AVIF**: 20-30 para qualidade máxima
- **PNG**: Para logos com transparência

### Fluxo de Trabalho Sugerido

1. **Redimensionar** a imagem para o tamanho correto
2. **Otimizar** usando as ferramentas apropriadas
3. **Criar múltiplos formatos** (JPEG, WebP, AVIF)
4. **Implementar** com fallbacks no HTML

## Implementação no Site

### HTML com Múltiplos Formatos
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Descrição da imagem" loading="lazy">
</picture>
```

### CSS para Imagens Responsivas
```css
.responsive-image {
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: cover;
}
```

## Estrutura de Pastas Sugerida

```
assets/img/
├── logo/
│   ├── logo.svg
│   ├── logo-192.png
│   ├── logo-512.png
│   └── favicon.ico
├── social/
│   ├── og-image.jpg
│   ├── og-image.webp
│   └── twitter-card.jpg
├── hero/
│   ├── hero-1920.jpg
│   ├── hero-1920.webp
│   └── hero-mobile-800.jpg
├── gallery/
│   ├── photo1-800.jpg
│   ├── photo1-800.webp
│   └── photo1-thumb-300.jpg
└── icons/
    ├── church.svg
    ├── cross.svg
    └── bible.svg
```

## Checklist de Otimização

- [ ] Todas as imagens estão no tamanho correto
- [ ] JPEG/PNG otimizados com qualidade 80-85%
- [ ] Versões WebP criadas
- [ ] Versões AVIF criadas (opcional)
- [ ] SVGs otimizados com svgo
- [ ] Atributo `alt` em todas as imagens
- [ ] Atributo `loading="lazy"` em imagens abaixo da dobra
- [ ] PWA icons em múltiplos tamanhos
- [ ] Open Graph images otimizadas

## Automação com Scripts

### Script de Conversão em Lote
```bash
#!/bin/bash
# convert-images.sh

for file in *.jpg *.jpeg *.png; do
  if [ -f "$file" ]; then
    # Converter para WebP
    cwebp "$file" -o "${file%.*}.webp" -quality 85
    
    # Converter para AVIF
    avifenc --min 20 --max 30 "$file" "${file%.*}.avif"
    
    echo "Convertido: $file"
  fi
done
```

### Script de Redimensionamento
```bash
#!/bin/bash
# resize-images.sh

# Requer ImageMagick: brew install imagemagick

for file in *.jpg *.jpeg *.png; do
  if [ -f "$file" ]; then
    # Criar thumbnail
    convert "$file" -resize 300x200^ -gravity center -crop 300x200+0+0 "thumb_$file"
    
    # Criar versão mobile
    convert "$file" -resize 800x600> "mobile_$file"
    
    echo "Redimensionado: $file"
  fi
done
```

## Performance Targets

- **Primeira imagem visível**: < 1.5s
- **Todas as imagens acima da dobra**: < 2.5s
- **Imagens lazy-loaded**: conforme necessário
- **Tamanho total de imagens por página**: < 2MB

## Recursos Adicionais

- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [MDN Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Can I Use - WebP Support](https://caniuse.com/webp)
- [Can I Use - AVIF Support](https://caniuse.com/avif)