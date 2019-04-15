(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.media.Abstract": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.bom.media.Audio", {
    extend: qx.bom.media.Abstract,

    /**
     * @param source {String} the source url to the sound file.
     */
    construct: function construct(source) {
      this._audio = new window.Audio(source ? source : "");
      qx.bom.media.Abstract.constructor.call(this, this._audio);
    },

    members: {
      _audio: null
    }
  });
  qx.bom.media.Audio.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Audio.js.map?dt=1555325107058