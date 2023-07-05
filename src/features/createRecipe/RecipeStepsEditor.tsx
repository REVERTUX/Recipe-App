/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import { Paper, Typography } from '@mui/material';

import { useUploadFileMutation } from '../../services/recipes';
import { RecipeSteps } from '../../models/recipe';

interface RecipeStepsEditorProps {
  steps: RecipeSteps;
  onChange: (value: RecipeSteps) => void;
  error: boolean;
}

function RecipeStepsEditor({ steps, onChange, error }: RecipeStepsEditorProps) {
  const [uploadFile] = useUploadFileMutation();
  const ejInstance = useRef<EditorJS | null>(null);
  const isReady = useRef(false);

  const initEditor = useCallback(() => {
    if (isReady.current) return; // prevents double render in dev mode

    isReady.current = true;

    const uploadByFile = async (file: File) => {
      const formData = new FormData();
      formData.set('file', file);
      return uploadFile(formData)
        .unwrap()
        .then(({ id }) => {
          return { success: 1, file: { url: `/api/files/${id}` } };
        });
    };

    const uploadByUrl = (url: string) => {
      return Promise.resolve({ success: 1, file: { url } });
    };

    const editor = new EditorJS({
      holder: 'editorjs',
      data: steps,
      placeholder: 'Write recipe content...',
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        const content = await editor.saver.save();
        const { version, blocks } = content;
        onChange({ blocks, version });
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
          config: {
            uploader: {
              uploadByFile,
              uploadByUrl,
            },
          },
        },
      },
    });
  }, [steps, onChange, uploadFile]);

  useEffect(() => {
    initEditor();

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <Paper
      elevation={1}
      sx={{ width: '100%', pt: 8, pb: 1.5, borderRadius: 4 }}
    >
      <div id="editorjs" />
      {error && (
        <Typography variant="caption" color="red" pl={3}>
          Please type some text here
        </Typography>
      )}
    </Paper>
  );
}

export default React.memo(RecipeStepsEditor);
