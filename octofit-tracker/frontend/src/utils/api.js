export function buildApiUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/${resource}/`
    : `http://localhost:8000/api/${resource}/`;

  return baseUrl;
}
