# Site Wolff's Room

Código-fonte do site oficial do Wolff's Room, desenvolvido em Astro para publicação no Cloudflare Pages.

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Gerar versão de produção

```bash
npm run build
```

O resultado será criado em `dist/`.

## Nova publicação

Crie um arquivo `.md` em uma das pastas de `src/content/posts/`. Use `deltarune.md` como modelo. As listagens e páginas de categoria são geradas automaticamente.

O endereço atual está configurado em `astro.config.mjs`. Quando adquirir um domínio próprio, substitua-o pelo novo endereço.

## Publicação no Cloudflare

- Build command: `npm run build`
- Deploy command: `npx wrangler@latest deploy --assets ./dist --name wolffsroom --compatibility-date 2026-08-26`

## Enviar ao GitHub

Execute `PUBLICAR_GITHUB.bat`. O script conecta a pasta ao repositório `WolffsRoom/WolffsRoom`, preserva o histórico remoto, envia o source e atualiza a descrição quando o GitHub CLI estiver instalado e autenticado.
