$(function() {
    var $bgbox = $("#jsBgBox");
    var key1 = 0, key2 = 0, key3 = 0, key4 = 0;
    var $dialog = $("#dialogBox"), $dialogKey = $dialog.find(".dialog-key");
    var $dialogTips = $(".dialog-tips");
    var $dialogTitle = $dialogTips.find("div"), $dialogDisc = $dialogTips.find("p");
    var isFinished = false;
    var addShakeEvent = function() {
        var ShakeEvent = new Shake({
            threshold: 15,
            timeout: 1e3
        });
        ShakeEvent.start();
        window.addEventListener("shake", shakeEventDidOccur, false);
    };
    var removeShakeEvent = function() {
        window.removeEventListener("shake", shakeEventDidOccur, false);
    };
    $(".item").on("tap", function() {
        var $this = $(this);
        var type = $this.attr("data-type"), title = $this.attr("data-title"), isKey = $this.attr("data-iskey");
        if (type != 2) {
            $(this).addClass("after");
        }
        setTimeout(function() {
            if (type == 1) {
                var  disc = $this.attr("data-disc"), img = $this.attr("data-img");
                showDialog(title, isKey, disc, img);
            } else if (type == 3) {
                if (isFinished == true){
                    showResult();
                }else{
                    var Tips = $this.attr("data-tips"), index = $this.attr(" data-index");
                    showDialog(title, isKey, '', '', Tips, index);
                }
            }
        }, 500);
    });

    $(".page-tips").on("touchstart", function() {
        $(this).remove();
    });
    var showResult = function() {
        var count = key1 + key2 + key3 + key4;
        var $progress = $(".dialog-progress span");
        var title = "", disc = "", img = "";
        $progress.html(count);
        // dialogFlag = true;
        if (count == 1) {
            title = "获得一块“记忆碎片”! ";
            disc = "上面好像有奇怪的图案</br>好像只是其中一部分";
            img = "06";
            showDialog(title, disc, img, "false");
        } else if (count == 2) {
            title = "获得第二块“记忆碎片”！ ";
            disc = "两块碎片叠在一起了！</br>图案还是看不太清";
            img = "07";
            showDialog(title, disc, img, "false");
        } else if (count == 3) {
            title = "获得第三块“记忆碎片”！";
            disc = "把碎片叠到一起</br>看起来是些数字";
            img = "08";
            showDialog(title, disc, img, "false");
        } else if (count == 4) {
            title = "获得最后一块“记忆碎片”！ ";
            disc = "终于完成了！“0325”！</br>快去开门解锁吧！";
            img = "09";
            // setTimeout(function(){
            //   $('.lock-key').addClass('show');
            // },2000);
            isFinished = true;
            showDialog(title, disc, img, "false");
            // dialogFlag = false;
            $dialog.on("tap", function() {

                $(".lock-key").addClass("show");

            });
        }
    };
    var showDialog = function(dTitle, isKey, dDisc, dImg, dTips, index) {
        $dialog.addClass("show");
        var $mask = $dialog.find(".dialog-mask");
        var $audioResult = $("#audioResult")[0];
        if (isKey == "false"){
            $dialogKey.removeClass("hide");
            $dialogKey.find("div").removeClass().addClass("discount-img discount-img_" + dImg);
            $dialogDisc.html(dDisc).show();
            $mask.addClass("show");
            $dialogTitle.removeClass().addClass("discount-text discount-text_" + dTitle);
            $dialogTips.removeClass("key-content");
        } else {
            $dialogKey.addClass("hide");
            $dialogTitle.removeClass().addClass("key-text key-text_" + dTitle);
            $dialogDisc.html("").hide();
            $dialogTips.addClass("key-content");
        }

        if (dTips == "") {
            switch (index) {
                case 1:
                    key1 == 1;
                    break;
                case 2:
                    key2 == 1;
                    break;
                case 3:
                    key3 == 1;
                    break;
                case 4:
                    key4 == 1;
                    break;
            }
            setTimeout(function(){showResult();},2000);
            $audioResult.play();
            $("#key0" + index).attr("data-tips", "您已经拿到该线索！");
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
    function shakeEventDidOccur() {
        $(".key-img_03").addClass("shake");
        $(".key-img_03").on("webkitAnimationEnd", function() {
            var $this = $(this);
            key3 = 1;
            removeShakeEvent();
            $this.removeClass("shake");
            $("#key03").attr("data-tips", "您已经拿到该线索！");
            // setTimeout(function(){showResult();},500)
            $dialog.find(".dialog-mask").addClass("show");
        });
    }
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