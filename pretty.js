/*
This code formats URLs so that you can display them to the user

EXAMPLE:
> pretty(new URL("http://callionica.com/top-level/next-level/"), "callionica.com")
< "⌂ › top level › next level › "

The output of these functions is Unicode text, makes careful use of non-breaking spaces, and tries not to hide any details.

You could use this code as a starting point with different design goals.
For example:
1. Produce HTML instead of text
2. Maybe the https protocol shouldn't have a symbol so you can keep things as short as possible
3. Maybe the http protocol should have a symbol to draw attention to it (a warning symbol ⚠️ ⚠︎ perhaps?)
3. Perhaps the host should be condensed more (leave off www. and .com for example, or use logos if producing HTML)
 */

function prettyHost(value, referenceHost) {
    if (value == referenceHost) {
        return  "⌂";
    }
    
    return value;
}

/* The protocol includes the colon at the end */
function prettyProtocol(value) {
    var replacements = [
        { protocol: "http:"  , replacement: ""    },
        { protocol: "https:" , replacement: "🔒 " },
        { protocol: "mailto:", replacement: "✉️ " },
        { protocol: "tel:"   , replacement: "☎️ " },
    ];
    
    var item = replacements.find(r => r.protocol === value);
    if (item) {
        return item.replacement;
    }

    return protocol + "//";
}

function prettyPath(value) {
    var replacements = [
        { find: /[/]index.html?$/gi  , replace: "/📄"      },
        { find: /[/]/gi    , replace: " › "    },
        { find: /[-_]+/gi  , replace: " "      },
    ];

    var result = value;
    replacements.forEach(r => {
        result = result.replace(r.find, r.replace);
    });
    
    result = decodeURIComponent(result);
    return result;
}

/* The search includes the question mark at the start */
function prettySearch(value) {
    var params = new URLSearchParams(value);
    var result = "";
    var previous = false;
    for (var [name, value] of params) {
        if (!value) {
            result += previous ? ` & ${name}` : name;
        } else {
            result += previous ? ` & ${name} = ${value}` : `${name} = ${value}`;
        }
        previous = true;
    }
    
    return value ? `? ${result}` : "";
}

/* The search includes the pound symbol at the start */
function prettyHash(value) {
    var replacements = [
        { find: /^#/gi     , replace: "# "      },
        { find: /[-_]+/gi  , replace: " "       },
    ];

    var result = value;
    replacements.forEach(r => {
        result = result.replace(r.find, r.replace);
    });
    
    result = decodeURIComponent(result);
    return result;
}

function pretty(url, referenceHost) {
    var protocol = url.protocol ? prettyProtocol(url.protocol) : "";
//    user; // Skip
//    password; // Skip
    var host = url.hostname ? prettyHost(url.hostname, referenceHost) : "";
    var port = url.port ? `:${url.port}` : "";
    var path = url.pathname ? prettyPath(url.pathname) : "";
    var search = url.search ? ` ${prettySearch(url.search)}` : "";
    var hash = url.hash ? ` ${prettyHash(url.hash)}` : "";
    return `${protocol}${host}${port}${path}${search}${hash}`;
}
