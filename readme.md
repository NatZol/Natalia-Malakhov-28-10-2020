# Test Assignment

## Used
- [TestCafe](https://testcafe-discuss.devexpress.com/) (as Testing framework)
- [Testcafe React Selectors](https://github.com/DevExpress/testcafe-react-selectors/) (for React Selectors)
- JavaScript (as coding language)

## Test Coverage
Submitting information through all kinds of forms (footer form, popup form, container form) was covered with positive and negative cases. 
All cases values are organized with .json files so that they can be easily supported. 
All .json files with tests are divided by two folders:
- for Default form (footer form, popup form)
- for Container form (container form - because it has addional field)

Positive and Negative tests are groupped for each form in a different test file (contentFormTests.js, footerFormTests.js, popUpFormTests.js) so that tests can be run for each form separately.

## Installation and run

Install the dependencies and devDependencies and run tests.

```sh
$ npm install
$ npm test
```

## Test Cases

Basic Positive test (contentFormPositiveTests.json, defaultFormPositiveTests.json):
1. Go by link
2. (Wait for form to be shown)
3. Enter all valid values (see Values for Positive test)
4. Click Submit
**Expected Result:** request with correct data is sent, thank-you page with back link and link to site is opened 

Values for Positive test
|case name|name|phone|email|company*|
| ------ | ------ | ------ | ------ | ------ | 
|all fields are filled with valid values|John|0501234567|john@example.com|John Inc|

*only for contentForm

Basic Negative test (contentFormNegativeTests.json, defaultFormNegativeTests.json):
1. Go by link
2. (Wait for form to be shown)
3. Enter all valid values except one invalid (see Values for Negative test)
4. Click Submit (for changing focus)
**Expected Result:** valid error message is shown for invalid value only

Values for Negative test
|case name|name|phone|email|company*|
| ------ | ------ | ------ | ------ | ------ | 
|email is missing|John|0501234567||John Inc|
|phone is missing|John||john@example.com|John Inc|
|name is missing||0501234567|john@example.com|John Inc|
|company is missing|John|0501234567|john@example.com||
|phone is invalid (1)|John|050123456n|john@example.com|John Inc|
|phone is invalid (2)|John|050123456|john@example.com|John Inc|
|phone is invalid (3)|John|05012345678|john@example.com|John Inc|
|phone is invalid (4)|John|1501234567|john@example.com|John Inc|
|phone is invalid (5)|John|0401234567|john@example.com|John Inc|
|email is invalid (1)|John|0501234567|johnexamplecom|John Inc|
|email is invalid (2)|John|0501234567|john@examplecom|John Inc|
|email is invalid (3)|John|0501234567|johnexample.com|John Inc|
|email is invalid (4)|John|0501234567|john@example.c|John Inc|

*only for contentForm


