<template>
	<div id="wf">
		<div v-for="item in items">
			<img v-bind:src="item.src">
		</div>
	</div>
</template>

<script>
	/*
	 * init 瀑布流
	 */
	var $items, itemWidth, time
	// window事件监听resize事件 拖动窗口大小时触发
	window.addEventListener('resize', function () {
		clearTimeout(time) //清除当前瀑布流
		time = setTimeout(function () {
			wf.arrange();
		}, 500);
	});
	/**
	 * 时间大小的设置决定是先加载img还是arrange布局
	 */
	 setTimeout(function () {
	 	$items = document.querySelectorAll('#wf div');
	 	itemWidth = $items[0].offsetWidth;
	 	console.log(itemWidth);
	 	wf.arrange();
	 }, 0);

	 /**
	 * 随机高度，随机图片，布局函数
	 */
	 var wf = {
	 	rdmImg: function () {
	 		var width = Math.floor(Math.random() * 100) + 300,
	 			height = Math.floor(Math.random() * 500) + 300
	 		return "http://placekitten.com/" + height + '/' + width; //返回图片
	 	},
	 	rdmHeight: function () {
	 		return Math.round(Math.random() * 200) + itemWidth;
	 	},
	 	arrange: function () {
	 		var viewWidth = document.documentElement.clientWidth || document.body.clientWidth; //兼容写法
	 		var cols = Math.floor(viewWidth / itemWidth);
	 		//存放每列当前长度的数组并初始化
	 		var colsHeight = [];
	 		for (var i=0;i< cols;i++) { //cols = 5
	 			colsHeight.push(0)
	 		}
	 		// console.log(colsHeight);
	 		//安置每一项item
	 		$items.forEach(function (ele, idx) {
	 			// console.log(ele + '_' +idx);
	 			var curHeight = colsHeight[0], col = 0;
	 			console.log(colsHeight[0]);
	 			for (var i=0;i< colsHeight.length;i++) {
	 				if (colsHeight[i] < curHeight) {
	 					curHeight = colsHeight[i]
	 					col = i;
	 				}
	 			}
	 			ele.style.left = col * itemWidth + 'px';
 			    ele.style.top = curHeight + 'px';
 			    ele.style.height = wf.rdmHeight() + 'px';
 			    //console.log(ele.querySelector('img').src); // http://localhost:8080/

 			    colsHeight[col] += ele.offsetHeight;
	 		});
	 	}
	 }

	 /**
	  * export数据层
	  */
	 var items = (function(){
	        var arr = new Array();
	         for(var i= 0; i< 10; i++){
	             var img = {}; //创建对象字面量
	             img.src = wf.rdmImg();
	             arr.push(img);
	         }
	         return arr;
	   })();

	 //vue数据层
	 export default{
	     data () {
	       return {
	         items: items,
	       }
	     }
	 }

</script>

<style>
	#wf{
		position: relative;
		margin:0 auto;

	}
	#wf div{
		width: 200px;
		position: absolute;
		top:0;
		left:50%;
		padding:20px;
		border-radius: 4px;
		transition: left 1s;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0,0,0,.2);
	}
	#wf div img{
		width:100%;
		position: relative;
		top:50%;
		transform: translateY(-50%);
	}	

</style>