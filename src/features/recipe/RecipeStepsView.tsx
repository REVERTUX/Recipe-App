import { useCallback, useRef, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import { styled } from '@mui/material/styles';

import { RecipeSteps } from '../../models/recipe';

const StyledDiv = styled('div')({
  '* > .ce-block__content': {
    maxWidth: '100% !important',
  },
});

interface RecipeStepsProps {
  steps: RecipeSteps;
}

function RecipeStepsView({ steps }: RecipeStepsProps) {
  const ejInstance = useRef<EditorJS | null>(null);
  const isReady = useRef(false);

  const initEditor = useCallback(() => {
    if (isReady.current) return; // prevents double render in dev mode

    isReady.current = true;

    const editor = new EditorJS({
      holder: 'editorjs',
      data: steps,
      readOnly: true,
      onReady: () => {
        ejInstance.current = editor;
      },
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link'],
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool,
        },
      },
    });
  }, [steps]);

  useEffect(() => {
    initEditor();

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, [initEditor]);

  return <StyledDiv id="editorjs" />;
}

export default RecipeStepsView;
