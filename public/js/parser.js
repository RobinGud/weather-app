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
          "name": cur.name,
          "id": cur.id
      }
      if (newJson.every((el) => el.name != obj.name)) {
        count++
      newJson.push(obj)
      }
    }
  }
    fs.writeFileSync('../json/cities.json', JSON.stringify(newJson))
  console.log(`Файл успешно записан! ${count} Объектов`)
} catch (err) {
  return console.error(err)
}
