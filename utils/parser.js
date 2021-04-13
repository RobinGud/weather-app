const fs = require('fs')
const path = require('path')

try {
  let file = fs.readFileSync(path.join(__dirname ,'..', 'data', 'city.list.json'), 'utf-8')
  let json = JSON.parse(file)
  let newJson = new Array
  let count = 0 
  for (cur of json) {
    if(cur.country == 'RU' && count < 1000){
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
    fs.writeFileSync(path.join(__dirname,'..', 'data', 'cities.json'), JSON.stringify(newJson))
  console.log(`Файл успешно записан! ${count} Объектов`)
} catch (err) {
  return console.error(err)
}
