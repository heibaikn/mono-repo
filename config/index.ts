import config from './config'
// import React from 'react';

export enum Project {
  'Design' = 'design',
  'React' = 'react'
}

class GMConfig {
  getHostBase(type: Project, mode: string): string {
    const isDev = mode === 'development'
    switch (type) {
      case Project.Design:
        return isDev ? 'http://127.0.0.1:7202/' : config.BASE.Design
      case Project.React:
        return isDev ? 'http://127.0.0.1:7203/' : config.BASE.React
      default:
        return '/'
    }
  }
}

export default new GMConfig()
