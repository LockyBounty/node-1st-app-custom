// import { get } from "http";

let urlLink = "https://api.mlab.com/api/1/databases/locky_test/collections/beers?apiKey=kSaNvvJFuTYzpEH2jXpT9VtiT1C9MFBv";





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
            url : urlLink,
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

//correspond a un fetch GET
let getBeers = () => { 
    $.ajax({
        url: urlLink
    }).done(function(data){
        let output = '<div>';
        $.each(data, function(key,data){
            output += '<div class="well"> ';
            output += `<h3> ${data.title}</h3>`;
            output += `<p> ${data.type}</p>`;
            output += `<p> ${data.color}</p>`;
            output += `</div>`;
        });
        output += `</div>`;
        $('#beers').html(output);
        //console.log(data); 
    });
}

//Appelle la fonction qui get les datas en cliquant sur le bouton.
$("#bout2").click(getBeers); 