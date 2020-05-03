function getHatenaBlog(){
	$.ajax({
		//はてなrssファイルを読み込む
		//ブログのアドレスの最後にrssをつける
		url:'https://www.tsuyok.work/rss',
		success: function(data){
			console.log(data);

			var htmlstr = "";
			htmlstr += '<div class="recomend">';
			htmlstr += '<h2>最新ブログ記事</h2><div style="text-align: center; padding-bottom: 10px;">' +
				'<a href="https://www.tsuyok.work/" target="_blank">ブログへ</a>' +
				'</div>';
			htmlstr += '<ul>';

			$(data).find("item").each(function (i) {
				var el = $(this);
				var elimg = el.find("enclosure").attr("url");

				htmlstr += '<li class="section">';
				htmlstr += '<p class="imgP"><img src="' + elimg + '" alt="" width="170" ></p>';
				htmlstr += '<a href="' + el.find("link").text() + '" title="' + el.find("title").text() + '" target="_blank">' + el.find("title").text() + '</a>';
				htmlstr += '</li>';

				if(i === 3) { // 表示件数の設定
					return false;
				}
			});

			htmlstr += '</ul>';
			htmlstr += '</div>';

			//footer前に挿入する
			$('#hatena-blog').html(htmlstr);
		}
	});
}

$(function(){
	var
	  winW = $(window).width(),
		winH = $(window).height(),
		nav = $('#mainnav ul a'),
		curPos = $(this).scrollTop();
	
	if (winW < 880){
		var headerH =0;
	}
	else{
		var headerH =63;
	}
	
	$(nav).on('click', function(){
		nav.removeClass('active');
  	var $el = $(this),
		id = $el.attr('href');
 		$('html, body').animate({
   		scrollTop: $(id).offset().top - headerH
 		}, 500);
		$(this).addClass('active');
		if (winW < 880){
			$('#menuWrap').next().slideToggle();
			$('#menuBtn').removeClass('close');
		}
 		return false;
	});
	
	var timer = false;
	$(window).bind('load resize',function(){	
		if (timer !== false){clearTimeout(timer);}
		timer = setTimeout(function(){
			var
				w = $(window).innerWidth(),
				bg = $('.bg'),
				bgH = bg.height();
			
			if(w > 800){
				$(function(){		
			  	$(".vMid").css('height', bgH);
				});
			}
			else{
				$(function(){		
			  	$(".vMid").css({'height':'auto','padding':'50px 20px'});
				});
			}		
		});
	});
	
	$('.panel').hide();
	$('#menuWrap').toggle(function(){
		$(this).next().slideToggle();
		$('#menuBtn').toggleClass('close');
	},
	function(){
		$(this).next().slideToggle();
		$('#menuBtn').removeClass('close');
	});
		
	// $(window).on('scroll', function(){
	// 	var curPos = $(this).scrollTop();
	// 	if(curPos > 80){
	// 		$('#mainnav').addClass('changeNav');
	// 	}
	// 	else{
	// 		$('#mainnav').removeClass('changeNav');
	// 	}
	// });

	getHatenaBlog();
});
