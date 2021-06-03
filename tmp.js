const fs = require('fs')

const data = fs.readFileSync('db/db.json')

const d = JSON.parse(data)
const _data = {
}

for(let i=0; i<d.length; i++){
    // console.log(d[i].city)
    const v = d[i].city
    _data[v] = null
}

const dj = JSON.stringify(_data)

fs.writeFileSync('db/res.json', dj)