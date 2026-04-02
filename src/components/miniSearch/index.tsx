import { useEffect, useMemo, useState } from 'react';
import MiniSearch, { type SearchOptions, type SearchResult } from 'minisearch';
import type { CombineWith } from '../../types';
import ControlsPanel from './ControlsPanel';
import deburr from 'lodash/deburr'
import type { tags as defaultTags } from '../../data';
import { newStemmer } from 'snowball-stemmers';

type Props = {
  query: string;
  onSearchResult: (it: Array<SearchResult>) => void;
  tags: typeof defaultTags;
};

const stemmers = {
  en: newStemmer('english'),
  de: newStemmer('german'),
  fr: newStemmer('french'),
  it: newStemmer('italian'),
  sp: newStemmer('spanish'),
};

function stemText(lang: keyof typeof stemmers, text: string) {
  return text
    .split(', ')
    .map((word) => stemmers[lang].stem(word))
    .join(' ');
}

function getBoostByLocale(
  locale: 'de' | 'en' | 'fr' | 'it' | 'sp',
  boostWeight: number,
) {
  const base = 1;

  return {
    en: locale === 'en' ? boostWeight : base,
    de: locale === 'de' ? boostWeight : base,
    fr: locale === 'fr' ? boostWeight : base,
    it: locale === 'it' ? boostWeight : base,
    sp: locale === 'sp' ? boostWeight : base,
  };
}

export const MiniSearchExample = (props: Props) => {
  const { query, onSearchResult, tags } = props;
  const [prefix, setPrefix] = useState(true);
  const [fuzzy, setFuzzy] = useState(0.2);
  const [combineWith, setCombineWith] = useState<CombineWith>('OR');
  const [processOptions, setProcessOptions] = useState<'deburr' | undefined>();
  const [stemmingEnabled, setStemmingEnabled] = useState(false);
  const [boostedLocale, setBoostedLocale] = useState<"de" | "en" | "fr" | "it" | "sp" | undefined>();
  const [locale, setLocale] = useState<"de" | "en" | "fr" | "it" | "sp">('en');
  const [boostWeight, setBoostWeight] = useState(1);

  const documents = useMemo(() => {
    return tags.map((it) => ({
      reference: it.reference,
      ...(stemmingEnabled
        ? Object.entries(it.keywords).map(([lang, keys]) =>
            stemText(lang as keyof typeof stemmers, keys),
          )
        : it.keywords
      )
    }));
  }, [tags]);

  const miniSearch = useMemo(() => {
    const instance = new MiniSearch<(typeof documents)[number]>({
      fields: ['de', 'en', 'fr', 'it', 'sp'],
      storeFields: ['reference'],
      idField: 'reference',
      processTerm: (it) => {
        const lowercased = it.trim().toLowerCase();
        return processOptions === 'deburr' ? deburr(lowercased) : lowercased;
      },
    });

    instance.addAll(documents);

    return instance;
  }, [documents, processOptions]);

  const results = useMemo(() => {
    if (!miniSearch || !query || query?.trim().length === 0) {
      return [] as SearchResult[];
    }

    const searchOptions: SearchOptions = {
      prefix,
      combineWith,
    };

    if (fuzzy > 0) {
      searchOptions.fuzzy = Number(fuzzy.toFixed(2));
    }

    if (processOptions === 'deburr') {
      searchOptions.processTerm = (it) => deburr(it.trim().toLowerCase());
    } else {
      searchOptions.processTerm = (it) => it.trim().toLowerCase();
    }

    if (boostedLocale) {
      searchOptions.boost = getBoostByLocale(boostedLocale, boostWeight);
    }

    let processedQuery = query;
    if (stemmingEnabled) {
      processedQuery = query
        .split(' ')
        .map((it) => stemText(locale, it))
        .join(' ');
    }

    return miniSearch.search(processedQuery, searchOptions);
  }, [
    miniSearch,
    query,
    prefix,
    combineWith,
    fuzzy,
    boostedLocale,
    locale,
    boostWeight,
    processOptions,
    stemmingEnabled,
  ]);

  useEffect(() => {
    onSearchResult(results);
  }, [onSearchResult, results]);

  return (
    <>
      <ControlsPanel
        prefix={prefix}
        onTogglePrefix={() => setPrefix((prev) => !prev)}
        fuzzy={fuzzy}
        onFuzzyChange={setFuzzy}
        combineWith={combineWith}
        onCombineWithChange={setCombineWith}
        boostLocale={boostedLocale}
        onBoostLocaleChange={setBoostedLocale}
        boostWeight={boostWeight}
        onBoostWeightChange={setBoostWeight}
        processOptions={processOptions}
        onProcessOptionsChange={setProcessOptions}
        stemmingEnabled={stemmingEnabled}
        onStemmingEnabledChange={setStemmingEnabled}
        locale={locale}
        onLocaleChange={setLocale}
      />
    </>
  );
};