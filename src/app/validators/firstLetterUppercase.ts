import { AbstractControl, ValidatorFn } from "@angular/forms";
import { AbstractConstructor } from "@angular/material/core/common-behaviors/constructor";

export function firstLetterUppercase(): ValidatorFn
{
    return (control: AbstractControl) =>
    {
        let value = <string>control.value;
        if(!value)
        {
            return;
        }
        if(value.length === 0)
        {
            return;
        }

        let firstLetter = value[0];
        if( firstLetter !== firstLetter.toUpperCase()){
            return{
                firstLetterUppercase:
                {
                    message: 'The first letter must be uppercase'
                }
            }
        }
        return;
    }
}
