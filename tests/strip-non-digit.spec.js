import stripNonDigit from '@/lib/utils/strip-non-digit.js';

describe('stripNonDigit() 方法：', () => {
  it(`stripNonDigit(1)，返回：''`, () => {
    expect(stripNonDigit(1)).toEqual('');
  });

  it(`stripNonDigit('第1集：')，返回：'1'`, () => {
    expect(stripNonDigit('第1集：')).toEqual('1');
  });

  it(`stripNonDigit('第1集：我的第1天')，返回：'11'`, () => {
    expect(stripNonDigit('第1集：我的第1天')).toEqual('11');
  });
});
