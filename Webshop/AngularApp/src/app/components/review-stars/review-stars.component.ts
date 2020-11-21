import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../classes/Review';


@Component({
  selector: 'app-review-stars',
  templateUrl: './review-stars.component.html',
  styleUrls: ['./review-stars.component.css']
})
export class ReviewStarsComponent implements OnInit {

  constructor() { }

    @Input() review: Review
    ngOnInit(): void {  }



}
