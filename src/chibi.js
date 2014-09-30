(function ($) {
    var ENTER = 13,
        UP = 38,
        DOWN = 40;

    var $prompt,
        $cmd,
        $input;

    var history = [],
        i = -1;

    $prompt = $('<div class="chibi-prompt">')
        .css('float', 'left')
        .append('&gt;&nbsp');

    $cmd = $('<div class="chibi-command">')
        .attr('contenteditable', 'true');

    $input = $('<div class="chibi-input">')
        .append($prompt)
        .append($cmd);

    $.fn.chibi = function (action) {
        if (action === 'info') {
            var output = fmtInfo(arguments[1]);
            write(output);
            return this;
        }

        if (action === 'error') {
            var output = fmtError(arguments[1]);
            write(output);
            return this;
        }

        if (action === 'clear') {
            $(this).children('.chibi-msg').remove();
            return this;
        }

        function write(output) {
            var out = $(output).insertBefore($input);
            out.get(0).scrollIntoView(true);
            return this;
        }

        function fmtInfo(s) {
            return '<div class="chibi-msg chibi-info">' + s + '</div>';
        }

        function fmtEcho(s) {
            return '<div class="chibi-msg chibi-echo"><span>&gt;</span> ' + s + '</div>';
        }

        function fmtResult(r) {
            return '<div class="chibi-msg chibi-result"><span>&lt;</span> ' + r + '</div>';
        }

        function fmtError(e) {
            return '<div class="chibi-msg chibi-error"> ' + e + '</div>';
        }

        function onEnter(event) {
            var src, result, echo, output;
            event.preventDefault();
            // We *have* to get `innerText` explicitly here
            src = $cmd.get(0).innerText;
            echo = fmtEcho(src);
            $(echo).insertBefore($input);
            try {
                if (src != history[0]) {
                    history.unshift(src);
                }
                result = eval(src);
                output = fmtResult(result);
            }
            catch (error) {
                output = fmtError(error);
            }
            i = -1;
            write(output);
            $cmd.text('');
        }

        function onUp(event) {
            event.preventDefault();
            if (i < (history.length - 1)) {
                i += 1;
                $cmd.text(history[i]);
            }
        }

        function onDown(event) {
            event.preventDefault();
            if (i > -1) {
                i -= 1;
            }
            if (i >= 0) {
                $cmd.text(history[i]);
            }
            else {
                $cmd.text('');
            }
        }

        $cmd.keydown(function (event) {
            switch (event.which) {
                case ENTER:
                    onEnter(event);
                    break;
                case UP:
                    onUp(event);
                    break;
                case DOWN:
                    onDown(event);
                    break;
            }
        });

        $(this).append($input).addClass('chibi-console');
        $cmd.focus();
        return this;
    };
}(jQuery));