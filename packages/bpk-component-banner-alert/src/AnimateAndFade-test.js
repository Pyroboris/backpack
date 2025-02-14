/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* @flow strict */

import React from 'react';
import { render } from '@testing-library/react';

import AnimateAndFade from './AnimateAndFade';

const message = (
  <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</div>
);

describe('AnimateAndFade', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <AnimateAndFade show={false}>{message}</AnimateAndFade>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when shown', () => {
    const { asFragment } = render(
      <AnimateAndFade show>{message}</AnimateAndFade>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with animateOnEnter', () => {
    // TODO Due to a bug in react-transition-group, this test will fail
    // https://github.com/reactjs/react-transition-group/issues/436
    // Should be reinstated once the bug is fixed
    return;
    /* eslint-disable no-unreachable */
    // $FlowFixMe[unreachable-code]
    const { asFragment } = render(
      <AnimateAndFade show animateOnEnter>
        {message}
      </AnimateAndFade>,
    );
    // $FlowFixMe[unreachable-code]
    expect(asFragment()).toMatchSnapshot();
    /* eslint-enable */
  });

  it('should render correctly with userland className', () => {
    const { asFragment } = render(
      <AnimateAndFade className="userland-class-name" show>
        {message}
      </AnimateAndFade>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
