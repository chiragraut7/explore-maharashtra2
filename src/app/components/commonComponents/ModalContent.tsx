'use client';

import React from 'react';
import Translator from './Translator';
import { useLanguage } from '../context/LanguageContext';
import type { ModalData, ModalSection } from '@/type/types';

interface ModalContentProps {
  modal: ModalData;
}

const ModalContent: React.FC<ModalContentProps> = ({ modal }) => {
  const { language } = useLanguage();

  if (!modal) return null;

  // Support both new "sections" format and old "content1..5" format
  const sections: ModalSection[] =
    modal.sections ??
    Object.keys(modal)
      .filter((key) => key.startsWith('content'))
      .map((key) => ({ type: 'html', html: (modal as any)[key] }));

  return (
    <div className="modal-body px-4 py-4">
      {sections.map((section, index) => {
        switch (section.type) {
          case 'h4':
            return (
              <h4 key={index} className={section.class || ''}>
                <Translator text={section.text ?? ''} targetLang={language} />
              </h4>
            );

          case 'h5':
            return (
              <h5 key={index} className={section.class || ''}>
                <Translator text={section.text ?? ''} targetLang={language} />
              </h5>
            );

          case 'p':
            return (
              <p key={index} className={section.class || ''}>
                <Translator text={section.text ?? ''} targetLang={language} />
              </p>
            );

          case 'ul':
            return (
              <ul key={index} className={section.class || ''}>
                {section.items?.map((item, liIndex) => (
                  <li key={liIndex}>
                    <Translator text={item} targetLang={language} />
                  </li>
                ))}
              </ul>
            );

          case 'html':
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: section.html ?? '' }}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default ModalContent;
