"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const config_1 = __importDefault(require("./config"));
var Project;
(function (Project) {
    Project["Design"] = "design";
})(Project || (exports.Project = Project = {}));
class GMConfig {
    getHostBase(type, mode) {
        let isDev = mode === "development";
        switch (type) {
            case Project.Design:
                return isDev ? "http://127.0.0.1:7202/" : config_1.default.BASE.Design;
            default:
                return "/";
        }
    }
}
exports.default = new GMConfig();
