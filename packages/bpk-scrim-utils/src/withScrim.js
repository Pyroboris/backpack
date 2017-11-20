/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import focusScope from 'a11y-focus-scope';
import focusStore from 'a11y-focus-store';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { cssModules, wrapDisplayName } from 'bpk-react-utils';

import BpkScrim from './BpkScrim';
import { lockScroll, restoreScroll, storeScroll, unlockScroll } from './scroll-utils';

import STYLES from './bpk-scrim-content.scss';

const getClassName = cssModules(STYLES);

const withScrim = (WrappedComponent) => {
  class component extends Component {
    constructor() {
      super();

      this.onContentMouseDown = this.onContentMouseDown.bind(this);
      this.onContentMouseUp = this.onContentMouseUp.bind(this);
      this.onDocumentMove = this.onDocumentMove.bind(this);
      this.onOverlayMouseDown = this.onOverlayMouseDown.bind(this);
      this.onOverlayMouseUp = this.onOverlayMouseUp.bind(this);
      this.getDialogRef = this.getDialogRef.bind(this);

      this.shouldClose = false;
    }

    componentDidMount() {
      const { isIphone, getApplicationElement } = this.props;
      const applicationElement = getApplicationElement();

      if (isIphone && applicationElement) {
        storeScroll();
        applicationElement.style.display = 'none';
      } else {
        lockScroll();
        if (applicationElement) {
          applicationElement.setAttribute('aria-hidden', 'true');
        }
      }

      focusStore.storeFocus();
      if (this.dialogElement) {
        focusScope.scopeFocus(this.dialogElement);
      }
    }

    componentWillUnmount() {
      const { isIphone, getApplicationElement } = this.props;
      const applicationElement = getApplicationElement();

      if (isIphone && applicationElement) {
        applicationElement.style.display = '';
        restoreScroll();
      } else {
        unlockScroll();
        if (applicationElement) {
          applicationElement.removeAttribute('aria-hidden');
        }
      }

      focusScope.unscopeFocus();
      focusStore.restoreFocus();
    }

    onContentMouseDown(e) {
      e.stopPropagation();
      this.shouldClose = false;
    }

    onContentMouseUp() {
      this.shouldClose = false;
    }

    onOverlayMouseDown() {
      this.shouldClose = true;
    }

    onOverlayMouseUp() {
      if (this.shouldClose) {
        this.props.onClose();
      }
    }

    onDocumentMove() {
      this.shouldClose = false;
    }

    getDialogRef(ref) {
      this.dialogElement = ref;
    }

    render() {
      const {
        isIphone,
        getApplicationElement,
        contentClassName,
        ...rest
      } = this.props;

      const classNames = [getClassName('bpk-scrim-content')];
      if (isIphone) { classNames.push(getClassName('bpk-scrim-content--iphone-fix')); }
      classNames.push(contentClassName);

      const closeEvents = {
        onTouchStart: this.onContentMouseDown,
        onTouchMove: this.onDocumentMove,
        onTouchEnd: this.onContentMouseUp,
        onMouseDown: this.onContentMouseDown,
        onMouseMove: this.onDocumentMove,
        onMouseUp: this.onContentMouseUp,
      };

      return (
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        <div>
          <BpkScrim />
          <div
            className={classNames.join(' ')}
            onTouchStart={this.onOverlayMouseDown}
            onTouchMove={this.onDocumentMove}
            onTouchEnd={this.onOverlayMouseUp}
            onMouseDown={this.onOverlayMouseDown}
            onMouseMove={this.onDocumentMove}
            onMouseUp={this.onOverlayMouseUp}
          >
            <WrappedComponent
              {...rest}
              isIphone={isIphone}
              getDialogRef={this.getDialogRef}
              closeEvents={closeEvents}
            />
          </div>
        </div>
        /* eslint-enable */
      );
    }
  }

  component.displayName = wrapDisplayName(WrappedComponent, 'withScrim');

  component.propTypes = {
    onClose: PropTypes.func.isRequired,
    getApplicationElement: PropTypes.func.isRequired,
    isIphone: PropTypes.bool,
    contentClassName: PropTypes.string,
  };

  component.defaultProps = {
    isIphone: /iPhone/i.test(typeof window !== 'undefined' ? window.navigator.platform : ''),
    contentClassName: '',
  };

  return component;
};

export default withScrim;
