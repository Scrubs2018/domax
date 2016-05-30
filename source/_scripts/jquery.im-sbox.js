$.fn.imSbox = function() {
  var customSelectbox, nativeSelect;
  if (this.length > 0) {
    nativeSelect = this;
    customSelectbox = function() {
      var active, addScrollbar, customOption, customSelect, deltaY, i, nativeOption, optionCustomClass, optionHeight, optionIcon, parent, resetScroll, scroll, scrollPos, top, _i, _j, _ref, _ref1;
      nativeSelect.hide().wrap('<div class="im-sbox"></div>');
      parent = nativeSelect.parent();
      nativeOption = $('select > option', parent);
      parent.append('<div class="im-sbox-active"></div><div class="im-sbox-select"></div>');
      parent.addClass(nativeSelect.data('class'));
      customSelect = $('.im-sbox-select', parent);
      active = $('.im-sbox-active', parent);
      optionHeight = null;
      for (i = _i = 0, _ref = nativeOption.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (nativeOption.eq(i).data('class')) {
          optionCustomClass = nativeOption.eq(i).data('class');
        } else {
          optionCustomClass = '';
        }
        if (nativeOption.eq(i).data('icon')) {
          optionIcon = "url(" + (nativeOption.eq(i).data('icon')) + ")";
        } else {
          optionIcon = '';
        }
        customSelect.append("<div class=\"im-sbox-option " + optionCustomClass + "\" style=\"background-image: " + optionIcon + ";\">" + (nativeOption.eq(i).text()) + "</div>");
      }
      customOption = $('.im-sbox-option', parent);
      active.text(nativeOption.eq(0).text());
      customOption.eq(0).addClass('im-sbox-option_selected');
      parent.on('click', '.im-sbox-active', function(e) {
        if (nativeSelect.data('scroll')) {
          resetScroll();
        }
        if (!$(e.target).parents('.im-sbox-opened').length) {
          $('.im-sbox-opened').removeClass('im-sbox-opened');
        }
        return parent.toggleClass('im-sbox-opened');
      });
      parent.on('click touchstart', '.im-sbox-option', function() {
        var optionClass;
        optionClass = nativeOption.eq($(this).index()).data('class');
        optionIcon = nativeOption.eq($(this).index()).data('icon');
        if (nativeSelect.data('scroll')) {
          resetScroll();
        }
        active.removeAttr('class').css({
          backgroundImage: ''
        });
        active.text($(this).text()).addClass("im-sbox-active");
        $(this).addClass('im-sbox-option_selected');
        customOption.not($(this)).removeClass('im-sbox-option_selected');
        parent.removeClass('im-sbox-opened');
        nativeOption.not($(this).index()).removeAttr('selected');
        nativeOption.eq($(this).index()).attr('selected', 'selected');
        return nativeSelect.change();
      });
      parent.on('click touchstart', '.im-sbox-option:not(:first-child)', function() {
        return parent.addClass('im-sbox-selected');
      });
      parent.on('click touchstart', '.im-sbox-option:first-child', function() {
        return parent.removeClass('im-sbox-selected');
      });
      parent.on('mouseenter', '.im-sbox-select', function() {
        return customOption.removeClass('im-sbox-option_selected');
      });
      nativeSelect.change(function() {
        var index;
        index = $("option[value='" + ($(this).val()) + "']").index();
        // active.text(nativeOption.eq(index).text());
        customOption.eq(index).addClass('im-sbox-option_selected');
        return customOption.not(customOption.eq(index)).removeClass('im-sbox-option_selected');
      });
      for (i = _j = 0, _ref1 = nativeOption.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        if (nativeOption.eq(i).attr('selected') === 'selected') {
          active.text(nativeOption.eq(i).text());
          customOption.eq(i).addClass('im-sbox-option_selected');
          customOption.not(customOption.eq(i)).removeClass('im-sbox-option_selected');
        }
      }
      if (nativeSelect.data('scroll')) {
        deltaY = null;
        top = null;
        scrollPos = 0;
        customOption.wrapAll('<div class="im-sbox-option-wrap"></div>');
        customSelect.append('<div class="im-sbox-scroll"><span class="im-sbox-scroll-sl"></span></div>');
        scroll = $('.im-sbox-scroll-sl', parent);
        resetScroll = function() {
          var moveY;
          $('.im-sbox-option-wrap, .im-sbox-scroll-sl').css({
            transform: ''
          });
          top = null;
          deltaY = null;
          moveY = null;
          return scrollPos = 0;
        };
        addScrollbar = function() {
          var sbRatio, scWrapHeight, scrollNum, scrollSlideH, scrolling, slHeight, viewportScrollH;
          scrollNum = nativeSelect.data('scroll');
          optionHeight = $('.im-sbox-option', parent).outerHeight();
          viewportScrollH = nativeSelect.data('scroll') * optionHeight;
          scrollSlideH = $('.im-sbox-scroll-sl', parent).height();
          scWrapHeight = optionHeight * customOption.length;
          sbRatio = customOption.length / scrollNum;
          slHeight = viewportScrollH / sbRatio;
          scroll.css({
            height: slHeight
          });
          customSelect.css({
            height: !nativeSelect.data('add-px') ? optionHeight * scrollNum : optionHeight * scrollNum + nativeSelect.data('add-px')
          });
          scrolling = function(top) {
            if (top > customSelect.height() - scroll.height()) {
              top = customSelect.height() - scroll.height();
            } else if (top < 0) {
              top = 0;
            }
            scroll.css({
              transform: "translate(0px, " + top + "px)"
            });
            return $('.im-sbox-option-wrap', parent).css({
              transform: "translate(0px, " + ((-top * sbRatio).toFixed()) + "px)"
            });
          };
          scroll.on('mousedown', function(e) {
            var startY;
            startY = e.pageY;
            return $('body').on('mousemove', function(e) {
              var moveY;
              e.preventDefault();
              moveY = e.pageY;
              deltaY = moveY - startY;
              return scrolling(deltaY + scrollPos);
            });
          });
          $('.im-sbox-option-wrap', parent).on('wheel', function(e) {
            e.preventDefault();
            if (e.originalEvent.deltaY > 0) {
              scrollPos += optionHeight / sbRatio;
            } else {
              scrollPos -= optionHeight / sbRatio;
            }
            return scrolling(scrollPos);
          });
          return $('body').on('mouseup', function() {
            $('body').off('mousemove');
            return scrollPos += deltaY;
          });
        };
        addScrollbar();
      }
      return $(document).on('mousedown', function(e) {
        if (!$(e.target).parents('.im-sbox').length) {
          parent.removeClass('im-sbox-opened');
          if (nativeSelect.data('scroll')) {
            return resetScroll();
          }
        }
      });
    };
    if (arguments[0] === 'update') {
      $('.im-sbox-active, .im-sbox-select', nativeSelect.parent()).remove();
      nativeSelect.unwrap();
      return customSelectbox();
    } else {
      return customSelectbox();
    }
  }
};
