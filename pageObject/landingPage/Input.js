import { t } from 'testcafe';

export class Input {
    constructor(form, param, value) {
        const inputSelector = 'input[' + param + '="' + value + '"]';
        this.input = form.find(inputSelector);
        this.errorMessage = form.find(inputSelector).nextSibling();
    }

    async typeText(value) {
        await t.typeText(this.input, value);
    }

    async isErrorVisible(errorVisible) {
        const exists = await this.errorMessage.exists;

        if (exists) {
            if (errorVisible) {
                await t.expect(this.errorMessage.child().exists).ok();
            } else {
                await t.expect(this.errorMessage.child().exists).notOk();
            }
        } else {
            await t.expect(this.errorMessage.exists).eql(errorVisible);
        }
    }

    async isErrorValid(errorMessage) {
        if (errorMessage) {
            await this.isErrorVisible(true);
            await t.expect(this.errorMessage.innerText).eql(errorMessage);
        } else {
            await this.isErrorVisible(false);
        }
    }
}