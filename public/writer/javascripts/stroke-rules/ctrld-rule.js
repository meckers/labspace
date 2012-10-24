CtrldRule = StrokeRule.extend({

    name: 'ctrld',
    shifted: false,
    alted: false,
    ctrld: true,
    eventType: 'keypress',


    checkAndResolve: function(stroke) {
        if (stroke.event.type == this.eventType && stroke.ctrld) {
            for (var p in KeyMapper.ctrld) {
                if (KeyMapper.ctrld[p] !== undefined && stroke.keyCode === KeyMapper.ctrld[p]) {
                    Events.trigger("SPECIAL_KEY_" + p.toUpperCase());
                    //return false;
                }
            }
        }
        return null;
    }

    /*
    checkAndResolve: function(stroke) {
        console.log("ctrldrule checking");
        var result = null;
        if (stroke.ctrld) {
            for (var p in KeyMapper.special) {
                var mapping = KeyMapper.special[p];
                console.log("ctrldrule keymapping", mapping);
                if (mapping !== undefined && stroke.keyCode === mapping.keyCode) {
                    console.log("triggering", p);
                    Events.trigger("SPECIAL_KEY_" + p.toUpperCase(), mapping.arguments);
                    //return false;
                }
            }
        }
        return null;
    } */

});