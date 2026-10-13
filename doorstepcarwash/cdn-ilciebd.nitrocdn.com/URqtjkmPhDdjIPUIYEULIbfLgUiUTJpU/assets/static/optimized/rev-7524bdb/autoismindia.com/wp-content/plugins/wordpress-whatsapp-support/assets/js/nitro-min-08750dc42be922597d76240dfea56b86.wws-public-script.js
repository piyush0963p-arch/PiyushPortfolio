var wwsLoader = '<div class="wws-spinner">';
wwsLoader += '<div class="wws-bounce1 wws--bg-color"></div>';
wwsLoader += '<div class="wws-bounce2 wws--bg-color"></div>';
wwsLoader += '<div class="wws-bounce3 wws--bg-color"></div>';
wwsLoader += "</div>";
const wwsWidget = {
  trigger: function (e = "") {
    if ("open" === e) {
      this.open();
      jQuery(document.body).trigger("wws_widget_open");
    } else if ("close" === e) {
      this.close();
      jQuery(document.body).trigger("wws_widget_close");
    } else {
      if (jQuery(".wws-popup").attr("data-wws-popup-status") == "0") {
        this.open();
        jQuery(document.body).trigger("wws_widget_open");
      } else {
        this.close();
        jQuery(document.body).trigger("wws_widget_close");
      }
    }
  },
  open: function () {
    jQuery(".wws-popup").slideDown();
    jQuery(".wws-popup").attr("data-wws-popup-status", "1");
    jQuery(".wws-gradient").show();
  },
  close: function () {
    jQuery(".wws-popup").slideUp();
    jQuery(".wws-popup").attr("data-wws-popup-status", "0");
    jQuery(".wws-gradient").hide();
  },
  autoPopup: function (e) {
    if ("yes" !== sessionStorage.wwsAutoPopup) {
      setTimeout(function () {
        if ("0" == jQuery(".wws-popup").data("wws-popup-status")) {
          wwsWidget.trigger();
        }
        sessionStorage.wwsAutoPopup = "yes";
      }, Number(e * 1e3));
    }
  },
  sendMessage: function (e = "", s = "") {
    if ("" === e || "" === s) {
      return false;
    }
    if (wwsObj.whatsapp_web_api) {
      window.open(wwsObj.whatsapp_web_api + "/" + s + "?text=" + e + "");
    } else if (this.is_mobile.any()) {
      window.open(
        wwsObj.whatsapp_mobile_api + "/send?phone=" + s + "&text=" + e + ""
      );
    } else {
      window.open(
        wwsObj.whatsapp_desktop_api + "/send?phone=" + s + "&text=" + e + ""
      );
    }
    jQuery(document.body).trigger("wws_message_sent");
    return true;
  },
  sendGroupInvitation: function (e) {
    window.open("https://chat.whatsapp.com/" + e);
  },
  is_mobile: {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        wwsWidget.is_mobile.Android() ||
        wwsWidget.is_mobile.BlackBerry() ||
        wwsWidget.is_mobile.iOS() ||
        wwsWidget.is_mobile.Opera() ||
        wwsWidget.is_mobile.Windows()
      );
    },
  },
  logAnalytics: function (e = "N/A", s = "N/A", t = "", o = {}) {
    jQuery.ajax({
      url: wwsObj.admin_url,
      type: "post",
      data: {
        action: "wws_click_analytics",
        message: e,
        number: s,
        through: t,
        support_person_id: o.supportPersonId || "-1",
        security: wwsObj.security_token,
      },
    });
  },
};
(function (e) {
  "use strict";
  jQuery(document).ready(function () {
    function e() {
      var e = jQuery.parseJSON(wwsObj.fb_ga_click_tracking);
      if ("yes" == e.ga_click_tracking_status) {
        try {
          gtag("event", e.ga_click_tracking_event_name, {
            event_category: e.ga_click_tracking_event_category,
            event_label: e.ga_click_tracking_event_label,
          });
        } catch (e) {
          if ("yes" === wwsObj.is_debug) {
            window.console &&
              console.log(
                "WordPress Support Using WhatsApp Google or Facebook analytics error message: " +
                  e.message
              );
          }
        }
        try {
          ga(
            "send",
            "event",
            e.ga_click_tracking_event_category,
            e.ga_click_tracking_event_name,
            e.ga_click_tracking_event_label
          );
        } catch (e) {
          if ("yes" === wwsObj.is_debug) {
            window.console &&
              console.log(
                "WordPress Support Using WhatsApp Google or Facebook analytics error message: " +
                  e.message
              );
          }
        }
        try {
          _gaq.push([
            "_trackEvent",
            e.ga_click_tracking_event_category,
            e.ga_click_tracking_event_name,
            e.ga_click_tracking_event_label,
          ]);
        } catch (e) {
          if ("yes" === wwsObj.is_debug) {
            window.console &&
              console.log(
                "WordPress Support Using WhatsApp Google or Facebook analytics error message: " +
                  e.message
              );
          }
        }
        try {
          window.dataLayer.push({
            event: e.ga_click_tracking_event_name,
            eventCategory: e.ga_click_tracking_event_category,
            eventLabel: e.ga_click_tracking_event_label,
            current_url: window.location.href,
          });
        } catch (e) {
          if ("yes" === wwsObj.is_debug) {
            window.console &&
              console.log(
                "WordPress Support Using WhatsApp Google or Facebook analytics error message: " +
                  e.message
              );
          }
        }
      }
      if ("yes" == e.fb_click_tracking_status) {
        var s = false;
        try {
          if (!s) {
            fbq("trackCustom", "WordPressWhatsAppSupport", {
              event: e.fb_click_tracking_event_name,
              account: e.fb_click_tracking_event_label,
            });
            s = true;
          }
        } catch (e) {
          if ("yes" === wwsObj.is_debug) {
            window.console &&
              console.log(
                "WordPress Support Using WhatsApp Google or Facebook analytics error message: " +
                  e.message
              );
          }
        }
      }
    }
    function s() {
      if ("yes" !== wwsObj.is_gdpr) {
        return;
      }
      if (jQuery(".wws-gdpr input").is(":checked") == false) {
        jQuery(".wws-gdpr > div").addClass("wws-shake-animation");
        setTimeout(function () {
          jQuery(".wws-gdpr > div").removeClass("wws-shake-animation");
        }, 300);
        return false;
      } else {
        return true;
      }
    }
    jQuery(".wws-popup__open-btn, .wws-popup__close-btn").on(
      "click",
      function (e) {
        e.preventDefault();
        wwsWidget.trigger();
      }
    );
    jQuery(document).on("click", ".wws-popup__send-btn", function (t) {
      t.preventDefault();
      if (wwsObj.popup_layout == 8) {
        var o = jQuery(this).attr("data-wws-pre-msg");
        var r = jQuery(this).attr("data-wws-number");
        if (s() == false) return;
        if ("" === o) {
          o = "%20";
        }
        if (wwsWidget.sendMessage(o, r) == true) {
          wwsWidget.logAnalytics(o, "N/A", "Layout 8");
          e();
        }
      }
      if (wwsObj.popup_layout == 7) {
        var i = jQuery(".wws-popup__input").val();
        var w = jQuery(".wws-popup__fields-number").val();
        var r = wwsObj.support_number;
        if (s() == false) return;
        setTimeout(function () {
          jQuery(
            ".wws-popup__fields-textarea-wrapper, .wws-popup__fields-number"
          ).removeClass("wws-shake-animation");
        }, 300);
        if (w == "") {
          jQuery(".wws-popup__fields-number").addClass("wws-shake-animation");
          return;
        }
        if (i == "") {
          jQuery(".wws-popup__fields-textarea-wrapper").addClass(
            "wws-shake-animation"
          );
          return;
        }
        if (wwsWidget.sendMessage(i + wwsObj.pre_defined_text, r) == true) {
          wwsWidget.logAnalytics(i, w, "Layout 7");
          e();
        }
      }
      if (wwsObj.popup_layout == 6) {
        var i = jQuery(".wws-popup__input").val();
        var o = jQuery(".wws-popup-multi-support-pre-essage").val();
        var w = jQuery(".wws-popup__fields-number").val();
        var r = jQuery(".wws-popup-multi-support-number").val();
        var n = jQuery(".wws-popup-multi-support-id").val();
        if (s() == false) return;
        setTimeout(function () {
          jQuery(
            ".wws-popup__fields-textarea-wrapper, .wws-popup__fields-number"
          ).removeClass("wws-shake-animation");
        }, 300);
        if (w == "") {
          jQuery(".wws-popup__fields-number").addClass("wws-shake-animation");
          return;
        }
        if (i == "") {
          jQuery(".wws-popup__fields-textarea-wrapper").addClass(
            "wws-shake-animation"
          );
          return;
        }
        if (wwsWidget.sendMessage(i + o, r) == true) {
          wwsWidget.logAnalytics(i, w, "Layout 6", { supportPersonId: n });
          e();
        }
      }
      if (
        wwsObj.popup_layout == 1 ||
        wwsObj.popup_layout == 2 ||
        wwsObj.popup_layout == 3
      ) {
        var i = jQuery(".wws-popup__input").val();
        var r = wwsObj.support_number;
        if (s() == false) return;
        setTimeout(function () {
          jQuery(".wws-popup__input-wrapper").removeClass(
            "wws-shake-animation"
          );
        }, 300);
        if (0 == i.length) {
          jQuery(".wws-popup__input-wrapper").addClass("wws-shake-animation");
          return;
        }
        if (wwsWidget.sendMessage(i + wwsObj.pre_defined_text, r) == true) {
          if (1 == wwsObj.popup_layout) {
            wwsWidget.logAnalytics(i, "N/A", "Layout 1");
          } else if (2 == wwsObj.popup_layout) {
            wwsWidget.logAnalytics(i, "N/A", "Layout 2");
          } else if (3 == wwsObj.popup_layout) {
            wwsWidget.logAnalytics(i, "N/A", "Layout 3");
          }
          e();
        }
      }
      if (wwsObj.popup_layout == 4) {
        var i = jQuery(".wws-popup__input").val();
        var r = wwsObj.support_number;
        if (wwsWidget.sendMessage(i + wwsObj.pre_defined_text, r) == true) {
          wwsWidget.logAnalytics("N/A", "N/A", "Layout 4");
          e();
        }
      }
    });
    jQuery(".wws-popup__input").on("keypress", function (e) {
      var s = e.which;
      if (s == 13) {
        jQuery(".wws-popup__send-btn").click();
        return false;
      }
    });
    jQuery(".wws-popup-group-invitation__button").on("click", function () {
      wwsWidget.sendGroupInvitation(wwsObj.group_invitation_id);
      wwsWidget.logAnalytics();
      e();
    });
    if ("yes" === wwsObj.auto_popup) {
      wwsWidget.autoPopup(wwsObj.auto_popup_time);
    }
    if (wwsObj.scroll_lenght != null) {
      jQuery(document).on("scroll", function () {
        var e = jQuery(window).scrollTop() + jQuery(window).height();
        var s = (jQuery(document).height() * wwsObj.scroll_lenght) / 100;
        if (e >= s - 10) {
          jQuery(".wws-popup-container").fadeIn();
        } else {
          jQuery(".wws-popup-container").fadeOut();
        }
      });
    }
    jQuery(document).on(
      "click",
      "[data-wws-multi-support-person-id]",
      function () {
        var e = jQuery(this).attr("data-wws-multi-support-person-id");
        jQuery(".wws-popup__support-person-wrapper").hide();
        jQuery(".wws-popup__support-person-form").show();
        jQuery(".wws-popup__support-person-form").html(wwsLoader);
        jQuery
          .ajax({
            url: wwsObj.admin_url,
            type: "post",
            data: {
              action: "wws_view_multi_person_form",
              support_person_id: e,
              post_id: wwsObj.current_page_id,
            },
          })
          .done(function (e) {
            jQuery(".wws-popup__support-person-form").html(e);
            if ("" !== wwsObj.numberMasking) {
              jQuery(".wws-popup__fields-number").inputmask(
                wwsObj.numberMasking
              );
            }
          });
      }
    );
    jQuery(document).on("click", "[data-wws-multi-support-back]", function () {
      jQuery(".wws-popup__support-person-wrapper").show();
      jQuery(".wws-popup__support-person-form").hide();
    });
    if ("" !== wwsObj.numberMasking) {
      jQuery(".wws-popup__fields-number").inputmask(wwsObj.numberMasking);
    }
    jQuery(".wws-shortcode-btn").on("click", function () {
      wwsWidget.logAnalytics("N/A", "N/A", "Shortcode Button");
      e();
    });
    jQuery(".wws-product-query-btn").on("click", function () {
      wwsWidget.logAnalytics("N/A", "N/A", "Woo Query Button");
      e();
    });
    jQuery("[data-wws-agent-call]").on("click", function () {
      var e = jQuery(this).data("wws-agent-call");
      window.open("tel:" + e);
    });
  });
})(jQuery);
