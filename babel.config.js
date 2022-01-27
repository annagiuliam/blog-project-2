module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
            debug: false,
            targets: {
              node: 'current'
            }
          }
        ]
      ]
    }
  }
}
