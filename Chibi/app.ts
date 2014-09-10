$(function () {
    var BACKSPACE = 8;
    var ENTER = 13;

    var prompt = '<span>&gt;</span> ';
    var $console = $('#console');
    var $input = $('#input');

    $input.append(prompt);
    $input.keydown(function (event) {
        var cmd, echo, output, result;

        if (event.which === BACKSPACE &&
            this.innerHTML.length === prompt.length) {
            event.preventDefault();
        }

        if (event.which === ENTER) {
            cmd = this.innerHTML.substr(prompt.length)
            echo = '<div class="echo"><span>&gt;</span> ' + cmd + '</div>';
            output, result;

            $(echo).insertBefore($input);
            try {
                result = eval(cmd);
                output = '<div class="result"><span>&lt;</span> ' + result + '</div>';
            }
            catch (error) {
                output = '<div class="error">' + error + '</div>';
            }

            $(output).insertBefore($input);
            this.innerHTML = prompt;
            event.preventDefault();
        }
    });
});