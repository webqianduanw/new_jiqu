function didClickCell(cell) {
    console.log(this)
    // console.log(cell.target.getBoundingClientRect())
    var that = this
    var rect = that.getBoundingClientRect()
    var screenHeight = window.screen.height

    that.classList.contains('mui-active')?that.classList.remove('mui-active'):that.classList.add('mui-active')
    console.log(screenHeight)
    console.log(rect.height)
    console.log(rect.top,screenHeight-rect.height)

    if(rect.top > screenHeight-rect.height*2) {
        window.scrollTo(0,window.scrollY + screenHeight/2 + that.querySelector('.mui-collapse-content').getBoundingClientRect().height/2)
    }




    // var parent = cell.parentNode;
    // if (parent.id) {

    // }
    // var img = cell.childNodes[3].childNodes[5];
    // if (parent.className.match('mui-active')) {

    //     parent.classList.remove("mui-active");
    //     if (img) {
    //         img.src = '../icon/welfare_task_jiantou2@2x.png';
    //     }
    // } else {
    //     parent.classList.add("mui-active");
    //     if (img) {
    //         img.src = '../icon/welfare_task_jiantou@2x.png';
    //     }
    // }

    // var parentDiv = cell.parentNode;
    // parentDiv.scrollIntoView(true);
}

window.onload = function () {
    // 全局定义请求地址
    window.JanesiApi.reqUrl = requestUrl;
    reloadData();

}

window.JanesiBridge.commonNativeCallJS = function (res) {
    if (res.action == 'reloadData') {
        reloadData();
    }
}



// 给安卓的参数
var linkPupil1 = {
    'url': urlBase + '/janesi-headline/ZQFL/templete/teacherAndPupil.html',
    'data': {
        'address': 'teacher',
        'from': 'banner'
    }
}
var linkPupil2 = {
    'url': urlBase + '/janesi-headline/ZQFL/templete/teacherAndPupil.html',
    'data': {
        'address': 'teacher',
        'from': 'task'
    }
}
var inviteCode = {
    'url': urlBase + '/janesi-headline/ZQFL/templete/bindingCode.html'
}
var questionUrl = {
    'url': urlBase + '/janesi-headline/ZQFL/templete/question.html'
}

var jumpTipUrlString = {
    // 'url': 'https://api.nicetui.cn/niceapi/addpostion/4D3D112BA363497A'
}



var dailyTaskList;
var adTaskName;



// 签到表
function fetchSignData() {

    var reqApi = '/app/interest/task/show_sign';

    window.JanesiApi.sendApi(reqApi, 'post', reqParams, function (res) {
        if (res.code != 0) {
            return;
        }
        var coinList = res.result.coinList;
        var ul = document.getElementById('k_signList');
        ul.innerHTML = '';
        var btn = document.getElementById('k_signBg');
        var p = document.getElementById('k_signBtnTitle');
        if (res.result.signInApply == 0) {

            var btn = document.getElementById('k_signBg');
            p.innerHTML = '签到';
            btn.classList.remove('unSign');
            btn.onclick = clickSignAction;
        } else {
            p.innerHTML = '已签到';
            btn.classList.add('unSign');
        }
        for (var i = 0; i < coinList.length; i++) {

            var li = document.createElement('li');
            li.className = "commonItem";
            var day = i + 1;
            if (day <= res.result.signTimes) {

                li.innerHTML = `
                        <p class="selectedTopString commonTopItem"> ${'第' + day + '天'} </p>
                        <img class="selectedImg" src="../icon/welfare_signed_jinbi@2x.png">
                        <p class="selectedBottomString commonBottomItem">+${coinList[i]}</p>`
            } else {
                li.innerHTML = `
                        <p class="unselectedTopString commonTopItem"> ${'第' + day + '天'} </p>        
                        <img class="unselectedImg" src="../icon/welfare_jinbi_gray@2x.png">        
                        <p class="unselectedBottomString commonBottomItem">+${coinList[i]}</p>`
            }
            ul.appendChild(li);
        }
    })
}
// 新手任务
function fetchNewbieData() {
    var reqApi = '/app/interest/task/newbie_task';
    window.JanesiApi.sendApi(reqApi, 'post', reqParams, function (res) {
        var noobSection = document.getElementById('noobTaskSection');
        // console.log(res);
        if (res.code == 9000) {

            if (!noobSection.className.match('isNotNoob')) {

                noobSection.classList.add('isNotNoob');
            }
            return;
        }

        if (res.code != 0) {
            return;
        }
        var array = res.result.taskList;
        if (res.result.taskTip == 1) {
            if (!noobSection.className.match('isNotNoob')) {

                noobSection.classList.add('isNotNoob');
            }
            return;
        };
        var ul = document.createElement('ul');
        ul.className = 'mui-table-view';
        for (var i = 0; i < array.length; i++) {

            var task = array[i];
            if (task.taskTip == 1) continue;
            var li = document.createElement('li');
            li.className = 'mui-table-view-cell mui-collapse';
            var handleLiClick = function ($e) {

            }


            if (task.taskName.match('新手阅读奖励')) {
                var tasks = task.taskList;
                var taskUl = document.createElement('ul');
                for (var j = 0; j < tasks.length; j++) {
                    var model = tasks[j];
                    var taskLi = document.createElement('li');
                    var template;
                    if (model.taskTip == 1) {
                        template = `
                            <div class="signRow">
                                <p class="rowCommonLeft isSign">${model.content}</p>
                                <div class="SignRight">
        
                                    <p class="commonRight isSignRight">+<span class="commonRight isSignRight">${model.awardCount}</span>
                                    </p>
                                    <img class="IsSignRightIcon" src="../icon/signRowIconGray@2x.png">
                                    <img class="isDoneSignIcon" src="../icon/welfare_finish@2x.png">
                                </div>
                            </div>`
                    } else {
                        template = `
                            <div class="signRow">
                            <p class="rowCommonLeft">${model.content}</p>
                            <div class="SignRight">
    
                                <p class="commonRight">+<span class="commonRight">${model.awardCount}</span>
                                </p>
                                <img class="IsSignRightIcon" src="../icon/signRowIconYellow@2x.png">
                            </div>
                        </div>`
                    }
                    taskLi.innerHTML = template;
                    taskUl.appendChild(taskLi);
                }

                row = `<div class="collapseSectionBG" id = "新手阅读奖励">
                <div class="collapseSectionLeftBg">
                    <div class="noobSection2LeftLine">
                        <div class="noobSectionCircle"></div>
                    </div>
                    <p class="sectionCommonLeftTitle">新手阅读奖励</p> 
                </div> 
                <dic class="sectionRightBg">
                    <p class="collapseSectionRightCommonTitle">+<span class="collapseSectionRightCommonTitle">${task.awardCount}</span>
                    </p>
                    <img class="collapseSectionYellowIcon" src="../icon/welfare_daily_gold@2x.png">
                    <img class="collapseSectionArrow" src="../icon/welfare_task_jiantou2@2x.png">
                </dic>
            </div>` +
                    `
                <div class="mui-collapse-content">
                <div class="signDetail">    
                <div class="noobSectionProfileTitleBg">     
                <p class="noobSectionProfileString">首次登录日起20天内，完成以下任务可获得相应金币奖励（必须连续完成）</p>
                </div>${taskUl.innerHTML}
                </div>            
                </div>`;

                li.innerHTML = row;
                ul.appendChild(li);
            } else {

                createRow(li,task);
                ul.appendChild(li);
            }            
        }
        var lastLi = ul.lastElementChild;
        var lastHideDiv = lastLi.getElementsByClassName('collapseSectionBG')[0];
        lastHideDiv.classList.add('hideLine');
        var temp = ` <div class="sectionHeaderBG"  onclick="collapseAllAction(this)">
    
            <div class="sectionTitleBG">
                <img class="sectionLeftIcom" src="../icon/welfare_daily_person@2x.png">
                <p class="sectionLeftTitle">新手任务</p>
            </div>
        </div>`
        noobSection.innerHTML = temp;
        noobSection.appendChild(ul);
    })
}
// 日常任务
function fetchDailyData() {
    var reqApi = '/app/interest/task/daily_task';
    window.JanesiApi.sendApi(reqApi, 'post', reqParams, function (res) {
        console.log(res);
        if (res.code != 0) {
            return;
        }
        var dailyTaskSection = document.getElementById('dailyTaskSection');
        var headerSectionTemplate = `
            <div class="sectionHeaderBG">
                <div class="sectionTitleBG">
                    <img class="sectionLeftIcom" src="../icon/welfare_daily_task@2x.png">
                    <p class="sectionLeftTitle">${res.result.content}</p>
                </div>
            </div>
            `
        var ul = document.createElement('ul');
        ul.className = 'mui-table-view';
        var tasks = res.result.taskList;
        dailyTaskList = tasks;
        for (var i = 0; i < tasks.length; i++) {

            var model = tasks[i];
            if (model.taskTip == 1) continue;
            var li = document.createElement('li');
            li.className = 'mui-table-view-cell mui-collapse';
            li.onclick = didClickCell.bind(li);
            createRow(li,model);
            ul.appendChild(li);
        }
        var lastLi = ul.lastElementChild;
        var lastHideDiv = lastLi.getElementsByClassName('collapseSectionBG')[0];
        lastHideDiv.classList.add('hideLine');
        dailyTaskSection.innerHTML = headerSectionTemplate;
        dailyTaskSection.appendChild(ul);
    })
}
// 点击签到
function clickSignAction() {
    var reqApi = '/api/ucs/sign/checkout';
    window.JanesiApi.sendApi(reqApi, 'post', reqParams, function (res) {
        fetchSignData();
        var jsonStr = res;

        window.JanesiBridge.callNative('signSuccess', jsonStr);
    })
}


function collapseAllAction(section) {

    var img = section.childNodes[3];
    console.log('section', img.src);
    // window.JanesiBridge.callNative('updateRemark','ok');

    if (img.src.match('welfare_task_jiantou2@2x.png')) {

        img.src = '../icon/welfare_task_jiantou@2x.png';
    } else {
        img.src = '../icon/welfare_task_jiantou2@2x.png';
    }
    var ul = section.parentNode.lastChild;
    var liArray = ul.childNodes;
    for (var i = 0; i < liArray.length; i++) {

        var li = liArray[i];
        var row = li.childNodes;
        var rowList = li.childNodes;
        for (var j = 0; j < rowList.length; j++) {

            var target = rowList[j];
            if (target.tagName == 'DIV') {

                if (target.className.match('collapseSectionBG')) {

                    target.onclick();
                    break;
                }
            }
        }
    }
    if (section.id) {

    }
}



//点击任务按钮事件
function didClickRowBtnAction(key) {
    console.log(key)

    var keyName = key.classList[1];
    console.log(keyName)
    if (keyName == '输入邀请码') {

        window.JanesiBridge.callNative('open', inviteCode);

    } else if (keyName == '邀请收徒，现金可提现') {
        window.JanesiBridge.callNative('open', linkPupil2);
        _czc.push(["_trackEvent", FUlIDisciple, tap]);


    } else if (keyName == '绑定手机号') {
        window.JanesiBridge.callNative('welfareInterfaceTask', {
            'taskName': 'bindPhone'
        });


    } else if (keyName == '绑定微信号') {
        window.JanesiBridge.callNative('welfareInterfaceTask', {
            'taskName': 'bindWechat'
        });


    } else if (keyName == '阅读资讯') {
        window.JanesiBridge.callNative('open', {
            'page': 'homePage'
        });


    } else if (keyName == '分享资讯') {
        window.JanesiBridge.callNative('open', {
            'page': 'homePage'
        });


    } else if (keyName == '阅读时长30分钟') {
        window.JanesiBridge.callNative('open', {
            'page': 'homePage'
        });


    } else if (keyName == '观看视频') {
        window.JanesiBridge.callNative('open', {
            'page': 'videoPage'
        });


    } else if (keyName == '阅读推送资讯') {
        window.JanesiBridge.callNative('welfareInterfaceTask', {
            'taskName': 'sample'
        });


    } else if (keyName == '问卷调查') {
        window.JanesiBridge.callNative('open', questionUrl)

    // } else if (keyName == '幸运大转盘') {

    //     window.JanesiBridge.callNative('open', jumpTipUrlString);

        // for (var i = 0; i < dailyTaskList.length; i++) {

        //     var task = dailyTaskList[i];
        //     console.log(1111, task);
        //     if (task.taskName == '拆红包领奖励') {

        //     }
        // }
    } else if (keyName == adTaskName) {
        console.log(jumpTipUrlString);
        window.JanesiBridge.callNative('open', jumpTipUrlString);

        // for (var i = 0; i < dailyTaskList.length; i++) {

        //     var task = dailyTaskList[i];
        //     console.log(1111, task);
        //     if (task.taskName == '拆红包领奖励') {

        //     }
        // }
    }
}

//点击中间banner 事件   进入师徒页面

function clickBannerAction() {
    window.JanesiBridge.callNative('open', linkPupil1);
    _czc.push(["_trackEvent", FUlIBanner, tap]);
}

//原生触发 刷新请求
function reloadData() {

    fetchDailyData();
    fetchNewbieData();
    fetchSignData();
}



function createRow(li, model) {
    // console.log(li);
    // console.log(model);

    var sectionRightBg = document.createElement('div');
    sectionRightBg.className = 'sectionRightBg';
    if (model.awardUnit.match('元')) {
        if(model.taskName == "输入邀请码"){
            
            var count = 0.5;
            sectionRightBgTemplate = `
            <p class="collapseSectionRightCommonTitle redRightTitle">+<span class="collapseSectionRightCommonTitle redRightTitle">${count}${model.awardUnit}</span>
            </p>
            <img class="collapseSectionHongbaoIcon" src="../icon/welfare_daily_hongbao@2x.png">
            <img class="collapseSectionArrow" src="../icon/welfare_task_jiantou2@2x.png">
            `
        }else{


            sectionRightBgTemplate = `
            <p class="collapseSectionRightCommonTitle redRightTitle">+<span class="collapseSectionRightCommonTitle redRightTitle">${model.awardCount}${model.awardUnit}</span>
            </p>
            <img class="collapseSectionHongbaoIcon" src="../icon/welfare_daily_hongbao@2x.png">
            <img class="collapseSectionArrow" src="../icon/welfare_task_jiantou2@2x.png">
            `
        }

    } else if (model.awardUnit.match('金币')) {

        sectionRightBgTemplate = `
                    <p class="collapseSectionRightCommonTitle">+<span class="collapseSectionRightCommonTitle">${model.awardCount}</span>
                    </p>
                    <img class="collapseSectionYellowIcon" src="../icon/welfare_daily_gold@2x.png">
                    <img class="collapseSectionArrow" src="../icon/welfare_task_jiantou2@2x.png">
                    `
    } else {
        console.log(model.taskName);
         adTaskName = model.taskName
        // 将广告链接提出来
        jumpTipUrlString.url = model.linkUrl;
        sectionRightBgTemplate = `
                    <p class="collapseSectionRightCommonTitle redRightTitle">+<span class="collapseSectionRightCommonTitle redRightTitle">${model.awardUnit}</span>
                    </p>
                    <img class="collapseSectionHongbaoIcon" src="${model.imageUrl}">
                    <img class="collapseSectionArrow" src="../icon/welfare_task_jiantou2@2x.png">
                    `
    }
    sectionRightBg.innerHTML = sectionRightBgTemplate;
    //  onclick="didClickCell(this)" 
    var rowTemplate = `
                    <div class="collapseSectionBG" id = "${model.taskName}">
                        <div class="collapseSectionLeftBg">
                            <div class="noobSection2LeftLine">
                                <div class="noobSectionCircle"></div>
                            </div>
                            <p class="sectionCommonLeftTitle">${model.taskName}</p>
                        </div>
                        ${sectionRightBg.outerHTML}
                    </div>
                    <div class="mui-collapse-content">
                        <div class="rightBtnRowBg">
                            <p class="rightBtnRowBgLeftTitle">${model.content}</p>
                            <div class="rightBtn ${model.taskName}" onclick='didClickRowBtnAction(this)'>${model.param}</div>
                        </div>
                    </div>`
    li.innerHTML = rowTemplate;
}