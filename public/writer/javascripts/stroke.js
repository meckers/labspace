Stroke = Class.extend({

    keyCode: null,
    shifted: false,
    alted: false,
    ctrld: false,
    event: null,
    appliedRules: [],

    init: function(event) {
        this.keyCode = event.keyCode;
        this.shifted = event.shiftKey;
        this.ctrld = event.ctrlKey;
        this.alted = event.altKey;
        this.event = event;
        this.appliedRules = [];
        //console.log("event", event);
    },

    isModified: function() {
        return (this.shifted || this.alted || this.ctrld);
    },

    getChar: function() {
        for (i=0; i<Rules.length; i++) {
            var r = Rules[i];
            if (r.check(this)) {
                return r.resolve(this);
            }
        }
    }
});