/*全局作用域名*/
/*避免全局污染*/
function Meepo(){
	this.version = '1.0';
	this.name = '米波在线竞技';
	this.member = '';
}
(function(Meepo){
	/*工具类*/
	class Util{
		/*购物车*/
		cart = null;
		/*用户信息*/
		userMessage = null;
		/*socket.io*/
		socket = null;
		/*引用程序初始化*/
		init(callback){
			/*初始化购物车*/
			this.socket = io.connect('http://192.168.16.39:3001');
			this.initCart(function(cart){
				this.cart = cart;
			});
			this.socket.on('connected',function(data){
				//链接初始化数据
				callback(data);
			});
		}
		/*初始化购物车*/
		initCart(callback){
			var cart = new Cart();
			this.socket.emit('getMyCarts',function(data){
				cart.goods = data.goods;
				cart.count = this.goods.length;
				callback(cart);
			});
		}
		/*初始化用户信息*/
		initUserMessage(callback){
			var userMessage = new UserMessages();
			this.socket.emit('getUserMessage',function(data){
				userMessage.messages = data;
			});
		}
		/*创建消息工厂*/
		createMessage(title,content){
			var m = new Message();
			m.title = title;
			m.content = content;
			return m;
		}
		/*商品工厂 加工商品*/
		creatGood(title,price,desc,thumbs,params){
			var g = new Good();
			g.title = title;
			g.price = price;
			g.desc = desc;
			g.thumbs = thumbs;
			g.params = params;
			return g;
		}
	}
	//会员
	class Member{
		/*用户名*/
		username = '';
		/*头像*/
		avatar = '';
		/*标识*/
		openid = '';
		/*密码*/
		password = '';
		/*邮箱*/
		email = '';
		/*手机号码*/
		mobile = '';

		/*登录*/
		login(){
			
		}
		/*注册*/
		register(){

		}
		/*忘记密码*/
		forgetPassword(){

		}
		/*第三方登录*/
		oauth(){

		}
	}
	/*信息*/
	class Message{
		/*消息标题*/
		title = '';
		/*消息内容*/
		content = '';
		/*消息状态 0未读 1已读*/
		status = 0;
		/*发送消息*/
		sendMessage(){

		}
		/*接收消息*/
		recive(){

		}
	}
	/*用户消息*/
	class UserMessages{
		/*用户标识*/
		openid:'';
		/*消息*/
		messages:[];
		/*新增一条消息*/
		addMessage(message){
			/*未读消息*/
			message.status = 0;
			this.messages.push(message);
		}
		readMessage(index){
			/*消息已读*/
			this.messages[index].status = 1;
			return this.messages[index];
		}
		//移除一条消息
		removeMessage(index){
			this.messages.splice(index,1);
		}
	}
	/*商品*/
	class Good{
		/*标题*/
		title = '';
		/*价格*/
		price = 0;
		/*简介*/
		desc = '';
		/*图片幻灯片*/
		thumbs = [];
		/*属性规格*/
		params = {};
	}
	/*购物车*/
	class Cart{
		/*订单总数*/
		count = 0;
		/*商品s*/
		goods = [];
		/*设商品*/
		setGoods(goods){
			this.goods = goods;
		}
		getGoods(goods){
			return this.goods;
		}
		/*添加到购物车*/
		addToCarts(good){
			this.goods.push(good);
		}
		removeFromCarts(index){
			this.goods.splice(index,1);
		}
	}
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
