import type { Source } from '../../schemas';

export const featuredSourceIds = new Set([
  's-msmt',
  's-esbirka',
  's-cszu',
  's-cnb',
  's-avcr',
  's-kramerius-nkp',
  's-ijp',
  's-eurlex',
  's-who',
  's-demagog',
]);

export function source(record: Omit<Source, 'domain'> & { domain?: string }): Source {
  const parsedUrl = new URL(record.url);
  return {
    ...record,
    domain: record.domain ?? parsedUrl.hostname.replace(/^www\./u, ''),
    featured: featuredSourceIds.has(record.id),
  };
}
