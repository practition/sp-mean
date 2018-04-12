import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name : 'abs'
} )
export class AbsPipe implements PipeTransform {

  transform( value: any, args?: any ): any {
    const nValue = Number( value );
    if ( isNaN( nValue ) ) {
      return value;
    } else {
      return Math.abs( nValue );
    }
  }

}
