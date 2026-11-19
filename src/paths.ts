/** Keep navigation and public assets inside the hosting base directory. */
export function sitePath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
