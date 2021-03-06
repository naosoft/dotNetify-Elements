import React from 'react';
import styled from 'styled-components';
import { Button, Element, Frame, Label, Markdown, Panel, RadioToggle, Tab, TabItem, VMContext, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const FormButton = props => (
	<TabsArticle vm="FormButton" id="Overview">
		<TabItem label="Overview" key="Overview">
			<Markdown id="Overview">
				<ButtonExample />
			</Markdown>
		</TabItem>
		<TabItem label="API" key="API">
			<Markdown id="API" />
		</TabItem>
		<TabItem label="Customize">
			<ButtonCustomize />
		</TabItem>
	</TabsArticle>
);

class ButtonExample extends React.Component {
	state = { color: 'primary' };

	render() {
		const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Button, Element, VMContext } from 'dotnetify-elements';

const RemoveLabel = <Label icon="material-icons highlight_off">Remove</Label>;
const handleClick = () => new Date();

const MyApp = _ => (
   <VMContext vm="ButtonExample">
      <Panel horizontal middle>
         <Button id="Add"${props} ${this.state.color} />
         <Element id="AddCounter" />
         <Button id="Remove" label={RemoveLabel} onClick={handleClick}${props} ${this.state.color} />
         <Element id="RemoveTimeStamp" />
      </Panel>
   </VMContext>
);
\`\`\``;
		const setState = state => this.setState(state);
		const setColor = color => this.setState({ color: color, [this.state.color]: false, [color]: true });
		const handleClick = () => new Date();
		const colorOptions = [
			{ Key: 'primary', Value: 'Primary' },
			{ Key: 'secondary', Value: 'Secondary' },
			{ Key: 'positive', Value: 'Positive' },
			{ Key: 'negative', Value: 'Negative' }
		];
		const extraToggles = (
			<RadioToggle
				css="padding-bottom: 1rem"
				id="_colors"
				label="(color:)"
				options={colorOptions}
				value={this.state.color}
				onChange={setColor}
			/>
		);

		const removeLabel = <Label icon="material-icons highlight_off">Remove</Label>;
		const propTypes = { enable: null, show: null };

		return (
			<RenderExample vm="ButtonExample" extraToggles={extraToggles} propTypes={propTypes} buildCode={buildCode} onChange={setState}>
				<Panel horizontal middle style={{ paddingBottom: '2rem' }}>
					<Button id="Add" {...this.state} />
					<Element id="AddCounter" />
					<Button id="Remove" label={removeLabel} onClick={handleClick} {...this.state} />
					<Element id="RemoveTimeStamp" />
				</Panel>
			</RenderExample>
		);
	}
}

class ButtonCustomize extends React.Component {
	state = {};

	render() {
		const componentTypes = Button.componentTypes;
		const handleSelected = state => this.setState(state);
		const select = value => ({});
		return (
			<RenderCustomize vm="ButtonCustomize" name="Button" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
				<Button id="MyButton" label="Label" />
			</RenderCustomize>
		);
	}
}

export default withTheme(FormButton);
