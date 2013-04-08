// // offsetRelative (or, if you prefer, positionRelative)
(function($){
    $.fn.offsetRelative = function(top) {
        var $this = $(this);
        var $thisOffset = $this.offset();

        var $top = $(top);
        var $topOffset = $top.offset();

        var offset = {};

        offset.top = $thisOffset.top - $topOffset.top;
        offset.left = $thisOffset.left - $topOffset.left;

        return offset;
    };
    $.fn.positionRelative = function(top){
        return $(this).offsetRelative(top);
    };
}(jQuery));