<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" class="content" label-width="110px">
    <div 
      v-for="(todo, index) in form.todoItems" 
      :key="index"
    >
      <el-form-item 
        :label="'待办内容' + (index + 1)" 
        :prop="'todoItems.' + index + '.content'"
        :rules="[
          { required: true, message: '请输入待办内容', trigger: 'blur' }
        ]"
      >
        <el-input 
          v-model="todo.content" 
          type="textarea"
          maxlength="1000"
          :autosize="{ minRows: 2, maxRows: 4}"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <!-- <el-form-item label="待办类型">
        <el-radio-group v-model="todo.type">
          <el-radio :label="1">日</el-radio>
          <el-radio :label="2">周</el-radio>
          <el-radio :label="3">月</el-radio>
          <el-radio :label="4">年</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item 
        label="计划完成时间" 
        :prop="'todoItems.' + index + '.expectTime'"
        :rules="{ 
          required: true, message: '请选择完成时间', trigger: 'change' 
        }"  
      >
        <el-time-picker
          v-model="todo.expectTime"
          format="HH:mm"
          placeholder="选择时间"
        >
        </el-time-picker>
      </el-form-item>    
    </div>
    <el-form-item>
      <el-button @click="addMore">继续新增</el-button>
      <el-button @click="submit">完成</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
        currentTime: new Date(),
      form: {
        todoItems: [
          {
            content: '',
            type: 1,
            expectTime: ''
          }
        ]
      },
      validateRules: {
        content: [
          { required: true, message: '请输入待办内容', trigger: 'blur' },
          { max: 1000, message: '长度在 1000 个字符', trigger: 'blur' }
        ],
        expectTime: [
          { required: true, message: '请选择完成日期', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    addMore() {
      this.form.todoItems.push({
        content: '',
        type: 1,
        expectTime: ''
      })
    },
    submit() {
      this.$refs['form'].validate( valid => {
        if (valid) {
          this.$http.post('/todos', this.form)
            .then(() => {
              this.$message.success('添加成功')
              this.$router.go(-1)
            }).catch(err => {
              if (err.response) {
                this.$message.error(err.response.data)
              }
            })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  .content {
    width: 100%;
    min-width: 350px;
    max-width: 600px;
    .el-textarea .el-input__count {
      line-height: normal;
    }
  }
}
</style>