jQuery(document).ready(function(){
    jQuery(".like120").bind("click", function(e) {
        e.preventDefault();
        var a_id = jQuery(this).data('id');
        if(checkCookie(a_id)){
          jQuery.ajax({
            type:'POST',
            data:{action:'like120_action',id:a_id},
            url: "/wp-admin/admin-ajax.php",
            success: function(value) {
              jQuery("span#likedislike_" + a_id).html(value);
            }
          });          
        }
        return false;
    });
    jQuery(".dislike120").bind("click", function(e) {
        e.preventDefault();
        var a_id = jQuery(this).data('id');
        if(checkCookie(a_id)){
          jQuery.ajax({
            type:'POST',
            data:{action:'dislike120_action',id:a_id},
            url: "/wp-admin/admin-ajax.php",
            success: function(value) {
              jQuery("span#likedislike_" + a_id).html(value);
            }
          });          
        }
        return false;
    });
});

function checkCookie(check_val)
{
  var ret = true;

  var re = new RegExp("likedisliked=([^;]+)");
  var value = re.exec(document.cookie);
  if(value != null){
    unescape(value[1]).split(",").map(function(item){
      if(item==check_val){
        ret = false;
      }
    })
  }

  if(ret){
    if(value){
      document.cookie = "likedisliked="+value[1]+","+check_val;
    }else{
      document.cookie = "likedisliked="+check_val;
    }
  }

  return ret;
}