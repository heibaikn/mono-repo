import config from "./config";

export enum Project {
  "GamingService" = "gaming-service",
  "CloudBuild" = "cloud-build",
  "Gmaster" = "g-master",
  "Market" = "market",
}

type configItem = {
  VITE_HOST_ROOT: string;
  VITE_BASE_API: string;
  VITE_INVITE_URL: string;
  VITE_LOGIN_URI: string;
};

enum Host {
  LocalUat = "local.bilibili.co:7002",
  Uat = "uat-gtc.bilibili.co",
  InnerProd = "gtc.bilibili.co",
  OutProd = "gcloud.biligame.com",
}
enum AppId {
  LocalUat = "c60d11ec988b",
  Uat = "c60d11ec988b",
  InnerProd = "f5372b54acde",
  OutProd = "f5372b54acde",
}

class GMConfig {
  #loginURI =
    "https://dashboard-mng.biliapi.net/api/v3/oauth/authorize?app_id=c60d11ec988b&response_type=code&redirect_uri=";
  #loginURIHash = "/#/auth-redirect";
  #inviteHash = "/#/register";
  #info = { url: "", login: "" };
  project = Project;
  dynamicUrl(): configItem {
    let ret = {} as configItem;
    ret.VITE_BASE_API = this.#info.url;
    ret.VITE_INVITE_URL = `${location.origin}${this.#inviteHash}`;
    ret.VITE_LOGIN_URI = `${this.#info.login}${encodeURIComponent(
      location.origin
    )}${encodeURIComponent(this.#loginURIHash)}`;
    return ret;
  }
  getLogin(appid: string) {
    return `https://dashboard-mng.biliapi.net/api/v3/oauth/authorize?app_id=${appid}&response_type=code&redirect_uri=`;
  }
  getUrl(type: Project, configObj: any): string {
    switch (type) {
      case Project.CloudBuild:
        // return this.dynamicUrl(configObj.ApiCloudBuild)
        return configObj.ApiCloudBuild;
      case Project.GamingService:
        // return this.dynamicUrl(configObj.ApiGamingService)
        return configObj.ApiGamingService;
      default:
        // return this.dynamicUrl(configObj.ApiGamingService)
        return configObj.ApiGamingService;
    }
  }
  getConfig(type: Project): configItem {
    switch (location.host) {
      case Host.LocalUat:
        this.#info.url = this.getUrl(type, config.UAT);
        this.#info.login = this.getLogin(AppId.LocalUat);
        break;
      case Host.Uat:
        this.#info.url = this.getUrl(type, config.UAT);
        this.#info.login = this.getLogin(AppId.Uat);
        break;
      case Host.InnerProd:
        this.#info.url = this.getUrl(type, config.PROD);
        this.#info.login = this.getLogin(AppId.InnerProd);
        break;
      case Host.OutProd:
        this.#info.url = this.getUrl(type, config.GCLOUD);
        this.#info.login = this.getLogin(AppId.OutProd);
        break;
      default:
        this.#info.url = this.getUrl(type, config.DEV);
        this.#info.login = this.getLogin(AppId.LocalUat);
    }
    return this.dynamicUrl();
  }
  getBase(type: Project, mode: string): string {
    let isDev = mode === "development";
    switch (type) {
      case Project.CloudBuild:
        return isDev ? "/" : config.BASE.BaseCloudBuild;
      case Project.Gmaster:
        return isDev ? "/" : config.BASE.BaseGmaster;
      case Project.Market:
        return isDev ? "/" : config.BASE.BaseMarket;
      default:
        return "/";
    }
  }
  getHostBase(type: Project, mode: string): string {
    let isDev = mode === "development";
    switch (type) {
      case Project.CloudBuild:
        return isDev ? "http://127.0.0.1:3000/" : config.BASE.BaseCloudBuild;
      case Project.Gmaster:
        return isDev ? "http://127.0.0.1:4000/" : config.BASE.BaseGmaster;
      case Project.Market:
        return isDev ? "http://127.0.0.1:7316/" : config.BASE.BaseMarket;
      default:
        return "/";
    }
  }
}

export default new GMConfig();
