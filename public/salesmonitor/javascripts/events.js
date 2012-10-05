Magnus.Events = {

    listeners: [],

    register: function(name, callback) {
        var listener = new Listener(name, callback);
        this.listeners.push(listener);
    },

    trigger: function(name, data) {
        //console.log("EVENTS - triggering", name, "with", data);
        $(this.listeners).each(function(i,e) {
            if (e.name === name) {
                e.callback(data);
            }
        });
    }
}

Listener = Class.extend({

    name: null,
    callback: null,

    init: function(name, callback) {
        this.name = name;
        this.callback = callback;
    }
});