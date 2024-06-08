import { Loader } from '@mantine/core';
import clsx from 'clsx';
import React, { useRef, useEffect } from 'react';

declare global {
  interface Window {
    TelegramLoginWidget: {
      dataOnauth: (user: TelegramUser) => void;
    };
  }
}

export type TelegramUser = {
  id: number;
  first_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
};

type Props = {
  botName: string;
  usePic?: boolean;
  className?: string;
  cornerRadius?: number;
  requestAccess?: boolean;
  dataAuthUrl?: string;
  dataOnauth?: (user: TelegramUser) => void;
  buttonSize?: 'large' | 'medium' | 'small';
  wrapperProps?: React.HTMLProps<HTMLDivElement>;
};

export function TelegramLoginButton({
  wrapperProps,
  dataAuthUrl,
  usePic = false,
  botName,
  className,
  buttonSize = 'large',
  dataOnauth,
  cornerRadius,
  requestAccess = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    if (typeof dataOnauth === 'undefined' && typeof dataAuthUrl === 'undefined') {
      throw new Error(
        'One of this props should be defined: dataAuthUrl (redirect URL), dataOnauth (callback fn) should be defined.',
      );
    }

    if (typeof dataOnauth === 'function') {
      window.TelegramLoginWidget = {
        dataOnauth: (user: TelegramUser) => dataOnauth(user),
      };
    }

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-lang', 'ru');
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', buttonSize);

    if (cornerRadius !== undefined) {
      script.setAttribute('data-radius', cornerRadius.toString());
    }

    if (requestAccess) {
      script.setAttribute('data-request-access', 'write');
    }

    script.setAttribute('data-userpic', usePic.toString());

    if (typeof dataAuthUrl === 'string') {
      script.setAttribute('data-auth-url', dataAuthUrl);
    } else {
      script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
    }

    script.async = true;
    script.onload = () => setIsLoading(false);
    script.onerror = () => setIsLoading(false);

    ref.current.appendChild(script);
  }, [botName, buttonSize, cornerRadius, dataOnauth, requestAccess, usePic, ref, dataAuthUrl]);

  return (
    <div ref={ref} className={clsx(className)} {...wrapperProps}>
      {isLoading && <Loader size="md"  />}
    </div>
  );
}
