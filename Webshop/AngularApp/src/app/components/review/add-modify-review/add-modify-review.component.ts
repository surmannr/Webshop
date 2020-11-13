import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../../classes/Review';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-add-modify-review',
  templateUrl: './add-modify-review.component.html',
  styleUrls: ['./add-modify-review.component.css']
})
export class AddModifyReviewComponent implements OnInit {

 
  constructor(private service: ReviewService) { }

  @Input() rev: Review;
  description: string;
  stars: number;
  reviewId: number;
  productId: number;
  userId: string;


  ngOnInit(): void {
    this.description = this.rev.description;
    this.stars = this.rev.stars;
    this.reviewId = this.rev.reviewId;
    this.productId = this.rev.productId;
    this.userId = this.rev.userId;
  }

  addReview() {
    let val: Review;
    val = {
      description: this.description, stars: this.stars, productId: this.productId, userId: this.userId,
      reviewId: this.reviewId, username: "", starsList: [], emptyStarsList: []
    };
    this.service.create(val).subscribe(res => { alert("Added the review"); });
  }

  updateReview() {
    let val: Review;
    val = {
      description: this.description, stars: this.stars, productId: this.productId, userId: this.userId,
      reviewId: this.reviewId, username: "", starsList: [], emptyStarsList: []
    };
    this.service.update(this.reviewId,val).subscribe(res => { alert("Updated the review"); });
  }
}
