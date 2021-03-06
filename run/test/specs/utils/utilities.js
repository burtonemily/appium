"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installAppToDeviceName = exports.longPress = exports.inputText = exports.saveText = exports.clickOnElement = exports.sleepFor = void 0;
const wd = __importStar(require("wd"));
const child_process_1 = require("child_process");
const binaries_1 = require("./binaries");
function sleepFor(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleepFor = sleepFor;
const clickOnElement = async (device, accessibilityId) => {
    const selector = await device.elementByAccessibilityId(accessibilityId);
    await selector.click();
    return;
};
exports.clickOnElement = clickOnElement;
const saveText = async (device, accessibilityId) => {
    const selector = await device.elementByAccessibilityId(accessibilityId);
    return await selector.text();
};
exports.saveText = saveText;
const inputText = async (device, accessibilityId, text) => {
    const selector = await device.elementByAccessibilityId(accessibilityId);
    return await selector.type(text);
};
exports.inputText = inputText;
const longPress = async (device, accessibilityId) => {
    const selector = await device.elementByAccessibilityId(accessibilityId);
    const action = new wd.TouchAction(device);
    action.longPress({ el: selector });
    await action.perform();
};
exports.longPress = longPress;
function runScriptAndLog(toRun) {
    try {
        (0, child_process_1.exec)(toRun, (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }
    catch (e) {
        console.warn(e);
    }
}
const installAppToDeviceName = async (appFullPath, emulatorName) => {
    if (!emulatorName) {
        throw new Error("emulatorName must be set");
    }
    const adb = (0, binaries_1.getAdbFullPath)();
    runScriptAndLog(`${adb} -s ${emulatorName} uninstall io.appium.uiautomator2.server`);
    runScriptAndLog(`${adb} -s ${emulatorName} uninstall io.appium.uiautomator2.server.test`);
    runScriptAndLog(`${adb} -s ${emulatorName} uninstall io.appium.unlock`);
    runScriptAndLog(`${adb} -s ${emulatorName} uninstall io.appium.settings`);
    await sleepFor(500);
    runScriptAndLog(`${adb} -s ${emulatorName} install -g ./node_modules/appium/node_modules/appium-uiautomator2-server/apks/appium-uiautomator2-server-debug-androidTest.apk`);
    await sleepFor(500);
    runScriptAndLog(`${adb} -s ${emulatorName} install -g ./node_modules/appium/node_modules/appium-uiautomator2-server/apks/appium-uiautomator2-server-v4.27.0.apk`);
    await sleepFor(500);
    runScriptAndLog(`${adb} -s ${emulatorName} install -g ./node_modules/appium/node_modules/io.appium.settings/apks/settings_apk-debug.apk`);
    await sleepFor(500);
    await sleepFor(500);
    runScriptAndLog(`${adb} -s ${emulatorName} install -g -t ${appFullPath}`);
    await sleepFor(500);
};
exports.installAppToDeviceName = installAppToDeviceName;
//# sourceMappingURL=utilities.js.map