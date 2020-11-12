import { Component, OnInit } from '@angular/core';
import { Review } from '../../../classes/Review';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  ReviewList: Review[] = [];
  ModalTitle: string;
  ActivateAddEditRevComp: boolean = false;;
  rev: Review;


  constructor(private service: ReviewService) { }

  ngOnInit(): void {
    this.refreshRevList();
  }
  refreshRevList() {
    this.service.getAll().subscribe(data => {
      this.ReviewList = data;
    });
  }

  addClick() {
    this.rev = {
      description: "",
      stars: 0,
      reviewId: 0,
      productId: 0,
      userId: "",
      username: ""
     
    }
    this.ModalTitle = "Add Review";
    this.ActivateAddEditRevComp = true;
  }

  editClick(item) {
    this.rev = item;
    this.ModalTitle = "Edit Review";
    this.ActivateAddEditRevComp = true;
  }

  closeClick() {
    this.ActivateAddEditRevComp = false;
    this.refreshRevList();
  }

  deleteClick(item) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.reviewId).subscribe(_ => {
        this.refreshRevList();
      });
    }
  }
}
