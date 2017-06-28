var wz = {
    //浏览器
    browser: {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                //IE内核
                trident: u.indexOf('Trident') > -1,
                //IE7内核
                trident7: u.indexOf('MSIE 7') > -1,
                //遨游
                Maxthon: u.indexOf('Maxthon') > -1,
                //opera内核
                presto: u.indexOf('Presto') > -1,
                //苹果、谷歌内核
                webKit: u.indexOf('AppleWebKit') > -1,
                //火狐浏览器
                firefox: /.*(Firefox)\/([\w.]+).*/.test(u),
                //火狐内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                //Safari浏览器
                safari: /.*Version\/([\w.]+).*(Safari).*/.test(u),
                //是否为移动终端
                mobile: !!u.match(/AppleWebKit.*Mobile.*/),
                //ios终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                //android终端或者uc浏览器
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                //是否为iPhone或者QQHD浏览器
                iPhone: u.indexOf('iPhone') > -1,
                //是否iPad
                iPad: u.indexOf('iPad') > -1,
                //是否web应该程序，没有头部与底部
                webApp: u.indexOf('Safari') == -1,
                //是否微信
                weixin: u.indexOf('MicroMessenger') > -1,
                //是否QQ
                qq: u.match(/\sQQ/i) == " qq",
                //是否WP
                wp: u.indexOf("Windows Phone") > -1
            };
        }(),
        //页面语言
        language: (navigator.browserLanguage || navigator.language).toLowerCase(),
        //判断pc机（补充方法）
        IsPC: function () {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                        "SymbianOS", "Windows Phone",
                        "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        //是否为支持H5的浏览器
        IsH5browser: function () {
            if (typeof (Worker) !== "undefined") { return true; } else { return false; }
        },
        versions_v2: {
            //IE内核
            trident: function () {
                return navigator.userAgent.indexOf('Trident') > -1;
            },
            //IE7内核
            trident7: function () {
                return navigator.userAgent.indexOf('MSIE 7') > -1;
            },
            //遨游
            Maxthon: function () {
                return navigator.userAgent.indexOf('Maxthon') > -1;
            },
            //opera内核
            presto: function () {
                return navigator.userAgent.indexOf('Presto') > -1;
            },
            //苹果、谷歌内核
            webKit: function () {
                return; navigator.userAgent.indexOf('AppleWebKit') > -1
            },
            //火狐浏览器
            firefox: function () {
                return /.*(Firefox)\/([\w.]+).*/.test(navigator.userAgent);
            },
            //火狐内核
            gecko: function () {
                return navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1;
            },
            //Safari浏览器
            safari: function () {
                return /.*Version\/([\w.]+).*(Safari).*/.test(navigator.userAgent);
            },
            //是否为移动终端
            mobile: function () {
                return !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
            },
            //ios终端
            ios: function () {
                return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            },
            //android终端或者uc浏览器
            android: function () {
                return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1;
            },
            //是否为iPhone或者QQHD浏览器
            iPhone: function () {
                return navigator.userAgent.indexOf('iPhone') > -1;
            },
            //是否iPad
            iPad: function () {
                return navigator.userAgent.indexOf('iPad') > -1;
            },
            //是否web应该程序，没有头部与底部
            webApp: function () {
                return navigator.userAgent.indexOf('Safari') == -1;
            },
            //是否微信
            weixin: function () {
                return navigator.userAgent.indexOf('MicroMessenger') > -1;
            },
            //是否QQ
            qq: function () {
                return navigator.userAgent.match(/\sQQ/i) == " qq";
            },
            wp: function () {
                return navigator.userAgent.indexOf("Windows Phone") > -1;
            }
        }
    },
    //公共方法
    method: {
        //初始化手机页面
        //fulldiv 高度跟显示屏一样高的父容器
        //notouchmove 页面是否固定 bool类型 
        page_code: function (fulldiv, notouchmove) {
            $("body a").css({ "text-decoration": "none" });
            $("a,input,button").focus(function () { this.blur(); });
            if (fulldiv != "" || fulldiv != null) {
                fulldiv.css("height", $(window).height() + "px");
            }
            if (notouchmove) {
                document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            }
        },
       
        //封装打字机效果
        //obj 父容器对象
        //font 要打印出的文字
        //speed 速率
        //callback 打印结束回调函数 
        print_font: function (obj, font, speed, callback) {
            var seq = 0;
            if (speed == null || speed == "") {
                speed = 60;
            }
            var timer = setInterval(function () {
                obj.html(font.substring(0, seq));
                seq++;
                if (seq == font.length + 1) {
                    seq = 0;
                    clearInterval(timer);
                    setTimeout(function () {
                        if ((callback && typeof (callback) === "function") && callback()) {
                            callback();
                        }
                    }, 2000);
                }
            }, speed);
        },
        //检测横屏竖屏
        //obj 自定义遮盖层对象
        orientation: function (obj) {
            //横屏旋转提示
            if (!wz.browser.versions.mobile) {//如果是PC端
                obj.hide();
            }
            else {//手机端 
                if (window.orientation == 90 || window.orientation == -90) {//默认刷新页面是横屏时
                    obj.show();
                }
                window.onorientationchange = function () {
                    switch (window.orientation) {
                        case -90:
                            obj.show();
                            break;
                        case 90:
                            obj.show();
                            break;
                        case 0:
                            obj.hide();
                            break;
                        case 180:
                            obj.hide();
                            break;
                    }
                }
            }
        },
        //获取星期几  date格式 2015/9/22
        getWeekDay: function (date) {
            var day = new Date(Date.parse(date));
            var today = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
            return today[day.getDay()];
        },
        //获取某月有几天 1-12月
        //year 年
        //month 月
        getMonthDays: function (year, month) {
            if (month < 1 || month > 12) {
                return 30;
            }
            var arrMon = new Array(13);
            arrMon[1] = 31;
            if (year % 4 == 0) {
                arrMon[2] = 29;
            } else {
                arrMon[2] = 28;
            }
            arrMon[3] = 31; arrMon[4] = 30;
            arrMon[5] = 31; arrMon[6] = 30;
            arrMon[7] = 31; arrMon[8] = 31;
            arrMon[9] = 30; arrMon[10] = 31;
            arrMon[11] = 30; arrMon[12] = 31;
            return arrMon[month];
        },
        //返回随机数 不包括开始和结束值
        //start 开始数
        //end 结束数
        random: function (start, end) {
            return start > end ? 0 : Math.abs(parseInt(Math.random() * (start - end + 1) + end));
        },
        //反编码地址（一般带汉字的地址会被浏览器编译后生成乱码地址）
        //url 需要反编译的地址
        unencoded_url: function (url) {
            url = url.replace(/%3A/g, ":");
            url = url.replace(/%2F/g, "/");
            url = url.replace(/%3F/g, "?");
            url = url.replace(/%3D/g, "=");
            return url;
        },
        //判断文本内容
        checkInfo: {
            IsNum: function (txt) {
                return !/\D/ig.test(txt);
            },
            IsPhone: function (txt) {
                return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(txt);
            },
            IsMail: function (txt) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(txt);
            },
            IsTel: function (txt) {
                return /^0[\d]{2,3}-[\d]{7,8}$/.test(txt);
            },
            IsUserName: function (txt) {
                return /^[a-z0-9_-]{3,16}$/.test(txt);
            },
            IsCN: function (txt) {
                return !/[^\u4E00-\u9FA5]/g.test(txt);
            },
            IsIDCard: function (txt) {
                return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(txt);
            },
            IsUrl: function (txt) {
                return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(txt);
            },
            IsImg: function (txt) {
                return /.(gif|jpg|jpeg|png|gif)$/.test(txt);
            },
            IsImgBase64: function (txt) {
                return /^data:image\/(jpg|jpeg|png|gif);base64,/.test(txt);
            }
        },
        //判断文本内容IsNum,IsPhone,IsMail,IsTel,UserName,email
        checkInfo1: function (txt) {
            return {
                IsNum: !/\D/ig.test(txt),
                IsPhone: /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(txt),
                IsMail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(txt),
                IsTel: /^0[\d]{2,3}-[\d]{7,8}$/.test(txt),
                IsUserName: /^[a-z0-9_-]{3,16}$/.test(txt),
                IsCN: /[^\u4E00-\u9FA5]/g.test(txt),
                IsIDCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(txt),
                IsUrl: /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(txt),
                IsImg: /.(gif|jpg|jpeg|png|gif)$/.test(txt),
                IsImgBase64: /^data:image\/(jpg|jpeg|png|gif);base64,/.test(txt)
            };
        },
        //返回字符串中所有数字
        //str 例子：a32b2  返回322
        returNum: function (str) {
            str = str.split("");
            var endstr = "";
            for (i = 0; i < str.length; i++) {
                if (!/\D/ig.test(str[i])) {
                    endstr += str[i];
                }
            }
            return endstr;
        },
        //格式化浮点类型数字
        //num 原数据
        //pos 保留几位小数
        fomatFloat: function (num, pos) {
            return Math.round(num * Math.pow(10, pos)) / Math.pow(10, pos);
        },
        //字符长度限制，超出添加省略号
        //obj 对象
        //length 长度
        subString: function (obj, length) {
            $.each(obj, function (index) {
                if (obj.eq(index).text().length > length) {
                    obj.eq(index).text(obj.eq(index).text().substring(0, length - 1) + "...");
                }
            });
        },
        //检查是否存在限制的字符内
        //str 限制字符或字符串
        //charList 要检查的字符串
        IsStrInLimitChars: function (str, charList) {
            var retValue = true;
            if (str.trim().length <= 0) {
                retValue = false;
            }
            else {
                for (var i = 0; i < str.trim().length; i++) {
                    if (charList.indexOf(str.trim().substring(i, i + 1)) < 0) {
                        retValue = false;
                        break;
                    }
                }
            }
            return retValue;
        },
        //缩进0.5em    obj对象
        textIndent: function (obj) {
            $.each(obj, function () {
                var firstChar = $(this).text().substring(0, 1);
                if (firstChar == "《" || firstChar == "【") {
                    $(this).css({ "text-indent": "-0.5em" });
                }
            });
        },
        
        //倒数60s(一般用于验证码)
        //btn_obj按钮 
        //num自定义秒数
        //cover_obj按钮锁遮罩对象隐现
        //stop_time停止时间  当同时多个按钮调用本方法需设置一般值为:(num*调用次数)
        //callback 倒计时结束回调函数
        timerYzm: function (btn_obj, num, cover_obj, stop_time, callback) {
            if (num == null || num == "undefined") {
                num = 60;
            }
            cover_obj.show();
            if (num > 0) {
                btn_obj.html(num + 's后可重发');
                btn_obj.val(num + 's后可重发');
            }
            else {
                if (stop_time == null || stop_time == "undefined") {
                    clearTimeout(timer_yzm);
                }
                else {
                    if (num < -1 * stop_time) {
                        clearTimeout(timer_yzm);
                    }
                }
                btn_obj.html('获取验证码');
                btn_obj.val('获取验证码');
                cover_obj.hide();
                if ((callback && typeof (callback) === "function") && callback()) {
                    callback();
                }
                return;
            }
            timer_yzm = setTimeout(function () {
                wz.method.timerYzm(btn_obj, --num, cover_obj, stop_time, callback)
            }, 1000);
        },
        //倒数60s(一般用于验证码)暂不支持多线程同时执行
        //num自定义秒数
        //begincallback 开始执行回调
        //callback 执行过程回调
        //overtimer 执行结束回调
        /*wz.method.timerYzm_v2.init($("#btn1"), {
                num: 10,
                begincallback: function () {
                },
                callback: function (e) {
                    console.log(e);
                },
                overtimer: function () {
                    console.log("1结束");
                }
            });
        */
        timerYzm_v2: {
            data: {
                num: 60,
                desc: "s后可重发",
                enddesc: "获取验证码",
                copy: null,
                prev: null,
                timer: null
            },
            init: function (obj, options) {
                $.extend(this.data, options);
                this.createLockDom(obj, options);
                this.data.timer = "timer" + obj.attr("id");
                this.data.timer = setInterval(function () {
                    wz.method.timerYzm_v2.doit(obj, options);
                }, 1000);
            },
            doit: function (obj, options) {
                var _data = this.data;
                if (wz.method.timerYzm_v2.data.num > 0) {
                    --wz.method.timerYzm_v2.data.num;
                    obj.html(wz.method.timerYzm_v2.data.num + wz.method.timerYzm_v2.data.desc);
                    obj.val(wz.method.timerYzm_v2.data.num + wz.method.timerYzm_v2.data.desc);
                    if ((options.callback && typeof (options.callback) === "function") && options.callback(wz.method.timerYzm_v2.data.num)) {
                        options.callback(wz.method.timerYzm_v2.data.num);
                    }
                    if (wz.method.timerYzm_v2.data.num == 0) {
                        clearInterval(wz.method.timerYzm_v2.data.timer);
                        //重新添加节点
                        if (obj.next().index() == -1) {//后方没有结点
                            obj.parent().append(wz.method.timerYzm_v2.data.copy);
                        }
                        else {//后方有结点
                            if (obj.prev().index() == -1) {//前方没有结点
                                obj.next().before(wz.method.timerYzm_v2.data.copy);
                            }
                            else {
                                obj.prev().after(wz.method.timerYzm_v2.data.copy);
                            }
                        }
                        wz.method.timerYzm_v2.data.copy.html(wz.method.timerYzm_v2.data.enddesc);
                        wz.method.timerYzm_v2.data.copy.val(wz.method.timerYzm_v2.data.enddesc);
                        obj.remove();
                        if ((options.overtimer && typeof (options.overtimer) === "function") && options.overtimer(wz.method.timerYzm_v2.data.num)) {
                            options.overtimer(wz.method.timerYzm_v2.data.num);
                        }
                    }
                }
                else {
                    clearInterval(wz.method.timerYzm_v2.data.timer);
                    return false;
                }
            },
            createLockDom: function (obj, options) {
                if ((options.begincallback && typeof (options.begincallback) === "function") && options.begincallback()) {
                    options.begincallback();
                }
                obj.val(this.data.num + this.data.desc);
                obj.html(this.data.num + this.data.desc);
                this.data.copy = obj.clone(true);
                obj.unbind("click");
            }
        },
        //百分比方法
        //obj    父容器对象
        //val    比值50/100或50%
        //color  比值条颜色
        //radius 是否为圆角
        //callback
        baifenbi: function (obj, val, valshow, color, radius, callback) {
            obj.css({ "position": "relative", "overflow": "hidden" });
            var width = obj.width(),
                height = obj.height(),
                radius_val = height / 2,
                num1, num2, nowVal;
            if (val == "" || val == null) {
                return false;
            }
            else {
                if (val.indexOf("/") > -1) {
                    num1 = val.split("/")[0];
                    num2 = val.split("/")[1];
                    nowVal = Math.floor((num1 * width) / num2);
                }
                if (val.indexOf("%") > -1) {
                    num1 = val.split("%")[0];
                    num2 = val.split("%")[1];
                    nowVal = Math.floor((num1 * width) / 100);
                }
            }
            if (valshow == "" || valshow == null) {
                valshow = false;
            }
            else {
                if (valshow) {
                    obj.append("<span>" + val + "</span>");
                }
            }
            obj.append("<div></div>");
            obj.find("span").css({ "position": "absolute", "display": "block", "z-index": "1", "width": "100%", "height": "100%", "text-align": "center", "line-height": height + 2 + "px", "font-size": height / 2 + 4 + "px" });
            obj.find("div").css({ "position": "absolute", "z-index": "0", "width": "0px", "height": "100%", "background-color": color });
            if (radius) {
                obj.find("div").css({ "border-radius": height / 2 + "px" });
            }
            obj.find("div").animate({ "width": nowVal + "px" }, 500);
            if ((callback && typeof (callback) === "function") && callback()) {
                callback();
            }
        },
        //返回顶部
        //对象ID
        //startcallback，gobackTop回调函数
        gobackTop: {
            data: {
                obj: null,
                startcallback: function () { },
                gobackTop: function () { }
            },
            init: function (options) {
                $.extend(this.data, options);
                this.doit(options);
            },
            doit: function (options) {
                var data = this.data;
                window.onscroll = function () {
                    if (document.documentElement.scrollTop + document.body.scrollTop > 0) {
                        data.obj.fadeIn(100);
                        if ((data.startcallback && typeof (data.startcallback) === "function") && data.startcallback()) {
                            data.startcallback();
                        }
                    } else {
                        data.obj.fadeOut(100);
                        if ((data.gobackTop && typeof (data.gobackTop) === "function") && data.gobackTop()) {
                            data.gobackTop();
                        }
                    }
                }
                data.obj.on("click", function () {
                    var Timer = setInterval(GoTop, 10);
                    function GoTop() {
                        if (document.documentElement.scrollTop + document.body.scrollTop < 1) {
                            clearInterval(Timer);
                        } else {
                            document.documentElement.scrollTop /= 1.1;
                            document.body.scrollTop /= 1.1;
                        }
                    }
                });
            }
        },
        
        //检查是否点了除当前对象以外的地方
        //id 对象
        //callback 回调函数
        IsClickOther: function (id, callback) {
            $(document).click(function (e) {
                e = window.event || e;
                obj = e.srcElement ? e.srcElement : e.target;
                var array = id.split(",");
                if (obj.id != array[0] && obj.id != array[1]) {
                    if ((callback && typeof (callback) === "function") && callback()) {
                        callback();
                    }
                    return;
                }
            });
        },
       
        }//method结束点
    },
    //startimer开始时间 基本格式2016/01/12 01:11:00
    //endtimer结束时间 基本格式2016/01/12 01:12:00
    djs_timer: {
        data: {
            startimer: "",
            endtimer: "",
            loop: 1000,
            day: "",
            hour: "",
            min: "",
            sec: "",
            timer: null,
            time_data: "over",
            msallow: false
        },
        //startimer开始时间 基本格式2016/01/12 01:11:00
        //endtimer结束时间 基本格式2016/01/12 01:12:00
        //callback 返回实时时间json对象
        //overtimer 整个倒计时结束
        init: function (options) {
            $.extend(this.data, options);
            this.doit(options);
        },
        complete: function (options) {
            clearInterval(wz.djs_timer.data.timer);
            if ((options.overtimer && typeof (options.overtimer) === "function") && options.overtimer(this.data.time_data)) {
                options.overtimer(this.data.time_data);
            }
        },
        doit: function (options) {
            var NowTime;
            NowTime = options.startimer == null ? new Date() : new Date(options.startimer);
            var EndTime = new Date(options.endtimer);

            var d = 0, h = 0, m = 0, s = 0, time_str, t;
            if (wz.djs_timer.data.loop < 1000) {
                console.log("友情提示：loop低于1000ms对于页面性能和常规业务逻辑没任何意义");
                if (!wz.djs_timer.data.msallow) { return false; }
            }
            if (wz.djs_timer.data.loop > EndTime.getTime() - NowTime.getTime()) {
                console.log("友情提示：间隔时间loop大于开始时间到结束时间，没有监听意义，1.检查endtimer是否大于startimer或大于当前本机时间。2.检查loop的值是不是比总时间还大");
                return false;
            }
            else {
                if ((options.begincallback && typeof (options.begincallback) === "function") && options.begincallback()) {
                    options.begincallback();
                }
                if (main()) { }
                else {
                    wz.djs_timer.data.timer = setInterval(function () {
                        main();
                    }, wz.djs_timer.data.loop);
                }
                function main() {
                    t = EndTime.getTime() - NowTime.getTime();
                    if (t >= 0) {//倒计时未结束
                        d = wz.method.fomatFloat(Math.floor(t / wz.djs_timer.data.loop / 60 / 60 / 24) * (wz.djs_timer.data.loop / 1000), 0);
                        h = wz.method.fomatFloat(Math.floor(t / wz.djs_timer.data.loop / 60 / 60 % 24) * (wz.djs_timer.data.loop / 1000), 0);
                        m = wz.method.fomatFloat(Math.floor(t / wz.djs_timer.data.loop / 60 % 60) * (wz.djs_timer.data.loop / 1000), 0);
                        s = wz.method.fomatFloat(Math.floor(t / wz.djs_timer.data.loop % 60) * (wz.djs_timer.data.loop / 1000), 2);

                        //整理数据start
                        NowTime = new Date(NowTime.valueOf() + wz.djs_timer.data.loop);
                        wz.djs_timer.data.day = d < 10 ? "0" + d : d;
                        wz.djs_timer.data.hour = h < 10 ? "0" + h : h;
                        wz.djs_timer.data.min = m < 10 ? "0" + m : m;
                        wz.djs_timer.data.sec = s < 10 ? "0" + s : s;

                        time_str = wz.djs_timer.data.day + wz.djs_timer.data.hour + wz.djs_timer.data.min + wz.djs_timer.data.sec;
                        wz.djs_timer.data.time_data = {
                            "day": "" + wz.djs_timer.data.day + "",
                            "hour": "" + wz.djs_timer.data.hour + "",
                            "min": "" + wz.djs_timer.data.min + "",
                            "sec": "" + wz.djs_timer.data.sec + ""
                        };
                        //整理数据end

                        if (time_str == "00000000") {//倒计时结束
                            wz.djs_timer.complete(options);
                        }
                        else {//倒计时执行中
                            if ((options.callback && typeof (options.callback) === "function") && options.callback(wz.djs_timer.data.time_data)) {
                                options.callback(wz.djs_timer.data.time_data);
                            }
                        }
                    }
                    else {//倒计时结束
                        wz.djs_timer.complete(options);
                        return true;
                    }
                }
            }
        }
    },
    //obj最外框父容器对象
    //data[{"href":"","src":""}]
    //loop自动轮播启动时间
    //IsHavePoint是否有导航小点true/false
    //autoplay自动轮播true/false
    //pointColor单个导航选中颜色 *可选属性
    //pointBgColor单个导航背景颜色 *可选属性
    //lazyload是否启用图片懒加载true/false，配合lazyload.js使用 *可选属性
    //callback回调函数，自定义导航样式
    lunbo: function (obj, udata, loop, IsHavePoint, autoplay, pointColor, pointBgColor, lazyload, cssCallback) {
        var locojoy_lb = {
            data: {
                width: obj.width(),
                height: obj.height(),
                img: udata,
                loop: loop,
                IsHavePoint: IsHavePoint,
                autoplay: autoplay,
                pointColor: pointColor,
                pointBgColor: pointBgColor,
                lazyload: lazyload
            },
            //创建DOM文档、添加样式
            createHTML: function () {
                var data = locojoy_lb.data;
                obj.css({ "position": "relative", "overflow": "hidden", "width": data.width, "height": data.height }).append($("<ul></ul>"));
                var ul = obj.find("ul");
                ul.css({ "position": "absolute", "z-index": "1", "width": data.width * data.img.length, "height": data.height });
                for (var i = 0; i < data.img.length; i++) {
                    if (i == 0) {
                        if (data.img[0].href != "") {
                            ul.append("<li style='z-index:2;'><a href='" + data.img[i].href + "' target='_blank'><img style='width:100%;height:100%;' src='" + data.img[i].src + "' alt=''/></a></li>");
                        }
                    }
                    else {
                        var html;
                        if (data.img[i].href != "") {
                            if (data.lazyload) {
                                html = "<li style='z-index:1;'><a href='" + data.img[i].href + "' target='_blank'><img style='width:100%;height:100%;' data-original='" + data.img[i].src + "' alt=''/></a></li>";
                                //SCRIPT5007: 无法获取未定义或 null 引用的属性“src”
                                //由于数组最后一项的逗号没有去掉，用eval解析的时候， chrome 和 firefox 会忽略掉最后的逗号， IE8则会认为逗号之后还有个undefined，IE6会报错
                            }
                            else {
                                html = "<li style='z-index:1;'><a href='" + data.img[i].href + "' target='_blank'><img style='width:100%;height:100%;' src='" + data.img[i].src + "' alt=''/></a></li>";
                            }
                            ul.append(html);
                        }
                    }
                }
                var li = ul.find("li");
                li.css({ "position": "absolute", "margin": "0", "padding": "0", "width": data.width, "height": data.height, "left": "0", "top": "0", "list-style": "none", "background-size": data.width + "px " + data.height + "px" })
                .find("a").css({ "display": "block", "width": data.width, "height": data.height, "cursor": "pointer" });
                //带指向圆点
                if (data.IsHavePoint) {
                    var data = locojoy_lb.data;
                    obj.append("<dl></dl>");
                    var dl = obj.find("dl");
                    dl.css({
                        "position": "absolute", "z-index": "2", "height": "auto", "width": "auto", "bottom": data.height * 0.02,
                        "left": "50%", "margin-left": -1 * ((data.height * 0.03 * data.img.length) + (data.height * 0.03 * 0.8)) * 0.5
                    });
                    for (var i = 0; i < data.img.length; i++) {
                        dl.append("<dd style='width:" + data.height * 0.03 + "px; height:" + data.height * 0.03 + "px; background-color:" + data.pointBgColor + "; border-radius:50%; float:left;margin:0 " + data.height * 0.03 * 0.8 / data.img.length / 2 + "px; cursor:pointer;'></dd>");
                    }
                    dl.find("dd:first").css({ "background-color": data.pointColor });
                    if ((cssCallback && typeof (cssCallback) === "function") && cssCallback()) {
                        cssCallback();
                    }
                }
                obj.find("dd").on("click", function () {
                    index = $(this).index();
                    obj.find("li").stop();
                    obj.find("li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
                    $(this).css({ "background-color": data.pointColor }).siblings().css({ "background-color": data.pointBgColor });
                });
            },
            //自动轮播事件
            automatic: function () {
                var data = locojoy_lb.data;
                var index = 0;
                var timer;
                picTimer();
                function picTimer() {
                    timer = setInterval(function () {
                        obj.find("li").stop();
                        obj.find("li").eq(index + 1).fadeIn(1000).siblings().fadeOut(1000);
                        obj.find("dd").eq(index + 1).css({ "background-color": data.pointColor }).siblings().css({ "background-color": data.pointBgColor });
                        if (data.lazyload) {
                            obj.find("li").eq(index + 1).find("img").trigger("sporty");
                        }
                        if (index == data.img.length - 1) {
                            index = 0;
                            obj.find("li").eq(0).fadeIn(1000).siblings().fadeOut(1000);
                            obj.find("dd").eq(0).css({ "background-color": data.pointColor }).siblings().css({ "background-color": data.pointBgColor });
                        }
                        else {
                            index++;
                        }
                    }, data.loop);
                }
                obj.find("li,dd").on("mouseout", function () {
                    picTimer();
                });

                obj.find("li,dd").on("mouseover", function () {
                    clearInterval(timer);
                });
            },
        };
        locojoy_lb.createHTML();
        if (locojoy_lb.data.autoplay) {
            locojoy_lb.automatic();
        }
    }
    


};