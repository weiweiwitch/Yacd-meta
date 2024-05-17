import debounce from 'lodash-es/debounce';
import React, { useCallback, useMemo, useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { useTranslation } from 'react-i18next';

import s0 from './GeneralSearch.module.scss';

function GeneralSearch({ dispatch, searchText, updateSearchText }) {
  const { t } = useTranslation();
  const [text, setText] = useState(searchText);
  const updateSearchTextInternal = useCallback(
    (v) => {
      dispatch(updateSearchText(v));
    },
    [dispatch, updateSearchText]
  );
  const updateSearchTextDebounced = useMemo(
    () => debounce(updateSearchTextInternal, 300),
    [updateSearchTextInternal]
  );
  const onChange = (e) => {
    setText(e.target.value);
    updateSearchTextDebounced(e.target.value);
  };

  return (
    <div className={s0.GeneralSearch}>
      <div className={s0.GeneralSearchContainer}>
        <div className={s0.inputWrapper}>
          <input
            type="text"
            value={text}
            onChange={onChange}
            className={s0.input}
            placeholder={t('Search')}
          />
        </div>
        <div className={s0.iconWrapper}>
          <SearchIcon size={20} />
        </div>
      </div>
    </div>
  );
}

export default GeneralSearch;
