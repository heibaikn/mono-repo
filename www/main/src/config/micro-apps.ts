import GmConfig, { Project } from '@mono/config';
const apps = [
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
]

export default apps 
