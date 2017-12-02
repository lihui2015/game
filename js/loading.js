/* loading */
$(function() {
    var PreLoad = function(a, b) {
        var c = b || {};
        this.source = a, this.count = 0, this.total = a.length, this.onload = c.onload, 
        this.prefix = c.prefix || "", this.init();
    };
    PreLoad.prototype.init = function() {
        var a = this;
        a.source.forEach(function(b) {
            var c = b.replace(/[#\?].*$/, "").substr(b.lastIndexOf(".") + 1).toLowerCase(), d = a.prefix + b;
            switch (c) {
              case "js":
                a.script.call(a, d);
                break;

              case "css":
                a.stylesheet.call(a, d);
                break;

              case "svg":
              case "jpg":
              case "gif":
              case "png":
              case "jpeg":
                a.image.call(a, d);
            }
        });
    }, PreLoad.prototype.getProgress = function() {
        return Math.round(this.count / this.total * 100);
    }, PreLoad.prototype.image = function(a) {
        var b = document.createElement("img");
        this.load(b, a), b.src = a;
    }, PreLoad.prototype.stylesheet = function(a) {
        var b = document.createElement("link");
        this.load(b, a), b.rel = "stylesheet", b.type = "text/css", b.href = a, document.head.appendChild(b);
    }, PreLoad.prototype.script = function(a) {
        var b = document.createElement("script");
        this.load(b, a), b.type = "text/javascript", b.src = a, document.head.appendChild(b);
    }, PreLoad.prototype.load = function(a, b) {
        var c = this;
        a.onload = a.onerror = a.onabort = function(a) {
            c.onload && c.onload({
                count: ++c.count,
                total: c.total,
                item: b,
                type: a.type
            });
        };
    };
    var resources = [ "./css/index.css", "./js/lib/touch.js" ];

    var images = [ "./image/light/bg2_01.jpg", "./image/light/bg2_02.jpg",
"./image/light/bg2_03.jpg", "./image/light/bg2_04.jpg",
"./image/popup/img/01.jpg", "./image/popup/img/02.jpg",
"./image/popup/img/03.jpg", "./image/popup/img/04.jpg",
"./image/popup/img/05.jpg", "./image/popup/img/06.jpg",
"./image/popup/img/07.jpg", "./image/popup/img/08.jpg",
"./image/popup/text/discount/01.png", "./image/popup/text/discount/02.png",
"./image/popup/text/discount/03.png", "./image/popup/text/discount/04.png",
"./image/popup/text/discount/05.png", "./image/popup/text/discount/06.png",
"./image/popup/text/discount/07.png", "./image/popup/text/discount/08.png",
"./image/popup/text/key/01.png", "./image/popup/text/key/02.png",
"./image/popup/text/key/03.png", "./image/popup/text/key/04.png",
"./img/loading/loading01.png", "./img/loading/loading02.png" ]; 

    resources = resources.concat(images);
    new PreLoad(resources, {
        onload: function(load) {
            var count = load.count, total = load.total, percent = Math.ceil(100 * count / total);
            $("#percent").html(percent + "%");
            // $('#loading .animate-item').css({
            //   'transform': 'scale('+ percent/100 +', '+ percent/100 +')',
            // })
            setTimeout(function() {
                $("#audioBg")[0].play();
                $("#jsBgBox").removeClass("dark");
                if (count == total) {
                    var el = $("#loading");
                    $("#percent").hide();
                    $("#loading .animate-item").addClass("loaded");
                    setTimeout(function() {
                        el.find(".text").addClass("show");
                        setTimeout(function() {
                            el.find(".tips").addClass("show");
                            el.find(".animate-item").on("tap", function() {
                                $(el).addClass("complete");
                                setTimeout(function() {
                                    $(el).remove();
                                }, 1e3);
                            });
                        }, 2500);
                    }, 2500);
                }
            }, 500);
        }
    });
});