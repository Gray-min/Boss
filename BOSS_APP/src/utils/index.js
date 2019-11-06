export function getRedirectTo ({ type, header }) {
  let path
  if (type * 1 === 0) {
    path = '/dashen'
  }
  else
    path = '/laoban'

  if (!header)
    path += 'info'

  return path
}