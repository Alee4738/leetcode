/*
Given a list of directory info including directory path, and all the files with contents in this directory, you need to find out all the groups of duplicate files in the file system in terms of their paths.

A group of duplicate files consists of at least two files that have exactly the same content.

A single directory info string in the input list has the following format:

"root/d1/d2/.../dm f1.txt(f1_content) f2.txt(f2_content) ... fn.txt(fn_content)"

It means there are n files (f1.txt, f2.txt ... fn.txt with content f1_content, f2_content ... fn_content, respectively) in directory root/d1/d2/.../dm. Note that n >= 1 and m >= 0. If m = 0, it means the directory is just the root directory.

The output is a list of group of duplicate file paths. For each group, it contains all the file paths of the files that have the same content. A file path is a string that has the following format:

"directory_path/file_name.txt"

Example 1:

Input:
["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)", "root/c/d 4.txt(efgh)", "root 4.txt(efgh)"]
Output:  
[["root/a/2.txt","root/c/d/4.txt","root/4.txt"],["root/a/1.txt","root/c/3.txt"]]
 */
/**
 * @param {string[]} paths
 * @return {string[][]}
 */
var findDuplicate = function(paths) {
  let content_map = {}; // map file content to list of directories
  
  paths.map(dir_info_str => {
    let dir_info = dir_info_str.split(" ");
    let path = dir_info.shift();
    
    dir_info.map(file_str => {
      let file_arr = file_str.split(/[()]/);
      let filename = file_arr[0];
      let content = file_arr[1];
      
      if (!content_map[content]) {
        content_map[content] = [];
      }
      
      content_map[content].push(path + "/" + filename);
    });
  });
  
  return Object.values(content_map).filter(list => list.length > 1);
};