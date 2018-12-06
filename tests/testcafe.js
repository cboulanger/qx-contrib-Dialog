import {IdSelector, QxSelector} from "./adapters/TestCafe";

fixture `Testing dialog widgets`
  .page `http://127.0.0.1:8080/build/dialog.demo/index.html`;

const simpleDialogs = ['alert','warning','error'];
test('Simple dialogs: ' + simpleDialogs.join(', '), async t => {
  //console.log(await getPageHTML());
  for( let type of simpleDialogs){   
    let launchButton = IdSelector(`buttons/${type}`);
    let popupWindow  = IdSelector(`buttons/${type}/dialog`);
    let okLabel     = QxSelector(popupWindow).findButtonLabelWithText('OK');
    // click on button to see popup window
    await t
      // click on button to see popup window
      .click(launchButton)
      .expect(popupWindow.visible).ok()
      // click on the popup windows "OK" button to close it
      .click(okLabel)
      .expect(popupWindow.visible).notOk();
  }
});

for( let buttonText of ['yes','no']){
  test(`Confirm dialog's '${buttonText}' button`, async t => {
    const launchButton = IdSelector('buttons/confirm');
    const popupWindow  = QxSelector(IdSelector('buttons/confirm/dialog1'));
    let label = QxSelector(popupWindow).findButtonLabelWithText(buttonText);
    await t
      .click(launchButton)
      .expect(popupWindow.getQxProperty('visibility')).eql('visible')
      .click(label)
      .expect(popupWindow.visible).notOk(); 
  });
}

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
  const launchButton = IdSelector('buttons/login');
  const loginWindow  = QxSelector(IdSelector('buttons/login/window'));
  const loginButtonLabel = QxSelector(loginWindow).findButtonLabelWithText('Login');
  const errorPopup = QxSelector(IdSelector('buttons/login/window/error'));
  const successPopup = QxSelector(IdSelector('buttons/login/window/success'));
  
  await t
    .click(launchButton)
    .expect(loginWindow.visible).ok()
    .typeText(loginWindow.find("input[qxclass='qx.ui.form.TextField']"), "wrong user")
    .typeText(loginWindow.find("input[qxclass='qx.ui.form.PasswordField']"), "wrong password")
    .click(loginButtonLabel)
    .expect(errorPopup.visible).ok()
    .click(errorPopup.findButtonLabelWithText('OK'))
    .expect(errorPopup.visible).notOk()
    .typeText(loginWindow.find("input[qxclass='qx.ui.form.TextField']"), " ")
    .typeText(loginWindow.find("input[qxclass='qx.ui.form.TextField']"), "demo")
    .typeText(loginWindow.find("input[qxclass='qx.ui.form.PasswordField']"), " ")
    .typeText(loginWindow.find("input[qxclass='qx.ui.form.PasswordField']"), "demo")
    .click(loginButtonLabel)
    .expect(successPopup.visible).ok()
    .click(successPopup.findButtonLabelWithText('OK'))
    .expect(loginWindow.visible).notOk()
});