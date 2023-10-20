import GmConfig, { Project } from '@mono/config';
const apps = [
  {
    name: 'design',
    entry: GmConfig.getHostBase(Project.Design, import.meta.env.MODE),
    container: '#subapp',
    activeRule: '/design',
  },
]

export default apps 
