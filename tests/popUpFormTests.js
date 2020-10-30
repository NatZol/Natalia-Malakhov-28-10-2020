import { waitForReact } from 'testcafe-react-selectors';

import LandingPage from '../pageObject/landingPage';
import SuccessPage from '../pageObject/successPage'
import config from '../config.json';

import defaultFormPositiveTests from '../dataSets/landingPage/defaultForm/defaultFormPositiveTests.json';
import defaultFormNegativeTests from '../dataSets/landingPage/defaultForm/defaultFormNegativeTests.json';

const landingPage = new LandingPage();
const successPage = new SuccessPage({ backLink: landingPage.popUpForm.backLink });

fixture`PopUp Form Positive Tests`
    .page`${config.baseUrl}`
    .requestHooks(landingPage.logger)
    .beforeEach(async t => {
        await waitForReact(5000, t);
        await landingPage.popUpForm.waitForForm();
    });

defaultFormPositiveTests.forEach(currentCase => {
    test(`PopUpForm: '${currentCase.name}'`, async t => {
        await landingPage.popUpForm.fillForm(currentCase.fields);
        await landingPage.popUpForm.submitClick();
        await landingPage.isSubmitRequestValid(
            landingPage.getBodyOfFields(currentCase.fields)
        );

        await successPage.isLocationValid();
        await successPage.isBackLinkValid();
        await successPage.isToSiteButtonValid();
    });
});

fixture`PopUp Form Negative Tests`
    .page`${config.baseUrl}`
    .beforeEach(async t => {
        await waitForReact(5000, t);
        await landingPage.popUpForm.waitForForm();
    });

defaultFormNegativeTests.forEach(currentCase => {
    test(`PopUpForm: '${currentCase.name}'`, async () => {
        await landingPage.popUpForm.fillForm(currentCase.fields);
        await landingPage.popUpForm.submitClick();

        await landingPage.popUpForm.verifyFieldErrors(currentCase.fields);
    });
});