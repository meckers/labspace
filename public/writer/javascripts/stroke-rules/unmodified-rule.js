UnmodifiedRule = StrokeRule.extend({

    name: 'unmodified',
    shifted: false,
    alted: false,
    eventType: 'keypress',

    check: function(stroke) {
        if (!stroke.shifted && !stroke.alted && KeyMapper.unmodified[stroke.keyCode] !== null) {
            return this.success('unmodified keymap', stroke);
        }
        this.fail(stroke);
    },

    resolve: function(stroke) {
        return KeyMapper.unmodified[stroke.keyCode];
    }
});