import { encode } from '../src/encode';
import { isString } from '../src/identifyType';

describe('isString', () => {
  it('returns true for strings and objects constructed with the String constructor', () => {
    const input = ['foo', new String('bar')];
    const result = input.map(isString);
    expect(result).toStrictEqual([true, true]);
  });
});

describe('string func', () => {
  it('no unnecessary escapes', () => {
    const input = [
      '\u0020\u0021\u0023\u0024\u0025\u0026\u0027\u0028\u0029\u002A\u002B\u002C\u002D\u002E\u002F\u0030\u0031\u0032\u0033\u0034\u0035\u0036\u0037\u0038\u0039\u003A\u003B\u003C\u003D\u003E\u003F\u0040\u0041\u0042\u0043\u0044\u0045\u0046\u0047\u0048\u0049\u004A\u004B\u004C\u004D\u004E\u004F\u0050\u0051\u0052\u0053\u0054\u0055\u0056\u0057\u0058\u0059\u005A\u005B\u005D\u005E\u005F\u0060\u0061\u0062\u0063\u0064\u0065\u0066\u0067\u0068\u0069\u006A\u006B\u006C\u006D\u006E\u006F\u0070\u0071\u0072\u0073\u0074\u0075\u0076\u0077\u0078\u0079\u007A\u007B\u007C\u007D\u007E printable ASCII',
      '\u0020 U+0020 SPACE',
      '\u0041 U+0041 LATIN CAPITAL LETTER A',
      '\u007F U+007F DELETE',
      '\u0080 U+0080 PADDING CHARACTER',
      '\u00C5 U+00C5 LATIN CAPITAL LETTER A WITH RING ABOVE',
      'A\u030A composition—U+0041 LATIN CAPITAL LETTER A + U+030A COMBINING RING ABOVE',
      '\u212B U+212B ANGSTROM SIGN',
      '\u1EBF U+1EBF LATIN SMALL LETTER E WITH CIRCUMFLEX AND ACUTE',
      '\u00EA\u0301 composition—U+00EA LATIN SMALL LETTER E WITH CIRCUMFLEX + U+0301 COMBINING ACUTE ACCENT',
      '\u0065\u0302\u0301 composition—U+0065 LATIN SMALL LETTER E + U+0302 COMBINING CIRCUMFLEX ACCENT + U+0301 COMBINING ACUTE ACCENT',
      '\u0065\u0301\u0302 composition—U+0065 LATIN SMALL LETTER E + U+0301 COMBINING ACUTE ACCENT + U+0302 COMBINING CIRCUMFLEX ACCENT',
      '\u2190 U+2190 LEFTWARDS ARROW',
      '\uFB01 U+FB01 LATIN SMALL LIGATURE FI',
      '\uD834\uDF06 surrogate pair—U+1D306 TETRAGRAM FOR CENTRE',
    ];

    const expected = [
      '" !#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~ printable ASCII"',
      '"  U+0020 SPACE"',
      '"A U+0041 LATIN CAPITAL LETTER A"',
      '" U+007F DELETE"',
      '" U+0080 PADDING CHARACTER"',
      '"Å U+00C5 LATIN CAPITAL LETTER A WITH RING ABOVE"',
      '"Å composition—U+0041 LATIN CAPITAL LETTER A + U+030A COMBINING RING ABOVE"',
      '"Å U+212B ANGSTROM SIGN"',
      '"ế U+1EBF LATIN SMALL LETTER E WITH CIRCUMFLEX AND ACUTE"',
      '"ế composition—U+00EA LATIN SMALL LETTER E WITH CIRCUMFLEX + U+0301 COMBINING ACUTE ACCENT"',
      '"ế composition—U+0065 LATIN SMALL LETTER E + U+0302 COMBINING CIRCUMFLEX ACCENT + U+0301 COMBINING ACUTE ACCENT"',
      '"é̂ composition—U+0065 LATIN SMALL LETTER E + U+0301 COMBINING ACUTE ACCENT + U+0302 COMBINING CIRCUMFLEX ACCENT"',
      '"← U+2190 LEFTWARDS ARROW"',
      '"ﬁ U+FB01 LATIN SMALL LIGATURE FI"',
      '"𝌆 surrogate pair—U+1D306 TETRAGRAM FOR CENTRE"',
    ];

    const result = input.map(encode);
    expect(result).toStrictEqual(expected);
  });

  it('removes combining escapes', () => {
    const input = [
      '\u0307 U+0307 COMBINING DOT ABOVE',
      '\u180B U+180B MONGOLIAN FREE VARIATION SELECTOR ONE',
      '\u180C U+180C MONGOLIAN FREE VARIATION SELECTOR TWO',
      '\u180D U+180D MONGOLIAN FREE VARIATION SELECTOR THREE',
      '\uFE00 U+FE00 VARIATION SELECTOR-1',
      '\uFE0F U+FE0F VARIATION SELECTOR-16',
      '\uDB40\uDD00 U+E0100 VARIATION SELECTOR-17',
      '\uDB40\uDDEF U+E01EF VARIATION SELECTOR-256',

      { '\u0307': 'U+0307 COMBINING DOT ABOVE' },
      { '\u180B': 'U+180B MONGOLIAN FREE VARIATION SELECTOR ONE' },
      { '\u180C': 'U+180C MONGOLIAN FREE VARIATION SELECTOR TWO' },
      { '\u180D': 'U+180D MONGOLIAN FREE VARIATION SELECTOR THREE' },
      { '\uFE00': 'U+FE00 VARIATION SELECTOR-1' },
      { '\uFE0F': 'U+FE0F VARIATION SELECTOR-16' },
      { '\uDB40\uDD00': 'U+E0100 VARIATION SELECTOR-17' },
      { '\uDB40\uDDEF': 'U+E01EF VARIATION SELECTOR-256' },
    ];

    const expected =
      '["̇ U+0307 COMBINING DOT ABOVE","᠋ U+180B MONGOLIAN FREE VARIATION SELECTOR ONE","᠌ U+180C MONGOLIAN FREE VARIATION SELECTOR TWO","᠍ U+180D MONGOLIAN FREE VARIATION SELECTOR THREE","︀ U+FE00 VARIATION SELECTOR-1","️ U+FE0F VARIATION SELECTOR-16","󠄀 U+E0100 VARIATION SELECTOR-17","󠇯 U+E01EF VARIATION SELECTOR-256",{"̇":"U+0307 COMBINING DOT ABOVE"},{"᠋":"U+180B MONGOLIAN FREE VARIATION SELECTOR ONE"},{"᠌":"U+180C MONGOLIAN FREE VARIATION SELECTOR TWO"},{"᠍":"U+180D MONGOLIAN FREE VARIATION SELECTOR THREE"},{"︀":"U+FE00 VARIATION SELECTOR-1"},{"️":"U+FE0F VARIATION SELECTOR-16"},{"󠄀":"U+E0100 VARIATION SELECTOR-17"},{"󠇯":"U+E01EF VARIATION SELECTOR-256"}]';

    const result = encode(input);
    expect(result).toStrictEqual(expected);
  });

  it('uses two-character escape sequences where possible', () => {
    const input = [
      '\u0008 U+0008 BACKSPACE',
      '\u0009 U+0009 CHARACTER TABULATION',
      '\u000A U+000A LINE FEED',
      '\u000C U+000C FORM FEED',
      '\u000D U+000D CARRIAGE RETURN',
      '\u0022 U+0022 QUOTATION MARK',
      '\u005C U+005C REVERSE SOLIDUS',

      { '\u0008': 'U+0008 BACKSPACE' },
      { '\u0009': 'U+0009 CHARACTER TABULATION' },
      { '\u000A': 'U+000A LINE FEED' },
      { '\u000C': 'U+000C FORM FEED' },
      { '\u000D': 'U+000D CARRIAGE RETURN' },
      { '\u0022': 'U+0022 QUOTATION MARK' },
      { '\u005C': 'U+005C REVERSE SOLIDUS' },
    ];

    const expected =
      '["\b U+0008 BACKSPACE","\t U+0009 CHARACTER TABULATION","\n U+000A LINE FEED","\f U+000C FORM FEED","\r U+000D CARRIAGE RETURN","" U+0022 QUOTATION MARK","\\ U+005C REVERSE SOLIDUS",{"\b":"U+0008 BACKSPACE"},{"\t":"U+0009 CHARACTER TABULATION"},{"\n":"U+000A LINE FEED"},{"\f":"U+000C FORM FEED"},{"\r":"U+000D CARRIAGE RETURN"},{""":"U+0022 QUOTATION MARK"},{"\\":"U+005C REVERSE SOLIDUS"}]';

    const result = encode(input);
    expect(result).toStrictEqual(expected);
  });

  it('uses two-character escape sequences where possible', () => {
    const input = [
      '\u0008 U+0008 BACKSPACE',
      '\u0009 U+0009 CHARACTER TABULATION',
      '\u000A U+000A LINE FEED',
      '\u000C U+000C FORM FEED',
      '\u000D U+000D CARRIAGE RETURN',
      '\u0022 U+0022 QUOTATION MARK',
      '\u005C U+005C REVERSE SOLIDUS',

      { '\u0008': 'U+0008 BACKSPACE' },
      { '\u0009': 'U+0009 CHARACTER TABULATION' },
      { '\u000A': 'U+000A LINE FEED' },
      { '\u000C': 'U+000C FORM FEED' },
      { '\u000D': 'U+000D CARRIAGE RETURN' },
      { '\u0022': 'U+0022 QUOTATION MARK' },
      { '\u005C': 'U+005C REVERSE SOLIDUS' },
    ];

    const expected =
      '["\b U+0008 BACKSPACE","\t U+0009 CHARACTER TABULATION","\n U+000A LINE FEED","\f U+000C FORM FEED","\r U+000D CARRIAGE RETURN","" U+0022 QUOTATION MARK","\\ U+005C REVERSE SOLIDUS",{"\b":"U+0008 BACKSPACE"},{"\t":"U+0009 CHARACTER TABULATION"},{"\n":"U+000A LINE FEED"},{"\f":"U+000C FORM FEED"},{"\r":"U+000D CARRIAGE RETURN"},{""":"U+0022 QUOTATION MARK"},{"\\":"U+005C REVERSE SOLIDUS"}]';

    const result = encode(input);
    expect(result).toStrictEqual(expected);
  });

  it('uses six-character \\u00xx uppercase hex escape sequences for control characters that require escaping but lack a two-character sequence', () => {
    const input = [
      '\u0000 U+0000 NULL',
      '\u0001 U+0001 START OF HEADING',
      '\u0002 U+0002 START OF TEXT',
      '\u0003 U+0003 END OF TEXT',
      '\u0004 U+0004 END OF TRANSMISSION',
      '\u0005 U+0005 ENQUIRY',
      '\u0006 U+0006 ACKNOWLEDGE',
      '\u0007 U+0007 BELL',
      '\u000b U+000B LINE TABULATION',
      '\u000e U+000E SHIFT OUT',
      '\u000f U+000F SHIFT IN',
      '\u0010 U+0010 DATA LINK ESCAPE',
      '\u0011 U+0011 DEVICE CONTROL ONE',
      '\u0012 U+0012 DEVICE CONTROL TWO',
      '\u0013 U+0013 DEVICE CONTROL THREE',
      '\u0014 U+0014 DEVICE CONTROL FOUR',
      '\u0015 U+0015 NEGATIVE ACKNOWLEDGE',
      '\u0016 U+0016 SYNCHRONOUS IDLE',
      '\u0017 U+0017 END OF TRANSMISSION BLOCK',
      '\u0018 U+0018 CANCEL',
      '\u0019 U+0019 END OF MEDIUM',
      '\u001a U+001A SUBSTITUTE',
      '\u001b U+001B ESCAPE',
      '\u001c U+001C INFORMATION SEPARATOR FOUR',
      '\u001d U+001D INFORMATION SEPARATOR THREE',
      '\u001e U+001E INFORMATION SEPARATOR TWO',
      '\u001f U+001F INFORMATION SEPARATOR ONE',

      { '\u0000': 'U+0000 NULL' },
      { '\u0001': 'U+0001 START OF HEADING' },
      { '\u0002': 'U+0002 START OF TEXT' },
      { '\u0003': 'U+0003 END OF TEXT' },
      { '\u0004': 'U+0004 END OF TRANSMISSION' },
      { '\u0005': 'U+0005 ENQUIRY' },
      { '\u0006': 'U+0006 ACKNOWLEDGE' },
      { '\u0007': 'U+0007 BELL' },
      { '\u000b': 'U+000B LINE TABULATION' },
      { '\u000e': 'U+000E SHIFT OUT' },
      { '\u000f': 'U+000F SHIFT IN' },
      { '\u0010': 'U+0010 DATA LINK ESCAPE' },
      { '\u0011': 'U+0011 DEVICE CONTROL ONE' },
      { '\u0012': 'U+0012 DEVICE CONTROL TWO' },
      { '\u0013': 'U+0013 DEVICE CONTROL THREE' },
      { '\u0014': 'U+0014 DEVICE CONTROL FOUR' },
      { '\u0015': 'U+0015 NEGATIVE ACKNOWLEDGE' },
      { '\u0016': 'U+0016 SYNCHRONOUS IDLE' },
      { '\u0017': 'U+0017 END OF TRANSMISSION BLOCK' },
      { '\u0018': 'U+0018 CANCEL' },
      { '\u0019': 'U+0019 END OF MEDIUM' },
      { '\u001a': 'U+001A SUBSTITUTE' },
      { '\u001b': 'U+001B ESCAPE' },
      { '\u001c': 'U+001C INFORMATION SEPARATOR FOUR' },
      { '\u001d': 'U+001D INFORMATION SEPARATOR THREE' },
      { '\u001e': 'U+001E INFORMATION SEPARATOR TWO' },
      { '\u001f': 'U+001F INFORMATION SEPARATOR ONE' },
    ];

    const expected =
      '["\u0000 U+0000 NULL","\u0001 U+0001 START OF HEADING","\u0002 U+0002 START OF TEXT","\u0003 U+0003 END OF TEXT","\u0004 U+0004 END OF TRANSMISSION","\u0005 U+0005 ENQUIRY","\u0006 U+0006 ACKNOWLEDGE","\u0007 U+0007 BELL","\u000B U+000B LINE TABULATION","\u000E U+000E SHIFT OUT","\u000F U+000F SHIFT IN","\u0010 U+0010 DATA LINK ESCAPE","\u0011 U+0011 DEVICE CONTROL ONE","\u0012 U+0012 DEVICE CONTROL TWO","\u0013 U+0013 DEVICE CONTROL THREE","\u0014 U+0014 DEVICE CONTROL FOUR","\u0015 U+0015 NEGATIVE ACKNOWLEDGE","\u0016 U+0016 SYNCHRONOUS IDLE","\u0017 U+0017 END OF TRANSMISSION BLOCK","\u0018 U+0018 CANCEL","\u0019 U+0019 END OF MEDIUM","\u001A U+001A SUBSTITUTE","\u001B U+001B ESCAPE","\u001C U+001C INFORMATION SEPARATOR FOUR","\u001D U+001D INFORMATION SEPARATOR THREE","\u001E U+001E INFORMATION SEPARATOR TWO","\u001F U+001F INFORMATION SEPARATOR ONE",{"\u0000":"U+0000 NULL"},{"\u0001":"U+0001 START OF HEADING"},{"\u0002":"U+0002 START OF TEXT"},{"\u0003":"U+0003 END OF TEXT"},{"\u0004":"U+0004 END OF TRANSMISSION"},{"\u0005":"U+0005 ENQUIRY"},{"\u0006":"U+0006 ACKNOWLEDGE"},{"\u0007":"U+0007 BELL"},{"\u000B":"U+000B LINE TABULATION"},{"\u000E":"U+000E SHIFT OUT"},{"\u000F":"U+000F SHIFT IN"},{"\u0010":"U+0010 DATA LINK ESCAPE"},{"\u0011":"U+0011 DEVICE CONTROL ONE"},{"\u0012":"U+0012 DEVICE CONTROL TWO"},{"\u0013":"U+0013 DEVICE CONTROL THREE"},{"\u0014":"U+0014 DEVICE CONTROL FOUR"},{"\u0015":"U+0015 NEGATIVE ACKNOWLEDGE"},{"\u0016":"U+0016 SYNCHRONOUS IDLE"},{"\u0017":"U+0017 END OF TRANSMISSION BLOCK"},{"\u0018":"U+0018 CANCEL"},{"\u0019":"U+0019 END OF MEDIUM"},{"\u001A":"U+001A SUBSTITUTE"},{"\u001B":"U+001B ESCAPE"},{"\u001C":"U+001C INFORMATION SEPARATOR FOUR"},{"\u001D":"U+001D INFORMATION SEPARATOR THREE"},{"\u001E":"U+001E INFORMATION SEPARATOR TWO"},{"\u001F":"U+001F INFORMATION SEPARATOR ONE"}]';

    const result = encode(input);
    expect(result).toStrictEqual(expected);
  });

  it('uses six-character \\uDxxx uppercase hexadecimal escape sequences for lone surrogates', () => {
    const input = [
      '\ud800',
      '\udbff',
      '\udc00',
      '\udfff',
      '\ud800\udbff',
      '\udc00\udfff',
      '\udc00\udbff',

      { '\ud800': 0 },
      { '\udbff': 0 },
      { '\udc00': 0 },
      { '\udfff': 0 },
      { '\ud800\udbff': 0 },
      { '\udc00\udfff': 0 },
      { '\udc00\udbff': 0 },
    ];

    const expected =
      '["\uD800","\uDBFF","\uDC00","\uDFFF","\uD800\uDBFF","\uDC00\uDFFF","\uDC00\uDBFF",{"\uD800":0},{"\uDBFF":0},{"\uDC00":0},{"\uDFFF":0},{"\uD800\uDBFF":0},{"\uDC00\uDFFF":0},{"\uDC00\uDBFF":0}]';

    const result = encode(input);
    expect(result).toStrictEqual(expected);
  });
});
