
content = r"""<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Igreja Presbiteriana Fonte - Em Breve</title>
    <meta name="description" content="Site oficial da Igreja Presbiteriana Fonte. Estamos preparando um novo site para você." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/style.css" />
    <link rel="icon" type="image/png" sizes="64x64" href="assets/images/logo-fonte-02.png" />
    <style>
      /* Ajustes específicos para a página de Em Breve */
      .hero-coming-soon {
        min-height: 70vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: linear-gradient(180deg, #fff 0%, #f8f9fa 100%);
      }
      .hero-content {
        max-width: 600px;
        padding: 2rem;
      }
      .contact-box {
        background: #fff;
        border: 1px solid var(--color-border);
        padding: 2rem;
        border-radius: 12px;
        margin-top: 2rem;
        box-shadow: var(--shadow-sm);
      }
      .btn-email {
        width: 100%;
        justify-content: center;
        margin-top: 1rem;
      }
    </style>
  </head>
  <body>
    <div id="site-header" data-include="partials/header.html"></div>

    <main>
      <section class="hero-coming-soon">
        <div class="container hero-content">
          <div class="hero-brand" style="justify-content: center; margin-bottom: 1.5rem;">
            <h1 class="hero-brand__text" aria-label="Igreja Presbiteriana Fonte">
              <span class="hero-brand__ip">ip</span><span class="hero-brand__fonte">fonte</span>
            </h1>
          </div>
          
          <h2 class="section__title" style="font-size: 2.5rem; margin-bottom: 1rem;">Em Breve</h2>
          <p class="lead muted">
            Estamos preparando um novo ambiente digital para compartilhar, servir e discipular.
          </p>

          <div class="contact-box">
            <h3>Fale Conosco</h3>
            <p class="small muted">
              Enquanto nosso site está em construção, entre em contato diretamente com nossa liderança.
            </p>
            
            <a href="mailto:ipfonte@ipfonte.org?cc=ronaldovasconcelos@ipfonte.org&subject=Contato%20via%20Site%20IP%20Fonte" class="btn btn--primary btn-email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Enviar E-mail
            </a>
            <p class="small muted" style="margin-top: 1rem; font-size: 0.8rem;">
              Ou escreva para: <strong>ipfonte@ipfonte.org</strong>
            </p>
          </div>
        </div>
      </section>
    </main>

    <div id="site-footer" data-include="partials/footer.html"></div>

    <script src="assets/js/components.js" defer></script>
    <script src="assets/js/main.js" defer></script>
  </body>
</html>"""

with open(r"C:\projetos\site-igreja\index.html", "w", encoding="utf-8") as f:
    f.write(content)
