import { Card } from "@ops-pilot/ui";

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
}

export function SummaryCard(props: SummaryCardProps) {
  return (
    <Card title={props.title} subtitle={props.subtitle}>
      <div className="kpi">{props.value}</div>
    </Card>
  );
}
