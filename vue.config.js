module.exports = {
        publicPath: '/zkyc-mp',
        assetsDir: 'static', // 打包后静态资源路径
        productionSourceMap: false,
        css: {
            loaderOptions: {
                postcss: {
                    plugins: [
                        require('postcss-pxtorem')({
                            rootValue : 75, // 换算的基数
                            // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
                            //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
                            selectorBlackList  : ['van-'], 
                            propList   : ['*'],
                        }),
                    ]
                }
            }
        },
    devServer: {
		host: '0.0.0.0', // 服务启动时的主机名
		port: 8080, // 端口号
		// proxy: { // 代理设置
		// 	'/api': {
		// 		target: '<url>',
		// 		ws: true,
		// 		changeOrigin: true
		// 	}
		// },
		open: true // 自动打开浏览器
	}
    }