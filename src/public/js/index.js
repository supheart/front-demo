window.onload = function() {
  console.log('start index page...');

  var mess = document.getElementById('mess');
  if(window.WebSocket){
    var ws = new WebSocket('ws://127.0.0.1:3001');

    ws.onopen = function(e){
      console.log('连接服务区成功！');
      ws.send('gamel');
    }

    ws.onclose = function(e){
      console.log('服务器关闭！');
    }

    ws.onerror = function(){
      console.log('连接出错');
    }

    ws.onmessage = function(e){
      mess.innerHTML = '连接成功';
      document.querySelector('.kuang').onclick = function(e) {
        var time = new Date();
        ws.send(time + 'game click：' + e.target.innerHTML);
      }
    }
  }
};