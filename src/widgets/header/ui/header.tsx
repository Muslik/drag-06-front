import cx from 'clsx';

type Props = {
  className?: string;
};

export const Header = ({ className }: Props) => {
  return <header className={cx('h-8 border-b-1 border-blue-900', className)}>Some header</header>;
};
