import { ReactSelector } from 'testcafe-react-selectors';
import { t } from 'testcafe';
import { Input } from './Input';

export class ContentForm {
    constructor() {
        this.form = ReactSelector('form__InputsContainer');
        this.backLink = '/frontend-developers/';

        this.name = new Input(this.form, 'id', 'name');
        this.email = new Input(this.form, 'id', 'email');
        this.telephone = new Input(this.form, 'id', 'telephone');
        this.company = new Input(this.form, 'id', 'company');

        this.submitButton = this.form.find('a[type="button"]');
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

    async submitClick() {
        await t.click(this.submitButton);
    }
}