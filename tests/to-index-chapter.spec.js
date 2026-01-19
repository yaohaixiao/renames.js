import toIndexChapter from '@/lib/utils/to-index-chapter.js';

describe('toIndexChapter() 方法：', () => {
  it(`toIndexChapter(1), 返回：'第1集：'`, () => {
    expect(toIndexChapter(1)).toBe('第1集：');
  });

  it(`toIndexChapter('21'), 返回：'第21集：'`, () => {
    expect(toIndexChapter('21')).toBe('第21集：');
  });

  it(`toIndexChapter(1, true), 返回：'1'`, () => {
    expect(toIndexChapter(1, true)).toBe('1');
  });

  it(`toIndexChapter('21', true), 返回：'21'`, () => {
    expect(toIndexChapter('21', true)).toBe('21');
  });

  it(`toIndexChapter('21', false, { prefix:'', suffix:'话' }), 返回：'21话：'`, () => {
    expect(toIndexChapter('21', false, { prefix: '', suffix: '话' })).toBe(
      '21话：',
    );
  });

  it(`toIndexChapter('21', false, { suffix:'章', delimiter: '-' }), 返回：'第21章-'`, () => {
    expect(toIndexChapter('21', false, { suffix: '章', delimiter: '-' })).toBe(
      '第21章-',
    );
  });
});
