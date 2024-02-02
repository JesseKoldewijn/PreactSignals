import { appConfig } from "@/config/app";

export type PageMeta = {
  title?: string;
  description?: string;
};

export type PageOverrides = {
  title?: boolean;
  description?: boolean;
};

const getMetakey = ({
  key,
  value,
  isAbsolute,
}: {
  key: keyof PageMeta;
  value?: string;
  isAbsolute: boolean;
}) => {
  const configHasRelativeAndAbsolute =
    appConfig.meta[key].relative && appConfig.meta[key].absolute;

  if (!configHasRelativeAndAbsolute) {
    return { key, value };
  }

  const configMeta = appConfig.meta;

  if (isAbsolute) {
    return { key, value };
  }

  const titleConfigIsRelative = configMeta[key].relative.includes("%s");
  if (!titleConfigIsRelative) {
    return { key, value: `${value} | ${configMeta.title.relative}` };
  } else {
    return {
      key,
      value: value ? configMeta.title.relative.replace("%s", value) : undefined,
    };
  }
};

export const getPageMetadata = (
  page: PageMeta,
  forceAbsolute: PageOverrides,
) => {
  const { title: absoluteTitle, description: absoluteDesc } = forceAbsolute;

  const metaMap: {
    key: keyof PageMeta;
    value?: string;
  }[] = [];

  const keys = Object.keys(page) as (keyof PageMeta)[];
  const values = Object.values(page) as string[];
  const entries = keys.map((key, i) => [key, values[i]] as const);

  for (const [key, value] of entries) {
    const meta = getMetakey({
      key: key as keyof PageMeta,
      value: value,
      isAbsolute: Boolean(absoluteTitle || absoluteDesc),
    });

    metaMap.push({
      key: meta.key,
      value: meta.value ?? appConfig.meta[meta.key].absolute ?? undefined,
    });
  }

  const metadata = metaMap.reduce((acc, { key, value }) => {
    acc[key] = value;

    return acc;
  }, {} as PageMeta);

  return metadata;
};
