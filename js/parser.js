const fs = require('fs')

try {
  let file = fs.readFileSync('../json/city.list.json', 'utf-8')
  let json = JSON.parse(file)
  let newJson = new Array
  let count = 0 
  for (let i = 0; i < json.length; i++) {
    let cur = json[i]
    if(cur.country == 'RU'){
      let obj = {
          "id": cur.id,
          "name": cur.name,
      }
      newJson.push(obj)
    }
  }
    fs.writeFileSync('../json/cities.json', JSON.stringify(newJson))
  console.log("Файл успешно записан!")
} catch (err) {
  return console.error(err)
}
