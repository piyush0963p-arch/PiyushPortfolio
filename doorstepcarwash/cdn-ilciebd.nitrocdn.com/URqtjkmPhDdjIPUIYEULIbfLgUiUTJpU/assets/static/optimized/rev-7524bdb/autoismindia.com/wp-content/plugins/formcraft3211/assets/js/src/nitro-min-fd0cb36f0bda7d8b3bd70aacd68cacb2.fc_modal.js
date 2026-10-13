"use strict";
jQuery(document).ready(function () {
  jQuery(document).on("keydown", function (t) {
    if (t.keyCode == 27) {
      jQuery(".fc_close").click();
      jQuery(".fc_close2").click();
      jQuery('[data-dismiss="fc_modal"]').click();
    }
  });
  jQuery("body").on("click focus touchstart", ".fc_close, .close", function () {
    var t = jQuery(this).parents(".fc_modal").attr("id");
    jQuery("#" + t).removeClass("fc_in");
    jQuery(".fc_modal-backdrop").removeClass("fc_in");
    setTimeout(function () {
      jQuery("#" + t).fc_modal("hide");
    }, 200);
  });
  jQuery("body").on(
    "click",
    ".fc_close, .close, .fc_modal-backdrop",
    function () {
      var t = jQuery(this).parents(".fc_modal").attr("id");
      jQuery("#" + t).removeClass("fc_in");
      jQuery(".fc_modal-backdrop").removeClass("fc_in");
      setTimeout(function () {
        jQuery("#" + t).fc_modal("hide");
      }, 200);
    }
  );
  jQuery("body").on("click focus touchstart", ".fc_close2", function () {
    var t = jQuery(this).parents(".fc_modal").attr("id");
    jQuery("#" + t).removeClass("fc_in");
    jQuery(".fc_modal-backdrop").removeClass("fc_in");
    setTimeout(function () {
      jQuery("#" + t).fc_modal("hide");
    }, 200);
  });
  jQuery("body").on("click", ".fc_close2, .fc_modal-backdrop", function () {
    var t = jQuery(this).parents(".fc_modal").attr("id");
    jQuery("#" + t).removeClass("fc_in");
    jQuery(".fc_modal-backdrop").removeClass("fc_in");
    setTimeout(function () {
      jQuery("#" + t).fc_modal("hide");
    }, 200);
  });
});
+(function (t) {
  "use strict";
  function e() {
    var t = document.createElement("bootstrap");
    var e = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend",
    };
    for (var o in e) {
      if (t.style[o] !== undefined) {
        return { end: e[o] };
      }
    }
    return false;
  }
  t.fn.emulateTransitionEnd = function (e) {
    var o = false,
      n = this;
    t(this).one(t.support.transition.end, function () {
      o = true;
    });
    var i = function () {
      if (!o) t(n).trigger(t.support.transition.end);
    };
    setTimeout(i, e);
    return this;
  };
  t(function () {
    t.support.transition = e();
  });
})(jQuery);
+(function (t) {
  "use strict";
  var e = function (e, o) {
    (this.options = o),
      (this.$element = t(e)),
      (this.$backdrop = this.isShown = null),
      this.options.remote && this.$element.load(this.options.remote);
  };
  (e.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
    (e.prototype.toggle = function (t) {
      return this[this.isShown ? "hide" : "show"](t);
    }),
    (e.prototype.show = function (e) {
      var o = this,
        n = t.Event("show.bs.fc_modal", { relatedTarget: e });
      this.$element.trigger(n);
      if (this.isShown || n.isDefaultPrevented()) return;
      (this.isShown = !0),
        this.escape(),
        this.$element.on(
          "click.dismiss.fc_modal",
          '[data-dismiss="fc_modal"]',
          t.proxy(this.hide, this)
        ),
        this.backdrop(function () {
          var n = t.support.transition && o.$element.hasClass("fc_fade");
          o.$element.parent().length || o.$element.appendTo(document.body),
            o.$element.show(),
            n && o.$element[0].offsetWidth,
            o.$element.addClass("fc_in").attr("aria-hidden", !1),
            o.enforceFocus();
          var i = t.Event("shown.bs.fc_modal", { relatedTarget: e });
          n
            ? o.$element
                .find(".fc_modal-dialog")
                .one(t.support.transition.end, function () {
                  o.$element.focus().trigger(i);
                })
                .emulateTransitionEnd(300)
            : o.$element.focus().trigger(i);
        });
    }),
    (e.prototype.hide = function (e) {
      e && e.preventDefault(),
        (e = t.Event("hide.bs.fc_modal")),
        this.$element.trigger(e);
      if (!this.isShown || e.isDefaultPrevented()) return;
      (this.isShown = !1),
        this.escape(),
        t(document).off("focusin.bs.fc_modal"),
        this.$element
          .removeClass("fc_in")
          .attr("aria-hidden", !0)
          .off("click.dismiss.fc_modal"),
        t.support.transition && this.$element.hasClass("fc_fade")
          ? this.$element
              .one(t.support.transition.end, t.proxy(this.hidefc_modal, this))
              .emulateTransitionEnd(300)
          : this.hidefc_modal();
    }),
    (e.prototype.enforceFocus = function () {
      t(document)
        .off("focusin.bs.fc_modal")
        .on(
          "focusin.bs.fc_modal",
          t.proxy(function (t) {
            this.$element[0] !== t.target &&
              !this.$element.has(t.target).length &&
              this.$element.focus();
          }, this)
        );
    }),
    (e.prototype.escape = function () {
      this.isShown && this.options.keyboard
        ? this.$element.on(
            "keyup.dismiss.bs.fc_modal",
            t.proxy(function (t) {
              t.which == 2712 && this.hide();
            }, this)
          )
        : this.isShown || this.$element.off("keyup.dismiss.bs.fc_modal");
    }),
    (e.prototype.hidefc_modal = function () {
      var t = this;
      this.$element.hide(),
        this.backdrop(function () {
          t.removeBackdrop(), t.$element.trigger("hidden.bs.fc_modal");
        });
    }),
    (e.prototype.removeBackdrop = function () {
      this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
    }),
    (e.prototype.backdrop = function (e) {
      var o = this,
        n = this.$element.hasClass("fc_fade") ? "fc_fade" : "";
      if (this.isShown && this.options.backdrop) {
        var i = t.support.transition && n;
        (this.$backdrop = t(
          '<div class="fc_modal-backdrop ' + n + '" />'
        ).appendTo(document.body)),
          this.$element.on(
            "click.dismiss.fc_modal",
            t.proxy(function (t) {
              if (t.target !== t.currentTarget) return;
              this.options.backdrop == "static"
                ? this.$element[0].focus.call(this.$element[0])
                : this.hide.call(this);
            }, this)
          ),
          i && this.$backdrop[0].offsetWidth,
          this.$backdrop.addClass("fc_in");
        if (!e) return;
        i
          ? this.$backdrop
              .one(t.support.transition.end, e)
              .emulateTransitionEnd(150)
          : e();
      } else
        !this.isShown && this.$backdrop
          ? (this.$backdrop.removeClass("fc_in"),
            t.support.transition && this.$element.hasClass("fc_fade")
              ? this.$backdrop
                  .one(t.support.transition.end, e)
                  .emulateTransitionEnd(150)
              : e())
          : e && e();
    });
  var o = t.fn.fc_modal;
  (t.fn.fc_modal = function (o, n) {
    return this.each(function () {
      var i = t(this),
        s = i.data("bs.fc_modal"),
        a = t.extend({}, e.DEFAULTS, i.data(), typeof o == "object" && o);
      s || i.data("bs.fc_modal", (s = new e(this, a))),
        typeof o == "string" ? s[o](n) : a.show && s.show(n);
    });
  }),
    (t.fn.fc_modal.Constructor = e),
    (t.fn.fc_modal.noConflict = function () {
      return (t.fn.fc_modal = o), this;
    }),
    t(document).on(
      "click.bs.fc_modal.data-api",
      '[data-toggle="fc_modal"]',
      function (e) {
        var o = t(this),
          n = o.attr("href"),
          i = t(
            o.attr("data-target") || (n && n.replace(/.*(?=#[^\s]+$)/, ""))
          ),
          s = i.data("fc_modal")
            ? "toggle"
            : t.extend({ remote: !/#/.test(n) && n }, i.data(), o.data());
        e.preventDefault(),
          i.fc_modal(s, this).one("hide", function () {
            o.is(":visible") && o.focus();
          });
      }
    ),
    t(document)
      .on("show.bs.fc_modal", ".fc_modal", function () {
        t(document.body).addClass("fc_modal-open");
      })
      .on("hidden.bs.fc_modal", ".fc_modal", function () {
        t(document.body).removeClass("fc_modal-open");
        t(document.documentElement).removeClass("fc_modal-open");
      });
})(window.jQuery);
