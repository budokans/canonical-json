import { encode } from '../src/encode';

describe('handleArray', () => {
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

    const expected =
      '[" !#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~ printable ASCII","  U+0020 SPACE","A U+0041 LATIN CAPITAL LETTER A"," U+007F DELETE"," U+0080 PADDING CHARACTER","Å U+00C5 LATIN CAPITAL LETTER A WITH RING ABOVE","Å composition—U+0041 LATIN CAPITAL LETTER A + U+030A COMBINING RING ABOVE","Å U+212B ANGSTROM SIGN","ế U+1EBF LATIN SMALL LETTER E WITH CIRCUMFLEX AND ACUTE","ế composition—U+00EA LATIN SMALL LETTER E WITH CIRCUMFLEX + U+0301 COMBINING ACUTE ACCENT","ế composition—U+0065 LATIN SMALL LETTER E + U+0302 COMBINING CIRCUMFLEX ACCENT + U+0301 COMBINING ACUTE ACCENT","é̂ composition—U+0065 LATIN SMALL LETTER E + U+0301 COMBINING ACUTE ACCENT + U+0302 COMBINING CIRCUMFLEX ACCENT","← U+2190 LEFTWARDS ARROW","ﬁ U+FB01 LATIN SMALL LIGATURE FI","𝌆 surrogate pair—U+1D306 TETRAGRAM FOR CENTRE"]';

    const result = encode(input);
    expect(result).toStrictEqual(expected);
  });
});
