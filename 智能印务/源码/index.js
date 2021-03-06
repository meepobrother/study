/*应用主体*/
var App = (function () {
    function App(config) {
        this.container = null;
        this.container = $('#' + config.id);
    }
    App.prototype.getContainer = function () {
        return this.container;
    };
    return App;
}());
/*socket.io*/
function createSocket(url) {
    this._io = io.connect(url);
    var socket = this._io;
    this._io.on('connected', function () {
        console.log('您已上线');
    });
    this._io.on('disconnected', function () {
        console.log('您已下线');
    });
    //接收HTML模板
    this._io.on('gameTpl', function (html) {
        console.log('收到:gameTpl');
        app.container.html(html);
    });
    return this._io;
}
/*导航*/
var Nav = (function () {
    function Nav() {
        this.title = '';
        this.action = '';
    }
    return Nav;
}());
/*创建导航项目*/
function createNav(title, action, active) {
    var o = new Nav();
    o.title = title;
    o.action = action;
    o.active = active ? true : false;
    return o;
}
/*导航条*/
var Navbar = (function () {
    /*初始化*/
    function Navbar(id, socket) {
        //导航项目
        this.navs = [];
        this.ele = null;
        this.socket = null;
        this.ele = $('#' + id);
        this.socket = socket;
    }
    Navbar.prototype.init = function () {
        var html = this.bindDom();
        this.ele.html(html);
        //设置激活项目
        this.bindEvent();
    };
    /*绑定到网页*/
    Navbar.prototype.bindDom = function () {
        var html = "<div class='dropdown'>";
        for (var i = 0, len = this.navs.length; i < len; i++) {
            var nav = this.navs[i];
            if (nav.active) {
                console.log(nav.action);
                this.socket.emit(nav.action);
                this.socket.on(nav.action, function (html) {
                    console.log('收到:' + nav.action);
                    app.container.html(html);
                });
                html += "<a data-action='" + this.navs[i].action + "' class='logo active' href='javascript:;'>" + this.navs[i].title + "</a>";
            }
            else {
                html += "<a data-action='" + this.navs[i].action + "' class='logo' href='javascript:;'>" + this.navs[i].title + "</a>";
            }
        }
        html += "</div>";
        return html;
    };
    /*绑定事件*/
    Navbar.prototype.bindEvent = function () {
        var a_logo = this.ele.find('a.logo');
        var mainContainer = $('#mainContainer');
        /*激活标签*/
        var socket = this.socket;
        function activeALogo() {
            var that = $(this);
            a_logo.removeClass('active');
            that.addClass('active');
            var action = that.data('action');
            console.log('请求：' + action);
            socket.emit(action);
            //接收HTML模板
            socket.on(action, function (html) {
                console.log('收到:' + action);
                app.container.html(html);
            });
        }
        a_logo.click(activeALogo);
        a_logo.hover(function () {
            var that = $(this);
            a_logo.removeClass('active');
            that.addClass('active');
        });
    };
    /*添加导航项目*/
    Navbar.prototype.addNav = function (nav) {
        this.navs.push(nav);
    };
    /*删除导航项目*/
    Navbar.prototype.delNav = function (index) {
        this.navs.splice(index, 1);
    };
    return Navbar;
}());
var app = null;
function init() {
    //socket 域名
    var config = {
        id: 'mainContainer',
        socket_url: 'http://192.168.16.39:3001',
        domain_url: 'http://192.168.16.39:3000'
    };
    app = new App(config);
    var socket = createSocket(config.socket_url);
    var navbar = new Navbar('navbar', socket);
    var navbarItems = [
        { title: '首页', action: 'indexTpl', active: true },
        { title: '游戏', action: 'gameTpl' },
        { title: '商城', action: 'shopTpl' },
        { title: '比赛', action: 'batingTpl' },
        { title: '博客', action: 'blogTpl' },
        { title: '论坛', action: 'bbsTpl' },
        { title: '应用', action: 'cloudTpl' },
        { title: '我的', action: 'homeTpl' },
    ];
    for (var i = 0, len = navbarItems.length; i < len; i++) {
        var nav = createNav(navbarItems[i].title, navbarItems[i].action, navbarItems[i].active || false);
        navbar.addNav(nav);
    }
    navbar.init();
}
init();
