<template>
  <div class="wrapper">
    <el-form
    ref="form"
    :model="todo"
    :rules="validateRules"
    label-width="110px"
    class="content"
  >
    <el-form-item
      label="待办内容"
      prop="content"
    >
      <el-input
        type="textarea"
        v-model="todo.content"
        autosize
      ></el-input>
    </el-form-item>
    <!-- <el-form-item label="待办类型">
      <el-radio-group v-model="todo.type">
        <el-radio v-for="type in typeOptions" :key="type.label" :label="type.label" :disabled="todo.type !== type.label">
          {{ type.value }}
        </el-radio>
      </el-radio-group>
    </el-form-item>-->
    <el-form-item
      label="计划完成时间"
      prop="expectTime"
    >
      <el-time-picker
          v-model="todo.expectTime"
          format="HH:mm"
          placeholder="选择时间"
        >
        </el-time-picker>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit">完成</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: {
        content: "",
        type: 1,
        expectTime: ""
      },
      typeOptions: [
        {
          label: 1,
          value: "日"
        },
        {
          label: 2,
          value: "周"
        },
        {
          label: 3,
          value: "月"
        },
        {
          label: 4,
          value: "年"
        }
      ],
      validateRules: {
        content: [
          { required: true, message: "请输入待办内容", trigger: "blur" },
          { max: 1000, message: "长度在 1000 个字符", trigger: "blur" }
        ],
        expectTime: [
          { required: true, message: "请选择完成日期", trigger: "change" }
        ]
      }
    }
  },
  created() {
    this.todo = this.$route.params.todo
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$http
            .patch(`/todos/${this.todo._id}`, {
              content: this.todo.content,
              expectTime: this.todo.expectTime
            })
            .then(() => {
              this.$message.success("修改成功")
              this.$router.go(-1)
            })
            .catch(err => {
              if (err.response) {
                this.$message.error(err.response.data)
              }
            })
        }
      })
    }
  }
}
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
  }
}
</style>