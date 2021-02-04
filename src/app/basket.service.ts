import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SecurityProfileSecurityProfileService} from "../openapi3/aether/2.0.0/services/security-profile-security-profile.service";
import {Service as AetherV200TargetService} from "../openapi3/aether/2.0.0/services/service";
import {ApiService} from "../openapi3/aether/2.0.0/services/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class BasketService {

  constructor() { }

    logKeyValuePairs(group: FormGroup, parent?: string): void {
        const path = parent === undefined ? '/' : '/' + parent;

        Object.keys(group.controls).forEach((key: string) => {

            // Get a reference to the control using the FormGroup.get() method
            const abstractControl = group.get(key);

            // If the control is an instance of FormGroup i.e a nested FormGroup
            // then recursively call this same method (logKeyValuePairs) passing it
            // the FormGroup so we can get to the form controls in it

            if (abstractControl instanceof FormGroup) {
                this.logKeyValuePairs(abstractControl, path === '/' ? key : parent + '/' + key);
                // If the control is not a FormGroup then we know it's a FormControl
            } else {
                localStorage.setItem(path + key, abstractControl.value);
                console.log('Key = ' + path + key + ' && Value = ' + abstractControl.value);
            }
        });
    }
    emptyBasket(): void {
      //Empty everything in basket
    }
    switchCase(): void {

    }
}
