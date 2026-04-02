import type { CombineWith } from "../../types";

type Props = {
  prefix: boolean;
  onTogglePrefix: () => void;
  fuzzy: number;
  onFuzzyChange: (value: number) => void;
  combineWith: CombineWith;
  onCombineWithChange: (value: CombineWith) => void;
  boostLocale?: 'de' | 'en' | 'fr' | 'it' | 'sp';
  onBoostLocaleChange: (value: 'de' | 'en' | 'fr' | 'it' | 'sp') => void;
  boostWeight: number;
  onBoostWeightChange: (it: number) => void;
  processOptions: 'deburr' | undefined;
  onProcessOptionsChange: (term: 'deburr' | undefined) => void;
};

const ControlsPanel = ({
  prefix,
  onTogglePrefix,
  fuzzy,
  onFuzzyChange,
  combineWith,
  onCombineWithChange,
  boostLocale,
  onBoostLocaleChange,
  boostWeight,
  onBoostWeightChange,
 processOptions,
 onProcessOptionsChange,
}: Props) => {
  return (
    <div className="card">
      <h2 className="section-title">Параметры</h2>
      <div className="controls">
        <div className="options-grid">
          <fieldset>
            <legend>Модификатор поиска</legend>
            <div className="checkbox-list">
              <label key={'unset'} htmlFor={'unset'} className="checkbox">
                <input
                  type="radio"
                  name="processTermOption"
                  id="unset"
                  defaultChecked={true}
                  checked={processOptions === undefined}
                  onChange={() => onProcessOptionsChange(undefined)}
                />
                {'Не применять'}
              </label>
              <label key={'deburr'} htmlFor="deburr" className="checkbox">
                <input
                  type="radio"
                  name="processTermOption"
                  id="deburr"
                  checked={processOptions === 'deburr'}
                  onChange={() => onProcessOptionsChange('deburr')}
                />
                {'Deburr (убирает ударения и диакритические знаки)'}
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Boosting</legend>
            <div className="range-row">
              <label htmlFor="boost.locale">boost.locale: {boostLocale}</label>

              <select
                name="locale"
                id="boost.locale"
                value={boostLocale}
                onChange={(event) => {
                  onBoostLocaleChange(
                    event.target.value as 'de' | 'en' | 'fr' | 'it' | 'sp',
                  );
                }}
              >
                <option value="">--Please choose an option--</option>
                <option value="en">en</option>
                <option value="de">de</option>
                <option value="fr">fr</option>
                <option value="it">it</option>
                <option value="sp">sp</option>
              </select>
            </div>
            <div className="range-row">
              <span>boost.weight: {boostWeight.toFixed(2)}</span>
              <input
                type="range"
                min={1}
                max={5}
                step={0.1}
                value={boostWeight}
                onChange={(event) =>
                  onBoostWeightChange(Number(event.target.value))
                }
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Поведение поиска</legend>
            <div className="checkbox-list">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={prefix}
                  onChange={onTogglePrefix}
                />
                prefix search
              </label>
            </div>
            <div className="range-row">
              <span>fuzzy: {fuzzy.toFixed(2)}</span>
              <input
                type="range"
                min={0}
                max={0.4}
                step={0.05}
                value={fuzzy}
                onChange={(event) => onFuzzyChange(Number(event.target.value))}
              />
            </div>
            <div className="select-row">
              <label htmlFor="combineWith">combineWith</label>
              <select
                id="combineWith"
                value={combineWith}
                onChange={(event) =>
                  onCombineWithChange(event.target.value as CombineWith)
                }
              >
                <option value="OR">OR</option>
                <option value="AND">AND</option>
              </select>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default ControlsPanel;
