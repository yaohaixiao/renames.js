import padStart from '@/lib/utils/pad-start.js';

describe('padStart() 方法：', () => {
  it(`padStart(1)，返回：' 1'`, () => {
    expect(padStart(1)).toEqual(' 1');
  });

  it(`padStart('1', '0')，返回：'01'`, () => {
    expect(padStart('1', '0')).toEqual('01');
  });

  it(`padStart(1, '0')，返回：'01'`, () => {
    expect(padStart(1, '0')).toEqual('01');
  });

  it(`padStart(1, 3, '0')，返回：'001'`, () => {
    expect(padStart(1, 3, '0')).toEqual('001');
  });

  it(`padStart(1, 3, '')，返回：'1'`, () => {
    expect(padStart(1, 3, '')).toEqual('1');
  });

  it(`padStart(128, 2, '0')，返回：'128'`, () => {
    expect(padStart(128, 2, '0')).toEqual('128');
  });
});
