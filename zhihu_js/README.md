- 依赖包，项目运行异常时使用
    npm i stylus 
    npm i vue-router
    npm i lib-flexible
    npm i pinia
    npm i mockjs
    npm i axios
    npm i better-scroll
    npm i lodash
    npm i js-md5
    npm i vant 

- 开发避坑
    rem失效，发现是flexible库在一些屏幕会将根节点font-size大小设置为54而非屏幕宽度的百分之10

    如果click失效的话，检查下是不是touch事件导致的

    foreach 不要直接return true

    store 传出的响应式数据直接用proxy的,用对象内的不会同步
    
