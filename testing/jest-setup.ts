import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom/extend-expect';
import './extensions/debug-element';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
