Stroke = Class.extend({

    keyCode: null,
    shifted: false,
    alted: false,
    event: null,
    appliedRules: [],

    init: function(event) {
        this.keyCode = event.keyCode;
        this.shifted = event.shiftKey;
        this.alted = event.altKey;
        this.event = event;
        this.appliedRules = [];
        //console.log("event", event);
    },

    isModified: function() {
        return (this.shifted || this.alted);
    },

    isAlphaNumeric: function() {
        return ((this.keyCode >= 48 && this.keyCode <= 57) || (this.keyCode >= 97 && this.keyCode <= 122));
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


/*
Rules = [{
        name: 'alphaNumeric',
        shifted: false,
        alted: false,
        ranges: [{
            from: 48,
            to: 57
        },
        {
            from: 97,
            to: 122
        }],

        check: function(stroke) {
            for (i = 0; i<this.ranges.length; i++) {
                if (stroke.keyCode >= this.ranges[i].from
                    && stroke.keyCode <= this.ranges[i].to
                    && stroke.shifted === this.shifted
                    && stroke.alted === this.alted) {
                    return true;
                }

                if (this.shifted && KeyMapper.shifted[stroke.keyCode] !== null) {
                    return true;
                }
            }
            return false;
        },

        resolve: function(stroke) {
            return String.fromCharCode(stroke.keyCode).toUpperCase();
        }
    },

    {
        name: 'shifted',
        shifted: true,
        alted: false,
        ranges: [],

        check: function(stroke) {
            for (i = 0; i<this.ranges.length; i++) {
                if (stroke.keyCode >= this.ranges[i].from
                    && stroke.keyCode <= this.ranges[i].to
                    && stroke.shifted === this.shifted
                    && stroke.alted === this.alted) {
                    return true;
                }
            }

            if (this.shifted && KeyMapper.shifted[stroke.keyCode] !== null) {
                return true;
            }

            return false;
        },

        resolve: function(stroke) {
            return KeyMapper.shifted[stroke.keyCode];
        }
    }
];


AlphaNumericRule = Class.extend({
});          */