- 开发避坑
    rem失效，发现是flexible库在一些屏幕会将根节点font-size大小设置为54而非屏幕宽度的百分之10

    如果click失效的话，检查下是不是touch事件导致的

    foreach 不要直接return true

    当store的简单数据为数组时，需要使用数组(vue封装后)的方法来修改原数组，否则不会重新渲染模板
    
