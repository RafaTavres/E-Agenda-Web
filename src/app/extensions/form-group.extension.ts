import { FormGroup } from "@angular/forms";

declare module '@angular/forms'{
    interface FormGroup{
        validate(): string[];
    }
}


FormGroup.prototype.validate = function(){

    const erros: string[] = [];

    for(let campo of Object.keys(this.controls)){
      const controle = this.get(campo);

      if(!controle?.errors)
        continue;
      
      controle.markAsTouched();

     for(let error of Object.keys(controle.errors)){
        switch(error){

          case 'required': erros.push(`o campo ${campo} e obrigatorio`)
            break;

          case 'email':  erros.push(`o campo ${campo} deve seguir um fornmato valido`)
            break;
        }
     }
    }

    return erros;
};