import React from 'react';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

export class MultiselectList extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        horizontal: PropTypes.bool,
        prefix: PropTypes.any,
        suffix: PropTypes.any
    }

    static componentTypes = {
        Container: FieldPanel,
        InputComponent: undefined,
        InputGroupComponent: undefined,
        TagComponent: undefined,
        ItemComponent: undefined,
        ListComponent: undefined
    }

    constructor(props) {
        super(props);
    }

    get vmInput() {
        return utils.getVMInput(this);
    }

    handleChange = (value) => this.vmInput.dispatch(value.map(val => val.Key));

    render() {
        const [Container, Input, InputGroup, Tag, Item, List] = utils.resolveComponents(MultiselectList, this.props);
        const { id, value, attrs } = this.vmInput.props;

        const options = (attrs.options || []).map(opt => <option key={opt.Key} value={opt.Key}>{opt.Value}</option>);
        let { label, prefix, suffix, ...props } = this.props;
        label = attrs.label || label;
        prefix = attrs.prefix || prefix;
        suffix = attrs.suffix || suffix;

        return (
            <Container id={id} label={label} horizontal={this.props.horizontal}>
                <InputGroup prefix={prefix} suffix={suffix}>
                    <Input
                        id={id}
                        value={value}
                        data={attrs.options}
                        valueField='Key'
                        textField='Value'
                        tagComponent={Tag}
                        itemComponent={Item}
                        listComponent={List}
                        prefix={prefix}
                        suffix={suffix}
                        onChange={this.handleChange}
                        {...props}
                    />
                </InputGroup>
            </Container>
        )
    }
}