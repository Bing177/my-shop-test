/* 
	该文件用于生成用户登录时，生成的Token字段，用于判断否登录状态等作用
 */
const express = require('express')
const {
	expressjwt
} = require('express-jwt')
const jwt = require('jsonwebtoken')

const app = express()

// 定义密钥
const secretkey = '~@HI^Bing@~'

// 配置全局中间件：解析表单数据
app.use(express.urlencoded({
	extended: false
}))
app.use(express.json())

// 配置expressJWT全局中间件：还原加密的Token
app.use(expressjwt({
	secret: secretkey,
	algorithms: ['HS256']
}).unless({
	path: /^\/api\//
})) //注：以/api/开头接口无需token认证

// 用户登录接口【无需权限认证】
app.post('/api/users/login', (req, res) => {
	const {
		rawData
	} = req.body
	let token = jwt.sign({
		rawData
	}, secretkey, {
		expiresIn: '1h'
	})
	res.send({
		meta: {
			status: 200,
			msg: 'succeed',
			token: 'Bearer ' + token
		}
	}).end()
})

// 生成订单接口【需要权限认证】
app.post('/user/my/order', (req, res) => {
	// 生成随机订单号
	const order_number = String(Math.random()).substring(2)
	res.send({
		meta: {
			status: 200,
			msg: '创建订单成功',
		},
		message: {
			order_number
		}
	}).end()
})

//订单预支付接口：生成需要支付的参数对象
app.post('/user/my/pay', (req, res) => {
	function getRandomStr(n) {
		const x = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
		let str = ''
		for (let i = 0; i < n; ++i) {
			str += x[parseInt(Math.random() * x.length)]
		}
		return str
	}
	let nonceStr = getRandomStr(16)
	let pkg = 'prepay_id=wx' + getRandomStr(32)
	res.send({
		meta: {
			status: 200,
			msg: '预付款订单生成成功',
		},
		message: {
			pay: {
				timeStamp: String(Date.now()),
				nonceStr: nonceStr,
				package: pkg,
				signType: 'MD5',
				paySign: 'AD04ED5A3864E176A5DF26CF436'
			}
		}
	}).end()
})

// 订单支付
app.post('/user/my/pay-detail', (req, res) => {
	res.send({
		meta: {
			status: 200,
			msg: '订单支付成功'
		}
	})
})
app.listen(3300, err => {
	if (err) return err
	console.log('http://localhost:3300');
})
