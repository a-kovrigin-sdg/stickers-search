import type { SearchResult } from 'minisearch';
import { stickersPacks } from '../data';

type Props = {
  results: Array<SearchResult>;
  query: string;
};

const stickersByReference = new Map(
  stickersPacks.map((pack) => pack.stickers)
    .flat()
    .map(it=>([it.reference, it]))
);

export const ResultsPanel = ({
  results,
  query,
}: Props) => {
  const filteredResults = results.filter((it) => !!stickersByReference.get(it.id));

  return (
    <div className="card">
      <h2 className="section-title">Результаты для запроса: {results[0]?.queryTerms.join(' ')}</h2>
      <div className="stats">
        <div>
          Найдено в списке ключей: <strong>{results.length}</strong>
        </div>
        <div>
          Результат поиска в доступных стикерах:{' '}
          <strong>{filteredResults.length}</strong>
        </div>
      </div>

      <ol className="results-grid">
        {filteredResults.length === 0 && query?.trim() && (
          <li className="result-card">
            Ничего не найдено. Попробуйте изменить параметры.
          </li>
        )}
        {filteredResults.map((result) => {
          const sticker = stickersByReference.get(result.id);
          const stickerName = sticker?.reference ?? 'Без названия';
          const image = sticker?.url;

          return (
            <li key={result.id} className="result-card">
              {image && (
                <img
                  className="result-image"
                  src={image}
                  alt={stickerName}
                  loading="lazy"
                />
              )}
              <div className="result-body">
                <h3>{stickerName}</h3>
                <div className="result-meta">
                  {result?.score && (
                    <span>score: {result.score.toFixed(2)}</span>
                  )}
                  <span>ref: {result.id}</span>
                </div>
                <div className="result-meta-matches">
                  {result.match && (
                    <>
                      <span>Found keys:</span>
                      <br />
                      <ul>
                        {Object.entries(result.match).map(([word, langs]) => (
                          <li>
                            {word} in langs: {langs.join(', ')}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
