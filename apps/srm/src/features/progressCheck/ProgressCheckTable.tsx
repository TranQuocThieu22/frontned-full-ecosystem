import ProgressReportTable from '../progressReport/ProgressReportTable'

export default function ProgressCheckTable({ isProgressCheck }: { isProgressCheck: boolean }) {
    return (
        <ProgressReportTable isProgressCheck={isProgressCheck} />
    )
}
