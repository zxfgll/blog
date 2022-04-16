/**
 * Map相对于对象的优点：
 * 1. 可用for of遍历
 * 2. 可用forEach遍历
 * 3. Map不会遇到原型链上的属性
 * 4. 对象的属性值是String或Symbol ,Map可以为任何值
 * 5. Obj需要手动计算个数，Map可以用size
 */


// #region snippet
function map_array_use() {
    let kvArray = [["key1", "value1"], ["key2", "value2"]];
    const m_map = new Map(kvArray);
    console.log(m_map.get("key1"));

    // 使用Array.from函数可以将一个Map对象转换成一个二维键值对数组
    console.log(Array.from(m_map)); // 输出和kvArray相同的数组

    // 更简洁的方法来做如上同样的事情，使用展开运算符
    console.log([...m_map]);

    // 只获取键
    console.log(Array.from(m_map.keys()));
}
// #endregion snippet

function clone(){
    const origin = new Map([
        [1,"one"]
    ])
    const clone = new Map(origin);
    console.log(clone.get(1));
    console.log(origin === clone);

}

function merge(){
    let first = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
      ]);
      
      let second = new Map([
        [1, 'uno'],
        [2, 'dos']
      ]);

      const new_map = new Map([...first , ...second , [3,"array"]]);
      for(let i of new_map){
        console.log(i)
      }
}



(function main() {
    // map_array_use();
    // clone();
    merge();
}())
