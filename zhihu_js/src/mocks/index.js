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

Mock.mock(/\/recommend/,'get',()=>{  // 弃用
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
    let item1 = {
            id:0,
            title:'一个190斤，身高172的男生怎么减肥？',
            authorName:'哦哦哦ooo',
            tag:'',
            aritcle:'兄弟们，变瘦之后颜值立马提升500%，秒杀所有野草马仔！！太香了我减肥不需要撸铁撸到手冒火星子，更不用抗饿抗到眼冒金花，就抓住减肥降脂的命根使往下磨你就成功了什么双下巴、油腻肚、大粗腿所有的肥胖都于你无关，瘦下来之后才知道什么是颜值天堂！什么叫颜值即正义！！',
            likes:Math.floor(Math.random()*501),
            collection:Math.floor(Math.random()*501),
            path:'/details/1',
            pramas:'article0'
    }
    let item2 = {
            id:1,
            title:'2023年新手小白把虾皮跨境电商当副业/创业挣钱项目，还迟不迟？',
            authorName:'是捏',
            tag:'',
            aritcle:'经常有朋友咨询我，现在做跨境电商的话还晚不晚？肯定告诉答案：肯定是不晚的，新手小白也能把它当副业挣钱~在想这个问的时，各位回溯一下自己过往经历，有没有参与过空白市场，红利期大多是属于圈子内的人，在生活中经常有人吐槽如果几年前我做哪个行业今天就好起来了，难道今天做这个行业的没有成功登顶的嘛？虾皮跨境电商是新手小白可创业、可副业的，课程资料+实操教程点下方卡片领取学习就行~',
            likes:Math.floor(Math.random()*501),
            collection:Math.floor(Math.random()*501),
            path:'/details/1',
            pramas:'article1'
    }
    data.push(item1,item2)
    for(let i = 2;i < 10;i++){
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



Mock.mock(/\/getPathList/,'get',(e)=>{
    let data = {
        opened:[
            {
                id:0,
                path:'/tags',
                name:'全站'
            },
            {
                id:1,
                path:'/live',
                name:'直播'
            },
            {
                id:2,
                path:'/highpraise',
                name:'高赞'
            },
            {
                id:3,
                path:'/paternity',
                name:'亲子'
            },
            {
                id:4,
                path:'/film',
                name:'影视'
            },
            {
                id:5,
                path:'/game',
                name:'游戏'
            },
            {
                id:6,
                path:'/workplace',
                name:'职场'
            },
            {
                id:7,
                path:'/car',
                name:'汽车'
            },
            {
                id:8,
                path:'/delicacies',
                name:'美食'
            },
            {
                id:9,
                path:'/law',
                name:'法律'
            },
            {
                id:10,
                path:'/anime',
                name:'动漫'
            }
        ],
        closed:[
            {
                id:11,
                path:'/esports',
                name:'电竞'
            },
            {
                id:12,
                path:'/healthy',
                name:'健康'
            },
            {
                id:13,
                path:'/plantgrass',
                name:'种草'
            },
            {
                id:14,
                path:'/psychology',
                name:'心理'
            },
            {
                id:15,
                path:'/amusement',
                name:'娱乐'
            },
            {
                id:16,
                path:'/knowledge',
                name:'知识'
            },
            {
                id:17,
                path:'/brainhole',
                name:'脑洞'
            },
            {
                id:18,
                path:'/school',
                name:'校园'
            },
            {
                id:19,
                path:'/tale',
                name:'故事'
            }
        ]
    }
    return data
})



Mock.mock(/\/ConcernList/,'get',(e)=>{
    let data = []
    for(let i = 1;i < 12;i++){
        let item = {
            id:i,
            name:Random.name(),
            section:Random.csentence(3,5),
            answer:Math.floor(Math.random()*50 + 50),
            concern:Math.floor(Math.random()*500 + 500),
            isConcerned:false
        }
        data.push(item)
    }
    return data;
})



Mock.mock(/\/Hots/,'get',(e)=>{
    let model = e.url.charAt(e.url.length - 1)
    let data = []
    let start = model * 15
    for(let i = start;i < start + 15;i++){
        let item = {
            id:i,
            aritcle:Random.csentence(20,60),
            hotnum:Math.floor(Math.random()*500 + 500)
        }
        data.push(item)
    }
    return data;
})

Mock.mock(/\/Hotwords/,'get',(e)=>{
    let data = [{
        content:'家长打孩子',
        ishot:true
    }]
    for(let i = 0;i < 15;i++){
        let ishotvalue = Math.random() > 0.9
        let item = {
            content:Random.csentence(5,18),
            ishot:ishotvalue
        }
        data.push(item)
    }
    return data;
})


Mock.mock(/\/Searchwords/,'get',(e)=>{
    let index = e.url.indexOf('?words=')
    let params = e.url.substring(index + 7)
    if(/家长.*/.test(params)){
        let data = [{
            id:0,
            content:'家长对孩子的评价',
        }]
        for(let i = 1;i < 10;i++){
            let item = {
                id:i,
                content:params + Random.csentence(3,6)
            }
            data.push(item)
        }
        return data;
    }else{
        return []
    }
})


Mock.mock(/\/searchdetail/,'get',(e)=>{
    return [
        {
            id:0,
            value:'综合',
            pramas:'zonghe'
        },{
            id:1,
            value:'实时',
            pramas:'shishi'
        },{
            id:2,
            value:'用户',
            pramas:'user'
        },{
            id:3,
            value:'视频',
            pramas:'video'
        },{
            id:4,
            value:'学术',
            pramas:'xueshu'
        },{
            id:5,
            value:'盐选内容',
            pramas:'yanxuan'
        },{
            id:6,
            value:'电子书',
            pramas:'ebooks'
        },{
            id:7,
            value:'话题',
            pramas:'huati'
        },{
            id:8,
            value:'专栏',
            pramas:'zhuanlan'
        }
    ]
})