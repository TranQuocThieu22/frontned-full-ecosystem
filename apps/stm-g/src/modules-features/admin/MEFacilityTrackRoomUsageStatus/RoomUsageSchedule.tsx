import { useMantineColorScheme } from '@mantine/core';
import { MRT_Cell, MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { RoomSchedule } from './FacilityTrackRoomUsageStatusTable';

const periods = [
	'Tiết 1 (08:00 - 08:45)',
	'Tiết 2 (08:50 - 09:35)',
	'Tiết 3 (09:40 - 10:25)',
	'Tiết 4 (10:30 - 11:15)',
	'Tiết 5 (13:00 - 13:45)',
	'Tiết 6 (13:50 - 14:35)',
	'Tiết 7 (14:40 - 15:25)',
	'Tiết 8 (15:30 - 16:15)',
	'Tiết 9 (18:00 - 18:45)',
	'Tiết 10 (18:50 - 19:35)',
];


export default function RoomUsageSchedule({ data }: { data: RoomSchedule[] }) {
	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === "dark";

	const columns: MRT_ColumnDef<RoomSchedule>[] = [
		{
			accessorKey: 'index',
			header: 'TT',
			size: 40,
			Cell: ({ cell }) => (
				<strong>{cell.getValue<string>()}</strong>
			),
		},
		{
			accessorKey: 'roomCode',
			header: 'Mã phòng',
			size: 120,
			Cell: ({ cell }) => (
				<strong>{cell.getValue<string>()}</strong>
			),
		},
		{
			accessorKey: 'roomName',
			header: 'Tên phòng',
			size: 150,
			Cell: ({ cell }) => (
				<strong>{cell.getValue<string>()}</strong>
			),
		},
		...periods.map((period, idx): MRT_ColumnDef<RoomSchedule> => ({
			accessorFn: (row: RoomSchedule) => row.slots[idx]?.content ?? '',
			id: `period${idx + 1}`,
			header: period,
			Cell: ({ cell }: { cell: MRT_Cell<RoomSchedule, string> }) => {
				const value = cell.getValue<string>();
				return value ? (
					<div
						style={{
							backgroundColor: isDark ? "var(--mantine-color-gray-8)" : "var(--mantine-color-blue-1)",
							color: isDark ? "var(--mantine-color-white)" : "var(--mantine-color-blue-8)",
							padding: '8px 10px',
							borderRadius: '8px',
							textAlign: 'center',
							fontWeight: 600,
							fontSize: '13.5px',
							whiteSpace: 'pre-wrap',
						}}
					>
						{value}
					</div>
				) : null;
			},
		}))
	];

	return (
		<>
			{/* <style jsx global>{`
				.MRT_TableHeadCell-module_content__-pzSK {
					align-items: center;
					justify-content: center;
					position: relative;
					width: 100%;
					height: 100%;
				}	
			`}</style> */}
			<MantineReactTable
				columns={columns}
				data={data}
				enablePagination={false}
				enableTopToolbar={false}
				enableColumnFilters={false}
				enableSorting={false}
				enableColumnActions={false}
				enableFullScreenToggle={false}
				enableBottomToolbar={false}
				enableStickyHeader
				enableColumnPinning
				mantineTableProps={{
					highlightOnHover: true,
					withColumnBorders: true,
				}}
				mantineTableContainerProps={{
					style: {
						maxHeight: '70vh',
						overflowY: 'auto',
					},
				}}
				initialState={{
					columnPinning: {
						left: ['index', 'roomCode', 'roomName'],
					}
				}}
				mantineTableBodyCellProps={{
					style: {
						textAlign: 'center',
					},
				}}
				mantineTableHeadCellProps={{
				}}
			/>
		</>
	);
};