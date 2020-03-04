

// pages/home/home.js
Page({
    /**
     * 页面的初始数据
     */
	data: {
		userAvatar: '',
		maskImg: '',
		avatarRotate: 0,
		avatarScale: 1,
		isSynthesisOK: false, // 是否已经和称好
		template: {},
		imagePath: '',
		avatarLeft: 0, // 头像left值
		avatarTop: 0, // 头像top值,
		isShowOverlay: false, // 是否显示遮罩层
		maskList: [
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GBEJEQCxCEaAwG*s26w4sDL03oAvDS14B.E412ajvuJ1paB5UA2E1VqDnKPVQG6uwtYUYDErfXsfFu6Udr0fo3M!/b&bo=FgHMABYBzAADCSw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GKvtx0PBovz7p5ACENI7PHCAyByRilAadArNgHLjPWJB5HacoG7t.zbAtSK3TD*vIQn05PWUSbtrEHre9edt*6A!/b&bo=FgHMABYBzAADGTw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GCcZSEed6Ep3pHrJYzNfCu8B49q3G4wwdPTcXglirS19zEBUuIU7nlWaIAlYYcahtCF7jdVqh27tM2.vdg5Bbiw!/b&bo=DgGyAA4BsgADGTw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GNJXDHsNng.z5IwpEkHLceAD96bU3ke6Fd7ERBd5UAVQvnmIyrGxeiQGlzn9vQqE7QpS1ILy5BmnSPQ8Bw3QzK4!/b&bo=DgGyAA4BsgADGTw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GDk6v61HxvVEwzmJqEmcAVFEfoTvMO6MVsxL74SaJW7UJZ3aHf9fLXU*N7OOhD3bxdSKp8POLqCJeKbV2aUeNgk!/b&bo=GgG0ABoBtAADGTw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GBjx.YqT1g8gX5Q1oh1L8BcHMwT*s7ov5vWtFG89pmMexMusLe2TyvaNWvQ9IWYm4lrg4lOdeAh9bJa69lP8H8g!/b&bo=GgG0ABoBtAADGTw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GGFzOjOzSRIONAjHqs2r8lza7Vt54rZWyezzUBrdnMQ1VB2fZJYO4EYljCECq16Y.eEed07Ghfrnsnbo07cYIGg!/b&bo=AQMCAgEDAgIDKQw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GL1VxG3w4dKlQslQwzQQVeJr4uH.YuL2AfBF.FH2dytpQCzgrXTxoVNNa3dFqfitVnG2jHF0qn4fhSIcAViOMzI!/b&bo=*QP2Af0D9gEDKQw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GAXIvyZqyQ9q4PPSyVr7amUsIcJejoYoXNwqgYBYz5Cz5Ww5PTWAKqx3M3JdzGaDuwLpyn2Mr1ABlriRbEEqTrQ!/b&bo=NwOtATcDrQEDKQw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GDyuKWFwtYDu81aUmsb4ND5nVQ7PKu2irsmQPQBG5kH3h8QK4aJiRqjGGc0XGERM2.S8BOaKHJnKmkAU01g6hzk!/b&bo=DwOuAg8DrgIDGTw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GL2sy1KyeupUFGX9Se1KHiCIViAqLWdILaaVUL5hTB19YZMjsGLF0PQ4Yx9VmG7LCFwN4Kqe74zzxtS4Pm16tFQ!/b&bo=NAOpATQDqQEDKQw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GPakltaZ3rxR.PErqFpRLVCZKMQ.RWmzTgoReTF0B3JReSEllCvqnCjJHn.D08YhjOLN*0OVYPZV9Glu9Wf7dmw!/b&bo=cQIJAnECCQIDGTw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GIL005izD7yeLbx1PFMs6rTIiEw6ymfgjbb7bs9aI9OUgIjTBSDxy30Rdpkp1QNMJnndwe6Ri0zNAl9H.926e98!/b&bo=VALvAVQC7wEDGTw!&rf=viewer_4',
			'https://r.photo.store.qq.com/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GK8juXjfqFIpW4ZUZfwxqrL0.wj5qgTmzpPOgyqrdoKQ*6YHSNmCm6aRt8tWptILtumNle1OoJ7ZwIsQnhZM8LY!/r',
			'https://r.photo.store.qq.com/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GBYAG6oJhUXWFhBnuANOkRvPgQ7QoppRG3wzONmsNhiYPE68n1uUpqB72UbxV1X4b*Qb86WXaagYRR3EMdd1fBQ!/r',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GD4cdtiKVTnXzQc8bTnwSD6cUNS*fjhYFacnkIokHHAOWbhb4fVqQav2ufaFQ1ksX9FLviGPF4JE9UM1awliYw8!/b&bo=uwDyALsA8gADGTw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GCBwqe79UmCvHIWy5yqI0rn7x5CvmR*pafaIl1L12hmEkBE2nOHqdGh466J.6MZkdYtBPvD*KGYI4*eqmoAqeZY!/b&bo=rgCcAK4AnAADGTw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GOcbIEt6h*dMYs0TMdslqNKtISigS*yKvWl9e6YxMxcTJODVJ0yIzKm063gkRbDLMbYEYRrMnXhj4v0zphPvGME!/b&bo=rgCcAK4AnAADGTw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GGgOeNe4*4K5kA7WWkLlH336G1s5WKczeZbgSTA4dQb8bkNaSgrmQ*ahzAUr9gOFTk7rkcI1b8ExmeThWjW54m0!/b&bo=gwHDAYMBwwEDGTw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GL3T9k64NF2iMcwvKjps0zceZWyM7DjagsbRMqB87W9xLbvn8XwXiR*msDFG038QKHYtn*AKoHwQxOHrABu1ANk!/b&bo=gwHDAYMBwwEDGTw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GJZvGfXz4Zt4BpTjIQwPDG30iknN9Qi8ALZrZ54CGym3rB0fmLHd3cnxzOQrzD4dB4wbWXIDmjVyqUTx3SPFy24!/b&bo=EgG0ABIBtAADGTw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC178CUE/YWvjNfAyIVey1fwA2tD8GFegKlDRcv.qHOS7IKsotDuZU9Dz9.uTJ82CsZ7zJTKHAYp9fg8r0c0f2*fyKEthpy.AL2c*HafckGm3O1E.ycs!/b&bo=EgG0ABIBtAADGTw!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC14h32V/YWvjNfAyIVey1fwA2tD8GC6lLPv0.fPX5AazZQVjO1UT0v9Tdin*2Q0YdjQ9Ed6NPDHKStqc9YhjIwf4dxwpMNrMV1c*nZ6eDHoMYrK722U!/b&bo=ywCMAAAAAAADB2U!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC14h32V/YWvjNfAyIVey1fwA2tD8GD1*jM29.FGWZnvP0L8On8amPMbSFSHqT8CwGdI1FSMlNlVbWE.wj42ewCgPvQf.037XCRP.ivfn*17CLz9t5DI!/b&bo=dwKPAgAAAAADB9o!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC14h32V/YWvjNfAyIVey1fwA2tD8GO.mmNYOR4yGEXeUXX5KCsCxfBpgOpKhGOy0xxY5i85bufi79Pth1SwyNGrmJ02g4bx2shwWE6nEdyVYje3hBBE!/b&bo=lAKoAgAAAAADBx4!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC14h32V/YWvjNfAyIVey1fwA2tD8GF5KdR4qsR0n6GsJ4JlLFNSUVXa68KiLEAa1h7I5rUUsuK7sxaxKBqHxJYUu2ub*HqfoHgIkK5FDSEc1gUgWz0E!/b&bo=kQEWAQAAAAADB6U!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC14h32V/YWvjNfAyIVey1fwA2tD8GBEjy8THIZBEBXfheyZweBG*48Irc5daGog9R3ke1Qi2cI*Zh2HbltqWQcvMmQugh.Pq6tb.18rvzLXssGT.ymg!/b&bo=kQEWAQAAAAADB6U!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC14h32V/YWvjNfAyIVey1fwA2tD8GBUy3lL3.Lx*ArTon5UhtsF6p1L*4oD3tn9Akyzhw4KgODQ0vvkK9npZd.lDOz2aSlXZVTcxyJD9sF8VpCzhwpQ!/b&bo=CAK5AQAAAAADB5A!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC14h32V/YWvjNfAyIVey1fwA2tD8GFlmVaY5DtWcAi.ZYEhqHvQ.BHAa894V3LzbWUTJKIbD2URJcGDyvhXklO*yt86KF9*QBliy*BLNpZrdV8QdYuk!/b&bo=CAK5AQAAAAADB5A!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC14h32V/YWvjNfAyIVey1fwA2tD8GJbOB4k0FadHPOCFAtwfxnHXSdq5W8T0doA.jS6oJJsK8lztzIYyBaLYHLl0bXF5slh5qxBGGFWfwU2hG6*GhJY!/b&bo=mwB8AAAAAAADB8U!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC14h32V/YWvjNfAyIVey1fwA2tD8GBYJ1t5zWlZlkVoO9cE3iat3W4OIpLoi5Vhm9CW4ePLG7olILNrAdz1WoQWgLztN7xdhn0jWSnS1sAkuCWPwPHE!/b&bo=MwHeAAAAAAADB84!&rf=viewer_4',
			'https://m.qpic.cn/psc?/V13e6DBC14h32V/YWvjNfAyIVey1fwA2tD8GL*tmDdFIAbbQZGMXR.fRfntjnq4gZ4LKQGxdDM3*0O4oeD*l4A1yXe1dS645HQ7O0oBBqq18W*SwjG*RCiZtN0!/b&bo=UQLVAQAAAAADB6U!&rf=viewer_4'
		]
	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		wx.showToast({
			title: '您可以拖动口罩 进行位置的移动',
			icon: 'none',
			duration: 2500
		})
	},

	onChange(event) {
		const num = event.detail.value;
		if (event.currentTarget.dataset.type === "Scale") {
			this.setData({ avatarScale: num * 0.02 });
		} else {
			this.setData({ avatarRotate: (num - 50) * 3.6 });
		}
	},
	// 获取用户头像
	getUserInfo(res) {
		var userAvatar = JSON.parse(res.detail.rawData).avatarUrl.replace('132', '0'); // 增加获取头像的清晰度
		console.log(userAvatar)
		this.setData({ userAvatar });
	},
	// 点击选择口罩
	dealMaskTap(e) {
		const maskImg = this.data.maskList[e.currentTarget.dataset.index];
		this.setData({ maskImg });
	},
	// 点击上传图片
	uploadImg() {
		console.log("上传图片");
		const self = this;
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				const userAvatar = res.tempFilePaths[0]
				console.log(userAvatar)
				self.setData({ userAvatar });
			},
			fail(e) {
				console.log('获取图片失败', e)
			}
		})
	},
	// 声明
	statement() {
		wx.showModal({
			title: '声明',
			content: '欢迎光临~ 本小程序不用于商业用途，只供个人学习交流。所用图片来来自于腾讯新闻、昵图网、百度图片、微信。如果有什么建议欢迎大家提出(fmw3264@163.com)。谢谢使用~(*^▽^*)',
			showCancel: false,
			success(res) {
				if (res.confirm) {
					console.log('用户点击确定')
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	// 点击合成
	dealSynthesis() {
		if (!this.data.userAvatar || !this.data.maskImg) {
			wx.showToast({
				title: '请先获取头像 并选择口罩',
				icon: 'none',
				duration: 2000
			})
			return;
		}
		this.setData({ isShowOverlay: true });
		const self = this;
		wx.createSelectorQuery().selectAll('#mask-img').boundingClientRect(function (rect) {
			const detaLeft = rect[0].left - self.data.avatarLeft + 'px';
			const detaTop = rect[0].top - self.data.avatarTop + 'px';
			const maskHeight = rect[0].height + 'px';
			const maskWidth = rect[0].width + 'px';
			// 设置合成的模板
			self.setData({
				template: {
					background: "#000",
					height: "380rpx",
					width: "380rpx",
					views: [
						// 头像
						{
							type: "image",
							url: self.data.userAvatar,
							css: {
								width: "380rpx",
								height: '380rpx'
							}
						},
						// 口罩
						{
							type: "image",
							url: self.data.maskImg,
							css: {
								width: maskWidth,
								height: maskHeight,
								top: detaTop,
								left: detaLeft
							}
						}
					]
				}
			});
		}).exec();

	},
	// 图片合成成功
	onImgOK(e) {
		console.log('图片合成成功');
		// 设置为已经合成好的状态
		this.setData({
			isSynthesisOK: true,
			isShowOverlay: false
		})
		this.imagePath = e.detail.path;
		this.setData({
			userAvatar: this.imagePath
		});
	},
	// 保存图片
	saveImage() {
		wx.saveImageToPhotosAlbum({
			filePath: this.imagePath,
			success: function () {
				wx.showToast({
					title: '保存成功 请去相册查看',
					icon: 'none',
					duration: 3000
				})
			}
		});
	},
	// 再来一张
	restart() {
		wx.redirectTo({
			url: 'home'
		})
	},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
	onReady: function () {
		const self = this;
		wx.createSelectorQuery().selectAll('#avatar-container').boundingClientRect(function (rect) {
			self.setData({
				avatarLeft: rect[0].left,
				avatarTop: rect[0].top
			})
		}).exec();
	},

    /**
     * 生命周期函数--监听页面显示
     */
	onShow: function () {

	},

    /**
     * 生命周期函数--监听页面隐藏
     */
	onHide: function () {

	},

    /**
     * 生命周期函数--监听页面卸载
     */
	onUnload: function () {

	},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
	onPullDownRefresh: function () {

	},



    /**
     * 页面上拉触底事件的处理函数
     */
	onReachBottom: function () {

	},

    /**
     * 用户点击右上角分享
     */
	onShareAppMessage: function () {
		return {
			title: '口罩头像',
			path: '/pages/home/home?id=123'
		}
	}
})