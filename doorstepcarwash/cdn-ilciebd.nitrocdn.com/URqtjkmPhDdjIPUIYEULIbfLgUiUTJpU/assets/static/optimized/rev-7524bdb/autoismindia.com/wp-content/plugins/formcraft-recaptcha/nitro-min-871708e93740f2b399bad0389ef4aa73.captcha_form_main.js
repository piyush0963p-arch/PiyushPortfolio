jQuery(document).ready(function () {
  jQuery(".fc-form").each(function () {
    form = jQuery(this);
    var e = form.find(".captcha-placeholder").attr("data-site-key");
    if (typeof e !== "undefined" && e !== "" && window.fc_reCaptcha !== true) {
      jQuery.getScript("https://www.google.com/recaptcha/api.js?render=" + e);
      window.fc_reCaptcha = true;
    }
  });
  jQuery(document).bind("formcraft_submit_trigger", function (e, t, a, r) {
    var c = t.find(".captcha-placeholder").attr("data-site-key");
    var n = t.find(".recaptcha-token").val();
    if (t.find(".recaptcha-token").length === 0) {
      return;
    }
    if (n === "" || typeof n === "undefined") {
      r.abort = true;
      grecaptcha.ready(function () {
        grecaptcha.execute(c, { action: "submit" }).then(function (e) {
          t.find(".recaptcha-token").val(e);
          t.find(".submit-button").prop("disabled", false);
          t.find(".submit-cover").removeClass("disabled");
          FormCraftSubmitForm(t, "all");
        });
      });
    }
  });
  jQuery(document).bind("formcraft_submit_success_trigger", function (e, t, a) {
    t.find(".recaptcha-token").val("");
  });
});
