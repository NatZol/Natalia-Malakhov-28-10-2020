import { waitForReact } from 'testcafe-react-selectors';

import LandingPage from '../pageObject/landingPage';
import SuccessPage from '../pageObject/successPage'
import config from '../config.json';

import defaultFormPositiveTests from '../dataSets/landingPage/defaultForm/defaultFormPositiveTests.json';
import defaultFormNegativeTests from '../dataSets/landingPage/defaultForm/defaultFormNegativeTests.json';

const landingPage = new LandingPage();
const successPage = new SuccessPage({ backLink: landingPage.footerForm.backLink });

fixture`Footer Form Positive Tests`
    .page`${config.baseUrl}`
    .requestHooks(landingPage.logger)
    .beforeEach(async t => {
        await waitForReact(5000, t);
    });

defaultFormPositiveTests.forEach(currentCase => {
    test(`FooterForm: '${currentCase.name}'`, async t => {
        await landingPage.footerForm.fillForm(currentCase.fields)
        await landingPage.footerForm.submitClick();
        await landingPage.isSubmitRequestValid(
            landingPage.getBodyOfFields(currentCase.fields)
        );

        await successPage.isLocationValid();
        await successPage.isBackLinkValid();
        await successPage.isToSiteButtonValid();
    });
});

fixture`Footer Form Negative Tests`
    .page`${config.baseUrl}`
    .beforeEach(async t => {
        await waitForReact(5000, t);
    });

defaultFormNegativeTests.forEach(currentCase => {
    test(`FooterForm: '${currentCase.name}'`, async () => {
        await landingPage.footerForm.fillForm(currentCase.fields);
        await landingPage.footerForm.submitClick();

        await landingPage.footerForm.verifyFieldErrors(currentCase.fields);

        for (const field of currentCase.fields) {
            await landingPage.footerForm[field.name].isErrorValid(field.errorMessage);
        }
    });
});