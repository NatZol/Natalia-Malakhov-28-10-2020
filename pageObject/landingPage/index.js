import { t } from 'testcafe';
import { RequestLogger } from 'testcafe';
import { ContentForm } from './ContentForm'
import { DefaultForm } from './DefaultForm'

export default class LandingPage {
    constructor() {
        this.footerForm = new DefaultForm('Footer__FooterWrapper');
        this.popUpForm = new DefaultForm('onUnloadPopup__Form');
        this.contentForm = new ContentForm();
        this.logger = RequestLogger({
            url: 'https://mdm24dqywk.execute-api.us-east-1.amazonaws.com/development/email-staging',
            method: 'POST'
        }, {
            logRequestBody: true,
            logResponseBody: true,
        });
    }

    getBodyOfFields(fields) {
        let body = {};
        const fieldToBodyMap = {
            'phone': 'telephone',
            'company': 'needs'
        };

        for (const field of fields) {
            body[fieldToBodyMap[field.name] || field.name] = field.value;
        }

        return body;
    }

    async isSubmitRequestValid(body) {
        await t.expect(this.logger.contains(r => r.request.body.toString() === JSON.stringify(body))).ok();
        await t.expect(this.logger.contains(r => r.response.statusCode === 200)).ok();
    }
}