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

        $prompt = $('<div>').addClass('chibi-prompt')
            .css('float', 'left')
                   .append('&gt;&nbsp');

        $cmd = $('<div>').addClass('chibi-command')
            .attr('contenteditable', 'true');

        $input = $('<div>').addClass('chibi-input')
            .append($prompt)
            .append($cmd);

        function onEnter(event) {
            var src, result, echo, $rprompt, output;
            event.preventDefault();
            src = $cmd.get(0).innerText;
            echo = '<div class="echo"><span>&gt;</span> ' + src + '</div>';
            $(echo).insertBefore($input);
            try {
                if (src != history[0]) {
                    history.unshift(src);
                }
                result = eval(src);
                output = '<div class="result"><span>&lt;</span> ' + result + '</div>';
            }
            catch (error) {
                output = '<div class="error"> ' + error + '</div>';
            }
            $(output).insertBefore($input);
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

        $(this).append($input);
    };
}(jQuery));