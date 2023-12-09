/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */

'use client';

import { MDXEditor, MDXEditorMethods } from '@mdxeditor/editor/MDXEditor';

import { headingsPlugin } from '@mdxeditor/editor/plugins/headings';
import { listsPlugin } from '@mdxeditor/editor/plugins/lists';
import { quotePlugin } from '@mdxeditor/editor/plugins/quote';
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar';
import { imagePlugin } from '@mdxeditor/editor/plugins/image';
import { directivesPlugin } from '@mdxeditor/editor/plugins/directives';
import { markdownShortcutPlugin } from '@mdxeditor/editor/plugins/markdown-shortcut';
import { codeBlockPlugin } from '@mdxeditor/editor/plugins/codeblock';
import { thematicBreakPlugin } from '@mdxeditor/editor/plugins/thematic-break';

import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo';
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles';
import { BlockTypeSelect } from '@mdxeditor/editor/plugins/toolbar/components/BlockTypeSelect';
import { InsertImage } from '@mdxeditor/editor/plugins/toolbar/components/InsertImage';
import { InsertThematicBreak } from '@mdxeditor/editor/plugins/toolbar/components/InsertThematicBreak';
import { ListsToggle } from '@mdxeditor/editor/plugins/toolbar/components/ListsToggle';
import { InsertAdmonition } from '@mdxeditor/editor/plugins/toolbar/components/InsertAdmonition';

import { AdmonitionDirectiveDescriptor } from '@mdxeditor/editor/directive-editors/AdmonitionDirectiveDescriptor';

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

function Editor({ markdown, editorRef }: EditorProps) {
  async function imageUploadHandler(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    // send the file to your server and return
    // the URL of the uploaded image in the response
    const response = await fetch('/uploads/new', {
      method: 'POST',
      body: formData,
    });
    const json = (await response.json()) as { url: string };
    return json.url;
  }

  return (
    <MDXEditor
      contentEditableClassName="prose max-w-full"
      className="cursor-text"
      ref={editorRef}
      markdown={markdown}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        thematicBreakPlugin(),
        codeBlockPlugin(),
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor],
        }),
        imagePlugin({
          imageUploadHandler,
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <div className="flex items-center gap-2">
              <UndoRedo />
              <div className="h-5/6 min-h-[1.5em] w-0.5 bg-gray-300" />
              <BoldItalicUnderlineToggles />
              <div className="h-5/6 min-h-[1.5em] w-0.5 bg-gray-300" />
              <ListsToggle />
              <div className="h-5/6 min-h-[1.5em] w-0.5 bg-gray-300" />
              <BlockTypeSelect />
              <div className="h-5/6 min-h-[1.5em] w-0.5 bg-gray-300" />
              <InsertImage />
              <div className="h-5/6 min-h-[1.5em] w-0.5 bg-gray-300" />
              <InsertThematicBreak />
              <InsertAdmonition />
            </div>
          ),
        }),
      ]}
    />
  );
}

export default Editor;
