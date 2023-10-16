"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const config_1 = __importDefault(require("./config"));
var Project;
(function (Project) {
    Project["GamingService"] = "gaming-service";
    Project["CloudBuild"] = "cloud-build";
    Project["Gmaster"] = "g-master";
    Project["Market"] = "market";
})(Project = exports.Project || (exports.Project = {}));
var Host;
(function (Host) {
    Host["LocalUat"] = "local.bilibili.co:7002";
    Host["Uat"] = "uat-gtc.bilibili.co";
    Host["InnerProd"] = "gtc.bilibili.co";
    Host["OutProd"] = "gcloud.biligame.com";
})(Host || (Host = {}));
var AppId;
(function (AppId) {
    AppId["LocalUat"] = "c60d11ec988b";
    AppId["Uat"] = "c60d11ec988b";
    AppId["InnerProd"] = "f5372b54acde";
    AppId["OutProd"] = "f5372b54acde";
})(AppId || (AppId = {}));
class GMConfig {
    #loginURI = 'https://dashboard-mng.biliapi.net/api/v3/oauth/authorize?app_id=c60d11ec988b&response_type=code&redirect_uri=';
    #loginURIHash = '/#/auth-redirect';
    #inviteHash = '/#/register';
    #info = { url: '', login: '' };
    project = Project;
    dynamicUrl() {
        let ret = {};
        ret.VITE_BASE_API = this.#info.url;
        ret.VITE_INVITE_URL = `${location.origin}${this.#inviteHash}`;
        ret.VITE_LOGIN_URI = `${this.#info.login}${encodeURIComponent(location.origin)}${encodeURIComponent(this.#loginURIHash)}`;
        return ret;
    }
    getLogin(appid) {
        return `https://dashboard-mng.biliapi.net/api/v3/oauth/authorize?app_id=${appid}&response_type=code&redirect_uri=`;
    }
    getUrl(type, configObj) {
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
    getConfig(type) {
        switch (location.host) {
            case Host.LocalUat:
                this.#info.url = this.getUrl(type, config_1.default.UAT);
                this.#info.login = this.getLogin(AppId.LocalUat);
                break;
            case Host.Uat:
                this.#info.url = this.getUrl(type, config_1.default.UAT);
                this.#info.login = this.getLogin(AppId.Uat);
                break;
            case Host.InnerProd:
                this.#info.url = this.getUrl(type, config_1.default.PROD);
                this.#info.login = this.getLogin(AppId.InnerProd);
                break;
            case Host.OutProd:
                this.#info.url = this.getUrl(type, config_1.default.GCLOUD);
                this.#info.login = this.getLogin(AppId.OutProd);
                break;
            default:
                this.#info.url = this.getUrl(type, config_1.default.DEV);
                this.#info.login = this.getLogin(AppId.LocalUat);
        }
        return this.dynamicUrl();
    }
    getBase(type, mode) {
        let isDev = mode === 'development';
        switch (type) {
            case Project.CloudBuild:
                return isDev ? '/' : config_1.default.BASE.BaseCloudBuild;
            case Project.Gmaster:
                return isDev ? '/' : config_1.default.BASE.BaseGmaster;
            case Project.Market:
                return isDev ? '/' : config_1.default.BASE.BaseMarket;
            default:
                return "/";
        }
    }
    getHostBase(type, mode) {
        let isDev = mode === 'development';
        switch (type) {
            case Project.CloudBuild:
                return isDev ? 'http://127.0.0.1:3000/' : config_1.default.BASE.BaseCloudBuild;
            case Project.Gmaster:
                return isDev ? 'http://127.0.0.1:4000/' : config_1.default.BASE.BaseGmaster;
            case Project.Market:
                return isDev ? 'http://127.0.0.1:7316/' : config_1.default.BASE.BaseMarket;
            default:
                return "/";
        }
    }
}
exports.default = new GMConfig();
