$(function() {
    var $bgbox = $("#jsBgBox");
    var $dialog = $("#dialogBox"), $dialogKey = $dialog.find(".dialog-key");
    var $dialogTips = $(".dialog-tips");
    var $dialogTitle = $dialogTips.find("div"), $dialogDisc = $dialogTips.find("p");
    
    function scene1(){
        var key1 = 0, key2 = 0, key3 = 0, key4 = 0;
        var isKeyAppear = false;
        var $dialogProgress = $(".dialog-collect");

        $(".item").on("tap", function() {
            var $this = $(this);
            var type = $this.attr("data-type"), title = $this.attr("data-title"), isKey = $this.attr("data-iskey"), sort = $this.attr("data-sort"), disc = $this.attr("data-disc");
            if (sort == 2 && disc == "") {
                $(this).addClass("checked");
                if(isKey == "false"){
                    $(this).attr("data-disc","这就是一个破罐子！");
                    $("#audioBroken")[0].play();
                    return false;
                }
            } else if (sort == 1){
                $(this).addClass("after");
            }
            setTimeout(function() {
                if (type == 1) {
                    var  disc = $this.attr("data-disc"), img = $this.attr("data-img");
                    showDialog(title, isKey, disc, img);
                } else if (type == 3) {
                    var Tips = $this.attr("data-tips"), index = $this.attr("data-index");
                    showDialog(title, isKey, '', '', Tips, index);
                }
            }, 500);
        });

        var showResult = function() {
            var count = key1 + key2 + key3 + key4;
            var disc = "";
            if (count == 4) {
                disc = "恭喜你已顺利找到4件通关信物。不过，属于真正勇者的探险，还在继续......";
                showDialog("none", "", disc);
                $dialog.on("tap", function() {
                    if($(this).hasClass("finished")){
                        //$(".lock-key").addClass("show");
                        $(".swiper-container").addClass("step2");
                        $dialogProgress.hide();
                        myScroll.scrollTo(-450,0);
                        scene2();
                    }
                    
                });
                
            }
        };
        var showDialog = function(dTitle, isKey, dDisc, dImg, dTips, index) {
            $dialog.addClass("show");
            var $mask = $dialog.find(".dialog-mask");
            var $audioResult = $("#audioResult")[0];
            if (isKey == "false"){
                $dialog.removeClass("finished");
                $dialogKey.removeClass("hide");
                $dialogKey.find("div").removeClass().addClass("discount-img discount-img_" + dImg);
                $dialogDisc.removeClass("dialog-result").html(dDisc).show();
                $mask.addClass("show");
                $dialogTitle.removeClass().addClass("discount-text discount-text_" + dTitle);
                $dialogTips.removeClass("key-content");
            } else if(isKey == "true"){
                $dialog.removeClass("finished");
                isKeyAppear = true;
                $dialogKey.addClass("hide");
                $dialogTitle.removeClass().addClass("key-text key-text_" + dTitle);
                $dialogDisc.removeClass("dialog-result").html("").hide();
                $dialogTips.addClass("key-content");
                setTimeout(function(){showResult();},2000);
            }else{
                $dialog.addClass("finished");
                $dialogKey.addClass("hide");
                $dialogTitle.removeClass().addClass("key-text key-text_" + dTitle);
                $dialogDisc.addClass("dialog-result").html(dDisc).show();
                $dialogTips.addClass("key-content");
            }

            if (dTips == "") {
                switch (index) {
                    case "1":
                        key1 = 1;
                        break;
                    case "2":
                        key2 = 1;
                        break;
                    case "3":
                        key3 = 1;
                        break;
                    case "4":
                        key4 = 1;
                        break;
                }

                if(isKeyAppear){
                    var keyTool = $dialogProgress.find(".J_tool").eq(0),
                        keyImg = "<img src='./image/step1/popup/img/key0"+ index +".png' />";
                    setTimeout(function(){
                        keyTool.html(keyImg);
                    },2000);
                    
                    keyTool.removeClass('J_tool');
                    $dialogProgress.show();
                }
                $audioResult.play();
                $("#key0" + index).addClass("checked").attr("data-tips", "您已经拿到该线索！");
            }
            $dialog.on("tap", function() {
                $mask.removeClass("show");
                $(this).removeClass("show");
                $(".item").removeClass("after");
            });
            $mask.on("tap", function() {
                $mask.removeClass("show");
                $(this).removeClass("show");
                $(".item").removeClass("after");
            });
        };
    }

    scene1();
    
    function scene2(){
        var key1 = 0, key2 = 0, key3 = 0, key4 = 0, key5 = 0, key6 = 0;
        var isFinished = false;
        var npcText = [
            "<div class='npcText'>你终于来了，不过要找的人不是我！德基圣诞消费，积分5倍起蹭蹭往上涨……一不小心还能兑换到<span class='yellow'>iPhone X！</span></div>",
            "<div class='npcText'>你找错了！不过只有美丽的人才能见到我。悄悄给你透露个消息：圣诞在德基买满3999，<span class='yellow'>超高价值大奖</span>抽到“人神共愤”！</div>",
            "<div class='npcText'>还嫌不够刺激？OK，德基不走套路只走心！<span class='yellow'>圣诞限时折扣中心2折起！</span>抢不到的话……只能说你手速太慢啦！</div>",
            "<div class='npcText'>是谁在打扰我休息？既然这样不妨告诉你，德基广场APP或官方微信服务号，抢德基<span class='yellow'>史上首次发放的一大波现金红包</span>！那可是真金白银啊！</div>"
        ];
        var keyWords = [
            "是一张碎纸片，但好像不完整。",
            "跟前面那张拼起来好像能看出点东西，但是依然不清晰。",
            "咦，这里也有一张碎纸片，拼起来试试！",
            "这张纸好像让我想到了什么，但应该还有。",
            "这张纸片至关重要，再看看别的地方。",
            "最后一张碎纸片果然藏在这里面！"
        ];

        $(".cell").on("tap", function(e) {
            e.stopPropagation();
            console.log("DD")
            var $this = $(this);
            var type = $this.attr("data-type"), title = $this.attr("data-title"), disc = $this.attr("data-disc"), isKey = $this.attr("data-iskey"), img = $this.attr("data-img");

            $(this).addClass("after");

            setTimeout(function() {
                if (type == 1) {
                    showDialog(isKey, title);
                } else if(type == 2) {
                    var Tips = $this.attr("data-tips"), isChecked = $this.attr("data-isChecked");
                    showDialog(isKey, title, Tips, isChecked)
                }
            },500)
        });

        function showDialog(isKey, dTitle, dTips, isChecked){
            $dialog.addClass("show");
            var $audioResult = $("#audioResult")[0];

            console.log("D")

            if(isKey == "true"){
                
            }else if(isKey == "false"){

            }
            if(isChecked == "false"){
                $dialogKey.addClass("hide");
                $dialogTitle.removeClass().addClass("snippet-text snippet-text_" + dTitle);
                $dialogDisc.removeClass("dialog-result").html("").hide();
                $dialogTips.addClass("key-content");
                $("#clue" + dTitle).attr("data-isChecked","true");
            }else if(isChecked == "true"){
                var index = Number(dTitle),
                    dDisc = keyWords[index - 1];

                $dialogKey.removeClass("hide");
                $dialogKey.find("div").removeClass().addClass("snippet-img snippet-img_" + dTitle);
                $dialogDisc.removeClass("dialog-result").html(dDisc).show();
                $dialogTips.removeClass("key-content");
            }

            if(dTips == "tips"){

            }

            $dialog.on("tap", function() {
                $(this).removeClass("show");
                $(".cell").removeClass("after");
            });
        }
    }
    
    scene2();

    $(".page-tips").on("tap", function() {
        $(this).remove();
    });

    var keyString = "";
    var openDoor = function() {
        var $keystatus = $(".keystatus"), $keystatusItem = $(".keystatus span"), $numItem = $(".num-item"), $lockKeyClose = $(".lock-key_close");
        var flag = 0;
        $numItem.on("touchstart", function() {
            var value = $(this).attr("data-num");
            flag += 1;
            if (flag > 4) {
                $keystatusItem.removeClass("active");
                $keystatusItem.eq(0).addClass("active");
                keyString = value;
                flag = 1;
                $keystatus.removeClass("wrong");
            } else {
                $keystatusItem.eq(flag - 1).addClass("active");
                keyString += value;
            }
            console.log(keyString);
            if (flag == 4) {
                if (keyString == "0325") {
                    $(".page-finished").addClass("show");
                    $(".page-finished p").eq(1).on("webkitAnimationEnd", function() {
                        $("#pageKV").addClass("show");
                    });
                } else {
                    $keystatus.addClass("wrong");
                }
            }
        });
        $lockKeyClose.on("tap", function() {
            $(".lock-key").removeClass("show");
        });
    };
    openDoor();
    $("#jsTips").on("tap", function() {
        showDialog($(this).attr("data-title"), $(this).attr("data-disc"));
    });
    $("#link").on("tap", function() {
        window.location.href = "http://games.qq.com/a/20160314/031744.htm";
    });
});


$(function(){
    $.ajax({
        type:"GET",
        url:'./DejiService/egyptgame/presentgifts.json',
        data:{"mobile":"18205032900"},
        success:function(msg){
            console.log(msg);
        }
    })
})