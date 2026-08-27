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

1. Execute `CRIAR_POST.bat` para abrir o editor visual em `http://127.0.0.1:4177`.
2. Preencha os campos, anexe imagens e clique em **Gerar publicação**.
3. Confira com `npm run dev` e execute `PUBLICAR_POSTS.bat` para validar, criar o commit e enviar ao GitHub.

O editor grava os dados em `src/content/posts` e as imagens em `public/images/posts`. Downloads continuam externos e entram apenas como links. O endereço segue o campo **Caminho público**, por exemplo `/Posts/Traduções/De Outras Equipes/the-wolf-among-us/`.

O endereço atual está configurado em `astro.config.mjs`. Quando adquirir um domínio próprio, substitua-o pelo novo endereço.

## Publicação no Cloudflare

- Build command: `npm run build`
- Deploy command: `npx wrangler@latest deploy --assets ./dist --name wolffsroom --compatibility-date 2026-08-26`

## Enviar ao GitHub

Execute `PUBLICAR_GITHUB.bat`. O script conecta a pasta ao repositório `WolffsRoom/WolffsRoom`, preserva o histórico remoto, envia o source e atualiza a descrição quando o GitHub CLI estiver instalado e autenticado.
