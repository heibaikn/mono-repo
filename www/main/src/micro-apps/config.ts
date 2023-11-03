import GmConfig, { Project } from '@heibaimono/config';
import type { RegistrableApp } from 'qiankun';
const appsConfig = [
  {
    name: 'design',
    entry: GmConfig.getHostBase(Project.Design, import.meta.env.MODE),
    container: '#subapp',
    activeRule: '/design',
    
  },
  {
    name: 'react',
    entry: GmConfig.getHostBase(Project.React, import.meta.env.MODE),
    container: '#subapp',
    activeRule: '/react',
  },
] as any[]

export default appsConfig 
