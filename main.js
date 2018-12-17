$(document).ready(function(){
    $('#add-beer').on('submit', function(e){
        e.preventDefault();
        let title = $('#title').val();
        let type = $("#type").val();
        let color = $('#color').val();


        // copier/coller avec modif de https://docs.mlab.com/data-api/ section jQuery
        //Original :
        /*
        $.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey",
		  data: JSON.stringify( { "x" : 1 } ),
		  type: "POST",
		  contentType: "application/json" } );
        */

        $.ajax({
            url : "https://api.mlab.com/api/1/databases/locky_test/collections/beers?apiKey=kSaNvvJFuTYzpEH2jXpT9VtiT1C9MFBv",
            data: JSON.stringify( { 
                "title" : title,
                "type" : type,
                "color" : color
             } ),
            type: "POST",
            contentType: "application/json",
            success: function(data){
                window.location.href='index.html'
            },
            error : function(xhr, status, err){
                console.log(err);
            }
        });
    });
});