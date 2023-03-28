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
            height:randomHeight,
            path:'/details/1',
            pramas:'&*FSFIDS*(&*=dsfkjs'
        }
        data.push(item)
    }
    return data;
})

Mock.mock(/\/recommend/,'get',()=>{
    return [
        {
            id:1,
            title:'全站',
            path:'/home/tags'
        },{
            id:2,
            title:'直播',
            path:'/home/live'
        },{
            id:3,
            title:'法律',
            path:'/home/laws'
        },{
            id:4,
            title:'美食',
            path:'/home/delicacies'
        },{
            id:5,
            title:'旅行',
            path:'/home/travel'
        },{
            id:6,
            title:'旅行',
            path:'/home?1'
        },{
            id:7,
            title:'旅行',
            path:'/home?2'
        }
    ]
})


Mock.mock(/\/login/,'post',(e) => {
    // console.log(e.body)
    return {
        msg:'登录成功...',
        code:200,
        token:'fsdifowenfo'
    }
})


Mock.mock(/\/register/,'post',(e) => {
    // console.log(e)
    return {
        code:300,
        msg:'注册成功'
    }
})

Mock.mock(/\/getuser/,'get',(e)=>{
    return {
        account:454654541,
        avatarImg:'https://tse1-mm.cn.bing.net/th/id/OIP-C.qebt1PBL2zYXGXsHVMPTXAAAAA?w=210&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        username:'普通用户FIN',
        energy:300,
        concern:5,
        collection:10,
        recent:50
    }
})

Mock.mock(/\/indexOfRecommend/,'get',(e)=>{
    const data = [];
    for(let i = 0;i < 10;i++){
        let item = {
            id:i,
            title:Random.csentence(5,30),
            authorName:Random.name(),
            tag:Random.csentence(3,5),
            aritcle:Random.csentence(20,40),
            likes:Math.floor(Math.random()*501),
            collection:Math.floor(Math.random()*501),
            path:'/details/1',
            pramas:'sdfewofko'
        }
        data.push(item)
    }
    return data;
})
