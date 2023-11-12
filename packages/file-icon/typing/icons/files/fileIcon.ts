import type { IconPack } from '../index'

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

interface BasicFileIcon {
  /**
   * Name of the icon, e.g. 'javascript'
   */
  name: string

  /**
   * Define the file extensions that should use this icon.
   * E.g. ['js']
   */
  fileExtensions?: string[]

  /**
   * Define if there are some static file names that should apply this icon.
   * E.g. ['sample.js']
   */
  fileNames?: string[]

  /**
   * Define if there is a light icon available.
   */
  light?: boolean

  /**
   * Define if there is a high contrast icon available.
   */
  highContrast?: boolean

  /**
   * Define if the icon should be disabled.
   */
  disabled?: boolean

  /**
   * Defines a pack to which this icon belongs. A pack can be toggled and all icons inside this pack can be enabled or disabled together.
   */
  enabledFor?: IconPack[]
}

/**
 * Type for a FileIcon. In addition to the `name` property, either a `fileExtensions` or `fileNames` property is required.
 */
export type FileIcon = RequireAtLeastOne<BasicFileIcon, 'fileExtensions' | 'fileNames'>
