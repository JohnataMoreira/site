#!/bin/bash

# Script de Deploy Automático para VPS
# Uso: ./deploy.sh seu_usuario@seu_ip_vps

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar argumentos
if [ -z "$1" ]; then
    echo -e "${RED}❌ Erro: Especifique o destino SSH${NC}"
    echo "Uso: ./deploy.sh seu_usuario@seu_ip_vps"
    echo "Exemplo: ./deploy.sh root@192.168.1.100"
    exit 1
fi

SSH_DEST="$1"
REMOTE_PATH="/var/www/johnatamoreira"

echo -e "${YELLOW}🚀 Iniciando Deploy...${NC}"

# Passo 1: Build local
echo -e "${YELLOW}📦 Fazendo build local...${NC}"
pnpm build
echo -e "${GREEN}✅ Build concluído${NC}"

# Passo 2: Upload dos arquivos
echo -e "${YELLOW}📤 Enviando arquivos para VPS...${NC}"
scp -r dist/ "$SSH_DEST:$REMOTE_PATH/"
scp package.json "$SSH_DEST:$REMOTE_PATH/"
echo -e "${GREEN}✅ Arquivos enviados${NC}"

# Passo 3: Instalar dependências e reiniciar
echo -e "${YELLOW}🔄 Instalando dependências e reiniciando...${NC}"
ssh "$SSH_DEST" << 'EOF'
    cd /var/www/johnatamoreira
    npm install --production 2>/dev/null || pnpm install --production
    pm2 restart johnatamoreira
    echo "✅ Aplicação reiniciada"
EOF

echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
echo -e "${YELLOW}🌐 Seu site está em: https://johnatamoreira.com.br${NC}"
