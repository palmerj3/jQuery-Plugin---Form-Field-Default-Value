/*
Copyright (c) 2011 Jason Palmer, http://www.jason-palmer.com/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
jQuery.fn.DefaultValue = function(text){	
    return this.each(function(){
		//Store reference to input field
		var $input_obj = jQuery(this);
		
		//See if text is supplied or contained in label property
		var default_val = text || $input_obj.attr("label");
					
		//Make sure we're dealing with text-based form fields
		switch(this.type){
			case 'text':
			case 'password':
			case 'textarea':
				break;
			default:
				return;
		}
		
		//Set value initially if none are specified
        if($input_obj.val() =='') {
			$input_obj.val(default_val);
		} else {
			//Other value exists - ignore
			return;
		}
		
		//Remove values on focus
		$input_obj.bind('focus', function() {
			if($input_obj.val() ==default_val || $input_obj.val() =='')
				$input_obj.val('');
		});
		
		//Place values back on blur
		$input_obj.bind('blur',function() {
			if($input_obj.val() == default_val || $input_obj.val() == '')
				$input_obj.val(default_val);
		});
		
		//Capture parent form submission
		//Remove field values that are still default
		$input_obj.parents("form").each(function() {
			//Bind parent form submit
			jQuery(this).bind('submit',function() {
				if($input_obj.val() == default_val && jQuery.fn.DefaultValue.settings.clear_defaults_on_submit == true) {
					$input_obj.val('');
				}
			});
		});
    });
};

jQuery.fn.DefaultValue.settings = {
	'clear_defaults_on_submit':true
}