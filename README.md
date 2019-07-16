# pretty
Display formatting for URLs

EXAMPLE: `http://callionica.com/top-level/next-level/` becomes `⌂ › top level › next level › `

The code produces Unicode text and makes careful use of non-breaking spaces so that URLs can be wrapped appropriately.

## pretty.hpp
This code is an Objective C++ header file that provides the ability to create a pretty URL for display to the user.

Call `pretty(url)` to get an `NSString*` that is easier to read than a standard URL.

The input `url` can be `NSURL*` or `NSURLComponents*`.

## pretty.js
Javascript code for formatting URLs so they can be shown to users


