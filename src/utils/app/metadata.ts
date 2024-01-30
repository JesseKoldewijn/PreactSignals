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
  value: string;
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
    return { key, value: configMeta.title.relative.replace("%s", value) };
  }
};

export const getPageMetadata = (
  page: PageMeta,
  forceAbsolute: PageOverrides,
) => {
  const { title: absoluteTitle, description: absoluteDesc } = forceAbsolute;

  const metaMap = new Map<keyof PageMeta, string>();

  Object.entries(page).forEach(([key, value]) => {
    const meta = getMetakey({
      key: key as keyof PageMeta,
      value: value,
      isAbsolute: Boolean(absoluteTitle || absoluteDesc),
    });
    metaMap.set(meta.key, meta.value);
  });

  return Object.fromEntries(metaMap) as {
    [K in keyof typeof appConfig.meta]: string;
  };
};
