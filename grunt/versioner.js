module.exports = {
  options: { 
    branch: 'master',
    mode: 'production',
    configs: ['pkg']
  },
  default: {
    files: {
      './package.json': [ './package.json'], 
      './bower.json': ['./bower.json'], 
      './README.md': ['./README.md']
    }
  }
}
