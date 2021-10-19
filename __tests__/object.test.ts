import { encode } from '../src/encode';
import { transformObject } from '../src/object';

// describe('reOrderMembers', () => {
//   it('returns object members in correct order', () => {
//     const unorderedObj = {
//       '←': 'U+2190 LEFTWARDS ARROW',
//       é̂: 'composition—U+0065 LATIN SMALL LETTER E + U+0301 COMBINING ACUTE ACCENT + U+0302 COMBINING CIRCUMFLEX ACCENT',
//       '\uDFFF': 'U+DFFF highest high surrogate',
//       '\uD834\uDF06': 'surrogate pair—U+1D306 TETRAGRAM FOR CENTRE',
//       Å: 'composition—U+0041 LATIN CAPITAL LETTER A + U+030A COMBINING RING ABOVE',
//       '\u0001': 'U+0001 START OF HEADING',
//       '\uD800': 'U+D800 lowest high surrogate',
//       '': 'U+007F DELETE',
//       '̂': 'U+0302 COMBINING CIRCUMFLEX ACCENT',
//       ' ': 'U+0020 SPACE',
//       ế: 'composition—U+00EA LATIN SMALL LETTER E WITH CIRCUMFLEX + U+0301 COMBINING ACUTE ACCENT',
//       '': 'U+0080 PADDING CHARACTER',
//       ﬁ: 'U+FB01 LATIN SMALL LIGATURE FI',
//       '\u0000': 'U+0000 NULL',
//       '̇': 'U+0307 COMBINING DOT ABOVE',
//       '́': 'U+0301 COMBINING ACUTE ACCENT',
//       '\uDC00\uDFFF': 'two low surrogates',
//       '\uDC00\uDBFF': 'surrogates—low + high',
//       '\uD800\uDBFF': 'two high surrogates',
//       Å: 'U+00C5 LATIN CAPITAL LETTER A WITH RING ABOVE',
//       '�': 'U+FFFD REPLACEMENT CHARACTER',
//       ế: 'U+1EBF LATIN SMALL LETTER E WITH CIRCUMFLEX AND ACUTE',
//       A: 'U+0041 LATIN CAPITAL LETTER A',
//       '\uDBFF': 'U+DBFF highest high surrogate',
//       Å: 'U+212B ANGSTROM SIGN',
//       '\uDC00': 'U+DC00 lowest low surrogate',
//       '\u001F': 'U+001F INFORMATION SEPARATOR ONE',
//       '̊': 'U+030A COMBINING RING ABOVE',
//       '\\': 'U+005C REVERSE SOLIDUS',
//       '\t': 'U+0009 CHARACTER TABULATION',
//       '"': 'U+0022 QUOTATION MARK',
//       ế: 'composition—U+0065 LATIN SMALL LETTER E + U+0302 COMBINING CIRCUMFLEX ACCENT + U+0301 COMBINING ACUTE ACCENT',
//       '𐀀': 'U+10000 LINEAR B SYLLABLE B008 A',
//       '': 'empty',
//     };

//     const orderedObj = {
//       '': 'empty',
//       '\u0000': 'U+0000 NULL',
//       '\u0001': 'U+0001 START OF HEADING',
//       '\t': 'U+0009 CHARACTER TABULATION',
//       '\u001F': 'U+001F INFORMATION SEPARATOR ONE',
//       ' ': 'U+0020 SPACE',
//       '"': 'U+0022 QUOTATION MARK',
//       A: 'U+0041 LATIN CAPITAL LETTER A',
//       Å: 'composition—U+0041 LATIN CAPITAL LETTER A + U+030A COMBINING RING ABOVE',
//       '\\': 'U+005C REVERSE SOLIDUS',
//       é̂: 'composition—U+0065 LATIN SMALL LETTER E + U+0301 COMBINING ACUTE ACCENT + U+0302 COMBINING CIRCUMFLEX ACCENT',
//       ế: 'composition—U+0065 LATIN SMALL LETTER E + U+0302 COMBINING CIRCUMFLEX ACCENT + U+0301 COMBINING ACUTE ACCENT',
//       '': 'U+007F DELETE',
//       '': 'U+0080 PADDING CHARACTER',
//       Å: 'U+00C5 LATIN CAPITAL LETTER A WITH RING ABOVE',
//       ế: 'composition—U+00EA LATIN SMALL LETTER E WITH CIRCUMFLEX + U+0301 COMBINING ACUTE ACCENT',
//       '́': 'U+0301 COMBINING ACUTE ACCENT',
//       '̂': 'U+0302 COMBINING CIRCUMFLEX ACCENT',
//       '̇': 'U+0307 COMBINING DOT ABOVE',
//       '̊': 'U+030A COMBINING RING ABOVE',
//       ế: 'U+1EBF LATIN SMALL LETTER E WITH CIRCUMFLEX AND ACUTE',
//       Å: 'U+212B ANGSTROM SIGN',
//       '←': 'U+2190 LEFTWARDS ARROW',
//       '\uD800': 'U+D800 lowest high surrogate',
//       '\uD800\uDBFF': 'two high surrogates',
//       '\uDBFF': 'U+DBFF highest high surrogate',
//       '\uDC00': 'U+DC00 lowest low surrogate',
//       '\uDC00\uDBFF': 'surrogates—low + high',
//       '\uDC00\uDFFF': 'two low surrogates',
//       '\uDFFF': 'U+DFFF highest high surrogate',
//       ﬁ: 'U+FB01 LATIN SMALL LIGATURE FI',
//       '�': 'U+FFFD REPLACEMENT CHARACTER',
//       '𐀀': 'U+10000 LINEAR B SYLLABLE B008 A',
//       '𝌆': 'surrogate pair—U+1D306 TETRAGRAM FOR CENTRE',
//     };

//     const result = reOrderMembers(unorderedObj).map(([key, _]) => key);
//     expect(result).toStrictEqual(Object.keys(orderedObj));
//   });
// });

describe('transformObject', () => {
  it('transforms deeply nested objects to an encoded JSON string', () => {
    const input = {
      a: 2,
      3: 'one',
      the: [1, true, Symbol(), undefined, { foo: 'bar' }],
      obj: {
        a: 2222222,
        b: false,
      },
    };

    const expected =
      '{"3":"one","a":2,"obj":{"a":2222222,"b":false},"the":[1,true,null,null,{"foo":"bar"}]}';

    expect(transformObject(input)).toStrictEqual(expected);
  });
});
