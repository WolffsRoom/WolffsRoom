import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const editor = path.join(root, 'tools/post-editor/index.html');
const safe = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
const json = (res, code, body) => { res.writeHead(code, {'content-type':'application/json; charset=utf-8'}); res.end(JSON.stringify(body)); };
async function saveImage(dataUrl, dir, name) {
  const match = /^data:(image\/(?:png|jpeg|webp|gif));base64,(.+)$/s.exec(dataUrl || '');
  if (!match) return dataUrl || '';
  const ext = { 'image/png':'png', 'image/jpeg':'jpg', 'image/webp':'webp', 'image/gif':'gif' }[match[1]];
  const file = `${name}.${ext}`; await fs.writeFile(path.join(dir, file), Buffer.from(match[2], 'base64')); return file;
}
const server = http.createServer(async (req,res) => {
  if (req.method === 'GET') { res.writeHead(200, {'content-type':'text/html; charset=utf-8'}); return res.end(await fs.readFile(editor)); }
  if (req.method !== 'POST' || req.url !== '/api/save') return json(res,404,{error:'Rota não encontrada.'});
  try {
    let raw=''; for await (const chunk of req) { raw += chunk; if (raw.length > 40_000_000) throw new Error('Arquivos grandes demais.'); }
    const post=JSON.parse(raw); const slug=safe(post.slug || post.title); if (!slug) throw new Error('Informe um título ou slug válido.');
    const category=safe(post.category); const assetDir=path.join(root,'public/images/posts',slug); await fs.mkdir(assetDir,{recursive:true});
    if (post.cover?.startsWith('data:')) { const file=await saveImage(post.cover,assetDir,'capa'); post.cover=`/images/posts/${slug}/${file}`; }
    if (post.projectLogo?.startsWith('data:')) { const file=await saveImage(post.projectLogo,assetDir,'equipe'); post.projectLogo=`/images/posts/${slug}/${file}`; }
    for (let i=0;i<(post.gallery||[]).length;i++) if (post.gallery[i].src?.startsWith('data:')) { const file=await saveImage(post.gallery[i].src,assetDir,`galeria-${i+1}`); post.gallery[i].src=`/images/posts/${slug}/${file}`; }
    for (let i=0;i<(post.extras||[]).length;i++) if (post.extras[i].image?.startsWith('data:')) { const file=await saveImage(post.extras[i].image,assetDir,`extra-${i+1}`); post.extras[i].image=`/images/posts/${slug}/${file}`; }
    delete post.slug; const outDir=path.join(root,'src/content/posts',category); await fs.mkdir(outDir,{recursive:true}); const out=path.join(outDir,`${slug}.json`); await fs.writeFile(out,JSON.stringify(post,null,2)+'\n','utf8');
    json(res,200,{ok:true,file:path.relative(root,out),url:`/Posts/${post.path}/`});
  } catch(e) { json(res,400,{error:e.message}); }
});
server.listen(4177,'127.0.0.1',()=>console.log('\nEditor aberto em http://127.0.0.1:4177\nUse Ctrl+C para encerrar.'));
