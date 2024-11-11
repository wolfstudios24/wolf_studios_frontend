'use client';

import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';
import { CacheProvider as DefaultCacheProvider } from '@emotion/react';

export function EmotionCacheProvider(props) {
  const { options: optionsWithPrepend, CacheProvider = DefaultCacheProvider, children } = props;

  const { prepend = false, ...options } = optionsWithPrepend;

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const [selector, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({
          name: serialized.name,
          isGlobal: selector === '',
        });
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const inserted = flush();
    if (inserted.length === 0) {
      return null;
    }
    let styles = '';
    let dataEmotionAttribute = cache.key;

    const globals = [];

    for (const { name, isGlobal } of inserted) {
      const style = cache.inserted[name];

      if (typeof style === 'boolean') {
        continue;
      }

      if (isGlobal) {
        globals.push({ name, style });
      } else {
        styles += style;
        dataEmotionAttribute += ` ${name}`;
      }
    }

    const getHTML = (style) => (prepend ? `@layer emotion {${style}}` : style);

    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            nonce={options.nonce}
            key={name}
            data-emotion={`${cache.key}-global ${name}`}
            dangerouslySetInnerHTML={{ __html: getHTML(style) }}
          />
        ))}
        {styles !== '' && (
          <style
            nonce={options.nonce}
            data-emotion={dataEmotionAttribute}
            dangerouslySetInnerHTML={{
              __html: getHTML(styles),
            }}
          />
        )}
      </>
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
