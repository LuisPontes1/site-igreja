# Serverless Functions

Este diretório conterá as funções serverless para o site da igreja, incluindo integração com Instagram e tratamento de formulários.

## Funções Planejadas

### 1. Instagram Proxy (`instagram-proxy`)
Busca automaticamente os Reels mais recentes do Instagram da igreja.

**Endpoint**: `/api/instagram-reels`  
**Método**: `GET`

#### Exemplo de Resposta:
```json
{
  "success": true,
  "reels": [
    {
      "id": "reel_id_1",
      "url": "https://www.instagram.com/reel/example1/",
      "thumbnail": "https://instagram.com/thumbnail1.jpg",
      "caption": "Culto de domingo abençoado! 🙏",
      "timestamp": "2025-01-01T10:30:00Z"
    },
    {
      "id": "reel_id_2", 
      "url": "https://www.instagram.com/reel/example2/",
      "thumbnail": "https://instagram.com/thumbnail2.jpg",
      "caption": "Momento de oração e adoração",
      "timestamp": "2025-01-03T20:00:00Z"
    }
  ],
  "last_updated": "2025-01-10T15:30:00Z"
}
```

#### Implementação Sugerida:
- **Vercel**: Usar Vercel Functions com Node.js
- **Netlify**: Usar Netlify Functions
- **AWS Lambda**: Com API Gateway
- **Cloudflare Workers**: Para edge computing

#### Autenticação Instagram:
- Instagram Basic Display API
- Meta for Developers account necessário
- Tokens de acesso com refresh automático

---

### 2. Form Handler (`form-handler`)
Processa formulários de contato e pedidos de oração.

**Endpoint**: `/api/contact`  
**Método**: `POST`

#### Exemplo de Payload:
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "subject": "visita",
  "message": "Gostaria de visitar a igreja no domingo",
  "newsletter": true
}
```

#### Exemplo de Resposta (Sucesso):
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso",
  "id": "contact_12345"
}
```

#### Exemplo de Resposta (Erro):
```json
{
  "success": false,
  "error": "Email é obrigatório",
  "code": "MISSING_EMAIL"
}
```

#### Funcionalidades:
- Validação de dados
- Proteção anti-spam (rate limiting)
- Envio de emails para liderança
- Integração com CRM (opcional)
- Resposta automática para o usuário

---

### 3. Newsletter Signup (`newsletter`)
Gerencia inscrições na newsletter da igreja.

**Endpoint**: `/api/newsletter`  
**Método**: `POST`

#### Exemplo de Payload:
```json
{
  "email": "usuario@email.com",
  "name": "Nome do Usuário",
  "source": "contact_form"
}
```

#### Exemplo de Resposta:
```json
{
  "success": true,
  "message": "Inscrição realizada com sucesso"
}
```

---

### 4. Prayer Requests (`prayer`)
Processa pedidos de oração (pode ser separado do form handler).

**Endpoint**: `/api/prayer-request`  
**Método**: `POST`

#### Exemplo de Payload:
```json
{
  "name": "Maria Santos",
  "email": "maria@email.com",
  "request": "Oração pela cura de minha mãe",
  "anonymous": false,
  "urgent": false
}
```

## Estrutura de Arquivos Sugerida

```
serverless/
├── README.md
├── instagram-proxy/
│   ├── handler.js
│   ├── package.json
│   └── config.json
├── form-handler/
│   ├── handler.js
│   ├── email-templates/
│   │   ├── contact-confirmation.html
│   │   └── admin-notification.html
│   ├── package.json
│   └── validation.js
├── newsletter/
│   ├── handler.js
│   ├── package.json
│   └── mailchimp-config.js
└── shared/
    ├── auth.js
    ├── cors.js
    └── rate-limiting.js
```

## Tecnologias Recomendadas

### Runtime
- **Node.js 18+** ou **Python 3.9+**
- **TypeScript** para melhor manutenibilidade

### Bancos de Dados
- **Vercel KV** (Redis-compatível)
- **PlanetScale** (MySQL serverless)
- **Supabase** (PostgreSQL com auth)
- **FaunaDB** (document-based)

### Integrações de Email
- **Resend** (moderno, boa DX)
- **SendGrid** (robusto, escalável)
- **Mailgun** (confiável)
- **Amazon SES** (econômico)

### Newsletter Services
- **Mailchimp**
- **ConvertKit**
- **EmailOctopus**
- **Buttondown**

## Configuração de Ambiente

### Variáveis de Ambiente Necessárias:
```env
# Instagram API
INSTAGRAM_ACCESS_TOKEN=your_access_token
INSTAGRAM_USER_ID=your_user_id

# Email Service
EMAIL_API_KEY=your_email_service_key
FROM_EMAIL=contato@igrejaexemplo.com
ADMIN_EMAIL=pastor@igrejaexemplo.com

# Newsletter
NEWSLETTER_API_KEY=your_newsletter_api_key
NEWSLETTER_LIST_ID=your_list_id

# Security
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_REQUESTS=10
RATE_LIMIT_WINDOW=60000

# Optional: Database
DATABASE_URL=your_database_connection_string
```

## Segurança e Boas Práticas

### Rate Limiting
- Máximo 10 requests por minuto por IP
- Máximo 3 submissions por hora para formulários

### Validação
- Sanitização de inputs
- Validação de email com regex
- Verificação de CSRF tokens

### CORS
- Configurar origins permitidos
- Headers de segurança apropriados

### Monitoramento
- Logs estruturados
- Alertas para erros
- Métricas de uso

## Deploy e CI/CD

### Opções de Deployment:
1. **Vercel** - Mais simples para Next.js/Node.js
2. **Netlify** - Bom para sites estáticos + functions
3. **AWS Lambda** - Máxima flexibilidade
4. **Cloudflare Workers** - Performance global

### Automatização:
- Deploy automático via GitHub Actions
- Testes automatizados
- Environment variables por branch
- Rollback automático em caso de erro

## Próximos Passos

1. **Escolher provider** (Vercel recomendado para começar)
2. **Configurar Instagram Developer App**
3. **Implementar form handler básico**
4. **Adicionar validação e segurança**
5. **Configurar monitoramento**
6. **Implementar Instagram proxy**
7. **Testes e otimização**

## Recursos Úteis

- [Vercel Functions Documentation](https://vercel.com/docs/functions)
- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Netlify Functions Guide](https://docs.netlify.com/functions/overview/)
- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)