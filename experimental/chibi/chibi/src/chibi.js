/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />

var MemoryCommandStore = (function () {
    function MemoryCommandStore() {
        this.commands = [];
        this.clientIndex = -1;
    }
    MemoryCommandStore.prototype.remember = function (command) {
        if (command !== this.lastCommand()) {
            this.commands.push(command);
        }

        this.clientIndex = this.commands.length;
    };

    MemoryCommandStore.prototype.prev = function () {
        if (this.clientIndex > 0) {
            this.clientIndex -= 1;
            var cmd = this.commands[this.clientIndex];
            return cmd;
        }
        1;

        return undefined;
    };

    MemoryCommandStore.prototype.next = function () {
        if (this.clientIndex < this.commands.length) {
            this.clientIndex += 1;
            var cmd = this.commands[this.clientIndex];
            return cmd;
        }

        return undefined;
    };

    MemoryCommandStore.prototype.lastCommand = function () {
        if (this.commands.length > 0) {
            return this.commands[this.commands.length - 1];
        }

        return undefined;
    };
    return MemoryCommandStore;
})();

window['chibi'] = new MemoryCommandStore();
//# sourceMappingURL=chibi.js.map
