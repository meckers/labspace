StrokeHandler = Class.extend({

    drawingAgent: null,
    cursorCodes: [37, 38, 39, 40],
    rules: [],

    init: function(drawingAgent) {
        //console.info("StrokeHandler initialized", drawingAgent);
        this.drawingAgent = drawingAgent;
        this.setupRules();
        this.listen();
    },

    setupRules: function() {
        this.rules.push(new AlphaNumericRule());
        this.rules.push(new UnmodifiedRule());
        this.rules.push(new ShiftedRule());
        this.rules.push(new SpecialKeyRule());
    },

    listen: function() {
        var me = this;
        $(document).keypress(function(e) {
            return me.dispatchStroke(e);
        });
        $(document).keydown(function(e) {
            return me.dispatchStroke(e);
        });
    },


    dispatchStroke: function(keyEvent) {
        var stroke = new Stroke(keyEvent);
        Events.trigger("INCOMING_KEYSTROKE", stroke);
        return this.handleStroke(stroke);
    },

    handleStroke: function(stroke) {
        //this.handleStroke(stroke);
        var chr = this.applyRules(stroke);
        console.log(stroke.event.type, "stroke with code ", stroke.keyCode, "was checked by rules", stroke.appliedRules, "before resolving to the char", chr);
        //console.log("char returned from rules", chr);

        if (chr === false) {
            return false;
        }
        else if (chr !== undefined) {
            this.drawingAgent.draw(chr);
        }
    },


    applyRules: function(stroke) {
        for (k=0; k<this.rules.length; k++) {
            var r = this.rules[k];
            if (r.eventType === stroke.event.type) {
                var result = r.checkAndResolve(stroke);
                if (result !== null) {
                    return result;
                }
            }
        }
    },

    applyRules_: function(stroke) {
        for (k=0; k<this.rules.length; k++) {
            var r = this.rules[k];
            //console.log("checking rule", r.name, r.eventType, stroke.event.type);
            if (r.eventType === stroke.event.type && r.check(stroke)) {
                return r.resolve(stroke);
            }
            else if (r.eventType !== stroke.event.type) {
                //console.log("rule", r.name, "skipped due to unsupported event type!");
            }
        }
    }
});
