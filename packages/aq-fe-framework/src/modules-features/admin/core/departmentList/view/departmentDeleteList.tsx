'use client';

import { MyButtonDeleteList } from '@/components/Button/ButtonCRUD/MyButtonDeleteList/MyButtonDeleteList';
import { departmentService } from '../../../../../APIs/departmentService';
import { IDepartment } from '../../../../../interfaces';

export default function DepartmentDeleteList({
    values,
}: {
    values: IDepartment[];
}) {
    return (
        <MyButtonDeleteList
            contextData={values.map((item) => item.code).join(',')}
            onSubmit={() => {
                return departmentService.deleteList(values);
            }}
        />
    );
}
