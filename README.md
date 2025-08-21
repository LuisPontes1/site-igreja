# Site da Igreja Exemplo

Um site estático moderno e responsivo para igrejas, desenvolvido com HTML5, CSS3 e JavaScript ES Modules. Este projeto fornece uma base completa e customizável para a presença online de sua igreja.

## 🚀 Funcionalidades

### ✅ Implementadas
- **Design Responsivo** - Otimizado para desktop, tablet e mobile
- **Navegação Acessível** - Menu colapsável com suporte a teclado e screen readers
- **Sistema de Cores Customizável** - CSS Custom Properties para fácil personalização
- **Formulário de Contato** - Validação client-side e simulação de envio
- **Integração Instagram** - Placeholder para exibição de Reels (carregamento lazy)
- **Google Maps** - Carregamento lazy de mapa interativo
- **PWA Ready** - Web App Manifest e Service Worker ready
- **GitHub Pages Deploy** - CI/CD automatizado com GitHub Actions
- **SEO Otimizado** - Meta tags, structured data ready
- **Performance** - Lazy loading, otimização de recursos

### 🔄 Roadmap (Futuras Implementações)
- [ ] Modo escuro (dark mode)
- [ ] Busca automática de Reels via API
- [ ] Backend serverless para formulários
- [ ] Sistema de eventos/calendário
- [ ] Galeria de fotos
- [ ] Podcasts/Sermões
- [ ] Blog/Notícias
- [ ] Sistema de doações online

## 📁 Estrutura do Projeto

```
site-igreja/
├── .github/workflows/
│   └── deploy-pages.yml      # CI/CD para GitHub Pages
├── assets/
│   ├── css/
│   │   ├── base.css          # Estilos base e variáveis CSS
│   │   ├── layout.css        # Layout e grid systems
│   │   └── componentes.css   # Componentes reutilizáveis
│   ├── js/
│   │   ├── main.js           # Ponto de entrada JavaScript
│   │   ├── modules/
│   │   │   ├── menu.js       # Navegação mobile
│   │   │   ├── contato.js    # Formulário de contato
│   │   │   ├── insta-reels.js # Integração Instagram
│   │   │   └── mapa.js       # Google Maps lazy loading
│   │   └── utils/
│   │       └── dom.js        # Utilitários DOM
│   └── img/
│       ├── logo/             # Logos e ícones
│       └── social/           # Imagens para redes sociais
├── scripts/
│   └── optimize-images.md    # Guia de otimização de imagens
├── serverless/
│   └── README.md             # Documentação para funções serverless
├── index.html                # Página inicial
├── acreditamos.html          # Declaração de fé
├── venha.html                # Informações de visita e contato
├── manifest.webmanifest      # PWA manifest
├── robots.txt                # SEO robots
├── .editorconfig            # Configuração do editor
├── .gitignore               # Arquivos ignorados pelo Git
└── README.md                # Este arquivo
```

## 🛠️ Workflow de Desenvolvimento

### Branches e Commits
- **main**: Branch de produção (deploy automático)
- **develop**: Branch de desenvolvimento
- **feature/***: Branches para novas funcionalidades

### Conventional Commits
Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação  
style: mudanças de formatação
refactor: refatoração de código
test: adiciona ou modifica testes
chore: tarefas de manutenção
```

### Exemplo de Workflow:
```bash
git checkout -b feature/dark-mode
# Desenvolver funcionalidade
git add .
git commit -m "feat: implementa modo escuro com toggle"
git push origin feature/dark-mode
# Criar Pull Request para develop
```

## 🚀 Deployment

### GitHub Pages (Automático)
O site é automaticamente implantado no GitHub Pages quando há push para a branch `main`.

**URL de Produção**: `https://[USERNAME].github.io/site-igreja`

### Configuração:
1. Vá em **Settings** > **Pages** no seu repositório
2. Selecione **GitHub Actions** como source
3. O workflow em `.github/workflows/deploy-pages.yml` será executado

### Deploy Manual Local:
```bash
# Servir localmente para desenvolvimento
python -m http.server 8000
# ou
npx serve .
```

## 📸 Integração com Instagram Reels

### Configuração Manual (Atual)
1. Edite `assets/js/modules/insta-reels.js`
2. Substitua URLs no array `REELS_URLS`:
```javascript
this.REELS_URLS = [
  'https://www.instagram.com/reel/SEU_REEL_1/',
  'https://www.instagram.com/reel/SEU_REEL_2/',
  'https://www.instagram.com/reel/SEU_REEL_3/'
];
```

### Integração Automática (Futura)
Será implementada via função serverless que:
- Conecta com Instagram Basic Display API
- Busca automaticamente os reels mais recentes
- Cache para otimização de performance
- Fallback para URLs manuais

**TODO**: Configurar Instagram Developer App e implementar em `serverless/instagram-proxy/`

## 🗺️ Google Maps

### Configuração:
1. Acesse [Google Maps](https://maps.google.com)
2. Busque pelo endereço da sua igreja
3. Clique em **Compartilhar** > **Incorporar mapa**
4. Copie a URL do `src` do iframe
5. Substitua em `assets/js/modules/mapa.js`:

```javascript
// TODO: Substitua pela URL do seu mapa
this.GOOGLE_MAPS_URL = 'https://www.google.com/maps/embed?pb=SUA_URL_AQUI';
```

### Endereço:
Também atualize o endereço em:
```javascript
this.CHURCH_ADDRESS = 'Seu Endereço Completo';
```

## 📝 Tratamento de Formulários

### Atual (Client-side)
- Validação JavaScript
- Simulação de envio
- Feedback visual para usuário

### Futuro (Serverless)
Implementação planejada com:
- Validação server-side
- Envio de emails
- Integração com CRM
- Proteção anti-spam

**TODO**: Implementar em `serverless/form-handler/`

## 🎨 Otimização de Imagens

Consulte o guia completo em [`scripts/optimize-images.md`](scripts/optimize-images.md).

### Formatos Recomendados:
- **WebP** para fotos modernas
- **SVG** para logos e ícones
- **PNG** para logos com transparência
- **JPEG** como fallback

### Tamanhos Sugeridos:
- **Logo header**: 200x60px
- **Hero images**: 1920x1080px
- **Cards**: 600x400px
- **Open Graph**: 1200x630px

## ♿ Acessibilidade & SEO

### Checklist Implementado:
- [x] Landmarks semânticos (`header`, `main`, `nav`, `footer`)
- [x] Skip links para navegação por teclado
- [x] ARIA labels e roles
- [x] Alt text em imagens
- [x] Contraste adequado de cores
- [x] Foco visível em elementos interativos
- [x] Meta tags para SEO
- [x] Structured data ready

### TODO:
- [ ] Testes com screen readers
- [ ] Auditoria Lighthouse
- [ ] Schema.org markup
- [ ] Sitemap.xml automático

## 🔧 Desenvolvimento Local

### Requisitos:
- Navegador moderno com suporte a ES Modules
- Servidor HTTP local (Python, Node.js, etc.)

### Setup:
```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/site-igreja.git
cd site-igreja

# Sirva localmente
python -m http.server 8000
# ou
npx serve .
# ou
php -S localhost:8000

# Acesse http://localhost:8000
```

### Edição:
1. Configure seu editor com o `.editorconfig`
2. Use extensões para HTML/CSS/JS
3. Teste em múltiplos navegadores e dispositivos

## 📋 Customização Rápida

### 1. Informações da Igreja
Substitua os **TODO** comments em todos os arquivos HTML:

```html
<!-- TODO: Replace with your church's information -->
<title>SUA IGREJA - Bem-vindos à nossa comunidade</title>
<meta name="description" content="DESCRIÇÃO DA SUA IGREJA">
```

### 2. Cores e Design
Edite as CSS Custom Properties em `assets/css/base.css`:

```css
:root {
  --color-primary: #2c5530;    /* Cor principal */
  --color-secondary: #8b4513;  /* Cor secundária */
  --color-accent: #d4a574;     /* Cor de destaque */
}
```

### 3. Contato e Redes Sociais
Atualize em todos os footers:
- Endereço físico
- Telefone/WhatsApp
- Email
- Links das redes sociais

### 4. Horários de Culto
Edite as seções de horários em `venha.html` e footers.

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

### Uso Comercial:
✅ **Permitido** - Use livremente para sua igreja
✅ **Modificação** - Customize como necessário  
✅ **Distribuição** - Compartilhe com outras igrejas
✅ **Uso Privado** - Para organizações religiosas

### Atribuição:
Não obrigatória, mas apreciada. Considere manter um link no footer:
```html
<!-- Opcional: -->
<small>Site desenvolvido com ❤️ usando template open source</small>
```

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua funcionalidade (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Issues:
- 🐛 **Bugs**: Reporte problemas encontrados
- 💡 **Features**: Sugira novas funcionalidades
- 📚 **Documentação**: Melhorias na documentação
- ❓ **Perguntas**: Dúvidas sobre implementação

## 📞 Suporte

- **Documentação**: Leia este README e arquivos em `/scripts` e `/serverless`
- **Issues**: Abra uma issue no GitHub para problemas técnicos
- **Discussões**: Use GitHub Discussions para perguntas gerais

## 🎯 Roadmap Técnico

### Versão 2.0
- [ ] Sistema de CMS headless (Strapi/Sanity)
- [ ] Componentes Web (Web Components)
- [ ] Progressive Web App completo
- [ ] Offline support
- [ ] Push notifications

### Versão 2.5
- [ ] Integração com sistemas de igreja (ChurchTools, Planning Center)
- [ ] Sistema de membros
- [ ] Área restrita
- [ ] API GraphQL

---

**Desenvolvido com ❤️ para comunidades cristãs**

> "E disse-lhes: Ide por todo o mundo, pregai o evangelho a toda criatura." - Marcos 16:15
