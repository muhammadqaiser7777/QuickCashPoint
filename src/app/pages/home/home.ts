import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
loanOptions = [
    { value: '30000-50000', label: '$30,000 - $50,000' },
    { value: '25000-30000', label: '$25,000 - $30,000' },
    { value: '20000-25000', label: '$20,000 - $25,000' },
    { value: '15000-20000', label: '$15,000 - $20,000' },
    { value: '10000-15000', label: '$10,000 - $15,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '2500-5000', label: '$2,500 - $5,000' },
    { value: '1000-2500', label: '$1,000 - $2,500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '100-500', label: '$100 - $500' }
  ];

  selectedAmount: string | null = null;

  constructor(private router: Router) {}

  selectAmount(value: string) {
    this.selectedAmount = value;
  }

  onSubmit() {
    if (this.selectedAmount) {
      this.router.navigate(['/loans'], { queryParams: { loanAmount: this.selectedAmount } });
    }
  }

    goToFAQ() {
    this.router.navigate(['/faq']);
  }

  goToForm(amount: string) {
    const value = (amount || '').toString().trim();
    console.log('Navigating to /loans with loanAmount:', value);
    const url = this.router.createUrlTree(['/loans'], { queryParams: { loanAmount: value } });
    this.router.navigateByUrl(url);
  }
}
