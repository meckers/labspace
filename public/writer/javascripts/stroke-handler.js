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

    /*
    listen: function() {
        var me = this;
        $(document).keypress(function(e) {
            return me.captureStroke(e, 'keypress');
        });
        $(document).keydown(function(e) {
            return me.captureStroke(e, 'keydown');
        });
    },*/

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
        //this.handleStroke(stroke);
        var chr = this.applyRules(stroke);
        console.log(stroke.event.type, "stroke was checked by rules", stroke.appliedRules, "before resolving to the char", chr);
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
            //console.log("checking rule", r.name, r.eventType, stroke.event.type);
            if (r.eventType === stroke.event.type && r.check(stroke)) {
                return r.resolve(stroke);
            }
            else if (r.eventType !== stroke.event.type) {
                //console.log("rule", r.name, "skipped due to unsupported event type!");
            }
        }
    },

    captureStroke: function(e, type) {
        return this.dispatchStroke(e);
    },

    /*
    captureStroke: function(e, type) {

        if (type == 'keypress') {
            this.dispatchStroke(e);
        }
        else if (type == 'keydown') {
            // OBS! Säkerställ så att inga av de koder som fångas här är sådana som även ska fångas av
            // keypress, t ex om keyCode 8 hade varit bokstaven 'a' så hade vi varit i trubbel.
            if (e.keyCode === 8) {         // expandera så vi fångar alla specialknappar som inte fångas av keypress.
                this.dispatchStroke(e);
                return false;
            }
            // arrow keys and other keys not needing to return false
            else if (this.cursorCodes.indexOf(e.keyCode) !== -1) {
                this.dispatchStroke(e);
            }
            //else if ()
        }
    },*/



    handleStroke: function(stroke) {
        //console.log("keypress stroke", stroke.keyCode, stroke.shifted ? "shifted" : "", stroke.alted ? "alted" : "", stroke.event.originalEvent.keyIdentifier, stroke.event);

        var gotChar = stroke.getChar();
        //console.log("got char", gotChar);

        var chr = null;
        var preventDraw = false;

        // is this a regular alphabetical character?
        if (stroke.isAlphaNumeric() && !stroke.isModified()) {
            chr = String.fromCharCode(stroke.keyCode).toUpperCase();
        }
        else if (stroke.shifted) {
            chr = KeyMapper.shifted[stroke.keyCode];
        }
        else if (stroke.alted) {
            chr = KeyMapper.alted[stroke.keyCode];
        }
        else if (stroke.keyCode === 8) {    // backspace
            this.drawingAgent.backspace();
            preventDraw = true;
        }
        else if (stroke.keyCode === 46) {
            // gör indrag...
        }
        else if (this.cursorCodes.indexOf(stroke.keyCode) !== -1) {
            this.drawingAgent.arrowKey(stroke.keyCode);
            preventDraw = true;
        }
        else {
            chr = KeyMapper.defaulted[stroke.keyCode];
        }

        if (!preventDraw) {
            this.drawingAgent.draw(chr);
        }

        Events.trigger("INCOMING_KEYSTROKE", stroke);

        return true;
    }
});
