var BleepBloop = {
    /**
     * bleep - 1
     * bloop - 0
     */
    playSound: function (bit) {
        var file = parseInt(bit) ? "bleep" : "bloop",
            audio = new Audio(file + ".mp3");

        audio.play();
    },

    validate: function (bits) {
        var key, bit, valid, result = [];

        for (key in bits) {
            bit = parseInt(bits[key], 10);
            valid = bit === 1 || bit === 0;

            if (valid) {
                result.push(bit);
            }
        }

        return result;
    },

    processQueue: function (bits) {
        var bit = bits.shift(),
            self = this;

        this.playSound(bit);
        
        if (!bits.length) {
            return;
        }

        setTimeout(function () {
            self.processQueue(bits);
        }, 400);
    },

    translate: function (input) {
        var bits = this.validate(input.split(""));

        this.processQueue(bits);
    }
};

window.addEventListener("load", function () {
    var input = document.getElementById("input"),
        button = document.getElementById("do-it");

    button.addEventListener("click", function () {
        BleepBloop.translate(input.value);
    });
});