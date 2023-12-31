import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const dir = dirname(fileURLToPath(import.meta.url))

export const pathRoot = resolve(dir, '..')
export const pathSrc = resolve(pathRoot, 'src')
// export const pathSvg = resolve(pathRoot, 'svg')
export const pathSvg = resolve(pathRoot, 'icons')
export const pathComponents = resolve(pathSrc, 'components')
export const pathOutput = resolve(pathRoot, 'dist')
