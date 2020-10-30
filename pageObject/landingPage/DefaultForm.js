import { ReactSelector } from 'testcafe-react-selectors';
import { t } from 'testcafe';
import { Input } from './Input';

export class DefaultForm {
    constructor(selector) {
        this.form = ReactSelector(selector);
        this.backLink = selector === "onUnloadPopup__Form" ? '/frontend-developers/' : '/'

        this.name = new Input(this.form, 'name', 'name');
        this.email = new Input(this.form, 'name', 'email');
        this.phone = new Input(this.form, 'name', 'phone');

        this.submitButton = this.form.find('button');
    }

    async submitClick() {
        await t.click(this.submitButton);
    }

    async fillForm(fields) {
        for (const field of fields) {
            if (field.value) {
                await this[field.name].typeText(field.value);
            }
        }
    }

    async verifyFieldErrors(fields) {
        for (const field of fields) {
            await this[field.name].isErrorValid(field.errorMessage);
        }
    }

    async waitForForm() {
        await t.hover(ReactSelector('form__InputsContainer'));
        await t.wait(30000);
    }
}