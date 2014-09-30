Chibi
=====
This is a tiny jQuery script that will inject a JavaScript REPL into
your DOM. It behaves like the Google Chrome console but this will operate
right into your page. 

Why would you ever need this? Well, if you find yourself hosted in an 
environment that pretends to be a browser but doesn't have a console then
this might come in handy.

It works perfectly in IE8 too.

Usage
=====
Make sure you have jQuery 1.9 or higher and the Chibi script loaded. Then just
create a `<div>` somewhere on your page to hold your console:

    <div id="console"></div>

And initialize using jQuery's `ready` function:

    <script>
        $(function () {
            $('#console').chibi();
        });
    </script>

If you want to output data to the console from your script you can do so
with the `info` and `error` actions:

    <script>
        $('#console').chibi('info', 'info message');
        $('#console').chibi('error', 'error message');
    </script>

You can clear the console with the `clear` action:

    <script>
        $('#console').chibi('clear');
    </script>

The console supports a rudimentary history feature with the up and down keys.
It's not very smart yet: it will not duplicate the last command but that's basically it.

Oh yeah, you might wanna include `chibi.css` too for some basic styling.

TODO
====
* Support more than one console in the DOM
* More sensible history support
* Configuration options