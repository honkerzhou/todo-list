const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  content: {
    type: String,
    required: [true, '待办项内容不能为空'],
    maxlength: [1000, '待办项内容不能超过1000字符']
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  modifyTime: {
    type: Date,
    default: Date.now
  },
  expectTime: {
    type: Date,
    required: [true, '计划完成时间不能为空']
  },
  finishTime: {
    type: Date
  },
  type: {
    type: Number,
    default: 1 // 1日2周3月4年
  },
  status: {
    type: Number,
    default: 1 // 1未完成2已完成3已放弃
  },
  ownerId: {
    type: Schema.Types.ObjectId
  }
})

const TodoModel = mongoose.model('Todo', todoSchema)

module.exports = TodoModel
