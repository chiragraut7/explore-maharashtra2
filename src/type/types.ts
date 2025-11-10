export interface ModalSection {
  type: 'h4' | 'h5' | 'p' | 'ul' | 'html';
  class?: string;
  text?: string;
  items?: string[];
  html?: string;
}

export interface ModalData {
  id: string;
  title: string;
  sections?: ModalSection[];
  // For backward compatibility
  content?: string;
  content2?: string;
  content3?: string;
  content4?: string;
  content5?: string;
}
