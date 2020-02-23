

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
		maskList:[
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
		var userAvatar = JSON.parse(res.detail.rawData).avatarUrl;
		this.setData({ userAvatar });
	},
	// 点击选择口罩
	dealMaskTap(e) {
		const maskImg = this.data.maskList[e.currentTarget.dataset.index];
		this.setData({ maskImg });
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
			success: function(){
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