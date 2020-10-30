import { waitForReact } from 'testcafe-react-selectors';

import LandingPage from '../pageObject/landingPage';
import SuccessPage from '../pageObject/successPage'
import config from '../config.json';

import contentFormNegativeTests from '../dataSets/landingPage/contentForm/contentFormNegativeTests.json';
import contentFormPositiveTests from '../dataSets/landingPage/contentForm/contentFormPositiveTests.json';

const landingPage = new LandingPage();
const successPage = new SuccessPage({ backLink: landingPage.contentForm.backLink });

fixture`Content Form Positive Tests`
    .page`${config.baseUrl}`
    .requestHooks(landingPage.logger)
    .beforeEach(async t => {
        await waitForReact(5000, t);
    });

contentFormPositiveTests.forEach(currentCase => {
    test(`ContentForm: '${currentCase.name}'`, async t => {
        await landingPage.contentForm.fillForm(currentCase.fields);
        await landingPage.contentForm.submitClick();
        await landingPage.isSubmitRequestValid(
            landingPage.getBodyOfFields(currentCase.fields)
        );

        await successPage.isLocationValid();
        await successPage.isBackLinkValid();
        await successPage.isToSiteButtonValid();
    });
});

fixture`Content Form Negative Tests`
    .page`${config.baseUrl}`
    .beforeEach(async t => {
        await waitForReact(5000, t);
    });

contentFormNegativeTests.forEach(currentCase => {
    test(`ContentForm: '${currentCase.name}'`, async () => {
        await landingPage.contentForm.fillForm(currentCase.fields);
        await landingPage.contentForm.submitClick();

        await landingPage.contentForm.verifyFieldErrors(currentCase.fields);
    });
});