# Site da Igreja (Estrutura Inicial)

Este repositório contém a estrutura inicial (mock) do site da igreja utilizando **HTML, CSS e JavaScript puro**. O objetivo é evoluir incrementalmente, mantendo tudo simples e pronto para hospedagem estática (ex.: GitHub Pages, Netlify, Vercel, etc.).

## 📁 Estrutura de Pastas

```
.
├── index.html              # Landing Page principal
├── partials/               # Fragmentos HTML reutilizáveis (header/footer)
├── assets/
│   ├── css/style.css       # Estilos globais
│   ├── js/                 # Scripts (main, maps, instagram, components)
│   └── images/             # Imagens do site (usar raw links se quiser embutir)
└── README.md
```

## 🚀 Funcionalidades do Mock

- Layout responsivo (Hero, Sobre, Cultos, Reels, Localização, Contato)
- Inclusão dinâmica de header e footer (`partials/`)
- Placeholder de integração com **Google Maps** (API JavaScript)
- Placeholder para exibição dos últimos **3 Reels do Instagram** via oEmbed
- Formulário de contato (mock) preparado para serviços estáticos (Netlify Forms, etc.)
- Estrutura pronta para adicionar páginas (eventos, sermões, ministérios)

## 🗺️ Google Maps

1. Crie uma API Key no Google Cloud (Maps JavaScript API habilitada).
2. Substitua `YOUR_GOOGLE_MAPS_API_KEY` em `index.html`.
3. Ajuste as coordenadas em `assets/js/maps.js` (`CHURCH_COORDS`).

### Segurança
Restrinja a chave (HTTP referrers) no console do Google para o domínio do site.

## 🎥 Instagram Reels

O arquivo `assets/js/instagram.js` contém:

- Lista `INSTAGRAM_REELS_URLS` com 3 URLs de reels públicos.
- Função que usa o endpoint oEmbed (`instagram_oembed`).

### Passos
1. Atualize as URLs em `INSTAGRAM_REELS_URLS`.
2. (Opcional) Configure `IG_OEMBED_TOKEN` com `APP_ID|CLIENT_TOKEN` se atingir limites.
3. Caso queira algo dinâmico (últimos reels automaticamente), será necessário um backend usando **Instagram Graph API** (requer Facebook App, tokens, permissões e refresh). Para um site estático puro, recomenda-se atualização manual periódica.

## 🖼️ Imagens via GitHub Raw

Coloque as imagens em `assets/images`. Para usar diretamente via link raw (ex.: em redes sociais ou para caching CDNs):

```
https://raw.githubusercontent.com/SEU_USUARIO/site-igreja/main/assets/images/NOME_ARQUIVO.jpg
```

Substitua `SEU_USUARIO` e o nome do arquivo. Evite arquivos muito pesados (>300 KB) – otimize (TinyPNG, Squoosh, etc.).

## 📦 Próximos Passos Sugeridos

- [ ] Adicionar página de **Eventos** com listagem dinâmica (JSON)
- [ ] Página de **Sermões** com links de áudio/vídeo
- [ ] SEO básico (meta tags Open Graph, favicon, sitemap.xml, robots.txt)
- [ ] Dark mode opcional
- [ ] Deploy (GitHub Pages ou Netlify)
- [ ] Otimização de performance (imagens WebP/AVIF, preload de fontes)

## 🧪 Desenvolvimento Local

Abra a pasta no VS Code e utilize uma extensão como "Live Server" ou rode um servidor simples:

Python 3:
```
python -m http.server 5173
```
Depois acesse: http://localhost:5173

## 🛡️ Boas Práticas

- Não commitar chaves privadas (API Keys) – usar variáveis ou placeholders se possível.
- Otimize imagens antes de subir.
- Prefira semântica HTML (section, nav, header, footer, h1-h2...).

## 🤝 Contribuição

1. Crie uma branch: `git checkout -b feat/nova-secao`
2. Commit: `git commit -m "feat: nova seção X"`
3. Push: `git push origin feat/nova-secao`
4. Abra Pull Request

## 📄 Licença

Este projeto segue a licença descrita em `LICENSE`.

---
Feito com propósito e cuidado. ✝

