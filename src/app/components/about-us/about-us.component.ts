import { Component } from '@angular/core';
import { TestService } from '../../core/services/test/test.service';

import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-about-us',
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
blogs = [
  {
      id: 1,
      title: 'Mastering Angular: Best Practices in 2025',
      image: 'https://source.unsplash.com/800x400/?angular,code',
      author: 'Jane Doe',
      date: '2025-06-10',
      tags: ['Angular', 'Best Practices', 'Frontend'],
      excerpt: 'Discover how to write clean, scalable Angular code in 2025 with these best practices...',
      content: `
        In the ever-evolving world of Angular, staying up to date with best practices is key. 
        In 2025, Angular has introduced new ways to manage state, streamline modules, and improve rendering performance.
        This guide covers the top 10 things every Angular developer should be doing, from using standalone components to integrating RxJS patterns.
        
        Also included: tips on lazy loading, modular architecture, error handling with interceptors, and writing testable services.
      `
    },
    {
      id: 2,
      title: 'How to Build a Reusable Component Library in Angular',
      image: 'https://source.unsplash.com/800x400/?components,library,web',
      author: 'John Smith',
      date: '2025-05-20',
      tags: ['Angular', 'Components', 'Architecture'],
      excerpt: 'Learn how to architect your Angular application using shared and feature modules...',
      content: `
        Creating a reusable component library allows your Angular team to maintain consistency, speed up development, and ensure UI reusability.
        This article walks you through setting up an Angular workspace with library generation, using SCAM (Single Component Angular Modules), 
        and publishing packages to npm or internal registries.
        
        You’ll also see examples of creating shared buttons, dialogs, modals, and more—all styled with Angular Material or Tailwind.
      `
    },
    {
      id: 3,
      title: 'Top 7 Performance Optimization Tips for Angular Apps',
      image: 'https://source.unsplash.com/800x400/?performance,analytics,speed',
      author: 'Alex Carter',
      date: '2025-04-18',
      tags: ['Performance', 'Optimization', 'Angular'],
      excerpt: 'Is your Angular app slow? Improve speed and responsiveness with these practical tips...',
      content: `
        Angular performance can degrade with complex forms, large components, or too many change detection cycles.
        This blog introduces ChangeDetectionStrategy.OnPush, detaching zones with NgZone, using trackBy with *ngFor, and lazy loading routes/components.
        
        You’ll also learn about memory leaks, unsubscribe strategies with takeUntil, and how Angular DevTools can uncover hidden bottlenecks.
      `
    },
    {
      id: 4,
      title: 'Using RxJS Like a Pro in Angular',
      image: 'https://source.unsplash.com/800x400/?rxjs,streams,angular',
      author: 'Maria Gonzalez',
      date: '2025-04-01',
      tags: ['RxJS', 'Angular', 'Reactive Programming'],
      excerpt: 'RxJS is the backbone of reactive Angular. Let’s level up your stream handling...',
      content: `
        Reactive programming can be confusing, but RxJS makes it powerful. In this blog, you'll learn about core operators like map, switchMap, mergeMap, and concatMap.
        You’ll see real-world examples with HTTP calls, form events, and combining multiple streams for cleaner state management.
        
        Bonus: patterns with BehaviorSubject, Subject vs ReplaySubject, and when to use tap() instead of subscribe().
      `
    },
    {
      id: 5,
      title: 'Deploying Angular to Firebase Hosting with GitHub Actions',
      image: 'https://source.unsplash.com/800x400/?firebase,github,devops',
      author: 'Daniel Kumar',
      date: '2025-03-22',
      tags: ['DevOps', 'Firebase', 'CI/CD'],
      excerpt: 'Automate your Angular deployment to Firebase Hosting using GitHub Actions...',
      content: `
        Reactive programming can be confusing, but RxJS makes it powerful. In this blog, you'll learn about core operators like map, switchMap, mergeMap, and concatMap.
        You’ll see real-world examples with HTTP calls, form events, and combining multiple streams for cleaner state management.
        
        Bonus: patterns with BehaviorSubject, Subject vs ReplaySubject, and when to use tap() instead of subscribe().
      `
    },
]
}
