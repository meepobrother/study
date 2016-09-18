/*全局作用域名*/
/*避免全局污染*/
function Meepo() {
    this.version = '1.0';
    this.name = '米波在线竞技';
    this.member = '';
}
(function (Meepo) {
    /*工具类*/
    var Util = (function () {
        function Util() {
            /*购物车*/
            this.cart = null;
            /*用户信息*/
            this.userMessage = null;
            /*socket.io*/
            this.socket = null;
        }
        /*引用程序初始化*/
        Util.prototype.init = function (callback) {
            /*初始化购物车*/
            this.socket = io.connect('http://192.168.16.39:3001');
            this.initCart(function (cart) {
                this.cart = cart;
            });
            this.socket.on('connected', function (data) {
                //链接初始化数据
                callback(data);
            });
        };
        /*初始化购物车*/
        Util.prototype.initCart = function (callback) {
            var cart = new Cart();
            this.socket.emit('getMyCarts', function (data) {
                cart.goods = data.goods;
                cart.count = this.goods.length;
                callback(cart);
            });
        };
        /*初始化用户信息*/
        Util.prototype.initUserMessage = function (callback) {
            var userMessage = new UserMessages();
            this.socket.emit('getUserMessage', function (data) {
                userMessage.messages = data;
            });
        };
        /*创建消息工厂*/
        Util.prototype.createMessage = function (title, content) {
            var m = new Message();
            m.title = title;
            m.content = content;
            return m;
        };
        /*商品工厂 加工商品*/
        Util.prototype.creatGood = function (title, price, desc, thumbs, params) {
            var g = new Good();
            g.title = title;
            g.price = price;
            g.desc = desc;
            g.thumbs = thumbs;
            g.params = params;
            return g;
        };
        return Util;
    }());
    //会员
    var Member = (function () {
        function Member() {
            /*用户名*/
            this.username = '';
            /*头像*/
            this.avatar = '';
            /*标识*/
            this.openid = '';
            /*密码*/
            this.password = '';
            /*邮箱*/
            this.email = '';
            /*手机号码*/
            this.mobile = '';
        }
        /*登录*/
        Member.prototype.login = function () {
        };
        /*注册*/
        Member.prototype.register = function () {
        };
        /*忘记密码*/
        Member.prototype.forgetPassword = function () {
        };
        /*第三方登录*/
        Member.prototype.oauth = function () {
        };
        return Member;
    }());
    /*信息*/
    var Message = (function () {
        function Message() {
            /*消息标题*/
            this.title = '';
            /*消息内容*/
            this.content = '';
            /*消息状态 0未读 1已读*/
            this.status = 0;
        }
        /*发送消息*/
        Message.prototype.sendMessage = function () {
        };
        /*接收消息*/
        Message.prototype.recive = function () {
        };
        return Message;
    }());
    /*用户消息*/
    var UserMessages = (function () {
        function UserMessages() {
        }
        /*新增一条消息*/
        UserMessages.prototype.addMessage = function (message) {
            /*未读消息*/
            message.status = 0;
            this.messages.push(message);
        };
        UserMessages.prototype.readMessage = function (index) {
            /*消息已读*/
            this.messages[index].status = 1;
            return this.messages[index];
        };
        //移除一条消息
        UserMessages.prototype.removeMessage = function (index) {
            this.messages.splice(index, 1);
        };
        return UserMessages;
    }());
    /*商品*/
    var Good = (function () {
        function Good() {
            /*标题*/
            this.title = '';
            /*价格*/
            this.price = 0;
            /*简介*/
            this.desc = '';
            /*图片幻灯片*/
            this.thumbs = [];
            /*属性规格*/
            this.params = {};
        }
        return Good;
    }());
    /*购物车*/
    var Cart = (function () {
        function Cart() {
            /*订单总数*/
            this.count = 0;
            /*商品s*/
            this.goods = [];
        }
        /*设商品*/
        Cart.prototype.setGoods = function (goods) {
            this.goods = goods;
        };
        Cart.prototype.getGoods = function (goods) {
            return this.goods;
        };
        /*添加到购物车*/
        Cart.prototype.addToCarts = function (good) {
            this.goods.push(good);
        };
        Cart.prototype.removeFromCarts = function (index) {
            this.goods.splice(index, 1);
        };
        return Cart;
    }());
    //工具类赋值
    Meepo.Util = new Util();
    Meepo.Member = Member;
    Meepo.Message = Message;
    Meepo.UserMessages = UserMessages;
    Meepo.Good = Good;
    Meepo.Cart = Cart;
    return Meepo;
}(Meepo));
console.log(Meepo.toString());
