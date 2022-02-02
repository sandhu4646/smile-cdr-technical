import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionnaireService } from './questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {

  questionnaireForm!: FormGroup;
  questions: any;
  formSubmitted = false;
  submittedValues: any;  

  constructor(
    private questionnaireService: QuestionnaireService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.questionnaireForm = this.formBuilder.group({});
    this.questionnaireService.getQuestions().subscribe((data) => {
      this.questions = data.item;
      this.createFormControls();
    });
  }

  /*Create contols based on questionnaire array*/
  createFormControls() {
    this.questions.forEach((element) => {
      this.questionnaireForm.addControl(element.linkId, new FormControl('', Validators.required));
    });
  }

  /*On form submit*/
  onSubmit() {
    if(this.questionnaireForm.valid){
     this.submittedValues = this.questions.map((element) => {
        return {
          'linkId': element.linkId,
          'text': element.text,
          'answer': this.questionnaireForm.value[element.linkId]
        }
      });
      this.formSubmitted = true;
    }
  }


}
