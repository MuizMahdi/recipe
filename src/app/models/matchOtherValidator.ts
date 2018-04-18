import {FormControl} from '@angular/forms';


export function matchOtherValidator (otherControlName: string) 
{

  let thisControl: FormControl;
  let otherControl: FormControl;

  return function matchOtherValidate (control: FormControl) 
  {

    if (!control.parent) // if the control isn't real
    {
      return null;
    }

    // Initializing the validator.
    if (!thisControl) // if thisControl isn't already set:
    {
      thisControl = control; // set it to the parameter
      otherControl = control.parent.get(otherControlName) as FormControl; // while otherControl is the parent (other) control

      if (!otherControl) // If no other control
      {
        throw new Error('matchOtherValidator(): other control is not found in parent group');
      }

      otherControl.valueChanges.subscribe(() => { 
        thisControl.updateValueAndValidity();
      });
    }

    if (!otherControl) 
    {
      return null;
    }

    if (otherControl.value !== thisControl.value)  // if they aren't equal
    {
      return { matchOther: true };
    }

    return null;

  }

}