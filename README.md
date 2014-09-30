Chibi
=====
This is a tiny JQuery script that will inject a JavaScript REPL into 
your DOM. It behaves like the Google Chrome console but this will operate
right into your page. 

Why would you ever need this? Well, if you find yourself hosted in an 
environment that pretends to be a browser but doesn't have a console then
this might come in handy.

It works in IE8 too. In fact, it has been made to work especially with this 
browser in mind. _Isn't 2014 great?_

Usage
=====
Make sure you have __jQuery ~1.9.0__ and the Chibi script loaded. Then just
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

Finally, you can clear the console with the `clear` action:

    <script>
        $('#console').chibi('clear');
    </script>

Oh yeah, you might wanna include `chibi.css` too for some basic styling.

TODO
====
* Support more than one console in the DOM
* Configuration options