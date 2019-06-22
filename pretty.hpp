inline NSURLComponents* to_NSURLComponents(NSURL* url) {
    return [[NSURLComponents alloc] initWithURL: url resolvingAgainstBaseURL: YES];
}

inline NSString* prettyScheme(NSString* scheme) {
    if ([scheme isEqualToString: @"http"]) {
        return @"";
    }
    if ([scheme isEqualToString: @"https"]) {
        return @"🔒 ";
    }
    if ([scheme isEqualToString: @"mailto"]) {
        return @"✉️ ";
    }
    if ([scheme isEqualToString: @"tel"]) {
        return @"☎️ ";
    }
    return [NSString stringWithFormat: @"%@://", scheme];
}

inline NSString* prettyPath(NSString* path) {
    NSString* a = path;
    a = [a stringByReplacingOccurrencesOfString: @"/" withString: @" › "]; // Non-breaking space before
    a = [a stringByReplacingOccurrencesOfString: @"-" withString: @" "];
    a = [a stringByReplacingOccurrencesOfString: @"_" withString: @" "];
    a = [a stringByRemovingPercentEncoding];
    return a;
}

inline NSString* prettyQuery(NSURLComponents* c) {
    NSMutableString* result = [[NSMutableString alloc] init];
    BOOL previous = NO;
    for (NSURLQueryItem* item in c.queryItems) {
        
        NSString* name  = [item.name  stringByRemovingPercentEncoding];
        NSString* value = [item.value stringByRemovingPercentEncoding];
        
        if (!value) {
            NSString* format = previous ? @" & %@" : @"%@";
            [result appendFormat: format, name];
        } else {
            NSString* format = previous ? @" & %@ = %@" : @"%@ = %@";
            [result appendFormat: format, name, value];
        }

        previous = YES;        
    }
    return result;
}

inline NSString* prettyFragment(NSString* path) {
    NSString* a = path;
    a = [a stringByReplacingOccurrencesOfString: @"-" withString: @" "];
    a = [a stringByReplacingOccurrencesOfString: @"_" withString: @" "];
    a = [a stringByRemovingPercentEncoding];
    return a;
}

inline NSString* pretty(NSURLComponents* url, NSString* referenceHost = nil) {
    NSString* scheme = prettyScheme(url.scheme);
//    user; // Skip
//    password; // Skip
    NSString* host = url.host ? ([url.host isEqualToString: referenceHost] ? @"⌂" : url.host) : @"";
    NSString* port = url.port ? [NSString stringWithFormat: @":%@", url.port] : @"";
    NSString* path = url.path ? prettyPath(url.path) : @"";
    NSString* query = url.query ? [NSString stringWithFormat: @" ? %@", prettyQuery(url)] : @"";
    NSString* fragment = url.fragment ? [NSString stringWithFormat: @" # %@", prettyFragment(url.fragment)] : @"";
    return [NSString stringWithFormat: @"%@%@%@%@%@%@", scheme, host, port, path, query, fragment];    
}
    
inline NSString* pretty(NSURL* url, NSString* referenceHost = nil) {
    return pretty(to_NSURLComponents(url), referenceHost);
}
