import { useState } from 'react';
import { tags as defaultTags } from '../data';

type Props = {
  onTagsChange: (tags: typeof defaultTags) => void;
};

export const TagsConfigurator = (props: Props) => {
  const { onTagsChange } = props;

  const [jsonString, setJsonString] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleApplyJson = () => {
    if (!jsonString.trim()) return;

    try {
      const parsedTags = JSON.parse(jsonString);

      if (!Array.isArray(parsedTags)) {
        throw new Error('Ожидался массив тегов');
      }

      onTagsChange(parsedTags);
      setError(null);
    } catch (err) {
      setError(`Ошибка парсинга: ${err && typeof err === 'object' && 'message' in err ? err.message : String(err)}`);
    }
  };

  const placeholder = `
  Example:
   [
   {
    "reference": "bear-angry",
    "keywords": {
      "de": "Bär, Tier, wütend, böse,
      "en": "bear, animal, angry, mad,
      "fr": "ours, animal, colère,
      "it": "orso, animale, arrabbiato,
      "sp": "oso, animal, enojado"
    }
  }
  ]`;

  return (
    <div className="input-row">
      <label>Загрузка кастомных тегов</label>
      <textarea
        rows={10}
        style={{ width: '100%', fontFamily: 'monospace' }}
        placeholder={placeholder}
        value={jsonString}
        onChange={(e) => setJsonString(e.target.value)}
      />

      {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}

      <div>
        <button onClick={handleApplyJson} style={{ marginTop: '12px' }}>
          Применить кастомные теги
        </button>
        <button
          onClick={() => {
            setJsonString(JSON.stringify(defaultTags));
            onTagsChange(defaultTags);
          }}
          style={{ marginTop: '12px' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
