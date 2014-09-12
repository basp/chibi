$(function () {
    var ENTER = 13, UP = 38, DOWN = 40;

    var $console = $('#chibi-console'),
        $input = $('#chibi-console > div.input'),
        $cmd = $('#chibi-console > div.input > div.cmd'),
        history = [],
        i = -1;

    $cmd.keydown(function (event) {
        var source, echo, output, result;

        if (event.which === UP) {
            event.preventDefault();
            if (i < (history.length - 1)) {
                i += 1;
                this.innerHTML = history[i];
            }
            return;
        }

        if (event.which === DOWN) {
            event.preventDefault();
            if (i > -1) {
                i -= 1;
            }
            if (i >= 0) {
                this.innerHTML = history[i];
            }
            else {
                this.innerHTML = '';
            }
            return;
        }

        if (event.which === ENTER) {
            source = this.innerHTML.substr(prompt.length);
            echo = '<div class="echo"><span>&gt;</span> ' + source + '</div>';

            $(echo).insertBefore($input);
            try {
                history.unshift(source);
                result = eval(source);
                output = '<div class="result"><span>&lt;</span> ' + result + '</div>';
            }
            catch (error) {
                output = '<div class="error"> ' + error + '</div>';
            }

            $(output).insertBefore($input);
            this.innerHTML = '';
            event.preventDefault();
        }
    });
}); 