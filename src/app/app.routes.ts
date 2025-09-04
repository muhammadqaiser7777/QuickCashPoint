// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Faq } from './pages/faq/faq';
import { Loans } from './pages/loans/loans';
import { CompanyPolicy } from './layouts/policies/company-policy/company-policy';
import { PrivacyPolicy } from './layouts/policies/privacy-policy/privacy-policy';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'faq', component: Faq },
  { path: 'loans', component: Loans },
  { path: 'company-policy', component: CompanyPolicy },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // 👈 scrolls to top automatically
      anchorScrolling: 'enabled'           // optional: allows #anchor navigation
    })
  ],
  exports: [RouterModule] // 👈 needed so routing works
})
export class AppRoutingModule {}
