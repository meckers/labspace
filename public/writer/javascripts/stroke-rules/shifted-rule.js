ShiftedRule = StrokeRule.extend({

    name: 'shifted',
    shifted: true,
    alted: false,
    eventType: 'keypress',

    check: function(stroke) {
        if (stroke.shifted && KeyMapper.shifted[stroke.keyCode] !== null) {
            return this.success('shifted keymap', stroke);
        }
        this.fail(stroke);
    },

    resolve: function(stroke) {
        return KeyMapper.shifted[stroke.keyCode];
    }
});