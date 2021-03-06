import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, FormContextTypes } from '../form/Form';
import * as utils from '../utils';

export class Modal extends React.Component {
   static contextTypes = FormContextTypes;

   static propTypes = {
      // Text or component for the card's header.
      header: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Text or component for the card's footer.
      footer: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Opens the modal.
      open: PropTypes.bool,

      // Sets dimension to small.
      small: PropTypes.bool,

      // Sets dimension to large.
      large: PropTypes.bool,

      // Sets custom width.
      width: PropTypes.number,

      // Occurs when the form inside the modal is submitted; emits the form data.
      onSubmit: PropTypes.func,

      // Occurs when there's validation error on submit; emits the error.
      onSubmitError: PropTypes.func
   };

   static defaultProps = {
      open: true
   };

   static componentTypes = {
      Container: undefined,
      HeaderContainer: undefined,
      BodyContainer: undefined,
      FooterContainer: undefined
   };

   render() {
      if (!this.context.theme) {
         const error = 'ERROR: Modal must be nested inside a Theme component.';
         console.error(error);
         throw error;
      }

      const [ Container, Header, Body, Footer ] = utils.resolveComponents(Modal, this.props);
      const { open, small, large, width, header, footer, children, onSubmit, onSubmitError, ...props } = this.props;
      const centered = true;
      const size = small ? 'sm' : large ? 'lg' : null;

      const [ sections, body ] = utils.filterChildren(
         children,
         child => child && (child.type === 'header' || child.type === 'footer')
      );
      const _header = header || sections.filter(section => section.type === 'header').shift();
      const _footer = footer || sections.filter(section => section.type === 'footer').shift();

      let modalContent = (
         <React.Fragment>
            {_header && <Header>{_header.props ? _header.props.children : _header}</Header>}
            <Body>{body}</Body>
            {_footer && <Footer>{_footer.props ? _footer.props.children : _footer}</Footer>}
         </React.Fragment>
      );

      if (onSubmit || onSubmitError)
         modalContent = (
            <Form onSubmit={onSubmit} onSubmitError={onSubmitError}>
               {modalContent}
            </Form>
         );

      return (
         <Container isOpen={open} centered={centered} size={size} style={{ maxWidth: width }}>
            {modalContent}
         </Container>
      );
   }
}
