import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  constructor(private http:HttpClient) { }

getQuestions(): Observable<any> {
  return this.http.get<any>('./assets/questionnaire.json')
}

}
