import React from 'react';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { VMInput } from '../VMInput';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

export class CheckboxGroup extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
    }

    static componentTypes = {
        Container: FieldPanel,
        LabelComponent: undefined,
        CheckboxContainer: undefined,
        CheckboxLabelComponent: undefined,
        InputComponent: undefined
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.vmInput = new VMInput(this.context, this.props.id);
    }    

    handleChange = (event) => {
        let values = this.vmInput.value || [];
        values = event.target.checked ? values.concat([event.target.value]) : values.filter(value => value != event.target.value);
        this.vmInput.value = values;
    }

    render() {
        const [Container, Label, CheckboxContainer, CheckboxLabel, Input] = utils.resolveComponents(CheckboxGroup, this.props);
        const { id, value, attrs } = this.vmInput.props;        

        const values = value || [];
        const label = attrs.label || props.label;

        const checkboxes = (attrs.options || []).map(opt => (
            <CheckboxContainer check key={opt.Key} inline={this.props.inline}>
                <CheckboxLabel check>
                    <Input type="checkbox" value={opt.Key} checked={values.includes(opt.Key)} onChange={this.handleChange} />
                    {opt.Value}
                </CheckboxLabel>
            </CheckboxContainer>
        ));

        return (
            <Container horizontal={this.props.horizontal}>
                {label ? <Label for={id}>{label}</Label> : null}
                <section id={id}>{checkboxes}</section>
            </Container>
        );
    }
}