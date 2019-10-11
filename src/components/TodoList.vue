<template>
  <div>
    <el-row
      type="flex"
      justify="center"
    >
      <el-button @click="$emit('add-todo')">新增待办项</el-button>
    </el-row>
    <el-collapse v-model="collapseNames">
      <el-collapse-item
        title="待处理"
        name="1"
      >
        <TodoListUndone />
      </el-collapse-item>
      <el-collapse-item
        title="已完成"
        name="2"
      >
        <div
          v-for="(item, index) in todosData.done"
          :key="item._id"
        >{{index+1}}、{{item.content}}</div>
      </el-collapse-item>
      <el-collapse-item
        title="已放弃"
        name="3"
      >
        <div
          v-for="(item, index) in todosData.forgone"
          :key="item._id"
        >{{index+1}}、{{item.content}}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import TodoListUndone from '../components/TodoListUndone'
import { mapState } from 'vuex'

export default {
  components: {
    TodoListUndone
  },
  data() {
    return {
      collapseNames: ['1']
    }
  },
  computed: {
    ...mapState(['todosData'])
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
