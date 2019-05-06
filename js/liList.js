function liList(e) {
    let ul=document.querySelector('.midList');
    for(let i=0;i<e.result.contents.length;i++){
        let imgUrl='../img/add-the-attention@2x.png',flag1='true';
        let hitUrl='../img/praise@2x.png',flag2='true',text='点赞';
        if(e.result.contents[i].scan=='0'){
            e.result.contents[i].scan='评论';
        }
        if(e.result.contents[i].isFollow=='1'){
            imgUrl="../img/has-been-focused-on@2x.png";
            flag1="false";
        }
        if(e.result.contents[i].isLike=='1'){
            hitUrl="../img/-praised@2x.png";
            flag2="false";
            text="已赞";
        }
        if(JSON.parse(e.result.contents[i].images).length=='1'){
            if(e.result.contents[i].author.avatar==''){
                e.result.contents[i].author.avatar='../img/1.jpg';
            }
            let li=document.createElement('li');
            li.innerHTML=`
            <div class="midTop">
                <div class="mid_Top_left">
                    <img src="${e.result.contents[i].author.avatar}" alt=""  onerror="this.src='../img/1.jpg'">
                    <span>${e.result.contents[i].author.name}</span>
                </div>
                <div class="mid_Top_right" flag="${flag1}" authorId="${e.result.contents[i].authorId}">
                    <img class="add_att" src="${imgUrl}" alt="">
                </div>
            </div>
            <div class="midTit">
                ${e.result.contents[i].body}
            </div>
            <div class="midImg">
                <div style="background: url('${JSON.parse(e.result.contents[i].images)[0]}') no-repeat center/cover;"></div>
            </div>
            <div class="midBot">
                <div class="midBotHit" flag="${flag2}" num="${e.result.contents[i].itemId}">
                    <img class="hitImg" src="${hitUrl}" alt="">
                    <span class="hit">${text}</span>
                </div>
                <div class="midBotRem">
                    <div class="imgBox discuss" num="${e.result.contents[i].itemId}">
                        <img src="../img/comments@2x.png" alt="">
                        <span>${e.result.contents[i].scan}</span>
                    </div>
                </div>
                <span class="report">举报</span>
            </div>
        `;

            ul.appendChild(li);
        }else if(JSON.parse(e.result.contents[i].images).length=='2'){
            let li=document.createElement('li');
            li.innerHTML=`
            <div class="midTop">
                <div class="mid_Top_left">
                    <img src="${e.result.contents[i].author.avatar}" alt="" onerror="this.src='../img/2.jpg'">
                    <span>${e.result.contents[i].author.name}</span>
                </div>
                <div class="mid_Top_right" flag="${flag1}" authorId="${e.result.contents[i].authorId}">
                    <img class="add_att" src="${imgUrl}" alt="">
                </div>
            </div>
            <div class="midTit">
                ${e.result.contents[i].body}
            </div>
            <div class="midImg">
                <div style="background: url('${JSON.parse(e.result.contents[i].images)[0]}') no-repeat center/cover;"></div>
                <div style="background: url('${JSON.parse(e.result.contents[i].images)[1]}') no-repeat center/cover;"></div>
            </div>
            <div class="midBot">
                <div class="midBotHit" flag="${flag2}" num="${e.result.contents[i].itemId}">
                    <img class="hitImg" src="${hitUrl}" alt="">
                    <span class="hit">${text}</span>
                </div>
                <div class="midBotRem">
                    <div class="imgBox discuss" num="${e.result.contents[i].itemId}">
                        <img src="../img/comments@2x.png" alt="">
                        <span>${e.result.contents[i].scan}</span>
                    </div>
                </div>
                <span class="report">举报</span>
            </div>
        `;

            ul.appendChild(li);
        }else if(JSON.parse(e.result.contents[i].images).length=='3'){
            let li=document.createElement('li');
            li.innerHTML=`
            <div class="midTop">
                <div class="mid_Top_left">
                    <img src="${e.result.contents[i].author.avatar}" alt="" onerror="this.src='../img/userPhoto.png'">
                    <span>${e.result.contents[i].author.name}</span>
                </div>
                <div class="mid_Top_right" flag="${flag1}" authorId="${e.result.contents[i].authorId}">
                    <img class="add_att" src="${imgUrl}" alt="">
                </div>
            </div>
            <div class="midTit">
                ${e.result.contents[i].body}
            </div>
            <div class="midImg">
                <div style="background: url('${JSON.parse(e.result.contents[i].images)[0]}') no-repeat center/cover;"></div>
                <div style="background: url('${JSON.parse(e.result.contents[i].images)[1]}') no-repeat center/cover;"></div>
                <div style="background: url('${JSON.parse(e.result.contents[i].images)[2]}') no-repeat center/cover;"></div>
            </div>
            <div class="midBot">
                <div class="midBotHit" flag="${flag2}" num="${e.result.contents[i].itemId}">
                    <img class="hitImg" src="${hitUrl}" alt="">
                    <span class="hit">${text}</span>
                </div>
                <div class="midBotRem">
                    <div class="imgBox discuss" num="${e.result.contents[i].itemId}">
                        <img src="../img/comments@2x.png" alt="">
                        <span>${e.result.contents[i].scan}</span>
                    </div>
                </div>
                <span class="report">举报</span>
            </div>
        `;

            ul.appendChild(li);
        }else{
            let li=document.createElement('li');
            li.innerHTML=`
            <div class="midTop">
                <div class="mid_Top_left">
                    <img src="${e.result.contents[i].author.avatar}" alt="" onerror="this.src='../img/userPhoto.png'">
                    <span>${e.result.contents[i].author.name}</span>
                </div>
                <div class="mid_Top_right" flag="${flag1}" authorId="${e.result.contents[i].authorId}">
                    <img class="add_att" src="${imgUrl}" alt="">
                </div>
            </div>
            <div class="midTit">
                ${e.result.contents[i].body}
            </div>
            <div class="midBot">
                <div class="midBotHit" flag="${flag2}" num="${e.result.contents[i].itemId}">
                    <img class="hitImg" src="${hitUrl}" alt="">
                    <span class="hit">${text}</span>
                </div>
                <div class="midBotRem">
                    <div class="imgBox discuss" num="${e.result.contents[i].itemId}">
                        <img src="../img/comments@2x.png" alt="">
                        <span>${e.result.contents[i].scan}</span>
                    </div>
                </div>
                <span class="report">举报</span>
            </div>
        `;

            ul.appendChild(li);
        }

    }
}
