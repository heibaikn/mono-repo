export default {
  DEV: {
    ApiGamingService: "http://127.0.0.1:8000",
    ApiCloudBuild: "http://127.0.0.1:8000",
    ApiGmaster: "http://127.0.0.1:8000",
    ApiMarket: "http://127.0.0.1:8000",
    // ApiGamingService: "http://10.27.10.10:8000",
    // ApiCloudBuild: "http://10.27.10.10:8000",
    // ApiGmaster: "http://10.27.10.10:8000",
    // ApiMarket: "http://10.27.10.10:8000"
  },
  UAT: {
    ApiGamingService: "http://api.uat-gtc.bilibili.co",
    ApiCloudBuild: "http://10.27.11.39:30549",
    ApiGmaster: "http://api.uat-gtc.bilibili.co",
    ApiMarket: "http://api.uat-gtc.bilibili.co",
  },
  PROD: {
    ApiGamingService: "https://api-gtc.bilibili.co",
    ApiCloudBuild: "https://qagame.bilibili.co",
    ApiGmaster: "https://api-gtc.bilibili.co",
    ApiMarket: "https://api-gtc.bilibili.co",
  },
  GCLOUD: {
    ApiGamingService: "https://api-gcloud.biligame.com",
    ApiCloudBuild: "https://qagame.bilibili.co",
    ApiGmaster: "https://api-gcloud.biligame.com",
    ApiMarket: "https://api-gcloud.biligame.com",
  },
  BASE: {
    BaseGamingService: "/",
    BaseCloudBuild: "/child/cloud-build/",
    BaseGmaster: "/child/gmaster/",
    BaseMarket: "/child/marketplace/",
  },
};
