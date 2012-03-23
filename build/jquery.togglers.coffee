jQuery ($) ->
  $.fn.togglers = (opt) -> 
    jos = $(@)
    jos.each ->
      # Prepare the DOM
      @initalize = ->
        map.contain = $("<div class='#{cls.contain}'></div>")
        map.content = $("<div class='#{cls.content}'></div>")
        map.button = $("<a href='#' class='#{cls.button}'></a>")
        map.targets = jos
        map.target = jo
        jo.addClass(cls.is_active).after(map.contain)
        map.contain.append(map.button)
        map.contain.append(map.content)
        map.content.append(jo)
        
      @observers = ->
        sf.observe_hover()
        
      # Respond to user interaction
      @interactions = ->
        map.button.click (e) -> 
          if map.contain.hasClass(cls.active) then sf.hide() else sf.show()
          e.preventDefault()

      @triggers = ->
        # toggle classes
        map.target.bind "_show.#{namespace}", -> map.contain.addClass(cls.active).removeClass(cls.inactive)
        map.target.bind "_hide.#{namespace}", -> map.contain.removeClass(cls.active).addClass(cls.inactive)
        map.target.bind "hover_in.#{namespace}", (e,el) -> map.contain.addClass cls.hovering
        map.target.bind "hover_out.#{namespace}", (e,el) -> map.contain.removeClass cls.hovering
      
      # Load defaults defined in options
      @defaults = ->
        if opt.active == 'true' then sf.show() else sf.hide()
      
      
      #### ### ### ##
      #  functions  #
      #### ### ### ##

      @show = -> 
        map.target.trigger "before_show.#{namespace}", [map]
        map.target.trigger "_show.#{namespace}", [map]
        
      @hide = -> 
        map.target.trigger "before_hide.#{namespace}", [map]
        map.target.trigger "_hide.#{namespace}", [map]
      
      @observe_hover = ->
        map.contain.each -> $(@).hover(
          -> map.target.trigger("hover_in.#{namespace}", [$(@)] )
          -> map.target.trigger("hover_out.#{namespace}", [$(@)] ))
      
      #### ### ### ### ###
      #  initialization  #
      #### ### ### ### ###
  
      sf = @
      jo = $(@)
      namespace = 'togglers'
  
      opt = $.extend {
        active:           'false'
        after_initalize: false
        classes: {
          contain:      "#{namespace}-contain"
          content:      "#{namespace}-content"
          is_active:    "#{namespace}-is_active"
          button:       "#{namespace}-button"
          active:       "#{namespace}-active"
          inactive:     "#{namespace}-inactive"
          hovering:     "#{namespace}-hover"
        }
        lang: {
        }
      }, opt, jo.data()
  
      lang = opt.lang
      cls = opt.classes
      sel = {}; sel[key] = ".#{value}" for key, value of cls
      map = {}
      ref = -> {map: map, opt: opt, sel: sel, cls: cls, lang: lang, namespace: namespace}
      
      find = (k) -> jo.find k
      
      @construct = ->
        sf.initalize() if sf.initalize
        opt.after_initalize ref() if opt.after_initalize
        sf.observers() if sf.observers
        sf.triggers() if sf.triggers
        sf.interactions() if sf.interactions
        sf.defaults() if sf.defaults
  
      # start it up
      @construct()
      
      # return a reference to self for chaining
      return sf