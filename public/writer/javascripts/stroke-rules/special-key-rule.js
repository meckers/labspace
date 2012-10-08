SpecialKeyRule = StrokeRule.extend({

    name: 'special',
    shifted: false,
    alted: false,
    //individuals: [KeyMapper.special['backspace']],
    eventType: 'keydown',


    check: function(stroke) {
        for (var p in KeyMapper.special) {
            if (stroke.keyCode === KeyMapper.special[p]) {
                return this.success('individual', stroke);
            }
        }
        this.fail(stroke);
    },

    checkAndResolve: function(stroke) {
        var result = null;
        for (var p in KeyMapper.special) {
            //console.log(p);
            if (stroke.keyCode === KeyMapper.special[p]) {
                console.log("triggering", p);
                Events.trigger("SPECIAL_KEY_" + p.toUpperCase(), stroke);
                //return false;
            }
        }
        return null;
    },

    /*
    check: function(stroke) {
        if (this.individuals.indexOf(stroke.keyCode) !== -1) {
            return this.success('individual', stroke);
        }
        this.fail(stroke);
    }, */

    resolve: function(stroke) {
        try {
            if (KeyMapper.special['backspace'] === stroke.keyCode) {
                Events.trigger("SPECIAL_KEY_BACKSPACE", stroke);
            }
        }
        catch(ex) {
            console.log(ex);
            return false;
        }
        return false;
    }
});