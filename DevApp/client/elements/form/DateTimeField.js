import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import { FieldPanel } from '../layout/FieldPanel';
import { Label } from '../display/Label';
import * as utils from '../utils';
import moment from 'moment';

export class DateTimeField extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        horizontal: PropTypes.bool,
        disabled: PropTypes.bool,
        prefix: PropTypes.any,
        suffix: PropTypes.any,
        validation: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    }

    static componentTypes = {
        Container: FieldPanel,
        InputComponent: undefined,
        InputGroupComponent: undefined,
        ValidationMessageComponent: Label
    }

    constructor(props) {
        super(props);
        this.state = { changed: false, validationMessages: [] };
    }

    get vmInput() {
        return utils.getVMInput(this);
    }

    componentWillMount() {
        this.vmInput.onValidated(result => this.setState({
            valid: result.valid ? null : false,
            validationMessages: result.messages
        }));

        if (this.props.validation)
            this.vmInput.addValidation(this.props.validation);
    }

    handleChange = (value) => {
        this.setState({ changed: true });
        this.vmInput.value = new moment(value).toISOString(true);
    }

    handleBlur = _ => {
        this.state.changed && this.vmInput.dispatch();
        this.setState({ changed: false });
    }

    render() {
        const [Container, Input, InputGroup, ValidationMessage] = utils.resolveComponents(DateTimeField, this.props);
        const { id, value, attrs } = this.vmInput.props;

        let { label, prefix, suffix, horizontal, ...props } = this.props;
        label = attrs.label || label;
        prefix = attrs.prefix || prefix;
        suffix = attrs.suffix || suffix;

        const { min, max } = attrs;

        return (
            <Container id={id} label={label} horizontal={horizontal}>
                <InputGroup prefix={prefix} suffix={suffix}>
                    <Input
                        valid={this.state.valid}
                        id={id}
                        value={new Date(value)}
                        min={new Date(min)}
                        max={new Date(max)}
                        prefix={prefix}
                        suffix={suffix}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        {...props}
                    />
                </InputGroup>
                
                {this.state.validationMessages.map((message, idx) =>
                    <ValidationMessage key={"validationMessage" + idx}>{message}</ValidationMessage>)}
            </Container>
        );
    }
}

export const DateField = props => (
    <DateTimeField time={false} {...props} />
);

export const TimeField = props => (
    <DateTimeField date={false} {...props} />
);

DateField.contextTypes = ContextTypes;
TimeField.contextTypes = ContextTypes;

DateField.propTypes = Object.assign({}, DateTimeField.propTypes);
TimeField.propTypes = Object.assign({}, DateTimeField.propTypes);