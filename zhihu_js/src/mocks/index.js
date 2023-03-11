import Mock,{ Random } from 'mockjs'
// 拦截axios发出的请求
Mock.mock(/\/Ideas/,'get',()=>{
    // console.log('jjjjj')
    const data = [];
    const maxNum = 400;
    const minNum = 100;
    for(let i = 0;i < 20;i++){
        let randomHeight = parseInt(
            Math.random()*(maxNum - minNum + 1) + minNum
        )
        let item = {
            id:i,
            title:Random.csentence(5,30),
            pic:Random.image(`180x${randomHeight}`,'#FF6600'),
            avatarImg:Random.image('22x22','blue'),
            authorName:Random.name(),
            likes:Math.floor(Math.random()*1002 + 1),
            tags:[
                (Math.random() > 0.5)?{id:1,tag:Random.csentence(2,4)}:'',
                (Math.random() > 0.5)?{id:2,tag:Random.csentence(2,4)}:''
            ],
            height:randomHeight
        }
        data.push(item)
    }
    return data;
})

