AlphaNumericRule = StrokeRule.extend({

    name: 'alphaNumeric',
    shifted: false,
    alted: false,
    eventType: 'keypress',

    ranges: [{
        from: 48,
        to: 57
    },
    {
        from: 97,
        to: 122
    }],

    check: function(stroke) {
        if (!stroke.shifted && !stroke.alted) {
            for (i = 0; i<this.ranges.length; i++) {
                if (stroke.keyCode >= this.ranges[i].from
                    && stroke.keyCode <= this.ranges[i].to
                    && !stroke.shifted
                    && !stroke.alted) {
                    return this.success('range', stroke);
                }
            }
            console.log("rule", this.name, "NOT MATCHED for keyCode", stroke.keyCode, "and returning false");
        }
        this.fail(stroke);
        return false;
    },

    resolve: function(stroke) {
        return String.fromCharCode(stroke.keyCode).toUpperCase();
    },

    checkAndResolve: function(stroke) {
        if (!stroke.shifted && !stroke.alted) {
            for (i = 0; i<this.ranges.length; i++) {
                if (stroke.keyCode >= this.ranges[i].from
                    && stroke.keyCode <= this.ranges[i].to
                    && !stroke.shifted
                    && !stroke.alted) {
                    return String.fromCharCode(stroke.keyCode).toUpperCase();
                }
            }
        }
        console.log("rule", this.name, "NOT MATCHED for keyCode", stroke.keyCode, "and returning null");
        return null;
    }
});