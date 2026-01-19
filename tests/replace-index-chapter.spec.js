import replaceIndexChapter from '@/lib/utils/replace-index-chapter.js';

const FILE_NAME = 'S1E1-火影忍者.mp4';
const chapter = (filename) => {
  const name = filename.replace(/-(.*)/g, '');
  const index = name.replace(/(.*)E/g, '');
  const number = Number(index);

  return {
    name: `${name}-`,
    index,
    number,
  };
};

describe('replaceIndexChapter() 方法：', () => {
  it(`replaceIndexChapter('${FILE_NAME}'), 返回：'S1E1-火影忍者'`, () => {
    expect(replaceIndexChapter(FILE_NAME)).toBe('S1E1-火影忍者');
  });

  it(`replaceIndexChapter('${FILE_NAME}', {name: 'S1E1-', index: 1, number: 1}), 返回：'第01集：火影忍者'`, () => {
    expect(
      replaceIndexChapter(FILE_NAME, { name: 'S1E1-', index: '1', number: 1 }),
    ).toBe('第01集：火影忍者');
  });

  it(`replaceIndexChapter('${FILE_NAME}', {name: 'S1E1-', index: 1, number: 1}, false), 返回：'${FILE_NAME}'`, () => {
    expect(
      replaceIndexChapter(
        FILE_NAME,
        { name: 'S1E1-', index: '1', number: 1 },
        false,
      ),
    ).toBe('第1集：火影忍者');
  });

  it(`replaceIndexChapter('${FILE_NAME}', ${chapter}), 返回：'第01集：火影忍者'`, () => {
    expect(replaceIndexChapter(FILE_NAME, chapter)).toBe('第01集：火影忍者');
  });
});
