<template>
<div class="container">
    <el-form ref="form" label-width="100px" :v-model="form" :inline="inline">
        <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
            <el-input v-if="item.type === 'input'" :placeholder="'请输入' + item.label" v-model="formData[item.model]" style="margin-top:20px">

            </el-input>
            <el-switch v-if="item.type === 'switch'" v-model="formData[item.model]"> </el-switch>
            <el-date-picker v-if="item.type === 'date'" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"  v-model="formData[item.model]">

            </el-date-picker>
            <el-select  v-if="item.type === 'select'" placeholder="请选择" v-model="formData[item.model]" value="">
                    <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value" >
                    </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
                <slot></slot>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    name: 'CommoForm',
    props: {
        formLabel: Array,
        form: Object,
        inline: Boolean
    },
    data() {
        return {
            formData:this.form
        }
    },

}
</script>

<style lang="less" scoped>

</style>