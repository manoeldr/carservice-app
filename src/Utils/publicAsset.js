// Respeita o caminho de publicação do Vite, inclusive no GitHub Pages.
export function publicAsset(path) {
  if (!path || /^(?:[a-z]+:)?\/\//i.test(path) || /^(?:data|blob):/i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
