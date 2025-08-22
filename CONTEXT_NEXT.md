# Contexto Atual (22-08-2025)

## Estado do Site
- Estrutura one-page com seções: Hero, Quem Somos (Visão, Missão, Valores), Somos IPB, Cultos, Ministérios (placeholder), Reels, Localização, Fé & Doutrina (5 Solas + nota confessional), Generosidade (placeholder), Contato, Footer.
- Identidade alinhada ao PDF: Visão, Missão (3 verbos), Valores convertidos em cards com ícones SVG.
- Nota confessional adicionada; seção Solas estilizada.
- Header: logo Fonte à esquerda, logo IPB à direita, botão Contato em verde.

## Pendências Planejadas (amanhã)
1. Ajustar textos definitivos (substituir placeholders em Ministérios, Generosidade, Somos IPB se necessário).
2. Inserir imagem real da comunidade / header (trocar placeholder).
3. Ajustar seção Localização com endereço real e coordenadas + chave Google Maps.
4. Definir dados bancários (Generosidade) + opcional QR PIX (gerar imagem).
5. Melhorar acessibilidade: foco visível no menu mobile + aria-current nos links ativos (JS).
6. SEO: atualizar `<title>`, meta description com referência a Santana / São Paulo; adicionar Open Graph + favicon variado.
7. Performance: converter imagens principais para WebP/AVIF; lazy loading adicional se necessário.
8. Formulário: validar estratégia (Netlify vs. serviço de email). Se usar e-mail próprio: considerar Formspree / Buttondown / serverless.
9. Criar `sitemap.xml` e `robots.txt` básicos.
10. Adicionar JSON-LD (Organization + Place) se endereço final confirmado.
11. Revisar responsividade nos breakpoints 480 / 768 / 1024.
12. Testes manuais: contraste (Lighthouse), tab order, mobile viewport.
13. Deploy GitHub Pages + domínio customizado (CNAME) ou alternativa (Netlify / Cloudflare Pages) — decidir.

## Opções de Deploy
- GitHub Pages + domínio próprio: criar arquivo `CNAME` com domínio e apontar DNS (A ou CNAME) para `username.github.io`.
- Alternativa: Netlify (build zero, arrastar repositório) com DNS gerenciado + certificados automáticos.

## DNS (GitHub Pages)
- Criar registro CNAME: `www` -> `LuisPontes1.github.io` (exemplo).
- (Opcional) APEX: registros A para IPs GitHub Pages: 185.199.108.153 / 109 / 110 / 111.
- Adicionar arquivo `CNAME` na raiz do repositório com o domínio exato (sem http/https). 

## Próximas Melhorias Pequenas
- Scrollspy ativo (JS) adicionando classe `.active` conforme seção.
- Botão voltar ao topo flutuante (opcional).
- Animação suave (prefers-reduced-motion respeitado).

## Checklist Rápido Antes do Deploy
- [ ] Revisar textos finais (sem placeholders)
- [ ] Imagens otimizadas (< 300KB cada)
- [ ] CNAME criado
- [ ] Teste em mobile real (Chrome devtools + dispositivo)
- [ ] Favicon e manifest (opcional PWA leve)
- [ ] Formulário testado

## Anotações
- PDF extraído em `assets/guides/projeto_ipfonte.txt` para referência textual.
- Evitar dependências externas adicionais para manter site estático puro.
- Manter paleta neutra + acento verde IPB (consistência visual).

(Editar este arquivo conforme avançarmos.)
