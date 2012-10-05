SpecialKeyRule = StrokeRule.extend({

    name: 'special',
    shifted: false,
    alted: false,
    individuals: [KeyMapper.special['backspace']],
    eventType: 'keydown',

    check: function(stroke) {
        if (this.individuals.indexOf(stroke.keyCode) !== -1) {
            return this.success('individual', stroke);
        }
        this.fail(stroke);
    },

    resolve: function(stroke) {
        if (KeyMapper.special['backspace'] === stroke.keyCode) {
            console.log("that was backspace");
        }
        return false;
    }
});