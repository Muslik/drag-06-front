import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import cx from 'clsx';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

type Props = {
  type: AlertType;
  className?: string;
  title: string;
  text: string;
};

const ICON_MAP = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationCircleIcon,
  error: XCircleIcon,
} satisfies { [key in AlertType]: React.FC<{ className?: string }> };

export const Alert = (props: Props) => {
  const { className, text, title, type } = props;

  const Icon = ICON_MAP[type];

  return (
    <div role="alert" className={cx(`alert alert-${type}`, className)}>
      <Icon />
      <h3 className={cx({ 'font-bold': Boolean(text) })}>{title}</h3>
      {text && <div className="text-xs">{text}</div>}
    </div>
  );
};
