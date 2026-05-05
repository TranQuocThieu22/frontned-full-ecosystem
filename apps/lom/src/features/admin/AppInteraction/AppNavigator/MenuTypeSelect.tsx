'use client';
import { SegmentedControl } from '@mantine/core';
import classes from './GradientSegmentedControl.module.scss';

export function MenuTypeSelect() {
    return (
        <SegmentedControl
            radius="xl"
            size="md"
            data={['All', 'AI/ML', 'C++', 'Rust', 'TypeScript']}
            classNames={classes}
        />
    );
}