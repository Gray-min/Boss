const fs = require('fs')

//文件地址
const dbPath = './db.json'

//获取所有数据
findAll = (callback) =>
  fs.readFile(dbPath, 'utf8', (err, data) =>
    err ? callback(err) : callback(null, JSON.parse(data).students)
  )

//添加
save = (student, callback) =>
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err)
      callback(err)
    else {
      console.log(student)
      const students = JSON.parse(data).students
      student.id = students[students.length - 1].id + 1
      students.push(student)
      fs.writeFile(dbPath, JSON.stringify({ students }), (err) => err ? callback(err) : callback(null))
    }
  }
  )
//删除
del = (id, callback) =>
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err)
      callback(err)
    else {
      const students = JSON.parse(data).students
      // console.log(students.findIndex((item) => item.id * 1 === id * 1).id)
      students.splice(students.findIndex((item) => item.id * 1 === id * 1), 1)
      fs.writeFile(dbPath, JSON.stringify({ students }), (err) => err ? callback(err) : callback(null))
    }
  }
  )

//根据id查询
findById = (id, callback) =>
  fs.readFile(dbPath, 'utf8', (err, data) =>
    err ? callback(err) : callback(null, JSON.parse(data).students.find((item) => item.id * 1 === id * 1))
  )

//编辑
update = () => (student, callback) =>
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err)
      callback(err)
    else {
      const students = JSON.parse(data).students
      students.findIndex((item) => item.id * 1 === id * 1)
      students.splice(students.findIndex((item) => item.id * 1 === id * 1), 1, student)
      fs.writeFile(dbPath, JSON.stringify({ students }), (err) => err ? callback(err) : callback(null))
    }
  }
  )


module.exports = {
  findAll, save, del, findById, update
}