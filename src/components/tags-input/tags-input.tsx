import style from "./tags-input.module.sass";
import { useField, useFormikContext } from "formik";
import { useState, useEffect } from "react";

type TagsInputProps = {
  availableTags: string[]
  name: string;
  inputTag: string;
  setInputTag: (val: string) => void;
  suggestions: string[];
  setSuggestions: (val: string[]) => void;
  error: string | string[];
};

export const TagsInput = ({
                            name,
                            inputTag,
                            setInputTag,
                            suggestions,
                            setSuggestions,
                            error,
                            availableTags
                          }: TagsInputProps) => {
  const [field] = useField<string[]>(name);
  const { setFieldValue } = useFormikContext();
  const [inputVisible, setInputVisible] = useState(false);

  const tags = field.value || [];

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setFieldValue(name, [...tags, tag]);
    }
    setInputTag("");
    setSuggestions([]);
    setInputVisible(false);
  };

  useEffect(() => {
    console.log("Current tags in state:", tags);
  }, [tags]);

  const handleRemoveTag = (tagToRemove: number) => {
    console.log('Removing tag:', tagToRemove);
    console.log('Current tags before removal:', tags);
    const newTags = [...tags];
    newTags.splice(tagToRemove, 1);
    console.log('New tags after removal:', newTags);
    setTimeout(() => {
      setFieldValue(name, newTags, false);
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputTag(val);
    const filtered = availableTags.filter((t) =>
      t.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestions(filtered.length ? filtered : [val]);
  };

  const handleSuggestionVisible = () => {
    const nextVisible = !inputVisible;
    setInputVisible(nextVisible);
    if (nextVisible) {
      const filtered = availableTags.filter((tag) => !tags.includes(tag));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    console.log('Tags state updated:', tags);
  }, [tags]);

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleSuggestionVisible();
    }
  };

  return (
    <div className={style["tags-input"]}>
      <div className={style["tags-input__container"]}>
        <div 
          className={style["tags-input__tags"]}
          onMouseDown={handleContainerClick}
        >
          {tags.map((tag, idx) => (
            <span 
              key={`${tag}-${idx}`} 
              className={style["tags-input__tag"]}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {tag}
              <button 
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveTag(idx);
                }}
              >
                ×
              </button>
            </span>
          ))}
          <div 
            className={style["tags-input__add-section"]}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={style["tags-input__add-button"]}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSuggestionVisible();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="14" fill="#EAEAEA" />
                <path d="M14 8L14 20" stroke="#B1B1B1" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 14L8 14" stroke="#B1B1B1" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {inputVisible && (
              <div 
                className={style["tags-input__tags-input-list"]}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className={style["tags-input__input-container"]}>
                  <input
                    type="text"
                    value={inputTag}
                    onChange={handleInputChange}
                    placeholder="Введите тег"
                    className={style["tags-input__input"]}
                    autoFocus
                    onMouseDown={(e) => e.stopPropagation()}
                  />
                </div>
                <ul className={style["tags-input__suggestions-list"]}>
                  {suggestions.map((s) => (
                    <li
                      key={`suggestion-${s}`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddTag(s);
                      }}
                      className={style["tags-input__suggestion"]}
                    >
                      {s}
                    </li>
                  ))}
                  {suggestions.length === 0 && (
                    <li className={style["tags-input__suggestion"]}></li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        {error && <div className={style["tags-input__error"]}>{error}</div>}
      </div>
    </div>
  );
};