export type TextAlign = 'left' | 'center' | 'right';

export interface SlideBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SlideTextBlock extends SlideBox {
  id: string;
  text: string;
  originalText: string;
  edited: boolean;
  confidence: number;
  maskColor: string;
  fontSize: number;
  color: string;
  bold: boolean;
  italic: boolean;
  align: TextAlign;
}

export interface SlideImageBlock extends SlideBox {
  id: string;
  imageUrl: string;
  maskColor: string;
  altText: string;
}

export interface SlideModel {
  id: string;
  pageNumber: number;
  width: number;
  height: number;
  imageUrl: string;
  blocks: SlideTextBlock[];
  imageBlocks: SlideImageBlock[];
}

export interface SlideEditorProject {
  id: string;
  fileName: string;
  createdAt: string;
  slides: SlideModel[];
}

export interface OcrLine {
  text: string;
  confidence: number;
  bbox: SlideBox;
}
