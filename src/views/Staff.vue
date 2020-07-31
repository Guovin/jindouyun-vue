<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">Add</a-button>
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
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to save?"
          @confirm="() => onSave(record.key)"
        >
          <a href="javascript:;" id="save">Save</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
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
    this.$axios({
      method: 'get',
      url: '/selectStaff',
    })
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
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter((item) => item.key !== key)
      this.$axios({
        method: 'post',
        url: '/deleteStaff',
        data: {
          id: key,
        },
      })
        .then(function(response) {
          if (response.data == 200) {
            console.log('删除成功！')
          } else {
            console.log('出错！')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onSave(key) {
      const dataSource = [...this.dataSource].filter((item) => item.key == key)
      this.$axios({
        method: 'post',
        url: '/updateStaff',
        data: {
          id: key,
          name: dataSource[0].name,
          age: dataSource[0].age,
          address: dataSource[0].address,
        },
      })
        .then(function(response) {
          if (response.data == 201) {
            console.log('保存成功！')
          } else {
            console.log('出错！')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleAdd() {
      const { count, dataSource } = this
      const newData = {
        key: count + 1,
        id: count + 1,
        name: `Edward King ${count + 1}`,
        age: '32',
        address: `London, Park Lane no. ${count + 1}`,
      }
      this.dataSource = [...dataSource, newData]
      this.count = count + 1
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

#save {
  margin-left: 10%;
}
</style>
