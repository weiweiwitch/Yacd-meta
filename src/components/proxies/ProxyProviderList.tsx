import * as React from 'react';

import { ProxyProvider } from '~/components/proxies/ProxyProvider';
import ContentHeader from '~/components/shared/ContentHeader';
import { FormattedProxyProvider } from '~/store/types';

export function ProxyProviderList({ items }: { items: FormattedProxyProvider[] }) {
  if (items.length === 0) return null;
  return (
    <>
      <ContentHeader title="Proxy Provider" />
      <div>
        {items.map((item) => (
          <ProxyProvider
            key={item.name}
            name={item.name}
            proxies={item.proxies}
            type={item.type}
            vehicleType={item.vehicleType}
            updatedAt={item.updatedAt}
            subscriptionInfo={item.subscriptionInfo}
          />
        ))}
      </div>
    </>
  );
}
