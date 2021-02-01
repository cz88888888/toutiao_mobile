module.exports = {
    plugins: {
        // VueCLI 内部已经配置了 autoprefixer ，所有会有警告
        // autoprefixer: {
        //     browsers: ['Android >= 4.0', 'iOS >= 8'],
        // },
        'postcss-pxtorem': {
            // rootValue 支持两种类型的参数: 数字和函数
            // rootValue: 37.5,
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            propList: ['*'],
            // 配置不要转换的样式资源
            exclude: 'github-markdown',
        },
    },
};
