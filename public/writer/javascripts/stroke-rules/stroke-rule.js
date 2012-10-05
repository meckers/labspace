StrokeRule = Class.extend({
    name: 'default',
    shifted: false,
    alted: false,
    ranges: [],
    individuals: [],

    init: function() {

    },

    /*
    checkRanges: function(stroke) {
        for (i = 0; i<this.ranges.length; i++) {
            if (stroke.keyCode >= this.ranges[i].from
                && stroke.keyCode <= this.ranges[i].to
                && stroke.shifted === this.shifted
                && stroke.alted === this.alted) {
                return this.success('range', stroke);
            }
        }
        console.log("rule", this.name, "NOT MATCHED for keyCode", stroke.keyCode, "and returning false");
        return false;
    },*/

    /*
    check: function(stroke) {

        if (!this.shifted && !stroke.shifted && !this.alted && !stroke.alted && KeyMapper.unmodified[stroke.keyCode] !== null) {
            return this.success('unmodified keymap', stroke);
        }

        if (this.shifted && stroke.shifted && KeyMapper.shifted[stroke.keyCode] !== null) {
            return this.success('shifted keymap', stroke);
        }

        if (this.alted && stroke.alted && KeyMapper.alted[stroke.keyCode] !== null) {
            return this.success('alted keymap', stroke);
        }

        if (this.individuals.indexOf(stroke.keyCode) !== -1) {
            return this.success('individual', stroke);
        }

        console.log("rule", this.name, "NOT MATCHED for keyCode", stroke.keyCode, "and returning false");

        return false;
    },          */

    success: function(reason, stroke) {
        //console.log('rule', this.name, "matched for keyCode", stroke.keyCode, "because", reason, "and returning true");
        stroke.appliedRules.push(this.name + " (success)");
        return true;
    },

    fail: function(stroke) {
        stroke.appliedRules.push(this.name + " (fail)");
    }
});