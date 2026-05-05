import { MyActionIconDelete } from 'aq-fe-framework/components';

export default function TickerRepositoryDelete({
  id,
  label,
}: {
  id: number;
  label: string;
}) {
  return <MyActionIconDelete onSubmit={() => {}} contextData={id.toString()} />;
}
