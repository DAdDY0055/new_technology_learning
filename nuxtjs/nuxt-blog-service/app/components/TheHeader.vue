<template>
  <el-menu mode="horizontal" :router="true">
    <el-menu-item index="1" style="pointer-events:none;">
      Nuxt Diary App
    </el-menu-item>
    <el-menu-item index="2" :route="{ path: '/posts/' }">
      投稿一覧
    </el-menu-item>

    <no-ssr>
      <el-menu-item index="4" style="floot: right;" :route="{ path: '/' }">
        <span>ログイン</span>
      </el-menu-item>
    </no-ssr>
    <el-menu-item index="5" style="floot: rigth" :route="{ path: '/post/new' }">
      新規投稿
    </el-menu-item>
  </el-menu>
</template>
