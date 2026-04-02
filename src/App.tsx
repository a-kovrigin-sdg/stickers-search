import { useState } from 'react';
import { MiniSearchExample } from './components/miniSearch';
import { ResultsPanel } from './components/ResultsPanel';
import type { SearchResult } from 'minisearch';
import { TagsConfigurator } from './components/TagsConfigurator';
import { tags as defaultTags } from './data';

const App = () => {
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState(defaultTags);
  const [results, setResults] = useState<
    Array<{ id: string; score?: number; match?: SearchResult['match'] }>
  >([]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>MiniSearch demo: поиск по стикерам</h1>
        <p>
          Слева параметры индекса и поиска, справа результат. Данные берутся из
          отдельных JSON файлов со стикерами и их тегами.
        </p>
      </header>
      <div className="input-row">
        <label htmlFor="query">Поисковый запрос</label>
        <input
          id="query"
          type="text"
          value={query}
          placeholder="cat, love, coffee"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <section className="panel">
        <MiniSearchExample
          query={query}
          onSearchResult={setResults}
          tags={tags}
        />
        <ResultsPanel results={results} query={query} />
      </section>
      <section>
        <TagsConfigurator onTagsChange={setTags} />
      </section>
    </div>
  );
};

export default App;
