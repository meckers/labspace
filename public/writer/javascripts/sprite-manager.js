SpriteMap = {
    '@': 0,
    'A': 1,
    'B': 2,
    'C': 3,
    'D': 4,
    'E': 5,
    'F': 6
};

SpriteManager = Class.extend({

    charSize: {
        width: 16,
        height: 16
    },

    init: function() {

    },

    getForChar: function(char) {
        return {
            top: 0,
            left: SpriteMap[char] * this.charSize.width
        };
    }


});