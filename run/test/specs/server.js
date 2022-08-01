"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("./utils/utilities");
const create_account_1 = require("./utils/create_account");
const open_app_1 = require("./utils/open_app");
describe("Start server", () => {
    it("test should open server", async () => {
        const [server, device1, device2] = await (0, open_app_1.openApp)();
        const [_userA, userB] = await Promise.all([
            (0, create_account_1.newUser)(device1, "User A"),
            (0, create_account_1.newUser)(device2, "User B"),
        ]);
        await (0, utilities_1.clickOnElement)(device1, "New conversation button");
        await (0, utilities_1.clickOnElement)(device1, "New direct message");
        await (0, utilities_1.inputText)(device1, "Session id input box", userB.sessionID);
        await (0, utilities_1.clickOnElement)(device1, "Next");
        await (0, utilities_1.inputText)(device1, "Message input box", "Test-message-User-A-to-User-B");
        await (0, utilities_1.clickOnElement)(device1, "Send message button");
        await device1.setImplicitWaitTimeout(20000);
        await device2.setImplicitWaitTimeout(20000);
        await device1.elementByAccessibilityId("Message sent status tick");
        await (0, utilities_1.clickOnElement)(device2, "Message requests banner");
        await (0, utilities_1.clickOnElement)(device2, "Message request");
        await (0, utilities_1.inputText)(device2, "Message input box", "Test-message-User-B-to-User-A");
        await (0, utilities_1.clickOnElement)(device2, "Send message button");
        await device1.quit();
        await device2.quit();
        console.info("waiting server close");
        await server.close();
        console.info(" server closed");
    }).timeout(300000);
});
//# sourceMappingURL=server.js.map