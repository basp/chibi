(function ($) {
    $.fn.chibi = function (action) {
        var ENTER = 13,
            UP = 38,
            DOWN = 40;

        var $prompt,
            $cmd,
            $input;

        var history = [],
            i = -1;

        $prompt = $('<div class="chibi chibi-prompt">')
            .css('float', 'left')
            .append('&gt;&nbsp');

        $cmd = $('<div class="chibi chibi-command">')
            .attr('contenteditable', 'true');

        $input = $('<div class="chibi chibi-input">')
            .append($prompt)
            .append($cmd);

        if(action === 'write') {
            var output = fmtEcho(arguments[1]);
            write(output);
            return this;
        }

        function write(output) {
            var out = $(output).insertBefore($input);
            out.get(0).scrollIntoView(true);
            return this;
        }

        function fmtEcho(s) {
            return '<div class="chibi chibi-echo"><span>&gt;</span> ' + s + '</div>';
        }

        function fmtResult(r) {
            return '<div class="chibi chibi-result"><span>&lt;</span> ' + r + '</div>';
        }

        function fmtError(e) {
            return '<div class="chibi chibi-error"> ' + e + '</div>';
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
            write(output);
            $cmd.text('');
        }

        function onUp(event) {
            event.preventDefault();
            if (i < (history.length - 1)) {
                i += 1;
                $cmd.text(history[i]);
            }
            return;
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
            return;
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

        // Now that we are fully setup, we can inject ourselves into the DOM.
        $(this).append($input);
        $cmd.focus();
        return this;
    };
}(jQuery));