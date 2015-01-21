/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />

interface CommandStore {
    remember(cmd: string): void
    prev(): string;
    next(): string;
}

class MemoryCommandStore implements CommandStore {
    private commands: string[] = []
    private clientIndex: number = -1;

    remember(command: string) {
        if (command !== this.lastCommand()) {
            this.commands.push(command);
        }

        this.clientIndex = this.commands.length;
    }

    prev() {
        if (this.clientIndex > 0) {
            this.clientIndex -= 1;
            var cmd = this.commands[this.clientIndex];
            return cmd;
        }1

        return undefined;
    }

    next() {
        if (this.clientIndex < this.commands.length) {
            this.clientIndex += 1;
            var cmd = this.commands[this.clientIndex];
            return cmd;
        }

        return undefined;
    }

    private lastCommand() {
        if (this.commands.length > 0) {
            return this.commands[this.commands.length - 1];
        }

        return undefined;
    }
}

window['chibi'] = new MemoryCommandStore();