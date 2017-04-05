var rp = require('../model/views/response');

module.exports = function(router){

  //获取api内容
  router.get('/user/list', function(req, res) {
    var list = [
        {username: 'aaa', nickname: 'hehe', age: 18, sex: 0, desc: 'desc1'},
        {username: 'bbb', nickname: 'xxxx', age: 20, sex: 1, desc: 'desc2'},
        {username: 'ccc', nickname: 'hahaha', age: 22, sex: 0, desc: 'desc3desc3desc3desc3desc3desc3desc3'}
    ];
    res.json(rp.getRes(0, list));
  });
};