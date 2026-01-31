# Deploy Rápido - 5 Minutos ⚡

## 🎯 Resumo Executivo

Se você já tem uma VPS com Node.js, Nginx e domínio configurado, faça isso:

---

## ⚡ Passo 1: Build Local (1 minuto)

```bash
cd /home/ubuntu/johnatamoreira
pnpm build
```

---

## ⚡ Passo 2: Upload para VPS (1 minuto)

```bash
# Copiar arquivos de build
scp -r dist/ seu_usuario@seu_ip_vps:/var/www/johnatamoreira/

# Copiar package.json
scp package.json seu_usuario@seu_ip_vps:/var/www/johnatamoreira/

# Copiar .env.local (com credenciais Notion)
scp .env.local seu_usuario@seu_ip_vps:/var/www/johnatamoreira/
```

---

## ⚡ Passo 3: Instalar e Iniciar (1 minuto)

```bash
# Conectar na VPS
ssh seu_usuario@seu_ip_vps

# Instalar dependências
cd /var/www/johnatamoreira
npm install --production

# Iniciar com PM2
pm2 start dist/index.js --name "johnatamoreira"
pm2 save
```

---

## ⚡ Passo 4: Configurar Nginx (1 minuto)

```bash
# Na VPS
sudo nano /etc/nginx/sites-available/johnatamoreira
```

Cole isto:

```nginx
upstream app {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name johnatamoreira.com.br www.johnatamoreira.com.br;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name johnatamoreira.com.br www.johnatamoreira.com.br;

    ssl_certificate /etc/letsencrypt/live/johnatamoreira.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/johnatamoreira.com.br/privkey.pem;

    location / {
        proxy_pass http://app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ativar:

```bash
sudo ln -s /etc/nginx/sites-available/johnatamoreira /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## ⚡ Passo 5: SSL (1 minuto)

```bash
sudo certbot certonly --nginx -d johnatamoreira.com.br
```

---

## ✅ Pronto!

Acesse: `https://johnatamoreira.com.br`

---

## 🔄 Próximas Atualizações

Use o script de deploy automático:

```bash
./deploy.sh seu_usuario@seu_ip_vps
```

---

## 🆘 Problemas?

```bash
# Verificar status
pm2 status
sudo systemctl status nginx

# Ver logs
pm2 logs johnatamoreira
sudo tail -f /var/log/nginx/error.log
```

---

**Tempo total: ~5 minutos** ⚡
