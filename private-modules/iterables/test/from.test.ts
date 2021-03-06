/// <reference types="activex-scripting" />
/// <reference types="iterables" />
/// <reference path="./test.ts" />

namespace Iterables_from_test {
  const I = Iterables;
  declare const fso: Scripting.FileSystemObject;

  test('from(fso.GetFolder("..").SubFolders', () => {
    const folder = fso.GetFolder(
      fso.GetParentFolderName(WScript.ScriptFullName)
    );
    const path1 = fso.BuildPath(folder.Path, 'folder1');
    fso.CreateFolder(path1);
    try {
      const subfolder1 = fso.GetFolder(path1);
      const path2 = fso.BuildPath(folder.Path, 'folder2');
      fso.CreateFolder(path2);
      try {
        const subfolder2 = fso.GetFolder(path2);
        expect(I.from(folder.SubFolders)).toBe(I.of(subfolder1, subfolder2));
      } finally {
        fso.DeleteFolder(path2);
      }
    } finally {
      fso.DeleteFolder(path1);
    }
  });
}
