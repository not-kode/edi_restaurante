# Restaurante da Edi

Site estático com catálogo público de marmitas e painel admin integrado (localStorage).

## Como funciona

- **Catálogo público** (`/index.html`): exibe as marmitas ativas com fotos e link para pedido no WhatsApp.
- **Painel admin** (`/admin.html`): login com senha, cadastro/edição/exclusão de marmitas, upload de fotos.
- **Armazenamento**: `localStorage` do navegador. Os dados do admin são compartilhados com o catálogo público no mesmo navegador.
- **Senha padrão do admin**: `edi2024` (alterável no `admin.js`).

## Estrutura

```
index.html        catálogo público
admin.html        painel administrativo
script.js         lógica do catálogo
admin.js          lógica do painel admin
styles.css        estilos
assets/           imagens e fotos das marmitas
```

## Deploy na Vercel

```bash
npx vercel --prod
```

## Dados iniciais

O catálogo público já vem com 14 marmitas pré-cadastradas. Ao usar o painel admin, os dados são salvos no `localStorage` e substituem os dados iniciais naquele navegador.
