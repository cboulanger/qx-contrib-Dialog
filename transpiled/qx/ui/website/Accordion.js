(function () {
    var $$dbClassInfo = {
        "dependsOn": {
            "qx.module.util.Object": {
                "require": true
            },
            "qx.Bootstrap": {
                "usage": "dynamic",
                "require": true
            },
            "qx.ui.website.Tabs": {
                "construct": true,
                "require": true
            },
            "qxWeb": {
                "defer": "runtime"
            }
        }
    };
    qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.ui.website.Accordion", {
        extend: qx.ui.website.Tabs,

        statics: {
            /**
             * *button*
             *
             * Template used by {@link qx.ui.website.Tabs#addButton} to create a new button.
             *
             * Default value: <pre><li><button>{{{content}}}</button></li></pre>
             */
            _templates: {
                button: "<li><button>{{{content}}}</button></li>"
            },

            /**
             * Factory method which converts the current collection into a collection of
             * accordion widgets.
             *
             * @param preselected {Integer?} The (zero-based) index of the panel that
             * should initially be opened
             * @return {qx.ui.website.Accordion} A new Accordion collection.
             * @attach {qxWeb}
             */
            accordion: function accordion(preselected) {
                var accordion = new qx.ui.website.Accordion(this);
                accordion.setConfig("orientation", "vertical");
                if (preselected) {
                    accordion.setConfig("preselected", preselected);
                }
                accordion.init();

                return accordion;
            }
        },

        construct: function construct(selector, context) {
            qx.ui.website.Tabs.constructor.call(this, selector, context);
        },

        defer: function defer(statics) {
            qxWeb.$attach({
                accordion: statics.accordion
            });
        }
    });
    qx.ui.website.Accordion.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Accordion.js.map?dt=1555325127545