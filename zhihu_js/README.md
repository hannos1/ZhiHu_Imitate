- 依赖包
    npm i
    npm i stylus 
    <!-- npm i element3 删除 -->
    npm i vue-router
    npm i lib-flexible
    npm i pinia
    npm i mockjs
    npm i axios
    npm i better-scroll
    npm i lodash


- 开发避坑
    rem失效，发现是flexible库在一些屏幕会将根节点font-size大小设置为54而非屏幕宽度的百分之10

    一开始以为使用二级路由就能解决所有需求，实际开发发现需要三级路由




//     const sleep = (t) => {
//     return new Promise((resolve,reject) => {
//       setTimeout(() => {
//         resolve(t)
//       },t)
//     })
//   }
  
//   const data = await Promise.all([sleep(4000),sleep(2000),sleep(1000)]);
