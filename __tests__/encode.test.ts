import { encode } from '../src/encode';
import { shouldCoerceToNull } from '../src/identifyType';

describe('shouldCoerceToNull', () => {
  it('returns true if the input value is of type undefined, Symbol, Function, BigInt or null', () => {
    const input = [
      function double(n: any) {
        return n * 2;
      },
      Symbol('foo'),
      undefined,
      null,
      BigInt(9007199254740991),
    ];
    const result = input.map(shouldCoerceToNull);
    expect(result).toStrictEqual([true, true, true, true, true]);
  });

  it('returns false if the input value is neither of type undefined, Symbol, Function nor null', () => {
    const input = [2, 'foo', true, { foo: 'bar' }, [1, 3, true]];
    const result = input.map(shouldCoerceToNull);
    expect(result).toStrictEqual([false, false, false, false, false]);
  });
});

describe('encode', () => {
  it('returns a stringified value', () => {
    const input = [
      function double(n: any) {
        return n * 2;
      },
      Symbol('foo'),
      undefined,
      null,
      2,
      'foo',
      true,
      new Boolean(true),
      BigInt(9007199254740991),
      Infinity,
      NaN,
      { foo: 'bar' },
      [1, 3, true],
      new Date('1995-12-17T03:24:00'),
      [
        'a',
        3,
        function double(n: any) {
          return n * 2;
        },
        [
          'a',
          3,
          function double(n: any) {
            return n * 2;
          },
          [],
          Symbol('foo'),
          undefined,
          null,
        ],
        Symbol('foo'),
        undefined,
        null,
      ],
    ];
    const result = input.map(encode);
    expect(result).toStrictEqual([
      'null',
      'null',
      'null',
      'null',
      '2',
      '"foo"',
      'true',
      'true',
      'null',
      'null',
      'null',
      '{"foo":"bar"}',
      '[1,3,true]',
      '1995-12-16T14:24:00.000Z',
      '["a",3,null,["a",3,null,[],null,null,null],null,null,null]',
    ]);
  });
});
