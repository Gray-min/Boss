const mongoose = require('mongoose')

//连接
// mongoose.connect('mongodb://localhost/test', { useUnifiedTopology: true })
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

//模型
const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: Number, required: true },
  hobbits: { type: String, required: true }
})

//发布模型
const Student = mongoose.model('Student', StudentSchema)

//Student.insertMany([{ name: "张三", age: 18, gender: 0, hobbits: "吃饭、睡觉" }, { name: "里斯", age: 19, gender: 0, hobbits: "吃饭、睡觉" }, { name: "王五", age: 120, gender: 0, hobbits: "吃饭、睡觉、嘤嘤嘤" }])

//查询
findAll = (callback) => {
  Student.find((err, docs) => err ? console.log(err) : callback(null, docs))
}

//添加
save = (student, callback) => {
  Student.insertMany(student, (err, docs) => err ? console.log(err) : callback(null))
}

//删除
del = (id, callback) => {
  Student.findByIdAndRemove(id, (err, docs) => err ? console.log(err) : callback(null))
}
//根据id查询
findById = (id, callback) => {
  Student.findById(id, (err, docs) => err ? console.log(err) : callback(null, docs))
}
//编辑
update = (student, callback) => {
  Student.findByIdAndUpdate(student.id, student, (err, docs) => err ? console.log(err) : callback(null))
}

module.exports = {
  findAll, save, del, findById, update
}