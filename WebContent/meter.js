
var token = "gvghvghDSTSDWETRDFTUjhbnjvftSEYTSDygfjhfFYetyFHJbjkBKGHxdtySEYryRYhjbKNVghdTYFITUFghuGFXDTAWawseweqwqWxdwGJHGLKLJHKIUDseyUGHbcdtWE5hjBKbcDTSetGHJcfgSrtHKgfSETYWRYEHJVGHCet5WTYGhjfgfse5yRGUFJGDwr6GJCXdsEYrjkHWzwIbXg";

function getDetails(){
	jQuery.ajax({
        url: "http://localhost:8080/api/meter",
        type: "GET",
        contentType: "application/json", 
        headers: {"Authorization": "Bearer " + token},        
        dataType:'json',
        success: function(data, textStatus, errorThrown) {
            
        	var items = [];
        	
        	$.each(data, function(key, val){
        		items.push("<tr>");
        		items.push("<td>" + val.meterId + "</td>");
                items.push("<td>" + val.userId + "</td>");
        		items.push("<td>" + val.address + "</td>");
        		items.push("<td>" + val.date + "</td>");
                items.push("<td>" + val.units + "</td>");
        		items.push("<tr>");
        	});
        	$("<tbody/>", {html: items.join("")}).appendTo("#all_meters");

        }, 
        error : function(jqXHR, textStatus, errorThrown) {
        		$("#meter_id").text("Sorry! Meter not found!");
        		$("#user_id").text("");
        },
        timeout: 120000,
    });
};

function getDetailsById(){
	jQuery.ajax({
        url: "http://localhost:8080/api/meter/" + parseInt($("#meter_id").val()),
        type: "GET",
        contentType: "application/json", 
        headers: {"Authorization": "Bearer " + token},        
        dataType:'json',
        success: function(data, textStatus, errorThrown) {
            
        	var items = [];
        	
        	
        		items.push("<tr>");
        		items.push("<td>" + data.meterId + "</td>");
        		items.push("<td>" + data.userId + "</td>");
        		items.push("<td>" + data.address  + "</td>");
        		items.push("<td>" + data.date + "</td>");
                items.push("<td>" + data.units + "</td>");
        		items.push("<tr>");
        	
        	$("<tbody/>", {html: items.join("")}).appendTo("#one_meter");

        }, 
        error : function(jqXHR, textStatus, errorThrown) {
        		$("#error_msg").html("<div class=\"alert alert-danger\" role=\"alert\">Meter Not Found!</div>");
        		$("#user_id").text("");
        },
        timeout: 120000,
    });
};

function addMeters(){
	console.log('addWine');
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        headers: {"Authorization": "Bearer " + token},
        url: "http://localhost:8080/api/meter",
        dataType: "json",
        data: AddNewMeterformToJSON(),
        success: function(response){
        	$("#pro_add_msg").html("<div class=\"alert alert-success\" role=\"alert\">Meter added successfuly!</div>");
        },
        error: function(jqXHR, textStatus, errorThrown){
        	$("#pro_add_msg").html("<div class=\"alert alert-danger\" role=\"alert\">Something went wrong!</div>");
        }
    });
};

function removeMeterById(){
	jQuery.ajax({
        url: "http://localhost:8080/api/meter/" + $("#del_meter_id").val(),
        type: "DELETE",
        contentType: "application/json",  
        dataType:'json',
        headers: {"Authorization": "Bearer " + token},
        success: function(data, textStatus, errorThrown) {
        	$("#pro_del_msg").html("<div class=\"alert alert-success\" role=\"alert\">Meter deleted successfuly!</div>");
        },
        error : function(jqXHR, textStatus, errorThrown) {
        	$("#pro_del_msg").html("<div class=\"alert alert-danger\" role=\"alert\">Something went wrong!</div>");
        },
        timeout: 120000,
    });
};


function AddNewMeterformToJSON() {
    return JSON.stringify({
        "meterId" : $('#meter_id').val(),
        "userId" : $('#user_id').val(),
        "address": $('#address').val(),
        "date" : $('#date').val(),
        "units" : $('#units').val(),
       
        
    });
}