// https://stackoverflow.com/questions/12394166/how-do-i-run-git-rebase-interactive-in-non-interactive-manner

const fs = require('fs')

let data = fs.readFileSync(process.argv[2], {encoding:'utf8'})
//let data = fs.readFileSync(path.join(__dirname, 'temp.txt'), {encoding:'utf8'})
let arr = data.trim().split(/\r?\n/).filter(e=>e.trim().startsWith('pick'))
// let arr = data.trim().split(/\r?\n/).filter(e=>!e.trim().startsWith('#') && e.trim() !== '')

// Move last commit to first commit
arr.unshift(arr[arr.length-1])
arr[arr.length-1] = ''

// squash n commits at a time
let batch = 30
let count = 0

for(let i=1;i<arr.length-1;i++){

    if(/update currencies/i.test(arr[i]) && /update currencies/i.test(arr[i-1]) && ++count%batch!=0)
     arr[i] = arr[i].replace('pick', 'squash')

}


fs.writeFileSync(process.argv[2],arr.join('\n'))
//fs.writeFileSync(path.join(__dirname, 'temp2.txt'),arr.join('\n'))