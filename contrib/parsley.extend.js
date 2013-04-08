window.ParsleyConfig = window.ParsleyConfig || {};

(function ($) {
  window.ParsleyConfig = $.extend( true, {}, window.ParsleyConfig, {
    validators: {
      username: function ( val, url, self ) {
        var result = null,
              data = {},
          dataType = {};

        data[ self.$element.attr( 'name' ) ] = val;

        if ( 'undefined' !== typeof self.options.remoteDatatype ) {
          dataType = { dataType: self.options.remoteDatatype };
        }

        var manage = function ( isConstraintValid, message ) {
          // remove error message if we got a server message, different from previous message
          if ( 'undefined' !== typeof message && 'undefined' !== typeof self.Validator.messages.username && message !== self.Validator.messages.username ) {
            $( self.ulError + ' .remote' ).remove();
          }

          self.updtConstraint( { name: 'username', valid: isConstraintValid }, message );
          self.manageValidationResult();
        };

        // transform string response into object
        var handleResponse = function ( response ) {
          if ( 'object' === typeof response ) {
            if ('objects' in response) {
              if (response.objects.length > 0){
                response = {'error': self.Validator.messages.username };
                return response;
              }
            }
          }

          try {
            response = $.parseJSON( response );
          } catch ( err ) {}

          return {'success': 'ok'};
        };

        var manageErrorMessage = function ( response ) {
          return 'object' === typeof response && null !== response ? ( 'undefined' !== typeof response.error ? response.error : ( 'undefined' !== typeof response.message ? response.message : null ) ) : null;
        };

        $.ajax( $.extend( {}, {
            url: '/api/v1/users/',
            data: data,
            type: self.options.remoteMethod || 'GET',
            success: function ( response ) {
            response = handleResponse( response );
            manage( 1 === response || true === response || ( 'object' === typeof response && null !== response && 'undefined' !== typeof response.success ), manageErrorMessage( response )
            );
          },
            error: function ( response ) {
            response = handleResponse( response );
            manage( false, manageErrorMessage( response ) );
          }
        }, dataType ) );

        return result;
      }
    },
    messages: {
        'username': 'This username is already in use.'
    }
  });
}(window.jQuery || window.Zepto));
