<template>
  <div>
    <el-tabs
      v-model="activeTab"
      type="border-card"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.value"
        :label="tab.label"
        :name="tab.value"
      >
        <TodoList
          @add-todo="addTodo"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TodoList from '../components/TodoList'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    TodoList
  },
  data() {
    return {
      tabs: [
        {
          value: "1",
          label: "今日待办"
        }
        // {
        //   value: "2",
        //   label: "周"
        // },
        // {
        //   value: "3",
        //   label: "月"
        // },
        // {
        //   value: "4",
        //   label: "年"
        // }
      ],
      activeTab: "1",
      collapseNames: ["1"],
    }
  },
  computed: {
    ...mapState(["todosData"])
  },
  created() {
    this.getTodosData()
  },
  methods: {
    ...mapActions([
      'getTodosData'
    ]),

    // 前往新增待办项页面
    addTodo() {
      this.$router.push("/add")
    },
    
  }
}
</script>

<style lang="scss" scoped>

</style>
