<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript"></script>

var shareData = {};  
shareData.imgUrl = window.ImgPrex + result.PicUrls;  
shareData.link = window.location.href;  
shareData.content = delHtmlTag($("#Contents").html());  
shareData.title = document.title;  
Share(shareData);  

function Share(shareData) {  
  
        var data = {};  
        var wxdata = {};  
        data.method = "GetConfig";  
        data.url = window.location.href.split('#')[0];  
        //这里是ajax向后台请求签名，appid等的方法  
        ajaxProcess("/h5/share.aspx?", data, function callSuccess(oRet) {  
            //var data = oRet;  
            var result = oRet;  
            if (result != null) {  
                wx.config({  
                    debug: false,  
                    appId: result.AppId,  
                    timestamp: result.Timestamp,  
                    nonceStr: result.NonceStr,  
                    signature: result.Signature,  
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']  
                });  
  
            }  
        }, function callError(e) {  
            alert(e);  
        });  
  
  
        wxdata.imgUrl = shareData.imgUrl;  
        wxdata.link = shareData.link;  
        var content = shareData.content;  
        content = delHtmlTag(content);  
        if (content.length > 100) {  
            wxdata.desc = content.substring(0, 100);  
        } else {  
            wxdata.desc = content;  
        }  
        wxdata.title = shareData.title;  
  
  
        var friendcallback = function(res) {  
            //alert("分享成功");  
        };  
  
  
        wx.ready(function() {  
            wx.onMenuShareTimeline({  
                title: wxdata.title,  
                desc: wxdata.desc,  
                link: wxdata.link,  
                imgUrl: wxdata.imgUrl,  
                img_width: 200,  
                img_height: 200,  
                trigger: function(res) {  
                },  
                success: function(res) {  
                    friendcallback(res);  
                },  
                cancel: function(res) {  
                },  
                fail: function(res) {  
                    alert(JSON.stringify(res));  
                }  
            });  
        });  
  
  
        wx.ready(function() {  
            wx.onMenuShareAppMessage({  
                title: wxdata.title,  
                desc: wxdata.desc,  
                link: wxdata.link,  
                imgUrl: wxdata.imgUrl,  
                img_width: 200,  
                img_height: 200,  
                trigger: function(res) {  
                },  
                success: function(res) {  
                    friendcallback(res);  
                },  
                cancel: function(res) {  
                },  
                fail: function(res) {  
                    alert(JSON.stringify(res));  
                }  
            });  
        });  
  
  
        wx.ready(function() {  
            wx.onMenuShareQQ({  
                title: wxdata.title,  
                desc: wxdata.desc,  
                link: wxdata.link,  
                imgUrl: wxdata.imgUrl,  
                img_width: 200,  
                img_height: 200,  
                trigger: function(res) {  
                },  
                success: function(res) {  
                    friendcallback(res);  
                },  
                cancel: function(res) {  
                },  
                fail: function(res) {  
                    alert(JSON.stringify(res));  
                }  
            });  
        });  
  
  
        wx.ready(function() {  
            wx.onMenuShareWeibo({  
                title: wxdata.title,  
                desc: wxdata.desc,  
                link: wxdata.link,  
                imgUrl: wxdata.imgUrl,  
                img_width: 200,  
                img_height: 200,  
                trigger: function(res) {  
                },  
                success: function(res) {  
                    friendcallback(res);  
                },  
                cancel: function(res) {  
                },  
                fail: function(res) {  
                    alert(JSON.stringify(res));  
                }  
            });  
        });  
  
  
        wx.ready(function() {  
            wx.onMenuShareQZone({  
                title: wxdata.title,  
                desc: wxdata.desc,  
                link: wxdata.link,  
                imgUrl: wxdata.imgUrl,  
                img_width: 200,  
                img_height: 200,  
                trigger: function(res) {  
                },  
                success: function(res) {  
                    friendcallback(res);  
                },  
                cancel: function(res) {  
                },  
                fail: function(res) {  
                    alert(JSON.stringify(res));  
                }  
  
  
            });  
  
  
        });  
    }  
