import React from 'react';
import dotnetify from 'dotnetify';
import {
    Alert, Button, Card, Checkbox, CheckboxGroup, DateField, Panel, DropdownList,
    Form, MultiselectList, TextField, NumberField, TextAreaField, PasswordField, RadioGroup, VMContext
} from '../../elements/bootstrap';

const SampleForm = ({ vm, title, horizontal }) => (
    <VMContext vm={vm}>
        <Card header={title}>
            <Panel>
                <Form>
                    <Panel childProps={{ horizontal: horizontal }}>
                        <TextField id="MyText" />
                        <PasswordField id="MyPassword" />
                        <NumberField id="MyNumber" />
                        <DateField id="MyDate" />
                        <DropdownList id="MyDropdown" />
                        <MultiselectList id="MyMultiselect" />
                        <TextAreaField id="MyTextArea" />
                        <RadioGroup id="MyRadio" />
                        <Checkbox id="MyCheckbox" />
                        <CheckboxGroup id="MyCheckboxGroup" />
                        <Panel horizontal right>
                            <Button cancel secondary>Cancel</Button>
                            <Button id="Submit" submit primary>Submit</Button>
                        </Panel>
                    </Panel>
                </Form>
                <Alert id="SubmitSuccess" />
            </Panel>
        </Card>
    </VMContext>
);

export default SampleForm;