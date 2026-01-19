import padZero from '@/lib/utils/pad-zero.js';

describe('padZero() 方法：', () => {
  it(`padZero(1)，返回：'01'`, () => {
    expect(padZero(1)).toEqual('01');
  });

  it(`padZero("1")，返回：'01'`, () => {
    expect(padZero('1')).toEqual('01');
  });

  it(`padZero(1, 0)，返回：'1'`, () => {
    expect(padZero(1, 0)).toEqual('1');
  });
});
