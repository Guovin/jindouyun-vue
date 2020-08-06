<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">Add</a-button>
    <a-popconfirm
      v-if="dataSource.length"
      title="您确定要保存所有记录吗?"
      ok-text="是"
      cancel-text="否"
      @confirm="() => handleSave()"
    >
      <a-icon slot="icon" type="question-circle-o" style="color: red" />
      <a-button class="editable-save-btn">Save</a-button>
    </a-popconfirm>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template slot="name" slot-scope="text, record">
        <editable-cell
          :text="text"
          @change="onCellChange(record.key, 'name', $event)"
        />
      </template>
      <template slot="age" slot-scope="text, record">
        <editable-cell
          :text="text"
          @change="onCellChange(record.key, 'age', $event)"
        />
      </template>
      <template slot="address" slot-scope="text, record">
        <editable-cell
          :text="text"
          @change="onCellChange(record.key, 'address', $event)"
        />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="您确定要删除此条记录吗?"
          ok-text="是"
          cancel-text="否"
          @confirm="() => onDelete(record.key)"
        >
          <a-icon slot="icon" type="question-circle-o" style="color: red" />
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
        <a-popconfirm
          v-if="dataSource.length"
          title="您确定要保存此条记录吗?"
          ok-text="是"
          cancel-text="否"
          @confirm="() => onSave(record.key)"
        >
          <a-icon slot="icon" type="question-circle-o" style="color: red" />
          <a href="javascript:;" id="save">Save</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
import { getStaff, deleteStaff, updateStaff, saveStaff } from '@/api/staff'
const EditableCell = {
  template: `
      <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper">
          <a-input :value="value" @change="handleChange" @pressEnter="check" /><a-icon
            type="check"
            class="editable-cell-icon-check"
            @click="check"
          />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ value || ' ' }}
          <a-icon type="edit" class="editable-cell-icon" @click="edit" />
        </div>
      </div>
    `,
  props: {
    text: String,
  },
  data() {
    return {
      value: this.text,
      editable: false,
    }
  },
  methods: {
    handleChange(e) {
      const value = e.target.value
      this.value = value
    },
    check() {
      this.editable = false
      this.$emit('change', this.value)
    },
    edit() {
      this.editable = true
    },
  },
}
export default {
  components: {
    EditableCell,
  },
  data() {
    var source = []
    var newcount = 0
    let that = this
    getStaff()
      .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
          let s = {
            key: response.data[i].ID,
            id: response.data[i].ID,
            name: response.data[i].Name,
            age: response.data[i].Age,
            address: response.data[i].Address,
          }
          source.push(s)
          newcount = newcount + 1
        }
        that.count = newcount
      })
      .catch((error) => {
        console.log(error)
      })
    return {
      dataSource: source,
      count: newcount,
      columns: [
        {
          title: 'id',
          dataIndex: 'id',
        },
        {
          title: 'name',
          dataIndex: 'name',
          width: '30%',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'age',
          dataIndex: 'age',
          scopedSlots: { customRender: 'age' },
        },
        {
          title: 'address',
          dataIndex: 'address',
          scopedSlots: { customRender: 'address' },
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          width: '15%',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find((item) => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },
    onDelete(key) {
      this.$message.loading('删除中...')
      const dataSource = [...this.dataSource]
      const { count } = this
      this.dataSource = dataSource.filter((item) => item.key !== key)
      let that = this
      deleteStaff(key)
        .then(function(response) {
          if (response.data == 200) {
            that.$message.success('删除成功')
            that.count = count - 1
          } else {
            that.$message.error('删除失败')
          }
        })
        .catch((error) => {
          console.log(error)
          that.$message.error('删除失败')
        })
    },
    onSave(key) {
      const dataSource = [...this.dataSource].filter((item) => item.key == key)
      this.$message.loading('保存中...')
      let that = this
      updateStaff(
        key,
        dataSource[0].name,
        dataSource[0].age,
        dataSource[0].address
      )
        .then(function(response) {
          if (response.data == 201) {
            that.$message.success('保存成功')
          } else {
            that.$message.error('保存失败')
          }
        })
        .catch((error) => {
          console.log(error)
          that.$message.error('保存失败')
        })
    },
    handleAdd() {
      const { count, dataSource } = this
      const newData = {
        key: `${count + 1}`,
        id: `${count + 1}`,
        name: `Edward King ${count + 1}`,
        age: '32',
        address: `London, Park Lane no. ${count + 1}`,
      }
      this.dataSource = [...dataSource, newData]
      this.count = count + 1
    },
    handleSave() {
      const { dataSource } = this
      let that = this
      this.$message.loading('保存中...')
      saveStaff(dataSource)
        .then(function(response) {
          if (response.data == 201) {
            that.$message.success('保存成功')
          } else {
            that.$message.error('保存失败')
          }
        })
        .catch((error) => {
          console.log(error)
          that.$message.error('保存失败')
        })
    },
  },
}
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}

.editable-save-btn {
  margin-bottom: 8px;
  margin-left: 92.7%;
}

#save {
  margin-left: 10%;
}
</style>
