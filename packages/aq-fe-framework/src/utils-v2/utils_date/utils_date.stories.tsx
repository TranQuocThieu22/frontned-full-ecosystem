// DateUtilsDemo.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import UtilsDateDemo from './UtilsDateDemo';
// DateUtilsInteractive.stories.tsx

const meta: Meta<typeof UtilsDateDemo> = {
    component: UtilsDateDemo,
    parameters: {
        layout: 'centered',
    }
};

export default meta;
type Story = StoryObj<typeof UtilsDateDemo>;

export const Default: Story = {};
