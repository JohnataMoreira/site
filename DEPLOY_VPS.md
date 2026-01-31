# Deploy na VPS - Guia Completo

## 📋 Visão Geral

Este guia explica como fazer deploy do site `johnatamoreira.com.br` em sua VPS com:
- Node.js + Express (servidor)
- Nginx (reverse proxy)
- SSL/HTTPS (Let's Encrypt)
- Notion CMS integrado

---

## 🔧 Pré-requisitos

Sua VPS deve ter:
- Ubuntu 20.04+ ou similar
- Node.js 18+
- npm ou pnpm
- Nginx
- Acesso SSH
- Domínio `johnatamoreira.com.br` já apontado para seu IP

---

## 📦 Passo 1: Preparar Arquivos de Build

### 1.1 Fazer Build Localmente

```bash
cd /home/ubuntu/johnatamoreira
pnpm build
```

Isso gera:
- `dist/public/` - Arquivos estáticos (HTML, CSS, JS)
- `dist/index.js` - Servidor Node.js

### 1.2 Arquivos Necessários para VPS

```
dist/
├── public/              # Arquivos estáticos
│   ├── index.html
│   ├── assets/
│   └── ...
├── index.js            # Servidor Node.js
└── package.json        # Dependências

.env.local             # Variáveis de ambiente (Notion)
```

---

## 🚀 Passo 2: Configurar VPS

### 2.1 Conectar via SSH

```bash
ssh root@seu_ip_vps
# ou
ssh seu_usuario@seu_ip_vps
```

### 2.2 Instalar Node.js (se não tiver)

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalação
node --version
npm --version
```

### 2.3 Instalar Nginx

```bash
sudo apt install -y nginx

# Iniciar Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verificar status
sudo systemctl status nginx
```

### 2.4 Instalar PM2 (gerenciador de processos)

```bash
sudo npm install -g pm2

# Configurar para iniciar com o sistema
pm2 startup
pm2 save
```

---

## 📂 Passo 3: Fazer Upload dos Arquivos

### 3.1 Criar Diretório na VPS

```bash
# Na sua VPS
sudo mkdir -p /var/www/johnatamoreira
sudo chown $USER:$USER /var/www/johnatamoreira
```

### 3.2 Fazer Upload dos Arquivos

**Opção A: Usando SCP (recomendado)**

```bash
# No seu computador local
cd /home/ubuntu/johnatamoreira

# Copiar arquivos de build
scp -r dist/ seu_usuario@seu_ip_vps:/var/www/johnatamoreira/

# Copiar package.json
scp package.json seu_usuario@seu_ip_vps:/var/www/johnatamoreira/

# Copiar .env.local (com suas credenciais Notion)
scp .env.local seu_usuario@seu_ip_vps:/var/www/johnatamoreira/
```

**Opção B: Usando Git**

```bash
# Na VPS
cd /var/www/johnatamoreira
git clone seu_repositorio_github .
cd /var/www/johnatamoreira
pnpm build
```

### 3.3 Instalar Dependências na VPS

```bash
cd /var/www/johnatamoreira
npm install --production
# ou
pnpm install --production
```

---

## 🔐 Passo 4: Configurar Variáveis de Ambiente

### 4.1 Editar .env.local na VPS

```bash
nano /var/www/johnatamoreira/.env.local
```

Adicione suas credenciais Notion:

```env
VITE_NOTION_API_KEY=seu_token_notion
VITE_NOTION_DATABASE_ID=seu_database_id
```

Salve com `Ctrl+X`, depois `Y`, depois `Enter`.

---

## 🌐 Passo 5: Configurar Nginx

### 5.1 Criar Arquivo de Configuração

```bash
sudo nano /etc/nginx/sites-available/johnatamoreira
```

Cole o seguinte:

```nginx
upstream app {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    listen [::]:80;
    server_name johnatamoreira.com.br www.johnatamoreira.com.br;

    # Redirecionar HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name johnatamoreira.com.br www.johnatamoreira.com.br;

    # Certificados SSL (vamos criar depois)
    ssl_certificate /etc/letsencrypt/live/johnatamoreira.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/johnatamoreira.com.br/privkey.pem;

    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/json application/javascript;

    # Proxy para aplicação Node.js
    location / {
        proxy_pass http://app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 5.2 Ativar Configuração

```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/johnatamoreira /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Recarregar Nginx
sudo systemctl reload nginx
```

---

## 🔒 Passo 6: Configurar SSL/HTTPS com Let's Encrypt

### 6.1 Instalar Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 6.2 Gerar Certificado SSL

```bash
sudo certbot certonly --nginx -d johnatamoreira.com.br -d www.johnatamoreira.com.br
```

Siga as instruções (aceite os termos, forneça email).

### 6.3 Verificar Certificado

```bash
sudo certbot certificates
```

---

## ▶️ Passo 7: Iniciar Aplicação com PM2

### 7.1 Iniciar Servidor

```bash
cd /var/www/johnatamoreira

# Iniciar com PM2
pm2 start dist/index.js --name "johnatamoreira"

# Salvar configuração
pm2 save

# Verificar status
pm2 status
```

### 7.2 Configurar Auto-Restart

```bash
# Gerar script de startup
pm2 startup

# Copiar e executar o comando sugerido (começará com 'sudo env PATH=...')
# Exemplo:
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u seu_usuario --hp /home/seu_usuario
```

---

## ✅ Passo 8: Testar Deploy

### 8.1 Verificar se Tudo Está Rodando

```bash
# Verificar PM2
pm2 status

# Verificar Nginx
sudo systemctl status nginx

# Verificar logs
pm2 logs johnatamoreira
```

### 8.2 Testar no Navegador

Acesse: `https://johnatamoreira.com.br`

Você deve ver:
- ✅ Site carregando
- ✅ HTTPS ativo (cadeado verde)
- ✅ Projetos do Notion aparecendo (se configurado)

---

## 🔄 Passo 9: Atualizar Código (Futuros Deploys)

### 9.1 Quando Você Fizer Alterações

```bash
# No seu computador local
cd /home/ubuntu/johnatamoreira
pnpm build

# Fazer upload dos novos arquivos
scp -r dist/ seu_usuario@seu_ip_vps:/var/www/johnatamoreira/

# Na VPS, reiniciar aplicação
ssh seu_usuario@seu_ip_vps
cd /var/www/johnatamoreira
pm2 restart johnatamoreira
```

Ou use um script de deploy automático (GitHub Actions).

---

## 🛠️ Troubleshooting

### Site não carrega

```bash
# Verificar logs do PM2
pm2 logs johnatamoreira

# Verificar logs do Nginx
sudo tail -f /var/log/nginx/error.log
```

### Erro 502 Bad Gateway

```bash
# Verificar se aplicação está rodando
pm2 status

# Reiniciar
pm2 restart johnatamoreira
```

### SSL não funciona

```bash
# Verificar certificado
sudo certbot certificates

# Renovar certificado (automático, mas pode forçar)
sudo certbot renew --dry-run
```

### Notion não sincroniza

```bash
# Verificar .env.local
cat /var/www/johnatamoreira/.env.local

# Verificar logs
pm2 logs johnatamoreira | grep -i notion
```

---

## 📊 Monitorar Aplicação

### Verificar Uso de Recursos

```bash
# CPU e Memória
pm2 monit

# Detalhado
pm2 show johnatamoreira
```

### Configurar Alertas

```bash
# PM2+ (opcional, pago)
pm2 plus
```

---

## 🔄 Renovação Automática de SSL

Let's Encrypt expira em 90 dias. Certbot renova automaticamente, mas você pode forçar:

```bash
# Testar renovação
sudo certbot renew --dry-run

# Renovar agora
sudo certbot renew
```

---

## 📝 Checklist Final

- [ ] Node.js instalado na VPS
- [ ] Nginx instalado e configurado
- [ ] PM2 instalado
- [ ] Arquivos de build enviados
- [ ] .env.local configurado com Notion
- [ ] Certificado SSL gerado
- [ ] Nginx configurado com proxy
- [ ] Aplicação rodando com PM2
- [ ] Site acessível em https://johnatamoreira.com.br
- [ ] Notion CMS sincronizando

---

## 🚀 Pronto!

Seu site está online em `johnatamoreira.com.br` com:
- ✅ HTTPS/SSL automático
- ✅ Notion CMS integrado
- ✅ Auto-restart em caso de falha
- ✅ Performance otimizada com Nginx

---

## 📞 Suporte

Se tiver dúvidas em algum passo, execute:

```bash
# Verificar status geral
pm2 status
sudo systemctl status nginx
curl https://johnatamoreira.com.br
```

E compartilhe os erros para debug.

---

**Versão**: 1.0.0  
**Data**: 31 de Janeiro de 2026
