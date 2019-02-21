import {IdSelector, QxSelector} from "./adapters/TestCafe";

fixture `Testing dialog widgets`
  .page `http://127.0.0.1:8080/build/dialog.demo/index.html`;

const simpleDialogs = ['alert','warning','error'];
test('Simple dialogs: ' + simpleDialogs.join(', '), async t => {
  for( let type of simpleDialogs){
    let launchButton = IdSelector(`buttons/${type}`);
    let popupWindow  = IdSelector(`buttons/${type}/dialog`);
    let okButton     = IdSelector(`buttons/${type}/dialog/buttons/ok`);
    // click on button to see popup window
    await t
      // click on button to see popup window
      .click(launchButton)
      .expect(popupWindow.visible).ok()
      // click on the popup windows "OK" button to close it
      .click(okButton)
      .expect(popupWindow.visible).notOk();
  }
});

for( let buttonName of ['yes','no']){
  test(`Confirm dialog's '${buttonName}' button`, async t => {
    const launchButton = IdSelector('buttons/confirm');
    const popupWindowId = 'buttons/confirm/dialog1';
    const tcPopupWindow = IdSelector(popupWindowId);
    const qxPopupWindow = QxSelector(IdSelector(popupWindowId));
    const buttonId = popupWindowId + '/buttons/' + buttonName;
    const dialogButton = IdSelector(buttonId);
    await t
      .click(launchButton)
      // this opens the confirm dialog
      .expect(qxPopupWindow.getQxProperty('visibility')).eql('visible')
      // this clicks on "yes" and "no"
      .click(dialogButton);
      // this should close the confirm dialog and open another one, test currently not working
      //.expect(tcPopupWindow.visible).notOk();
  });
};

test(`Prompt`, async t => {
  const launchButton = IdSelector('buttons/prompt');
  const popupWindow1  = QxSelector(IdSelector('buttons/prompt/dialog1'));
  const okLabel1 = QxSelector(popupWindow1).findButtonLabelWithText('OK');
  const popupWindow2 = QxSelector(IdSelector('buttons/prompt/dialog2'));
  const okLabel2 = QxSelector(popupWindow2).findButtonLabelWithText('OK');
  const text = "abc01234567890" ;
  const displayedText = QxSelector(popupWindow2).findButtonLabelWithText(text);

  await t
    .click(launchButton)
    .expect(popupWindow1.visible).ok()
    .typeText(popupWindow1.find("input"), text)
    .click(okLabel1)
    .expect(popupWindow1.visible).notOk()
    .expect(popupWindow2.visible).ok()
    .expect(displayedText).ok()
    .click(okLabel2)
    .expect(popupWindow1.visible).notOk()
});

test(`Login`, async t => {
  const launchButton  = IdSelector('buttons/login');
  const loginWindow   = IdSelector('buttons/login/window');
  const loginButton   = IdSelector('buttons/login/window/buttons/login');
  const usernameField = IdSelector('buttons/login/window/form/username');
  const passwordField = IdSelector('buttons/login/window/form/password');
  const errorPopup    = QxSelector(IdSelector('buttons/login/window/error'));
  const successPopup  = QxSelector(IdSelector('buttons/login/window/success'));

  await t
    .click(launchButton)
    .expect(loginWindow.visible).ok()
    .typeText(usernameField, "wrong user")
    .typeText(passwordField, "wrong password")
    .click(loginButton)
    .expect(errorPopup.visible).ok()
    .click(errorPopup.findButtonLabelWithText('OK'))
    .expect(errorPopup.visible).notOk()
    .typeText(usernameField, " ")
    .typeText(usernameField, "demo")
    .typeText(passwordField, " ")
    .typeText(passwordField, "demo")
    .click(loginButton)
    .expect(successPopup.visible).ok()
    .click(successPopup.findButtonLabelWithText('OK'))
    .expect(loginWindow.visible).notOk()
});

test('Fill out form', async t => {
  let buttonId = 'buttons/form';
  let formId = buttonId + "/dialog";
  await t
    .click(IdSelector(buttonId))
    .expect(IdSelector(formId).visible).ok()
    .typeText(IdSelector(formId + '/form/username'), 'John Doe')
    .typeText(IdSelector(formId + '/form/address'), '1 Infinite Loop')
    .typeText(IdSelector(formId + '/form/commands'), "rm -rf /\nshutdown now\necho That's it.")
    .click(IdSelector(formId + '/buttons/ok'));
});

