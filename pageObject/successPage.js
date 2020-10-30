import { ReactSelector } from "testcafe-react-selectors";

import { ClientFunction, t } from 'testcafe';

export default class SuccessPage {
    constructor({ backLink }) {
        this.backButton = ReactSelector("thankYou__backLink");
        this.toSiteButton = ReactSelector("thankYou__button").parent();
        this.url = "https://automation.herolo.co.il/thank-you/";
        this.backLink = backLink;
        this.toSiteLink = "https://herolo.co.il/";
    }

    async isLocationValid() {
        const getLocation = ClientFunction(() => document.location.href);
        await t.expect(getLocation()).contains(this.url);
    }

    async isBackLinkValid() {
        await t.expect(this.backButton.getAttribute('href')).eql(this.backLink);
    }

    async isToSiteButtonValid() {
        await t.expect(this.toSiteButton.getAttribute('href')).eql(this.toSiteLink);
    }
}