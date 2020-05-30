<template>
  <section class="container">
    <el-card style="flex: 1">
      <div slot="header" class="clearfix">
        <span>ログイン</span>
      </div>
      <form>
        <div class="form-content">
          <span>ユーザー　ID</span>
          <el-input placeholder="" v-model="formData.id" />
        </div>
        <div class="form-content">
          <el-checkbox v-model="isCreateModel">アカウントを作成する</el-checkbox>
        </div>
        <div class="text-right">
          <el-button type="primary">{{buttonText}}</el-button>
        </div>
      </form>
    </el-card>
  </section>
</template>

<script>
export default {
  asyncData() {
    return {
      isCreateModel: false,
      formData: {
        id: ''
      }
    }
  },
  computed: {
    buttonText() {
      return this.isCreateModel ? '新規登録' : 'ログイン'
    }
  }
}
</script>

<style scoped>
.form-content {
  margin: 16px 0;
}
</style>
