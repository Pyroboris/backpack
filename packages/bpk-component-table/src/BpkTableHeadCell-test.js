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

import BpkTableHeadCell from './BpkTableHeadCell';

describe('BpkTableHeadCell', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <table>
        <thead>
          <tr>
            <BpkTableHeadCell>Heading</BpkTableHeadCell>
          </tr>
        </thead>
      </table>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "alternate"', () => {
    const { asFragment } = render(
      <table>
        <thead>
          <tr>
            <BpkTableHeadCell alternate>Skyscanner</BpkTableHeadCell>
          </tr>
        </thead>
      </table>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with custom class', () => {
    const { asFragment } = render(
      <table>
        <thead>
          <tr>
            <BpkTableHeadCell className="my-custom-class">
              Skyscanner
            </BpkTableHeadCell>
          </tr>
        </thead>
      </table>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const { asFragment } = render(
      <table>
        <thead>
          <tr>
            <BpkTableHeadCell id="my-custom-id" data-foo="bar">
              Skyscanner
            </BpkTableHeadCell>
          </tr>
        </thead>
      </table>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
