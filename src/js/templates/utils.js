export function truncate(string, length) {
  if (!string) return '';

  const split = string.split(' ');
  const ellipsis = split.length > length ? ' ...' : '';
  return `${split.slice(0, length).join(' ')}${ellipsis}`;
}
