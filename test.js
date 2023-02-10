// const rl = require('readline').createInterface({
// 	input: process.stdin,
// 	output: process.stdout
// })
// rl.on('line', input => {
// 	console.log(`接收到${input}`);
// 	if (input === 'p')
// 		rl.close()
// })

const qc = arr => {
	/* 方式一 :双重for循环+splice() */
	// for (let i = 0; i < arr.length; ++i)
	// 	for (let j = i + 1; j < arr.length; ++j)
	// 		if (arr[i] === arr[j]) {
	// 			arr.splice(j, 1)
	// 				--j
	// 				--i
	// 		}
	// return arr

	/* 方式二 :indexOf()*/
	// let t = []
	// for (let i = 0; i < arr.length; ++i) {
	// 	if (t.indexOf(arr[i]) === -1) {
	// 		t.unshift(arr[i])
	// 	}
	// }
	// return t

	/* 方式三：includes() */
	// let t = []
	// for (let i = 0; i < arr.length; ++i)
	// 	if (!t.includes(arr[i]))
	// 		t.push(arr[i])
	// return t

	/* 方式四:filter() */
	// return arr.filter((item, idx) => arr.indexOf(item) === idx)

	/* 方式五：from()+new Set() */
	// arr = Array.from(new Set(arr))
	// return arr

	let t = {}
	arr = arr.reduce((item, next) => {
		t[next.key] ? '' : t[next.key] = true && item.push(next)
		return item
	}, [])
	return arr
}

/* 
	封装数组对象根据关键词去重方法
 */
const myDelDuplicates = function(tagArr, key) {
	let t = {}
	tagArr = tagArr.reduce((item, next) => {
		t[next[key]] ? '' : t[next[key]] = true && item.push(next)
		return item
	}, [])
	return tagArr
}

// let arr = ['w', 'c', 'c', 'apple', 'c', 'w', 'banana']
let arr = [{
	id: 's01',
	key: 'w'
}, {
	id: 's02',
	key: 'c'
}, {
	id: 's03',
	key: 'c'
}, {
	id: 's04',
	key: 'apple'
}]
// arr = qc(arr)
// console.log(arr);

arr = myDelDuplicates(arr, 'key')
console.log(arr);
