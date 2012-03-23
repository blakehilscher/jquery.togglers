(function() {
  jQuery(function($) {
    return $.fn.togglers = function(opt) {
      var jos;
      jos = $(this);
      return jos.each(function() {
        var cls, find, jo, key, lang, map, namespace, ref, sel, sf, value;
        this.initalize = function() {
          map.contain = $("<div class='" + cls.contain + "'></div>");
          map.content = $("<div class='" + cls.content + "'></div>");
          map.button = $("<a href='#' class='" + cls.button + "'></a>");
          map.targets = jos;
          map.target = jo;
          jo.addClass(cls.is_active).after(map.contain);
          map.contain.append(map.button);
          map.contain.append(map.content);
          return map.content.append(jo);
        };
        this.observers = function() {
          return sf.observe_hover();
        };
        this.interactions = function() {
          return map.button.click(function(e) {
            if (map.contain.hasClass(cls.active)) {
              sf.hide();
            } else {
              sf.show();
            }
            return e.preventDefault();
          });
        };
        this.triggers = function() {
          map.target.bind("_show." + namespace, function() {
            return map.contain.addClass(cls.active).removeClass(cls.inactive);
          });
          map.target.bind("_hide." + namespace, function() {
            return map.contain.removeClass(cls.active).addClass(cls.inactive);
          });
          map.target.bind("hover_in." + namespace, function(e, el) {
            return map.contain.addClass(cls.hovering);
          });
          return map.target.bind("hover_out." + namespace, function(e, el) {
            return map.contain.removeClass(cls.hovering);
          });
        };
        this.defaults = function() {
          if (opt.active === 'true') {
            return sf.show();
          } else {
            return sf.hide();
          }
        };
        this.show = function() {
          map.target.trigger("before_show." + namespace, [map]);
          return map.target.trigger("_show." + namespace, [map]);
        };
        this.hide = function() {
          map.target.trigger("before_hide." + namespace, [map]);
          return map.target.trigger("_hide." + namespace, [map]);
        };
        this.observe_hover = function() {
          return map.contain.each(function() {
            return $(this).hover(function() {
              return map.target.trigger("hover_in." + namespace, [$(this)]);
            }, function() {
              return map.target.trigger("hover_out." + namespace, [$(this)]);
            });
          });
        };
        sf = this;
        jo = $(this);
        namespace = 'togglers';
        opt = $.extend({
          active: 'false',
          after_initalize: false,
          classes: {
            contain: "" + namespace + "-contain",
            content: "" + namespace + "-content",
            is_active: "" + namespace + "-is_active",
            button: "" + namespace + "-button",
            active: "" + namespace + "-active",
            inactive: "" + namespace + "-inactive",
            hovering: "" + namespace + "-hover"
          },
          lang: {}
        }, opt, jo.data());
        lang = opt.lang;
        cls = opt.classes;
        sel = {};
        for (key in cls) {
          value = cls[key];
          sel[key] = "." + value;
        }
        map = {};
        ref = function() {
          return {
            map: map,
            opt: opt,
            sel: sel,
            cls: cls,
            lang: lang,
            namespace: namespace
          };
        };
        find = function(k) {
          return jo.find(k);
        };
        this.construct = function() {
          if (sf.initalize) {
            sf.initalize();
          }
          if (opt.after_initalize) {
            opt.after_initalize(ref());
          }
          if (sf.observers) {
            sf.observers();
          }
          if (sf.triggers) {
            sf.triggers();
          }
          if (sf.interactions) {
            sf.interactions();
          }
          if (sf.defaults) {
            return sf.defaults();
          }
        };
        this.construct();
        return sf;
      });
    };
  });
}).call(this);
