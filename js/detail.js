//正式
let url = "http://tinterest.lechuangtec.com";
// 预发
// var url = 'http://pre.zq.janesi.com'

// 加载提示
var load = document.createElement('div')
load.setAttribute('id', 'loading');
load.innerHTML = `
				<div class="load_left">正在加载</div>
				<div class="load_right">
					<img src="http://tinterest.lechuangtec.com/janesi-headline/ZQFL/img/ww.gif" alt="" />
				</div>
`;
//测试服
// let url="http://118.25.10.151:8090";
//李强
// let url="http://10.10.10.23:8090";
let body = document.documentElement ? document.documentElement : document.body;
let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};
let content=document.body.getAttribute('content')||document.documentElement.getAttribute('content');
let lastId='';
// let title='1';
// let userId='1347';
let userId=getRequest()['userId'];
let title=getRequest()['title'];

console.log(userId);
console.log(title);

//话题图片
mui.ajax(url+'/app/interest/talk_theme/theme_detail',{
    type: 'post',
    data:{
        'id': title,
    },
    headers: headers,
    dataType: "json",
    success:function (e) {
        console.log(e);
        document.getElementById('topImg').setAttribute('src',e.result.coverImage)
    }
});

//列表查询
mui.ajax(url+'/app/interest/talk_theme/content_list',{
    type: 'post',
    data:{
        'userId': userId,
        'topic': title
    },
    headers: headers,
    dataType: "json",
    success:function (e) {
        console.log(e);
        lastId=e.result.lastRead;
        liList(e);
    }
});

//上拉加载
$(window).scroll(function() {
    let scrollTop = $(this).scrollTop();      //滚动高度
    let scrollHeight = $(document).height();  //页面文档高度
    let windowHeight = $(this).height();      //窗口高度
    if(scrollTop + windowHeight >= scrollHeight) {
        document.getElementById('newList').appendChild(load);
        mui.ajax(url + '/app/interest/talk_theme/content_list', {
            type: 'post',
            data: {
                'lastId': lastId,
                'userId': userId,
                'topic': title
            },
            headers: headers,
            dataType: 'json',
            success: function(e) {
                console.log(e);
                if(e.result.contents.length>'0'){
                    lastId=e.result.lastRead;
                    document.getElementById('newList').removeChild(load);
                    liList(e);
                }else{
                    load.innerHTML='没有更多了'
                }
            }
        })
    }
});

mui.plusReady(
    //关注
    mui('.midList').on('tap','.mid_Top_right',function () {
        let authorId = this.getAttribute('authorId')
        let flag = eval(this.getAttribute('flag'));
        if(flag){
            mui.ajax(url + '/app/interest/talk_theme/fans_author', {
                type: 'post',
                data: {
                    'userId': userId,
                    'authorId': authorId
                },
                headers: headers,
                dataType: 'json',
                success: function(e) {
                    console.log(e);
                }
            });
            this.children[0].setAttribute('src','../img/has-been-focused-on@2x.png');
            this.setAttribute('flag', false);
            mui.toast('关注成功！');
        }else{
            mui.ajax(url + '/app/interest/talk_theme/not_fans_author', {
                type: 'post',
                data: {
                    'userId': userId,
                    'authorId': authorId
                },
                headers: headers,
                dataType: 'json',
                success: function(e) {
                    console.log(e);
                }
            });
            this.children[0].setAttribute('src','../img/add-the-attention@2x.png');
            this.setAttribute('flag', true);
            mui.toast('已取消关注！');
        }
    }),
    //点赞
    mui('.midList').on('tap','.midBotHit',function () {
        let itemId = this.getAttribute('num');
        let flag = eval(this.getAttribute('flag'));
        if(flag){
            mui.ajax(url + '/app/interest/talk_theme/like_content', {
                type: 'post',
                data: {
                    'userId': userId,
                    'itemId': itemId
                },
                headers: headers,
                dataType: 'json',
                success: function(e) {
                    console.log(e);
                }
            });
            this.children[0].setAttribute('src','../img/-praised@2x.png');
            this.children[1].innerHTML='已赞';
            this.setAttribute('flag', false);
            mui.toast('点赞成功！');
        }else{
            mui.ajax(url + '/app/interest/talk_theme/cancel_like_content', {
                type: 'post',
                data: {
                    'userId': userId,
                    'itemId': itemId
                },
                headers: headers,
                dataType: 'json',
                success: function(e) {
                    console.log(e);
                }
            });
            this.children[0].setAttribute('src','../img/praise@2x.png');
            this.children[1].innerHTML='点赞';
            this.setAttribute('flag', true);
            mui.toast('已取消点赞！');
        }
    }),
    //评论
    mui('.midList').on('tap','.discuss',function () {
        let num=this.getAttribute('num');
        window.webkit.messageHandlers.iOSDiscuss.postMessage(num);
    }),
    //举报
    mui('.midList').on('tap','.report',function () {
        mui.toast("收到你的举报，我们将会对此内容进行审核！");
        // window.webkit.messageHandlers.iOSReport.postMessage('jubao');
    }),

);
