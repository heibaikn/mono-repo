import config from "./config";

export enum Project {
  "Design" = "design",

}

class GMConfig {
  
  getHostBase(type: Project, mode: string): string {
    let isDev = mode === "development";
    switch (type) {
      case Project.Design:
        return isDev ? "http://127.0.0.1:7202/" : config.BASE.Design;
      default:
        return "/";
    }
  }
}

export default new GMConfig();
