import { Selector, ClientFunction } from 'testcafe';

export const getPageHTML = ClientFunction(() => document.documentElement.outerHTML);
export const IdSelector = Selector(id => document.querySelector(`[data-qx-object-id='${id}']`));
export const QxSelector = (selector) => {
  // browser-side methods
  selector = selector.addCustomMethods({

    /**
     * Returns the absolute id of the owned object with that id
     * @param domNode
     * @param id
     * @returns {String}
     */
    absoluteIdOf : function(domNode, id){
      return qx.core.Id.getAbsoluteIdOf(qx.ui.core.Widget.getWidgetByElement(domNode).getObject(id));
    },
    /**
     * Returns the value of the property of the widget that is connected with the DOM node
     * @param domNode
     * @param key
     * @returns {*|var}
     */
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
