export default function color(theme) {
  const values = {
    PRIMARY: {
      primary_color: '#047b7b',
      secondary_color: '#e6f7f5',
      primary_background: '#fff',
      primary_text_color: '#000',
      secondary_text_color: '#fff',
      ctx_primary_color: '#efa860',
      ctx_secondary_color: '#37acac',
      damp_color: '#a09e9e',
      pop_color: '#ef786e',
    },
    DARK: {
      primary_color: '#00818a',
      secondary_color: '#404b69',
      primary_background: '#121212',
      primary_text_color: '#f1f1f1',
      secondary_text_color: '#404b69',
      ctx_primary_color: '#dbedf3',
      ctx_secondary_color: '#ced6d9',
      damp_color: '#a09e9e',
      pop_color: '#ef786e',
    },
    MINI: {
      primary_color: '#1e90ff',
      secondary_color: '#85c3ff',
      primary_background: '#fff',
      primary_text_color: '#000',
      secondary_text_color: '#fff',
      ctx_primary_color: '#ffa502',
      ctx_secondary_color: '#70a1ff',
      damp_color: '#57606f',
      pop_color: '#ff4757',
    },
  };

  return values[theme];
}

// 1. Background (0dp elevation surface overlay)
// 2. Surface (with 1dp elevation surface overlay)
// 3. Primary
// 4. Secondary
// 5. On background
// 6. On Surface
// 7. On Primary
// 8. On Secondary
