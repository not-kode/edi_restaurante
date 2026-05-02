# Restaurante da Edi

Site estático com catálogo público de marmitas e um painel admin mínimo apoiado por funções da Vercel.

## Variáveis de ambiente

Crie um `.env.local` na raiz com:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_publishable_key
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
SUPABASE_BUCKET=marmitas
ADMIN_PASSWORD=defina-uma-senha-forte
```

## Estrutura

- `/api/menu`: lê as marmitas ativas no Supabase
- `/api/admin/menu`: lista, cria, atualiza e exclui marmitas com senha do admin
- `/index.html`: catálogo público
- `/admin.html`: painel do restaurante

## Deploy na Vercel

Cadastre as mesmas variáveis do `.env.local` no painel da Vercel:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_BUCKET`
- `ADMIN_PASSWORD`

## Observação

O painel admin atual aceita `foto_url` pública. O próximo passo natural é adicionar upload direto para o bucket `marmitas`.
