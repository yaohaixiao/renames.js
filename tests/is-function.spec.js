import isFunction from '@/lib/utils/is-function.js';

function emptyFunction() {}
const emptyArrowFunction = () => {};

describe('isFunction() 方法：', () => {
  it('isFunction(function emptyFunction(){})，返回：true', () => {
    expect(isFunction(emptyFunction)).toBe(true);
  });

  it('isFunction(() => {})，返回：true', () => {
    expect(isFunction(emptyArrowFunction)).toBe(true);
  });

  it('isFunction(new Function())，返回：true', () => {
    const emptyInstance = new Function();
    expect(isFunction(emptyInstance)).toBe(true);
  });

  it('isFunction(parseInt)，返回：true', () => {
    expect(isFunction(Number.parseInt)).toBe(true);
  });

  it('isFunction(Array)，返回：true', () => {
    expect(isFunction(Array)).toBe(true);
  });

  it('isFunction(Boolean)，返回：true', () => {
    expect(isFunction(Boolean)).toBe(true);
  });

  it('isFunction(Date)，返回：true', () => {
    expect(isFunction(Date)).toBe(true);
  });

  it('isFunction(Number)，返回：true', () => {
    expect(isFunction(Number)).toBe(true);
  });

  it('isFunction(Object)，返回：true', () => {
    expect(isFunction(Object)).toBe(true);
  });

  it('isFunction(RegExp)，返回：true', () => {
    expect(isFunction(RegExp)).toBe(true);
  });

  it('isFunction(String)，返回：true', () => {
    expect(isFunction(String)).toBe(true);
  });

  it('isFunction(Math)，返回：false', () => {
    expect(isFunction(Math)).toBe(false);
  });

  it('isFunction(console)，返回：false', () => {
    expect(isFunction(console)).toBe(false);
  });

  it('isFunction(null)，返回：false', () => {
    expect(isFunction(null)).toBe(false);
  });
});
