$(function () {
    "use strict";
    var contactForm = $("#contact_form"),
        response = {},
        validationMessage = {
          "nameValidation"              : "Please Enter Your Name",
          "emailValidation"             : "Please Use Valid Email",
          "messageValidation"           : "The Message Can't Be Empty",
          "phoneValidation"             : "The Phone Number must be numbers!",
          "messageAboutValidation"      : "Please enter the title of the message",
          "SuccessMessage"              : "Your Message Has Been Sent"
        },
        sendingMessage = false;
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    function validateEmpty(str) {
      var re = /\S/;
      return re.test(str)
    }
    function validatePhone(str) {
      var re = /^[0-9]*$/;
      return re.test(str);
    }
    function add_error (errprType) {
      response["Error"] = true;
      if (!response["ErrorType"]) {
        response["ErrorType"] = [];
      }
      response["ErrorType"].push(errprType);
    }
    function append_response () {
      if (response["Error"]) {
        for (var i = 0; i < response["ErrorType"].length; i++) {
          $("[data-"+ response["ErrorType"][i] +"]").addClass("arpitErrorInput").parent().append("<p class='arpitAlert arpitError'>" +  validationMessage[response["ErrorType"][i]]  +"</p>");
        }
      } else {
        contactForm.prepend("<p class='arpitAlert arpitSuccess'>" + validationMessage["SuccessMessage"]  + "</p>");
        contactForm.find("input, textarea").val("");
      }
    }
    contactForm.on("submit", function(event) {
      event.preventDefault();
      if (!sendingMessage) {
        sendingMessage = true;
        var thisForm = $(this);
        response = {};
        thisForm.find(".arpitAlert").remove();
        thisForm.addClass("arpit-submiting").find("*").removeClass("arpitErrorInput");
        thisForm.find("[type=submit]").attr('disabled', 'disabled');
        var full_name     = thisForm.find("[name=full_name]").val(),
            email         = thisForm.find("[name=email]").val(),
            message       = thisForm.find("[name=message]").val(),
            phone         = thisForm.find("[name=phone]").val(),
            messageAbout  = thisForm.find("[name=messageAbout]").val();

        if (!validateEmpty(full_name)) {
          add_error("nameValidation")
        }
        if (!validateEmail(email)) {
          add_error("emailValidation");
        }
        if (!validateEmpty(message)) {
          add_error("messageValidation");
        }
        if (!validateEmpty(messageAbout)) {
          add_error("messageAboutValidation");
        }
        if (!validatePhone(phone) || !validateEmpty(phone)) {
          add_error("phoneValidation");
        }
        if (jQuery.isEmptyObject(response)) {
          response["Error"] = false;
          response = {};
          $.post('php/sendMessage.php', thisForm.serialize(),function(result) {
            response = JSON.parse(result);
            append_response();
            thisForm.removeClass("arpit-submiting");
            sendingMessage = false;
            thisForm.find("[type=submit]").removeAttr("disabled")
          });
        } else {
          console.log(response)
          append_response();
          thisForm.removeClass("arpit-submiting");
          thisForm.find("[type=submit]").removeAttr("disabled")
          sendingMessage = false;
        }
      }
    });
});
