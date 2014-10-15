$(document).ready(
    function(){
		
 	
		
		 	 $("#search").click(function () {
				var value=$.trim($("input[type=text]").val());
				if(value.length>0)
				{
		            $(".result").show("slow");
				}else{
					 $(".result").hide();
				}
		        });
	
       

    });