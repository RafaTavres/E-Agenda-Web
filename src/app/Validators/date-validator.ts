import { FormControl, ValidationErrors } from '@angular/forms';

export class DateValidator {
   static ptDate(control: FormControl): ValidationErrors {
       let ptDatePattern = new RegExp('\d{1,2}\/\d{1,2}\/\d{2,4}');
       
        if (!control.value.match(ptDatePattern))
            return { "ptDate": true };

        return { "ptDate": false };;
   }

}