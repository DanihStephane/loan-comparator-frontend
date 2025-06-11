"use client";

import { Editor } from "@tiptap/core";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Highlighter,
  List,
  ListOrdered,
  Heading2,
  Heading3,
} from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";

interface TiptapEditorProps {
  content?: string;
  editable?: boolean;
  onUpdate?: (props: { editor: Editor }) => void;
}

export function TiptapEditor({ content, editable = true, onUpdate }: TiptapEditorProps) {
  const cleanContent = (html: string) => {
    // Supprime les balises <p> à l'intérieur des <li>
    return html.replace(/<li><p[^>]*>(.*?)<\/p><\/li>/g, "<li>$1</li>");
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-6",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-6",
          },
        },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: editable,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content ? cleanContent(content) : "",
    editable,
    onUpdate,
    editorProps: {
      attributes: {
        class: `prose prose-lg max-w-none focus:outline-none prose-headings:mb-3 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 ${
            !editable ? "cursor-default" : ""
        }`,
      },
    },
  }, [editable]);

  useEffect(() => {
    if (editor && content !== undefined) {
      const currentContent = editor.getHTML();
      const cleanedContent = cleanContent(content);
      if (cleanedContent !== currentContent) {
        editor.commands.setContent(cleanedContent);
      }
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  return (
      <div className={`border rounded-lg p-4 min-h-[200px] relative ${!editable ? "bg-gray-50" : ""}`}>
        {editable && (
            <div className="sticky top-0 z-10 bg-white mb-4 flex items-center gap-2 border-b pb-4">
              <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={editor.isActive("heading", { level: 3 }) ? "bg-muted" : ""}
              >
                <Heading3 className="h-4 w-4" />
              </Button>
              <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={editor.isActive("bold") ? "bg-muted" : ""}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={editor.isActive("italic") ? "bg-muted" : ""}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={editor.isActive("underline") ? "bg-muted" : ""}
              >
                <UnderlineIcon className="h-4 w-4" />
              </Button>
              <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign("left").run()}
                  className={editor.isActive({ textAlign: "left" }) ? "bg-muted" : ""}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign("center").run()}
                  className={editor.isActive({ textAlign: "center" }) ? "bg-muted" : ""}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign("right").run()}
                  className={editor.isActive({ textAlign: "right" }) ? "bg-muted" : ""}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                  className={editor.isActive({ textAlign: "justify" }) ? "bg-muted" : ""}
              >
                <AlignJustify className="h-4 w-4" />
              </Button>
              <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={editor.isActive("bulletList") ? "bg-muted" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={editor.isActive("orderedList") ? "bg-muted" : ""}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </div>
        )}
        <EditorContent editor={editor} />
      </div>
  );
}