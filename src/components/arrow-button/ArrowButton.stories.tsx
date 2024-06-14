import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export type ArrowButtonProps = {
	OnClick: () => void;
	isOpen: boolean;
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	render: ({ isOpen, OnClick }: ArrowButtonProps) => {
		return (
			<>
				<ArrowButton isOpen={isOpen} OnClick={OnClick} />
			</>
		);
	},
};
