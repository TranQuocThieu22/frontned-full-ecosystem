import { ActionIcon, Combobox, Text, useCombobox } from '@mantine/core';
import { IconChevronCompactDown, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { IGradeSubjectPIViewModel } from './Interfaces/IGradeSubjectPI';
import { IGradeSubjectInfoViewModel } from './Interfaces/Interfaces';

const AMRIValues = ['I', 'R', 'M', 'null'];

export default function MRISelector({
    gradeSubject,
    gradeSubjectPI,
    COEPIId,
    setSelectedMRIValue,
    noColorTableData,
}: {
    gradeSubject: IGradeSubjectInfoViewModel,
    gradeSubjectPI: IGradeSubjectPIViewModel | null,
    COEPIId: number,
    setSelectedMRIValue: (row: IGradeSubjectPIViewModel, COEPIId: number, MRIValue: any) => void
    noColorTableData: boolean;
}
) {
    const getColorByValue = (value: string | null): string => {
        switch (value) {
            case 'I': return '#2196F3'; // Blue for early leave
            case 'R': return '#FF9800'; // Orange for late
            case 'M': return '#F44336'; // Red for absent
            default: return '#757575';  // Default gray
        }
    };

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [selectedItem, setSelectedItem] = useState<string | null>(gradeSubjectPI?.armiValue ?? null);

    const options = AMRIValues.map((item) => (
        <Combobox.Option value={item} key={item}>
            {
                item === 'null' ?
                    <ActionIcon ml={2} variant="transparent" color="gray" radius="md" >
                        <IconX stroke={2} />
                    </ActionIcon>
                    :
                    <Text
                        fw={700}
                        style={{
                            padding: '4px 8px',
                            borderRadius: 0,
                            // color: noColorTableData ? 'black' : getColorByValue(item),
                            color: getColorByValue(item), // set màu cứng
                            textAlign: 'center',
                            width: '100%',
                            fontWeight: 'bold'
                        }}
                    >
                        {item}
                    </Text>

            }
        </Combobox.Option>
    ));

    const handleSelectMRIValue = (value: string | null) => {
        if (gradeSubjectPI === null) {
            let newGradeSubjectPI: IGradeSubjectPIViewModel = {
                id: 0,
                code: null,
                name: null,
                concurrencyStamp: 'string',
                isEnabled: true,
                coeGradeSubjectId: gradeSubject.id,
                coepiId: COEPIId,
                armiValue: value === 'null' ? null : value,
            };
            setDisplayAndActualUpdatedData(value, newGradeSubjectPI);
        } else {
            setDisplayAndActualUpdatedData(value, gradeSubjectPI);
        }
        combobox.closeDropdown();
    };

    const setDisplayAndActualUpdatedData = (selectedMRIValue: string | null, gradeSubjectPI: IGradeSubjectPIViewModel) => {
        setSelectedItem(selectedMRIValue === 'null' ? null : selectedMRIValue);
        setSelectedMRIValue(gradeSubjectPI, COEPIId, selectedMRIValue === 'null' ? null : selectedMRIValue);
    }

    return (
        <>
            <Combobox
                store={combobox}
                width={60}
                position="bottom-start"
                withArrow
                onOptionSubmit={(val) => {
                    handleSelectMRIValue(val);
                }}
            >
                <Combobox.Target>
                    {
                        selectedItem === null ?
                            <ActionIcon
                                ml={5}
                                variant="subtle"
                                color="gray"
                                radius="md"
                                onClick={() => combobox.toggleDropdown()}
                            >
                                <IconChevronCompactDown style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                            :
                            <Text
                                // bg={'#f1f3f5'}
                                onClick={() => combobox.toggleDropdown()}
                                // fw={noColorTableData ? 450 : 700}
                                fw={700}
                                style={{
                                    cursor: 'pointer',
                                    padding: '4px 8px',
                                    borderRadius: 6,
                                    // color: noColorTableData ? 'black' : getColorByValue(selectedItem),
                                    color: getColorByValue(selectedItem), // set cứng màu
                                    display: 'inline-block',
                                    minWidth: 40,
                                    textAlign: 'center',
                                }}
                            >
                                {/* {value} */}
                                {selectedItem}
                            </Text>
                    }
                </Combobox.Target>
                <Combobox.Dropdown>
                    <Combobox.Options
                    >
                        {options}
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
};
