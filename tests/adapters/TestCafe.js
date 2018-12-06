import { Selector, ClientFunction } from 'testcafe';

export const getPageHTML = ClientFunction(() => document.documentElement.outerHTML);
export const IdSelector = Selector(id => document.querySelector(`[data-qx-object-id='${id}']`));
export const QxSelector = (selector) => {
  // browser-side methods
  selector = selector.addCustomMethods({
    getQxProperty: function(domNode, key){
      return qx.ui.core.Widget.getWidgetByElement(domNode).get(key);
    }
  });
  // NodeJS-side methods
  Object.assign(selector,{
    findButtonLabelWithText: function(text){
      return this
        .find("div[qxclass='qx.ui.form.Button']")
        .find("div[qxclass='qx.ui.basic.Label']")
        .withText(text);
    }
  });
  return selector;
};