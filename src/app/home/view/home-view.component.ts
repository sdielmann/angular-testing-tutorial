import { Component } from '@angular/core';

interface HomeFeature {
  title: string;
  text: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent {

  readonly features: HomeFeature[] = [{
    title: 'No more regression',
    text: 'Ever accidentally broken existing features? Prevent regression bugs by testing your code.',
    icon: 'exclamation-triangle'
  }, {
    title: 'Save your time',
    text: 'Writing tests initially costs time, but pays off in the long term. Never waste time on excessive manual testing again.',
    icon: 'clock'
  }, {
    title: 'Deploy in minutes',
    text: 'Enable fast deployments to production without risk. CI/CD first becomes possible with a good test coverage.',
    icon: 'cloud-upload'
  }, {
    title: 'Stop hating colleagues',
    text: 'Never suffer from rash co-developers again. They will see their faults right off the bat and are forced to fix their code.',
    icon: 'user'
  }, {
    title: 'Happy product owners',
    text: 'Make your product owner happy by guaranteeing a neat, bug-free product at all times.',
    icon: 'thumbs-up'
  }, {
    title: 'Get instant alerts',
    text: 'By configuring your CI/CD environment correctly, you will get instant alerts when something fails and can quickly apply a fix.',
    icon: 'bell'
  }];
}
